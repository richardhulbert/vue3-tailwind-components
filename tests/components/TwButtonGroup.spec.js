import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwButtonGroup } from '@/components'
import TwButtonGroupItem from '@/components/buttonGroup/TwButtonGroupItem.vue'
import { COLORS, classes } from '../helpers'

const items = [
  { label: 'Light', value: 'light', icon: 'sun' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
]
const group = (props = {}) => mount(TwButtonGroup, { props: { items, ...props } })
const parts = (w) => w.findAllComponents(TwButtonGroupItem)

describe('TwButtonGroup', () => {
  it('renders one item per entry, with its icon when it has one', () => {
    const w = group()
    expect(parts(w).map((i) => i.text())).toEqual(['Light', 'Dark', 'System'])
    expect(w.findAll('[data-icon="fa-solid fa-sun"]')).toHaveLength(1)
  })

  it('emits update:modelValue with the value clicked', async () => {
    const w = group()
    await parts(w)[2].trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([['system']])
  })

  it('passes its size to every item', () => {
    expect(parts(group({ size: 'sm' })).map((i) => i.props('size'))).toEqual(['sm', 'sm', 'sm'])
  })

  it('renders items as buttons in a radio group', () => {
    const w = group({ modelValue: 'dark' })
    expect(w.attributes('role')).toBe('radiogroup')
    expect(parts(w).map((i) => [i.element.tagName, i.attributes('type'), i.attributes('role'), i.attributes('aria-checked')])).toEqual([
      ['BUTTON', 'button', 'radio', 'false'],
      ['BUTTON', 'button', 'radio', 'true'],
      ['BUTTON', 'button', 'radio', 'false'],
    ])
  })

  it('is a single Tab stop: the selected item, or the first when none is', () => {
    const stops = (props) => parts(group(props)).map((i) => i.attributes('tabindex'))
    expect(stops({ modelValue: 'dark' })).toEqual(['-1', '0', '-1'])
    expect(stops({})).toEqual(['0', '-1', '-1'])
  })

  it.each([
    ['ArrowRight', 'dark', 'system'],
    ['ArrowDown', 'dark', 'system'],
    ['ArrowLeft', 'dark', 'light'],
    ['ArrowUp', 'dark', 'light'],
    ['ArrowRight', 'system', 'light'],
    ['ArrowLeft', 'light', 'system'],
  ])('%s from %s selects %s, wrapping at the ends', async (key, from, to) => {
    const w = group({ modelValue: from })
    await w.trigger('keydown', { key })
    expect(w.emitted('update:modelValue')).toEqual([[to]])
  })

  it('moves focus with the selection', async () => {
    const w = mount(TwButtonGroup, {
      props: { items, modelValue: 'light', 'onUpdate:modelValue': (v) => w.setProps({ modelValue: v }) },
      attachTo: document.body,
    })
    await w.trigger('keydown', { key: 'ArrowRight' })
    await w.vm.$nextTick()
    expect(document.activeElement).toBe(parts(w)[1].element)
  })

  it('ignores other keys', async () => {
    const w = group({ modelValue: 'dark' })
    await w.trigger('keydown', { key: 'a' })
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })

  describe('class contract', () => {
    it.each(COLORS)('%s: group, item and selected item', (color) => {
      const w = group({ color, modelValue: 'dark' })
      expect({ group: classes(w), item: classes(parts(w)[0]), selected: classes(parts(w)[1]) }).toMatchSnapshot()
    })

    it('sizes', () => {
      const item = (size) => classes(parts(group({ size }))[0])
      expect({ xs: item('xs'), sm: item('sm'), md: item('md'), lg: item('lg') }).toMatchSnapshot()
    })
  })
})
