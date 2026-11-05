import { describe, it, expect } from 'vitest'
import ColorUtils from '@/utils/ColorUtils'

const cu = new ColorUtils()

describe('ColorUtils.contrastingColor', () => {
  it('lightens a dark colour', () => {
    expect(cu.contrastingColor('#202020')).toBe('#a7a7a7')
  })

  it('pads low channels to two digits', () => {
    expect(cu.contrastingColor('#ff8080')).toBe('#780000')
  })

  it('darkens a light colour', () => {
    expect(cu.contrastingColor('#e0e0e0')).toBe('#595959')
  })

  it('accepts a custom factor', () => {
    expect(cu.contrastingColor('#202020', 16)).toBe('#303030')
  })

  it('clamps channels to 0 to 255', () => {
    expect(cu.contrastingColor('#f0f0f0', 300)).toBe('#000000')
  })

  it('always returns a valid six-digit hex', () => {
    // Unpadded channels once gave '#7800' for '#ff8080', which a browser
    // ignores, so TwBadge swatches lost their text colour.
    for (const c of ['#ff8080', '#ffff00', '#f0f0f0']) {
      expect(cu.contrastingColor(c)).toMatch(/^#[0-9a-f]{6}$/)
    }
  })
})
