# Button Group

This is a simple button group v-model should equal one value in the items array of objects.

```vue
<tw-button-group color="amber" :items="arrayOfItems"  v-model="someValue" > ... </tw-button-group>
```
## Properties

| Property    |  Type   | Required |  default  | notes                                                               |
|:------------|:-------:|:--------:|:---------:|:--------------------------------------------------------------------|
| v-model     | Boolean |   yes    |   false   | Whether rollout is shown                                            |
| color       | String  |    no    | 'primary' | The color scheme of the rollout                                     |
| items       |  Array  |   yes    |    []     | An array of name value objects `[{label:"A Label",value:"a343"}]`   |

