# Button Group

This is a simple button group. the v-model equals the selected value in the items array of objects. The array contains objects with a label and a value property with an optional icon property that is the Fontawsome name

```vue
<tw-button-group color="amber" :items="arrayOfItems"  v-model="someValue" > ... </tw-button-group>
```
## Properties

| Property    |  Type   | Required |  default  | notes                                                                          |
|:------------|:-------:|:--------:|:---------:|:-------------------------------------------------------------------------------|
| v-model     | Boolean |   yes    |   false   | The value of the selected item                                                 |
| color       | String  |    no    | 'primary' | The color scheme of the button group                                           |
| items       |  Array  |   yes    |    []     | An array of name value objects `[{label:"A Label",value:"a343",icon:"circle"}]` |

