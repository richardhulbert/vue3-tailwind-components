<template>
  <li >
    <button :class="finalClass" class="px-3 py-2 ml-0 leading-tight transition-colors border"><slot></slot></button>
  </li>
</template>

<script>
export default {

  props: {
    buttonPosition: {
      type: String,
      default: 'middle'
    },
    color: {
      type: String,
      default: 'slate'
    },
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },


  },
  computed: {
    positionClass() {
     switch (this.buttonPosition){
       case 'first': return ' rounded-l ';
       case 'last':return ' rounded-r ';
       default:return '';
     }
    },

    finalClass(){
      if(this.disabled){
        return ' border-'+this.color+'-200 text-'+this.color+'-200 '+this.positionClass
      }
      if(this.selected){
        return ' bg-'+this.color+'-200 '+this.positionClass
      }
      return  ' hover:bg-'+this.color+'-300 border-'+this.color+'-300 text-'+this.color+'-500 '+this.positionClass
    },
  },

}
</script>

>
