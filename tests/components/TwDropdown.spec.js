import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwDropdown, TwButton } from '@/components'
import TwDropdownItem from '@/components/dropdown/TwDropdownItem.vue'
import { COLORS, classes, toneOf } from '../helpers'

const items = [{ id: 1, label: 'Edit', icon: 'pen' }, { id: 2, label: 'Delete' }]
const panel = (w) => w.get('.absolute')

describe('TwDropdown', () => {
  it('shows its label on the trigger button', () => {
    expect(mount(TwDropdown, { props: { label: 'Actions', items } }).findComponent(TwButton).text()).toBe('Actions')
  })

  it('keeps the menu hidden until the trigger is clicked', async () => {
    const w = mount(TwDropdown, { props: { items } })
    expect(panel(w).attributes('style')).toContain('display: none')
    await w.findComponent(TwButton).trigger('click')
    expect(panel(w).attributes('style') ?? '').not.toContain('display: none')
  })

  it('lists every item, with its icon when it has one', () => {
    const w = mount(TwDropdown, { props: { items } })
    expect(w.findAllComponents(TwDropdownItem).map((i) => i.text())).toEqual(['Edit', 'Delete'])
    expect(w.findAll('[data-icon="fa-solid fa-pen"]')).toHaveLength(1)
  })

  it('emits selected with the whole item and closes', async () => {
    const w = mount(TwDropdown, { props: { items } })
    await w.findComponent(TwButton).trigger('click')
    await w.findAllComponents(TwDropdownItem)[1].trigger('click')
    expect(w.emitted('selected')).toEqual([[items[1]]])
    expect(panel(w).attributes('style')).toContain('display: none')
  })

  it('closes when clicking outside', async () => {
    const w = mount(TwDropdown, { props: { items }, attachTo: document.body })
    // click-outside-vue3 attaches its listener a turn after mounting.
    await new Promise((resolve) => setTimeout(resolve))
    await w.findComponent(TwButton).trigger('click')
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await w.vm.$nextTick()
    expect(panel(w).attributes('style')).toContain('display: none')
  })

  it.each(COLORS)('takes its tone from color: %s', (color) => {
    const w = mount(TwDropdown, { props: { items, color } })
    expect(toneOf(w)).toBe(color)
    expect(toneOf(w.findComponent(TwButton))).toBe(color)
  })

  describe('class contract', () => {
    it('trigger, panel and item', () => {
      const w = mount(TwDropdown, { props: { items } })
      expect({
        trigger: classes(w.findComponent(TwButton)),
        outlineTrigger: classes(mount(TwDropdown, { props: { items, outline: true } }).findComponent(TwButton)),
        panel: classes(panel(w)),
        item: classes(w.findComponent(TwDropdownItem)),
      }).toMatchSnapshot()
    })
  })
})
