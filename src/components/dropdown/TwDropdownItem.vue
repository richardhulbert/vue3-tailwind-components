<template>
<div @click="sendAction" :class="itemClass" class="block  py-2 px-6 cursor-pointer">
  <tw-icon class="mr-2"  v-if="showIcon" :icon="item.icon"></tw-icon>
  {{ item.label }}
</div>
</template>

<script setup>
import { computed } from 'vue'
import { TwIcon } from '@/components'

defineOptions({ name: 'TwDropdownItem' })

const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  item: {
    type: Object,
    default: () => ({ id: 0, icon: 'gauge', component: 'None', label: 'Not Set' })
  }
})

const emit = defineEmits(['selected'])

const showIcon = computed(() => Object.prototype.hasOwnProperty.call(props.item, 'icon'))

// Colours come from the enclosing TwDropdown's tone; color is kept for compatibility.
const itemClass = computed(() => 'text-[color:var(--c-fg)] hover:bg-[color:var(--c-subtle)]')

function sendAction() {
  emit('selected', props.item)
}
</script>
