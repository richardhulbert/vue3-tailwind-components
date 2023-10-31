# Select

This is a replacement for the standard select input. It has two required properties v-model and items - an array of objects
with a label and a value property like this;
```javascript
const items = [
  {label:'Primary',value:'primary'},
  {label:'Secondary',value:'secondary'},
  {label:'Warning',value:'warning'},
  {label:'Success',value:'success'},
  {label:'Danger',value:'danger'},
  {label:'Info',value:'info'}
]
```

`v-model` is a string. This is mapped to a value in the items array object. If it doesn't find the value it sets
the label of the select to the model

```vue

<tw-select :items="items" color="secondary" v-model="a_reactive_variable"></tw-select>

```
## Properties

| Property         |  Type   | Required |    default    | notes                                                                               |
|:-----------------|:-------:|:--------:|:-------------:|:------------------------------------------------------------------------------------|
| v-model          | String  |   yes    |      ''       | The value of the select                                                             |
| items            |  Array  |   yes    |      []       | The items that will be shown as options each items must contain a label and a value |
| color            | String  |    no    |   'primary'   | The theme color of the select box and options                                       |
| label            | String  |    no    |      ''       | Text of the select button if no value has been set                                  |
| disabled         | Boolean |    no    |     false     | The select is disabled when set to true                                             |
| form-name-and-id | String  |    no    | random string | Sets the id and name of the hidden select (for use in forms)                        |

## Events

```@changed``` this event sends the value of the component
