<template>
  <div :class="transformClass" class="absolute transition-transform duration-300 top-0 left-0 right-0 bottom-0">
    <div :class="backgroundClass" class="fixed inset-0" @click="closeDialog"></div>

    <div :class="compClass" class="absolute min-h-screen h-fit">
      <tw-icon @click="closeDialog" set="regular" :class="closeButtonClass"
               class=" transition-transform hover:scale-110 cursor-pointer absolute top-4 right-4" size="lg"
               icon="circle-xmark"></tw-icon>
      <slot v-if="modelValue"><p class="m-2"> this is the default content of the slot,</p></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TwIcon } from '@/components'

defineOptions({ name: 'TwRollout' })

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  alignRight: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: 'w-1/4'
  },
  zIndex: {
    type: String,
    default: '20'
  },
  color: {
    type: String,
    default: 'primary'
  },
  blur: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

function closeDialog() {
  emit('update:modelValue', false)
}

const compClass = computed(() => {
  const zIndex = ' z-' + props.zIndex + ' '
  const bgColor = ' bg-' + props.color + '-100 shadow-xl dark:bg-' + props.color + '-900'
  const panelPos = props.alignRight ? ' right-0 ' : ''
  return bgColor + zIndex + ' ' + props.width + panelPos
})

const transformClass = computed(() => {
  if (props.alignRight) {
    return props.modelValue ? '-translate-y-0 z-' + props.zIndex : ' -translate-y-full -top-20 z-' + props.zIndex
  }
  return props.modelValue ? 'translate-x-0 z-' + props.zIndex : ' -translate-x-full -left-20 z-' + props.zIndex
})

const closeButtonClass = computed(() => 'text-' + props.color + '-500')

const backgroundClass = computed(() => (props.blur ? 'backdrop-blur-sm' : ''))
</script>
