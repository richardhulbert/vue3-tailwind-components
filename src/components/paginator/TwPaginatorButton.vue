<template>
  <li >
    <button type="button" :disabled="disabled" :aria-current="selected ? 'page' : undefined" :class="finalClass" class="px-3 py-2 ml-0 leading-tight transition-colors border"><slot></slot></button>
  </li>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({ name: 'TwPaginatorButton' })

// `click` is not declared: TwPaginator's listener falls through to the <li>.
const props = defineProps({
  buttonPosition: {
    type: String,
    default: 'middle'
  },
  color: {
    type: String,
    default: 'primary'
  },
  selected: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
})

const positionClass = computed(() => {
  switch (props.buttonPosition) {
    case 'first': return ' rounded-l '
    case 'last': return ' rounded-r '
    default: return ''
  }
})

// Colours come from the enclosing TwPaginator's tone; color is kept for compatibility.
const finalClass = computed(() => {
  if (props.disabled) {
    return ' border-[color:var(--c-line-muted)] text-[color:var(--c-fg-muted)] ' + positionClass.value
  }
  if (props.selected) {
    return ' bg-[color:var(--c-selected)] text-[color:var(--c-on-selected)] border-[color:var(--c-line-muted)] ' + positionClass.value
  }
  return ' hover:bg-[color:var(--c-soft-hover)] border-[color:var(--c-line-muted)] text-[color:var(--c-fg)] ' + positionClass.value
})
</script>
