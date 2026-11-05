import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwNotification } from '@/components'
import { COLORS, classes, vueWarnings } from '../helpers'

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

  it('accepts center and the top positions', () => {
    const { validator } = TwNotification.props.position
    expect(['center', 'top-left', 'top-right', 'top-center'].every(validator)).toBe(true)
  })

  it.fails('accepts the bottom positions it styles (known bug: the validator rejects them)', () => {
    // positionClass handles bottom-left, bottom-center and bottom-right, but the
    // validator does not list them, so Vue warns. Fix: add them to the validator.
    const warnings = vueWarnings(() => mount(TwNotification, { props: { modelValue: true, position: 'bottom-left' } }))
    expect(warnings).toEqual([])
  })

  it.fails('cancels its timer when unmounted (known bug: the interval leaks)', () => {
    // Fix: use setTimeout and clear it in onBeforeUnmount. Then change it.fails to it.
    const w = mount(TwNotification, { props: { modelValue: true, lifetime: 5 } })
    w.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  describe('class contract', () => {
    it.each(COLORS)('%s', (color) => {
      const w = mount(TwNotification, { props: { modelValue: true, color } })
      expect({ alert: classes(w.get('[role="alert"]')), close: classes(closeIcon(w)) }).toMatchSnapshot()
    })

    it('positions', () => {
      const alert = (position) => classes(mount(TwNotification, { props: { modelValue: true, position } }).get('[role="alert"]'))
      expect({
        center: alert('center'),
        topCenter: alert('top-center'),
        topLeft: alert('top-left'),
        topRight: alert('top-right'),
      }).toMatchSnapshot()
    })
  })
})
