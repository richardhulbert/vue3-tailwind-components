#  Notification (Toast)

This component displays a message that disappears after a period of time. It can be placed at various points in the screen
and can be accented with any color. 

The pulsing icon can be any free FontAwesome icon You can browse the icons [here](https://fontawesome.com/search?o=r&m=free).

Usage
```vue
<tw-notification v-model="showNotification" message="This is the message that will be displayed" ></tw-notification>
```
or

```vue
<tw-notification  v-model="showNotification" color="success" icon="thumbs-up" lifetime="3" message="You save it!" position="top-left"></tw-notification>
```



## Properties
| Property |  Type   | Required |   default   | notes                                                                                         |
|:---------|:-------:|:--------:|:-----------:|:----------------------------------------------------------------------------------------------|
| v-model  | Boolean |   yes    |    false    | Whether the notification is showing                                                           |
| message  | String  |   true   | 'A message' | This is what gets displayed in the notification                                               |
| icon     | String  |  false   | circle-info | The fontawesome name without the 'fa-' prefix                                                 |
| color    | String  |  false   |  'primary'  | Whether to use the 'solid' set or 'regular'                                                   |
| position | String  |  false   |  'center'   | Possible values [center,top-center,top-left,top-right,bottom-center,bottom-left,bottom-right] |
| lifetime | Number  |  false   |      6      | The number of seconds the notification stays on the screen. 0= last forever                   |
