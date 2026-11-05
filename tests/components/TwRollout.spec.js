import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwRollout } from '@/components'
import { COLORS, classes, toneOf } from '../helpers'

const rollout = (props = {}) => mount(TwRollout, { props, slots: { default: '<p class="content">Panel</p>' } })
const panel = (w) => w.get('.min-h-screen')

describe('TwRollout', () => {
  it('renders its slot only while open', async () => {
    const w = rollout()
    expect(w.find('.content').exists()).toBe(false)
    await w.setProps({ modelValue: true })
    expect(w.find('.content').exists()).toBe(true)
  })

  it('slides in from the left, or down from the top when aligned right', () => {
    expect(rollout().classes()).toContain('-translate-x-full')
    expect(rollout({ modelValue: true }).classes()).toContain('translate-x-0')
    expect(rollout({ alignRight: true }).classes()).toContain('-translate-y-full')
    expect(rollout({ alignRight: true, modelValue: true }).classes()).toContain('-translate-y-0')
  })

  it('closes from the close icon', async () => {
    const w = rollout({ modelValue: true })
    await w.get('[data-icon="fa-regular fa-circle-xmark"]').trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([[false]])
  })

  it('closes when the backdrop is clicked', async () => {
    const w = rollout({ modelValue: true })
    await w.get('.fixed').trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([[false]])
  })

  it('applies the width and z-index it is given', () => {
    const w = rollout({ modelValue: true, width: 'w-96', zIndex: '40' })
    expect(panel(w).classes()).toEqual(expect.arrayContaining(['w-96', 'z-40']))
    expect(w.classes()).toContain('z-40')
  })

  it('can drop the backdrop blur', () => {
    expect(rollout({ blur: false }).get('.fixed').classes()).not.toContain('backdrop-blur-sm')
  })

  it.each(COLORS)('takes its tone from color: %s', (color) => {
    expect(toneOf(rollout({ color }))).toBe(color)
  })

  describe('class contract', () => {
    it('panel and close icon', () => {
      const w = rollout({ modelValue: true })
      expect({ panel: classes(panel(w)), close: classes(w.get('[data-icon]')) }).toMatchSnapshot()
    })

    it('aligned right', () => {
      expect(classes(panel(rollout({ alignRight: true, modelValue: true })))).toMatchSnapshot()
    })
  })
})
