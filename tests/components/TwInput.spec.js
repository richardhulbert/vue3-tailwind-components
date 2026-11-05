import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwInput } from '@/components'
import { COLORS, classes } from '../helpers'

const id = 'field-1'

describe('TwInput', () => {
  it('labels the input with its default slot', () => {
    const w = mount(TwInput, { props: { formNameAndId: id }, slots: { default: 'Name' } })
    expect(w.get('label').text()).toBe('Name')
    expect(w.get('label').attributes('for')).toBe(id)
    expect(w.get('input').attributes()).toMatchObject({ id, name: id })
  })

  it('shows the model value and follows later changes', async () => {
    const w = mount(TwInput, { props: { modelValue: 'one' } })
    expect(w.get('input').element.value).toBe('one')
    await w.setProps({ modelValue: 'two' })
    expect(w.get('input').element.value).toBe('two')
  })

  it('emits update:modelValue and changed as the user types', async () => {
    const w = mount(TwInput)
    await w.get('input').setValue('hello')
    expect(w.emitted('update:modelValue').at(-1)).toEqual(['hello'])
    expect(w.emitted('changed').at(-1)).toEqual(['hello'])
  })

  it('emits the chosen file, not update:modelValue, for type="file"', async () => {
    const w = mount(TwInput, { props: { type: 'file' } })
    const file = new File(['x'], 'a.txt')
    const input = w.get('input').element
    Object.defineProperty(input, 'files', { value: [file] })
    await w.get('input').trigger('input')
    expect(w.emitted('changed')).toEqual([[file]])
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })

  it('shows the error in place of the description', () => {
    const w = mount(TwInput, { props: { description: 'Help', error: 'Required' } })
    expect(w.text()).toContain('Required')
    expect(w.text()).not.toContain('Help')
  })

  it('shows the description when there is no error', () => {
    expect(mount(TwInput, { props: { description: 'Help' } }).text()).toContain('Help')
  })

  it('renders an icon and indents the input for it', () => {
    const w = mount(TwInput, { props: { icon: 'user' } })
    expect(w.find('[data-icon="fa-solid fa-user"]').exists()).toBe(true)
    expect(w.get('input').classes()).toContain('pl-8')
  })

  it('passes type, placeholder, accept and disabled to the input', () => {
    const w = mount(TwInput, { props: { type: 'email', placeholder: 'you@example.com', disabled: true, accept: 'image/*' } })
    expect(w.get('input').attributes()).toMatchObject({ type: 'email', placeholder: 'you@example.com', accept: 'image/*' })
    expect(w.get('input').attributes('disabled')).toBeDefined()
  })

  it('accepts only the supported input types', () => {
    const { validator } = TwInput.props.type
    expect(['text', 'number', 'password', 'email', 'tel', 'search', 'color', 'date', 'file'].every(validator)).toBe(true)
    expect(validator('checkbox')).toBe(false)
  })

  it.fails('gives each instance its own id (known bug: the default is computed once)', () => {
    // Every TwInput on a page shares one id, so <label for> points at the first
    // one. Fix: a per-instance default, ideally Vue's useId(). Then change it.fails to it.
    const a = mount(TwInput).get('input').attributes('id')
    const b = mount(TwInput).get('input').attributes('id')
    expect(a).not.toBe(b)
  })

  it.fails('forwards listeners to the input (known bug: two root elements drop them)', async () => {
    // Content Head binds @keyup.enter and @blur on tw-input; both are silently
    // dropped. Fix: inheritAttrs: false and v-bind="$attrs" on the <input>.
    const onKeyup = vi.fn()
    const w = mount(TwInput, { attrs: { onKeyup } })
    await w.get('input').trigger('keyup')
    expect(onKeyup).toHaveBeenCalled()
  })

  it.fails('exposes focus() (known bug: Content Head calls it through a ref)', () => {
    // ConfirmsPassword.vue calls passwordInput.value.focus(), which throws.
    // Fix: defineExpose({ focus }). Then change it.fails to it.
    const w = mount(TwInput, { attachTo: document.body })
    w.vm.focus()
    expect(document.activeElement).toBe(w.get('input').element)
  })

  describe('class contract', () => {
    it.each(COLORS)('%s', (color) => {
      const w = mount(TwInput, { props: { color, formNameAndId: id, description: 'Help' } })
      expect({
        label: classes(w.get('label')),
        input: classes(w.get('input')),
        description: classes(w.findAll('div').at(-1)),
      }).toMatchSnapshot()
    })

    it('error, icon, disabled and file states', () => {
      const error = mount(TwInput, { props: { error: 'Required', icon: 'user' } })
      expect({
        errorInput: classes(error.get('input')),
        errorIcon: classes(error.get('.absolute')),
        disabled: classes(mount(TwInput, { props: { disabled: true } }).get('input')),
        file: classes(mount(TwInput, { props: { type: 'file' } }).get('input')),
      }).toMatchSnapshot()
    })
  })
})
