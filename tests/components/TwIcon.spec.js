import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { faGauge, faBell as faBellSolid } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { TwIcon } from '@/components'
import { registerIcons, setIconLoader, createPackLoader } from '@/icons'
import { resetIconRegistry } from '@/components/icons/registry.js'

// The real Font Awesome component, not the global stub, so these tests prove
// icons actually render.
const real = (props) => mount(TwIcon, { props, global: { stubs: { FontAwesomeIcon: false } } })
const stubbed = (props) => mount(TwIcon, { props })
const iconOf = (w) => w.get('i').attributes('data-icon')

// A promise the test settles by hand, to control when a load finishes.
function deferred() {
  let resolve
  const promise = new Promise((r) => { resolve = r })
  return { promise, resolve }
}

let warn
beforeEach(() => {
  resetIconRegistry()
  warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  return () => warn.mockRestore()
})

const iconWarnings = () => warn.mock.calls.map(([m]) => m).filter((m) => m.startsWith('[TwIcon]'))

describe('TwIcon', () => {
  describe('given a definition', () => {
    it('renders it as it is', () => {
      const svg = real({ icon: faGauge }).get('svg')
      expect(svg.classes()).toEqual(expect.arrayContaining(['svg-inline--fa', 'fa-gauge']))
      expect(svg.attributes('data-prefix')).toBe('fas')
    })

    it('ignores set', () => {
      expect(iconOf(stubbed({ icon: faBell, set: 'solid' }))).toBe('far bell')
    })

    it('needs neither the registry nor a loader', () => {
      const loader = vi.fn()
      setIconLoader(loader)
      expect(iconOf(stubbed({ icon: faGauge }))).toBe('fas gauge')
      expect(loader).not.toHaveBeenCalled()
    })
  })

  describe('given a registered name', () => {
    beforeEach(() => registerIcons(faGauge, faBell, faBellSolid))

    it('renders a solid icon by default, synchronously', () => {
      expect(iconOf(stubbed({ icon: 'gauge' }))).toBe('fas gauge')
    })

    it('renders from the regular set when set="regular"', () => {
      expect(iconOf(stubbed({ icon: 'bell', set: 'regular' }))).toBe('far bell')
      expect(iconOf(stubbed({ icon: 'bell' }))).toBe('fas bell')
    })

    it('renders the SVG', () => {
      expect(real({ icon: 'bell', set: 'regular' }).get('svg').attributes('data-prefix')).toBe('far')
    })

    it('follows a change of name', async () => {
      const w = stubbed({ icon: 'gauge' })
      await w.setProps({ icon: 'bell', set: 'regular' })
      expect(iconOf(w)).toBe('far bell')
    })
  })

  it('registers the library\'s own icons on import', () => {
    for (const [icon, set, expected] of [
      ['caret-down', 'solid', 'fas caret-down'],
      ['chevron-down', 'solid', 'fas chevron-down'],
      ['circle-info', 'solid', 'fas circle-info'],
      ['skull-crossbones', 'solid', 'fas skull-crossbones'],
      ['circle-xmark', 'regular', 'far circle-xmark'],
    ]) {
      expect(iconOf(stubbed({ icon, set }))).toBe(expected)
    }
    expect(iconWarnings()).toEqual([])
  })

  it('renders the skull by default', () => {
    expect(iconOf(stubbed({}))).toBe('fas skull-crossbones')
  })

  describe('given an unregistered name and a loader', () => {
    it('shows a 1em placeholder, then the loaded icon', async () => {
      const load = deferred()
      setIconLoader(() => load.promise)
      const w = stubbed({ icon: 'gauge' })

      const placeholder = w.get('span.tw-icon-pending')
      expect(placeholder.attributes('style')).toContain('width: 1em')
      expect(placeholder.attributes('style')).toContain('height: 1em')
      expect(placeholder.attributes('aria-hidden')).toBe('true')

      load.resolve(faGauge)
      await flushPromises()
      expect(w.find('span').exists()).toBe(false)
      expect(iconOf(w)).toBe('fas gauge')
    })

    it('asks the loader for the set and name', async () => {
      const loader = vi.fn(async () => faBell)
      setIconLoader(loader)
      stubbed({ icon: 'bell', set: 'regular' })
      await flushPromises()
      expect(loader).toHaveBeenCalledWith('regular', 'bell')
    })

    it('ignores a load that finishes after the name changed', async () => {
      const loads = { gauge: deferred(), bell: deferred() }
      setIconLoader((set, name) => loads[name].promise)
      const w = stubbed({ icon: 'gauge' })
      await w.setProps({ icon: 'bell' })

      loads.bell.resolve(faBellSolid)
      await flushPromises()
      loads.gauge.resolve(faGauge)
      await flushPromises()
      expect(iconOf(w)).toBe('fas bell')
    })

    it('ignores a load that finishes after the icon became a definition', async () => {
      const load = deferred()
      setIconLoader(() => load.promise)
      const w = stubbed({ icon: 'gauge' })
      await w.setProps({ icon: faBell })

      load.resolve(faGauge)
      await flushPromises()
      expect(iconOf(w)).toBe('far bell')
    })

    it('falls back to the skull, with a warning, when the loader has no such icon', async () => {
      setIconLoader(async () => undefined)
      const w = stubbed({ icon: 'no-such-icon' })
      await flushPromises()
      expect(iconOf(w)).toBe('fas skull-crossbones')
      expect(iconWarnings()).toHaveLength(1)
      expect(iconWarnings()[0]).toContain('"no-such-icon"')
    })

    it('renders a brand icon through the pack loader', async () => {
      // Fixed in 2.0: the brands pack is loaded on demand.
      setIconLoader(createPackLoader({ brand: () => import('@fortawesome/free-brands-svg-icons') }))
      const w = real({ icon: 'github', set: 'brand' })
      await vi.waitFor(() => expect(w.find('svg').exists()).toBe(true))
      expect(w.get('svg').attributes('data-prefix')).toBe('fab')
      expect(w.get('svg').classes()).toContain('fa-github')
    })
  })

  describe('given an unregistered name and no loader', () => {
    it('renders the skull at once, and warns once per name', () => {
      expect(iconOf(stubbed({ icon: 'gauge' }))).toBe('fas skull-crossbones')
      stubbed({ icon: 'gauge' })
      stubbed({ icon: 'bell', set: 'regular' })
      expect(iconWarnings()).toHaveLength(2)
      expect(iconWarnings()[0]).toContain('solid icon named "gauge"')
    })

    it('renders nothing from the brands set', () => {
      expect(iconOf(stubbed({ icon: 'github', set: 'brand' }))).toBe('fas skull-crossbones')
    })
  })

  it('accepts only the documented sets', () => {
    const { validator } = TwIcon.props.set
    expect(['regular', 'solid', 'brand'].every(validator)).toBe(true)
    expect(validator('light')).toBe(false)
  })
})
