import type { CustomPluginStore } from '../interface'

export function updateEntries(
  _store: CustomPluginStore,
  filePath: string,
  resolveId: string,
) {
  _store.entries.set(resolveId, filePath)
  _store.entries.set(filePath, resolveId)
}

export function updateModules(
  _store: CustomPluginStore,
  resolveId: string,
  filePath: string,
) {
  _store.modules.set(resolveId, filePath)
}

export function updateWatches(
  _store: CustomPluginStore,
  filePath: string,
  moduleIds: string[],
) {
  _store.watches.set(filePath, moduleIds)
}
