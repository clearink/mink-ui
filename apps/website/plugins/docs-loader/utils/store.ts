import type { DocsLoaderOptions, PluginStore } from '../interface.ts'

import { MarkedControl } from './marked-control.ts'

export function createPluginStore(options: DocsLoaderOptions): PluginStore {
  return {
    prefix: 'virtual:dm-',
    isTargetInfo: options.isTargetInfo,
    isTargetFile: options.isTargetFile,
    modules: { sources: new Set(), resolved: new Set() },
    entries: new Map(),
    examples: new Map(),
    tables: new Map(),
    parser: new MarkedControl(),
  }
}

export function destroyPluginStore(_store: PluginStore) {
  _store.modules.sources.clear()
  _store.modules.resolved.clear()
  _store.entries.clear()
  _store.examples.clear()
  _store.tables.clear()
  _store.parser.destroy()
}
