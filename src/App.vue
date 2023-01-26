<script setup>
import {computed, ref} from "vue";
import {faker} from '@faker-js/faker';
import {TwTable, TwButton, TwPaginator, TwSwitch, TwIcon,TwModal,TwSelect} from "./components/";



const numOfProducts = ref(20)
const products = ref([]);

let records = ref([])
let pageSize = ref(10)
let currentPage = ref(1)
let striped = ref(false)
let hover = ref(false)
let modalShow = ref(false)
let accentColor = ref('')

let numOfPages = computed(() => {
  return Math.ceil(records.value.length / pageSize.value)
})

const colors = [
  {label:'Primary',value:'primary'},
  {label:'Secondary',value:'secondary'},
  {label:'Warning',value:'warning'},
  {label:'Success',value:'success'},
  {label:'Danger',value:'danger'},
  {label:'Info',value:'info'}
]


const headings = [
  {
    label: 'Product label',
    field: 'name'
  },
  {
    label: 'Product Code',
    field: 'code'
  },
  {
    label: 'Product link',
    field: 'link'
  },
]


function paginate(page) {
  let start = (page - 1) * pageSize.value
  currentPage.value = page
  products.value = records.value.slice(start, pageSize.value + start)
}

function createProducts() {
  for (let i = 0; i < numOfProducts.value; i++) {
    let product = {
      code: faker.random.alpha(10),
      name: faker.name.firstName(),
      link: faker.internet.url()
    }
    records.value.push(product)
  }

  products.value = records.value.slice(0, pageSize.value)
}

function clearProducts() {
  records.value = [];
  products.value = [];

}

</script>
<template>
  <div class="container">
    <h1 class="text-3xl p-3">Welcome to the Vue tailwind component project</h1>
    <div class="m-4 flex">
      <div class="flex-col mx-3">
        <label class=" text-gray-400 text" for="productCount">Number of product to create</label>
        <input id="productCount" class="border p-1 ml-3" type="number" v-model="numOfProducts">
        <label class=" ml-2 text-gray-400 text" for="pageSize">Page size</label>
        <input id="pageSize" class="border p-1 ml-3" type="number" v-model="pageSize">
      </div>
      <div class="flex-col">
        <tw-button @click="createProducts(0)" color="secondary">
          <tw-icon icon="plus" class="mr-2"></tw-icon>
          Create
        </tw-button>
      </div>
      <div class="flex-col">
        <tw-button @click="clearProducts" color="primary" outline class="ml-3 ">
          <tw-icon icon="trash" class="mr-2"></tw-icon>
          Clear
        </tw-button>
      </div>
    </div>
    <div class="flex p-3 justify-start bg-slate-100">
      <tw-switch :color="accentColor" v-model="striped" size="md">Striped?</tw-switch>
      <tw-switch :color="accentColor" v-model="hover">Hover?</tw-switch>
      <tw-select label="Select a color" class="w-60" v-model="accentColor" :color="accentColor" :items="colors"></tw-select>
    </div>
    <div class=" flex-row ml-3 text-slate-500">{{ records.length }} Records</div>
    <div class=" ml-2  w-full">
      <tw-table :hover="hover" :heading-color="accentColor" :stripe-color="accentColor" :border-color="accentColor" :hover-color="accentColor" :striped="striped" :headings="headings" :items="products">
        <template v-slot:link="row">
          <a :href="row.item.link">{{ row.item.link }}</a>
        </template>
      </tw-table>
      <tw-paginator :color="accentColor" @paginate="paginate" :current-page="currentPage" :num-of-pages="numOfPages"
                    class="mt-2"></tw-paginator>
    </div>
    <section class=" p-4">
      <h1 class="my-2 text-2xl">Modal</h1>
      <div>
        <tw-button :color="accentColor" @click="modalShow = true" outline>Show modal</tw-button>
      </div>
      <tw-modal :color="accentColor" v-model="modalShow" >
       This is a modal that has a simple message
      </tw-modal>
    </section>
  </div>

</template>

