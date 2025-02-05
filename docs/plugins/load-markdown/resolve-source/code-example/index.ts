import type { TokensList } from 'marked'

import type { CustomPluginStore, ExampleItem } from '../../interface'

import { updateModules, updateWatches } from '../../utils/virtual-module'
import formatAttrs from '../format-attrs'
import { formatCssId, formatJsxId } from '../format-id'
import { formatExampleName, formatInfoName } from '../format-name'
import { formatFilePath } from '../format-path'

export default function parseCodeExample(
  _store: CustomPluginStore,
  tokens: TokensList,
  parentPath: string,
  parentId: string,
) {
  const set = new Set<string>()

  const examples = tokens.reduce((result, token) => {
    Array
      .from(token.raw.trim().matchAll(/^<example([^]*?)\/>$/gi))
      .forEach((matched) => {
        const { src, title, disabled } = formatAttrs(matched[1])

        if (!src || set.has(src)) return

        set.add(src)

        const filePath = formatFilePath(src, parentPath)

        const exampleName = formatExampleName(filePath)

        const infoName = formatInfoName(filePath)

        const jsxId = formatJsxId(_store, filePath)

        const cssId = formatCssId(_store, filePath)

        updateModules(_store, jsxId, filePath)

        updateModules(_store, cssId, filePath)

        updateWatches(_store, filePath, [jsxId, cssId, parentId])

        result.push({
          title,
          disabled,
          filePath,
          exampleName,
          infoName,
          jsxId,
          cssId,
        })
      })
    return result
  }, [] as ExampleItem[])

  return {
    title: '代码演示',
    imports: examples
      .map(item => `import ${item.exampleName}, { ${item.infoName} } from '${item.jsxId}'\nimport '${item.cssId}'`)
      .join('\n'),
    code: `<CodeBlockList items={[
      ${examples.map(item => `{
          desc: ${item.infoName}.desc,
          disabled: ${JSON.stringify(!!item.disabled)},
          element: <div className={${item.infoName}.cssWrapName}><${item.exampleName} /></div>,
          rawText: ${item.infoName}.rawText,
          title: ${JSON.stringify(item.title)},
        }`).join(',\n')}
    ]} />`,
  }
}
