# Dropdown

This component has 3 settable properties:

```vue
<tw-dropdown @selected="doAnAction" label="Admin" color="amber"  :items="someItems" ></tw-dropdown>
```
## Properties

| Property |  Type   | Required |  default  | notes                                           |
|:---------|:-------:|:--------:|:---------:|:------------------------------------------------|
| label    | String  |    no    |  `Menu`   | the text in the selector button                 |
| color    | String  |    no    | 'primary' | The base color for the component                |
| items    |  Array  |    no    |    []     | The items to be displayed in the menu           |
| outline  | Boolean |    no    |   false   | if you want a border around the button selector |

### Items structure
Each item in the array will have the following properties:
* Label - this is the text of the menu item
* icon - the free fontawesome name of the icon you want to display
* action - this is a string that is sent with the selected event

an example with two menu items:
```json
[
  {"label": "Branches", "icon":"code-branch", "action": "list_branches"},
  {"label": "User", "icon":"users", "action":"list_users"}
]
```

## Events
The dropdown item has one event **selected** this passes the _action_ of a clicked menu item.
