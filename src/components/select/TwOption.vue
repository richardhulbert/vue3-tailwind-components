<template>
<button type="button" @click="sendClick" :class="buttonClass" class="flex w-full pl-3 p-1 transition-colors  ">
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

// Colours come from the enclosing TwSelect's tone; color is kept for compatibility.
// A selected option follows the selection rule.
const buttonClass = computed(() =>
  props.selected
    ? 'bg-[color:var(--c-selected)] hover:bg-[color:var(--c-selected-hover)] text-[color:var(--c-on-selected)]'
    : 'text-[color:var(--c-fg-strong)] hover:bg-[color:var(--c-subtle)]'
)

function sendClick() {
  emit('selected', props.index)
}
</script>
