import { afterEach } from 'vitest'
import { config, enableAutoUnmount } from '@vue/test-utils'

// Unmount everything after each test, so timers, listeners and teleports
// from one test can't leak into the next.
enableAutoUnmount(afterEach)

// Font Awesome renders full SVG path data, which buries the class contract
// in noise. Every test sees this stub instead, which records only the icon
// requested. TwIcon's own spec opts back into the real component.
config.global.stubs = {
  FontAwesomeIcon: {
    name: 'FontAwesomeIcon',
    props: ['icon'],
    template: '<i class="fa-stub" :data-icon="icon"></i>',
  },
}
