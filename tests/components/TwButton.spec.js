import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwButton } from '@/components'
import { COLORS, classes, toneOf, vueWarnings } from '../helpers'

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

  it.each(COLORS)('takes its tone from color: %s', (color) => {
    expect(toneOf(mount(TwButton, { props: { color } }))).toBe(color)
  })

  it('marks outline and menu buttons as toggles with aria-pressed', () => {
    expect(mount(TwButton, { props: { outline: true } }).attributes('aria-pressed')).toBe('false')
    expect(mount(TwButton, { props: { outline: true, selected: true } }).attributes('aria-pressed')).toBe('true')
    expect(mount(TwButton).attributes('aria-pressed')).toBeUndefined()
  })

  it('warns that selectedColor is deprecated', () => {
    const warnings = vueWarnings(() => mount(TwButton, { props: { outline: true, selected: true, selectedColor: 'success' } }))
    expect(warnings.join()).toContain('selectedColor is deprecated')
  })

  it('ignores selected on a solid button, with a warning', () => {
    let w
    const warnings = vueWarnings(() => { w = mount(TwButton, { props: { selected: true } }) })
    expect(warnings.join()).toContain('selected applies to outline and menu buttons only')
    expect(classes(w)).toEqual(classes(mount(TwButton)))
  })

  describe('class contract', () => {
    it('solid, outline and menu, resting and selected', () => {
      expect({
        solid: classes(mount(TwButton)),
        outline: classes(mount(TwButton, { props: { outline: true } })),
        outlineSelected: classes(mount(TwButton, { props: { outline: true, selected: true } })),
        menu: classes(mount(TwButton, { props: { outline: true, menu: true } })),
        menuSelected: classes(mount(TwButton, { props: { outline: true, menu: true, selected: true } })),
      }).toMatchSnapshot()
    })

    it('sizes, variants and disabled', () => {
      expect({
        sm: classes(mount(TwButton, { props: { size: 'sm' } })),
        lg: classes(mount(TwButton, { props: { size: 'lg' } })),
        round: classes(mount(TwButton, { props: { variant: 'round' } })),
        square: classes(mount(TwButton, { props: { variant: 'square' } })),
        disabled: classes(mount(TwButton, { props: { disabled: true } })),
      }).toMatchSnapshot()
    })
  })
})
