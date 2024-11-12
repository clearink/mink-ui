import{C as t}from"./index-DdocyDJ_.js";import{M as e}from"./style-f4HXkhX5.js";import{A as o,a,b as r}from"./ink-ui-virtual_EKKpYGpYjUs15vAz2mBSJQ___salt_2-BH1rYpPU.js";import{j as n}from"./index-DCi0LQqD.js";import"./flatten-children-D1QXc7RB.js";function c(){return n.jsxs("div",{className:"source-container",children:[n.jsx(t,{title:"长按钮",rawText:`\`\`\`tsx
import { Button, Space } from '@ink-ui/core'

function App() {
  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <Button block variant="filled">
        Primary
      </Button>
      <Button block>Default</Button>
      <Button block variant="dashed">
        Dashed
      </Button>
      <Button block disabled>
        disabled
      </Button>
      <Button block variant="text">
        text
      </Button>
      <Button block variant="link">
        Link
      </Button>
    </Space>
  )
}

export default App
\`\`\`
`,children:n.jsx(o,{})}),n.jsx(t,{title:"基本用法",rawText:`\`\`\`tsx
import { Button, Space } from '@ink-ui/core'

function App() {
  return (
    <Space wrap>
      <Button variant="filled">Primary Button</Button>
      <Button>Default Button</Button>
      <Button variant="dashed">Dashed Button</Button>
      <Button variant="text">Text Button</Button>
    </Space>
  )
}

export default App
\`\`\`
`,children:n.jsx(a,{})}),n.jsx(t,{title:"危险",rawText:`\`\`\`tsx
import { Button, Space } from '@ink-ui/core'

function App() {
  return (
    <Space wrap>
      <Button theme="danger" variant="filled">
        Primary
      </Button>
      <Button theme="danger">Default</Button>
      <Button theme="danger" variant="dashed">
        Dashed
      </Button>
      <Button theme="danger" variant="text">
        Text
      </Button>
    </Space>
  )
}

export default App
\`\`\`
`,children:n.jsx(r,{})}),n.jsx(e,{rawText:`
## API

### Button Props

| 属性     | 描述     | 类型                                    | 默认值    | 版本 |
| -------- | -------- | --------------------------------------- | --------- | ---- |
| block    | 块级格式 | boolean                                 |           |      |
| disabled | 禁用     | boolean                                 |           |      |
| ghost    | 幽灵按钮 | boolean                                 |           |      |
| icon     | 图标     | ReactNode                               |           |      |
| loading  | 加载中   | boolean\\|\`{delay:number}\`               |           |      |
| shape    | 形状     | \`circle\`\\|\`default\`\\|\`round\`            | \`default\` |      |
| size     | 尺寸     | \`large\`\\|\`middle\`\\|\`small\`\\|\`undefined\` | \`middle\`  |      |
| theme    | 主题     |                                         |           |      |
| variant  | 变体     |                                         |           |      |

### ButtonGroup Props

| 属性     | 描述            | 类型 | 默认值 | 版本 |
| -------- | --------------- | ---- | ------ | ---- |
| children | React.ReactNode |      |        |      |
`})]})}export{c as default};
