import type { DocsLoaderOptions, PluginStore } from '../interface.ts'

export function createPluginStore(options: DocsLoaderOptions): PluginStore {
  return {
    prefix: 'virtual:dm-',
    isTargetInfo: options.isTargetInfo,
    isTargetFile: options.isTargetFile,
    modules: { sources: new Set(), resolved: new Set() },
    entries: new Map(),
    examples: new Map(),
    tables: new Map(),
  }
}
