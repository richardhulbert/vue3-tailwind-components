<template>
  <div @keydown.enter="handleInput" tabindex="0" :class="topClass" class="flex  select-none items-center" @click="handleInput">
    <!--    this is needed so that tailwind doesnt strip these classes-->
    <div class=" hidden h-3 w-3 w-6 h-7 w-7 h-5 w-5 w-10 w-14"></div>
    <div class="relative">
      <input :disabled="disabled" :id="formNameAndId" :name="formNameAndId" type="checkbox" class="sr-only " :value="checked"/>
      <div :class="backClass" class="rounded-full border shadow-inner"></div>
      <div :class="knobClass"
           class="dot border   absolute top-0  transition  rounded-full "></div>
    </div>
    <div :class="labelClass" class="mx-2">
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {
  name:'TwSwitch',
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
    },
    disabled:{
      type:Boolean,
      default:false
    },
    formNameAndId:{
      type:String,
      default:(Math.random() + 1).toString(36).substring(5)
    }
  },
  data() {
    return {
      checked: false
    }
  },
  methods: {

    handleInput() {
      if(!this.disabled){
        this.checked = !this.checked
        this.$emit('update:modelValue', this.checked)
        this.$emit('changed', this.checked)

      }

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
    topClass(){
      return this.disabled?'cursor-not-allowed': 'cursor-pointer'
    },
    backClass() {
      let s = ' h-'+this.baseSize + ' w-'+(this.baseSize*2)
      let op = this.disabled ? ' opacity-50 ':''
      if (this.checked) return 'bg-' + this.color + '-500' + s +op

      return 'bg-white border-'+this.color+'-500  dark:border-'+this.color+'-200'+s +op
    },
    knobClass() {
      let s = ' h-'+this.baseSize+ ' w-'+this.baseSize
      if (this.checked) return 'translate-x-full bg-white dark:bg-'+this.color+'-700 border-'+this.color+'-200 '+s

      return ' bg-'+this.color+'-200 border-'+this.color+'-500 dark:bg-'+this.color+'-700 left-0 dark:border-'+this.color+'-500'+s
    },
    labelClass(){
      return 'text-'+this.color+'-500 text-'+this.size
    }
  },
}
</script>
