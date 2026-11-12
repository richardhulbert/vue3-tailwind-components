<template>
  <font-awesome-icon v-if="state.definition" :icon="state.definition"></font-awesome-icon>
  <span v-else class="tw-icon-pending" aria-hidden="true"
        style="display: inline-block; width: 1em; height: 1em; vertical-align: -0.125em"></span>
</template>

<script setup>
import { shallowRef, watch, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  FALLBACK_ICON,
  hasIconLoader,
  isIconDefinition,
  loadIcon,
  resolveIcon,
  warnMissingIcon,
} from './registry.js'

defineOptions({ name: 'TwIcon' })

const props = defineProps({
  set: {
    type: String,
    validator(value) {
      // The value must match one of these strings
      return ['regular', 'solid', 'brand'].includes(value)
    },
    default() {
      return 'solid'
    }
  },
  // A Font Awesome IconDefinition (`faUser`), rendered as it is, or a name
  // looked up in the icon registry and then the icon loader.
  icon: {
    type: [String, Object],
    default() {
      return 'skull-crossbones'
    }
  }
})

// What to render now: a definition, or `pending` while the loader fetches one.
// With nothing registered and no loader, the fallback renders straight away.
function resolveNow() {
  const { icon, set } = props
  if (isIconDefinition(icon)) return { definition: icon }
  const hit = resolveIcon(set, icon)
  if (hit) return { definition: hit }
  if (hasIconLoader()) return { definition: null, pending: true }
  warnMissingIcon(set, icon)
  return { definition: FALLBACK_ICON }
}

const state = shallowRef(resolveNow())

// Each lookup gets a number; an answer for anything but the latest is stale.
let latest = 0
let mounted = false

// The loader runs only in the browser, after mount: during SSR an unregistered
// name renders the placeholder, which hydrates and then loads.
async function loadPending() {
  if (!state.value.pending) return
  const lookup = latest
  const { icon, set } = props
  const definition = await loadIcon(set, icon)
  if (lookup !== latest) return
  if (!definition) warnMissingIcon(set, icon)
  state.value = { definition: definition ?? FALLBACK_ICON }
}

watch(() => [props.icon, props.set], () => {
  latest++
  state.value = resolveNow()
  if (mounted) loadPending()
})

onMounted(() => {
  mounted = true
  loadPending()
})
</script>
