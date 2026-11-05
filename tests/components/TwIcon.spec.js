import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwIcon } from '@/components'

// The real Font Awesome component, not the global stub, so these tests prove
// icons actually render.
const real = (props) => mount(TwIcon, { props, global: { stubs: { FontAwesomeIcon: false } } })

describe('TwIcon', () => {
  it('asks Font Awesome for a solid icon by default', () => {
    const stubbed = mount(TwIcon, { props: { icon: 'gauge' } })
    expect(stubbed.get('i').attributes('data-icon')).toBe('fa-solid fa-gauge')
  })

  it('asks for a regular icon when set="regular"', () => {
    const stubbed = mount(TwIcon, { props: { icon: 'bell', set: 'regular' } })
    expect(stubbed.get('i').attributes('data-icon')).toBe('fa-regular fa-bell')
  })

  it('renders the SVG for a solid icon', () => {
    const svg = real({ icon: 'gauge' }).get('svg')
    expect(svg.classes()).toEqual(expect.arrayContaining(['svg-inline--fa', 'fa-gauge']))
    expect(svg.attributes('data-prefix')).toBe('fas')
  })

  it('renders the SVG for a regular icon', () => {
    expect(real({ icon: 'bell', set: 'regular' }).get('svg').attributes('data-prefix')).toBe('far')
  })

  it('accepts only the documented sets', () => {
    const { validator } = TwIcon.props.set
    expect(['regular', 'solid', 'brand'].every(validator)).toBe(true)
    expect(validator('light')).toBe(false)
  })

  it('asks for the brands set with the fa-brands prefix', () => {
    const stubbed = mount(TwIcon, { props: { icon: 'github', set: 'brand' } })
    expect(stubbed.get('i').attributes('data-icon')).toBe('fa-brands fa-github')
  })

  it.fails('renders a brand icon when set="brand" (known bug: the brands pack is never loaded)', () => {
    // Deferred to the icon tree-shaking work: registering the whole brands
    // pack would add ~220 kB gzipped to every page. Font Awesome logs a
    // "Could not find one or more icon(s)" error while this bug exists.
    expect(real({ icon: 'github', set: 'brand' }).find('svg').exists()).toBe(true)
  })
})
