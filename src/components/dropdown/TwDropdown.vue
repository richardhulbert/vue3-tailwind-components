<template>
  <div v-click-outside="hideMenu">
    <div  class="flex justify-left">
      <tw-button @click="showMenu" :color="color" outline :menu="!outline" >{{ label }}
        <tw-icon class="ml-2" icon="caret-down"></tw-icon>
      </tw-button>
    </div>
    <div v-show="showing" :class="panelBoarderClass"
         class=" min-w-fit bg-white absolute border rounded  mt-2 shadow-lg">

      <tw-dropdown-item @selected="selected" :label="item.label" :icon="item.icon" :action="item.action" :color="color" v-for="(item,index) in items" :key="index"> </tw-dropdown-item>

    </div>
  </div>


</template>

<script>
import {defineComponent} from 'vue'
import {TwButton, TwIcon} from "@/components";
import TwDropdownItem from "@/components/dropdown/TwDropdownItem.vue";
import vClickOutside from 'click-outside-vue3'

export default defineComponent({
  name: "TwDropdown",
  components: {TwDropdownItem, TwButton, TwIcon},
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    label: {
      type: String,
      default: "Menu"
    },
    color: {
      type: String,
      default: 'primary'
    },
    items: {
      type: Array,
      default: [
      ]
    },
    outline:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      showing: false
    }
  },
  computed: {
    panelBoarderClass() {
      return 'border-' + this.color + '-300';
    }
  },
  methods: {
    showMenu() {
      this.showing = true;
    },
    hideMenu(){
      this.showing = false;
    },
    selected(action){
     this.$emit('selected',action)
      this.hideMenu()
    }
  },





})
</script>


