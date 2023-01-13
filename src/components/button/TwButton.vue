<template>
  <button :class="bgcolor" class=" transition-colors ease-in font-bold py-2 px-6 font-light border text-sm"><slot></slot></button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'slate'
    },
    outline: {
      type: Boolean,
      default: false
    },
    corners: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    bgcolor() {
      let cls = 'bg-'+this.color+'-500 hover:bg-'+this.color+'-700 text-white border-'+this.color+'-500'
      if(this.outline) cls = 'border-'+this.color+'-500 hover:bg-'+this.color+'-500 text-'+this.color+'-500 hover:text-white border'
      if(!this.corners) cls += ' rounded '
      return cls
    }
  },


}
</script>

