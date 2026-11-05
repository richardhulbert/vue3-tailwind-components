import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwTable } from '@/components'
import { COLORS, classes, toneOf, vueWarnings } from '../helpers'

const headings = [{ field: 'name', label: 'Name' }, { field: 'role', label: 'Role' }]
const items = [
  { name: 'Ann', role: 'Editor' },
  { name: 'Bob', role: 'Admin' },
  { name: 'Cat', role: 'Viewer' },
]
const rowClasses = (w) => w.findAll('tbody tr').map((r) => classes(r))

describe('TwTable', () => {
  it('renders one heading per column', () => {
    expect(mount(TwTable, { props: { headings, items } }).findAll('th').map((th) => th.text())).toEqual(['Name', 'Role'])
  })

  it('renders each item as a row, cells in heading order', () => {
    const rows = mount(TwTable, { props: { headings, items } }).findAll('tbody tr')
    expect(rows.map((r) => r.findAll('td').map((td) => td.text()))).toEqual([
      ['Ann', 'Editor'],
      ['Bob', 'Admin'],
      ['Cat', 'Viewer'],
    ])
  })

  it('lets a scoped slot named after a field render its cells', () => {
    const w = mount(TwTable, {
      props: { headings, items },
      slots: { role: `<template #role="{ item }"><b>{{ item.role.toUpperCase() }}</b></template>` },
    })
    expect(w.findAll('tbody b').map((b) => b.text())).toEqual(['EDITOR', 'ADMIN', 'VIEWER'])
  })

  it('renders an empty body with no items', () => {
    expect(mount(TwTable, { props: { headings } }).findAll('tbody tr')).toHaveLength(0)
  })

  it('requires headings', () => {
    expect(TwTable.props.headings.required).toBe(true)
  })

  it.each(COLORS)('takes its tone from color, and the heading from headingColor: %s', (color) => {
    expect(toneOf(mount(TwTable, { props: { headings, items, color } }).get('table'))).toBe(color)
    expect(toneOf(mount(TwTable, { props: { headings, items, color } }).get('thead'))).toBe(color)
    expect(toneOf(mount(TwTable, { props: { headings, items, headingColor: color } }).get('thead'))).toBe(color)
  })

  it.each(['borderColor', 'stripeColor', 'hoverColor', 'selectColor'])('warns that %s is deprecated', (name) => {
    const warnings = vueWarnings(() => mount(TwTable, { props: { headings, items, [name]: 'info' } }))
    expect(warnings.join()).toContain(`${name} is deprecated`)
  })

  describe('class contract', () => {
    it('heading, body, cell, striped, hover and selected rows', () => {
      const props = { headings, items }
      expect({
        heading: classes(mount(TwTable, { props }).get('thead')),
        body: classes(mount(TwTable, { props }).get('tbody')),
        cell: classes(mount(TwTable, { props }).get('td')),
        plainRows: rowClasses(mount(TwTable, { props })),
        stripedHoverRows: rowClasses(mount(TwTable, { props: { ...props, striped: true, hover: true } })),
        selectedRows: rowClasses(mount(TwTable, { props: { ...props, striped: true, selectedIndex: 1 } })),
      }).toMatchSnapshot()
    })

    it('without borders', () => {
      expect(classes(mount(TwTable, { props: { headings, items, border: false } }).get('td'))).toMatchSnapshot()
    })
  })
})
