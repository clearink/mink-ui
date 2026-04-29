import type { Plugin } from 'vite'
import type { CustomPluginOptions } from './interface.ts'

import { posix } from 'node:path'

import glob from 'fast-glob'
import fse from 'fs-extra'
import matter from 'gray-matter'
import prettier from 'prettier'
import slash from 'slash'
import { constants } from '@internal/cli'

import { renderBlogSource, renderComponentSource } from './utils/renderer.ts'
import startupWatcher from './utils/startup.ts'

export default function docsWatcher(options: CustomPluginOptions): Plugin {
  let cleanupWatcher: (() => void) | undefined

  return {
    name: 'vite:mink-ui-docs-watcher',
    enforce: 'pre',
    buildStart() {
      const handler = async () => {
        try {
          const promises = Object.entries(options.groups)
            .map(async ([type, { input, output }]) => {
              const filePaths = await glob.async(input, { absolute: true })

              const emitPath = constants.resolveCwd(output)

              const promises = filePaths.map(async (filePath) => {
                const fileContent = await fse.readFile(filePath, 'utf-8')

                const { data: meta } = matter(fileContent)

                const relative = posix.relative(posix.dirname(emitPath), filePath)

                return { meta, path: slash(relative) }
              })

              const results = await Promise.all(promises)

              const sourceText = type === 'blog'
                ? renderBlogSource(results)
                : renderComponentSource(results)

              const sourceCode = await prettier.format(sourceText, {
                parser: 'typescript',
                singleQuote: true,
                semi: false,
                printWidth: 120,
                arrowParens: 'avoid',
              })

              await fse.ensureFile(emitPath)

              const oldContent = await fse.readFile(emitPath, 'utf-8')

              if (oldContent !== sourceCode) {
                await fse.writeFile(emitPath, sourceCode, 'utf-8')
              }
            })

          await Promise.all(promises)
        }
        catch (error: any) {
          this.warn(error.message)
        }
      }

      cleanupWatcher = startupWatcher(options.groups, handler)
    },
    buildEnd() {
      cleanupWatcher && cleanupWatcher()
    },

  }
}
