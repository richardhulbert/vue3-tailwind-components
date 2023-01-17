<template>
  <div  class="flex cursor-pointer select-none items-center" @click="handleInput">
    <div class="relative">
      <input type="checkbox" class="sr-only " />
      <div :class="backClass" class="h-5 w-10 rounded-full shadow-inner"></div>
      <div :class="knobClass" class="dot border border-slate-200 shadow-switch-1 absolute  -top-0  h-5 w-5 rounded-full bg-white transition "></div>
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
  },
  data() {
    return {
      checked: false
    }
  },
  methods: {
    handleInput (e) {
      this.checked = !this.checked
      this.$emit('change', true)
    }
  },
  computed: {
    backClass() {
      if(this.checked) return   'bg-'+this.color+'-500'
       return   'bg-'+this.color+'-200'
    },
    knobClass() {
      if(this.checked) return 'right-0'
      return 'left-0'
    },
  },
}
</script>

<style scoped>

</style>
