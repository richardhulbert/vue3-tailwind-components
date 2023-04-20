# Badge

This component has 3 settable properties:

```vue
<tw-badge color="amber" size="lg"> Badge text </tw-badge>
```
or 
```vue
<tw-badge  swatch="#882356"> Special color </tw-badge>
```
## Properties

| Property |  Type  | Required |  default  | notes                                                                                                                      |
|:---------|:------:|:--------:|:---------:|:---------------------------------------------------------------------------------------------------------------------------|
| color    | String |    no    | `primary` | The base color using a color defined in the base Tailwind theme                                                            |
| size     | String |    no    |   'md'    | The size of the button - sm , md or lg                                                                                     |
| swatch   | String |    no    |    ''     | You can override the tailwind colors by setting the swatch property to a hex color. It will auto calculate the text color. |

