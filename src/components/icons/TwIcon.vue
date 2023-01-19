<template>
  <font-awesome-icon :icon="icon" ></font-awesome-icon>
</template>

<script setup>
import {  computed } from 'vue'

/* add fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
library.add(fas,far)
const props=defineProps({
  set: {
    type: String,
    validator(value) {
      // The value must match one of these strings
      return ['regular', 'solid'].includes(value)
    },
    default() {
      return 'solid'
    }
  },
  icon:{
    type:String,
    default() {
      return 'skull-crossbones'
    }
  }

})

const icon=computed(()=>{
  return 'fa-' +props.set+' fa-'+ props.icon
})


</script>

