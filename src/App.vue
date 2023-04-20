<script setup>
import {computed, ref} from "vue";
import {faker} from '@faker-js/faker';
import {TwTable, TwButton, TwPaginator, TwSwitch, TwIcon, TwModal, TwSelect, TwInput} from "./components/";
import TwBadge from "@/components/badge/TwBadge.vue";


const numOfProducts = ref(20)
const products = ref([]);

let records = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let striped = ref(false);
let hover = ref(false);
let modalShow = ref(false);
let accentColor = ref('primary');
let inputVal = ref("");
let inputError = ref('');
let inputDisabled = ref(false);
let buttonOutline = ref(false);
let buttonSquare = ref(false);


let numOfPages = computed(() => {
    return Math.ceil(records.value.length / pageSize.value)
})

const colors = [
    {label: 'Primary', value: 'primary'},
    {label: 'Secondary', value: 'secondary'},
    {label: 'Warning', value: 'warning'},
    {label: 'Success', value: 'success'},
    {label: 'Danger', value: 'danger'},
    {label: 'Info', value: 'info'}
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

function closeModal() {
    modalShow.value = false
}

</script>
<template>
    <div class="container">
        <h1 class="text-3xl p-3">Welcome to the Vue tailwind component project</h1>
        <section class=" p-4">
            <h1 class="my-2 text-2xl">Color control</h1>
            <tw-select label="Select a color" class="w-60" v-model="accentColor" :color="accentColor"
                       :items="colors"></tw-select>
        </section>
        <section class=" p-4">
            <h1 class="my-2 text-2xl">Table</h1>
            <div class=" flex flex-row gap-3  p-3 bg-slate-100">
                <div class="flex-col ">
                    <tw-switch class="mt-6" :disabled="records.length===0" :color="accentColor" v-model="striped">
                        Striped?
                    </tw-switch>
                </div>
                <div class="flex-col">
                    <tw-switch class="mt-6" :disabled="records.length===0" :color="accentColor" v-model="hover">Hover?
                    </tw-switch>
                </div>
                <div class="flex-col">
                    <tw-input form-name-and-id="productCount" type="number" v-model="numOfProducts">Number of product to
                        create
                    </tw-input>
                </div>
                <div class="flex-col">
                    <tw-input form-name-and-id="pageSize" type="number" v-model="pageSize">Page size</tw-input>
                </div>
                <div>
                    <tw-button @click="createProducts(0)" color="secondary" class="mt-5">
                        <tw-icon icon="plus" class="mr-2"></tw-icon>
                        Create
                    </tw-button>
                </div>
                <div class="flex-col">
                    <tw-button :disabled="records.length===0" @click="clearProducts" color="primary" outline
                               class="mt-5">
                        <tw-icon icon="trash" class="mr-2"></tw-icon>
                        Clear
                    </tw-button>
                </div>

            </div>
            <div class=" flex-row ml-3 text-slate-500">{{ records.length }} Records</div>
            <div class=" ml-2  w-full">
                <tw-table :hover="hover" :heading-color="accentColor" :stripe-color="accentColor"
                          :border-color="accentColor"
                          :hover-color="accentColor" :striped="striped" :headings="headings" :items="products">
                    <template v-slot:link="row">
                        <a :href="row.item.link">{{ row.item.link }}</a>
                    </template>
                </tw-table>
                <tw-paginator :color="accentColor" @paginate="paginate" :current-page="currentPage"
                              :num-of-pages="numOfPages"
                              class="mt-2"></tw-paginator>
            </div>
        </section>
        <section class=" p-4">
            <h1 class="my-2 text-2xl">Modal</h1>
            <div>
                <tw-button :color="accentColor" @click="modalShow = true" outline>Show modal</tw-button>
            </div>
            <tw-modal :color="accentColor" v-model="modalShow">
                This is a modal that has a simple message

            </tw-modal>
        </section>
        <section class="p-4">
            <h1 class="my-4 text-2xl">Buttons</h1>
            <div class="bg-slate-100 p-4 flex flex-row">

                <tw-switch size="sm" v-model="buttonOutline">Outline?</tw-switch>
                <tw-switch size="sm" v-model="buttonSquare">Square buttons?</tw-switch>
            </div>
            <div class="flex w-full justify-between py-2 ">
                <div>
                    <tw-button :color="accentColor" :outline="buttonOutline" :corners="buttonSquare" size="sm"> Small
                        button
                    </tw-button>
                </div>
                <div>
                    <tw-button :color="accentColor" :outline="buttonOutline" :corners="buttonSquare" size="md"> Medium
                        button
                    </tw-button>
                </div>
                <div>
                    <tw-button :color="accentColor" :outline="buttonOutline" :corners="buttonSquare" size="lg"> large
                        button
                    </tw-button>
                </div>
                <div>
                    <tw-button :color="accentColor" :outline="buttonOutline" :corners="buttonSquare" size="round">
                        Rounded button
                    </tw-button>
                </div>

            </div>

        </section>
        <section class="p-3 ">
            <hr>
            <h1 class="my-4 text-2xl">Input</h1>
            <div class="grid grid-cols-2 gap-4">
                <div>

                    <tw-input type="search" :disabled="inputDisabled" icon="magnifying-glass" :error="inputError"
                              :color="accentColor" description="This is a basic input box"
                              form-name-and-id="text-input" v-model="inputVal">Test input
                    </tw-input>
                </div>
                <div>
                    <div class="ml-1 text-sm text-slate-500">The value of the input is : <b>{{ inputVal }}</b></div>
                    <tw-switch color="info" v-model="inputDisabled" size="sm">Disable input</tw-switch>
                    <tw-input placeholder="Add an error to the Test input" color="danger"
                              v-model="inputError"></tw-input>
                </div>
            </div>
        </section>
        <section class="p-3 ">
            <hr>
            <h1 class="my-4 text-2xl">Badges</h1>
            <div class="flex flex-wrap items-center justify-center gap-16">

                <tw-badge :color="accentColor" size="sm">Small</tw-badge>
                <tw-badge :color="accentColor" size="md">Medium</tw-badge>
                <tw-badge :color="accentColor" size="lg">Large</tw-badge>
                <tw-badge :color="accentColor" size="md">
                    <tw-icon icon="person" class="mr-2"></tw-icon>
                    Medium
                </tw-badge>
                <tw-badge swatch="#990012">#990012</tw-badge>
            </div>
        </section>

    </div>

</template>

