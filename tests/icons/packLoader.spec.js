import { describe, it, expect, vi } from 'vitest'
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as brands from '@fortawesome/free-brands-svg-icons'
import { createPackLoader } from '@/icons'

const importers = () => ({
  solid: vi.fn(async () => solid),
  brand: vi.fn(async () => brands),
})

describe('createPackLoader', () => {
  it('finds an icon by its camelCase export', async () => {
    const load = createPackLoader(importers())
    expect(await load('solid', 'circle-xmark')).toBe(solid.faCircleXmark)
    expect(await load('solid', 'arrow-down-1-9')).toBe(solid.faArrowDown19)
    expect(await load('brand', 'github')).toBe(brands.faGithub)
  })

  it('falls back to the pack\'s names and aliases', async () => {
    // A pack whose exports don't follow the faCamelCase pattern.
    const load = createPackLoader({ solid: async () => ({ prefix: 'fas', anything: solid.faXmark }) })
    expect(await load('solid', 'xmark')).toBe(solid.faXmark)
    expect(await load('solid', 'times')).toBe(solid.faXmark)
  })

  it('answers undefined for an unknown name or an unconfigured set', async () => {
    const load = createPackLoader(importers())
    expect(await load('solid', 'no-such-icon')).toBeUndefined()
    expect(await load('regular', 'bell')).toBeUndefined()
  })

  it('imports each pack at most once, and only when its set is asked for', async () => {
    const packs = importers()
    const load = createPackLoader(packs)
    await Promise.all([load('solid', 'gauge'), load('solid', 'user'), load('solid', 'nope')])
    await load('solid', 'times')
    expect(packs.solid).toHaveBeenCalledTimes(1)
    expect(packs.brand).not.toHaveBeenCalled()
  })

  it('unwraps a CommonJS module', async () => {
    const load = createPackLoader({ solid: async () => ({ default: solid }) })
    expect(await load('solid', 'gauge')).toBe(solid.faGauge)
  })

  it('imports a pack again after a failed import', async () => {
    const importer = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(solid)
    const load = createPackLoader({ solid: importer })
    await expect(load('solid', 'gauge')).rejects.toThrow('offline')
    expect(await load('solid', 'gauge')).toBe(solid.faGauge)
  })
})
