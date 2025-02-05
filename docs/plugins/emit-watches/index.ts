import type { Plugin } from 'vite'

import { constants } from '@mink-ui/scripts'
import fse from 'fs-extra'
import prettier from 'prettier'

import type { CustomPluginOptions } from './interface'

import formatGroupItems from './utils/format-group-items'
import generateSourceText from './utils/generate-source-text'
import initWatchers from './utils/init-watchers'

export default function emitWatches(options?: CustomPluginOptions): Plugin {
  let cleanupWatchers: (() => void) | undefined

  return {
    name: 'vite-plugin-emit-watches',
    enforce: 'pre',
    buildStart() {
      const { groups, output } = options || {}

      if (!output || !groups) return

      const handler = async () => {
        try {
          const items = formatGroupItems(groups)

          const sourceText = generateSourceText(items)

          const sourceCode = await prettier.format(sourceText, {
            parser: 'typescript',
            singleQuote: true,
            semi: false,
            printWidth: 120,
            arrowParens: 'avoid',
          })

          const emitPath = constants.resolveCwd(output)

          await fse.ensureFile(emitPath)

          const oldContent = await fse.readFile(emitPath, { encoding: 'utf8' })

          if (oldContent !== sourceCode) {
            await fse.writeFile(emitPath, sourceCode, { encoding: 'utf8' })
          }
        }
        catch (error) {
          this.warn(error.message)
        }
      }

      cleanupWatchers = initWatchers(groups, handler)
    },
    buildEnd() {
      cleanupWatchers && cleanupWatchers()
    },

  }
}
