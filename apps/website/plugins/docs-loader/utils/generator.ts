import type { ExampleExtname, SourceSection } from '../interface.ts'

import { formatCssName } from './formatter.ts'

export function generateEntrySource(sections: SourceSection[]) {
  return `
${Array.from(new Set(sections.flatMap(_ => _.deps))).join('\n')}
${Array.from(new Set(sections.flatMap(_ => _.imports))).join('\n')}

export default function Index() {
  return (
    <div className="document-container">
      ${sections.map(_ => _.code).join('\n')}
    </div>
  )
}
`
}

/**
 * @description 创建入口文件占位符
 */
export function generateEntryHolder() {
  return generateEntrySource([{
    deps: [],
    imports: [],
    code: `<div>建设中，敬请期待！</div>`,
  }])
}

/**
 * @description 创建示例文件占位符
 */
export function generateExampleHolder(filePath: string, extname: ExampleExtname) {
  const metaInfo = { 'ZH-CN': '待定', 'en-US': 'TODO' }

  const cssName = formatCssName(filePath)

  const tsx = 'export default function App() {\n'
    + '  return <div>建设中,敬请期待!</div>\n'
    + '}'

  const rawText = `\`\`\`tsx\n${tsx}\n\`\`\``

  const js = `
export default {
  metaInfo: ${JSON.stringify(metaInfo)},
  rawText: ${JSON.stringify(rawText)},
  cssName: ${JSON.stringify(cssName)}
}
`
  const text = extname === 'ts' ? js : extname === 'tsx' ? tsx : ''

  return { raw: rawText, text }
}

/**
 * @description 创建 props-table 文件占位符
 */
export function generateTableHolder() {
  return `export default []`
}
