import { constants } from '@mink-ui/scripts'
import react from '@vitejs/plugin-react'
// import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint2'

import emitWatches from './plugins/emit-watches'
import loadMarkdown from './plugins/load-markdown'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  optimizeDeps: {
    include: ['@mink-ui/icons'],
  },
  plugins: [
    react(),
    eslint({
      cacheLocation: './node_modules/.cache/.eslintcache',
      emitErrorAsWarning: true,
    }),
    // visualizer({ gzipSize: true, brotliSize: true, open: true }),
    loadMarkdown(),
    emitWatches({
      groups: ['./src/pages/**/*.md', '../packages/core/src/**/*.md'],
      output: './src/routes/routes.config.tsx',
    }),
  ],
  resolve: {
    alias: [
      { find: '@shared', replacement: constants.resolveSrc('_shared') },
      { find: '@features', replacement: constants.resolveSrc('features') },
      { find: '@hooks', replacement: constants.resolveSrc('hooks') },
      { find: '@libs', replacement: constants.resolveSrc('libs') },
      { find: '@pages', replacement: constants.resolveSrc('pages') },
      { find: '@routes', replacement: constants.resolveSrc('routes') },

      /** others */
      { find: '@mink-ui/core', replacement: constants.resolveCore('src') },
      { find: '@mink-ui/icons', replacement: constants.resolveIcons('src') },
      { find: '@mink-ui/emator', replacement: constants.resolveEmator('src') },
      { find: '@mink-ui/shared', replacement: constants.resolveShared('src') },
    ],
  },
})
