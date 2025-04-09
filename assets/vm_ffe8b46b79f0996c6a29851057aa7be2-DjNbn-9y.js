import{j as t,r as l}from"./index-BSL2Y7Mz.js";import{B as n}from"./index-Deg6KEoO.js";import{T as e}from"./index-Bw_-ueGA.js";import{S as p}from"./index-BjgGRY4R.js";function m(){return t.jsx(e,{content:"prompt text",children:t.jsx("span",{children:"Tooltip will show on mouse enter."})})}const x={desc:{"zh-CN":`基础用法

`,"en-US":`基础用法

`},rawText:`\`\`\`tsx
import { Tooltip } from '@mink-ui/core'

export default function App() {
  return (
    <Tooltip content="prompt text">
      <span>Tooltip will show on mouse enter.</span>
    </Tooltip>
  )
}
\`\`\`
`,cssWrapName:"css2400e7600583a4d59793698dc49593bf"};function w(){return t.jsx("div",{style:{width:"100%",height:"300px",overflow:"auto"},children:t.jsx("div",{style:{width:"300vw",height:"300vh",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx(e,{content:"popup text popup text popup text popup text popup text popup text",isOpen:!0,children:t.jsx(n,{variant:"filled",children:"Scroll The Window"})})})})}const u={desc:{"zh-CN":`当 Tooltip 贴边时，自动偏移并且调整箭头位置。当超出过多时，则一同滚出屏幕。

`,"en-US":`当 Tooltip 贴边时，自动偏移并且调整箭头位置。当超出过多时，则一同滚出屏幕。

`},rawText:`\`\`\`tsx
import { Button, Tooltip } from '@mink-ui/core'
import { useEffect, } from 'react'

export default function App() {
  return (
    <div
      style={{
        width: '100%',
        height: '300px',
        overflow: 'auto'
      }}
    >
      <div
        style={{
          width: '300vw',
          height: '300vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Tooltip content="popup text popup text popup text popup text popup text popup text" isOpen>
          <Button variant="filled">Scroll The Window</Button>
        </Tooltip>
      </div>
    </div>
  )
}
\`\`\`
`,cssWrapName:"css955c8a750ec77d9880512994602f255d"},i=t.jsxs("div",{children:[t.jsx("div",{children:"content text"}),t.jsx("div",{children:"content text"})]});function f(){const[r,s]=l.useState("Show"),o=l.useMemo(()=>r==="Hide"?!1:r==="Show"?!0:{pointAtCenter:!0},[r]);return t.jsxs("div",{children:[t.jsx("div",{children:t.jsx(p,{value:r,options:["Show","Hide","Center"],onChange:s,style:{marginBottom:24}})}),t.jsxs("div",{children:[t.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[t.jsx(e,{placement:"topLeft",content:i,arrow:o,children:t.jsx(n,{style:{margin:4,width:80},children:"TL"})}),t.jsx(e,{placement:"top",content:i,arrow:o,children:t.jsx(n,{style:{margin:4,width:80},children:"Top"})}),t.jsx(e,{placement:"topRight",content:i,arrow:o,children:t.jsx(n,{style:{margin:4,width:80},children:"TR"})})]}),t.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[t.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[t.jsx(e,{placement:"leftTop",content:i,arrow:o,children:t.jsx(n,{style:{margin:4,width:80},children:"LT"})}),t.jsx(e,{placement:"left",content:i,arrow:o,children:t.jsx(n,{style:{margin:4,width:80},children:"Left"})}),t.jsx(e,{placement:"leftBottom",content:i,arrow:o,children:t.jsx(n,{style:{margin:4,width:80},children:"LB"})})]}),t.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[t.jsx(e,{placement:"rightTop",content:i,arrow:o,children:t.jsx(n,{style:{margin:4,width:80},children:"RT"})}),t.jsx(e,{placement:"right",content:i,arrow:o,children:t.jsx(n,{style:{margin:4,width:80},children:"Right"})}),t.jsx(e,{placement:"rightBottom",content:i,arrow:o,children:t.jsx(n,{style:{margin:4,width:80},children:"RB"})})]})]}),t.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[t.jsx(e,{placement:"bottomLeft",content:i,arrow:o,children:t.jsx(n,{style:{margin:4,width:80},children:"BL"})}),t.jsx(e,{placement:"bottom",content:i,arrow:o,children:t.jsx(n,{style:{margin:4,width:80},children:"Bottom"})}),t.jsx(e,{placement:"bottomRight",content:i,arrow:o,children:t.jsx(n,{style:{margin:4,width:80},children:"BR"})})]})]})]})}const g={desc:{"zh-CN":`位置有 12 个方向。

`,"en-US":`位置有 12 个方向。

`},rawText:`\`\`\`tsx
import { Button, Segmented, Space, Tooltip } from '@mink-ui/core'
import { useMemo, useState } from 'react'

const text = (
  <div>
    <div>content text</div>
    <div>content text</div>
  </div>
)

export default function App() {
  const [arrow, setArrow] = useState<'Center' | 'Hide' | 'Show'>('Show')

  const arrowConfig = useMemo(() => {
    if (arrow === 'Hide') {
      return false
    }

    if (arrow === 'Show') {
      return true
    }

    return {
      pointAtCenter: true,
    }
  }, [arrow])
  return (
    <div>
      <div>
        <Segmented
          value={arrow}
          options={['Show', 'Hide', 'Center']}
          onChange={setArrow}
          style={{ marginBottom: 24 }}
        />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip placement="topLeft" content={text} arrow={arrowConfig}>
            <Button style={{ margin: 4, width: 80 }}>TL</Button>
          </Tooltip>
          <Tooltip placement="top" content={text} arrow={arrowConfig}>
            <Button style={{ margin: 4, width: 80 }}>Top</Button>
          </Tooltip>
          <Tooltip placement="topRight" content={text} arrow={arrowConfig}>
            <Button style={{ margin: 4, width: 80 }}>TR</Button>
          </Tooltip>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tooltip placement="leftTop" content={text} arrow={arrowConfig}>
              <Button style={{ margin: 4, width: 80 }}>LT</Button>
            </Tooltip>
            <Tooltip placement="left" content={text} arrow={arrowConfig}>
              <Button style={{ margin: 4, width: 80 }}>Left</Button>
            </Tooltip>
            <Tooltip placement="leftBottom" content={text} arrow={arrowConfig}>
              <Button style={{ margin: 4, width: 80 }}>LB</Button>
            </Tooltip>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tooltip placement="rightTop" content={text} arrow={arrowConfig}>
              <Button style={{ margin: 4, width: 80 }}>RT</Button>
            </Tooltip>
            <Tooltip placement="right" content={text} arrow={arrowConfig}>
              <Button style={{ margin: 4, width: 80 }}>Right</Button>
            </Tooltip>
            <Tooltip placement="rightBottom" content={text} arrow={arrowConfig}>
              <Button style={{ margin: 4, width: 80 }}>RB</Button>
            </Tooltip>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip placement="bottomLeft" content={text} arrow={arrowConfig}>
            <Button style={{ margin: 4, width: 80 }}>BL</Button>
          </Tooltip>
          <Tooltip placement="bottom" content={text} arrow={arrowConfig}>
            <Button style={{ margin: 4, width: 80 }}>Bottom</Button>
          </Tooltip>
          <Tooltip placement="bottomRight" content={text} arrow={arrowConfig}>
            <Button style={{ margin: 4, width: 80 }}>BR</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
\`\`\`
`,cssWrapName:"cssc3d382dfd03199886f2d20b4fd529d1f"};export{m as A,u as a,w as b,g as c,f as d,x as i};
