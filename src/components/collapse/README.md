# Collapse 

This component hides and reveals content 

```vue

<tw-collapse  color="secondary" label="A label">
  ... some content
</tw-collapse>

```

or

```vue

<tw-collapse  color="secondary" label="A label">
  <template named="label">
    <tw-icon class="mr-2" icon="rectangle-list" set="regular"></tw-icon>
    Some hidden content
  </template>

  ... some content
</tw-collapse>

```
## Properties

| Property         |  Type   | Required |    default    | notes                                                                               |
|:-----------------|:-------:|:--------:|:-------------:|:------------------------------------------------------------------------------------|
| color            | String  |    no    |   'primary'   | The theme color of the select box and options                                       |
| label            | String  |    no    |      ''       | Text of the select button if no value has been set                                  |

## Slots
This component has two slots : the `default` slot and the `label` slot you can set the label as a property or slot if you want to use icons etc

