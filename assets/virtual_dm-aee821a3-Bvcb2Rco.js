import{j as e}from"./index-lKdCcfyw.js";import{B as t}from"./index-BSCRxZB_.js";import{S as n}from"./space-CklsVt2X.js";function i(){return e.jsxs(n,{children:[e.jsx(t,{variant:"filled",children:"Primary Button"}),e.jsx(t,{children:"Default Button"}),e.jsx(t,{variant:"dashed",children:"Dashed Button"}),e.jsx(t,{variant:"text",children:"Text Button"})]})}const u={metaInfo:{"zh-CN":`按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。

`,"en-US":`按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。 en-US

`},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Button variant="filled">Primary Button</Button>
      <Button>Default Button</Button>
      <Button variant="dashed">Dashed Button</Button>
      <Button variant="text">Text Button</Button>
    </Space>
  )
}
\`\`\`
`,cssName:"css-2b337879",relativePath:"packages/core/src/button/__docs__/examples/basic.md"};function c(){return e.jsxs(n,{children:[e.jsx(t,{variant:"filled",children:"Button"}),e.jsx(t,{shape:"circle",variant:"filled",children:"Btn"}),e.jsx(t,{shape:"round",variant:"filled",children:"Button"})]})}const d={metaInfo:{"zh-CN":"Button 有多种形状, `default` - 长方形**(默认)**, `circle` - 圆形, `round` - 圆角\n\n","en-US":"Button 有多种形状, `default` - 长方形**(默认)**, `circle` - 圆形, `round` - 圆角\n\n"},rawText:`\`\`\`tsx
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
`,cssName:"css-0e99ac58",relativePath:"packages/core/src/button/__docs__/examples/shape.md"};function m(){return e.jsxs(n,{children:[e.jsx(t,{size:"small",variant:"filled",children:"small"}),e.jsx(t,{variant:"filled",children:"middle"}),e.jsx(t,{size:"large",variant:"filled",children:"large"})]})}const p={metaInfo:{"zh-CN":"按钮分为：`small`、`middle`、`large` 三种尺寸。\n\n","en-US":"按钮分为：`small`、`middle`、`large` 三种尺寸。\n\n"},rawText:`\`\`\`tsx
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
`,cssName:"css-c7fcd8e7",relativePath:"packages/core/src/button/__docs__/examples/size.md"},h=[{name:"ref",type:"React.Ref<HTMLButtonElement>","zh-CN":"`button` 或 `a` 元素的引用","en-US":"The ref of the `button` or `a` element"},{name:"block",type:"boolean","zh-CN":"占据一行","en-US":"Take up the whole line"},{name:"disabled",type:"boolean","zh-CN":"是否禁用","en-US":"Whether to disable"},{name:"ghost",type:"boolean","zh-CN":"幽灵按钮","en-US":"Ghost button"},{name:"icon",type:"React.ReactNode","zh-CN":"按钮图标","en-US":"Button icon"},{name:"loading",enum:!0,type:["boolean","{ delay: number }"],"zh-CN":"加载中","en-US":"Loading"},{name:"shape",enum:!0,type:["round","default","circle"],defaultValue:"default","zh-CN":"按钮形状","en-US":"Button shape"},{name:"size",enum:!0,type:["small","middle","large"],defaultValue:"middle","zh-CN":"按钮尺寸","en-US":"Button size"},{name:"theme",enum:!0,type:["danger","info","primary","success","warning"],defaultValue:"primary","zh-CN":"按钮主题","en-US":"Button theme"},{name:"variant",enum:!0,type:["dashed","filled","outlined","link","text"],defaultValue:"outlined","zh-CN":"按钮风格","en-US":"Button variant"},{name:"onClick",type:"(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void","zh-CN":"点击事件","en-US":"Click event"},{name:"children",type:"React.ReactNode","zh-CN":"按钮内容","en-US":"Button content"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"classNames",type:"Record<'root' | 'icon' | 'text', style>","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"styles",type:"Record<'root' | 'icon' | 'text', React.CSSProperties>","zh-CN":"自定义样式","en-US":"Custom style"}],f=[{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀"},{name:"size",enum:!0,type:["small","middle","large"],"zh-CN":"按钮尺寸","en-US":"Button size"}];function B(a){const{classNames:o}=a;return e.jsx("div",{children:e.jsx(t,{classNames:{root:"root",text:"text",icon:"icon"},children:"Button1123"})})}export{i as A,u as M,h as P,d as a,c as b,p as c,m as d,f as e,B as f};
