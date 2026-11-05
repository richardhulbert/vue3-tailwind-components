<template>
  <button v-bind="toneAttrs" :type="type" :disabled="disabled" :aria-pressed="pressed" :class="bgcolor" class=" transition-colors ease-in  font-light  disabled:cursor-not-allowed"><slot></slot></button>
</template>

<script setup>
import { computed, warn } from 'vue'
import { useTone } from '@/components/composables/useTone'

defineOptions({ name: 'TwButton' })

// `click` is deliberately not declared as an event: listeners fall through to
// the native <button>, which consumers rely on.
const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  outline: {
    type: Boolean,
    default: false
  },
  menu: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator(value) {
      return ['sm', 'md', 'lg'].includes(value)
    }
  },
  variant: {
    type: String,
    default: '',
    validator(value) {
      return ['', 'round', 'square'].includes(value)
    }
  },
  selected: {
    type: Boolean,
    default: false
  },
  // Deprecated in 1.0: a selected button stays in its own tone.
  selectedColor: {
    type: String,
    default: undefined
  },
  // HTML's own default. Forms in Content Head rely on a plain <tw-button>
  // submitting them; pass type="button" for one that should not.
  type: {
    type: String,
    default: 'submit',
    validator(value) {
      return ['submit', 'button', 'reset'].includes(value)
    }
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return ' text-xs py-1 px-4 '
    case 'md': return ' text-sm py-2 px-6 '
    case 'lg': return ' text-lg py-4 px-8 '
    default: return ' text-sm py-2 px-6 '
  }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'round': return ' text-sm px-4 py-1 rounded-full '
    case 'square': return ' '
    default: return ' rounded '
  }
})

const toneAttrs = useTone(() => props.color)

if (props.selectedColor !== undefined) {
  warn('TwButton: selectedColor is deprecated and has no effect. A selected button uses its own color.')
}
if (props.selected && !props.outline) {
  warn('TwButton: selected applies to outline and menu buttons only. Use outline for a toggle.')
}

// Toggles are outline or menu buttons; a solid button is never shown selected.
const isSelected = computed(() => props.selected && props.outline)

// aria-pressed marks a toggle, so only outline and menu buttons carry it.
const pressed = computed(() => (props.outline ? (isSelected.value ? 'true' : 'false') : undefined))

const bgcolor = computed(() => {
  const op = props.disabled ? ' opacity-50' : ''
  let cls = 'bg-[color:var(--c-solid)] hover:bg-[color:var(--c-solid-hover)] text-[color:var(--c-on-solid)] border border-[color:var(--c-solid)] '
  if (props.outline) {
    const border = props.menu ? '' : ' border border-[color:var(--c-line)]'
    cls = isSelected.value
      ? 'bg-[color:var(--c-selected)] hover:bg-[color:var(--c-selected-hover)] text-[color:var(--c-on-selected)]' + border
      : 'text-[color:var(--c-fg)] hover:bg-[color:var(--c-subtle)]' + border
  }
  return cls + sizeClass.value + op + variantClass.value
})
</script>
