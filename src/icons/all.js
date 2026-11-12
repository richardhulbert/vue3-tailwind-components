// The `vue3-tailwind-components/icons/all` entry: registers every free solid
// and regular icon, as 1.x did on import. One line restores the old
// behaviour, and the old bundle size with it. Brands are not included.
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { registerIcons } from '@/components/icons/registry.js'

registerIcons(fas, far)
