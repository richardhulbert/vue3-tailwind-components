import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },


    build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.js'),
      name: 'Vue3TWComp',
      fileName: (format) => `vue3-tailwind-components.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
      port: 5173,
      hmr: {
          host: 'localhost',
          protocol: 'ws',
          port: 5173,
      },
  }
})
