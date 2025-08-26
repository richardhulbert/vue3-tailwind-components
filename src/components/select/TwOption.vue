<template>
<button @click="sendClick" :class="buttonClass" class="flex w-full pl-3 p-1 transition-colors  ">
  <tw-icon v-if="icon" class="my-1 mx-2" :icon="icon"></tw-icon>
  {{label}}
</button>
</template>

<script setup>
import { computed } from 'vue'
import {TwIcon} from "@/components";

const emit = defineEmits(['selected'])

const props = defineProps({
  label: {
    type: String,
    default: 'no data'
  },
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'primary'
  },
  index: {
    type: Number,
    default: 0
  },
  selected: {
    type: Boolean,
    default: false
  }
})

const buttonClass = computed(() => {
  const selectedClass = props.selected
    ? ` bg-${props.color}-500 dark:text-${props.color}-300 dark:bg-${props.color}-700`
    : ''
  return (
    `text-${props.color}-700 hover:bg-${props.color}-100 dark:hover:bg-${props.color}-700 dark:text-${props.color}-100` +
    selectedClass
  )
})

function sendClick() {
  emit('selected', props.index)
}
</script>
