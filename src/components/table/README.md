 # Table
 
This component displays tabular results using Tailwind table classes. It allows you to change the header color, Whether it 
is striped and what color those stripes might be and whether rows are highlighted when hovered over.

It requires that you pass it two elements: the records and the header.

## The header

```javascript
const headings = [
    {
      label: 'Product Name',
      field: 'name'
    },
    {
    label: 'Product Code',
    field: 'code'
  },
    {
      label: 'Product link',
      field: 'link'
    }
]
```
This is an array that defines the head section of the table. Each column is represented by an object containing two properties `field` and `label`.
The fields need to be unique.

## Items
This is an array of data that contains objects each with a key that can relate to the `field` in the heading.

```javascript
[
    {
        "code": "jinwxqjolx",
        "name": "Matteo",
        "link": "https://second-naturalisation.net"
    },
    '...'
    
]
```

Here is an example:

```vue
      <tw-table  hover hover-color="amber" :headings="headings" :items="products"></tw-table>
```

## Slots
Sometimes one may need to process the contents of a column. In order to do this we use Slots like this:

```vue
      <tw-table  hover hover-color="amber" :headings="headings" :items="products">
        <template v-slot:link="row">
          <a :href="row.item.link">{{row.item.link}}</a>
        </template>
      </tw-table>
```
Here we are processing the `link` column (field) such that it is a link (rather than pain text)

## Properties

| Property     |  Type   | Required | default | notes                                                           |
|:-------------|:-------:|:--------:|:-------:|:----------------------------------------------------------------|
| headings     |  Array  |   yes    |   []    | This defines the columns in the table                           |
| items        |  Array  |   yes    |   []    | This is the data that will be rendered in your table            |
| striped      | Boolean |    no    |  false  | Whether the table has striped rows                              |
| hover        | Boolean |    no    |  false  | Whether rows highlight when you hover over them                 |
| header-color | String  |    no    | `primary` | The base color using a color defined in the base Tailwind theme |
| stripe-color | String  |    no    | `primary` | The color of the striped row if `striped` is set to true        |
| hover-color  | String  |    no    | `primary` | The color of the hovered row                                    |
