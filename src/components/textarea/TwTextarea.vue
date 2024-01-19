<script>
export default {
  name: "TwTextarea",
  emits: ['changed','update:modelValue'],
  props: {
    color: {
      type: String,
      default: "primary"
    },
    modelValue: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    errorColor: {
      type: String,
      default: "danger"
    },
    description: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ""
    },
    formNameAndId: {
      type: String,
      default: (Math.random() + 1).toString(36).substring(5)
    },
    labelPosition: {
      type: String,
      default: 'block'
    }
  },
  data() {
    return {
      inputVal: ''
    }
  },
  methods: {
    handleChange(){
      this.$emit('update:modelValue',this.inputVal)
      this.$emit('changed',this.inputVal)
    }

  },
  watch: {
    modelValue: {
      handler(neval) {
        this.inputVal = neval
      },
      // force eager callback execution
      immediate: true
    }
  },
  computed: {
    inputClass() {
      let c = this.error? this.errorColor:this.color;

      let op = this.disabled? ' opacity-50':''
      return 'border-'+c+'-500  text-'+c+'-500'  +op +' placeholder:italic placeholder-'+this.color+'-300 dark:bg-'+this.color+'-900 dark:text-'+this.color+'-100'
    },
    hasError(){
      return this.error.length>0
    },
    descriptionClass(){
      let c = this.error? this.errorColor + '-300' :this.color+'-500';
      return 'text-'+c
    },
    labelClass(){
      return 'text-'+this.color+'-500 dark:text-'+this.color+'-100'
    }
  },


}
</script>

<template>
  <label  :for="formNameAndId" :class="labelClass" class="my-1">
    <slot></slot>
  </label>
  <textarea @input="handleChange" :name="formNameAndId" :id="formNameAndId"  v-model="inputVal" :placeholder="placeholder" :class="inputClass"  class="w-full border focus:shadow-inner py-1 px-2 rounded  outline-none  disabled:cursor-not-allowed">{{modelValue}}</textarea>
  <div v-if="hasError" class="m-1 text-sm text-danger-500">{{error}}</div>
  <div v-else :class="descriptionClass" class="m-1 text-sm">{{description}}</div>
</template>

<style scoped>

</style>
