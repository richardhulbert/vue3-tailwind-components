// The icon registry: every icon TwIcon can render by name, keyed
// `prefix:name` ('fas:caret-down'). Font Awesome's packs are never registered
// wholesale here, so the consumer's bundler can drop every icon nobody uses.
// Names that aren't registered can come from an optional async loader.

import { faCaretDown, faChevronDown, faCircleInfo, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

// TwIcon's `set` prop to Font Awesome's prefix.
export const SET_PREFIXES = { solid: 'fas', regular: 'far', brand: 'fab' }

// The icons the library's own components use, plus the fallback.
const INTERNAL_ICONS = [faCaretDown, faChevronDown, faCircleInfo, faSkullCrossbones, faCircleXmark]

export const FALLBACK_ICON = faSkullCrossbones

const icons = new Map()
const loads = new Map()
const warned = new Set()
let loader = null

// `process.env.NODE_ENV` is replaced by the consumer's bundler. Without one,
// `process` doesn't exist and this is a production build.
const DEV = (() => {
  try {
    return process.env.NODE_ENV !== 'production'
  } catch {
    return false
  }
})()

const keyOf = (set, name) => `${SET_PREFIXES[set] ?? set}:${name}`

// An IconDefinition: { prefix, iconName, icon: [width, height, aliases, unicode, path] }.
export function isIconDefinition(value) {
  return Boolean(value) && typeof value === 'object' && typeof value.prefix === 'string'
    && typeof value.iconName === 'string' && Array.isArray(value.icon)
}

function register(def, key = `${def.prefix}:${def.iconName}`) {
  icons.set(key, def)
}

// Registers icon definitions under their name and every string alias
// ('times' for 'xmark'). Takes definitions, arrays of them, or a whole pack
// object such as `fas`.
export function registerIcons(...defs) {
  for (const def of defs.flat(Infinity)) {
    if (isIconDefinition(def)) {
      register(def)
      for (const alias of def.icon[2] ?? []) {
        if (typeof alias === 'string') register(def, `${def.prefix}:${alias}`)
      }
    } else if (def && typeof def === 'object') {
      registerIcons(Object.values(def))
    }
  }
}

// Installs the async loader TwIcon calls for names that aren't registered:
// `fn(set, name)` returns a promise of an IconDefinition, or of undefined when
// there is no such icon. Pass null to remove it.
export function setIconLoader(fn) {
  loader = typeof fn === 'function' ? fn : null
  loads.clear()
}

export function hasIconLoader() {
  return loader !== null
}

// The registered definition for a name in a set, or undefined.
export function resolveIcon(set, name) {
  return icons.get(keyOf(set, name))
}

// The definition for a name in a set: from the registry if it's there,
// otherwise from the loader, whose answer is registered so later lookups are
// synchronous. The loader is asked once per name; a rejected load is
// forgotten, so the next request tries again.
export function loadIcon(set, name) {
  const hit = resolveIcon(set, name)
  if (hit) return Promise.resolve(hit)
  if (!loader) return Promise.resolve(undefined)

  const key = keyOf(set, name)
  if (!loads.has(key)) {
    const current = loader
    const load = Promise.resolve()
      .then(() => current(set, name))
      .then((def) => {
        if (!isIconDefinition(def)) return undefined
        registerIcons(def)
        register(def, key)
        return def
      })
      .catch((error) => {
        if (loads.get(key) === load) loads.delete(key)
        if (DEV) console.warn(`[TwIcon] Loading the ${set} icon "${name}" failed.`, error)
        return undefined
      })
    loads.set(key, load)
  }
  return loads.get(key)
}

// Warns, once per name and only in development, that an icon was not found.
export function warnMissingIcon(set, name) {
  const key = keyOf(set, name)
  if (!DEV || warned.has(key)) return
  warned.add(key)
  console.warn(
    `[TwIcon] No ${set} icon named "${name}" is registered${loader ? ' or loadable' : ''}. ` +
    'Pass a definition (:icon="faUser"), call registerIcons(), or install a loader with ' +
    "setIconLoader() from 'vue3-tailwind-components/icons'.",
  )
}

// Empties the registry back to the internal icons. For tests only.
export function resetIconRegistry() {
  icons.clear()
  loads.clear()
  warned.clear()
  loader = null
  registerIcons(INTERNAL_ICONS)
}

registerIcons(INTERNAL_ICONS)
