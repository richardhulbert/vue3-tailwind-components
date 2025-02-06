<template>
  <table  class="border-collapse table-auto w-full text-sm bo">
    <thead :class="headingClass" class=" text-primary-800 ">
    <tr>
      <th class="p-2 font-normal" v-for="h in headings">{{ h.label }}</th>
    </tr>
    </thead>
    <tbody class="text-primary-600 dark:text-primary-100">
    <tr v-for="(item,index) in items" :key="index" :class="rowClass(index)" class="transition-colors" >
      <td :class="boarderClass"  class="p-2 text-primary-600 dark:text-primary-100" v-for="cell in headings">
        <slot :name="cell.field" :item="item">
          {{ item[cell.field] }}
        </slot>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name:'TwTable',
  props: {
    items: {
      type: Array,
      default: []
    },
    headings: {
      type: Array,
    },
    border: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    headingColor: {
      type: String,
      default: "primary"
    },
    borderColor: {
      type: String,
      default: "primary"
    },
    stripeColor: {
      type: String,
      default: "primary"
    },

    hoverColor: {
      type: String,
      default: "primary"
    },
    selectedIndex:{
      type:Number,
      default:-1
    },
    selectColor:{
      type:String,
      default:'primary'
    }

  },
  computed: {
    headingClass() {
      return 'bg-'+this.headingColor+'-200 dark:bg-'+this.headingColor+'-700 dark:text-'+this.headingColor+'-200'
    },
    boarderClass() {
      return this.border ? 'border border-' + this.borderColor+'-200 dark:border-'+this.borderColor+'-700': '';
    },
  },
  methods: {
    rowClass(ndx) {
      let h = this.hover ?' hover:bg-'+this.hoverColor+'-300 dark:hover:bg-'+this.hoverColor+'-700 dark:hover:text-white':''
      if(this.selectedIndex === ndx) h = ' bg-'+this.selectColor+'-300 dark:bg-'+this.selectColor+'-400'
      if(this.striped && this.selectedIndex !== ndx) return ndx % 2 !== 0 ? 'bg-'+this.stripeColor+'-100 dark:bg-'+this.stripeColor+'-800 dark:text-primary-200'+h: ' dark:text-primary-700 '+h;

      return h+' dark:text-gray-700'
    }
  },
}
</script>

<style scoped>

</style>
