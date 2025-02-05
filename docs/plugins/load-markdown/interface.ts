export interface CustomPluginStore {
  prefix: string
  categories: string[]
  // 入口文件
  entries: Map<string, string>
  // virtual modules
  modules: Map<string, string>
  // 监听文件
  watches: Map<string, string[]>
}

export interface ExampleItem {
  /** 标题 */
  title: string
  /** 是否禁用 */
  disabled: string
  /** 完整路径 */
  filePath: string
  /** 组件名称 */
  exampleName: string
  /** 信息 */
  infoName: string
  /** 代码Id */
  jsxId: string
  /** 样式Id */
  cssId: string
  // /** 描述 */
  // desc: Record<string, string>
  // /** 源代码 */
  // jsx: string
  // /** 样式代码 */
  // css: string
  // /** 源文本 */
  // rawText: string
}

export type SemanticItem = Omit<ExampleItem, 'title'>

export interface FormattedSection {
  code: string
  title: string
  imports?: string
}
