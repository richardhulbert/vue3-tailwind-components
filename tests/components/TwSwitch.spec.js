import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwSwitch } from '@/components'
import { COLORS, classes } from '../helpers'

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

  it.fails('gives each instance its own id (known bug: the default is computed once)', () => {
    const a = mount(TwSwitch).get('input').attributes('id')
    const b = mount(TwSwitch).get('input').attributes('id')
    expect(a).not.toBe(b)
  })

  it.fails('announces itself as a switch (known bug: no role or checked state)', () => {
    // Fix: role="switch" and aria-checked on the focusable element.
    const w = mount(TwSwitch, { props: { modelValue: true } })
    expect(w.attributes('role')).toBe('switch')
    expect(w.attributes('aria-checked')).toBe('true')
  })

  it.fails('toggles on Space, as a switch should (known bug: only Enter works)', async () => {
    const w = mount(TwSwitch)
    await w.trigger('keydown', { key: ' ', code: 'Space' })
    expect(w.emitted('update:modelValue')).toEqual([[true]])
  })

  describe('class contract', () => {
    it.each(COLORS)('%s: off and on', (color) => {
      expect({
        off: parts(mount(TwSwitch, { props: { color } })),
        on: parts(mount(TwSwitch, { props: { color, modelValue: true } })),
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
