<template>
  <div class="relative " @keydown.prevent="handleKey">
    <select class="hidden" :name="formNameAndId" :id="formNameAndId" :value="calculatedValue">
      <option v-for="(item,index) in items" :key="index" :value="item.value">{{ item.label }}</option>
    </select>
    <button :disabled="disabled" @click="toggleSelect" type="button"
            :class="buttonClass"
            class=" w-full flex gap-2 rounded-lg border bg-white px-4 py-2 text-center text-sm font-medium  shadow-sm transition-all  disabled:cursor-not-allowed ">
      <span class="text-left flex-1 ">{{ dLabel }}</span>
      <tw-icon :class="chevronClass" class="transition-transform" icon="chevron-down"></tw-icon>
    </button>

    <p class="m-1 text-sm text-danger-500" v-if="hasError">{{ error }}</p>

    <!-- Panel -->
    <div v-if="open"
         class="z-50 bg-white mt-1 animate-in slide-in-from-top-16 fade-in-20  absolute left-0 right-0  rounded-lg  text-left text-sm shadow-lg"
         :class="panelClass">
      <div>
        <tw-option :color="color" @selected="selectItem" v-for="(item,index) in items" :key="index" :label="item.label"
                   :selected="index===selectedItemIndex" :index="index"></tw-option>
      </div>
    </div>
  </div>
</template>

<script>
import {TwIcon, TwOption} from "@/components";
import {_} from 'lodash';

export default {
  name:'TwSelect',
  emits: ['changed','update:model-value'],
  components: {
    TwIcon, TwOption
  },
  props: {
    items: {
      type: Array,
      default: []
    },
    modelValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary"
    },
    label: {
      type: String,
      default: "Select"
    },
    formNameAndId: {
      type: String,
      default: (Math.random() + 1).toString(36).substring(5)
    },
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      open: false,
      selectedItemIndex: -1,
      dLabel: this.label
    }
  },
  methods: {
    toggleSelect() {
      this.open = !this.open
    },
    handleKey(e) {

      switch (e.code) {
        case 'Enter':

          if (this.selectedItemIndex >= 0) {
            this.selectItem(this.selectedItemIndex)
          } else {
            this.toggleSelect()
          }

          break;
        case 'ArrowDown':
          if (this.selectedItemIndex < this.items.length - 1) {
            this.highlightItem(this.selectedItemIndex + 1)
          } else {
            this.selectedItemIndex = 0
          }
          break;
        case 'ArrowUp':
          if (this.selectedItemIndex > 0) {
            this.highlightItem(this.selectedItemIndex - 1)
          } else {
            this.open = false
          }
          break;
        case 'Escape':
          this.open = false
          break;

      }
    },

    selectItem(index) {
      this.selectedItemIndex = index
      this.dLabel = this.items[index].label
      this.toggleSelect()
      if (this.selectedItemIndex >= 0) {
        this.$emit('update:model-value', this.items[index].value)
        this.$emit('changed', this.items[index].value)
      }
    },
    highlightItem(index) {
      this.selectedItemIndex = index
    }
  },
  watch: {
    label(newVal) {
      this.dLabel = newVal
    },
    modelValue: {
      handler(newVal) {
        // get the index from items
        this.selectedItemIndex = _.findIndex(this.items, ['value', newVal])
        if (this.selectedItemIndex >= 0) {
          this.dLabel = this.items[this.selectedItemIndex].label
        } else {
          //this means that value is not in the list show the first label
          this.dLabel = this.label
        }

      },
      // force eager callback execution
      immediate: true
    }
  },
  computed: {
    hasError() {
      return this.error.length > 0
    },
    chevronClass() {
      let color = this.hasError ? 'danger' : this.color
      return this.open ? "rotate-180 text-" + color + '-500 dark:text-' + color + '-100' : "text-" + color + '-500 dark:text-' + color + '-100'
    },
    calculatedValue() {
      return (this.items.length > 0 && this.selectedItemIndex > -1) ? this.items[this.selectedItemIndex].value : ''
    },
    buttonClass() {
      let op = this.disabled ? ' opacity-50 ' : ''
      if (this.hasError) return 'border-danger-500 hover:bg-danger-100 text-danger-700 dark:bg-danger-500 dark:text-danger-100' + op
      return 'border-' + this.color + '-500 hover:bg-' + this.color + '-100 text-' + this.color + '-700 dark:bg-' + this.color + '-500 dark:text-' + this.color + '-100' + op
    },
    panelClass() {
      return 'bg-white dark:bg-' + this.color + '-500 border border-' + this.color + '-500';
    }


  },

}
</script>


