# Button

This component has 3 settable properties:

> use `<tw-button  ></tw-button>` in forms, dialogs and more 

## Color
 You can set the base color using the color property this is defined in the base Tailwind theme. 
 The default is `slate` 
```vue
<tw-button color="amber">...</tw-button>
```
_Consider using a color alias  such as `primary` for button colors._

## Outline

You can set the button to be an outline button by setting the outline property
```vue
<tw-button outline color="amber">...</tw-button>
```

## Non rounded buttons

You can have rectangular buttons by setting the `corners` property

```vue
<tw-button corners color="lime">...</tw-button>
```
