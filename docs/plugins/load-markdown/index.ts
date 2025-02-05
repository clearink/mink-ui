import type { Plugin } from 'vite'

import fse from 'fs-extra'
import matter from 'gray-matter'

import type { CustomPluginStore } from './interface'

import { resolveEntryFile, resolveExampleFile } from './resolve-source'
import { formatJsxId } from './resolve-source/format-id'
import { updateEntries, updateWatches } from './utils/virtual-module'

export default function loadMarkdown(): Plugin {
  const _store: CustomPluginStore = {
    prefix: 'vm:',
    categories: ['blog', 'component', 'component-en'],
    entries: new Map(),
    modules: new Map(),
    watches: new Map(),
  }

  return {
    name: 'vite-plugin-load-markdown',
    enforce: 'pre',
    async resolveId(id) {
      const { prefix, entries, categories } = _store

      if (id.startsWith(prefix)) return id

      if (entries.has(id)) return entries.get(id)

      if (!id.endsWith('.md')) return undefined

      const isExists = await fse.exists(id)

      if (!isExists) return undefined

      const fileContent = await fse.readFile(id, { encoding: 'utf8' })

      const { data: meta } = matter(fileContent)

      if (!categories.includes(meta.category)) return undefined

      const resolveId = formatJsxId(_store, id)

      updateEntries(_store, id, resolveId)

      updateWatches(_store, id, [resolveId])

      return resolveId
    },
    load(id) {
      const { entries, modules } = _store

      const addWatchFile = this.addWatchFile.bind(this)

      if (entries.has(id)) return resolveEntryFile(_store, id, addWatchFile)

      if (modules.has(id)) return resolveExampleFile(_store, id, addWatchFile)
    },
    handleHotUpdate(ctx) {
      const modules = Array.from(_store.watches.entries())
        .filter(([filePath]) => filePath === ctx.file)
        .map(([_, ids]) => ids)
        .flat()
        .map(id => ctx.server.moduleGraph.getModuleById(id))
        .filter(Boolean)

      if (modules.length) return modules
    },
  }
}
