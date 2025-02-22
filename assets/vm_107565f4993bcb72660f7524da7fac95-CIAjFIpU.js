import{m,c as d,w as C,D as N,a as b,o as k,j as n,i as g,r as j}from"./index-x3Cl-sSR.js";import{n as u,T as $,B as v}from"./index-BbBPHn7m.js";import{u as A}from"./index-CasDW5Io.js";const S=m({cancelValue:u,registerValue:u});function T(e){const{checked:s,defaultChecked:c,onChange:t}=e;return A({defaultValue:c,onChange:t,value:s})}function _(e,s,c){const{disabled:t,indeterminate:a,className:r,classNames:o={}}=s,{checked:l}=c;return{root:d(e,{[`${e}--checked`]:l,[`${e}--disabled`]:t,[`${e}--indeterminate`]:a},r,o.root),input:d(`${e}__input`,o.input),inner:d(`${e}__inner`,o.inner),label:d(`${e}__label`,o.label)}}const w=["autoFocus","children","disabled","checked","defaultChecked","indeterminate","onChange"];function B(e){const s=S.useState(),c=C({...e,disabled:e.disabled||s.disabled},{disabled:N.useState()}),{children:t,disabled:a}=c,r=b("checkbox"),[o,l,x]=T(c),i=_(r,c,{checked:o}),f=k(c,w);return n.jsx($,{component:"Checkbox",disabled:o||a||x,selector:`.${r}__inner`,children:n.jsxs("label",{...f,className:i.root,children:[n.jsx("input",{className:i.input,checked:!!o,type:"checkbox",onChange:p=>{!a&&l(p.target.checked)}}),n.jsx("span",{className:i.inner}),!g(t)&&n.jsx("span",{className:i.label,children:t})]})})}function y(e,s){const{className:c,classNames:t={}}=s;return{root:d(e,{},c,t.root)}}const V=["children"];function W(e){const{children:s}=e,c=b("checkbox-group"),t=y(c,e),a=k(e,V);return n.jsxs("div",{...a,className:t.root,children:[n.jsx("input",{type:"checkbox"}),n.jsx("span",{children:s})]})}const h=Object.assign(B,{Group:W});function F(){return n.jsx(h,{onChange:e=>{console.log(`checked = ${e}`)},children:"Checkbox"})}const G={desc:{"zh-CN":`基本用法

`,"en-US":`基本用法

`},rawText:`\`\`\`tsx
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
`,cssWrapName:"css2827200090fea2a6c3ba43ee25633290"};function U(){return n.jsx(h,{disabled:!0,onChange:e=>{console.log(`checked = ${e}`)},children:"Checkbox"})}const H={desc:{"zh-CN":`禁用

`,"en-US":`禁用

`},rawText:`\`\`\`tsx
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
`,cssWrapName:"csse52b1337baafffd2e630af3cd3bc684d"};function O(){const[e,s]=j.useState(!1);return n.jsxs("div",{children:[n.jsx(h,{checked:e,children:"Checkbox"}),n.jsx("div",{style:{marginTop:24},children:n.jsx(v,{variant:"filled",onClick:()=>{s(!e)},children:"Check"})})]})}const P={desc:{"zh-CN":`受控

`,"en-US":`受控

`},rawText:`\`\`\`tsx
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
`,cssWrapName:"css157439ebdeff822e9965d246e2067cba"};function R(){return n.jsx("div",{children:"todo"})}const q={desc:{},rawText:`\`\`\`tsx
export default function App() {
  return (
    <div>
      todo
    </div>
  )
}
\`\`\`
`,cssWrapName:"css90c94b30a6019d958ab8410deff38c68"};export{F as A,H as a,U as b,P as c,O as d,q as e,R as f,G as i};
