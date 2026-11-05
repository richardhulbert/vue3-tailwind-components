/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,vue}",
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
  plugins: [
    require("tailwindcss-animate"),
    // Publishes --primary-500 and so on, which the components read.
    require("./plugin/tailwind.cjs")(),
  ],
}
