<template>
<button @click="sendClick" :class="buttonClass" class="flex w-full pl-3 p-1 transition-colors  ">{{label}}</button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'no data'
    },
    color:{
      type:String,
      default:'primary'
    },
    index:{
      type:Number,
      default:0
    },
    selected:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    buttonClass() {
      let selected = this.selected?' bg-'+this.color+'-500 dark:text-'+this.color+'-300 dark:bg-'+this.color+'-700':''
      return "text-"+this.color+'-700 hover:bg-'+this.color+'-100 dark:hover:bg-'+this.color+'-700 dark:text-'+this.color+'-100'+selected
    }
  },
  methods: {
    sendClick() {
      this.$emit('selected',this.index)
    }
  },
}
</script>
>
