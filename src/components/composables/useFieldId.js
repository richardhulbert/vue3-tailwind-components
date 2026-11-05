import { computed, useId } from 'vue'

/**
 * The id (and name) a form field renders: the formNameAndId prop when the
 * consumer gives one, otherwise an id Vue generates for this instance.
 *
 * Must be called from a component's setup. Generated ids are unique within
 * one Vue app, and stable between server and client rendering.
 */
export function useFieldId(props) {
  const generated = useId()
  return computed(() => props.formNameAndId || generated)
}
