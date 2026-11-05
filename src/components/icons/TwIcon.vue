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
      return ['regular', 'solid','brand'].includes(value)
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

// Font Awesome's class prefix for each set. Brands is 'fa-brands', not
// 'fa-brand'. Brand icons still need the brands pack registered, which this
// library does not do yet: it would add ~220 kB gzipped to every page.
const PREFIXES = { solid: 'fa-solid', regular: 'fa-regular', brand: 'fa-brands' }

const icon=computed(()=>{
  return PREFIXES[props.set] + ' fa-' + props.icon
})


</script>

