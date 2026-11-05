<script setup>
import {ref,computed,watch } from 'vue';
import { useFieldId } from '@/components/composables/useFieldId'
import { useTone } from '@/components/composables/useTone'
const props = defineProps({
  modelValue: {},
  min:{ default:0},
  max:{ default:100},
  step:{ default:1},
  color:{type:String, default:'primary'},
  showLabels:{default:true},
  disabled:{default:false},
  formNameAndId: {
    type: String,
    default: ''
  }
})

const fieldId = useFieldId(props)





const inputVal = defineModel()

const toneAttrs = useTone(() => props.color)

const barClass = computed(() => 'range accent-[color:var(--c-accent)]')





</script>

<template>
<div v-bind="toneAttrs" class="relative">
  <slot></slot>
  <input class="w-full" :class="barClass " :min="min" :max="max" :step="step" v-model="inputVal"  type="range" :disabled="disabled" :id="fieldId" :name="fieldId"/>
  <span v-if="showLabels" class="text-sm text-[color:var(--c-fg)] absolute start-0 -bottom-6">Min {{ min }}</span>
  <span v-if="showLabels"  class="text-sm text-[color:var(--c-fg)] absolute end-0 -bottom-6">Max {{max}}</span>
</div>

</template>


