<script setup>
import {computed} from 'vue'
import {TwIcon} from "@/components";

const props=defineProps(
    {
      item:{
        type:Object,
        default:{
          label:'Not set',
          value:0,
          icon:'gauge'
        }
      },

      value:{},
      selectedValue:{},
      color:{type:String, default:'primary'},
    }
)

const hasIcon = computed(()=>{
  return props.item.hasOwnProperty('icon')
})

const selectedClass = computed(() => {
 return props.selectedValue === props.value? `bg-${props.color}-200   dark:bg-${props.color}-700 `:`hover:bg-${props.color}-100 dark:hover:bg-${props.color}-500`;
})

</script>

<template>


    <div class="px-4 py-2  cursor-pointer" :class="selectedClass">
      <tw-icon class="mr-1" v-if="hasIcon" :icon="props.item.icon"></tw-icon>
      {{ props.item.label }}

    </div>


</template>

<style scoped>

</style>
