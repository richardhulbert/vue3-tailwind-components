<template>
<div @click="sendAction" :class="itemClass" class="block  py-2 px-6 cursor-pointer">
  <tw-icon class="mr-2"  v-if="showIcon" :icon="icon"></tw-icon>
  {{ label }}
</div>
</template>

<script>
import {defineComponent} from 'vue'
import {TwIcon} from "@/components";

export default defineComponent({
    name: "TwDropdownItem",
  components: {TwIcon},
  props: {
    label: {
      type: String,
      default: ""
    },
    icon:{
      type:String,
      default:""
    },
    action:{
      type:String,
      default:'clicked'
    },
    color:{
      type:String,
      default:'primary'
    }
  },
  computed: {
    showIcon() {
      return this.icon.length>0;
    },
    itemClass(){
      return 'text-'+this.color+'-500 dark:text-'+this.color+'-200 hover:bg-'+this.color+'-200 dark:hover:bg-'+this.color+'-500'
    }
  },
  methods: {
    sendAction() {
      this.$emit('selected',this.action)
    }
  },
})
</script>


<style scoped>

</style>
