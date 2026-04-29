export interface CustomPluginOptions {
  groups: Record<string, { input: string, output: string }>
}

export interface DataItem {
  meta: Record<string, string>
  path: string
}
