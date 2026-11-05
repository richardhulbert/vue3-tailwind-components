<template>
  <div v-if="showing">
    <div class="fixed inset-0 z-30 backdrop-blur-sm" :class="backgroundClass"></div>
    <div class="fixed inset-0 z-40 flex items-center justify-center sm:p-0  animate-in fade-in zoom-in">
      <div role="dialog" aria-modal="true" :aria-labelledby="hideHeader ? undefined : headerId" :class="modalClass" class=" rounded-lg   shadow-xl w-full h-auto ">

        <div class="relative  ">
          <tw-icon v-if="!hideClose" @click="closeDialog" set="regular" :class="closeButtonClass"
                   class=" transition-transform hover:scale-110 cursor-pointer absolute top-2 right-2" size="lg"
                   icon="circle-xmark"></tw-icon>
          <div v-if="!hideHeader" :id="headerId" class="flex-1 p-2" :class="headerClass">
            <slot name="header">
              <h1 class="font-bold "> Modal title</h1>
            </slot>
          </div>
          <div class="h-fit  p-4">
            <slot >
              <div class="mt-2 text-sm text-primary-400">This is the modals default content. Replace this with content in the body slot of the component.
              </div>
            </slot>
          </div>
          <div v-show="!hideFooter" class="p-2 border-t " :class="footerClass">
          <slot name="footer">
            <div class=" flex justify-end gap-2">
              <tw-button type="button" :color="color" outline @click="closeDialog">OK</tw-button>
            </div>
          </slot>
        </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, useId } from 'vue'
import { useEventListener } from '@vueuse/core'
import { TwButton, TwIcon } from '../'

defineOptions({ name: 'TwModal' })

const props = defineProps({
  modelValue: {
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
  color: {
    type: String,
    default: 'primary'
  },
  backgroundColor: {
    type: String,
    default: 'primary'
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  hideClose: {
    type: Boolean,
    default: false
  },
  hideFooter: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['update:modelValue', 'closed'])

const showing = ref(false)

const modalClass = computed(() => {
  const cls = ' bg-white dark:bg-' + props.color + '-900'
  switch (props.size) {
    case 'sm': return ' md:w-1/3 ' + cls
    case 'md': return ' md:w-2/3 ' + cls
    case 'lg': return ' md:w-4/5  ' + cls
    default: return ' md:w-2/3 ' + cls
  }
})

const closeButtonClass = computed(() => 'text-' + props.color + '-700')

const backgroundClass = computed(() => ' bg-' + props.backgroundColor + '-700/50 ')

const headerClass = computed(() => 'bg-' + props.color + '-200 + text-' + props.color + '-700')

const footerClass = computed(() => 'border-' + props.color + '-200')

watch(() => props.modelValue, (value) => {
  showing.value = value
}, { immediate: true })

function closeDialog() {
  showing.value = false
  emit('update:modelValue', false)
  emit('closed')
}

const headerId = useId()

// Escape closes the dialog, as the close icon does. A modal whose close icon
// is hidden must be closed deliberately, so Escape leaves it open.
useEventListener(document, 'keydown', (event) => {
  if (showing.value && !props.hideClose && event.key === 'Escape') {
    closeDialog()
  }
})
</script>
