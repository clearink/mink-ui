import{j as e}from"./index-Bacg4EGZ.js";import{M as t}from"./index-Cj1F4v5-.js";import{C as n}from"./index-qmpyQP6c.js";import{P as r}from"./index-BZmXHk9e.js";import{M as i,A as o,a as x,b as m,c as l,d as p,e as c,f as d,g as j,h as f,i as u,j as T,k as w,l as h,P as A,m as g}from"./virtual_dm-11122ce1-BxWn3jzV.js";import{B as M}from"./index-CoVZcEMu.js";import{S as b}from"./index-C11MJwsZ.js";import"./children-CvOPK_7J.js";function I(a){return`${a.charAt(0).toUpperCase()}${a.slice(1)}`}function $(){return e.jsx(e.Fragment,{children:["solid","outlined","dashed","filled","text","link"].map(a=>e.jsx("div",{style:{marginBottom:16},children:e.jsx(b,{styles:{item:{minWidth:120,textAlign:"center"}},wrap:!0,children:["primary","success","warning","danger","info"].map(s=>e.jsx(M,{disabled:!0,theme:s,variant:a,children:I(a)},s))})},a))})}const B={metaInfo:{"zh-CN":`按钮被禁用。

`,"en-US":`按钮被禁用。

`},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

function capitalize<T extends string>(str: T) {
  return \`\${str.charAt(0).toUpperCase()}\${str.slice(1)}\` as Capitalize<T>
}

export default function App() {
  return (
    <>
      {['solid', 'outlined', 'dashed', 'filled', 'text', 'link'].map(variant => (
        <div key={variant} style={{ marginBottom: 16 }}>
          <Space styles={{ item: { minWidth: 120, textAlign: 'center' } }} wrap>
            {['primary', 'success', 'warning', 'danger', 'info'].map(theme => (
              <Button key={theme} disabled theme={theme} variant={variant}>
                {capitalize(variant)}
              </Button>
            ))}
          </Space>
        </div>
      ))}
    </>
  )
}
\`\`\`
`,cssName:"css-c3531def",relPath:"packages/core/src/button/__docs__/examples/disabled.md"};function N(){return e.jsxs("div",{className:"document-container",children:[e.jsx(t,{rawText:`## 何时使用

`}),e.jsx(t,{rawText:"随你"}),e.jsx(t,{rawText:`## 代码演示

`}),e.jsx(n,{...i,title:"基本用法",element:e.jsx(o,{})}),e.jsx(n,{...x,title:"按钮形状",element:e.jsx(m,{})}),e.jsx(n,{...l,title:"按钮尺寸",element:e.jsx(p,{})}),e.jsx(n,{...c,title:"图标按钮",element:e.jsx(d,{})}),e.jsx(n,{...j,title:"加载中",element:e.jsx(f,{})}),e.jsx(n,{...u,title:"按钮状态",element:e.jsx(T,{})}),e.jsx(n,{...B,title:"禁用按钮",element:e.jsx($,{})}),e.jsx(n,{...w,title:"长按钮",element:e.jsx(h,{})}),e.jsx(t,{rawText:`## API

`}),e.jsx(t,{rawText:`### Button Props

`}),e.jsx(r,{columns:A}),e.jsx(t,{rawText:`### ButtonGroup Props

`}),e.jsx(r,{columns:g}),e.jsx(t,{rawText:`## Semantic DOM

`}),e.jsx(t,{rawText:`<!-- <semantic-dom src="./examples/semantic.md" /> -->

`}),e.jsx(t,{rawText:`## FAQ

`}),e.jsx(t,{rawText:`### Q1

`}),e.jsx(t,{rawText:"xxx"}),e.jsx(t,{rawText:`### Q2

`}),e.jsx(t,{rawText:`xxx
`})]})}export{N as default};
