import{j as n,r as h}from"./index-BUOH1Umd.js";import{B as t,W as m}from"./index-2-V2RRra.js";import{T as c}from"./index-B56aqUFZ.js";import{S as o}from"./index-D5HPzvcx.js";function k(){return n.jsxs(o,{children:[n.jsx(t,{theme:"primary",variant:"solid",children:"Primary Solid Button"}),n.jsx(t,{children:"Outlined Button"}),n.jsx(t,{variant:"dashed",children:"Dashed Button"}),n.jsx(t,{variant:"filled",children:"Filled Button"}),n.jsx(t,{variant:"text",children:"Text Button"}),n.jsx(t,{variant:"link",children:"Link Button"})]})}const b={metaInfo:{"zh-CN":`按钮分为 主要按钮、次要按钮、虚线按钮、文本按钮和链接按钮五种。

`,"en-US":`按钮分为 主要按钮、次要按钮、虚线按钮、文本按钮和链接按钮五种。en-US

`},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Button theme="primary" variant="solid">Primary Solid Button</Button>
      <Button>Outlined Button</Button>
      <Button variant="dashed">Dashed Button</Button>
      <Button variant="filled">Filled Button</Button>
      <Button variant="text">Text Button</Button>
      <Button variant="link">Link Button</Button>
    </Space>
  )
}
\`\`\`
`,cssName:"css-2b337879",relPath:"packages/core/src/button/__docs__/examples/basic.md"};function C(){return n.jsxs(o,{children:[n.jsx(t,{theme:"primary",variant:"solid",children:"Button"}),n.jsx(t,{shape:"circle",theme:"primary",variant:"solid",children:"Btn"}),n.jsx(t,{shape:"round",theme:"primary",variant:"solid",children:"Button"})]})}const w={metaInfo:{"zh-CN":"Button 有多种形状, `default` - 长方形**(默认)**, `circle` - 圆形, `round` - 圆角\n\n","en-US":"Button 有多种形状, `default` - 长方形**(默认)**, `circle` - 圆形, `round` - 圆角\n\n"},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Button theme="primary" variant="solid">Button</Button>
      <Button shape="circle" theme="primary" variant="solid">Btn</Button>
      <Button shape="round" theme="primary" variant="solid">Button</Button>
    </Space>
  )
}
\`\`\`
`,cssName:"css-0e99ac58",relPath:"packages/core/src/button/__docs__/examples/shape.md"};function L(){return n.jsxs(o,{children:[n.jsx(t,{size:"small",theme:"primary",variant:"solid",children:"small"}),n.jsx(t,{theme:"primary",variant:"solid",children:"middle"}),n.jsx(t,{size:"large",theme:"primary",variant:"solid",children:"large"})]})}const z={metaInfo:{"zh-CN":"按钮分为：`small`、`middle`、`large` 三种尺寸。\n\n","en-US":"按钮分为：`small`、`middle`、`large` 三种尺寸。\n\n"},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Button size="small" theme="primary" variant="solid">small</Button>
      <Button theme="primary" variant="solid">middle</Button>
      <Button size="large" theme="primary" variant="solid">large</Button>
    </Space>
  )
}
\`\`\`
`,cssName:"css-c7fcd8e7",relPath:"packages/core/src/button/__docs__/examples/size.md"};function x(e){const a=e;return n.jsx("svg",{...a,children:n.jsx("path",{d:"M705.6 124.9a8 8 0 0 0-11.6 7.2v64.2c0 5.5 2.9 10.6 7.5 13.6a352 352 0 0 1 62.2 49.8c32.7 32.8 58.4 70.9 76.3 113.3a355 355 0 0 1 27.9 138.7c0 48.1-9.4 94.8-27.9 138.7a356 356 0 0 1-76.3 113.3 353 353 0 0 1-113.2 76.4c-43.8 18.6-90.5 28-138.5 28s-94.7-9.4-138.5-28a353 353 0 0 1-113.2-76.4A356 356 0 0 1 184 650.4a355 355 0 0 1-27.9-138.7c0-48.1 9.4-94.8 27.9-138.7 17.9-42.4 43.6-80.5 76.3-113.3 19-19 39.8-35.6 62.2-49.8 4.7-2.9 7.5-8.1 7.5-13.6V132c0-6-6.3-9.8-11.6-7.2C178.5 195.2 82 339.3 80 506.3 77.2 745.1 272.5 943.5 511.2 944c239 .5 432.8-193.3 432.8-432.4 0-169.2-97-315.7-238.4-386.7M480 560h64c4.4 0 8-3.6 8-8V88c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8"})})}const l=m(x,{name:"poweroff",theme:"outlined"});function B(e){const a=e;return n.jsx("svg",{...a,children:n.jsx("path",{d:"M909.6 854.5 649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1S492.1 112 412 112s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6M570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4"})})}const i=m(B,{name:"search",theme:"outlined"});function g(e){const a=e;return n.jsx("svg",{...a,children:n.jsx("path",{d:"M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A342 342 0 0 1 755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8m756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.5 342.5 0 0 1 512.1 856a342.2 342.2 0 0 1-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 0 0-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 0 0-8-8.2"})})}const p=m(g,{name:"sync",theme:"outlined"});function N(){return n.jsxs("div",{children:[n.jsxs(o,{style:{marginBottom:16},children:[n.jsx(c,{content:"search",children:n.jsx(t,{icon:n.jsx(i,{}),shape:"circle",theme:"primary",variant:"solid"})}),n.jsx(t,{shape:"circle",theme:"primary",variant:"solid",children:"A"}),n.jsx(t,{icon:n.jsx(i,{}),theme:"primary",variant:"solid",children:"Search"}),n.jsx(c,{content:"search",children:n.jsx(t,{icon:n.jsx(i,{}),shape:"circle"})}),n.jsx(t,{icon:n.jsx(i,{}),children:"Search"})]}),n.jsxs(o,{children:[n.jsx(c,{content:"search",children:n.jsx(t,{icon:n.jsx(i,{}),shape:"circle"})}),n.jsx(t,{icon:n.jsx(i,{}),children:"Search"}),n.jsx(c,{content:"search",children:n.jsx(t,{icon:n.jsx(i,{}),shape:"circle",variant:"dashed"})}),n.jsx(t,{icon:n.jsx(i,{}),variant:"dashed",children:"Search"}),n.jsx(t,{href:"https://www.google.com",icon:n.jsx(i,{}),target:"_blank"})]})]})}const T={metaInfo:{"zh-CN":`使用图标按钮。

`,"en-US":`Use icon button.

`},rawText:`\`\`\`tsx
import { Button, Space, Tooltip } from '@mink-ui/core'
import { SearchOutlined } from '@mink-ui/icons'

export default function App() {
  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Tooltip content="search">
          <Button icon={<SearchOutlined />} shape="circle" theme="primary" variant="solid" />
        </Tooltip>
        <Button shape="circle" theme="primary" variant="solid">
          A
        </Button>
        <Button icon={<SearchOutlined />} theme="primary" variant="solid">
          Search
        </Button>
        <Tooltip content="search">
          <Button icon={<SearchOutlined />} shape="circle" />
        </Tooltip>
        <Button icon={<SearchOutlined />}>Search</Button>
      </Space>
      <Space>
        <Tooltip content="search">
          <Button icon={<SearchOutlined />} shape="circle" />
        </Tooltip>
        <Button icon={<SearchOutlined />}>Search</Button>
        <Tooltip content="search">
          <Button icon={<SearchOutlined />} shape="circle" variant="dashed" />
        </Tooltip>
        <Button icon={<SearchOutlined />} variant="dashed">
          Search
        </Button>
        <Button href="https://www.google.com" icon={<SearchOutlined />} target="_blank" />
      </Space>
    </div>
  )
}
\`\`\`
`,cssName:"css-dd289e0c",relPath:"packages/core/src/button/__docs__/examples/icon.md"};function _(){const[e,a]=h.useState([]),r=d=>{console.log("Start loading:",d),a(u=>{const s=[...u];return s[d]=!0,s}),setTimeout(()=>{a(u=>{const s=[...u];return s[d]=!1,s})},3e3)};return n.jsxs("div",{children:[n.jsxs(o,{style:{marginBottom:16},children:[n.jsx(t,{loading:{delay:600},theme:"primary",variant:"solid",children:"Loading"}),n.jsx(t,{loading:!0,size:"small",theme:"primary",variant:"solid",children:"Loading"}),n.jsx(t,{loading:!0,icon:n.jsx(l,{}),theme:"primary",variant:"solid"}),n.jsx(t,{loading:{icon:n.jsx(p,{className:"mink-spin"})},theme:"primary",variant:"solid",children:"Loading Icon"})]}),n.jsxs(o,{children:[n.jsx(t,{loading:e[0],theme:"primary",variant:"solid",onClick:()=>r(0),children:"Icon Start"}),n.jsx(t,{iconPlacement:"end",loading:e[2],theme:"primary",variant:"solid",onClick:()=>r(2),children:"Icon End"}),n.jsx(t,{icon:n.jsx(l,{}),loading:e[1],theme:"primary",variant:"solid",onClick:()=>r(1),children:"Icon Replace"}),n.jsx(t,{icon:n.jsx(l,{}),loading:e[3],theme:"primary",variant:"solid",onClick:()=>r(3)}),n.jsx(t,{icon:n.jsx(l,{}),loading:e[3]&&{icon:n.jsx(p,{className:"mink-spin"})},variant:"link",onClick:()=>r(3),children:"Loading Icon"})]})]})}const O={metaInfo:{"zh-CN":`添加 loading 属性即可让按钮处于加载状态，loading.icon 可以自定义加载图标，最后三个按钮演示点击后进入加载状态。

`,"en-US":`添加 loading 属性即可让按钮处于加载状态，loading.icon 可以自定义加载图标，最后三个按钮演示点击后进入加载状态。 en-US

`},rawText:`\`\`\`tsx
import { useState } from 'react'
import { Button, Space } from '@mink-ui/core'
import PoweroffOutlined from '@mink-ui/icons/PoweroffOutlined'
import SyncOutlined from '@mink-ui/icons/SyncOutlined'

export default function App() {
  const [loadings, setLoadings] = useState([])

  const enterLoading = (index: number) => {
    console.log('Start loading:', index)

    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        return newLoadings
      })
    }, 3000)
  }

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button loading={{ delay: 600 }} theme="primary" variant="solid">
          Loading
        </Button>
        <Button loading size="small" theme="primary" variant="solid">
          Loading
        </Button>
        <Button loading icon={<PoweroffOutlined />} theme="primary" variant="solid" />
        <Button
          loading={{ icon: <SyncOutlined className="mink-spin" /> }}
          theme="primary"
          variant="solid"
        >
          Loading Icon
        </Button>
      </Space>
      <Space>
        <Button
          loading={loadings[0]}
          theme="primary"
          variant="solid"
          onClick={() => enterLoading(0)}
        >
          Icon Start
        </Button>
        <Button
          iconPlacement="end"
          loading={loadings[2]}
          theme="primary"
          variant="solid"
          onClick={() => enterLoading(2)}
        >
          Icon End
        </Button>
        <Button
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          theme="primary"
          variant="solid"
          onClick={() => enterLoading(1)}
        >
          Icon Replace
        </Button>
        <Button
          icon={<PoweroffOutlined />}
          loading={loadings[3]}
          theme="primary"
          variant="solid"
          onClick={() => enterLoading(3)}
        />
        <Button
          icon={<PoweroffOutlined />}
          loading={loadings[3] && { icon: <SyncOutlined className="mink-spin" /> }}
          variant="link"
          onClick={() => enterLoading(3)}
        >
          Loading Icon
        </Button>
      </Space>
    </div>
  )
}
\`\`\`
`,cssName:"css-99c05800",relPath:"packages/core/src/button/__docs__/examples/loading.md"};function f(e){return`${e.charAt(0).toUpperCase()}${e.slice(1)}`}function U(){return n.jsx(n.Fragment,{children:["solid","outlined","dashed","filled","text","link"].map(e=>n.jsx("div",{style:{marginBottom:16},children:n.jsx(o,{styles:{item:{minWidth:120,textAlign:"center"}},wrap:!0,children:["primary","success","warning","danger","info"].map(a=>n.jsx(t,{theme:a,variant:e,children:f(e)},a))})},e))})}const P={metaInfo:{"zh-CN":"按钮分为：`danger` `primary` `success` `warning` `info` 五种状态。\n\n","en-US":"按钮分为：`danger` `primary` `success` `warning` `info` 五种状态。\n\n"},rawText:`\`\`\`tsx
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
              <Button key={theme} theme={theme} variant={variant}>
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
`,cssName:"css-df303810",relPath:"packages/core/src/button/__docs__/examples/status.md"};function I(){return n.jsxs(o,{orientation:"vertical",children:[n.jsx(t,{block:!0,theme:"primary",variant:"solid",children:"Primary"}),n.jsx(t,{block:!0,children:"Default"}),n.jsx(t,{block:!0,variant:"dashed",children:"Dashed"}),n.jsx(t,{block:!0,disabled:!0,children:"disabled"}),n.jsx(t,{block:!0,variant:"text",children:"text"}),n.jsx(t,{block:!0,variant:"link",children:"Link"})]})}const A={metaInfo:{"zh-CN":`block

`,"en-US":`block en-US

`},rawText:`\`\`\`tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space orientation="vertical">
      <Button block theme="primary" variant="solid">
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
`,cssName:"css-58b7a043",relPath:"packages/core/src/button/__docs__/examples/block.md"},M=[{name:"ref",type:"React.Ref<HTMLButtonElement>","zh-CN":"`button` 或 `a` 元素的引用","en-US":"The ref of the `button` or `a` element"},{name:"block",type:"boolean","zh-CN":"占据一行","en-US":"Take up the whole line"},{name:"disabled",type:"boolean","zh-CN":"是否禁用","en-US":"Whether to disable"},{name:"ghost",type:"boolean","zh-CN":"幽灵按钮","en-US":"Ghost button"},{name:"icon",type:"React.ReactNode","zh-CN":"按钮图标","en-US":"Button icon"},{name:"loading",enum:!0,type:["boolean","{ delay: number }"],"zh-CN":"加载中","en-US":"Loading"},{name:"shape",enum:!0,type:["round","default","circle"],defaultValue:"default","zh-CN":"按钮形状","en-US":"Button shape"},{name:"size",enum:!0,type:["small","middle","large"],defaultValue:"middle","zh-CN":"按钮尺寸","en-US":"Button size"},{name:"theme",enum:!0,type:["danger","primary","success","warning","info"],defaultValue:"primary","zh-CN":"按钮主题","en-US":"Button theme"},{name:"variant",enum:!0,type:["solid","outlined","dashed","filled","text","link"],defaultValue:"outlined","zh-CN":"按钮风格","en-US":"Button variant"},{name:"onClick",type:"(event: React.MouseEvent<HTMLButtonElement>) => void","zh-CN":"点击事件","en-US":"Click event"},{name:"children",type:"React.ReactNode","zh-CN":"按钮内容","en-US":"Button content"},{name:"...",type:"HasSemanticsStyled<'root' | 'icon' | 'text', ButtonProps>","zh-CN":"语义化样式","en-US":"Semantics styles"}],$=[{name:"size",enum:!0,type:["small","middle","large"],"zh-CN":"按钮尺寸","en-US":"Button size"},{name:"...",type:"HasSemanticsStyled<'root' | 'icon' | 'text', ButtonProps>","zh-CN":"语义化样式","en-US":"Semantics styles"}];export{k as A,b as M,M as P,w as a,C as b,z as c,L as d,T as e,N as f,O as g,_ as h,P as i,U as j,A as k,I as l,$ as m};
