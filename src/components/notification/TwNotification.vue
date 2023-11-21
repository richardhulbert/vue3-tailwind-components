<script>
import {TwIcon} from "@/components";

export default {
  name: "TwNotification",
  components: {
    TwIcon
  },
  data() {
    return {
      timer: false
    }
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: 'circle-info'
    },
    message: {
      type: String,
      default: 'Oh dear!'
    },
    lifetime: {
      type: Number,
      default: 6
    },
    position:{
      type:String,
      default:'center',
      validator(value) {
        // The value must match one of these strings
        return ['center', 'top-left', 'top-right','top-center'].includes(value)
      }

    }
  },
  methods: {
    handleInput() {
      this.$emit('update:modelValue', this.modelValue)
    },
    closeNotification() {
      this.$emit('update:modelValue', false)
      clearInterval(this.timer);
    }
  },
  computed: {
    closeButtonClass() {
      return 'text-' + this.color + '-500 dark:text-'+this.color+'-200'
    },
    notificationClass() {
     return 'bg-' + this.color + '-200 dark:bg-'+this.color+'-600 dark:text-'+this.color+'-200 text-' + this.color + '-700'+this.positionClass;
    },
    positionClass(){
      let pos = ''
      switch(this.position){
        case 'center': pos = ' inset-x-96 inset-y-1/2  '
          break;
        case 'top-center': pos = ' inset-x-96 top-5 '
          break;
        case 'top-left': pos = ' w-1/4 top-5 left-5'
          break;
        case 'top-right': pos = ' w-1/4 top-5 right-5'
          break;
        case 'bottom-center': pos = ' inset-x-96 bottom-5'
          break;
        case 'bottom-left': pos = ' w-1/4 bottom-5 left-5'
          break;
        case 'bottom-right': pos = ' w-1/4 bottom-5 right-5'
          break;
      }
      return pos
    }
  },
  watch: {
    modelValue: {
      handler(showing) {
        if (showing && this.lifetime>0) {
          this.timer = setInterval(() => {
            this.closeNotification();
          }, (this.lifetime * 1000))
        }
      },
      // force eager callback execution
      immediate: true
    }
  },
}
</script>

<template>
    <div v-if="modelValue" :class="notificationClass"
         class="fixed flex  ml-2 h-fit rounded-lg shadow-lg opacity-95  animate-in zoom-in" role="alert">
     <div  class="flex items-center  p-4  space-x-4 ">
       <tw-icon :icon="icon" beat-fade></tw-icon>
       <div class="pl-4 text-sm font-normal">{{ message }}</div>
       <tw-icon @click="closeNotification" set="regular" :class="closeButtonClass"
                class=" transition-transform hover:scale-110 cursor-pointer absolute top-2 right-2" size="lg"
                icon="circle-xmark"></tw-icon>
     </div>

    </div>

</template>

