import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwCollapse } from '@/components'
import { COLORS, classes } from '../helpers'

const collapse = (props = {}) => mount(TwCollapse, { props, slots: { default: '<p class="content">Inside</p>' } })
const header = (w) => w.get('.cursor-pointer')

describe('TwCollapse', () => {
  it('shows its label and starts closed', () => {
    const w = collapse({ label: 'Details' })
    expect(header(w).text()).toBe('Details')
    expect(w.find('.content').exists()).toBe(false)
  })

  it('takes its header from the label slot', () => {
    const w = mount(TwCollapse, { slots: { label: '<em>Custom</em>' } })
    expect(header(w).find('em').text()).toBe('Custom')
  })

  it('opens and closes when the header is clicked', async () => {
    const w = collapse()
    await header(w).trigger('click')
    expect(w.find('.content').exists()).toBe(true)
    await header(w).trigger('click')
    expect(w.find('.content').exists()).toBe(false)
  })

  it('starts open when expanded, once mounted', async () => {
    // expanded is applied in mounted(), so the content appears on the next tick.
    const w = collapse({ expanded: true })
    await w.vm.$nextTick()
    expect(w.find('.content').exists()).toBe(true)
  })

  it.fails('follows later changes to expanded (known bug: read only on mount)', async () => {
    const w = collapse()
    await w.setProps({ expanded: true })
    expect(w.find('.content').exists()).toBe(true)
  })

  it.fails('can be operated from the keyboard (known bug: the header is a clickable div)', () => {
    // Fix: make the header a <button type="button"> with aria-expanded.
    expect(header(collapse()).element.tagName).toBe('BUTTON')
  })

  describe('class contract', () => {
    it.each(COLORS)('%s: header and chevron, closed and open', async (color) => {
      const w = collapse({ color })
      const closed = { header: classes(header(w)), chevron: classes(w.get('[data-icon]')) }
      await header(w).trigger('click')
      expect({ closed, open: { header: classes(header(w)), chevron: classes(w.get('[data-icon]')) } }).toMatchSnapshot()
    })

    it('disabled', () => {
      expect(classes(header(collapse({ disabled: true })))).toMatchSnapshot()
    })
  })
})
