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
          icon:'gauge',
        }
      },

      value:{},
      selectedValue:{},
      color:{type:String, default:'primary'},
      size:{type:String, default:'md', accept:['sm','md','lg','xs']}
    }
)

const hasIcon = computed(()=>{
  return props.item.hasOwnProperty('icon')
})

const dynamicClass = computed(() => {
  let _cls = ''
  switch (props.size) {
    case 'xs': _cls = ' text-[11px] py-[4px] px-3 '
          break;
    case 'sm': _cls = ' text-xs py-1 px-3 '
          break;
    case 'lg': _cls = ' text-lg py-3 px-8 '
          break;
    default: _cls = ' py-2 px-4 '
  }
  _cls+= props.selectedValue === props.value? `bg-${props.color}-200   dark:bg-${props.color}-700 `:`hover:bg-${props.color}-100 dark:hover:bg-${props.color}-500`;
 return _cls
})

</script>

<template>


    <div class="px-4 py-2  cursor-pointer" :class="dynamicClass">
      <tw-icon class="mr-1" v-if="hasIcon" :icon="props.item.icon"></tw-icon>
      {{ props.item.label }}

    </div>


</template>

<style scoped>

</style>
