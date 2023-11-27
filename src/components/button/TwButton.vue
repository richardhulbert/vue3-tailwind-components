<template>
  <button :disabled="disabled" :class="bgcolor" class=" transition-colors ease-in  font-light  disabled:cursor-not-allowed"><slot></slot></button>
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
    menu:{
      type:Boolean,
      default:false
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
    },
    variant:{
      type:String,
      default:'',
      validator(value) {
        // The value must match one of these strings
        return ['round', 'square'].includes(value)
      }
    }
  },
  computed: {
    sizeClass(){
      switch (this.size){
        case 'sm': return ' text-xs py-1 px-4 '
        case 'md': return ' text-sm py-2 px-6 '
        case 'lg': return ' text-lg py-4 px-8 '
        default: return ' text-sm py-2 px-6 '

      }
    },
    variantClass(){
      switch (this.variant){
        case 'round': return ' text-sm px-4 py-1 rounded-full '
        case 'square': return ' '
        default:return ' rounded '
      }
    },
    bgcolor() {
      let op = this.disabled? ' opacity-50':''
      let cls = 'bg-'+this.color+'-500 hover:bg-'+this.color+'-700 text-white border-'+this.color+'-500'
      if(this.outline){
        if(this.menu){
          cls = 'hover:bg-'+this.color+'-500 text-'+this.color+'-500 hover:text-white'
        }else{
          cls = 'border-'+this.color+'-500 hover:bg-'+this.color+'-500 text-'+this.color+'-500 hover:text-white border'
        }

      }

      return cls + this.sizeClass +op + this.variantClass
    }
  },



}
</script>

