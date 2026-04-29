import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint2'
import { constants } from '@internal/cli'
import react from '@vitejs/plugin-react'

import docsLoader from './plugins/docs-loader/index.ts'
import docsWatcher from './plugins/docs-watcher/index.ts'

export default defineConfig({
  clearScreen: false,
  base: './',
  optimizeDeps: { include: ['@mink-ui/icons', '@mink-ui/shared'] },
  plugins: [
    react(),
    eslint({ cacheLocation: './node_modules/.cache/.eslintcache', emitErrorAsWarning: true }),
    docsLoader({
      isTargetInfo: meta => ['component', 'component-en', 'blog'].includes(meta.category),
      isTargetFile: filePath => /__(?:docs|blogs)__\/[\s\S]+\.md$/.test(filePath),
    }),
    docsWatcher({
      groups: {
        blog: {
          input: './src/pages/__blogs__/*.md',
          output: './src/routes/blogs.routes.tsx',
        },
        component: {
          input: '../../packages/core/src/**/__docs__/*.md',
          output: './src/routes/components.routes.tsx',
        },
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: constants.src },
      /** others */
      { find: '@mink-ui/core', replacement: constants.resolveCore('src') },
    ],
  },
})
