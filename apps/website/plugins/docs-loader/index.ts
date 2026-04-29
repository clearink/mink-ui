import type { EnvironmentModuleNode, Plugin } from 'vite'
import type { DocsLoaderOptions } from './interface.ts'

import fse from 'fs-extra'

import { formatFilePath, formatUniqueId } from './utils/formatter.ts'
import { resolveEntryFile, resolveExampleFile, resolveTableFile } from './utils/resolver.ts'
import { createPluginStore } from './utils/store.ts'
import { updateEntries } from './utils/virtual-module.ts'

export default function docsLoader(options: DocsLoaderOptions): Plugin {
  const _store = createPluginStore(options)

  return {
    name: 'vite:mink-ui-docs-loader',
    enforce: 'pre',
    resolveId(sourceId, importer) {
      const { resolved, sources } = _store.modules

      if (resolved.has(sourceId)) return sourceId

      if (sources.has(sourceId)) return undefined

      const filePath = formatFilePath(sourceId, importer)

      if (!_store.isTargetFile(filePath)) return undefined

      const moduleId = formatUniqueId(_store.prefix, filePath, '.tsx')

      updateEntries(_store, filePath, moduleId)

      return moduleId
    },
    load(id) {
      const { entries, examples, tables } = _store

      const addWatchFile = this.addWatchFile.bind(this)

      if (entries.has(id)) return resolveEntryFile(_store, id, addWatchFile)

      if (examples.has(id)) return resolveExampleFile(_store, id)

      if (tables.has(id)) return resolveTableFile(_store, id)
    },
    async hotUpdate(ctx) {
      const result = new Map<string | null, EnvironmentModuleNode>()

      const { entries, examples, tables } = _store

      const recursive = async (target: string, level: number) => {
        const isExists = await fse.exists(target)

        for (const { deps } of entries.values()) {
          const match = deps.get(target)

          if (!match) continue

          for (const id of match.files.values()) {
            const module = this.environment.moduleGraph.getModuleById(id)

            if (!module) continue

            if (level === 0 || !isExists || !match.isExists) {
              result.set(module.id, module)
            }

            for (const child of module.importedModules) {
              if (!child.id) continue

              const cache = examples.get(child.id) || tables.get(child.id)

              cache && await recursive(cache.filePath, level + 1)
            }
          }
        }
      }

      await recursive(ctx.file, 0)

      if (result.size) return Array.from(result.values())
    },
  }
}
