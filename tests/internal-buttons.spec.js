import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwDropdown, TwModal, TwPaginator, TwSelect } from '@/components'

// The library's own buttons (a trigger, a default OK, page numbers, options)
// must never submit a form a consumer happens to place them in.
const types = (w) => w.findAll('button').map((b) => b.attributes('type'))

describe("the library's own buttons", () => {
  it.each([
    ['TwDropdown trigger', () => mount(TwDropdown, { props: { items: [{ label: 'A' }] } })],
    ['TwModal default OK', () => mount(TwModal, { props: { modelValue: true } })],
    ['TwPaginator pages', () => mount(TwPaginator, { props: { numOfPages: 3, currentPage: 2 } })],
  ])('%s never submit a form', (_, make) => {
    const found = types(make())
    expect(found.length).toBeGreaterThan(0)
    expect(found.every((t) => t === 'button')).toBe(true)
  })

  it('TwSelect button and options never submit a form', async () => {
    const w = mount(TwSelect, { props: { items: [{ label: 'A', value: 1 }, { label: 'B', value: 2 }] } })
    await w.get('button').trigger('click')
    expect(types(w)).toEqual(['button', 'button', 'button'])
  })
})
