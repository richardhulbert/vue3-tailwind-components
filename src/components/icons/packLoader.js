import { isIconDefinition } from './registry.js'

// 'circle-xmark' -> 'faCircleXmark', 'arrow-down-1-9' -> 'faArrowDown19'.
const exportName = (name) =>
  'fa' + String(name).split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('')

// Every definition a pack module exports, indexed by name and string alias.
function indexPack(pack) {
  const index = new Map()
  for (const def of Object.values(pack)) {
    if (!isIconDefinition(def)) continue
    index.set(def.iconName, def)
    for (const alias of def.icon[2] ?? []) {
      if (typeof alias === 'string' && !index.has(alias)) index.set(alias, def)
    }
  }
  return index
}

// An icon loader for setIconLoader() that fetches a whole Font Awesome pack
// the first time an icon from its set is asked for. `packs` maps a set
// ('solid', 'regular', 'brand') to a function returning the pack module,
// normally `() => import('@fortawesome/free-solid-svg-icons')`, so the
// consumer's bundler puts each pack in a chunk of its own.
export function createPackLoader(packs = {}) {
  const loaded = new Map()

  const packFor = (set) => {
    if (!loaded.has(set)) {
      const pending = Promise.resolve()
        .then(() => packs[set]())
        // A pack's own module exports `prefix`; a CommonJS one may arrive wrapped.
        .then((mod) => ({ module: mod?.prefix ? mod : (mod?.default ?? mod), index: null }))
        .catch((error) => {
          loaded.delete(set)
          throw error
        })
      loaded.set(set, pending)
    }
    return loaded.get(set)
  }

  return async (set, name) => {
    if (typeof packs[set] !== 'function') return undefined
    const pack = await packFor(set)
    const direct = pack.module[exportName(name)]
    if (isIconDefinition(direct)) return direct
    pack.index ??= indexPack(pack.module)
    return pack.index.get(name)
  }
}
