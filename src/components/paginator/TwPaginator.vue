<template>

  <nav v-bind="toneAttrs" aria-label="Pagination" >
    <ul class="inline-flex -space-x-px">
      <tw-paginator-button :color="color" @click="decrement" :disabled="currentPage<=1" button-position="first"  ><slot name="first" >Previous</slot></tw-paginator-button>
      <tw-paginator-button :color="color" v-for="index in numOfPages" :key="index" @click="paginate(index)" :selected="index===currentPage" >{{index}}</tw-paginator-button>
      <tw-paginator-button :color="color" @click="increment" :disabled="currentPage>=numOfPages" button-position="last"  ><slot name="last" >Next</slot></tw-paginator-button>
    </ul>
  </nav>

</template>

<script setup>
import TwPaginatorButton from '@/components/paginator/TwPaginatorButton.vue'
import { useTone } from '@/components/composables/useTone'

defineOptions({ name: 'TwPaginator' })

const props = defineProps({
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
})

const emit = defineEmits(['paginate'])

const toneAttrs = useTone(() => props.color)

function paginate(page) {
  emit('paginate', page)
}

function increment() {
  if (props.currentPage < props.numOfPages) emit('paginate', props.currentPage + 1)
}

function decrement() {
  if (props.currentPage > 1) emit('paginate', props.currentPage - 1)
}
</script>
