<template>
  <div class="flex cursor-pointer select-none items-center" @click="handleInput">
    <div class="relative">
      <input type="checkbox" class="sr-only " :value="checked"/>
      <div :class="backClass" class="h-5 w-10 rounded-full shadow-inner"></div>
      <div :class="knobClass"
           class="dot border border-slate-200 shadow-switch-1 absolute  -top-0  h-5 w-5 rounded-full bg-white transition-transform transition-duration: 300ms "></div>
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
      default: 'slate'
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: false
    }
  },
  methods: {
    handleInput(e) {
      this.checked = !this.checked
      this.$emit('update:modelValue', this.checked)
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
    backClass() {
      if (this.checked) return 'bg-' + this.color + '-500'
      return 'bg-' + this.color + '-200'
    },
    knobClass() {
      if (this.checked) return 'right-0'
      return 'left-0'
    },
    labelClass(){
      return 'text-'+this.color+'-500'
    }
  },
}
</script>
