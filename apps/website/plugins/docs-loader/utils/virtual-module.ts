import type { ExampleExtname, PluginStore } from '../interface.ts'

export function updateEntries(
  _store: PluginStore,
  filePath: string,
  moduleId: string,
) {
  _store.modules.sources.add(filePath)

  _store.modules.resolved.add(moduleId)

  _store.entries.set(moduleId, { filePath, deps: new Map() })
}

export function updateExamples(
  _store: PluginStore,
  filePath: string,
  moduleId: string,
  extname: ExampleExtname,
) {
  _store.modules.sources.add(filePath)

  _store.modules.resolved.add(moduleId)

  _store.examples.set(moduleId, { filePath, extname })
}

export function updateTables(
  _store: PluginStore,
  filePath: string,
  moduleId: string,
) {
  _store.modules.sources.add(filePath)

  _store.modules.resolved.add(moduleId)

  _store.tables.set(moduleId, { filePath })
}
