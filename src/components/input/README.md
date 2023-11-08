# Input

This is a basic input component it supports the following input types:
* text
* number
* password
* email
* tel
* search
* color
* date
* file

```vue
<tw-imput color="primary" v-model="someReactiveVar">A label</tw-imput>
```
You can add a `description` as a property and a label in the default slot. Errors are passed (as a string) to the `error` property. When
There is an error passed the color scheme changes to the errorColor

You can add an icon to the left hand side of the input by passing a string (a font awesome name without the fa-) to the `icon` property. 

### Files

When using this component as a file selector the ```@changed``` event will send the selected file. There is no need nor reason to use
```v-model``` as two-way binding is not possible as you cannot set the file.

## Properties

| Property         |  Type   | Required |    default    | notes                                                        |
|:-----------------|:-------:|:--------:|:-------------:|:-------------------------------------------------------------|
| v-model          | string  |    no    |     false     | The value of the input                                       |
| type             | String  |    no    |    'text'     | The type of input                                            |
| color            | String  |    no    |   'primary'   | The color scheme of the Input                                |
| error-color      | String  |    no    |   'danger'    | The color scheme when there is an error present              |
| disabled         | Boolean |    no    |     false     | Disables the switch                                          |
| form-name-and-id | String  |    no    | random string | Sets the id and name of the hidden select (for use in forms) |
| icon             | String  |    no    |      ''       | A Font Awesome name                                          |
| description      | String  |    no    |      ''       | A description of the input placed underneath it              |
| error            | String  |    no    |      ''       | An error (such as a validation error) to be shown            |
| placeholder      | String  |    no    |      ''       | Any placeholder text you want to show                        |

## Events

```@changed``` this event, fired by a change in the input, sends the value of the component as a string or file (if the type of the component is set to file)
