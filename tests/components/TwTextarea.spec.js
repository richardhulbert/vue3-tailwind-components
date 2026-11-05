import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwTextarea } from '@/components'
import { COLORS, classes, idsOfTwo } from '../helpers'

const id = 'notes-1'

describe('TwTextarea', () => {
  it('labels the textarea with its default slot', () => {
    const w = mount(TwTextarea, { props: { formNameAndId: id }, slots: { default: 'Notes' } })
    expect(w.get('label').text()).toBe('Notes')
    expect(w.get('label').attributes('for')).toBe(id)
    expect(w.get('textarea').attributes()).toMatchObject({ id, name: id })
  })

  it('shows the model value and follows later changes', async () => {
    const w = mount(TwTextarea, { props: { modelValue: 'one' } })
    expect(w.get('textarea').element.value).toBe('one')
    await w.setProps({ modelValue: 'two' })
    expect(w.get('textarea').element.value).toBe('two')
  })

  it('emits update:modelValue and changed as the user types', async () => {
    const w = mount(TwTextarea)
    await w.get('textarea').setValue('hello')
    expect(w.emitted('update:modelValue').at(-1)).toEqual(['hello'])
    expect(w.emitted('changed').at(-1)).toEqual(['hello'])
  })

  it('shows the error in place of the description', () => {
    const w = mount(TwTextarea, { props: { description: 'Help', error: 'Too long' } })
    expect(w.text()).toContain('Too long')
    expect(w.text()).not.toContain('Help')
  })

  it('gives each instance on a page its own id', () => {
    const [a, b] = idsOfTwo(TwTextarea, 'textarea', {})
    expect(a).toBeTruthy()
    expect(a).not.toBe(b)
  })

  it('uses formNameAndId when given', () => {
    expect(mount(TwTextarea, { props: { formNameAndId: 'given' } }).get('textarea').attributes('id')).toBe('given')
  })

  it('forwards listeners to the textarea', async () => {
    const onBlur = vi.fn()
    const w = mount(TwTextarea, { attrs: { onBlur } })
    await w.get('textarea').trigger('blur')
    expect(onBlur).toHaveBeenCalled()
  })

  it('exposes focus(), which focuses the textarea', () => {
    const w = mount(TwTextarea, { attachTo: document.body })
    w.vm.focus()
    expect(document.activeElement).toBe(w.get('textarea').element)
  })

  describe('class contract', () => {
    it.each(COLORS)('%s', (color) => {
      const w = mount(TwTextarea, { props: { color, formNameAndId: id } })
      expect({ label: classes(w.get('label')), textarea: classes(w.get('textarea')) }).toMatchSnapshot()
    })

    it('error and disabled states', () => {
      expect({
        error: classes(mount(TwTextarea, { props: { error: 'x' } }).get('textarea')),
        disabled: classes(mount(TwTextarea, { props: { disabled: true } }).get('textarea')),
      }).toMatchSnapshot()
    })
  })
})
