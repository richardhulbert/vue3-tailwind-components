<template>

  <nav aria-label="Pagination" >
    <ul class="inline-flex -space-x-px">
      <tw-pagintor-button @click="decrement" :disabled="currentPage<=1" button-position="first"  ><slot name="first" >Previous</slot></tw-pagintor-button>
      <tw-pagintor-button v-for="index in numOfPages" :key="index" @click="paginate(index)" :selected="index===currentPage" >{{index}}</tw-pagintor-button>
      <tw-pagintor-button @click="increment" :disabled="currentPage>=numOfPages" button-position="last"  ><slot name="last" >Next</slot></tw-pagintor-button>
    </ul>
  </nav>

</template>

<script>
import TwPagintorButton from "@/components/paginator/TwPagintorButton.vue";

export default {
  components: {TwPagintorButton},

  props: {
    numOfPages: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    }


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
