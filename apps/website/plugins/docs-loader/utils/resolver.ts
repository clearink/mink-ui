import type { PluginStore } from '../interface.ts'

import fse from 'fs-extra'
import matter from 'gray-matter'

import { generateEntryHolder, generateExampleHolder, generateTableHolder } from './generator.ts'
import { parseEntryFile, parseExampleFile, parseTableFile } from './parser.ts'

export async function resolveEntryFile(
  _store: PluginStore,
  moduleId: string,
  addWatchFile: (file: string) => void,
) {
  const { entries } = _store

  const { filePath, deps } = entries.get(moduleId)!

  // 清空所有依赖项
  deps.clear()

  deps.set(filePath, { isExists: true, files: new Set([moduleId]) })

  addWatchFile(filePath)

  const fileContent = await fse.readFile(filePath, 'utf-8')

  const { data: meta, content } = matter(fileContent)

  if (!_store.isTargetInfo(meta)) return generateEntryHolder()

  const sources = new Map<string, string[]>()

  const addSourceFile = (source: string, ids: string[]) => {
    sources.set(source, ids)
  }

  const result = parseEntryFile(_store, content, filePath, addSourceFile)

  await Promise.all(Array.from(sources).map(async ([source, ids]) => {
    const isExists = await fse.exists(source)

    const set = deps.get(source)?.files || new Set<string>()

    ids.forEach((id) => { set.add(id) })

    deps.set(source, { files: set, isExists })

    isExists && addWatchFile(source)
  }))

  return result
}

export async function resolveExampleFile(_store: PluginStore, moduleId: string) {
  const { filePath, extname } = _store.examples.get(moduleId)!

  const isExists = await fse.exists(filePath)

  const holder = generateExampleHolder(filePath, extname)

  if (!isExists) return holder.text

  return parseExampleFile(filePath, holder, extname)
}

export async function resolveTableFile(_store: PluginStore, moduleId: string) {
  const { filePath } = _store.tables.get(moduleId)!

  const isExists = await fse.exists(filePath)

  const holder = generateTableHolder()

  if (!isExists) return holder

  return parseTableFile(filePath)
}
