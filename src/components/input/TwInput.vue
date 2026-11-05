<template>

<!--  <div class="hidden focus:border-info-700"></div>-->

  <label  :for="fieldId" :class="labelClass" class="my-1">
    <slot></slot>
  </label>
  <div class="relative">
  <div v-show="hasIcon" :class="iconClass" class="absolute py-1 px-2  left-0 pointer-events-none rounded-l border-t border-l border-b" v-if="hasIcon">
    <tw-icon :icon="icon"></tw-icon>
  </div>
  <input @input="handleChange" :name="fieldId" :id="fieldId"  v-model="inputVal" :placeholder="placeholder" :class="inputClass" class="w-full border focus:shadow-inner py-1 px-2 rounded  outline-none disabled:cursor-not-allowed" :type="type" :disabled="disabled" :accept="accept"/>
  <div v-if="hasError" class="m-1 text-sm text-danger-500">{{error}}</div>
  <div v-else :class="descriptionClass" class="m-1 text-sm">{{description}}</div>
  </div>

</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { TwIcon } from '@/components'
import { useFieldId } from '@/components/composables/useFieldId'

defineOptions({ name: 'TwInput' })

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

const hasIcon = computed(() => props.icon.length > 0)

const inputClass = computed(() => {
  const c = props.error ? props.errorColor : props.color
  const lm = hasIcon.value ? ' pl-8 ' : ''
  const op = props.disabled ? ' opacity-50' : ''
  const f = props.type === 'file' ? ' file:bg-' + props.color + '-300 file:text-sm file:border-0 file:rounded file:text-' + props.color + '-700' : ''
  return 'border-' + c + '-500  text-' + c + '-500' + lm + op + ' placeholder:italic placeholder-' + props.color + '-300 dark:bg-' + props.color + '-900 dark:text-' + props.color + '-100' + f
})

const iconClass = computed(() => {
  const c = props.error ? props.errorColor : props.color
  const op = props.disabled ? ' opacity-50' : ''
  return 'border-' + c + '-500 text-' + c + '-300' + op
})

const descriptionClass = computed(() => {
  const c = props.error ? props.errorColor + '-300' : props.color + '-500'
  return 'text-' + c
})

const labelClass = computed(() => 'text-' + props.color + '-500 dark:text-' + props.color + '-100')
</script>
