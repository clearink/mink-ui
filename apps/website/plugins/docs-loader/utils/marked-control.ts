import type { TokenizerExtension } from 'marked'
import type { AddSourceFile, PluginStore } from '../interface.ts'

import { Marked } from 'marked'

import parseAttrs from './attrs.ts'
import { formatFilePath, formatUniqueId } from './formatter.ts'
import { updateExamples, updateTables } from './virtual-module.ts'

export class MarkedControl {
  private _marked: Marked

  private _store: PluginStore | undefined
  private _parentId: string | undefined
  private _addSourceFile: AddSourceFile | undefined

  private _seenCodeExamples = new Set<string>()
  private _seenSemanticDoms = new Set<string>()
  private _seenPropsTables = new Set<string>()

  public constructor() {
    this._marked = new Marked({
      extensions: [
        this.codeExampleExtension(),
        this.semanticDomExtension(),
        this.propsTableExtension(),
      ],
    })
  }

  private emptyToken = (type: string) => {
    return {
      type,
      raw: '',
      text: '',
      imports: [],
      render: () => '',
    }
  }

  private codeExampleExtension = (): TokenizerExtension => {
    const re = /^\s*<code-example\s+([^>]+)\s*\/>/i

    const type = 'code-example'

    return {
      name: type,
      level: 'block',
      start: source => source.match(re)?.index,
      tokenizer: (source) => {
        const match = source.match(re)

        if (!match) return

        const { src, title, disabled } = parseAttrs(match[1])

        if (!src || this._seenCodeExamples.has(src)) return this.emptyToken(type)

        this._seenCodeExamples.add(src)

        const filePath = formatFilePath(src, this._parentId)

        const referName = formatUniqueId('CodeExample', filePath, '')

        const infoName = formatUniqueId('MetaInfo', filePath, '')

        const cssName = formatUniqueId('CssFile', filePath, '')

        const tsxId = formatUniqueId(this._store!.prefix, referName, '.tsx')

        const tsId = formatUniqueId(this._store!.prefix, infoName, '.ts')

        const cssId = formatUniqueId(this._store!.prefix, cssName, '.scss')

        updateExamples(this._store!, filePath, cssId, 'css')
        updateExamples(this._store!, filePath, tsId, 'ts')
        updateExamples(this._store!, filePath, tsxId, 'tsx')

        this._addSourceFile!(filePath, [tsxId, tsId, cssId])

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

  private semanticDomExtension = (): TokenizerExtension => {
    const re = /^\s*<semantic-dom\s+([^>]+)\s*\/>/i

    const type = 'semantic-dom'

    return {
      name: type,
      level: 'block',
      start: source => source.match(re)?.index,
      tokenizer: (source) => {
        const match = source.match(re)

        if (!match) return

        const { src, disabled } = parseAttrs(match[1])

        if (!src || this._seenSemanticDoms.has(src)) return this.emptyToken(type)

        this._seenSemanticDoms.add(src)

        const filePath = formatFilePath(src, this._parentId)

        const referName = formatUniqueId('SemanticDom', filePath, '')

        const tsxId = formatUniqueId(this._store!.prefix, referName, '.tsx')

        updateExamples(this._store!, filePath, tsxId, 'tsx')

        this._addSourceFile!(filePath, [tsxId])

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

  private propsTableExtension = (): TokenizerExtension => {
    const re = /^\s*<props-table\s+([^>]+)\s*\/>/i

    const type = 'props-table'

    return {
      name: type,
      level: 'block',
      start: source => source.match(re)?.index,
      tokenizer: (source) => {
        const match = source.match(re)

        if (!match) return

        const { src, disabled } = parseAttrs(match[1])

        if (!src || this._seenPropsTables.has(src)) return this.emptyToken(type)

        this._seenPropsTables.add(src)

        const filePath = formatFilePath(src, this._parentId)

        const referName = formatUniqueId('PropsTable', filePath, '')

        const tsId = formatUniqueId(this._store!.prefix, referName, '.ts')

        updateTables(this._store!, filePath, tsId)

        this._addSourceFile!(filePath, [tsId])

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

  public lexer = (content: string) => {
    return this._marked.lexer(content)
  }

  public init = (_store: PluginStore, parentId: string, addSourceFile: AddSourceFile) => {
    this._store = _store
    this._parentId = parentId
    this._addSourceFile = addSourceFile

    this._seenCodeExamples.clear()
    this._seenSemanticDoms.clear()
    this._seenPropsTables.clear()
  }

  /**
   * @description 销毁
   */
  public destroy = () => {
    this._store = undefined
    this._parentId = ''
    this._addSourceFile = undefined

    this._seenCodeExamples.clear()
    this._seenSemanticDoms.clear()
    this._seenPropsTables.clear()
  }
}
