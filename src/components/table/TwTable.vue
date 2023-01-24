<template>
  <table  class="border-collapse table-auto w-full text-sm">
    <thead :class="headingClass" class=" text-gray-800">
    <tr>
      <th class="p-2 font-normal" v-for="h in headings">{{ h.label }}</th>
    </tr>
    </thead>
    <tbody class="text-gray-600">
    <tr v-for="(item,index) in items" :key="index" :class="rowStripe(index)" >
      <td :class="boarderClass" class=" p-2" v-for="cell in headings">
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

  },
  computed: {
    headingClass() {
      return 'bg-'+this.headingColor+'-200'
    },
    boarderClass() {
      return this.border ? 'border border-' + this.borderColor+'-200' : '';
    },
  },
  methods: {
    rowStripe(ndx) {
      let h = this.hover ?' hover:bg-'+this.hoverColor+'-100':''
      if(this.striped) return ndx % 2 !== 0 ? 'bg-'+this.stripeColor+'-100 '+h: ''+h;
      return h
    }
  },
}
</script>

<style scoped>

</style>
