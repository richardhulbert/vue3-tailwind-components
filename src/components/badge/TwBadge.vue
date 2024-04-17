<template>
  <span :class="bgColor" class="rounded-full" :style="swatchColorStyle"><slot>Badge</slot></span>
</template>

<script setup>
import ColorUtils from "@/utils/ColorUtils";
import {ref,computed} from 'vue'

const CU = ref(new ColorUtils())

const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  corners: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator(value) {
      // The value must match one of these strings
      return ['sm', 'md', 'lg'].includes(value)
    }
  },
  swatch: {
    type: String,
    default: ''
  }
})

const sizeClass = computed(()=>{
  switch (props.size) {
    case 'sm':
      return ' text-xs py-1 px-4 '
    case 'md':
      return ' text-sm py-2 px-6 '
    case 'lg':
      return ' text-lg py-4 px-8 '
    default:
      return ' text-sm py-2 px-6 '

  }
})

const   bgColor=computed(()=>{
  return 'bg-' + props.color + '-200 text-' + props.color + '-600 ' + sizeClass.value
})

  const swatchColorStyle = computed(()=>{
    const regex = /[0-9A-Fa-f]{6}/g;
    if (props.swatch.match(regex)) {
      return 'background:' + props.swatch + '; color:' + CU.value.contrastingColor(props.swatch) + ';'
    }
  })

</script>

