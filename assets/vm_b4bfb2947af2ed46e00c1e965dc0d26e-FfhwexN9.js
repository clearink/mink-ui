import{j as n}from"./index-CsKKL_Kz.js";import{S as t,M as e}from"./index-M5IjEHzL.js";import{S as a}from"./index-DWiJsBmv.js";import{C as i}from"./index-D-Ksilcc.js";import{A as o,a as r,b as l,c as u,d,e as s,f as c,g as p}from"./vm_8e79c22bdef46a7d18a093cee42e824a-CYrPayD8.js";import"./index-BC_TnJie.js";import"./index-BdcrDIQA.js";import"./flatten-children-Bro_Ctzy.js";function b(){return n.jsxs("div",{className:"source-container",children:[n.jsx(t,{title:"何时使用",children:n.jsx(e,{rawText:"随你"})}),n.jsx(t,{title:"代码演示",children:n.jsx(i,{items:[{desc:{"zh-CN":`按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。

`,"en-US":`按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。 en-US

\`\`\`tsx
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
`},disabled:!1,element:n.jsx("div",{className:"button-example-Basic",children:n.jsx(o,{})}),rawText:`\`\`\`tsx
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
`,title:"基本用法"},{desc:{"zh-CN":"TODO","en-US":"TODO"},disabled:!1,element:n.jsx("div",{className:"button-example-Icon",children:n.jsx(r,{})}),rawText:"```tsx\nexport default function App() {\n      return <div>建设中,敬请期待!</div>\n    }```\n\n```tsx\n```",title:"图标按钮"},{desc:{"zh-CN":"Button 有多种形状, `default` - 长方形**(默认)**, `circle` - 圆形, `round` - 圆角\n\n","en-US":`Button 有多种形状, \`default\` - 长方形**(默认)**, \`circle\` - 圆形, \`round\` - 圆角

\`\`\`tsx
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
`},disabled:!1,element:n.jsx("div",{className:"button-example-Shape",children:n.jsx(l,{})}),rawText:`\`\`\`tsx
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
`,title:"按钮形状"},{desc:{"zh-CN":"按钮分为：`small`、`middle`、`large` 三种尺寸。\n\n","en-US":`按钮分为：\`small\`、\`middle\`、\`large\` 三种尺寸。

\`\`\`tsx
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
`},disabled:!1,element:n.jsx("div",{className:"button-example-Size",children:n.jsx(u,{})}),rawText:`\`\`\`tsx
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
`,title:"按钮尺寸"},{desc:{"zh-CN":"按钮分为：`danger`、`info`、`primary`、`success`、`warning` 五种状态。\n\n","en-US":`按钮分为：\`danger\`、\`info\`、\`primary\`、\`success\`、\`warning\` 五种状态。

\`\`\`tsx
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
`},disabled:!1,element:n.jsx("div",{className:"button-example-Status",children:n.jsx(d,{})}),rawText:`\`\`\`tsx
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
`,title:"按钮状态"},{desc:{"zh-CN":`按钮被禁用。

`,"en-US":`按钮被禁用。

\`\`\`tsx
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
`},disabled:!0,element:n.jsx("div",{className:"button-example-Disabled",children:n.jsx(s,{})}),rawText:`\`\`\`tsx
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
`,title:"禁用按钮"},{desc:{"zh-CN":`block

`,"en-US":`block en-US

\`\`\`tsx
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
`},disabled:!1,element:n.jsx("div",{className:"button-example-Block",children:n.jsx(c,{})}),rawText:`\`\`\`tsx
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
`,title:"长按钮"}]})}),n.jsx(t,{title:"API",children:n.jsx(e,{rawText:"### Button Props\n\n| 属性     | 描述     | 类型                                    | 默认值    | 版本 |\n| -------- | -------- | --------------------------------------- | --------- | ---- |\n| block    | 块级格式 | boolean                                 |           |      |\n| disabled | 禁用     | boolean                                 |           |      |\n| ghost    | 幽灵按钮 | boolean                                 |           |      |\n| icon     | 图标     | ReactNode                               |           |      |\n| loading  | 加载中   | boolean\\|`{delay:number}`               |           |      |\n| shape    | 形状     | `circle`\\|`default`\\|`round`            | `default` |      |\n| size     | 尺寸     | `large`\\|`middle`\\|`small`\\|`undefined` | `middle`  |      |\n| theme    | 主题     |                                         |           |      |\n| variant  | 变体     |                                         |           |      |\n\n### ButtonGroup Props\n\n| 属性     | 描述            | 类型 | 默认值 | 版本 |\n| -------- | --------------- | ---- | ------ | ---- |\n| children | React.ReactNode |      |        |      |"})}),n.jsx(t,{title:"Semantic DOM",children:n.jsx(a,{children:n.jsx(p,{})})}),n.jsx(t,{title:"FAQ",children:n.jsx(e,{rawText:`### Q1

xxx

### Q2

xxx`})})]})}export{b as default};
