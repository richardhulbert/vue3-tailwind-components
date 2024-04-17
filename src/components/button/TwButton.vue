<template>
  <button :disabled="disabled" :class="bgcolor" class=" transition-colors ease-in  font-light  disabled:cursor-not-allowed"><slot></slot></button>
</template>

<script>
export default {
  name:'TwButton',
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
        return ['','round', 'square'].includes(value)
      }
    },
    selected:{
      type:Boolean,
      default:false
    },
    selectedColor:{
      type:String,
      default:'info'
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
      let bg_color = this.selected? this.selectedColor:this.color
      let cls = 'bg-'+bg_color+'-500 hover:bg-'+bg_color+'-700 text-white border-'+bg_color+'-500'
      if(this.outline){
        if(this.menu){
          cls = 'hover:bg-'+bg_color+'-500 text-'+bg_color+'-500 hover:text-white'
        }else{
          cls = 'border-'+bg_color+'-500 hover:bg-'+bg_color+'-500 text-'+bg_color+'-500 hover:text-white border'
        }

      }

      return cls + this.sizeClass +op + this.variantClass
    }
  },



}
</script>

