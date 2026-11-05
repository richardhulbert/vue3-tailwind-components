import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

// Reuses the library's Vite config (the Vue plugin and the `@` alias) so
// components resolve in tests exactly as they do in the build.
export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.spec.js'],
    setupFiles: ['tests/setup.js'],
  },
}))
