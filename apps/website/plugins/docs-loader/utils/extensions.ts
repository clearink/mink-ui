import type { TokenizerExtension } from 'marked'
import type { AddSourceFile, PluginStore } from '../interface.ts'

import parseAttrs from './attrs.ts'
import { formatFilePath, formatUniqueId } from './formatter.ts'
import { updateExamples, updateTables } from './virtual-module.ts'

function hiddenToken(type: string) {
  return {
    type,
    raw: '',
    text: '',
    imports: [],
    render: () => '',
  }
}

export function codeExampleExtension(
  _store: PluginStore,
  parentId: string,
  addSourceFile: AddSourceFile,
): TokenizerExtension {
  const re = /^\s*<code-example\s+([^>]+)\s*\/>/i

  const set = new Set<string>()

  const type = 'code-example'

  return {
    name: type,
    level: 'block',
    start(source) {
      return source.match(re)?.index
    },
    tokenizer(source) {
      const match = source.match(re)

      if (!match) return

      const { src, title, disabled } = parseAttrs(match[1])

      if (!src || set.has(src)) return hiddenToken(type)

      set.add(src)

      const filePath = formatFilePath(src, parentId)

      const referName = formatUniqueId('CodeExample', filePath, '')

      const infoName = formatUniqueId('MetaInfo', filePath, '')

      const cssName = formatUniqueId('CssFile', filePath, '')

      const tsxId = formatUniqueId(_store.prefix, referName, '.tsx')

      const tsId = formatUniqueId(_store.prefix, infoName, '.ts')

      const cssId = formatUniqueId(_store.prefix, cssName, '.scss')

      updateExamples(_store, filePath, cssId, 'css')
      updateExamples(_store, filePath, tsId, 'ts')
      updateExamples(_store, filePath, tsxId, 'tsx')

      addSourceFile(filePath, [tsxId, tsId, cssId])

      return {
        type,
        raw: match[0],
        text: match[0].trim(),
        imports: [
          `import ${referName} from '${tsxId}'`,
          `import ${infoName} from '${tsId}'`,
          `import '${cssId}'`,
        ],
        render: () => disabled ? '' : `<CodeExample {...${infoName}} title={${JSON.stringify(title)}} element={<${referName} />} />`,
      }
    },
  }
}

export function semanticDomExtension(
  _store: PluginStore,
  parentId: string,
  addSourceFile: AddSourceFile,
): TokenizerExtension {
  const re = /^\s*<semantic-dom\s+([^>]+)\s*\/>/i

  const set = new Set<string>()

  const type = 'semantic-dom'

  return {
    name: type,
    level: 'block',
    start(source) {
      return source.match(re)?.index
    },
    tokenizer(source) {
      const match = source.match(re)

      if (!match) return

      const { src, disabled } = parseAttrs(match[1])

      if (!src || set.has(src)) return hiddenToken(type)

      set.add(src)

      const filePath = formatFilePath(src, parentId)

      const referName = formatUniqueId('SemanticDom', filePath, '')

      const tsxId = formatUniqueId(_store.prefix, referName, '.tsx')

      updateExamples(_store, filePath, tsxId, 'tsx')

      addSourceFile(filePath, [tsxId])

      return {
        type,
        raw: match[0],
        text: match[0].trim(),
        imports: [`import ${referName} from '${tsxId}'`],
        render: () => disabled ? '' : `<SemanticDom element={<${referName} />} />`,
      }
    },
  }
}

export function propsTableExtension(
  _store: PluginStore,
  parentId: string,
  addSourceFile: AddSourceFile,
): TokenizerExtension {
  const re = /^\s*<props-table\s+([^>]+)\s*\/>/i

  const set = new Set<string>()

  const type = 'props-table'

  return {
    name: type,
    level: 'block',
    start(source) {
      return source.match(re)?.index
    },
    tokenizer(source) {
      const match = source.match(re)

      if (!match) return

      const { src, disabled } = parseAttrs(match[1])

      if (!src || set.has(src)) return hiddenToken(type)

      set.add(src)

      const filePath = formatFilePath(src, parentId)

      const referName = formatUniqueId('PropsTable', filePath, '')

      const tsId = formatUniqueId(_store.prefix, referName, '.ts')

      updateTables(_store, filePath, tsId)

      addSourceFile(filePath, [tsId])

      return {
        type,
        raw: match[0],
        text: match[0].trim(),
        imports: [`import ${referName} from '${tsId}'`],
        render: () => disabled ? '' : `<PropsTable columns={${referName}} />`,
      }
    },
  }
}
