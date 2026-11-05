import { it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

// Components take colour from their tone and fixed slot classes, which
// Tailwind and UnoCSS can generate without a safelist. A class name built
// from a colour at runtime ('bg-' + color + '-500') would quietly bring the
// safelist back, so none may exist.
const dir = join(process.cwd(), 'src/components/')
const files = readdirSync(dir, { recursive: true }).filter((f) => f.endsWith('.vue')).map((f) => join(dir, f))

const PATTERNS = [
  /['"`][^'"`]*\b(bg|text|border|divide|accent|placeholder|ring|from|to|fill|stroke)-['"`]\s*\+/, // 'bg-' + color
  /\b(bg|text|border|divide|accent|placeholder|ring|fill|stroke)-\$\{/, // `bg-${color}`
  /\b(bg|text|border|divide|accent)-(primary|secondary|warning|success|danger|info|gray|slate)-\d{2,3}\b/, // a hard-coded palette class
]

it.each(files.map((f) => [f.slice(dir.length), f]))('%s builds no colour classes', (_, file) => {
  const source = readFileSync(file, 'utf8')
  const hits = PATTERNS.flatMap((re) => source.split('\n').filter((line) => re.test(line)))
  expect(hits).toEqual([])
})
