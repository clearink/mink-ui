import{r,j as n}from"./index-Gl7_0Ams.js";import{M as t}from"./index-D3KBkm6H.js";import{C as e}from"./index-bruDC31T.js";import{P as s}from"./index-Dsii8orU.js";import{B as x,M as c,A as m,P as p}from"./virtual_dm-e58bb8ea-g2k3oZFS.js";import{B as i}from"./index-71h4mSUq.js";import{S as d}from"./index-DmLzjMra.js";import"./group-transition-bca9sPjL.js";import"./children-CrS9bith.js";function u(){const[a,o]=r.useState(12);return n.jsx(d,{children:n.jsx(x,{count:a,children:n.jsx(i,{onClick:()=>{o(~~(Math.random()*100))},children:"Badge"})})})}const j={metaInfo:{"zh-CN":`随机

`,"en-US":`basic

`},rawText:`\`\`\`tsx
import { useState } from 'react'
import { Badge, Button, Space } from '@mink-ui/core'

export default function App() {
  const [count, setCount] = useState(12)
  return (
    <Space>
      <Badge count={count}>
        <Button onClick={() => {
          setCount(~~(Math.random() * 100))
        }}
        >
          Badge
        </Button>
      </Badge>
    </Space>
  )
}
\`\`\`
`,cssName:"css-9cd2eef2",relativePath:"packages/core/src/badge/__docs__/examples/random.md"};function C(){return n.jsxs("div",{className:"document-container",children:[n.jsx(t,{rawText:`## 何时使用

`}),n.jsx(t,{rawText:"用于展示状态标记或数字，常用于未读消息、待办事项等场景。"}),n.jsx(t,{rawText:`## 代码演示

`}),n.jsx(e,{...c,title:"基本用法",element:n.jsx(m,{})}),n.jsx(e,{...j,title:"随机",element:n.jsx(u,{})}),n.jsx(t,{rawText:`## API

`}),n.jsx(t,{rawText:`### Badge Props

`}),n.jsx(s,{columns:p}),n.jsx(t,{rawText:`## Semantic DOM

`}),n.jsx(t,{rawText:"TODO: 描述组件的语义 DOM 结构。"}),n.jsx(t,{rawText:`## FAQ

`}),n.jsx(t,{rawText:`### Q1

`}),n.jsx(t,{rawText:`xxx
`})]})}export{C as default};
