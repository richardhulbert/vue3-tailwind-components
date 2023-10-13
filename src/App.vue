<script setup>
import {computed, ref} from "vue";
import {faker} from '@faker-js/faker';
import {
  TwTable,
  TwButton,
  TwPaginator,
  TwSwitch,
  TwIcon,
  TwModal,
  TwSelect,
  TwInput,
  TwBadge,
  TwRollout,
  TwDropdown,
  TwNotification,
  TwTextarea
} from "./components/";


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
let showRollout = ref(false);
let dropDownResult = ref("")
let showNotification = ref(false)
let notificationMessage = ref("Message sent")
let notificationPosition = ref('center')
let notificationLifetime = ref(6)
let textareaValue = ref('');

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

const menuItems = [
  {label: 'People', value: '/people', icon: 'users'},
  {label: 'Roles', value: '/roles', icon: 'user-shield'},
  {label: 'pages', value: '/pages', icon: 'file-lines'},
  {label: 'settings', value: '/settings', icon: 'file-lines'},
]

const dropdownItems = [
  {"label": "Branches", "icon": "code-branch", "action": "list_branches"},
  {"label": "User", "icon": "users", "action": "list_users"}
]

const notificationPositions = [
  {label: 'Center', value: 'center'},
  {label: 'Top Center', value: 'top-center'},
  {label: 'Top Left', value: 'top-left'},
  {label: 'Top Right', value: 'top-right'},
  {label: 'Bottom Center', value: 'bottom-center'},
  {label: 'Bottom Left', value: 'bottom-left'},
  {label: 'Bottom Right', value: 'bottom-right'},
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

function rolloutShow() {
  showRollout.value = true
}

function showDropdownResult(action) {
  dropDownResult.value = "You selected " + action;
}

function notify() {
  showNotification.value = true
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
    <section class="flex flex-row gap-24 p-4">
      <div class="flex-col">
        <h1 class="my-2 text-2xl">Modal</h1>
        <div>
          <tw-button :color="accentColor" @click="modalShow = true" outline>Show modal</tw-button>
        </div>
        <tw-modal :color="accentColor" v-model="modalShow">
          This is a modal that has a simple message

        </tw-modal>
      </div>
      <div class="flex-col">
        <h1 class="my-2 text-2xl">Rollouts</h1>
        <tw-button outline :color="accentColor" @click="rolloutShow">Show Rollout</tw-button>

        <tw-rollout z-index="50" width="w-10/12" :color="accentColor" v-model="showRollout">
          <div class="m-8 p-8 bg-white">
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
        </tw-rollout>
      </div>
      <div class="flex-col">
        <h1 class="my-2 text-2xl">Dropdown</h1>
        <tw-dropdown @selected="showDropdownResult" :items="dropdownItems" :color="accentColor"></tw-dropdown>
      </div>
      <div class="flex-col">
        <p class="text-primary-500 mt-6">{{ dropDownResult }}</p>
      </div>
      <div class="">
        <h1 class=" relative my-2 text-2xl">Notification</h1>
        <div class="flex">
          <tw-button :color="accentColor" size="sm" @click="notify" outline>Notify</tw-button>
          <tw-input :color="accentColor" description="The message for the notification" class="ml-2"
                    v-model="notificationMessage" label="message"></tw-input>

        </div>
        <div class="flex content-center  mt-2">
          <tw-select class="w-48" v-model="notificationPosition" :color="accentColor"
                     :items="notificationPositions"></tw-select>
          <tw-input description="Seconds" v-model="notificationLifetime" class="ml-2 w-20" type="number"></tw-input>
        </div>

        <tw-notification :lifetime="notificationLifetime" :position="notificationPosition" :color="accentColor"
                         :message="notificationMessage" v-model="showNotification"></tw-notification>
      </div>
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
                    form-name-and-id="text-input" v-model="inputVal" placeholder="enter some text...">Test input
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
      <h1 class="my-4 text-2xl">Text Area</h1>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <tw-textarea placeholder="a text area" :color="accentColor" v-model="textareaValue">A Textarea</tw-textarea>
        </div>
        <div>
          <h4 class="text-primary-500 text-sm">The value of the text area</h4>
          <p class="bg-amber-50">{{ textareaValue.replace(/(\r\n|\n|\r)/g, '<br/>') }}</p>
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

