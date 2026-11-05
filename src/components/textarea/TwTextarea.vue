<script setup>
import { ref, computed, watch } from 'vue'

defineOptions({ name: 'TwTextarea' })

const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  modelValue: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  errorColor: {
    type: String,
    default: 'danger'
  },
  description: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  formNameAndId: {
    type: String,
    default: (Math.random() + 1).toString(36).substring(5)
  },
  labelPosition: {
    type: String,
    default: 'block'
  }
})

const emit = defineEmits(['changed', 'update:modelValue'])

const inputVal = ref('')

function handleChange() {
  emit('update:modelValue', inputVal.value)
  emit('changed', inputVal.value)
}

watch(() => props.modelValue, (value) => {
  inputVal.value = value
}, { immediate: true })

const inputClass = computed(() => {
  const c = props.error ? props.errorColor : props.color
  const op = props.disabled ? ' opacity-50' : ''
  return 'border-' + c + '-500  text-' + c + '-500' + op + ' placeholder:italic placeholder-' + props.color + '-300 dark:bg-' + props.color + '-900 dark:text-' + props.color + '-100'
})

const hasError = computed(() => props.error.length > 0)

const descriptionClass = computed(() => {
  const c = props.error ? props.errorColor + '-300' : props.color + '-500'
  return 'text-' + c
})

const labelClass = computed(() => 'text-' + props.color + '-500 dark:text-' + props.color + '-100')
</script>

<template>
  <label  :for="formNameAndId" :class="labelClass" class="my-1">
    <slot></slot>
  </label>
  <textarea @input="handleChange" :name="formNameAndId" :id="formNameAndId"  v-model="inputVal" :placeholder="placeholder" :class="inputClass"  class="w-full border focus:shadow-inner py-1 px-2 rounded  outline-none  disabled:cursor-not-allowed">{{modelValue}}</textarea>
  <div v-if="hasError" class="m-1 text-sm text-danger-500">{{error}}</div>
  <div v-else :class="descriptionClass" class="m-1 text-sm">{{description}}</div>
</template>
