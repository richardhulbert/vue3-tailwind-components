#  Icons
tw-icon uses Font Awesome's free icon sets. This currently gives you 1390 icons in the solid set of icons and 163 in the 
regular set. You can browse the icons [here](https://fontawesome.com/search?o=r&m=free).

Use icons like this:

```vue
<tw-icon icon="user"></tw-icon>
```
This is the equivalent of doing this in HTML

```html
<i class="fa-solid fa-user"></i>
```

You can further style the icon in all the usual Tailwind ways:

```vue
<tw-icon icon="user" class="bg-slate-200 ml-2"></tw-icon>
```

Additionally, you can add animations to the icon:

```vue
<tw-icon icon="user" spin></tw-icon>
```

## Properties
| Property  |  Type  | Required |     default      | notes                                                        |
|:----------|:------:|:--------:|:----------------:|:-------------------------------------------------------------|
| icon      | String |   true   | skull-crossbones | The fontawesome name without the 'fa-' prefix                |
| set       | String |  false   |      solid       | Whether to use the 'solid' set or 'regular'                  |
| animation | String |  false   |                  | possible values [spin,shake,flip,bounce,beat-fade,beat,fade] |
