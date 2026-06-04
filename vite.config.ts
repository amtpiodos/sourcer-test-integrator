import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const baseUiEsm = resolve('./node_modules/@jobtarget/base-ui/dist/esm')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '/base-ui': baseUiEsm,
    },
  },
  optimizeDeps: {
    exclude: ['@jobtarget/base-ui'],
  },
})
