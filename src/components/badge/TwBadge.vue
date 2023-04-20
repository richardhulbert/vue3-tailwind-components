<template>
    <span :class="bgColor" class="rounded-full" :style="swatchColorStyle"><slot>Badge</slot></span>
</template>

<script>
import ColorUtils from "@/utils/ColorUtils";
export default {
    name: "TwBadge",
    data() {
        return {
            CU: new ColorUtils()
        }
    },
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        corners: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'md',
            validator(value) {
                // The value must match one of these strings
                return ['sm', 'md', 'lg'].includes(value)
            }
        },

        swatch:{
            type: String,
            default:''
        }
    },
    computed: {
        sizeClass(){
            switch (this.size){
                case 'sm': return ' text-xs py-1 px-4 '
                case 'md': return ' text-sm py-2 px-6 '
                case 'lg': return ' text-lg py-4 px-8 '
                default: return ' text-sm py-2 px-6 '

            }
        },
        bgColor(){
            return 'bg-'+this.color+'-200 text-'+this.color+'-600 '+this.sizeClass
        },
        swatchColorStyle(){
            // is this a hex string if so we can return a color style that overrides the badge color
            const regex = /[0-9A-Fa-f]{6}/g;
            if(this.swatch.match(regex)){
                return 'background:'+this.swatch+'; color:'+this.CU.contrastingColor(this.swatch)+';'
            }
        }
    },
}
</script>

<style scoped>

</style>
