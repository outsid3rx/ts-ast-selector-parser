import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()] as PluginOption[],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    commonjsOptions: {
      esmExternals: true,
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1337/',
        changeOrigin: true,
      },
    },
  },
})
