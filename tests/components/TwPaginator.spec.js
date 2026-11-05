import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwPaginator } from '@/components'
import { COLORS, classes } from '../helpers'

const pager = (props) => mount(TwPaginator, { props: { numOfPages: 5, currentPage: 3, ...props } })
const buttons = (w) => w.findAll('button')

describe('TwPaginator', () => {
  it('renders Previous, one button per page, then Next', () => {
    expect(buttons(pager()).map((b) => b.text())).toEqual(['Previous', '1', '2', '3', '4', '5', 'Next'])
  })

  it('is a labelled navigation landmark', () => {
    expect(pager().get('nav').attributes('aria-label')).toBe('Pagination')
  })

  it('emits paginate with the page clicked', async () => {
    const w = pager()
    await buttons(w)[2].trigger('click')
    expect(w.emitted('paginate')).toEqual([[2]])
  })

  it('emits the previous and next pages', async () => {
    const w = pager()
    await buttons(w).at(0).trigger('click')
    await buttons(w).at(-1).trigger('click')
    expect(w.emitted('paginate')).toEqual([[2], [4]])
  })

  it('emits nothing past the first or last page', async () => {
    const first = pager({ currentPage: 1 })
    await buttons(first).at(0).trigger('click')
    const last = pager({ currentPage: 5 })
    await buttons(last).at(-1).trigger('click')
    expect(first.emitted('paginate')).toBeUndefined()
    expect(last.emitted('paginate')).toBeUndefined()
  })

  it('takes custom Previous and Next content from slots', () => {
    const w = mount(TwPaginator, { props: { numOfPages: 2, currentPage: 1 }, slots: { first: 'Back', last: 'On' } })
    expect(buttons(w).at(0).text()).toBe('Back')
    expect(buttons(w).at(-1).text()).toBe('On')
  })

  it.fails('disables Previous on the first page (known bug: only styled as disabled)', () => {
    expect(buttons(pager({ currentPage: 1 })).at(0).attributes('disabled')).toBeDefined()
  })

  it.fails('marks the current page for assistive technology (known bug: no aria-current)', () => {
    expect(buttons(pager())[3].attributes('aria-current')).toBe('page')
  })

  describe('class contract', () => {
    it.each(COLORS)('%s: disabled, page, current page and last', (color) => {
      const b = buttons(pager({ color, currentPage: 1 }))
      expect({
        disabledFirst: classes(b[0]),
        current: classes(b[1]),
        page: classes(b[2]),
        last: classes(b.at(-1)),
      }).toMatchSnapshot()
    })
  })
})
