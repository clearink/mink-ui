import{j as n}from"./index-DFpG6Uas.js";import{S as e,M as a}from"./index-DUqwrWJ6.js";import{C as t}from"./index-CwZ6dHZw.js";import{A as s,a as o}from"./vm_1ce2f5e3a624f8163d9ebcad72de6c48-NnYvGV3b.js";import"./index-B8QgcPLB.js";import"./keyboard-DDjTZLpe.js";import"./pick-BK4giCUn.js";function x(){return n.jsxs("div",{className:"source-container",children:[n.jsx(e,{title:"何时使用",children:n.jsx(a,{rawText:"随你"})}),n.jsx(e,{title:"代码演示",children:n.jsx(t,{items:[{desc:{},disabled:!1,element:n.jsx("div",{className:"collapse-example-Basic",children:n.jsx(s,{})}),rawText:`\`\`\`tsx
import { Collapse } from '@mink-ui/core'

const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`
const items = [
  {
    name: '1',
    title: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    name: '2',
    title: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    name: '3',
    title: 'This is panel header 3',
    children: <p>{text}</p>,
  },
]

export default function App() {
  const onChange = (expandName, expandedNames) => {
    console.log(expandName, expandedNames)
  }

  return (
    <Collapse
      items={items}
      defaultExpandedNames={['1']}
      onChange={onChange}
    />
  )
}
\`\`\`
`,title:"基础用法"},{desc:{},disabled:!1,element:n.jsx("div",{className:"collapse-example-Accordion",children:n.jsx(o,{})}),rawText:`\`\`\`tsx
import { Collapse } from '@mink-ui/core'

const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`
const items = [
  {
    name: '1',
    title: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    name: '2',
    title: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    name: '3',
    title: 'This is panel header 3',
    children: <p>{text}</p>,
  },
]

export default function App() {
  const onChange = (expandName, expandedNames) => {
    console.log(expandName, expandedNames)
  }

  return (
    <Collapse
      accordion
      items={items}
      defaultExpandedNames={['1']}
      onChange={onChange}
    />
  )
}
\`\`\`
`,title:"手风琴模式"}]})})]})}export{x as default};
