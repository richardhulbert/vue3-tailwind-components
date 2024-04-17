<script setup>
import {computed} from 'vue'
const props=defineProps(
    {
      label:String,
      value:{},
      selectedValue:{},
      color:{type:String, default:'primary'},
    }
)

const selectedClass = computed(() => {
 return props.selectedValue === props.value? `bg-${props.color}-200   dark:bg-${props.color}-700 `:`hover:bg-${props.color}-100 dark:hover:bg-${props.color}-500`;
})

</script>

<template>
  <div class="px-4 py-2  cursor-pointer" :class="selectedClass">{{ props.label }}</div>
</template>

<style scoped>

</style>
