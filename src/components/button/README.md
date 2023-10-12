# Button

This component has 5 settable properties:

```vue
<tw-button color="amber" outline corners></tw-button>
```
## Properties

| Property |  Type   | Required |  default  | notes                                                           |
|:---------|:-------:|:--------:|:---------:|:----------------------------------------------------------------|
| color    | String  |    no    | `primary` | The base color using a color defined in the base Tailwind theme |
| outline  | Boolean |    no    |   false   | Whether the button has an outline style                         |
| menu     | Boolean |    no    |   false   | Shows a button with no border (when added to outline)           |
| corners  | Boolean |    no    |   false   | Whether you want rectangular buttons                            |
| size     | String  |    no    |   'md'    | The size of the button - sm , md or lg                          |
| disabled | Boolean |    no    |   false   | A disabled button cannot be clicked                             |

