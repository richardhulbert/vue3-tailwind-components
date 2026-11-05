<template>

  <label v-bind="toneAttrs" :for="fieldId" :class="labelClass" class="my-1">
    <slot></slot>
  </label>
  <div v-bind="fieldToneAttrs" class="relative">
  <div v-show="hasIcon" :class="iconClass" class="absolute py-1 px-2  left-0 pointer-events-none rounded-l border-t border-l border-b" v-if="hasIcon">
    <tw-icon :icon="icon"></tw-icon>
  </div>
  <input ref="fieldEl" v-bind="$attrs" @input="handleChange" :name="fieldId" :id="fieldId"  v-model="inputVal" :placeholder="placeholder" :class="inputClass" class="w-full border focus:shadow-inner py-1 px-2 rounded  outline-none disabled:cursor-not-allowed" :type="type" :disabled="disabled" :accept="accept"/>
  <div v-if="hasError" class="m-1 text-sm text-[color:var(--c-fg)]">{{error}}</div>
  <div v-else :class="descriptionClass" class="m-1 text-sm">{{description}}</div>
  </div>

</template>

<script setup>
import { ref, computed, watch, useTemplateRef } from 'vue'
import { TwIcon } from '@/components'
import { useFieldId } from '@/components/composables/useFieldId'
import { useTone, errorSlots } from '@/components/composables/useTone'

// Two root elements (label and field), so attributes and listeners such as
// @keyup, @blur or autocomplete would otherwise be dropped. They go to the
// native field instead.
defineOptions({ name: 'TwInput', inheritAttrs: false })

const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  modelValue: {},
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
  icon: {
    type: String,
    default: ''
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
  type: {
    type: String,
    validator: (propValue) => {
      return [
        'text',
        'number',
        'password',
        'email',
        'tel',
        'search',
        'color',
        'date',
        'file'
      ].includes(propValue)
    },
    default: 'text'
  },
  labelPosition: {
    type: String,
    default: 'block'
  },
  accept: {
    type: String,
    default: ''
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

function handleChange($event) {
  if (props.type === 'file') {
    const target = $event.target
    if (target && target.files) {
      const file = target.files[0]
      emit('changed', file)
    }
  } else {
    emit('update:modelValue', inputVal.value)
    emit('changed', inputVal.value)
  }
}

watch(() => props.modelValue, (value) => {
  inputVal.value = value
}, { immediate: true })

const hasError = computed(() => props.error.length > 0)

// Two root elements, so the label and the field wrapper each carry the tone.
// An error recolours the field's border and text, keeping its surface.
const toneAttrs = useTone(() => props.color)
const fieldToneAttrs = computed(() => ({
  ...toneAttrs.value,
  style: { ...toneAttrs.value.style, ...(hasError.value ? errorSlots(props.errorColor) : {}) },
}))

const hasIcon = computed(() => props.icon.length > 0)

const inputClass = computed(() => {
  const lm = hasIcon.value ? ' pl-8 ' : ''
  const op = props.disabled ? ' opacity-50' : ''
  const f = props.type === 'file' ? ' file:bg-[color:var(--c-soft)] file:text-sm file:border-0 file:rounded file:text-[color:var(--c-on-soft)]' : ''
  return 'border-[color:var(--c-line)] text-[color:var(--c-fg)] bg-[color:var(--c-surface)]' + lm + op + ' placeholder:italic placeholder:text-[color:var(--c-fg-muted)]' + f
})

const iconClass = computed(() => {
  const op = props.disabled ? ' opacity-50' : ''
  return 'border-[color:var(--c-line)] text-[color:var(--c-fg-muted)]' + op
})

const descriptionClass = computed(() => 'text-[color:var(--c-fg)]')

const labelClass = computed(() => 'text-[color:var(--c-fg)]')
</script>
