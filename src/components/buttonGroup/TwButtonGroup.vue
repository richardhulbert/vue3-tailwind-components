<script setup>
import {computed} from 'vue';
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
  }
})

const baseClass=computed(()=>{
  return `border-${props.color}-900 dark:border-${props.color}-400 divide-${props.color}-600 text-${props.color}-700 dark:text-${props.color}-200`
})
function handleClick(i){
  emit('update:modelValue', i)
}
</script>

<template>
<div class="inline-flex -space-x-0 divide-x  overflow-hidden rounded-lg border text-sm " :class="baseClass">

  <tw-button-group-item :color="props.color"  v-for="(item, index) in items" :key="index" @click="handleClick(item.value)" :item="item" :value="item.value" :selected-value="props.modelValue"></tw-button-group-item>

</div>
</template>


