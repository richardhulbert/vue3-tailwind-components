# vue3-tailwind-components
This is a simple set of Vue 3, Tailwind based components. At the moment these consist of:
* [Button](./src/components/button/README.md)
* [Table](./src/components/table/README.md)
* [Paginator](./src/components/paginator/README.md)
* [Icons](./src/components/icons/README.md)
* [Modal](./src/components/modal/README.md)
* Form elements
* * [Select](./src/components/select/README.md)
* * [Input](./src/components/input/README.md)
* * [Switch](./src/components/switch/README.md)

## Installation


```shell
npm i vue3-tailwind-components --save
```

Edit `tailwind.config.js` to look like this.

```javascript
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
      variants:  ['hover', 'focus'],
    },
    {
      pattern: /border-(primary|secondary|warning|success|danger|info)-(\d00)/,
    },
    {
      pattern: /text-(primary|secondary|warning|success|danger|info)-(\d00)/,
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


```

You can then just import the ones you want to use.

```vue

```

### Colors
I expect that if you use this library you will already understand how to use Tailwind generally. It comes with a generous 
color pallet of gradated colors. In the background Tailwind strips out the classes it does not see directly in your code to keep your css small
but this creates a problem for us. It cannot see computed (concatenated strings). In order to use our components you will need to edit your.
`tailwind.config.js` file in the root of your project.

If you want to use every color that Tailwind supply in their default theme you could use this safe list:

```javascript
 ...
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
...
```

This tells Tailwind - Do not remove any color classes  for background, border or text (that is over 2000!) from the CSS.

A more optimal solution is to use color aliases. Those who have used Bootstrap css will be familiar with color aliasing. 
The advantage of this approach is that we can control the look of all components from one place. 


Another suggestion would be to create color aliases in `tailwind.config.js` like this:

```javascript
...
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
}
...
```
You can be more specific and therefore reduce the size of the resultant css by doing something like this

```javascript
{
    pattern: /border-(primary|seconday|warning|success|danger|info)-(50|100|200|300|500|700)/
}
```

You can then do something like this: 
```vue
<tw-button @click="clearProducts" color="primary" ouutline class="ml-3 ">Clear</tw-button>`
```
This is useful in the situation where you want to change the colour of a lot of buttons in one go.


## Running this project locally

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
