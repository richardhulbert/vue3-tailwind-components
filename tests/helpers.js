import { vi } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'

// The colour aliases every consumer is told to configure. Class snapshots
// cover each one, because the class strings are built per colour.
export const COLORS = ['primary', 'secondary', 'warning', 'success', 'danger', 'info']

// Collects Vue's runtime warnings ("Invalid prop", "Extraneous non-emits
// event listeners" and so on) while `fn` runs, and returns them.
export function vueWarnings(fn) {
  const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  try {
    fn()
    return spy.mock.calls.map((args) => args.join(' ')).filter((m) => m.includes('[Vue warn]'))
  } finally {
    spy.mockRestore()
  }
}

// The class attribute of an element, split and sorted, so snapshots compare
// the set of classes rather than the order they were concatenated in.
export function classes(wrapper) {
  return (wrapper.attributes('class') ?? '').split(/\s+/).filter(Boolean).sort()
}

// The ids two instances of `component` get when they share one Vue app, as
// they do on a page. `selector` finds the element carrying the id.
export function idsOfTwo(component, selector, props = {}) {
  const w = mount({ render: () => [h(component, props), h(component, props)] })
  return w.findAll(selector).map((el) => el.attributes('id'))
}

// The palette name a tone root reads, from its inline --t-500 variable:
// 'success' for var(--success-500, ...). Takes the element carrying the tone,
// or a wrapper whose root carries it.
export function toneOf(wrapperOrEl) {
  const el = wrapperOrEl.element ?? wrapperOrEl
  const value = el.style.getPropertyValue('--t-500')
  return value.match(/^var\(--([\w-]+)-500/)?.[1] ?? value
}
