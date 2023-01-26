<template>
  <div @keydown.enter="handleInput" tabindex="0"  class="flex cursor-pointer select-none items-center" @click="handleInput">
    <!--    this is needed so that tailwind doesnt strip these classes-->
    <div class="hidden h-3 w-3 h-7 w-7 h-5 w-5 w-10 w-14"></div>
    <div class="relative">
      <input type="checkbox" class="sr-only " :value="checked"/>
      <div :class="backClass" class=" rounded-full shadow-inner"></div>
      <div :class="knobClass"
           class="dot border border-primary-200  absolute top-0  transition  rounded-full bg-white"></div>
    </div>
    <div :class="labelClass" class="mx-2">
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    size : {
      type:String,
      default:'md',
      validator(value) {
        // The value must match one of these strings
        return ['sm', 'md', 'lg'].includes(value)
      }
    }
  },
  data() {
    return {
      checked: false
    }
  },
  methods: {

    handleInput() {
      this.checked = !this.checked
      this.$emit('update:modelValue', this.checked)
    },
    keyCheck(e){
      console.log(e)
    }
  },
  watch: {
    modelValue:{
      handler(neval) {
        this.checked = neval
      },
      // force eager callback execution
      immediate: true
    }
  },
  computed: {
    baseSize(){
      switch (this.size){
        case 'sm': return 3
        case 'md': return 5
        case 'lg': return 7
        default: return 5

      }
    },
    backClass() {
      let s = ' h-'+this.baseSize + ' w-'+(this.baseSize*2)
      if (this.checked) return 'bg-' + this.color + '-500' + s
      return 'bg-' + this.color + '-200'+s
    },
    knobClass() {
      let s = ' h-'+this.baseSize+ ' w-'+this.baseSize
      if (this.checked) return 'translate-x-full'+s
      return 'left-0'+s
    },
    labelClass(){
      return 'text-'+this.color+'-500 text-'+this.size
    }
  },
}
</script>
