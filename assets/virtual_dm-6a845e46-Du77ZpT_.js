import{j as e}from"./index-lKdCcfyw.js";import{M as n}from"./index-DpkfVBNe.js";function t(){return e.jsxs("div",{className:"document-container",children:[e.jsx(n,{rawText:`## 功能

`}),e.jsx(n,{rawText:'1. 支持解析自定义的 `<code-example src="xxx.md" />`，并渲染对应的代码示例\n2. 支持解析自定义的 `<props-table src="xxx.md" />`，并渲染对应的 API 文档\n3. 支持解析自定义的 `<code-example src="xxx.md" />`，并渲染对应的组件'}),e.jsx(n,{rawText:`## Vite 插件实现

`}),e.jsx(n,{rawText:"### 自定义 `resolveId` 函数\n\n"}),e.jsx(n,{rawText:"如果是符合要求的文件，将会生成一个唯一的 ID，并返回。"}),e.jsx(n,{rawText:`\`\`\`ts
{
  resolveId: (sourceId, importer) => {
    if (isDocumentFile(sourceId)) {
      return getUniqueId(sourceId)
    }
  }
}
\`\`\``}),e.jsx(n,{rawText:"### 自定义 `load` 函数\n\n"}),e.jsx(n,{rawText:"如果检测到在 `resolveId` 中生成的唯一 ID 时，将会读取文件内容，并返回解析后的内容。"}),e.jsx(n,{rawText:`\`\`\`ts
{
  load: (sourceId) => {
    if (isUniqueId(sourceId)) {
      const content = readFileSync(sourceId, 'utf-8')
      return parseDocument(content)
    }
  }
}
\`\`\`
`})]})}export{t as default};
