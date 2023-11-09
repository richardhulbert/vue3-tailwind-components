/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,vue}",
  ],
  safelist: [
    {
      pattern: /bg-(primary|secondary|warning|success|danger|info)-(\d00)/,
      variants:  ['hover', 'focus', 'file'],
    },
    {
      pattern: /border-(primary|secondary|warning|success|danger|info)-(\d00)/,
    },
    {
      pattern: /text-(\w+)-(\d00)/,
      variants:['file']
    },
    {
      pattern: /placeholder-(\w+)-(\d00)/,
    },

  ],
  theme: {
    extend: {
      colors:{
        primary:colors.slate,
        secondary:colors.lime,
        warning:colors.amber,
        success:colors.green,
        danger:colors.red,
        info:colors.indigo
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
