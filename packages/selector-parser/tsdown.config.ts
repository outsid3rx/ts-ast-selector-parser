import { defineConfig } from 'tsdown'

export default defineConfig({
  external: ['typescript'],
  entry: './src/index.ts',
  format: ['cjs', 'esm'],
  platform: 'browser',
  outDir: './dist/',
  exports: true,
  clean: true,
  dts: true,
})