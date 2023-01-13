/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,vue}",
  ],
  safelist: [
    {
      pattern: /bg-(\w+)-(\d00)/,
      variants:  ['hover', 'focus'],
    },
    {
      pattern: /border-(\w+)-(\d00)/,
    },
    {
      pattern: /text-(\w+)-(\d00)/,
    },
  ],
  theme: {
    extend: {
      colors:{
        primary:colors.cyan,
        secondary:colors.lime
      }
    },
  },
  plugins: [],
}
