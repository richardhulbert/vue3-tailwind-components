<template>
  <table class="border-collapse table-auto w-full text-sm">
    <thead :class="headingClass" class="text-primary-800">
    <tr>
      <th class="p-2 font-normal" v-for="h in headings" :key="h.field">{{ h.label }}</th>
    </tr>
    </thead>
    <tbody class="text-primary-600 dark:text-primary-100">
    <tr
        v-for="(item, index) in items"
        :key="index"
        :class="rowClass(index)"
        class="transition-colors"
    >
      <td
          v-for="cell in headings"
          :key="cell.field"
          :class="boarderClass"
          class=" text-primary-600 dark:text-primary-100 px-4 py-2"
      >
        <!-- Scoped slot for customization -->
        <slot :name="cell.field" :item="item">
          {{ item[cell.field] }}
        </slot>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "TwTable",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    headings: {
      type: Array,
      required: true,
    },
    border: {
      type: Boolean,
      default: true,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    hover: {
      type: Boolean,
      default: false,
    },
    headingColor: {
      type: String,
      default: "primary",
    },
    borderColor: {
      type: String,
      default: "primary",
    },
    stripeColor: {
      type: String,
      default: "primary",
    },
    hoverColor: {
      type: String,
      default: "primary",
    },
    selectedIndex: {
      type: Number,
      default: -1,
    },
    selectColor: {
      type: String,
      default: "primary",
    },
  },
  setup(props) {
    // Compute the heading CSS class
    const headingClass = computed(() => {
      return `bg-${props.headingColor}-200 dark:bg-${props.headingColor}-700 dark:text-${props.headingColor}-200`;
    });

    // Compute the border class for table cells
    const boarderClass = computed(() => {
      return props.border
          ? `border border-${props.borderColor}-200 dark:border-${props.borderColor}-700`
          : "";
    });

    // Compute the row class based on props and index
    const rowClass = (ndx) => {
      let hoverClass = props.hover
          ? `hover:bg-${props.hoverColor}-300 dark:hover:bg-${props.hoverColor}-700 dark:hover:text-white`
          : "";

      if (props.selectedIndex === ndx) {
        return `bg-${props.selectColor}-300 dark:bg-${props.selectColor}-400`;
      }

      if (props.striped && props.selectedIndex !== ndx) {
        return ndx % 2 !== 0
            ? `bg-${props.stripeColor}-100 dark:bg-${props.stripeColor}-800 dark:text-primary-200 ${hoverClass}`
            : `dark:text-primary-700 ${hoverClass}`;
      }

      return `${hoverClass} dark:text-gray-700`;
    };

    // Expose all computed properties and methods for template
    return {
      headingClass,
      boarderClass,
      rowClass,
    };
  },
});
</script>
