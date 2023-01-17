# vue3-tailwind-components
This is a simple set of Vue 3, Tailwind based components. At the moment these consist of:
* [Button](./src/components/button/README.md)
* [Table](./src/components/table/README.md)
* [Paginator](./src/components/paginator/README.md)



I will be extending them as I need more Vue 3 Tailwind components. To use them you can 

```shell
npm install richardhulbert/vue3-tailwind-components --save
```
You can then just import the ones you want to use.

### Colors
I expect that if you use this library you will already understand how to use Tailwind generally. It comes with a generous 
color pallet of gradated colors. In the background Tailwind strips out the classes it does not see directly in your code to keep your css small
but this creates a problem for us. It cannot see computed (concatenated strings). In order to use our components you will need to edit your.
`tailwind.config.js` file in the root of your project.

```javascript
 ...
safelist: [
    {
      pattern: /bg-(\w+)-(\d00)/,
      variants:  ['hover', 'focus'],
    },
    {
      pattern: /border-(\w+)-(\d00)/,
    },
    {
      pattern: /text-(\w+)-(\d00)/,
    },
  ],
...
```
This tells Tailwind - Do not remove these classes from the CSS

You can be more specific and therefore reduce the size of the resultant css by doing something like this

```javascript
{
    pattern: /border-(slate|amber|primary)-(200|500|700)/
}
```
Another suggestion would be to create color aliases in `tailwind.config.js` like this:

```javascript
theme: {
    extend: {
      colors:{
        primary:colors.cyan,
        secondary:colors.lime
      }
    },
  }

```

You can then use do something like this 
```vue
<tw-button @click="clearProducts" color="primary" ouutline class="ml-3 ">Clear</tw-button>`
```
This is useful in the situation where you want to change the colour of a lot of buttons in one go.




## Running this project locally

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
