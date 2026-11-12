import { afterEach } from 'vitest'
import { config, enableAutoUnmount } from '@vue/test-utils'
import { faCheck, faPen, faStar, faSun, faUser } from '@fortawesome/free-solid-svg-icons'
import { registerIcons } from '@/icons'

// Unmount everything after each test, so timers, listeners and teleports
// from one test can't leak into the next.
enableAutoUnmount(afterEach)

// The library registers only the icons its components use. These are the
// extra ones the specs pass in, as a consumer would register theirs.
registerIcons(faCheck, faPen, faStar, faSun, faUser)

// Font Awesome renders full SVG path data, which buries the class contract
// in noise. Every test sees this stub instead, which records only the icon
// definition it was given, as `prefix name`: `fas caret-down`. TwIcon's own
// spec opts back into the real component.
config.global.stubs = {
  FontAwesomeIcon: {
    name: 'FontAwesomeIcon',
    props: ['icon'],
    template: '<i class="fa-stub" :data-icon="`${icon.prefix} ${icon.iconName}`"></i>',
  },
}
