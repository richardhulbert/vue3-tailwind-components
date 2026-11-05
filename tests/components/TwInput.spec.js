import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwInput } from '@/components'
import { COLORS, classes, idsOfTwo, vueWarnings, toneOf } from '../helpers'

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

  it('forwards other attributes to the input, without Vue warnings', () => {
    const warnings = vueWarnings(() => {
      const input = mount(TwInput, { attrs: { autocomplete: 'email', class: 'w-16', 'data-test': 'x' } }).get('input')
      expect(input.attributes()).toMatchObject({ autocomplete: 'email', 'data-test': 'x' })
      expect(input.classes()).toContain('w-16')
    })
    expect(warnings).toEqual([])
  })

  it('accepts only the supported input types', () => {
    const { validator } = TwInput.props.type
    expect(['text', 'number', 'password', 'email', 'tel', 'search', 'color', 'date', 'file'].every(validator)).toBe(true)
    expect(validator('checkbox')).toBe(false)
  })

  it('gives each instance on a page its own id', () => {
    const [a, b] = idsOfTwo(TwInput, 'input', {})
    expect(a).toBeTruthy()
    expect(a).not.toBe(b)
  })

  it('uses formNameAndId when given', () => {
    expect(mount(TwInput, { props: { formNameAndId: 'given' } }).get('input').attributes('id')).toBe('given')
  })

  it('forwards listeners to the input', async () => {
    // Content Head binds @keyup.enter and @blur on tw-input.
    const onKeyup = vi.fn()
    const w = mount(TwInput, { attrs: { onKeyup } })
    await w.get('input').trigger('keyup')
    expect(onKeyup).toHaveBeenCalled()
  })

  it('exposes focus(), which focuses the input', () => {
    // Content Head's ConfirmsPassword.vue calls passwordInput.value.focus().
    const w = mount(TwInput, { attachTo: document.body })
    w.vm.focus()
    expect(document.activeElement).toBe(w.get('input').element)
  })

  it.each(COLORS)('takes its tone from color: %s', (color) => {
    const w = mount(TwInput, { props: { color } })
    expect(toneOf(w.get('label'))).toBe(color)
    expect(toneOf(w.get('.relative'))).toBe(color)
  })

  it('recolours the field, not the label, from errorColor on an error', () => {
    const w = mount(TwInput, { props: { color: 'info', error: 'Required', errorColor: 'warning' } })
    const field = w.get('.relative').element.style
    expect(field.getPropertyValue('--c-line')).toBe('var(--warning-500, warning)')
    expect(field.getPropertyValue('--c-surface')).toBe('')
    expect(toneOf(w.get('label'))).toBe('info')
  })

  it('has no error overrides without an error', () => {
    expect(mount(TwInput).get('.relative').element.style.getPropertyValue('--c-line')).toBe('')
  })

  describe('class contract', () => {
    it('label, input and description', () => {
      const w = mount(TwInput, { props: { formNameAndId: id, description: 'Help' } })
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
