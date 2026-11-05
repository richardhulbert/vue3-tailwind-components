import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwNotification } from '@/components'
import { COLORS, classes, toneOf, vueWarnings } from '../helpers'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

const closeIcon = (w) => w.get('[data-icon="fa-regular fa-circle-xmark"]')

describe('TwNotification', () => {
  it('renders nothing while closed', () => {
    expect(mount(TwNotification).find('[role="alert"]').exists()).toBe(false)
  })

  it('shows its message and icon as an alert', () => {
    const w = mount(TwNotification, { props: { modelValue: true, message: 'Saved', icon: 'check' } })
    expect(w.get('[role="alert"]').text()).toContain('Saved')
    expect(w.find('[data-icon="fa-solid fa-check"]').exists()).toBe(true)
  })

  it('closes itself once after its lifetime', () => {
    const w = mount(TwNotification, { props: { modelValue: true, lifetime: 2 } })
    vi.advanceTimersByTime(1999)
    expect(w.emitted('update:modelValue')).toBeUndefined()
    vi.advanceTimersByTime(5000)
    expect(w.emitted('update:modelValue')).toEqual([[false]])
  })

  it('stays open with a lifetime of 0', () => {
    const w = mount(TwNotification, { props: { modelValue: true, lifetime: 0 } })
    vi.advanceTimersByTime(60_000)
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })

  it('closes from the close icon', async () => {
    const w = mount(TwNotification, { props: { modelValue: true } })
    await closeIcon(w).trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([[false]])
  })

  it('accepts every position it styles', () => {
    const { validator } = TwNotification.props.position
    expect(['center', 'top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'].every(validator)).toBe(true)
    expect(validator('middle')).toBe(false)
  })

  it('takes a bottom position without Vue warnings', () => {
    const warnings = vueWarnings(() => mount(TwNotification, { props: { modelValue: true, position: 'bottom-left' } }))
    expect(warnings).toEqual([])
  })

  it('cancels its timer when unmounted', () => {
    const w = mount(TwNotification, { props: { modelValue: true, lifetime: 5 } })
    w.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('restarts its lifetime when re-opened, closing only once', async () => {
    const w = mount(TwNotification, { props: { modelValue: true, lifetime: 2 } })
    vi.advanceTimersByTime(1500)
    await w.setProps({ modelValue: false })
    await w.setProps({ modelValue: true })
    vi.advanceTimersByTime(1500)
    expect(w.emitted('update:modelValue')).toBeUndefined()
    vi.advanceTimersByTime(600)
    expect(w.emitted('update:modelValue')).toEqual([[false]])
  })

  it('cancels its timer when closed by hand', async () => {
    const w = mount(TwNotification, { props: { modelValue: true, lifetime: 5 } })
    await w.get('[data-icon="fa-regular fa-circle-xmark"]').trigger('click')
    expect(vi.getTimerCount()).toBe(0)
  })

  it.each(COLORS)('takes its tone from color: %s', (color) => {
    expect(toneOf(mount(TwNotification, { props: { modelValue: true, color } }).get('[role="alert"]'))).toBe(color)
  })

  describe('class contract', () => {
    it('alert and close icon', () => {
      const w = mount(TwNotification, { props: { modelValue: true } })
      expect({ alert: classes(w.get('[role="alert"]')), close: classes(closeIcon(w)) }).toMatchSnapshot()
    })

    it('positions', () => {
      const alert = (position) => classes(mount(TwNotification, { props: { modelValue: true, position } }).get('[role="alert"]'))
      expect({
        center: alert('center'),
        topCenter: alert('top-center'),
        topLeft: alert('top-left'),
        topRight: alert('top-right'),
        bottomCenter: alert('bottom-center'),
        bottomLeft: alert('bottom-left'),
        bottomRight: alert('bottom-right'),
      }).toMatchSnapshot()
    })
  })
})
