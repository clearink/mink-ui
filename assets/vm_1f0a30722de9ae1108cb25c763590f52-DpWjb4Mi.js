import{j as n}from"./index-Dxi2XTlO.js";import{B as t}from"./index-BLs98Sxj.js";import{S as r}from"./index-CDc1cH8L.js";function d(){return n.jsxs(r,{wrap:!0,children:[n.jsx(t,{variant:"filled",children:"Primary Button"}),n.jsx(t,{children:"Default Button"}),n.jsx(t,{variant:"dashed",children:"Dashed Button"}),n.jsx(t,{variant:"text",children:"Text Button"})]})}const s={desc:{"zh-CN":`按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。

`,"en-US":`按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。 en-US

`},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space wrap>
      <Button variant="filled">Primary Button</Button>
      <Button>Default Button</Button>
      <Button variant="dashed">Dashed Button</Button>
      <Button variant="text">Text Button</Button>
    </Space>
  )
}
\`\`\`
`,cssWrapName:"cssb8c506dd26374d771327791a2b337879"};function l(){return n.jsx("div",{children:"建设中,敬请期待!"})}const u={desc:{"zh-CN":"TODO","en-US":"TODO"},rawText:"```tsx\nexport default function App() {\n  return <div>建设中,敬请期待!</div>\n}\n```",cssWrapName:"css1650d1ec20c7a0cdeddd7ac5dd289e0c"};function p(){return n.jsxs(r,{children:[n.jsx(t,{variant:"filled",children:"Button"}),n.jsx(t,{shape:"circle",variant:"filled",children:"Btn"}),n.jsx(t,{shape:"round",variant:"filled",children:"Button"})]})}const f={desc:{"zh-CN":"Button 有多种形状, `default` - 长方形**(默认)**, `circle` - 圆形, `round` - 圆角\n\n","en-US":"Button 有多种形状, `default` - 长方形**(默认)**, `circle` - 圆形, `round` - 圆角\n\n"},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Button variant="filled">Button</Button>
      <Button shape="circle" variant="filled">Btn</Button>
      <Button shape="round" variant="filled">Button</Button>
    </Space>
  )
}
\`\`\`
`,cssWrapName:"cssc870d5dae31ecbf50a0c01240e99ac58"};function m(){return n.jsxs(r,{children:[n.jsx(t,{size:"small",variant:"filled",children:"small"}),n.jsx(t,{variant:"filled",children:"middle"}),n.jsx(t,{size:"large",variant:"filled",children:"large"})]})}const x={desc:{"zh-CN":"按钮分为：`small`、`middle`、`large` 三种尺寸。\n\n","en-US":"按钮分为：`small`、`middle`、`large` 三种尺寸。\n\n"},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Button size="small" variant="filled">small</Button>
      <Button variant="filled">middle</Button>
      <Button size="large" variant="filled">large</Button>
    </Space>
  )
}
\`\`\`
`,cssWrapName:"css1d34319294bc8bc492908dc5c7fcd8e7"};function B(){return n.jsx(n.Fragment,{children:["filled","dashed","link","outlined","text"].map(a=>n.jsx("div",{style:{marginBottom:16},children:n.jsx(r,{wrap:!0,children:["danger","info","primary","success","warning"].map(e=>n.jsx(t,{variant:a,theme:e,children:e},e))})},a))})}const h={desc:{"zh-CN":"按钮分为：`danger`、`info`、`primary`、`success`、`warning` 五种状态。\n\n","en-US":"按钮分为：`danger`、`info`、`primary`、`success`、`warning` 五种状态。\n\n"},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <>
      {['filled', 'dashed', 'link', 'outlined', 'text'].map(variant => (
        <div key={variant} style={{ marginBottom: 16 }}>
          <Space wrap>
            {['danger', 'info', 'primary', 'success', 'warning'].map(theme => (
              <Button key={theme} variant={variant} theme={theme}>
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
`,cssWrapName:"cssc2a49f60127dd58e824b3e28df303810"};function v(){return n.jsx(n.Fragment,{children:["filled","dashed","link","outlined","text"].map(a=>n.jsx("div",{style:{marginBottom:16},children:n.jsx(r,{children:["danger","info","primary","success","warning"].map(e=>n.jsx(t,{variant:a,theme:e,disabled:!0,children:e},e))})},a))})}const b={desc:{"zh-CN":`按钮被禁用。

`,"en-US":`按钮被禁用。

`},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <>
      {['filled', 'dashed', 'link', 'outlined', 'text'].map(variant => (
        <div key={variant} style={{ marginBottom: 16 }}>
          <Space>
            {['danger', 'info', 'primary', 'success', 'warning'].map(theme => (
              <Button key={theme} variant={variant} theme={theme} disabled>
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
`,cssWrapName:"css316786c2137853033615204ac3531def"};function j(){return n.jsxs(r,{style:{width:"100%"},direction:"vertical",children:[n.jsx(t,{block:!0,variant:"filled",children:"Primary"}),n.jsx(t,{block:!0,children:"Default"}),n.jsx(t,{block:!0,variant:"dashed",children:"Dashed"}),n.jsx(t,{block:!0,disabled:!0,children:"disabled"}),n.jsx(t,{block:!0,variant:"text",children:"text"}),n.jsx(t,{block:!0,variant:"link",children:"Link"})]})}const k={desc:{"zh-CN":`block

`,"en-US":`block en-US

`},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
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
\`\`\`
`,cssWrapName:"cssf810574f572487702516bf3558b7a043"};function S(a){return n.jsx("div",{children:n.jsx(t,{classNames:{root:"root",text:"text",icon:"icon"},children:"Button"})})}const g={desc:{},rawText:`\`\`\`tsx
import { Button } from '@mink-ui/core'

export default function App(props) {
  const { classNames } = props
  return (
    <div>
      <Button classNames={{
        root: 'root',
        text: 'text',
        icon: 'icon'
      }}
      >
        Button
      </Button>
    </div>
  )
}
\`\`\`
`,cssWrapName:"cssd7f21658bd80c6cc2518295404e7e406"};export{d as A,u as a,l as b,f as c,p as d,x as e,m as f,h as g,B as h,s as i,b as j,v as k,k as l,j as m,g as n,S as o};
