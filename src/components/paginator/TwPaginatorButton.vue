<template>
  <li >
    <button type="button" :class="finalClass" class="px-3 py-2 ml-0 leading-tight transition-colors border"><slot></slot></button>
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

const finalClass = computed(() => {
  const c = props.color
  if (props.disabled) {
    return ' border-' + c + '-200 dark:border-' + c + '-700 text-' + c + '-400 ' + positionClass.value
  }
  if (props.selected) {
    return ' bg-' + c + '-200  dark:bg-' + c + '-500 dark:border-' + c + '-700' + positionClass.value
  }
  return ' hover:bg-' + c + '-300 dark:hover:bg-' + c + '-500 border-' + c + '-300  dark:border-' + c + '-700 text-' + c + '-500 dark:text-' + c + '-200 ' + positionClass.value
})
</script>
