# vue3-tailwind-components

This is a simple set of Vue 3, Tailwind based components. At the moment these consist of:

* [Button](./src/components/button/README.md)
* [Button Group](./src/components/buttonGroup/README.md)
* [Badge](./src/components/badge/README.md)
* [Table](./src/components/table/README.md)
* [Paginator](./src/components/paginator/README.md)
* [Icons](./src/components/icons/README.md)
* [Modal](./src/components/modal/README.md)
* [Rollout](./src/components/rollout/README.md)
* [Dropdown](./src/components/dropdown/README.md)
* [Notication (Toast)](./src/components/notification/README.md)
* [Collapse](./src/components/collapse/README.md)

* Form elements
*
    * [Select](./src/components/select/README.md)
*
    * [Input](./src/components/input/README.md)

    * [Range (slider)](./src/components/range/README.md)
*
    * [Textarea](./src/components/textarea/README.md)
*
    * [Switch](./src/components/switch/README.md)

## Demo

I have done a simple demo page [here](https://richardhulbert.github.io/vue3-tailwind-components/index.html) which should
give you some idea as to how they look and behave. Please feel free to email me with suggestions or make a pull request. richard@codevanilla.com

## Installation

```shell
npm i vue3-tailwind-components --save
```

Edit `tailwind.config.js` to look like this. Be especially careful to include this line
`"./node_modules/vue3-tailwind-components/dist/vue3-tailwind-components.es.js"` it tells Tailwind to that we want to use
classes that are computed in the components.

Here is a boilerplate tailwind config:

```javascript
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,vue}",
  ],
  safelist: [
    {
      pattern: /bg-(primary|secondary|warning|success|danger|info)-(\d00)/,
      variants:  ['hover', 'focus', 'file','dark', 'dark:hover'],
    },
    {
      pattern: /border-(primary|secondary|warning|success|danger|info)-(\d00)/,
      variants:  ['dark', 'dark:hover'],
    },
    {
      pattern: /divide-(primary|secondary|warning|success|danger|info)-(\d00)/,
      variants:  ['dark', 'dark:hover'],
    },
    {
      pattern: /text-(\w+)-(\d00)/,
      variants:['file','dark']
    },
    {
      pattern: /accent-(\w+)-(\d00)/,
      variants:['file','dark']
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
```

You can then just import the ones you want to use like this:

```vue


<tw-button>My Button</tw-button>
<script setup>
  import {TwButton} from "vue3-tailwind-components"
</script>
```

### Colors

I expect that if you use this library you will already understand how to use Tailwind generally. It comes with a
generous
color pallet of gradated colors. In the background Tailwind strips out the classes it does not see directly in your code
to keep your css small
but this creates a problem for us. It cannot see computed (concatenated strings). In order to use our components you
will need to edit your.
`tailwind.config.js` file in the root of your project.

If you want to use every color that Tailwind supply in their default theme you could use this safe list:

```javascript
 ...
safelist: [
  {
    pattern: /bg-(primary|secondary|warning|success|danger|info)-(\d00)/,
    variants:  ['hover', 'focus', 'file','dark', 'dark:hover'],
  },
  {
    pattern: /border-(primary|secondary|warning|success|danger|info)-(\d00)/,
    variants:  ['dark', 'dark:hover'],
  },
  {
    pattern: /divide-(primary|secondary|warning|success|danger|info)-(\d00)/,
    variants:  ['dark', 'dark:hover'],
  },
  {
    pattern: /text-(\w+)-(\d00)/,
    variants:['file','dark']
  },
  {
    pattern: /accent-(\w+)-(\d00)/,
    variants:['file','dark']
  },
  {
    pattern: /placeholder-(\w+)-(\d00)/,
  },

],

```

This tells Tailwind - Do not remove any color classes for background, border or text (that is over 2000!) from the CSS.

A more optimal solution is to use color aliases. Those who have used Bootstrap css will be familiar with color aliasing.
The advantage of this approach is that we can control the color of all components from one place.

### Dark mode

All the components have dark mode styling. if that is your bag

Color aliases in `tailwind.config.js` like this:

```javascript
...
theme: {
    extend: {
        colors:{
            primary:colors.slate,
                secondary
        :
            colors.lime,
                warning
        :
            colors.amber,
                success
        :
            colors.green,
                danger
        :
            colors.red,
                info
        :
            colors.indigo
        }
    }
,
}
...
```

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
