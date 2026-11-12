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
      // Three entries share one icon registry, so each format is split into
      // chunks rather than bundled per entry. UMD can't do that; CommonJS can.
      entry: {
        'vue3-tailwind-components': path.resolve(__dirname, 'src/components/index.js'),
        icons: path.resolve(__dirname, 'src/icons/index.js'),
        'icons-all': path.resolve(__dirname, 'src/icons/all.js'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      // Vue and Font Awesome come from the consumer. Importing single icons
      // from an external pack lets the consumer's bundler drop the rest.
      external: ['vue', /^@fortawesome\//],
      output: {
        chunkFileNames: '[name]-[hash].[format].js',
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
