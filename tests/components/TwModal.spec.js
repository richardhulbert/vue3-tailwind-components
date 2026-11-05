import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwModal, TwButton } from '@/components'
import { COLORS, classes } from '../helpers'

const shown = (props = {}, slots = {}) => mount(TwModal, { props: { modelValue: true, ...props }, slots })
const closeIcon = (w) => w.get('[data-icon="fa-regular fa-circle-xmark"]')

describe('TwModal', () => {
  it('renders nothing while closed', () => {
    expect(mount(TwModal).find('.fixed').exists()).toBe(false)
  })

  it('opens and closes with the model value', async () => {
    const w = mount(TwModal)
    await w.setProps({ modelValue: true })
    expect(w.find('.fixed').exists()).toBe(true)
    await w.setProps({ modelValue: false })
    expect(w.find('.fixed').exists()).toBe(false)
  })

  it('renders header, body and footer slots', () => {
    const w = shown({}, { header: '<h2>Title</h2>', default: '<p>Body</p>', footer: '<p>Foot</p>' })
    expect(w.text()).toContain('Title')
    expect(w.text()).toContain('Body')
    expect(w.text()).toContain('Foot')
  })

  it('has default header, body and an OK button', () => {
    const w = shown()
    expect(w.text()).toContain('Modal title')
    expect(w.findComponent(TwButton).text()).toBe('OK')
  })

  it('closes from the close icon, emitting update:modelValue and closed', async () => {
    const w = shown()
    await closeIcon(w).trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([[false]])
    expect(w.emitted('closed')).toHaveLength(1)
    expect(w.find('.fixed').exists()).toBe(false)
  })

  it('closes from the default OK button', async () => {
    const w = shown()
    await w.findComponent(TwButton).trigger('click')
    expect(w.emitted('closed')).toHaveLength(1)
  })

  it('can hide the header, close icon and footer', () => {
    const w = shown({ hideHeader: true, hideClose: true, hideFooter: true })
    expect(w.text()).not.toContain('Modal title')
    expect(w.find('[data-icon="fa-regular fa-circle-xmark"]').exists()).toBe(false)
    expect(w.get('.border-t').attributes('style')).toContain('display: none')
  })

  it('rejects an unknown size', () => {
    expect(TwModal.props.size.validator('xl')).toBe(false)
  })

  it('is announced as a modal dialog, labelled by its header', () => {
    const w = shown({}, { header: '<h2>Title</h2>' })
    const dialog = w.get('[role="dialog"][aria-modal="true"]')
    const header = w.get(`#${CSS.escape(dialog.attributes('aria-labelledby'))}`)
    expect(header.text()).toBe('Title')
  })

  it('has no label reference when the header is hidden', () => {
    expect(shown({ hideHeader: true }).get('[role="dialog"]').attributes('aria-labelledby')).toBeUndefined()
  })

  it('closes on Escape', async () => {
    const w = mount(TwModal, { props: { modelValue: true }, attachTo: document.body })
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await w.vm.$nextTick()
    expect(w.emitted('update:modelValue')).toEqual([[false]])
  })

  it('stays open on Escape when its close icon is hidden', async () => {
    const w = mount(TwModal, { props: { modelValue: true, hideClose: true }, attachTo: document.body })
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await w.vm.$nextTick()
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })

  it('ignores Escape while closed', async () => {
    const w = mount(TwModal, { attachTo: document.body })
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await w.vm.$nextTick()
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })

  describe('class contract', () => {
    it.each(COLORS)('%s', (color) => {
      const w = shown({ color, backgroundColor: color })
      expect({
        backdrop: classes(w.get('.backdrop-blur-sm')),
        panel: classes(w.get('.rounded-lg')),
        header: classes(w.get('.flex-1')),
        footer: classes(w.get('.border-t')),
        close: classes(closeIcon(w)),
      }).toMatchSnapshot()
    })

    it('sizes', () => {
      const panel = (size) => classes(shown({ size }).get('.rounded-lg'))
      expect({ sm: panel('sm'), md: panel('md'), lg: panel('lg') }).toMatchSnapshot()
    })
  })
})
