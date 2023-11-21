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
      default: 'primary'
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
        return ' border-'+this.color+'-200 dark:border-'+this.color+'-700 text-'+this.color+'-400 '+this.positionClass
      }
      if(this.selected){
        return ' bg-'+this.color+'-200  dark:bg-'+this.color+'-500 dark:border-'+this.color+'-700'+this.positionClass
      }
      return  ' hover:bg-'+this.color+'-300 dark:hover:bg-'+this.color+'-500 border-'+this.color+'-300  dark:border-'+this.color+'-700 text-'+this.color+'-500 dark:text-'+this.color+'-200 '+ this.positionClass
    },
  },

}
</script>

>
