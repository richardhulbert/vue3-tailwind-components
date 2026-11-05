import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwButton } from '@/components'
import { COLORS, classes } from '../helpers'

describe('TwButton', () => {
  it('renders its default slot inside a native button', () => {
    const w = mount(TwButton, { slots: { default: 'Save' } })
    expect(w.element.tagName).toBe('BUTTON')
    expect(w.text()).toBe('Save')
  })

  it('passes click through to the native button', async () => {
    // Content Head relies on this in ~280 places: `click` is deliberately not a
    // declared event, so the listener lands on the <button>.
    const onClick = vi.fn()
    const w = mount(TwButton, { attrs: { onClick } })
    await w.trigger('click')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('sets the native disabled attribute', () => {
    const w = mount(TwButton, { props: { disabled: true } })
    expect(w.attributes('disabled')).toBeDefined()
  })

  it('rejects an unknown size or variant', () => {
    const { size, variant } = TwButton.props
    expect(size.validator('xl')).toBe(false)
    expect(variant.validator('pill')).toBe(false)
    expect(['sm', 'md', 'lg'].every(size.validator)).toBe(true)
    expect(['', 'round', 'square'].every(variant.validator)).toBe(true)
  })

  it('submits an enclosing form by default, as a native button does', () => {
    // Intended: ~70 Content Head forms rely on a plain <tw-button> submitting.
    expect(mount(TwButton).attributes('type')).toBe('submit')
  })

  it('takes type="button" for a button that should not submit', () => {
    expect(mount(TwButton, { props: { type: 'button' } }).attributes('type')).toBe('button')
  })

  it('accepts only the native button types', () => {
    const { validator } = TwButton.props.type
    expect(['submit', 'button', 'reset'].every(validator)).toBe(true)
    expect(validator('link')).toBe(false)
  })

  describe('class contract', () => {
    it.each(COLORS)('%s: solid, outline and menu', (color) => {
      expect({
        solid: classes(mount(TwButton, { props: { color } })),
        outline: classes(mount(TwButton, { props: { color, outline: true } })),
        menu: classes(mount(TwButton, { props: { color, outline: true, menu: true } })),
      }).toMatchSnapshot()
    })

    it('sizes, variants, disabled and selected', () => {
      expect({
        sm: classes(mount(TwButton, { props: { size: 'sm' } })),
        lg: classes(mount(TwButton, { props: { size: 'lg' } })),
        round: classes(mount(TwButton, { props: { variant: 'round' } })),
        square: classes(mount(TwButton, { props: { variant: 'square' } })),
        disabled: classes(mount(TwButton, { props: { disabled: true } })),
        selected: classes(mount(TwButton, { props: { selected: true } })),
        selectedOutline: classes(mount(TwButton, { props: { selected: true, outline: true, selectedColor: 'success' } })),
      }).toMatchSnapshot()
    })
  })
})
