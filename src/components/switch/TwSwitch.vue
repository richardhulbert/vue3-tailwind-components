<template>
  <div role="switch" :aria-checked="checked ? 'true' : 'false'" :aria-disabled="disabled ? 'true' : undefined" :aria-labelledby="labelId"
       @keydown.enter="handleInput" @keydown.space.prevent="handleInput" tabindex="0" :class="topClass" class="flex  select-none items-center" @click="handleInput">
    <!--    this is needed so that tailwind doesnt strip these classes-->
    <div class=" hidden h-3 w-3 w-6 h-7 w-7 h-5 w-5 w-10 w-14"></div>
    <div class="relative">
      <input :disabled="disabled" :id="fieldId" :name="fieldId" type="checkbox" class="sr-only " :value="checked" aria-hidden="true" tabindex="-1"/>
      <div :class="backClass" class="rounded-full border shadow-inner"></div>
      <div :class="knobClass"
           class="dot border   absolute top-0  transition  rounded-full "></div>
    </div>
    <div :id="labelId" :class="labelClass" class="mx-2">
      <slot></slot>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, useId } from 'vue'
import { useFieldId } from '@/components/composables/useFieldId'

defineOptions({ name: 'TwSwitch' })

const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
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
  disabled: {
    type: Boolean,
    default: false
  },
  formNameAndId: {
    type: String,
    default: ''
  }
})

const fieldId = useFieldId(props)
const labelId = useId()

const emit = defineEmits(['update:modelValue', 'changed'])

const checked = ref(false)

function handleInput() {
  if (!props.disabled) {
    checked.value = !checked.value
    emit('update:modelValue', checked.value)
    emit('changed', checked.value)
  }
}

watch(() => props.modelValue, (value) => {
  checked.value = value
}, { immediate: true })

const baseSize = computed(() => {
  switch (props.size) {
    case 'sm': return 3
    case 'md': return 5
    case 'lg': return 7
    default: return 5
  }
})

const topClass = computed(() => (props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'))

const backClass = computed(() => {
  const c = props.color
  const s = ' h-' + baseSize.value + ' w-' + (baseSize.value * 2)
  const op = props.disabled ? ' opacity-50 ' : ''
  if (checked.value) return 'bg-' + c + '-500' + s + op
  return 'bg-white border-' + c + '-500  dark:border-' + c + '-200' + s + op
})

const knobClass = computed(() => {
  const c = props.color
  const s = ' h-' + baseSize.value + ' w-' + baseSize.value
  if (checked.value) return 'translate-x-full bg-white dark:bg-' + c + '-700 border-' + c + '-200 ' + s
  return ' bg-' + c + '-200 border-' + c + '-500 dark:bg-' + c + '-700 left-0 dark:border-' + c + '-500' + s
})

const labelClass = computed(() => 'text-' + props.color + '-500 text-' + props.size)
</script>
