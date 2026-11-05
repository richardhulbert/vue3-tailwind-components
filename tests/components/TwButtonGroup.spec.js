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

  it.fails('can be operated from the keyboard (known bug: items are clickable divs)', () => {
    // Fix: render items as buttons, with role="radio" and aria-checked.
    expect(parts(group())[0].element.tagName).toBe('BUTTON')
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
