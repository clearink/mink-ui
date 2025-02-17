import{j as n}from"./index-CsKKL_Kz.js";import{S as e,M as c}from"./index-M5IjEHzL.js";import{S as o}from"./index-DWiJsBmv.js";import{C as t}from"./index-D-Ksilcc.js";import{A as i,a as r,b as s,c as x}from"./vm_c5814fd9b81f58da6148ab0b213c10bb-BHZ47QB0.js";import"./index-BC_TnJie.js";function p(){return n.jsxs("div",{className:"source-container",children:[n.jsx(e,{title:"何时使用",children:n.jsx(c,{rawText:"随你"})}),n.jsx(e,{title:"代码演示",children:n.jsx(t,{items:[{desc:{"zh-CN":`基本用法

`,"en-US":`基本用法

\`\`\`tsx
import { Checkbox } from '@mink-ui/core'

export default function App() {
  return (
    <Checkbox
      onChange={(checked) => {
        console.log(\`checked = \${checked}\`)
      }}
    >
      Checkbox
    </Checkbox>
  )
}
\`\`\`
`},disabled:!1,element:n.jsx("div",{className:"checkbox-example-Basic",children:n.jsx(i,{})}),rawText:`\`\`\`tsx
import { Checkbox } from '@mink-ui/core'

export default function App() {
  return (
    <Checkbox
      onChange={(checked) => {
        console.log(\`checked = \${checked}\`)
      }}
    >
      Checkbox
    </Checkbox>
  )
}
\`\`\`
`,title:"基本用法"},{desc:{"zh-CN":`禁用

`,"en-US":`禁用

\`\`\`tsx
import { Checkbox } from '@mink-ui/core'

export default function App() {
  return (
    <Checkbox
      disabled
      onChange={(checked) => {
        console.log(\`checked = \${checked}\`)
      }}
    >
      Checkbox
    </Checkbox>
  )
}
\`\`\`
`},disabled:!0,element:n.jsx("div",{className:"checkbox-example-Disabled",children:n.jsx(r,{})}),rawText:`\`\`\`tsx
import { Checkbox } from '@mink-ui/core'

export default function App() {
  return (
    <Checkbox
      disabled
      onChange={(checked) => {
        console.log(\`checked = \${checked}\`)
      }}
    >
      Checkbox
    </Checkbox>
  )
}
\`\`\`
`,title:"禁用"},{desc:{"zh-CN":`受控

`,"en-US":`受控

\`\`\`tsx
import { Button, Checkbox } from '@mink-ui/core'
import { useState } from 'react'

export default function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <Checkbox checked={checked}>
        Checkbox
      </Checkbox>
      <div style={{ marginTop: 24 }}>
        <Button variant="filled" onClick={() => { setChecked(!checked) }}>
          Check
        </Button>
      </div>
    </div>
  )
}
\`\`\`
`},disabled:!1,element:n.jsx("div",{className:"checkbox-example-Controlled",children:n.jsx(s,{})}),rawText:`\`\`\`tsx
import { Button, Checkbox } from '@mink-ui/core'
import { useState } from 'react'

export default function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <Checkbox checked={checked}>
        Checkbox
      </Checkbox>
      <div style={{ marginTop: 24 }}>
        <Button variant="filled" onClick={() => { setChecked(!checked) }}>
          Check
        </Button>
      </div>
    </div>
  )
}
\`\`\`
`,title:"受控"}]})}),n.jsx(e,{title:"API",children:n.jsx(c,{rawText:`### Checkbox Props

TODO`})}),n.jsx(e,{title:"Semantic DOM",children:n.jsx(o,{children:n.jsx(x,{})})}),n.jsx(e,{title:"FAQ",children:n.jsx(c,{rawText:`### Q1

xxx

### Q2

xxx`})})]})}export{p as default};
