<script setup>
import { ref, computed, watch, useTemplateRef } from 'vue'
import { useFieldId } from '@/components/composables/useFieldId'

// Two root elements (label and field), so attributes and listeners such as
// @keyup, @blur or autocomplete would otherwise be dropped. They go to the
// native field instead.
defineOptions({ name: 'TwTextarea', inheritAttrs: false })

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
    default: ''
  },
  labelPosition: {
    type: String,
    default: 'block'
  }
})

const fieldId = useFieldId(props)

const emit = defineEmits(['changed', 'update:modelValue'])

const inputVal = ref('')

const field = useTemplateRef('fieldEl')

function focus() {
  field.value?.focus()
}

defineExpose({ focus })

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
  <label  :for="fieldId" :class="labelClass" class="my-1">
    <slot></slot>
  </label>
  <textarea ref="fieldEl" v-bind="$attrs" @input="handleChange" :name="fieldId" :id="fieldId"  v-model="inputVal" :placeholder="placeholder" :class="inputClass"  class="w-full border focus:shadow-inner py-1 px-2 rounded  outline-none  disabled:cursor-not-allowed">{{modelValue}}</textarea>
  <div v-if="hasError" class="m-1 text-sm text-danger-500">{{error}}</div>
  <div v-else :class="descriptionClass" class="m-1 text-sm">{{description}}</div>
</template>
