// The `vue3-tailwind-components/icons` entry: register icons for TwIcon to
// render by name, or install a loader that fetches them on demand.
export {
  registerIcons,
  setIconLoader,
  resolveIcon,
  loadIcon,
  isIconDefinition,
} from '@/components/icons/registry.js'
export { createPackLoader } from '@/components/icons/packLoader.js'
