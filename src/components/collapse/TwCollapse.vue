<template>
  <div class="relative ">

    <div @click.prevent="toggleSelect" type="button"
         :class="buttonClass"
         class=" w-full flex gap-2 cursor-pointer border  px-4 py-2 text-center text-sm font-medium  transition-all  disabled:cursor-not-allowed ">
      <div class="text-left flex-grow">
        <slot name="label">
          <span class="text-left">{{ label }}</span>
        </slot>

      </div>
      <div class="flex-shrink">
        <tw-icon :class="chevronClass" class="transition-transform" icon="chevron-down"></tw-icon>
      </div>
    </div>

  </div>
  <!-- Panel -->
  <div v-if="open"
       class="z-50 mt-1 animate-in slide-in-from-top-16 fade-in-20 text-left text-sm ">
    <slot>

    </slot>
  </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { TwIcon } from '@/components'

defineOptions({ name: 'TwCollapse' })

const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  label: {
    type: String,
    default: 'Select'
  },
  expanded: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const open = ref(false)

function toggleSelect() {
  open.value = !open.value
}

const chevronClass = computed(() => {
  const c = props.color
  return open.value ? 'rotate-180 text-' + c + '-500 dark:text-' + c + '-200' : 'text-' + c + '-500 dark:text-' + c + '-100'
})

const buttonClass = computed(() => {
  const c = props.color
  const op = props.disabled ? ' opacity-50 ' : ''
  return 'bg-' + c + '-200 hover:bg-' + c + '-300 text-' + c + '-700 dark:bg-' + c + '-500 dark:text-' + c + '-100 dark:hover:bg-' + c + '-600' + op
})

// Applied after mounting, as before, so the panel appears on the next tick.
onMounted(() => {
  open.value = props.expanded
})
</script>
