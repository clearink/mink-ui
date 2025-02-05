import { formatCssWrapName, formatInfoName } from '../resolve-source/format-name'

export default function makePlaceholder(filePath: string) {
  const desc = { 'zh-CN': 'TODO', 'en-US': 'TODO' }

  let jsx = 'export default function App() {\n'
    + '  return <div>建设中,敬请期待!</div>\n'
    + '}'

  const jsxText = `\`\`\`tsx\n${jsx}\n\`\`\``

  const infoName = formatInfoName(filePath)

  const cssWrapName = formatCssWrapName(filePath)

  jsx += `\nexport const ${infoName} = {
    desc: ${JSON.stringify(desc)},
    rawText: ${JSON.stringify(jsxText)},
    cssWrapName: ${JSON.stringify(cssWrapName)}
  }\n`

  return { jsx, css: '', rawText: jsxText }
}
