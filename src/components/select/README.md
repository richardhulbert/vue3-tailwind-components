# Select

This is a replacement for the standard select input. It has two required properties v-model and items - an array of objects
with a label and a value property like this;
```javascript
const items = [  
    {label: 'Primary', value: 'primary', icon:'star'},
    {label: 'Secondary', value: 'secondary', icon:'dice-two'},
    {label: 'Warning', value: 'warning', icon:'triangle-exclamation'},
    {label: 'Success', value: 'success', icon:'circle-check'},
    {label: 'Danger', value: 'danger', icon:'radiation'},
    {label: 'Info', value: 'info', icon:'circle-info'}
]
```

`v-model` is a string. This is mapped to a value in the items array object. If it doesn't find the value it sets
the label of the select to the model

```vue

<tw-select :items="items" color="secondary" v-model="a_reactive_variable" :error="some.form.error"></tw-select>

```
## Properties

| Property         |  Type   | Required |    default    | notes                                                                               |
|:-----------------|:-------:|:--------:|:-------------:|:------------------------------------------------------------------------------------|
| v-model          | String  |   yes    |      ''       | The value of the select                                                             |
| items            |  Array  |   yes    |      []       | The items that will be shown as options each items must contain a label and a value |
| size             | String  |    no    |      'md'      | Accepts 'lg','md','sm' and 'xs'                                                      |
| color            | String  |    no    |   'primary'   | The theme color of the select box and options                                       |
| label            | String  |    no    |      ''       | Text of the select button if no value has been set                                  |
| disabled         | Boolean |    no    |     false     | The select is disabled when set to true                                             |
| error            | String  |    no    |      ''       | An error message (a non empty string will set the color to 'danger'                 |
| form-name-and-id | String  |    no    | random string | Sets the id and name of the hidden select (for use in forms)                        |

## Events

```@changed``` this event sends the value of the component
