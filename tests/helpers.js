import { vi } from 'vitest'

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
