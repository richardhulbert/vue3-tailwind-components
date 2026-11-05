import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TwRange } from '@/components'
import { COLORS, classes, vueWarnings } from '../helpers'

describe('TwRange', () => {
  it('passes min, max, step and disabled to the native range input', () => {
    const input = mount(TwRange, { props: { min: 10, max: 20, step: 2, disabled: true } }).get('input')
    expect(input.attributes()).toMatchObject({ type: 'range', min: '10', max: '20', step: '2' })
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('shows min and max labels unless showLabels is false', () => {
    expect(mount(TwRange, { props: { min: 1, max: 9 } }).text()).toContain('Min 1')
    expect(mount(TwRange, { props: { min: 1, max: 9 } }).text()).toContain('Max 9')
    expect(mount(TwRange, { props: { showLabels: false } }).text()).not.toContain('Min')
  })

  it('renders its default slot', () => {
    expect(mount(TwRange, { slots: { default: 'Volume' } }).text()).toContain('Volume')
  })

  it('shows the model value and emits update:modelValue when moved', async () => {
    const w = mount(TwRange, { props: { modelValue: 30 } })
    expect(w.get('input').element.value).toBe('30')
    await w.get('input').setValue(60)
    expect(w.emitted('update:modelValue').at(-1)).toEqual(['60'])
  })

  it('mounts without Vue warnings', () => {
    expect(vueWarnings(() => mount(TwRange, { props: { modelValue: 5 } }))).toEqual([])
  })

  it.fails('gives each instance its own id (known bug: the default is computed once)', () => {
    const a = mount(TwRange).get('input').attributes('id')
    const b = mount(TwRange).get('input').attributes('id')
    expect(a).not.toBe(b)
  })

  describe('class contract', () => {
    it.each(COLORS)('%s', (color) => {
      expect(classes(mount(TwRange, { props: { color } }).get('input'))).toMatchSnapshot()
    })
  })
})
