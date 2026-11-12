import { it, expect } from 'vitest'
import * as library from '@/components'

// The package's public surface. Adding an export is fine; removing or renaming
// one breaks consumers, so a change here should be deliberate.
it('exports the public components', () => {
  expect(Object.keys(library).sort()).toEqual([
    'TwBadge',
    'TwButton',
    'TwButtonGroup',
    'TwCollapse',
    'TwDropdown',
    'TwIcon',
    'TwInput',
    'TwModal',
    'TwNotification',
    'TwOption',
    'TwPaginator',
    'TwRange',
    'TwRollout',
    'TwSelect',
    'TwSwitch',
    'TwTable',
    'TwTextarea',
    'tone',
    'toneStyles',
    'useTone',
  ])
})

it('exports the icon registry from vue3-tailwind-components/icons', async () => {
  const icons = await import('@/icons')
  expect(Object.keys(icons).sort()).toEqual([
    'createPackLoader',
    'isIconDefinition',
    'loadIcon',
    'registerIcons',
    'resolveIcon',
    'setIconLoader',
  ])
})

it('registers every solid and regular icon from vue3-tailwind-components/icons/all', async () => {
  const { resolveIcon } = await import('@/icons')
  expect(resolveIcon('solid', 'gauge')).toBeUndefined()
  await import('@/icons/all')
  expect(resolveIcon('solid', 'gauge')?.iconName).toBe('gauge')
  expect(resolveIcon('regular', 'bell')?.prefix).toBe('far')
  expect(resolveIcon('brand', 'github')).toBeUndefined()
})
