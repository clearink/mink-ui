import type { TokensList } from 'marked'
import type { AddSourceFile, ExampleExtname, PluginStore, SourceSection } from '../interface.ts'
import type { generateExampleHolder } from './generator.ts'

import fse from 'fs-extra'
import { Marked, marked } from 'marked'
import { constants } from '@internal/cli'

import { codeExampleExtension, propsTableExtension, semanticDomExtension } from './extensions.ts'
import { formatCssName } from './formatter.ts'
import { generateEntrySource } from './generator.ts'
import groupTokens from './groups.ts'
import { renderCodeExample, renderMarkdown, renderPropsTable, renderSemanticDom } from './renderers.ts'
import { isCodeToken, isCssToken, isHeadToken, isJsxToken } from './validator.ts'

function collectInfo(tokens: TokensList) {
  const result: string[] = []

  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index]

    if (isCodeToken(token)) break

    result.push(token.raw)
  }

  return result.join('')
}

function getExampleInfo(tokens: TokensList) {
  const entries = groupTokens(tokens, isHeadToken)
    .slice(1)
    .reduce((result, [heading, list]) => {
      result.push([heading.text, collectInfo(list)])
      return result
    }, [] as [string, string][])

  return Object.fromEntries(entries)
}

function getTargetToken<T extends TokensList[number]>(
  tokens: TokensList,
  validator: Parameters<typeof groupTokens<T>>[1],
) {
  return groupTokens(tokens, validator)
    .slice(1)
    .find(([token]) => token)?.[0]
}

export async function parseExampleFile(
  filePath: string,
  holder: ReturnType<typeof generateExampleHolder>,
  extname: ExampleExtname,
) {
  const content = await fse.readFile(filePath, 'utf-8')

  const tokens = marked.lexer(content)

  const metaInfo = getExampleInfo(tokens)

  const jsxToken = getTargetToken(tokens, isJsxToken)
  const cssToken = getTargetToken(tokens, isCssToken)

  const cssName = formatCssName(filePath)

  const rawText = jsxToken?.raw || holder.raw

  const css = `.${cssName}{\n${cssToken?.text || holder.text}\n}`

  const tsx = jsxToken?.text || holder.raw

  const ts = `
export default {
  metaInfo: ${JSON.stringify(metaInfo)},
  rawText: ${JSON.stringify(rawText)},
  cssName: ${JSON.stringify(cssName)},
  relativePath: ${JSON.stringify(constants.relativeRoot(filePath))}
}
`
  return extname === 'ts' ? ts : extname === 'tsx' ? tsx : css
}

export async function parseTableFile(filePath: string) {
  const content = await fse.readFile(filePath, 'utf-8')

  return `export default ${content}`
}

export function parseEntryFile(
  _store: PluginStore,
  content: string,
  filePath: string,
  addSourceFile: AddSourceFile,
) {
  const marked = new Marked({
    extensions: [
      codeExampleExtension(_store, filePath, addSourceFile),
      semanticDomExtension(_store, filePath, addSourceFile),
      propsTableExtension(_store, filePath, addSourceFile),
    ],
  })

  const sections = marked
    .lexer(content)
    .reduce((result, token) => {
      if (token.type === 'code-example') {
        result.push(renderCodeExample(token))
      }
      else if (token.type === 'semantic-dom') {
        result.push(renderSemanticDom(token))
      }
      else if (token.type === 'props-table') {
        result.push(renderPropsTable(token))
      }
      else if (token.raw.trim()) {
        result.push(renderMarkdown(token))
      }
      return result
    }, [] as SourceSection[])

  return generateEntrySource(sections)
}
