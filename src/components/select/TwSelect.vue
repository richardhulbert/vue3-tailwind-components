<template>
  <div ref="selectRef" class="relative " @keydown.prevent="handleKey">
    <select class="hidden" :name="formNameAndId" :id="formNameAndId" :value="calculatedValue">
      <option v-for="(item,index) in items" :key="index" :value="item.value">{{ item.label }}</option>
    </select>
    <button :disabled="disabled" @click="toggleSelect" type="button"
            :class="buttonClass"
            class=" w-full flex gap-2 rounded-lg border bg-white   text-sm shadow-sm transition-all  disabled:cursor-not-allowed ">
      <tw-icon v-if="dIcon" class="my-1 mx-1" :icon="dIcon"></tw-icon>
      <span class="text-left flex-1 ">{{ dLabel }}</span>
      <tw-icon :class="chevronClass" class="transition-transform" icon="chevron-down"></tw-icon>
    </button>

    <p class="m-1 text-sm text-danger-500" v-if="hasError">{{ error }}</p>

    <!-- Panel -->
    <div v-if="open"
         class="z-50 bg-white mt-1 animate-in slide-in-from-top-16 fade-in-20  absolute left-0 right-0  rounded-lg  text-left text-sm shadow-lg"
         :class="panelClass">
      <div>
        <tw-option :color="color" @selected="selectItem" v-for="(item,index) in items" :key="index" :label="item.label" :icon="item.icon"
                   :selected="index===selectedItemIndex" :index="index"></tw-option>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { TwIcon, TwOption } from "@/components";
import _ from 'lodash'
import { onClickOutside } from "@vueuse/core"

const emit = defineEmits(['changed', 'update:model-value'])

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  modelValue: {},
  disabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: "primary"
  },
  label: {
    type: String,
    default: "Select"
  },
  formNameAndId: {
    type: String,
    default: () => (Math.random() + 1).toString(36).substring(5)
  },
  size:{
    type:String,
    default:'md',
    accept:['sm','md']
  },
  error: {
    type: String,
    default: ''
  }
})

const open = ref(false)
const selectedItemIndex = ref(-1)
const dLabel = ref(props.label)
const dIcon = ref('')

const selectRef = ref(null)

onClickOutside(selectRef, () => {
  open.value = false
})

function toggleSelect() {
  open.value = !open.value
}

function handleKey(e) {
  switch (e.code) {
    case 'Enter':
      if (selectedItemIndex.value >= 0) {
        selectItem(selectedItemIndex.value)
      } else {
        toggleSelect()
      }
      break
    case 'ArrowDown':
      if (selectedItemIndex.value < props.items.length - 1) {
        highlightItem(selectedItemIndex.value + 1)
      } else {
        selectedItemIndex.value = 0
      }
      break
    case 'ArrowUp':
      if (selectedItemIndex.value > 0) {
        highlightItem(selectedItemIndex.value - 1)
      } else {
        open.value = false
      }
      break
    case 'Escape':
      open.value = false
      break
  }
}

function selectItem(index) {
  selectedItemIndex.value = index
  dLabel.value = props.items[index].label
  dIcon.value = props.items[index].icon
  toggleSelect()
  if (selectedItemIndex.value >= 0) {
    emit('update:model-value', props.items[index].value)
    emit('changed', props.items[index].value)
  }
}

function highlightItem(index) {
  selectedItemIndex.value = index
}

watch(
  () => props.label,
  (newVal) => {
    dLabel.value = newVal
  }
)

watch(
  () => props.modelValue,
  (newVal) => {
    selectedItemIndex.value = _.findIndex(props.items, ['value', newVal])
    if (selectedItemIndex.value >= 0) {
      dLabel.value = props.items[selectedItemIndex.value].label
      dIcon.value = props.items[selectedItemIndex.value].icon
    } else {
      dLabel.value = props.label
      dIcon.value = ''
    }
  },
  { immediate: true }
)

watch(
  () => props.items,
  (newVal) => {
    selectedItemIndex.value = _.findIndex(newVal, ['value', props.modelValue])
    if (selectedItemIndex.value >= 0) {
      dLabel.value = newVal[selectedItemIndex.value].label
      dIcon.value = newVal[selectedItemIndex.value].icon
    } else {
      dLabel.value = props.label
      dIcon.value = ''
    }
  },
  { immediate: true }
)

const hasError = computed(() => props.error.length > 0)
const chevronClass = computed(() => {
  const color = hasError.value ? 'danger' : props.color
  return open.value
    ? `rotate-180 text-${color}-500 dark:text-${color}-100`
    : `text-${color}-500 dark:text-${color}-100`
})
const calculatedValue = computed(() =>
  props.items.length > 0 && selectedItemIndex.value > -1
    ? props.items[selectedItemIndex.value].value
    : ''
)
const buttonClass = computed(() => {
  const op = props.disabled ? ' opacity-50 ' : ''
let size
  switch (props.size) {
    case 'xs': size = ' px-2 py-1 text-xs'; break;
    case 'sm': size = ' px-3 py-1 text-sm'; break;
    case 'md': size = ' px-3 py-1 text-sm'; break;
    case 'lg': size = ' px-6 py-2 text-xl'; break;
    default: size = ' px-4 py-2'
  }

  if (hasError.value)
    return (
      'border-danger-500 hover:bg-danger-100 text-danger-700 dark:bg-danger-500 dark:text-danger-100' + op + size
    )
  return (
    'border-' + props.color + '-500 hover:bg-' + props.color + '-100 text-' + props.color + '-700 dark:bg-' + props.color + '-500 dark:text-' + props.color + '-100' + op + size
  )
})
const panelClass = computed(() => {
  return 'bg-white dark:bg-' + props.color + '-500 border border-' + props.color + '-500'
})
</script>


