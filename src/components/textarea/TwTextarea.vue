<script setup>
import { ref, computed, watch, useTemplateRef, mergeProps } from 'vue'
import { useFieldId } from '@/components/composables/useFieldId'
import { useTone, errorSlots } from '@/components/composables/useTone'

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
  const op = props.disabled ? ' opacity-50' : ''
  return 'border-[color:var(--c-line)] text-[color:var(--c-fg)] bg-[color:var(--c-surface)]' + op + ' placeholder:italic placeholder:text-[color:var(--c-fg-muted)]'
})

const hasError = computed(() => props.error.length > 0)

// Two root elements, so the label and the field wrapper each carry the tone.
// An error recolours the field's border and text, keeping its surface.
const toneAttrs = useTone(() => props.color)
const fieldToneAttrs = computed(() => ({
  ...toneAttrs.value,
  style: { ...toneAttrs.value.style, ...(hasError.value ? errorSlots(props.errorColor) : {}) },
}))

const descriptionClass = computed(() => 'text-[color:var(--c-fg)]')

const labelClass = computed(() => 'text-[color:var(--c-fg)]')
</script>

<template>
  <label v-bind="toneAttrs" :for="fieldId" :class="labelClass" class="my-1">
    <slot></slot>
  </label>
  <textarea ref="fieldEl" v-bind="mergeProps($attrs, fieldToneAttrs)" @input="handleChange" :name="fieldId" :id="fieldId"  v-model="inputVal" :placeholder="placeholder" :class="inputClass"  class="w-full border focus:shadow-inner py-1 px-2 rounded  outline-none  disabled:cursor-not-allowed">{{modelValue}}</textarea>
  <div v-if="hasError" v-bind="fieldToneAttrs" class="m-1 text-sm text-[color:var(--c-fg)]">{{error}}</div>
  <div v-else v-bind="toneAttrs" :class="descriptionClass" class="m-1 text-sm">{{description}}</div>
</template>
