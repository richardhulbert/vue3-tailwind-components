# Changelog

## 2.0.1 (unreleased)

### Fixed

- The internal icons are imported one module each (`@fortawesome/free-solid-svg-icons/faCaretDown`) instead of from the pack index. Importing the index statically stopped a consumer's bundler splitting the pack loader's packs into their own chunks, so the whole solid and regular packs stayed in the main bundle. (VT-9)

## 2.0.0 (unreleased)

### Breaking

- Font Awesome is a peer dependency and no longer bundled: install `@fortawesome/fontawesome-svg-core`, `@fortawesome/vue-fontawesome`, `@fortawesome/free-solid-svg-icons` and `@fortawesome/free-regular-svg-icons`. `@fortawesome/free-brands-svg-icons` is optional. (VT-9)
- `tw-icon` no longer registers every solid and regular icon. A name renders only if it is registered or a loader is installed; otherwise it renders the skull-crossbones fallback and warns once in development. `import 'vue3-tailwind-components/icons/all'` restores the 1.x behaviour. (VT-9)
- The UMD build is replaced by a CommonJS build (`dist/*.cjs.js`), which `require()` resolves to. There is no build for a `<script>` tag. (VT-9)

### Added

- `tw-icon`'s `icon` takes a Font Awesome definition (`:icon="faUser"`) as well as a name. So do `TwInput`'s and `TwNotification`'s `icon`, and the `icon` of `TwSelect`, `TwDropdown` and `TwButtonGroup` items. (VT-9)
- `vue3-tailwind-components/icons`: `registerIcons`, `setIconLoader`, `createPackLoader`, `resolveIcon`, `loadIcon` and `isIconDefinition`. (VT-9)
- A build test that fails if Font Awesome is compiled into `dist` or the ES build passes 200 kB. (VT-9)

### Fixed

- `set="brand"` renders brand icons, through the pack loader or registered brand icons. (VT-9)

### Size

- ES build: 1.25 MB → 58 kB (14 kB gzipped).
