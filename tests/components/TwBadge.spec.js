import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwBadge } from '@/components'
import { COLORS, classes } from '../helpers'

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
    expect(mount(TwBadge, { props: { swatch: 'red' } }).attributes('style')).toBeUndefined()
  })

  it('rejects an unknown size', () => {
    expect(TwBadge.props.size.validator('xl')).toBe(false)
  })

  describe('class contract', () => {
    it.each(COLORS)('%s', (color) => {
      expect(classes(mount(TwBadge, { props: { color } }))).toMatchSnapshot()
    })

    it('sizes', () => {
      expect({
        sm: classes(mount(TwBadge, { props: { size: 'sm' } })),
        lg: classes(mount(TwBadge, { props: { size: 'lg' } })),
      }).toMatchSnapshot()
    })
  })
})
