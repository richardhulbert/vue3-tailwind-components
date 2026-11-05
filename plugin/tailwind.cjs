/*
 * Tailwind CSS 3 plugin for vue3-tailwind-components.
 *
 * Publishes the palettes the components read as CSS variables on :root:
 * --{name}-{shade}, from your theme's colours. Content Head and other sites
 * that already publish these variables don't need it.
 *
 *   // tailwind.config.js
 *   plugins: [require('vue3-tailwind-components/tailwind')()]
 *
 * By default it publishes the six theme colour names the components use.
 * Pass { colors: [...] } to publish others too, for example
 * { colors: ['primary', 'secondary', 'warning', 'success', 'danger', 'info', 'slate'] }.
 */
const plugin = require('tailwindcss/plugin')

const DEFAULT_COLORS = ['primary', 'secondary', 'warning', 'success', 'danger', 'info']

module.exports = plugin.withOptions((options = {}) => ({ addBase, theme }) => {
  const vars = {}
  for (const name of options.colors ?? DEFAULT_COLORS) {
    const ramp = theme(`colors.${name}`)
    if (!ramp || typeof ramp !== 'object') continue
    for (const [shade, value] of Object.entries(ramp)) {
      if (typeof value === 'string') vars[`--${name}-${shade}`] = value
    }
  }
  addBase({ ':root': vars })
})
