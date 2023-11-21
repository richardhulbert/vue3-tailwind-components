<template>

<!--  <div class="hidden focus:border-info-700"></div>-->

  <label  :for="formNameAndId" :class="labelClass" class="my-1">
    <slot></slot>
  </label>
  <div class="relative">
  <div v-show="hasIcon" :class="iconClass" class="absolute py-1 px-2  left-0 pointer-events-none rounded-l border-t border-l border-b" v-if="hasIcon">
    <tw-icon :icon="icon"></tw-icon>
  </div>
  <input @input="handleChange" :name="formNameAndId" :id="formNameAndId"  v-model="inputVal" :placeholder="placeholder" :class="inputClass" class="w-full border focus:shadow-inner py-1 px-2 rounded  outline-none disabled:cursor-not-allowed" :type="type" :disabled="disabled" :accept="accept"/>
  <div v-if="hasError" class="m-1 text-sm text-danger-500">{{error}}</div>
  <div v-else :class="descriptionClass" class="m-1 text-sm">{{description}}</div>
  </div>

</template>

<script>
import {TwIcon} from "@/components";
export default {
  emits:{
    changed:null
  },
  components: {
    TwIcon,
  },
  props: {
    color: {
      type: String,
      default: "primary"
    },
    modelValue:{

    },
    disabled:{
      type:Boolean,
      default:false
    },
    error: {
      type: String,
      default: ''
    },
    errorColor: {
      type: String,
      default: "danger"
    },
    icon:{
      type:String,
      default:''
    },
    description:{
      type:String,
      default:''
    },
    placeholder: {
      type: String,
      default: ""
    },
    formNameAndId:{
      type:String,
      default:(Math.random() + 1).toString(36).substring(5)
    },
    type:{
      type:String,
      validator: propValue => {
       return   [
          'text',
          'number',
          'password',
          'email',
          'tel',
          'search',
          'color',
          'date',
          'file'
        ].includes(propValue)
      },
      default:'text'
    },
    labelPosition:{
      type:String,
      default:'block'
    },
    accept:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      inputVal: ''
    }
  },
  methods: {
    handleChange($event){
      if(this.type==='file'){
        const target = $event.target;

        if (target && target.files) {
          let file = target.files[0]
          this.$emit('changed',file)
        }
      }else{
        this.$emit('update:modelValue',this.inputVal)
        this.$emit('changed',this.inputVal)
      }




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
      let f = this.type==='file'? ' file:bg-'+this.color+'-300 file:text-sm file:border-0 file:rounded file:text-'+this.color+'-700':''
      return 'border-'+c+'-500  text-'+c+'-500' +lm +op +' placeholder:italic placeholder-'+this.color+'-300 dark:bg-'+this.color+'-900 dark:text-'+this.color+'-100' +f
    },
    hasError(){
      return this.error.length>0
    },
    hasIcon(){
      return this.icon.length>0
    },
    iconClass(){
      let c = this.error? this.errorColor:this.color;
      let op = this.disabled? ' opacity-50':''
      return 'border-'+c+'-500 text-'+c+'-300'+op
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


