<template>
  <div v-bind="toneAttrs" class="relative ">

    <button type="button" @click.prevent="toggleSelect" :disabled="disabled"
            :aria-expanded="open ? 'true' : 'false'" :aria-controls="panelId"
            :class="buttonClass"
            class=" w-full flex gap-2 cursor-pointer border  px-4 py-2 text-center text-sm font-medium  transition-all  disabled:cursor-not-allowed ">
      <span class="text-left flex-grow">
        <slot name="label">
          <span class="text-left">{{ label }}</span>
        </slot>

      </span>
      <span class="flex-shrink">
        <tw-icon :class="chevronClass" class="transition-transform" icon="chevron-down"></tw-icon>
      </span>
    </button>

  </div>
  <!-- Panel -->
  <div v-if="open" :id="panelId"
       class="z-50 mt-1 animate-in slide-in-from-top-16 fade-in-20 text-left text-sm ">
    <slot>

    </slot>
  </div>

</template>

<script setup>
import { ref, computed, watch, onMounted, useId } from 'vue'
import { TwIcon } from '@/components'
import { useTone } from '@/components/composables/useTone'

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

const toneAttrs = useTone(() => props.color)

const chevronClass = computed(() => (open.value ? 'rotate-180 text-[color:var(--c-fg)]' : 'text-[color:var(--c-fg)]'))

const buttonClass = computed(() => {
  const op = props.disabled ? ' opacity-50 ' : ''
  return 'bg-[color:var(--c-soft)] hover:bg-[color:var(--c-soft-hover)] text-[color:var(--c-on-soft)]' + op
})

const panelId = useId()

// Applied after mounting, as before, so the panel appears on the next tick.
onMounted(() => {
  open.value = props.expanded
})

// Later changes to expanded open or close it too; clicking still toggles.
watch(() => props.expanded, (value) => {
  open.value = value
})
</script>
