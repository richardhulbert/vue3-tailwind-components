<script setup>
import {computed, ref} from "vue";
import _ from 'lodash'
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
  TwTextarea,
  TwCollapse,
  TwRange
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
let notificationMessage = ref("Message to send...")
let notificationPosition = ref('center')
let notificationLifetime = ref(6)
let textareaValue = ref('');
let selectedRow = ref(-1)
let fileInfo = ref('')
let rolloutAlignRight = ref(false);
const darkTheme = ref(false)
const blurRollout = ref(true)
const rangeValue = ref(0)
const rangeStep = ref(1)
const rangeShowLabels = ref(true)

let numOfPages = computed(() => {
  return Math.ceil(records.value.length / pageSize.value)
})

const buttonVariant = computed(() => {
  return buttonSquare.value ? 'square' : ''
})
const colors = [
  {label: 'Primary', value: 'primary'},
  {label: 'Secondary', value: 'secondary'},
  {label: 'Warning', value: 'warning'},
  {label: 'Success', value: 'success'},
  {label: 'Danger', value: 'danger'},
  {label: 'Info', value: 'info'}
]

let eg_list = ref([])

setTimeout(() => {
  eg_list.value = [
    {label: 'One', value: 1},
    {label: 'Two', value: 2},
    {label: 'Three', value: 3},
    {label: 'Four', value: 4}
  ]
}, 1000)

const eg_list_selected = ref(2)

const menuItems = [
  {label: 'People', value: '/people', icon: 'users'},
  {label: 'Roles', value: '/roles', icon: 'user-shield'},
  {label: 'pages', value: '/pages', icon: 'file-lines'},
  {label: 'settings', value: '/settings', icon: 'file-lines'},
]

const dropdownItems = [
  {"label": "Branches", "icon": "code-branch", "action": "list_branches"},
  {"label": "User", "icon": "users", "action": "list_users"},
  {"label": "No Icon", "action": "list_users"}
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
  {
    label: 'Action',
    field: 'id'
  }
]


function paginate(page) {
  let start = (page - 1) * pageSize.value
  selectedRow.value = -1;
  currentPage.value = page
  products.value = records.value.slice(start, pageSize.value + start)
}

function createProducts() {
  for (let i = 0; i < numOfProducts.value; i++) {
    let product = {
      code: faker.random.alpha(10),
      name: faker.name.firstName(),
      link: faker.internet.url(),
      id: i
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

function showDropdownResult(item) {
  dropDownResult.value = "You selected " + item.label;
}

function notify() {
  showNotification.value = true
}

function selectRow(id) {
  selectedRow.value = _.findIndex(products.value, ['id', id])
}

function handleChangedFile(file) {
  fileInfo.value = 'file:' + file.name + ' size:' + file.size + ' type:' + file.type
}

function handleChangeTheme() {
  if (darkTheme.value) {
    document.documentElement.classList.add('dark')

  } else {
    document.documentElement.classList.remove('dark')
  }
}


</script>
<template>
  <div class="container">
    <h1 class="text-3xl p-3">Welcome to the Vue Tailwind Component Project</h1>
    <div class="text-gray-700 dark:text-gray-100 p-4 bg-primary-100 dark:bg-primary-700 mt-2">
      This is a rough and ready page that should give you a feel of what the Tailwind Vue components look and behave
      like in a page. To learn more about how we hava approached Tailwind colors in the taiwlind.config.js file I
      suggest you read the <a class="link" href="https://github.com/richardhulbert/vue3-tailwind-components#readme">documentation</a>.
    </div>
    <section class=" p-4">
      <h1 class="my-2 text-2xl">Color control</h1>
      <div class="flex gap-4">
        <tw-select label="Select a color" class="w-80" v-model="accentColor" :color="accentColor"
                   :items="colors"></tw-select>
        <tw-switch @changed="handleChangeTheme" v-model="darkTheme" size="lg">Dark Mode</tw-switch>
      </div>


    </section>
    <section class=" p-4">
      <tw-collapse label="Table Operations" :color="accentColor">
        <div class=" flex flex-row gap-3  p-3 bg-slate-100 dark:bg-slate-700">
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
            <tw-button @click="createProducts(0)" :color="accentColor" class="mt-5">
              <tw-icon icon="plus" class="mr-2"></tw-icon>
              Create records
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
                    :hover-color="accentColor" :striped="striped" :headings="headings" :items="products"
                    :selected-index="selectedRow">
            <template v-slot:link="row">
              <a :href="row.item.link">{{ row.item.link }}</a>
            </template>
            <template v-slot:id="row">
              <tw-button @click="selectRow(row.item.id)" size="sm">select</tw-button>
            </template>

          </tw-table>
          <tw-paginator :color="accentColor" @paginate="paginate" :current-page="currentPage"
                        :num-of-pages="numOfPages"
                        class="mt-2"></tw-paginator>
        </div>
      </tw-collapse>
    </section>
    <section class="flex flex-row gap-24 p-4">
      <div class="flex-col">
        <h1 class="my-2 text-2xl">Modal</h1>
        <div>
          <tw-button :color="accentColor" @click="modalShow = true" outline>Show modal</tw-button>
        </div>
        <tw-modal :color="accentColor" v-model="modalShow">
          This is a modal that has a simple message
          <tw-select label="Select a color" class="w-80" v-model="accentColor" :color="accentColor"
                     :items="colors"></tw-select>

        </tw-modal>
      </div>
      <div class="flex-col gap-2">
        <h1 class="my-2 text-2xl">Rollouts</h1>
        <tw-button outline :color="accentColor" @click="rolloutShow">Show Rollout</tw-button>
        <tw-switch size="sm" v-model="blurRollout">Blur Background</tw-switch>
        <tw-switch size="sm" v-model="rolloutAlignRight">From right</tw-switch>
        <tw-rollout z-index="50" width="w-10/12" :align-right="rolloutAlignRight" :color="accentColor"
                    v-model="showRollout" :blur="blurRollout">
          <div class="m-8 p-8 ">
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
        <div class="flex gap-2">
          <div class="flex-shrink">
            <tw-button :color="accentColor" @click="notify">Notify</tw-button>
          </div>
          <div class="flex-grow">
            <tw-input :color="accentColor" description="The message for the notification"
                      v-model="notificationMessage"></tw-input>
          </div>


        </div>
        <div class="flex content-center  mt-2 gap-2">
          <tw-select class="w-48" v-model="notificationPosition" :color="accentColor"
                     :items="notificationPositions"></tw-select>
          <tw-input description="Seconds" v-model="notificationLifetime" type="number"></tw-input>
        </div>

        <tw-notification :lifetime="notificationLifetime" :position="notificationPosition" :color="accentColor"
                         :message="notificationMessage" v-model="showNotification"></tw-notification>
      </div>
    </section>
    <section class="p-4">
      <h1 class="my-4 text-2xl">Buttons</h1>
      <div class="bg-slate-100 dark:bg-slate-700 p-4 flex flex-row">

        <tw-switch size="sm" v-model="buttonOutline">Outline?</tw-switch>
        <tw-switch size="sm" v-model="buttonSquare">Square buttons?</tw-switch>
      </div>
      <div class="flex w-full justify-between py-2 ">
        <div>
          <tw-button :color="accentColor" :outline="buttonOutline" :variant="buttonVariant" size="sm"> Small
            button
          </tw-button>
        </div>
        <div>
          <tw-button :color="accentColor" :outline="buttonOutline" :variant="buttonVariant" size="md"> Medium
            button
          </tw-button>
        </div>
        <div>
          <tw-button :color="accentColor" :outline="buttonOutline" :variant="buttonVariant" size="lg"> large
            button
          </tw-button>
        </div>
        <div>
          <tw-button :color="accentColor" :outline="buttonOutline" variant="round">
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
        <div class="block">
          <tw-input @changed="handleChangedFile" type="file" :color="accentColor"></tw-input>
        </div>
        <div>
          <tw-select label="Pick a number" class="w-80" v-model="eg_list_selected" :color="accentColor"
                     :items="eg_list" :error="inputError"></tw-select>
        </div>
        <div>
          <p>{{ fileInfo }}</p>
        </div>

      </div>
      <h1 class="my-4 text-2xl">Range</h1>
      <div class="flex gap-8">
        <div class="flex-grow">
          <tw-range :color="accentColor" class="w-full" min="-50" max="50" v-model="rangeValue" :step="rangeStep" :show-labels="rangeShowLabels"><span class="text-primary-500 dark:text-white">A range slider</span></tw-range>
        </div>
        <div>
          <tw-input v-model="rangeValue">Range value</tw-input>
        </div>
        <div>
          <tw-input v-model="rangeStep">Step values</tw-input>
        </div>
        <div>
          Show labels
          <tw-switch v-model="rangeShowLabels">Labels</tw-switch>
        </div>

      </div>
    </section>
    <section class="p-3 ">
      <hr>
      <h1 class="my-4 text-2xl">Text Area</h1>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <tw-textarea placeholder="a text area" :color="accentColor" v-model="textareaValue"
                       description="This is a text area" :error="inputError">A Textarea
          </tw-textarea>
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
        <tw-badge swatch="#708024">#708024</tw-badge>
      </div>
    </section>
    <section class="p-3 ">
      <hr>
      <h1 class="my-4 text-2xl">Collapse </h1>
      <tw-collapse label="Click me" :color="accentColor" :expanded="true">
        <template #label>
          <tw-icon class="mr-2" icon="rectangle-list" set="regular"></tw-icon>
          Some hidden content
        </template>
        <h2 class="text-xl dark:text-white dark:bg-primary-800">Some content</h2>
        <p class="dark:bg-primary-800 bg-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci amet aperiam atque, cupiditate dolor
          doloribus ea eligendi exercitationem expedita fugit, illum impedit iste maiores odio, optio pariatur
          repellendus voluptas?
        </p>
      </tw-collapse>
    </section>


  </div>

</template>
<style scoped>
a.link {
  color: #0969da;
  text-decoration: underline;
}
</style>

