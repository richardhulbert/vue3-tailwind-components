<script setup>
import {defineProps, defineEmits} from "vue";

const props = defineProps({
  colors: Array,
  variants: Array,
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function selectColor(event) {
  emit('update:modelValue', event)
}


</script>

<template>
  <div class="columns-4 gap-2 w-1/2">
    <div v-for="color in props.colors" :class="'bg-'+color+'-500 text-'+color+'-100'"
         class="mb-2 p-2 rounded shadow-lg capitalize text-sm" @click="selectColor(color)">{{ color }}
    </div>
  </div>
  <div class="mt-2 flex  gap-2 w-1/2 ">
    <div class="grow h-12" v-for="variant in props.variants" :class="'bg-'+props.modelValue+'-'+variant"></div>
  </div>
</template>

