export type XmlJson = string | {
  [K in string]: XmlJson
}

export interface XmlNode {
  tag: string
  attrs: Record<string, any>
  children: XmlNode[]
}

export type FormatXmlNodeListReturn<T extends 'node' | 'attr'>
  = T extends 'node' ? XmlNode[] : XmlNode['attrs']

export interface SubpathExposeOptions {
  formatSubName: (file: string) => string | false
}
