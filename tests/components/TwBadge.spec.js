import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwBadge } from '@/components'
import { COLORS, classes, toneOf } from '../helpers'

describe('TwBadge', () => {
  it('shows "Badge" when given no content', () => {
    expect(mount(TwBadge).text()).toBe('Badge')
  })

  it('renders its default slot', () => {
    expect(mount(TwBadge, { slots: { default: 'New' } }).text()).toBe('New')
  })

  it('paints a hex swatch with a contrasting text colour', () => {
    const style = mount(TwBadge, { props: { swatch: '#202020' } }).attributes('style')
    expect(style).toContain('background: #202020')
    expect(style).toMatch(/color: #[0-9a-f]+/)
  })

  it('ignores a swatch that is not a hex colour', () => {
    const style = mount(TwBadge, { props: { swatch: 'red' } }).attributes('style')
    expect(style).not.toContain('background:')
    expect(style).not.toMatch(/(^|;)\s*color:/)
  })

  it('rejects an unknown size', () => {
    expect(TwBadge.props.size.validator('xl')).toBe(false)
  })

  it.each(COLORS)('takes its tone from color: %s', (color) => {
    expect(toneOf(mount(TwBadge, { props: { color } }))).toBe(color)
  })

  describe('class contract', () => {
    it('default and sizes', () => {
      expect({
        md: classes(mount(TwBadge)),
        sm: classes(mount(TwBadge, { props: { size: 'sm' } })),
        lg: classes(mount(TwBadge, { props: { size: 'lg' } })),
      }).toMatchSnapshot()
    })
  })
})
