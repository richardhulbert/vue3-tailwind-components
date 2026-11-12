import { describe, it, expect, vi, beforeEach } from 'vitest'
import { faXmark, faCircleXmark as faCircleXmarkSolid, faGauge } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { registerIcons, setIconLoader, resolveIcon, loadIcon, isIconDefinition } from '@/icons'
import { resetIconRegistry } from '@/components/icons/registry.js'

beforeEach(() => {
  resetIconRegistry()
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  return () => warn.mockRestore()
})

describe('registerIcons', () => {
  it('indexes a definition by name and by every string alias', () => {
    registerIcons(faXmark)
    expect(resolveIcon('solid', 'xmark')).toBe(faXmark)
    for (const alias of ['times', 'close', 'multiply', 'remove']) {
      expect(resolveIcon('solid', alias)).toBe(faXmark)
    }
  })

  it('keys by prefix, so the same name in two sets stays apart', () => {
    registerIcons(faCircleXmarkSolid)
    expect(resolveIcon('solid', 'circle-xmark')).toBe(faCircleXmarkSolid)
    // Registered by the library from its own per-icon module: same data, not the same object.
    expect(resolveIcon('regular', 'circle-xmark')).toEqual(faCircleXmark)
    expect(resolveIcon('brand', 'circle-xmark')).toBeUndefined()
  })

  it('takes several definitions, arrays of them, and whole packs', () => {
    registerIcons([faXmark], { faGauge })
    expect(resolveIcon('solid', 'xmark')).toBe(faXmark)
    expect(resolveIcon('solid', 'gauge')).toBe(faGauge)
  })

  it('skips anything that is not a definition', () => {
    registerIcons(null, 'gauge', 42, { prefix: 'fas' })
    expect(resolveIcon('solid', 'gauge')).toBeUndefined()
  })
})

describe('isIconDefinition', () => {
  it('recognises a definition and nothing else', () => {
    expect(isIconDefinition(faGauge)).toBe(true)
    expect(isIconDefinition('gauge')).toBe(false)
    expect(isIconDefinition({ prefix: 'fas', iconName: 'gauge' })).toBe(false)
    expect(isIconDefinition(null)).toBe(false)
  })
})

describe('loadIcon', () => {
  it('answers from the registry without the loader', async () => {
    const loader = vi.fn()
    setIconLoader(loader)
    registerIcons(faGauge)
    expect(await loadIcon('solid', 'gauge')).toBe(faGauge)
    expect(loader).not.toHaveBeenCalled()
  })

  it('answers undefined with no loader', async () => {
    expect(await loadIcon('solid', 'gauge')).toBeUndefined()
  })

  it('calls the loader once per name, however many ask at once', async () => {
    const loader = vi.fn(async () => faGauge)
    setIconLoader(loader)
    const answers = await Promise.all([loadIcon('solid', 'gauge'), loadIcon('solid', 'gauge')])
    expect(answers).toEqual([faGauge, faGauge])
    expect(await loadIcon('solid', 'gauge')).toBe(faGauge)
    expect(loader).toHaveBeenCalledTimes(1)
  })

  it('registers what it loads, under the name asked for and the real one', async () => {
    setIconLoader(async () => faXmark)
    await loadIcon('solid', 'times')
    expect(resolveIcon('solid', 'times')).toBe(faXmark)
    expect(resolveIcon('solid', 'xmark')).toBe(faXmark)
  })

  it('remembers a name the loader does not have', async () => {
    const loader = vi.fn(async () => undefined)
    setIconLoader(loader)
    expect(await loadIcon('solid', 'nope')).toBeUndefined()
    expect(await loadIcon('solid', 'nope')).toBeUndefined()
    expect(loader).toHaveBeenCalledTimes(1)
  })

  it('tries again after a failed load', async () => {
    const loader = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(faGauge)
    setIconLoader(loader)
    expect(await loadIcon('solid', 'gauge')).toBeUndefined()
    expect(await loadIcon('solid', 'gauge')).toBe(faGauge)
    expect(loader).toHaveBeenCalledTimes(2)
  })

  it('ignores an answer that is not a definition', async () => {
    setIconLoader(async () => ({ iconName: 'gauge' }))
    expect(await loadIcon('solid', 'gauge')).toBeUndefined()
  })

  it('asks a newly installed loader again', async () => {
    setIconLoader(async () => undefined)
    await loadIcon('solid', 'gauge')
    setIconLoader(async () => faGauge)
    expect(await loadIcon('solid', 'gauge')).toBe(faGauge)
  })
})
