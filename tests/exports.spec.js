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
