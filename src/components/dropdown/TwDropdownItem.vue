<template>
<div @click="sendAction" :class="itemClass" class="block  py-2 px-6 cursor-pointer">
  <tw-icon class="mr-2"  v-if="showIcon" :icon="item.icon"></tw-icon>
  {{ this.item.label }}
</div>
</template>

<script>
import {defineComponent} from 'vue'
import {TwIcon} from "@/components";

export default defineComponent({
    name: "TwDropdownItem",
  components: {TwIcon},
  props: {

    color:{
      type:String,
      default:'primary'
    },
    item:{
      type:Object,
      default:{'id':0,'icon':"gauge",component:"None","label":"Not Set"}
    }
  },
  computed: {
    showIcon() {
      return this.item.hasOwnProperty('icon');
    },
    itemClass(){
      return 'text-'+this.color+'-500 dark:text-'+this.color+'-200 hover:bg-'+this.color+'-200 dark:hover:bg-'+this.color+'-500'
    }
  },
  methods: {
    sendAction() {
      this.$emit('selected',this.item)
    }
  },
})
</script>


<style scoped>

</style>
