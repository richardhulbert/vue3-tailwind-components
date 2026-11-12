#  Icons
tw-icon renders Font Awesome's free icons: solid, regular and brands. You can browse them
[here](https://fontawesome.com/search?o=r&m=free).

Font Awesome is a peer dependency, not part of the library's bundle, and no icon pack is registered for you. Your
bundler only ships the icons you use. Give tw-icon an icon in one of four ways.

**1. A definition** (smallest, and needs no setup). Import the icon and pass it:

```vue
<script setup>
import { faUser } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <tw-icon :icon="faUser"></tw-icon>
</template>
```

`set` is ignored: the definition carries its own set.

**2. A registered name.** Register the icons you use once, at startup, and keep using names:

```javascript
import { registerIcons } from 'vue3-tailwind-components/icons'
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'

registerIcons(faUser, faTrash, faBell)
```

```vue
<tw-icon icon="user"></tw-icon>
<tw-icon icon="bell" set="regular"></tw-icon>
```

A name's aliases work too: registering `faXmark` also makes `times` and `close` available.

**3. Any name, loaded on demand.** Install a loader, and each pack is fetched the first time an icon from its set is
asked for. Your bundler puts each pack in a chunk of its own, served from your own site.

```javascript
import { setIconLoader, createPackLoader } from 'vue3-tailwind-components/icons'

setIconLoader(createPackLoader({
  solid:   () => import('@fortawesome/free-solid-svg-icons'),
  regular: () => import('@fortawesome/free-regular-svg-icons'),
  brand:   () => import('@fortawesome/free-brands-svg-icons'),
}))
```

```vue
<tw-icon icon="github" set="brand"></tw-icon>
```

While an icon loads, tw-icon shows an empty 1em × 1em box, so nothing moves when it arrives. The loader only runs in
the browser: when rendering on the server, an unregistered name renders the box, which loads after hydration.
Leave out any set you don't use. You can also write your own loader: `setIconLoader((set, name) => …)` returns a
promise of a definition, or of `undefined` when there is no such icon.

**4. Everything, as in 1.x.** One import registers every solid and regular icon (not brands), and adds them all to
your bundle:

```javascript
import 'vue3-tailwind-components/icons/all'
```

A name that isn't registered and can't be loaded renders a skull and crossbones, and logs a warning once in
development.

The library's own components register the five icons they use (`caret-down`, `chevron-down`, `circle-info`,
`skull-crossbones` and regular `circle-xmark`), so they work with no setup.

### Storing icons with content

If content saves an icon, save its definition rather than its name: the definition is a few hundred bytes, renders
without a loader or a pack, and doesn't break if Font Awesome renames the icon. `loadIcon(set, name)` returns the
definition for a name, from the registry or the loader.

```javascript
import { loadIcon } from 'vue3-tailwind-components/icons'

block.icon = { name: 'user', definition: await loadIcon('solid', 'user') }
```

```vue
<tw-icon :icon="block.icon.definition"></tw-icon>
```

### Styling

You can further style the icon in all the usual Tailwind ways:

```vue
<tw-icon icon="user" class="bg-primary-200 ml-2"></tw-icon>
```

Additionally, you can add animations to the icon:

```vue
<tw-icon icon="user" spin></tw-icon>
```

## Properties
| Property  |      Type      | Required |     default      | notes                                                                    |
|:----------|:--------------:|:--------:|:----------------:|:-------------------------------------------------------------------------|
| icon      | String, Object |  false   | skull-crossbones | A Font Awesome definition, or its name without the 'fa-' prefix          |
| set       |     String     |  false   |      solid       | 'solid', 'regular' or 'brand', for a name. Ignored for a definition      |
| animation |     String     |  false   |                  | possible values [spin,shake,flip,bounce,beat-fade,beat,fade]             |

## `vue3-tailwind-components/icons`

| Export                     | What it does                                                                         |
|:---------------------------|:-------------------------------------------------------------------------------------|
| `registerIcons(...icons)`  | Registers definitions, arrays of them, or whole packs, by name and alias             |
| `setIconLoader(fn)`        | Installs the loader for unregistered names: `fn(set, name)` returns a promise         |
| `createPackLoader(packs)`  | A loader that imports a whole pack per set, once                                     |
| `resolveIcon(set, name)`   | The registered definition, or `undefined`                                            |
| `loadIcon(set, name)`      | A promise of the definition, from the registry or the loader                         |
| `isIconDefinition(value)`  | Whether a value is a Font Awesome definition                                         |
