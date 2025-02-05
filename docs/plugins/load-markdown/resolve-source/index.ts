import fse from 'fs-extra'
import matter from 'gray-matter'
import { marked } from 'marked'

import type { CustomPluginStore, FormattedSection } from '../interface'

import { generateSourceCode } from '../utils/generate'
import groupTokens from '../utils/groups'
import { isHeadToken } from '../utils/is'
import makePlaceholder from '../utils/placeholder'
import parseCodeExample from './code-example'
import formatSource from './format-source'
import parseSemanticDom from './semantic-dom'

export async function resolveEntryFile(
  _store: CustomPluginStore,
  moduleId: string,
  addWatchFile: (id: string) => void,
) {
  const { entries, categories } = _store

  const filePath = entries.get(moduleId)!

  const isExists = await fse.exists(filePath)

  if (!isExists) return makePlaceholder(filePath).jsx

  addWatchFile(filePath)

  const fileContent = await fse.readFile(filePath, { encoding: 'utf8' })

  const { content, data: meta } = matter(fileContent)

  if (!categories.includes(meta.category)) return content

  const groups = groupTokens(marked.lexer(content), isHeadToken)

  const sections = groups.reduce((result, [heading, section]) => {
    const title = heading.text.trim()

    const source = section.map(t => t.raw).join('').trim()

    if (title.toLowerCase() === '代码演示'.toLowerCase()) {
      result.push(parseCodeExample(_store, section, filePath, moduleId))
    }
    else if (title.toLowerCase() === 'Semantic DOM'.toLowerCase()) {
      result.push(parseSemanticDom(_store, section, filePath, moduleId))
    }
    else if (source) {
      result.push({ title, code: `<MarkdownBlock rawText={${JSON.stringify(source)}} />` })
    }

    return result
  }, [] as FormattedSection[])

  return generateSourceCode(sections)
}

export async function resolveExampleFile(
  _store: CustomPluginStore,
  moduleId: string,
  addWatchFile: (id: string) => void,
) {
  const filePath = _store.modules.get(moduleId)!

  const isExists = await fse.exists(filePath)

  const isCssFile = /\.(scss|sass)?$/.test(moduleId)

  const holder = makePlaceholder(filePath)

  if (!isExists) return isCssFile ? holder.css : holder.jsx

  addWatchFile(filePath)

  const result = formatSource(filePath, holder)

  return isCssFile ? result.css : result.jsx
}
