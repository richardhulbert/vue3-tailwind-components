<script setup>
import {computed, useTemplateRef, nextTick} from 'vue';
import TwButtonGroupItem from "./TwButtonGroupItem.vue";

const emit = defineEmits(
    ['update:modelValue']
)


const props = defineProps({
  items:{
    type:Array,
    default:[
    ]
  },
  modelValue: {
    type: String,
    default: ""
  },
  color:{
    type: String,
    default:'primary'
  },
  size:{
    type:String,
    default:'md',
    accept:['sm','md','lg','xs']
  }
})

const baseClass=computed(()=>{
  return `border-${props.color}-900 dark:border-${props.color}-400 divide-${props.color}-600 text-${props.color}-700 dark:text-${props.color}-200`
})
function handleClick(i){
  emit('update:modelValue', i)
}

// A radio group is one Tab stop: the selected item, or the first when none is.
const selectedIndex = computed(() => props.items.findIndex((item) => item.value === props.modelValue))
const tabStopIndex = computed(() => (selectedIndex.value >= 0 ? selectedIndex.value : 0))

// Arrow keys move the selection and focus to the next or previous item,
// wrapping at the ends, as native radio buttons do.
const group = useTemplateRef('groupEl')
const STEPS = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

async function handleKey(event) {
  const step = STEPS[event.key]
  if (!step || props.items.length === 0) return
  event.preventDefault()
  const next = (tabStopIndex.value + step + props.items.length) % props.items.length
  emit('update:modelValue', props.items[next].value)
  await nextTick()
  group.value?.querySelectorAll('[role="radio"]')[next]?.focus()
}
</script>

<template>
<div ref="groupEl" role="radiogroup" @keydown="handleKey" class="inline-flex -space-x-0 divide-x  overflow-hidden rounded-lg border text-sm " :class="baseClass">

  <tw-button-group-item :color="props.color"  v-for="(item, index) in items" :key="index" @click="handleClick(item.value)" :item="item" :size="size" :value="item.value" :selected-value="props.modelValue" :tab-stop="index === tabStopIndex"></tw-button-group-item>

</div>
</template>


