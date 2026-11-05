import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwSelect, TwOption } from '@/components'
import { COLORS, classes, idsOfTwo, toneOf } from '../helpers'

const items = [
  { label: 'Apple', value: 'a' },
  { label: 'Banana', value: 'b', icon: 'star' },
  { label: 'Cherry', value: 'c' },
]

const open = async (w) => {
  await w.get('button').trigger('click')
  return w.findAllComponents(TwOption)
}

describe('TwSelect', () => {
  it('shows its label until a value is chosen', () => {
    expect(mount(TwSelect, { props: { items, label: 'Pick fruit' } }).get('button').text()).toBe('Pick fruit')
  })

  it('shows the label and icon of the model value', () => {
    const w = mount(TwSelect, { props: { items, modelValue: 'b' } })
    expect(w.get('button').text()).toBe('Banana')
    expect(w.find('button [data-icon="fa-solid fa-star"]').exists()).toBe(true)
  })

  it('falls back to its label when the model value is not in the items', () => {
    expect(mount(TwSelect, { props: { items, modelValue: 'z', label: 'Pick' } }).get('button').text()).toBe('Pick')
  })

  it('re-resolves the label when the items change', async () => {
    const w = mount(TwSelect, { props: { items: [], modelValue: 'c' } })
    await w.setProps({ items })
    expect(w.get('button').text()).toBe('Cherry')
  })

  it('opens a panel listing every item', async () => {
    const w = mount(TwSelect, { props: { items } })
    expect(w.findAllComponents(TwOption)).toHaveLength(0)
    expect((await open(w)).map((o) => o.text())).toEqual(['Apple', 'Banana', 'Cherry'])
  })

  it('marks the current value as selected in the panel', async () => {
    const w = mount(TwSelect, { props: { items, modelValue: 'c' } })
    expect((await open(w)).map((o) => o.props('selected'))).toEqual([false, false, true])
  })

  it('updates v-model and emits changed when an item is clicked, then closes', async () => {
    const onUpdate = vi.fn()
    const w = mount(TwSelect, { props: { items, 'onUpdate:modelValue': onUpdate } })
    const options = await open(w)
    await options[1].trigger('click')
    // Emitted as 'update:model-value', which v-model's listener still receives.
    expect(onUpdate.mock.calls).toEqual([['b']])
    expect(w.emitted('changed')).toEqual([['b']])
    expect(w.findAllComponents(TwOption)).toHaveLength(0)
    expect(w.get('button').text()).toBe('Banana')
  })

  it('selects with the arrow keys and Enter', async () => {
    const onUpdate = vi.fn()
    const w = mount(TwSelect, { props: { items, 'onUpdate:modelValue': onUpdate } })
    await open(w)
    await w.trigger('keydown', { code: 'ArrowDown' })
    await w.trigger('keydown', { code: 'ArrowDown' })
    await w.trigger('keydown', { code: 'Enter' })
    expect(onUpdate.mock.calls).toEqual([['b']])
  })

  it('closes on Escape without choosing', async () => {
    const w = mount(TwSelect, { props: { items } })
    await open(w)
    await w.trigger('keydown', { code: 'Escape' })
    expect(w.findAllComponents(TwOption)).toHaveLength(0)
    expect(w.emitted('update:model-value')).toBeUndefined()
  })

  it('closes when clicking outside', async () => {
    const w = mount(TwSelect, { props: { items }, attachTo: document.body })
    await open(w)
    // vueuse ignores a click in the same tick as the one that opened the panel.
    await new Promise((resolve) => setTimeout(resolve))
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    document.body.dispatchEvent(new PointerEvent('click', { bubbles: true }))
    await w.vm.$nextTick()
    expect(w.findAllComponents(TwOption)).toHaveLength(0)
  })

  it('mirrors the value in a hidden native select for forms', () => {
    const select = mount(TwSelect, { props: { items, modelValue: 'c', formNameAndId: 'fruit' } }).get('select')
    expect(select.attributes()).toMatchObject({ name: 'fruit', id: 'fruit' })
    expect(select.element.value).toBe('c')
  })

  it('gives each instance on a page its own id', () => {
    const [a, b] = idsOfTwo(TwSelect, 'select', { items })
    expect(a).toBeTruthy()
    expect(a).not.toBe(b)
  })

  it('uses formNameAndId when given', () => {
    expect(mount(TwSelect, { props: { items, formNameAndId: 'given' } }).get('select').attributes('id')).toBe('given')
  })

  it('shows an error message', () => {
    expect(mount(TwSelect, { props: { items, error: 'Required' } }).text()).toContain('Required')
  })

  it('disables the button', () => {
    expect(mount(TwSelect, { props: { items, disabled: true } }).get('button').attributes('disabled')).toBeDefined()
  })

  it('lets Tab move focus away, closing the panel', async () => {
    // A blanket @keydown.prevent once blocked Tab: a keyboard trap.
    const w = mount(TwSelect, { props: { items } })
    await open(w)
    const event = new KeyboardEvent('keydown', { code: 'Tab', key: 'Tab', bubbles: true, cancelable: true })
    w.get('button').element.dispatchEvent(event)
    await w.vm.$nextTick()
    expect(event.defaultPrevented).toBe(false)
    expect(w.findAllComponents(TwOption)).toHaveLength(0)
  })

  it.each(['Enter', 'ArrowDown', 'ArrowUp', 'Escape'])('prevents the default action of %s, which it handles', (code) => {
    const w = mount(TwSelect, { props: { items } })
    const event = new KeyboardEvent('keydown', { code, key: code, bubbles: true, cancelable: true })
    w.get('button').element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
  })

  it('leaves other keys alone', () => {
    const w = mount(TwSelect, { props: { items } })
    const event = new KeyboardEvent('keydown', { code: 'KeyA', key: 'a', bubbles: true, cancelable: true })
    w.get('button').element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
  })

  it.each(COLORS)('takes its tone from color: %s', (color) => {
    expect(toneOf(mount(TwSelect, { props: { items, color } }))).toBe(color)
  })

  it('recolours the button and message, not the panel, on an error', async () => {
    const w = mount(TwSelect, { props: { items, error: 'Required' } })
    expect(w.get('button').element.style.getPropertyValue('--c-line')).toBe('var(--danger-500, danger)')
    expect(w.get('p').element.style.getPropertyValue('--c-fg')).toBe('var(--danger-500, danger)')
    await open(w)
    expect(w.get('.z-50').element.style.getPropertyValue('--c-line')).toBe('')
  })

  describe('class contract', () => {
    it('button, chevron, panel and options', async () => {
      const w = mount(TwSelect, { props: { items, modelValue: 'a' } })
      await open(w)
      expect({
        button: classes(w.get('button')),
        chevron: classes(w.get('[data-icon="fa-solid fa-chevron-down"]')),
        panel: classes(w.get('.z-50')),
        option: classes(w.findAllComponents(TwOption)[1]),
        selectedOption: classes(w.findAllComponents(TwOption)[0]),
      }).toMatchSnapshot()
    })

    it('sizes, error and disabled', () => {
      const button = (props) => classes(mount(TwSelect, { props: { items, ...props } }).get('button'))
      expect({
        xs: button({ size: 'xs' }),
        sm: button({ size: 'sm' }),
        lg: button({ size: 'lg' }),
        error: button({ error: 'x' }),
        disabled: button({ disabled: true }),
      }).toMatchSnapshot()
    })
  })
})

describe('TwOption', () => {
  it('emits selected with its index', async () => {
    const w = mount(TwOption, { props: { label: 'Apple', index: 3 } })
    await w.trigger('click')
    expect(w.emitted('selected')).toEqual([[3]])
  })

  it('renders its label and icon', () => {
    const w = mount(TwOption, { props: { label: 'Apple', icon: 'star' } })
    expect(w.text()).toBe('Apple')
    expect(w.find('[data-icon="fa-solid fa-star"]').exists()).toBe(true)
  })
})
