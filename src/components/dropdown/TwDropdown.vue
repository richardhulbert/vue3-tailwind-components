<template>
  <div v-click-outside="hideMenu">
    <div  class="flex justify-left">
      <tw-button type="button" @click="showMenu" :color="color" outline :menu="!outline" >{{ label }}
        <tw-icon class="ml-2" icon="caret-down"></tw-icon>
      </tw-button>
    </div>
    <div v-show="showing" :class="panelBoarderClass"
         class=" min-w-fit bg-white absolute border rounded  mt-2 shadow-lg">

      <tw-dropdown-item @selected="selected"  :item="item" :color="color" v-for="(item,index) in items" :key="index"> </tw-dropdown-item>

    </div>
  </div>


</template>

<script setup>
import { ref, computed } from 'vue'
import { TwButton, TwIcon } from '@/components'
import TwDropdownItem from '@/components/dropdown/TwDropdownItem.vue'
import clickOutside from 'click-outside-vue3'

defineOptions({ name: 'TwDropdown' })

// Local directive: `vClickOutside` is used in the template as v-click-outside.
const vClickOutside = clickOutside.directive

const props = defineProps({
  label: {
    type: String,
    default: 'Menu'
  },
  color: {
    type: String,
    default: 'primary'
  },
  items: {
    type: Array,
    default: () => []
  },
  outline: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['selected'])

const showing = ref(false)

const panelBoarderClass = computed(() => {
  const c = props.color
  return 'border-' + c + '-300 dark:bg-' + c + '-900 dark:border-' + c + '-500'
})

function showMenu() {
  showing.value = true
}

function hideMenu() {
  showing.value = false
}

function selected(action) {
  emit('selected', action)
  hideMenu()
}
</script>
