<template>
  <div v-if="showing">
    <div class="fixed inset-0 z-10 backdrop-blur-sm" :class="backgroundClass"></div>
    <div class="fixed inset-0 z-50 flex items-center justify-center sm:p-0  animate-in fade-in zoom-in">
      <div :class="modalClass" class=" overflow-hidden rounded-lg   shadow-xl w-full ">

        <div class="relative  ">
          <tw-icon v-if="!hideClose" @click="closeDialog" set="regular" :class="closeButtonClass"
                   class=" transition-transform hover:scale-110 cursor-pointer absolute top-2 right-2" size="lg"
                   icon="circle-xmark"></tw-icon>
          <div v-if="!hideHeader" class="flex-1 p-2" :class="headerClass">
            <slot name="header">
              <h1 class="font-bold "> Modal title</h1>
            </slot>
          </div>
          <div class="flex-1 p-4">
            <slot >
              <div class="mt-2 text-sm text-primary-400">This is the modals default content. Replace this with content in the body slot of the component.
              </div>
            </slot>
          </div>
          <div v-show="!hideFooter" class="p-2 border-t " :class="footerClass">
          <slot name="footer">
            <div class=" flex justify-end gap-2">
              <tw-button :color="color" outline @click="closeDialog">OK</tw-button>
            </div>
          </slot>
        </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import {TwButton, TwIcon} from "../";

export default {

  props: {
    modelValue: {
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
    color: {
      type: String,
      default: 'primary'
    },
    backgroundColor: {
      type: String,
      default: 'primary'
    },
    hideHeader:{
      type:Boolean,
      default:false
    },
    hideClose:{
      type:Boolean,
      default:false
    },
    hideFooter:{
      type:Boolean,
      default:false
    },
  },
  data() {
    return {
      showing: false
    }
  },
  components: {
    TwButton, TwIcon
  },
  computed: {
    modalClass() {
      let cls= ' bg-white dark:bg-'+this.color+'-900'
      switch (this.size) {
        case 'sm':
          return ' md:w-1/3 '+ cls
        case 'md':
          return ' md:w-2/3 '+ cls
        case 'lg':
          return ' md:w-4/5  '+ cls
        default:
          return ' md:w-2/3 '+ cls

      }
    },
    closeButtonClass() {
      return 'text-' + this.color + '-700'
    },
    backgroundClass() {
      return ' bg-'+this.backgroundColor+'-700/50 '
    },
    headerClass(){
      return 'bg-'+this.color+'-200 + text-'+this.color+'-700'
    },
    footerClass(){
      return 'border-'+this.color+'-200'
    }
  },
  watch: {
    modelValue: {
      handler(neval) {
        this.showing = neval
      },
      // force eager callback execution
      immediate: true
    }
  },
  methods: {
    closeDialog() {
      this.showing = false
      this.$emit('update:modelValue', false)
      this.$emit('closed')
    }
  },
}
</script>


