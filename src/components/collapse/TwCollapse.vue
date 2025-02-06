<template>
  <div class="relative ">

    <div @click.prevent="toggleSelect" type="button"
         :class="buttonClass"
         class=" w-full flex gap-2 cursor-pointer border  px-4 py-2 text-center text-sm font-medium  transition-all  disabled:cursor-not-allowed ">
      <div class="text-left flex-grow">
        <slot name="label">
          <span class="text-left">{{ label }}</span>
        </slot>

      </div>
      <div class="flex-shrink">
        <tw-icon :class="chevronClass" class="transition-transform" icon="chevron-down"></tw-icon>
      </div>
    </div>

  </div>
  <!-- Panel -->
  <div v-if="open"
       class="z-50 mt-1 animate-in slide-in-from-top-16 fade-in-20 text-left text-sm ">
    <slot>

    </slot>
  </div>

</template>

<script>
import {TwCollapse, TwIcon, TwOption} from "@/components";
import {_} from 'lodash';

export default {
name:'TwCollapse',
  components: {
    TwIcon, TwOption
  },
  props: {
    color: {
      type: String,
      default: "primary"
    },
    label: {
      type: String,
      default: "Select"
    },
    expanded:{
      type:Boolean,
      default:false
    }

  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggleSelect() {
      this.open = !this.open
    },


  },
  computed: {
    chevronClass() {
      return this.open ? "rotate-180 text-" + this.color + '-500 dark:text-' + this.color + '-200' : "text-" + this.color + '-500 dark:text-' + this.color + '-100'
    },
    buttonClass() {
      let op = this.disabled ? ' opacity-50 ' : ''
      return 'bg-' + this.color + '-200 hover:bg-' + this.color + '-300 text-' + this.color + '-700 dark:bg-' + this.color + '-500 dark:text-' + this.color + '-100 dark:hover:bg-'+this.color+'-600' + op
    }

  },
  mounted() {
 this.open=this.expanded
  },

}
</script>


