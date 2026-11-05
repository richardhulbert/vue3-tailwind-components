<template>
  <table v-bind="toneAttrs" class="border-collapse table-auto w-full text-sm">
    <thead v-bind="headingToneAttrs" :class="headingClass">
    <tr>
      <th class="p-2 font-normal" v-for="h in headings" :key="h.field">{{ h.label }}</th>
    </tr>
    </thead>
    <tbody class="text-[color:var(--c-fg-strong)]">
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
          class=" px-4 py-2"
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

<script setup>
import { computed, warn } from 'vue'
import { useTone } from '@/components/composables/useTone'

defineOptions({ name: 'TwTable' })

const props = defineProps({
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
  // The table's tone: body text, borders, stripes, hover and selection.
  color: {
    type: String,
    default: 'primary',
  },
  // The heading's tone, when it should differ from color.
  headingColor: {
    type: String,
    default: undefined,
  },
  // Deprecated in 1.0: the body takes its colours from color.
  borderColor: {
    type: String,
    default: undefined,
  },
  stripeColor: {
    type: String,
    default: undefined,
  },
  hoverColor: {
    type: String,
    default: undefined,
  },
  selectedIndex: {
    type: Number,
    default: -1,
  },
  selectColor: {
    type: String,
    default: undefined,
  },
})

const toneAttrs = useTone(() => props.color)
const headingToneAttrs = useTone(() => props.headingColor ?? props.color)

for (const name of ['borderColor', 'stripeColor', 'hoverColor', 'selectColor']) {
  if (props[name] !== undefined) {
    warn(`TwTable: ${name} is deprecated and has no effect. The body takes its colours from color.`)
  }
}

const headingClass = computed(() => 'bg-[color:var(--c-soft)] text-[color:var(--c-on-soft)]')

const boarderClass = computed(() => (props.border ? 'border border-[color:var(--c-line-muted)]' : ''))

function rowClass(ndx) {
  const hoverClass = props.hover ? 'hover:bg-[color:var(--c-soft-hover)]' : ''

  if (props.selectedIndex === ndx) {
    return 'bg-[color:var(--c-selected)] text-[color:var(--c-on-selected)]'
  }

  if (props.striped && ndx % 2 !== 0) {
    return `bg-[color:var(--c-subtle)] ${hoverClass}`
  }

  return hoverClass
}
</script>
