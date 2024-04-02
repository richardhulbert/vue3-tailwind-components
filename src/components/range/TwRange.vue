<script setup>
import {ref,computed,watch } from 'vue';
const props = defineProps({
  modelValue: {},
  min:{ default:0},
  max:{ default:100},
  step:{ default:1},
  color:{type:String, default:'primary'},
  showLabels:{default:true},
  disabled:{default:false},
  formNameAndId:{
    type:String,
    default:(Math.random() + 1).toString(36).substring(5)
  }
})

const emit = defineEmits(['update:modelValue'])


const inputVal = ref(props.modelValue)

const barClass = computed(()=>{
return 'accent-'+props.color+'-600 dark:accent-'+props.color+'-400'
})

watch(props.modelValue,(neVal)=>{
  inputVal.value=neVal
})

function changedInput(){
  emit('update:modelValue',  inputVal.value)
}

</script>

<template>
<div class="relative">
  <slot></slot>
  <input @input="changedInput" class="w-full" :class="barClass " :min="min" :max="max" :step="step" v-model="inputVal"  type="range" :disabled="disabled" :id="formNameAndId" :name="formNameAndId"/>
  <span v-if="showLabels" class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min {{ min }}</span>
  <span v-if="showLabels"  class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max {{max}}</span>
</div>

</template>

<style scoped>

</style>
