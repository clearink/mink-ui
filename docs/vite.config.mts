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
      { find: /^@mink-ui\/core(\/(esm|lib))?/, replacement: constants.resolveCore('src') },
      // core 中使用icon是引入打包后的产物, 在此需要额外处理
      { find: /^@mink-ui\/icons(\/(esm|lib))?/, replacement: constants.resolveIcons('src') },
      { find: /^@mink-ui\/emator(\/(esm|lib))?/, replacement: constants.resolveEmator('src') },
    ],
  },
})
