<script>
export default {
  name: "TwTextarea",
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
      let lm = this.hasIcon? ' pl-8 ':''
      let op = this.disabled? ' opacity-50':''
      return 'border-'+c+'-500  text-'+c+'-500' +lm +op +' placeholder:italic placeholder-'+this.color+'-300'
    },
    hasError(){
      return this.error.length>0
    },
    descriptionClass(){
      let c = this.error? this.errorColor + '-300' :this.color+'-500';
      return 'text-'+c
    },
    labelClass(){
      return 'text-'+this.color+'-500'
    }
  },


}
</script>

<template>
  <label  :for="formNameAndId" :class="labelClass" class="my-1">
    <slot></slot>
  </label>
  <textarea @input="handleChange" :name="formNameAndId" :id="formNameAndId"  v-model="inputVal" :placeholder="placeholder" :class="inputClass"  class="w-full border focus:shadow-inner py-1 px-2 rounded  outline-none disabled:cursor-not-allowed">{{modelValue}}</textarea>
</template>

<style scoped>

</style>
