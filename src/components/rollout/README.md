# Rollout (sidebar)

This component rolls out from the left hand side, providing a container for other components.

```vue

<tw-rollout color="amber" width="w-1/2" v-model="someBolean" > ... </tw-rollout>
```
## Properties

| Property |  Type   | Required |  default  | notes                                                          |
|:---------|:-------:|:--------:|:---------:|:---------------------------------------------------------------|
| v-model  | Boolean |   yes    |   false   | Whether rollout is shown                                       |
| color    | String  |    no    | 'primary' | The color scheme of the rollout                                |
| width    | String  |    no    |  'w-3/4'  | How far across in Tailwind terms the rollout covers the screen |
| z-index  | Number  |    no    |    10     | The z-index of the rollout                                     |

