import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwSwitch } from '@/components'
import { COLORS, classes, idsOfTwo, toneOf } from '../helpers'

const parts = (w) => {
  const [back, knob] = w.findAll('.relative > div')
  return { root: classes(w), back: classes(back), knob: classes(knob), label: classes(w.find('.mx-2')) }
}

describe('TwSwitch', () => {
  it('renders its default slot as the label', () => {
    expect(mount(TwSwitch, { slots: { default: 'Dark mode' } }).text()).toBe('Dark mode')
  })

  it('toggles on click and emits update:modelValue and changed', async () => {
    const w = mount(TwSwitch)
    await w.trigger('click')
    await w.trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([[true], [false]])
    expect(w.emitted('changed')).toEqual([[true], [false]])
  })

  it('toggles on Enter', async () => {
    const w = mount(TwSwitch)
    await w.trigger('keydown.enter')
    expect(w.emitted('update:modelValue')).toEqual([[true]])
  })

  it('starts from the model value and follows changes from the parent', async () => {
    const w = mount(TwSwitch, {
      props: { modelValue: true, 'onUpdate:modelValue': (v) => w.setProps({ modelValue: v }) },
    })
    await w.trigger('click')
    expect(w.props('modelValue')).toBe(false)
    await w.setProps({ modelValue: true })
    await w.trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([[false], [false]])
  })

  it('does nothing when disabled', async () => {
    const w = mount(TwSwitch, { props: { disabled: true } })
    await w.trigger('click')
    expect(w.emitted('update:modelValue')).toBeUndefined()
    expect(w.classes()).toContain('cursor-not-allowed')
  })

  it('is focusable', () => {
    expect(mount(TwSwitch).attributes('tabindex')).toBe('0')
  })

  it('gives each instance on a page its own id', () => {
    const [a, b] = idsOfTwo(TwSwitch, 'input', {})
    expect(a).toBeTruthy()
    expect(a).not.toBe(b)
  })

  it('uses formNameAndId when given', () => {
    expect(mount(TwSwitch, { props: { formNameAndId: 'given' } }).get('input').attributes('id')).toBe('given')
  })

  it('announces itself as a switch, with its state', async () => {
    const w = mount(TwSwitch, { props: { modelValue: true } })
    expect(w.attributes('role')).toBe('switch')
    expect(w.attributes('aria-checked')).toBe('true')
    await w.trigger('click')
    expect(w.attributes('aria-checked')).toBe('false')
  })

  it('is labelled by its slot, and marks itself disabled', () => {
    const w = mount(TwSwitch, { props: { disabled: true }, slots: { default: 'Dark mode' } })
    expect(w.get(`#${CSS.escape(w.attributes('aria-labelledby'))}`).text()).toBe('Dark mode')
    expect(w.attributes('aria-disabled')).toBe('true')
  })

  it('hides its form checkbox from assistive technology', () => {
    expect(mount(TwSwitch).get('input').attributes()).toMatchObject({ 'aria-hidden': 'true', tabindex: '-1' })
  })

  it('toggles on Space, as a switch should', async () => {
    const w = mount(TwSwitch)
    await w.trigger('keydown', { key: ' ', code: 'Space' })
    expect(w.emitted('update:modelValue')).toEqual([[true]])
  })

  it.each(COLORS)('takes its tone from color: %s', (color) => {
    expect(toneOf(mount(TwSwitch, { props: { color } }))).toBe(color)
  })

  describe('class contract', () => {
    it('off and on', () => {
      expect({
        off: parts(mount(TwSwitch)),
        on: parts(mount(TwSwitch, { props: { modelValue: true } })),
      }).toMatchSnapshot()
    })

    it('sizes and disabled', () => {
      expect({
        sm: parts(mount(TwSwitch, { props: { size: 'sm' } })),
        lg: parts(mount(TwSwitch, { props: { size: 'lg' } })),
        disabled: parts(mount(TwSwitch, { props: { disabled: true } })),
      }).toMatchSnapshot()
    })
  })
})
