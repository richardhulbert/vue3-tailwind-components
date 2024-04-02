# Range

This is a specialisation of an input with type= range

```vue
 <tw-range :color="accentColor" class="w-full" min="-50" max="50" v-model="rangeValue" :step="rangeStep" :show-labels="rangeShowLabels">
```

## Properties

| Property         |  Type   | Required |    default    | notes                                                        |
|:-----------------|:-------:|:--------:|:-------------:|:-------------------------------------------------------------|
| v-model          |    *    |   yes    |     false     | The value of the input                                       |
| max              | Number  |    no    |      100      | The max of the range                                         |
| min              | Number  |    no    |       0       | The min of the range                                         |
| step             | Number  |    no    |       1       | How the slider increments                                    |
| disabled         | Boolean |    no    |     false     | Disables the switch                                          |
| form-name-and-id | String  |    no    | random string | Sets the id and name of the hidden select (for use in forms) |
| color            | String  |    no    |   'primary'   | The color scheme to use                                      |
| showLabels       | String  |    no    |     true      | whether a labels are shown                                   |


