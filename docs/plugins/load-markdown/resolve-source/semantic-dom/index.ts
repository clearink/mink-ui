import type { TokensList } from 'marked'

import type { CustomPluginStore, SemanticItem } from '../../interface'

import { updateModules, updateWatches } from '../../utils/virtual-module'
import formatAttrs from '../format-attrs'
import { formatCssId, formatJsxId } from '../format-id'
import { formatExampleName, formatInfoName } from '../format-name'
import { formatFilePath } from '../format-path'

export default function parseSemanticDom(
  _store: CustomPluginStore,
  tokens: TokensList,
  parentPath: string,
  parentId: string,
) {
  const set = new Set<string>()

  const semantics = tokens.reduce((result, token) => {
    Array
      .from(token.raw.trim().matchAll(/^<semantic([^]*?)\/>$/gi))
      .forEach((matched) => {
        const { src, disabled } = formatAttrs(matched[1])

        if (!src || set.has(src)) return

        set.add(src)

        const filePath = formatFilePath(src, parentPath)

        const exampleName = formatExampleName(filePath)

        const infoName = formatInfoName(filePath)

        const jsxId = formatJsxId(_store, filePath)

        const cssId = formatCssId(_store, filePath)

        updateModules(_store, jsxId, filePath)

        updateModules(_store, cssId, filePath)

        updateWatches(_store, filePath, [cssId, jsxId, parentId])

        result.push({
          disabled,
          filePath,
          exampleName,
          infoName,
          jsxId,
          cssId,
        })
      })
    return result
  }, [] as SemanticItem[])

  return {
    title: 'Semantic DOM',
    imports: semantics
      .map(item => `import ${item.exampleName}, { ${item.infoName} } from '${item.jsxId}'\nimport '${item.cssId}'`)
      .join('\n'),
    code: semantics
      .map(item => `<SemanticBlock>
          <div className={${item.infoName}.cssWrapName}>
            <${item.exampleName} />
          </div>
        </SemanticBlock>`)
      .join('\n'),
  }
}
