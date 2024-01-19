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
       class="z-50 bg-white mt-1 animate-in slide-in-from-top-16 fade-in-20 text-left text-sm ">
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
      return this.open ? "rotate-180 text-" + this.color + '-500 dark:text-' + this.color + '-100' : "text-" + this.color + '-500 dark:text-' + this.color + '-100'
    },
    buttonClass() {
      let op = this.disabled ? ' opacity-50 ' : ''
      return 'border-' + this.color + '-100 hover:bg-' + this.color + '-100 text-' + this.color + '-700 dark:bg-' + this.color + '-500 dark:text-' + this.color + '-100' + op
    }

  },

}
</script>


