<template>
  <button :disabled="disabled" :class="bgcolor" class=" transition-colors ease-in  font-light border disabled:cursor-not-allowed"><slot></slot></button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    outline: {
      type: Boolean,
      default: false
    },
    corners: {
      type: Boolean,
      default: false
    },
    disabled:{
      type:Boolean,
      default:false
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
  computed: {
    sizeClass(){
      switch (this.size){
        case 'sm': return ' text-xs py-1 px-4 '
        case 'md': return ' text-sm py-2 px-6 '
        case 'lg': return ' text-lg py-4 px-8 '
        case 'round': return ' text-sm px-4 py-1 rounded-full'
        default: return ' text-sm py-2 px-6 '

      }
    },
    bgcolor() {
      let op = this.disabled? ' opacity-50':''
      let cls = 'bg-'+this.color+'-500 hover:bg-'+this.color+'-700 text-white border-'+this.color+'-500'
      if(this.outline) cls = 'border-'+this.color+'-500 hover:bg-'+this.color+'-500 text-'+this.color+'-500 hover:text-white border'
      if(!this.corners) cls += ' rounded '
      return cls + this.sizeClass +op
    }
  },


}
</script>

