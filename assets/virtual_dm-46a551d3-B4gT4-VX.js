import{j as n}from"./index-lKdCcfyw.js";import{M as t}from"./index-DpkfVBNe.js";import{C as a}from"./index-CUvNlcih.js";import{P as o}from"./index-EVMNPoW4.js";import{S as c}from"./index-BNcfilK7.js";import{M as l,A as x,a as d,b as m,c as p,d as u,P as f,e as j,f as b}from"./virtual_dm-aee821a3-Bvcb2Rco.js";import{B as e}from"./index-BSCRxZB_.js";import{S as i}from"./space-CklsVt2X.js";import"./children-Bg1ZoXIn.js";function k(){return n.jsx("div",{children:"建设中,敬请期待!"})}const h={metaInfo:{"ZH-CN":"待定","en-US":"TODO"},rawText:"```tsx\nexport default function App() {\n  return <div>建设中,敬请期待!</div>\n}\n```",cssName:"css-dd289e0c"};function B(){return n.jsx(n.Fragment,{children:["filled","dashed","link","outlined","text"].map(s=>n.jsx("div",{style:{marginBottom:16},children:n.jsx(i,{wrap:!0,children:["danger","info","primary","success","warning"].map(r=>n.jsx(e,{theme:r,variant:s,children:r},r))})},s))})}const v={metaInfo:{"zh-CN":"按钮分为：`danger` `info` `primary` `success` `warning` 五种状态。\n\n","en-US":"按钮分为：`danger` `info` `primary` `success` `warning` 五种状态。\n\n"},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <>
      {['filled', 'dashed', 'link', 'outlined', 'text'].map(variant => (
        <div key={variant} style={{ marginBottom: 16 }}>
          <Space wrap>
            {['danger', 'info', 'primary', 'success', 'warning'].map(theme => (
              <Button key={theme} theme={theme} variant={variant}>
                {theme}
              </Button>
            ))}
          </Space>
        </div>
      ))}
    </>
  )
}
\`\`\`
`,cssName:"css-df303810",relativePath:"packages/core/src/button/__docs__/examples/status.md"};function w(){return n.jsxs(i,{orientation:"vertical",children:[n.jsx(e,{block:!0,variant:"filled",children:"Primary"}),n.jsx(e,{block:!0,children:"Default"}),n.jsx(e,{block:!0,variant:"dashed",children:"Dashed"}),n.jsx(e,{block:!0,disabled:!0,children:"disabled"}),n.jsx(e,{block:!0,variant:"text",children:"text"}),n.jsx(e,{block:!0,variant:"link",children:"Link"})]})}const T={metaInfo:{"zh-CN":`block

`,"en-US":`block en-US

`},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space orientation="vertical">
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
\`\`\`
`,cssName:"css-58b7a043",relativePath:"packages/core/src/button/__docs__/examples/block.md"};function N(){return n.jsxs("div",{className:"document-container",children:[n.jsx(t,{rawText:`## 何时使用

`}),n.jsx(t,{rawText:"随你"}),n.jsx(t,{rawText:`## 代码演示

`}),n.jsx(a,{...l,title:"基本用法",element:n.jsx(x,{})}),n.jsx(a,{...d,title:"按钮形状",element:n.jsx(m,{})}),n.jsx(a,{...p,title:"按钮尺寸",element:n.jsx(u,{})}),n.jsx(a,{...h,title:"图标按钮",element:n.jsx(k,{})}),n.jsx(a,{...v,title:"按钮状态",element:n.jsx(B,{})}),n.jsx(a,{...T,title:"长按钮",element:n.jsx(w,{})}),n.jsx(t,{rawText:`## API

`}),n.jsx(t,{rawText:`### Button Props

`}),n.jsx(o,{columns:f}),n.jsx(t,{rawText:`### ButtonGroup Props

`}),n.jsx(o,{columns:j}),n.jsx(t,{rawText:`## Semantic DOM

`}),n.jsx(c,{element:n.jsx(b,{})}),n.jsx(t,{rawText:`## FAQ

`}),n.jsx(t,{rawText:`### Q1

`}),n.jsx(t,{rawText:"xxx"}),n.jsx(t,{rawText:`### Q2

`}),n.jsx(t,{rawText:`xxx
`})]})}export{N as default};
