<script setup>
import {computed, ref} from "vue";
import {faker} from '@faker-js/faker';
import {TwTable,TwButton,TwPaginator,TwSwitch,TwIcon} from "./components/";



const numOfProducts = ref(20)
const products = ref([]);

let records = ref([])
let pageSize = ref(10)
let currentPage = ref(1)
let striped = ref(false)
let hover = ref(false)

let numOfPages = computed(()=>{
 return  Math.ceil(records.value.length/pageSize.value)
})

const colors= [
    'slate',
    'indigo',
    'amber',
    'primary',
    'secondary'
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


function paginate(page){
  let start = (page-1)*pageSize.value
  currentPage.value=page
  products.value = records.value.slice(start,pageSize.value+start)
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

  products.value = records.value.slice(0,pageSize.value)
}

function clearProducts(){
  records.value=[];
  products.value=[];

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
      <tw-button @click="createProducts(0)"  color="secondary" ><tw-icon  icon="plus" class="mr-2" ></tw-icon>Create</tw-button>
    </div>
    <div class="flex-col">
      <tw-button @click="clearProducts" color="primary" outline class="ml-3 "><tw-icon icon="trash" class="mr-2"></tw-icon>Clear</tw-button>
    </div>
  </div>
    <div class="flex p-3 justify-start bg-slate-100">
      <tw-switch v-model="striped">Striped?</tw-switch>
      <tw-switch v-model="hover">Hover?</tw-switch>
    </div>
    <div class=" flex-row ml-3 text-gray-500">{{records.length}} Records</div>
    <div class=" ml-2  w-full">
      <tw-table  :hover="hover" hover-color="amber" :striped="striped" :headings="headings" :items="products">
        <template v-slot:link="row">
          <a :href="row.item.link">{{row.item.link}}</a>
        </template>
      </tw-table>
      <tw-paginator @paginate="paginate" :current-page="currentPage" :num-of-pages="numOfPages" class="mt-2"></tw-paginator>
    </div>
  </div>

</template>

<style scoped>

</style>
