import type { Tokens, TokensList } from 'marked'

import fse from 'fs-extra'
import { marked } from 'marked'

import type makePlaceholder from '../utils/placeholder'

import groupTokens from '../utils/groups'
import { isCodeToken, isCssToken, isHeadToken, isJsxToken } from '../utils/is'
import { formatCssWrapName, formatInfoName } from './format-name'

function collect(tokens: TokensList) {
  const result: string[] = []

  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index]

    if (isCodeToken(token)) break

    result.push(token.raw)
  }

  return result.join('')
}

function formatDescription(tokens: TokensList): Record<string, string> {
  const entries = groupTokens(tokens, isHeadToken)
    .slice(1)
    .reduce((result, [heading, list]) => {
      result.push([heading.text, collect(list)])
      return result
    }, [] as [string, string][])

  return Object.fromEntries(entries)
}

function getJsxToken(tokens: TokensList) {
  return groupTokens(tokens, isJsxToken)
    .slice(1)
    .reduce<null | Tokens.Code>((result, [code]) => result || code, null)
}

function getCssToken(tokens: TokensList) {
  return groupTokens(tokens, isCssToken)
    .slice(1)
    .reduce<null | Tokens.Code>((result, [code]) => result || code, null)
}

export default function formatSource(filePath: string, holder: ReturnType<typeof makePlaceholder>) {
  const fileContent = fse.readFileSync(filePath, { encoding: 'utf8' })

  const tokens = marked.lexer(fileContent)

  const desc = formatDescription(tokens)

  const jsxToken = getJsxToken(tokens)

  const cssToken = getCssToken(tokens)

  let jsx = jsxToken?.text || holder.jsx

  const cssWrapName = formatCssWrapName(filePath)

  const infoName = formatInfoName(filePath)

  const css = `.${cssWrapName}{\n${cssToken?.text || holder.css}\n}`

  const rawText = jsxToken?.raw || holder.rawText

  jsx += `\nexport const ${infoName} = {
    desc: ${JSON.stringify(desc)},
    rawText: ${JSON.stringify(rawText)},
    cssWrapName: ${JSON.stringify(cssWrapName)}
  }\n`

  return { jsx, css }
}
