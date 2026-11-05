<script setup>
import { computed, watch, onBeforeUnmount } from 'vue'
import { TwIcon } from '@/components'

defineOptions({ name: 'TwNotification' })

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'primary'
  },
  icon: {
    type: String,
    default: 'circle-info'
  },
  message: {
    type: String,
    default: 'Oh dear!'
  },
  lifetime: {
    type: Number,
    default: 6
  },
  position: {
    type: String,
    default: 'center',
    validator(value) {
      return ['center', 'top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'].includes(value)
    }
  }
})

const emit = defineEmits(['update:modelValue'])

// One pending auto-close at most, cleared whenever the notification closes,
// re-opens or unmounts.
let timer = null

function clearTimer() {
  clearTimeout(timer)
  timer = null
}

function closeNotification() {
  clearTimer()
  emit('update:modelValue', false)
}

const closeButtonClass = computed(() => 'text-' + props.color + '-500 dark:text-' + props.color + '-200')

const positionClass = computed(() => {
  switch (props.position) {
    case 'center': return ' inset-x-96 inset-y-1/2  '
    case 'top-center': return ' inset-x-96 top-5 '
    case 'top-left': return ' w-1/4 top-5 left-5'
    case 'top-right': return ' w-1/4 top-5 right-5'
    case 'bottom-center': return ' inset-x-96 bottom-5'
    case 'bottom-left': return ' w-1/4 bottom-5 left-5'
    case 'bottom-right': return ' w-1/4 bottom-5 right-5'
    default: return ''
  }
})

const notificationClass = computed(() => {
  const c = props.color
  return 'bg-' + c + '-200 dark:bg-' + c + '-600 dark:text-' + c + '-200 text-' + c + '-700' + positionClass.value
})

watch(() => props.modelValue, (showing) => {
  clearTimer()
  if (showing && props.lifetime > 0) {
    timer = setTimeout(closeNotification, props.lifetime * 1000)
  }
}, { immediate: true })

onBeforeUnmount(clearTimer)
</script>

<template>
    <div v-if="modelValue" :class="notificationClass"
         class="fixed flex  ml-2 h-fit rounded-lg shadow-lg opacity-95  animate-in zoom-in" role="alert">
     <div  class="flex items-center  p-4  space-x-4 ">
       <tw-icon :icon="icon" beat-fade></tw-icon>
       <div class="pl-4 text-sm font-normal">{{ message }}</div>
       <tw-icon @click="closeNotification" set="regular" :class="closeButtonClass"
                class=" transition-transform hover:scale-110 cursor-pointer absolute top-2 right-2" size="lg"
                icon="circle-xmark"></tw-icon>
     </div>

    </div>

</template>

