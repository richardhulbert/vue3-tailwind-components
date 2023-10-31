# Textarea

This Textarea works in a similar way to the input 

```vue
<tw-textarea color="primary" v-model="someReactiveVar">A label</tw-textarea>
```
You can add a `description` as a property and a label in the default slot. Errors are passed (as a string) to the `error` property. When
There is an error passed the color scheme changes to the errorColor

 
## Properties

| Property         |  Type   | Required |    default    | notes                                                        |
|:-----------------|:-------:|:--------:|:-------------:|:-------------------------------------------------------------|
| v-model          | Boolean |   yes    |      ''       | The value of the textarea                                    |
| color            | String  |    no    |   'primary'   | The color scheme of the Input                                |
| error-color      | String  |    no    |   'danger'    | The color scheme when there is an error present              |
| disabled         | Boolean |    no    |     false     | Disables the input                                           |
| form-name-and-id | String  |    no    | random string | Sets the id and name of the hidden select (for use in forms) |
| description      | String  |    no    |      ''       | A description of the input placed underneath it              |
| error            | String  |    no    |      ''       | An error (such as a validation error) to be shown            |
| placeholder      | String  |    no    |      ''       | Any placeholder text you want to show                        |

## Events

```@changed``` this event sends the value of the component
