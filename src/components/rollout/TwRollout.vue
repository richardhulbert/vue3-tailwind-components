<template>
  <div :class="transformClass" class="absolute transition-transform duration-300 top-0 left-0 right-0 bottom-0">
    <div :class="backgroundClass" class="fixed inset-0" @click="closeDialog"></div>

    <div :class="compClass" class="absolute min-h-screen h-fit">
      <tw-icon @click="closeDialog" set="regular" :class="closeButtonClass"
               class=" transition-transform hover:scale-110 cursor-pointer absolute top-4 right-4" size="lg"
               icon="circle-xmark"></tw-icon>
      <slot v-if="modelValue"><p class="m-2"> this is the default content of the slot,</p></slot>
    </div>
  </div>
</template>

<script>
import {TwButton, TwIcon} from "@/components";

export default {
  name: "TwRollout",

  components: {
    TwButton, TwIcon
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    alignRight:{
      type:Boolean,
      default:false
    },

    width: {
      type: String,
      default: 'w-1/4'
    },

    zIndex: {
      type: String,
      default: "20"
    },
    color: {
      type: String,
      default: 'primary'
    },
    blur:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    handleInput() {

      this.$emit('update:modelValue', this.modelValue)

    },
    closeDialog() {
      this.$emit('update:modelValue', false)
    }
  },
  computed: {
    compClass() {
      let zIndex = ' z-' + this.zIndex + ' '
      let widthClass = this.width
      let bgColor = ' bg-' + this.color + '-100 shadow-xl dark:bg-' + this.color + '-900'
      let panelPos = this.alignRight? ' right-0 ':''
      return bgColor + zIndex + ' ' + widthClass+panelPos
    },
    transformClass() {
      if(this.alignRight) return this.modelValue ? '-translate-y-0 z-' + this.zIndex : ' -translate-y-full -top-20 z-' + this.zIndex

        return this.modelValue ? 'translate-x-0 z-' + this.zIndex : ' -translate-x-full -left-20 z-' + this.zIndex


    },

    closeButtonClass() {
      return 'text-' + this.color + '-500'
    },

    backgroundClass(){
      return this.blur?'backdrop-blur-sm':''
    }


  },
  watch: {
    modelValue: {
      handler(neval) {
        this.checked = neval
      },
      // force eager callback execution
      immediate: true
    }
  },
}
</script>

<style scoped lang="scss">

</style>
