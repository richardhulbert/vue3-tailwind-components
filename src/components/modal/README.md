# Modal

The modal component can be used for alerts, confirmation dialogs and forms. It has three slots - `header`,`body` and `footer`.

You can style the modal with a color. This styles the header the border at the top of the footer and the close button.

The header, footer and close button can be hidden with the `hide-header`, `hide-footer` and `hide-close` properties. 

The modal uses the `v-model` property to show and hide the modal.  

```vue
<tw-modal v-model="modalShow" >
  This is a modal that has a simple message
</tw-modal>
```
## Slots

There three slots in the modal: The default slot that fills the main section of the modal. The header slot for modal titles and background
and the footer slot

```vue

<tw-modal v-model="modalShow">
    <template #header>A header</template>
    This is a modal that has a simple message
    <template #footer>
      <tw-button>Do a thing</tw-button>
    </template>
</tw-modal>
```

## Properties

| Property         |  Type   | Required |  default  | notes                                             |
|:-----------------|:-------:|:--------:|:---------:|:--------------------------------------------------|
| v-model          | Boolean |   yes    |   false   | The state of the modal where true = modal showing |
| color            | String  |    no    | 'primary' | See info about  colors                            |
| background-color | String  |    no    | 'primary' | The color of the overlay behind the modal         |
| size             | String  |    no    |   'md'    | The size of the modal - sm , md or lg             |
| hide-header      | Boolean |    no    |   false   | Set this to hide the header section               |
| hide-close       | Boolean |    no    |   false   | This hides the close button                       |
| hide-footer      | Boolean |    no    |   false   | This hides the footer section of the modal        |

