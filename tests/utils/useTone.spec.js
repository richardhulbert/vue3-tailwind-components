import { describe, it, expect } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { tone, toneStyles, ensureToneStyles, useTone, SHADES, SLOTS } from '@/components/composables/useTone'

describe('tone()', () => {
  it('reads the palette variables for a theme colour name', () => {
    const vars = tone('success')
    expect(vars['--t-500']).toBe('var(--success-500, success)')
    expect(vars['--t-200']).toBe('var(--success-200, color-mix(in oklab, success 40%, white))')
  })

  it('covers every shade from 50 to 900, and nothing past it', () => {
    expect(Object.keys(tone('primary')).filter((k) => k !== '--t-on-solid')).toEqual(SHADES.map((s) => `--t-${s}`))
    expect(tone('primary')['--t-950']).toBeUndefined()
  })

  it('mixes a ramp from a CSS colour, which has no palette variables', () => {
    const vars = tone('#7c3aed')
    expect(vars['--t-500']).toBe('#7c3aed')
    expect(vars['--t-100']).toBe('color-mix(in oklab, #7c3aed 20%, white)')
    expect(vars['--t-800']).toBe('color-mix(in oklab, #7c3aed 55%, black)')
  })

  it('treats functional colours as CSS colours too', () => {
    expect(tone('rgb(10, 20, 30)')['--t-500']).toBe('rgb(10, 20, 30)')
  })

  it('makes text on solid fills white, unless the theme overrides it per colour', () => {
    expect(tone('warning')['--t-on-solid']).toBe('var(--warning-on-solid, #ffffff)')
    expect(tone('#123456')['--t-on-solid']).toBe('#ffffff')
  })

  it('falls back to primary for an empty colour', () => {
    expect(tone('')['--t-500']).toBe(tone('primary')['--t-500'])
    expect(tone(undefined)['--t-500']).toBe(tone('primary')['--t-500'])
  })
})

describe('toneStyles()', () => {
  const css = toneStyles()

  it('maps every slot for light mode on [data-tone]', () => {
    const light = css.match(/^\[data-tone\]\{(.*?)\}/)[1]
    for (const name of Object.keys(SLOTS)) expect(light).toContain(`--c-${name}:`)
    expect(light).toContain('--c-soft:var(--t-200);')
    expect(light).toContain('--c-surface:#ffffff;')
  })

  it('remaps the slots for dark mode under .dark', () => {
    const dark = css.match(/\.dark \[data-tone\]\{(.*?)\}/)[1]
    expect(dark).toContain('--c-soft:var(--t-600);')
    expect(dark).toContain('--c-surface:var(--t-900);')
  })

  it('defines custom properties only, never other declarations', () => {
    const declarations = css.replace(/[^{]*\{([^}]*)\}/g, '$1').split(';').filter(Boolean)
    expect(declarations.every((d) => d.startsWith('--c-'))).toBe(true)
  })

  it('makes selection the soft slot, per the selection rule', () => {
    expect(css).toContain('--c-selected:var(--c-soft);')
    expect(css).toContain('--c-on-selected:var(--c-on-soft);')
  })
})

describe('ensureToneStyles()', () => {
  it('injects the stylesheet into <head> exactly once', () => {
    ensureToneStyles()
    ensureToneStyles()
    const styles = document.head.querySelectorAll('style[data-vtc-tones]')
    expect(styles).toHaveLength(1)
    expect(styles[0].textContent).toBe(toneStyles())
  })
})

describe('useTone()', () => {
  it('gives a component root data-tone and the ramp, following its colour', async () => {
    const color = ref('danger')
    const Probe = defineComponent({
      setup() {
        const attrs = useTone(color)
        return () => h('div', attrs.value)
      },
    })
    const w = mount(Probe)
    expect(w.attributes('data-tone')).toBe('')
    expect(w.element.style.getPropertyValue('--t-500')).toBe('var(--danger-500, danger)')
    color.value = 'info'
    await w.vm.$nextTick()
    expect(w.element.style.getPropertyValue('--t-500')).toBe('var(--info-500, info)')
  })
})
