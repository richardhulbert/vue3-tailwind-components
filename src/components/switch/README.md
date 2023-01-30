# Switch

This component has 3 settable properties:

```vue
<tw-switch color="amber" v-model="somvar"></tw-switch>
```
## Properties

| Property         |  Type   | Required |    default    | notes                                                           |
|:-----------------|:-------:|:--------:|:-------------:|:----------------------------------------------------------------|
| v-model          | Boolean |   yes    |     false     | The base color using a color defined in the base Tailwind theme |
| color            | String  |    no    |   'primary'   | The color scheme of the Switch                                  |
| disabled         | Boolean |    no    |     false     | Disables the switch                                             |
| form-name-and-id | String  |    no    | random string | Sets the id and name of the hidden select (for use in forms)    |

