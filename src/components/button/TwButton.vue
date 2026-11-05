<template>
  <button :disabled="disabled" :class="bgcolor" class=" transition-colors ease-in  font-light  disabled:cursor-not-allowed"><slot></slot></button>
</template>

<script setup>
import { computed } from 'vue'

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
  selectedColor: {
    type: String,
    default: 'info'
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

const bgcolor = computed(() => {
  const op = props.disabled ? ' opacity-50' : ''
  const bgColor = props.selected ? props.selectedColor : props.color
  let cls = 'bg-' + bgColor + '-500 hover:bg-' + bgColor + '-700 text-white border-' + bgColor + '-500 border border-' + bgColor + '-500 '
  if (props.outline) {
    if (props.menu) {
      cls = 'hover:bg-' + bgColor + '-500 text-' + bgColor + '-500 hover:text-white'
    } else {
      cls = 'border-' + bgColor + '-500 hover:bg-' + bgColor + '-500 text-' + bgColor + '-500 hover:text-white border'
    }
  }
  return cls + sizeClass.value + op + variantClass.value
})
</script>
