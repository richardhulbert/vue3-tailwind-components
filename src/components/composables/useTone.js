import { computed, toValue } from 'vue'

/*
 * Colour for every component comes from one tone, in three layers:
 *
 * 1. A shade ramp, --t-50 to --t-900, set inline on the component's root by
 *    tone(). A theme colour name reads the page's palette variables
 *    (--primary-500 and so on, which Content Head already publishes). A CSS
 *    colour, or a name with no palette variables, gets a ramp mixed from it.
 * 2. Semantic slots (--c-soft, --c-fg, ...), mapped from the ramp once, for
 *    light and dark, by a small stylesheet this module injects. It defines
 *    custom properties only, never utilities, so it cannot disturb the
 *    consumer's cascade layers.
 * 3. Components use fixed classes such as bg-[color:var(--c-soft)], which
 *    Tailwind and UnoCSS generate without any safelist.
 */

// Content Head's palettes run from 50 to 900, so slots never use 950.
export const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

// Each slot's value in light and dark mode: a ramp shade, or raw CSS.
export const SLOTS = {
  solid: [500, 500],
  'solid-hover': [700, 700],
  'on-solid': ['var(--t-on-solid)', 'var(--t-on-solid)'],
  soft: [200, 600],
  'soft-hover': [300, 500],
  'on-soft': [700, 200],
  subtle: [100, 800],
  surface: ['#ffffff', 900],
  line: [500, 500],
  'line-muted': [200, 700],
  fg: [500, 200],
  'fg-strong': [700, 100],
  'fg-muted': [400, 400],
  accent: [600, 400],
  // Uno drops opacity modifiers on variable colours, so the alpha lives here.
  backdrop: ['color-mix(in srgb, var(--t-700) 50%, transparent)', 'color-mix(in srgb, var(--t-700) 50%, transparent)'],
  // The selection rule: selected is soft in the component's own tone.
  selected: ['var(--c-soft)', 'var(--c-soft)'],
  'selected-hover': ['var(--c-soft-hover)', 'var(--c-soft-hover)'],
  'on-selected': ['var(--c-on-soft)', 'var(--c-on-soft)'],
}

const slotValue = (value) => (typeof value === 'number' ? `var(--t-${value})` : value)

const block = (mode) =>
  Object.entries(SLOTS).map(([name, values]) => `--c-${name}:${slotValue(values[mode])};`).join('')

/** The slot stylesheet, as CSS text, for consumers who want to ship it themselves. */
export function toneStyles() {
  return `[data-tone]{${block(0)}}.dark [data-tone]{${block(1)}}`
}

let injected = false

/** Adds the slot stylesheet to the document once. Safe to call anywhere. */
export function ensureToneStyles() {
  if (injected || typeof document === 'undefined') return
  injected = true
  if (document.querySelector('style[data-vtc-tones]')) return
  const style = document.createElement('style')
  style.setAttribute('data-vtc-tones', '')
  style.textContent = toneStyles()
  // First in <head>, so any stylesheet the consumer loads can override it.
  document.head.prepend(style)
}

// Lighter shades mix towards white, darker towards black; 500 is the colour.
const MIX = { 50: ['white', 10], 100: ['white', 20], 200: ['white', 40], 300: ['white', 60], 400: ['white', 80], 600: ['black', 85], 700: ['black', 70], 800: ['black', 55], 900: ['black', 40] }

const mixed = (color, shade) =>
  shade === 500 ? color : `color-mix(in oklab, ${color} ${MIX[shade][1]}%, ${MIX[shade][0]})`

const PALETTE_NAME = /^[a-z][a-z0-9-]*$/i

/**
 * The inline custom properties that give an element a tone.
 * `color` is a palette name ('primary', 'success', any name the page
 * publishes as --{name}-{shade}) or any CSS colour ('#7c3aed', 'rgb(...)').
 * A name with no palette variables falls back to a ramp mixed from it as a
 * CSS colour name, so 'white' or 'teal' still give a usable tone.
 */
export function tone(color) {
  const value = (color ?? '').toString().trim() || 'primary'
  const isName = PALETTE_NAME.test(value)
  const vars = {}
  for (const shade of SHADES) {
    vars[`--t-${shade}`] = isName ? `var(--${value}-${shade}, ${mixed(value, shade)})` : mixed(value, shade)
  }
  // Text on solid fills: white, unless the theme sets --{name}-on-solid.
  vars['--t-on-solid'] = isName ? `var(--${value}-on-solid, #ffffff)` : '#ffffff'
  return vars
}

/**
 * Attributes that give a component's root its tone: bind them with v-bind.
 * `color` may be a value, a ref or a getter.
 */
export function useTone(color) {
  ensureToneStyles()
  return computed(() => ({ 'data-tone': '', style: tone(toValue(color)) }))
}
