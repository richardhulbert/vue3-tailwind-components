<template>

  <nav aria-label="Pagination" >
    <ul class="inline-flex -space-x-px">
      <tw-paginator-button :color="color" @click="decrement" :disabled="currentPage<=1" button-position="first"  ><slot name="first" >Previous</slot></tw-paginator-button>
      <tw-paginator-button :color="color" v-for="index in numOfPages" :key="index" @click="paginate(index)" :selected="index===currentPage" >{{index}}</tw-paginator-button>
      <tw-paginator-button :color="color" @click="increment" :disabled="currentPage>=numOfPages" button-position="last"  ><slot name="last" >Next</slot></tw-paginator-button>
    </ul>
  </nav>

</template>

<script>
import TwPaginatorButton from "@/components/paginator/TwPaginatorButton.vue";

export default {
  components: {TwPaginatorButton: TwPaginatorButton},

  props: {
    numOfPages: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: 'primary'
    },

  },
  methods: {
    paginate(page) {
      this.$emit('paginate',page)
    },
    increment(){
     if(this.currentPage<this.numOfPages) this.$emit('paginate',this.currentPage+1)
    },
    decrement(){
      if(this.currentPage>1) this.$emit('paginate',this.currentPage-1)
    }
  },
}
</script>
