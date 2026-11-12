// @vitest-environment node
import { it, expect, beforeAll, afterAll } from 'vitest'
import { build } from 'vite'
import { mkdtempSync, readdirSync, readFileSync, statSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

// Builds the library into a scratch directory and checks what a consumer
// would install: Font Awesome stays outside the bundle, and the bundle stays
// small. Before 2.0 every free solid and regular icon was compiled in (1.25 MB).

const root = resolve(__dirname, '..')
const ES_BUDGET = 200 * 1024
let outDir
let files

beforeAll(async () => {
  outDir = mkdtempSync(join(tmpdir(), 'vt-build-'))
  await build({ root, configFile: resolve(root, 'vite.config.js'), logLevel: 'silent', build: { outDir, emptyOutDir: true } })
  files = Object.fromEntries(readdirSync(outDir).map((f) => [f, readFileSync(join(outDir, f), 'utf8')]))
}, 60_000)

afterAll(() => outDir && rmSync(outDir, { recursive: true, force: true }))

it('builds a file for every entry in package.json exports', () => {
  const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
  const targets = Object.values(pkg.exports)
    .flatMap((target) => (typeof target === 'string' ? [target] : Object.values(target)))
    .filter((target) => target.startsWith('./dist/'))
  expect(targets.length).toBeGreaterThan(0)
  for (const target of [...targets, pkg.main, pkg.module]) {
    expect(Object.keys(files), target).toContain(target.replace('./dist/', ''))
  }
})

it('compiles no Font Awesome code or icon data into the bundle', () => {
  for (const [name, code] of Object.entries(files)) {
    // An icon definition carries its unicode and SVG path; faGauge's are these.
    expect(code, name).not.toContain('f624')
    expect(code, name).not.toMatch(/iconName\s*:\s*["']/)
    // svg-core's own code, which would mean it was inlined.
    expect(code, name).not.toContain('svg-inline--fa')
  }
})

it('imports only the internal icons, by name, from the external packs', () => {
  const imported = new Set()
  for (const code of Object.values(files)) {
    for (const [, names] of code.matchAll(/import\s*\{([^}]*)\}\s*from\s*["']@fortawesome\/free-[\w-]+["']/g)) {
      for (const name of names.split(',')) imported.add(name.trim().split(/\s+as\s+/)[0])
    }
  }
  expect([...imported].sort()).toEqual([
    'faCaretDown', 'faChevronDown', 'faCircleInfo', 'faCircleXmark', 'faSkullCrossbones',
    // icons/all, which registers the packs on purpose.
    'far', 'fas',
  ])
})

it(`keeps the ES build under ${ES_BUDGET / 1024} kB`, () => {
  const size = Object.keys(files)
    .filter((f) => f.endsWith('.es.js'))
    .reduce((total, f) => total + statSync(join(outDir, f)).size, 0)
  expect(size).toBeLessThan(ES_BUDGET)
})
