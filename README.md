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

The library needs Vue 3.5 or later, which your project provides: it is a peer dependency, not bundled.

### Tailwind CSS 3

Point Tailwind's `content` at the library, so it generates the classes the components use, and add the library's plugin, which publishes your theme colours as the CSS variables the components read. There is no safelist.

```javascript
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,vue}',
    './node_modules/vue3-tailwind-components/dist/vue3-tailwind-components.es.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.slate,
        secondary: colors.lime,
        warning: colors.amber,
        success: colors.green,
        danger: colors.red,
        info: colors.indigo,
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('vue3-tailwind-components/tailwind')(),
  ],
}
```

The plugin publishes the six theme colours above. To use other palette names as a `color`, list them: `require('vue3-tailwind-components/tailwind')({ colors: ['primary', 'secondary', 'warning', 'success', 'danger', 'info', 'teal'] })`.

### UnoCSS, or your own setup

The components need two things from the page:

1. **Palette variables** on `:root`, one per colour and shade, named `--{colour}-{shade}` for shades 50 to 900: `--primary-500: #64748b;` and so on. Content Head already publishes these from its theme. With UnoCSS, a preflight can write them from `theme.colors`.
2. **The utility classes the components use**, all of the form `bg-[color:var(--c-soft)]`. UnoCSS's wind preset and Tailwind generate these when they scan the library's `dist` file, or, with the UnoCSS runtime, from the page itself.

### Using the components

Import the ones you want:

```vue
<tw-button>My Button</tw-button>
<script setup>
  import { TwButton } from 'vue3-tailwind-components'
</script>
```

### Colours

Every component takes a `color`:

- **A theme colour name**: `primary`, `secondary`, `warning`, `success`, `danger`, `info`, or any name the page publishes as `--{name}-{shade}` variables.
- **Any CSS colour**: `#7c3aed`, `rgb(...)`. The components mix a full set of shades from it.

```vue
<tw-button color="success">Save</tw-button>
<tw-badge color="#7c3aed">Beta</tw-badge>
```

A component never builds class names from its colour. Instead, `color` gives it a *tone*: a ramp of shades, `--t-50` to `--t-900`, set inline on the component. A stylesheet the library adds to the page once maps that ramp to semantic *slots*, which the components' classes use:

| Slot | Role | Light | Dark |
|---|---|---|---|
| `solid`, `solid-hover` | filled controls | 500, 700 | 500, 700 |
| `on-solid` | text on solid | white | white |
| `soft`, `soft-hover` | tinted areas | 200, 300 | 600, 500 |
| `on-soft` | text on soft | 800 | 200 |
| `subtle` | faint tints, hovers | 100 | 800 |
| `surface` | panels and fields | white | 900 |
| `line`, `line-muted` | borders, dividers | 500, 200 | 500, 700 |
| `fg`, `fg-strong`, `fg-muted` | text | 500, 700, 400 | 200, 100, 400 |
| `accent` | native control accents | 600 | 400 |
| `backdrop` | overlays | 700 at 50% | 700 at 50% |
| `selected`, `selected-hover`, `on-selected` | selection | as soft | as soft |

**Selection** looks the same everywhere: a selected outline button, button-group item, page number or option uses the `selected` slots, in the component's own tone.

**Text on solid fills** is white. A theme can change it per colour, for example `--success-on-solid: #111;` on `:root`.

**Your own elements** can use a tone too: `useTone()` and `tone()` are exported.

```vue
<div v-bind="toneAttrs" class="bg-[color:var(--c-soft)] text-[color:var(--c-on-soft)]">...</div>
<script setup>
  import { useTone } from 'vue3-tailwind-components'
  const toneAttrs = useTone('info')
</script>
```

### Dark mode

Every component has dark-mode colours. The slots switch to their dark values inside an element with the `dark` class, normally `<html class="dark">`, matching Tailwind's `darkMode: 'class'`.

### Upgrading to 1.0

- Remove the regex safelist from your Tailwind config and add the plugin, as above.
- `TwButton`'s `selectedColor` is deprecated and has no effect: a selected button uses its own `color`. Make toggles `outline` buttons.
- `TwTable` has a single `color` for its body. `headingColor` still sets the heading. `borderColor`, `stripeColor`, `hoverColor` and `selectColor` are deprecated and have no effect.
- Shades now follow the slot table, so some colours shift slightly, mostly in dark mode.

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

### Run the tests

```sh
npm test            # once
npm run test:watch  # re-run on change
```

The suite (Vitest, Vue Test Utils and happy-dom) pins each component's public contract: props, events, `v-model`, slots and the classes it renders for each colour. Class snapshots live in `tests/components/__snapshots__`. A change to them is a change to how components look, so review the diff before updating with `npx vitest run -u`.

Known bugs are recorded as `it.fails(...)` tests, which pass while the bug exists. When you fix one, that test starts failing: change `it.fails` to `it` and it becomes an ordinary regression test.
