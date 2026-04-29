export type ExampleExtname = 'css' | 'ts' | 'tsx'

// 需要重新设计存储方式

export interface PluginStore {
  // 虚拟模块前缀
  prefix: string
  // 文档适用 matter 类别
  isTargetInfo: (metaInfo: Record<string, any>) => boolean
  // 文档适用文件后缀
  isTargetFile: (filePath: string) => boolean
  // 解析后的虚拟模块
  modules: { sources: Set<string>, resolved: Set<string> }
  // 入口文件
  entries: Map<string, { filePath: string, deps: Map<string, { isExists: boolean, files: Set<string> }> }>
  // <code-example />
  examples: Map<string, { filePath: string, extname: ExampleExtname }>
  // <props-table/>
  tables: Map<string, { filePath: string }>
}

export interface DocsLoaderOptions {
  isTargetFile: (filePath: string) => boolean
  isTargetInfo: (metaInfo: Record<string, any>) => boolean
}

export interface SourceSection {
  deps: string[]
  imports: string[]
  code: string
}

export interface AddSourceFile {
  (file: string, moduleIds: string[]): void
}
