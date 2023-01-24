# Paginator
This component is used to paginate results. It requires two properties to function: `current-page` and 'num-of-pages'. It emits
a `paginate` event with the new page number each time a pagination link is clicked.

```vue
<tw-paginator @paginate="paginate" :current-page="currentPage" :num-of-pages="numOfPages" class="mt-2"></tw-paginator>
```

## Properties
| Property     |  Type  | Required | default  | notes                                                                                       |
|:-------------|:------:|:--------:|:--------:|:--------------------------------------------------------------------------------------------|
| current-page | Number |   true   |    0     | The current page number as displayed                                                        |
| num-of-pages | Number |   true   |    0     | The number of pages to display                                                              |
| color        | String |  false   |  primary   | The color scheme to be used for the display. Remember that you are setting a Tailwind class |

## Events

| event    | passes  | notes                                      |
|----------|---------|--------------------------------------------|
| paginate | Integer | This the page number that a user has click |

