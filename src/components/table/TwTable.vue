<template>
  <table  class="border-collapse table-auto w-full text-sm">
    <thead :class="headingClass" class=" text-gray-800">
    <tr>
      <th class="p-2 font-normal" v-for="h in headings">{{ h.name }}</th>
    </tr>
    </thead>
    <tbody class="text-gray-600">
    <tr v-for="(item,index) in items" :key="index" :class="rowStripe(index)" >
      <td :class="boarderClass" class=" p-2" v-for="cell in headings">
        <slot :name="cell.real" :item="item">
          {{ item[cell.real] }}
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
    headingColor: {
      type: String,
      default: "bg-slate-200"
    },
    borderColor: {
      type: String,
      default: "border-slate-200"
    },
    alternateRowColor: {
      type: String,
      default: "bg-slate-100"
    },
    hover: {
      type: Boolean,
      default: true
    },
    rowHoverColor: {
      type: String,
      default: "hover:bg-slate-50"
    },

  },
  computed: {
    headingClass() {
      return this.headingColor
    },
    boarderClass() {
      return this.border ? 'border ' + this.borderColor : '';
    },


  },
  methods: {
    rowStripe(ndx) {
      let h = this.hover ?' '+this.rowHoverColor:''
      return ndx % 2 !== 0 ? this.alternateRowColor+h: ''+h;
    }
  },
}
</script>

<style scoped>

</style>
