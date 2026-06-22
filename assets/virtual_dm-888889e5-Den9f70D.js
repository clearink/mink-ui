import{j as e,r as s}from"./index-D2XA0yST.js";import{B as i}from"./index-CdUc7RmQ.js";import{T as n}from"./index-CWi4WiNE.js";import{S as l}from"./index-DTfwJAAa.js";function S(){return e.jsx(n,{content:"prompt text",children:e.jsx("span",{children:"Tooltip will show on mouse enter."})})}const N={metaInfo:{"zh-CN":`最简单的用法，鼠标悬停即可显示 Tooltip。

`,"en-US":`The simplest usage. Tooltip shows on hover.

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
`,cssName:"css-c49593bf",relPath:"packages/core/src/tooltip/__docs__/examples/basic.md"},d=["topLeft","top","topRight"],u=["bottomLeft","bottom","bottomRight"],f=["leftTop","left","leftBottom"],g=["rightTop","right","rightBottom"];function b(){return e.jsxs("div",{className:"placement-grid",children:[e.jsx("div",{className:"placement-row",children:d.map(t=>e.jsx(n,{content:t,placement:t,children:e.jsx(i,{theme:"info",children:t})},t))}),e.jsxs("div",{className:"placement-row",children:[e.jsx("div",{className:"placement-side",children:f.map(t=>e.jsx(n,{content:t,placement:t,children:e.jsx(i,{theme:"info",children:t})},t))}),e.jsx("div",{className:"placement-center"}),e.jsx("div",{className:"placement-side",children:g.map(t=>e.jsx(n,{content:t,placement:t,children:e.jsx(i,{theme:"info",children:t})},t))})]}),e.jsx("div",{className:"placement-row",children:u.map(t=>e.jsx(n,{content:t,placement:t,children:e.jsx(i,{theme:"info",children:t})},t))})]})}const j={metaInfo:{"zh-CN":"通过 `placement` 属性设置 Tooltip 的弹出位置，支持 12 个方向。\n\n","en-US":"Set the popup position with the `placement` attribute. There are 12 placement options available.\n\n"},rawText:`\`\`\`tsx
import { Button, Tooltip } from '@mink-ui/core'

const topPlacements = ['topLeft', 'top', 'topRight'] as const
const bottomPlacements = ['bottomLeft', 'bottom', 'bottomRight'] as const
const leftPlacements = ['leftTop', 'left', 'leftBottom'] as const
const rightPlacements = ['rightTop', 'right', 'rightBottom'] as const

export default function App() {
  return (
    <div className="placement-grid">
      <div className="placement-row">
        {topPlacements.map(placement => (
          <Tooltip key={placement} content={placement} placement={placement}>
            <Button theme="info">{placement}</Button>
          </Tooltip>
        ))}
      </div>
      <div className="placement-row">
        <div className="placement-side">
          {leftPlacements.map(placement => (
            <Tooltip key={placement} content={placement} placement={placement}>
              <Button theme="info">{placement}</Button>
            </Tooltip>
          ))}
        </div>
        <div className="placement-center" />
        <div className="placement-side">
          {rightPlacements.map(placement => (
            <Tooltip key={placement} content={placement} placement={placement}>
              <Button theme="info">{placement}</Button>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="placement-row">
        {bottomPlacements.map(placement => (
          <Tooltip key={placement} content={placement} placement={placement}>
            <Button theme="info">{placement}</Button>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
\`\`\``,cssName:"css-fd529d1f",relPath:"packages/core/src/tooltip/__docs__/examples/placement.md"};function k(){return e.jsxs(l,{children:[e.jsx(n,{content:"hover trigger",trigger:"hover",children:e.jsx("span",{children:"Hover me"})}),e.jsx(n,{content:"click trigger",trigger:"click",children:e.jsx("span",{children:"Click me"})}),e.jsx(n,{content:"focus trigger",trigger:"focus",children:e.jsx("input",{placeholder:"Focus me"})}),e.jsx(n,{content:"contextMenu trigger",trigger:"contextMenu",children:e.jsx("span",{children:"Right-click me"})})]})}const z={metaInfo:{"zh-CN":"通过 `trigger` 属性设置触发方式，支持 `hover`、`click`、`focus`、`contextMenu`，也可传入数组组合多种触发方式。\n\n","en-US":"Set the trigger mode with the `trigger` attribute. Supports `hover`, `click`, `focus`, `contextMenu`, or an array of them.\n\n"},rawText:`\`\`\`tsx
import { Space, Tooltip } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Tooltip content="hover trigger" trigger="hover">
        <span>Hover me</span>
      </Tooltip>
      <Tooltip content="click trigger" trigger="click">
        <span>Click me</span>
      </Tooltip>
      <Tooltip content="focus trigger" trigger="focus">
        <input placeholder="Focus me" />
      </Tooltip>
      <Tooltip content="contextMenu trigger" trigger="contextMenu">
        <span>Right-click me</span>
      </Tooltip>
    </Space>
  )
}
\`\`\`
`,cssName:"css-b46988ab",relPath:"packages/core/src/tooltip/__docs__/examples/trigger.md"};function U(){return e.jsxs(l,{children:[e.jsx(n,{arrow:!0,content:"with arrow",placement:"topLeft",children:e.jsx("span",{children:"Show arrow"})}),e.jsx(n,{arrow:!1,content:"without arrow",placement:"topLeft",children:e.jsx("span",{children:"Hide arrow"})}),e.jsx(n,{arrow:{pointAtCenter:!0},content:"arrow points at center",placement:"topLeft",children:e.jsx("span",{children:"Center arrow"})})]})}const P={metaInfo:{"zh-CN":"通过 `arrow` 属性控制箭头的显示与对齐方式。设为 `false` 隐藏箭头，设为 `{ pointAtCenter: true }` 让箭头指向目标元素中心。\n\n","en-US":"Use the `arrow` attribute to control arrow display and alignment. Set to `false` to hide the arrow, or `{ pointAtCenter: true }` to center the arrow on the target element.\n\n"},rawText:`\`\`\`tsx
import { Space, Tooltip } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Tooltip arrow content="with arrow" placement="topLeft">
        <span>Show arrow</span>
      </Tooltip>
      <Tooltip arrow={false} content="without arrow" placement="topLeft">
        <span>Hide arrow</span>
      </Tooltip>
      <Tooltip arrow={{ pointAtCenter: true }} content="arrow points at center" placement="topLeft">
        <span>Center arrow</span>
      </Tooltip>
    </Space>
  )
}
\`\`\`
`,cssName:"css-04c76625",relPath:"packages/core/src/tooltip/__docs__/examples/arrow.md"};function A(){const t=s.useRef(null),a=s.useRef(null);return s.useEffect(()=>{const o=t.current,r=a.current;!o||!r||(o.scrollTop=(r.scrollHeight-o.clientHeight)/2,o.scrollLeft=(r.scrollWidth-o.clientWidth)/2)},[]),e.jsx("div",{ref:t,style:{position:"relative",overflow:"auto",height:300,width:"100%"},children:e.jsx("div",{ref:a,style:{width:"300vw",height:"300vh",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(n,{isOpen:!0,content:"Tooltip Content",getContainer:t,children:e.jsx(i,{variant:"solid",children:"Scroll The Window"})})})})}const B={metaInfo:{"zh-CN":`当 Tooltip 贴边时，自动偏移并且调整箭头位置。当超出过多时，则一同滚出屏幕。

`,"en-US":`当 Tooltip 贴边时，自动偏移并且调整箭头位置。当超出过多时，则一同滚出屏幕。

`},rawText:`\`\`\`tsx
import { useEffect, useRef } from 'react'
import { Button, Tooltip } from '@mink-ui/core'

export default function App() {
  const $container = useRef<HTMLDivElement>(null)
  const $content = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = $container.current
    const content = $content.current

    if (!container || !content) return

    container.scrollTop = (content.scrollHeight - container.clientHeight) / 2
    container.scrollLeft = (content.scrollWidth - container.clientWidth) / 2
  }, [])

  return (
    <div
      ref={$container}
      style={{
        position: 'relative',
        overflow: 'auto',
        height: 300,
        width: '100%'
      }}
    >
      <div
        ref={$content}
        style={{
          width: '300vw',
          height: '300vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Tooltip isOpen content="Tooltip Content" getContainer={$container}>
          <Button variant="solid">Scroll The Window</Button>
        </Tooltip>
      </div>
    </div>
  )
}
\`\`\`
`,cssName:"css-602f255d",relPath:"packages/core/src/tooltip/__docs__/examples/adjust.md"},x=e.jsx("div",{children:"This is hover content."}),v=e.jsx("div",{children:"This is click content."});function R(){const[t,a]=s.useState(!1),[o,r]=s.useState(!1),p=()=>{a(!1),r(!1)},h=c=>{r(c),a(!1)},m=c=>{r(!1),a(c)};return e.jsx(n,{style:{width:200,textAlign:"center"},content:x,isOpen:o,trigger:"hover",onIsOpenChange:h,children:e.jsx(n,{style:{width:200,textAlign:"center"},content:e.jsxs("div",{children:[v,e.jsx(i,{size:"small",onClick:p,children:"Close"})]}),isOpen:t,trigger:"click",onIsOpenChange:m,children:e.jsx(i,{children:"Hover and click"})})})}const _={metaInfo:{"zh-CN":`Tooltip 嵌套时。

`,"en-US":`Tooltip 嵌套时。

`},rawText:`\`\`\`tsx
import { useState } from 'react'
import { Button, Tooltip } from '@mink-ui/core'

const hoverContent = <div>This is hover content.</div>

const clickContent = <div>This is click content.</div>

export default function App() {
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  const hide = () => {
    setClicked(false)
    setHovered(false)
  }

  const handleHoverChange = (open: boolean) => {
    setHovered(open)
    setClicked(false)
  }

  const handleClickChange = (open: boolean) => {
    setHovered(false)
    setClicked(open)
  }

  return (
    <Tooltip
      style={{ width: 200, textAlign: 'center' }}
      content={hoverContent}
      isOpen={hovered}
      trigger="hover"
      onIsOpenChange={handleHoverChange}
    >
      <Tooltip
        style={{ width: 200, textAlign: 'center' }}
        content={(
          <div>
            {clickContent}
            <Button size="small" onClick={hide}>Close</Button>
          </div>
        )}
        isOpen={clicked}
        trigger="click"
        onIsOpenChange={handleClickChange}
      >
        <Button>Hover and click</Button>
      </Tooltip>
    </Tooltip>
  )
}
\`\`\`
`,cssName:"css-a90366a2",relPath:"packages/core/src/tooltip/__docs__/examples/nested.md"},H=[{name:"children",type:"React.ReactElement","zh-CN":"触发元素","en-US":"Trigger element"},{name:"content",type:"React.ReactNode","zh-CN":"提示内容","en-US":"Tooltip content"},{name:"isOpen",type:"boolean","zh-CN":"是否打开（受控）","en-US":"Whether the tooltip is open (controlled)"},{name:"defaultIsOpen",type:"boolean","zh-CN":"默认是否打开","en-US":"Whether the tooltip is open by default"},{name:"placement",enum:!0,type:["top","topLeft","topRight","bottom","bottomLeft","bottomRight","left","leftTop","leftBottom","right","rightTop","rightBottom"],defaultValue:"top","zh-CN":"弹出位置","en-US":"Popup placement"},{name:"trigger",enum:!0,type:["hover","click","focus","contextMenu"],defaultValue:"hover","zh-CN":"触发方式，支持数组组合多种方式","en-US":"Trigger mode, supports array for multiple modes"},{name:"arrow",type:"boolean | { pointAtCenter: boolean }",defaultValue:"true","zh-CN":"箭头配置，设为 false 隐藏箭头，设为 { pointAtCenter: true } 箭头指向目标中心","en-US":"Arrow config, set to false to hide, set to { pointAtCenter: true } to center the arrow"},{name:"flip",type:"boolean | Partial<Record<'horizontal' | 'vertical', boolean>>",defaultValue:"true","zh-CN":"贴边翻转，当弹出层超出视口时自动翻转到对侧","en-US":"Edge flip, automatically flips to the opposite side when overflowing the viewport"},{name:"shift",type:"boolean | Partial<Record<'horizontal' | 'vertical', boolean>>",defaultValue:"true","zh-CN":"贴边偏移，当弹出层超出视口时自动移动到可视区域内","en-US":"Edge shift, automatically shifts into the viewport when overflowing"},{name:"offset",type:"[number, number] | number",defaultValue:"0","zh-CN":"弹出层偏移量，数组形式为 [水平, 垂直]","en-US":"Popup offset, array form is [horizontal, vertical]"},{name:"fresh",type:"boolean","zh-CN":"关闭后仍更新 tooltip 内容","en-US":"Update tooltip content even when closed"},{name:"openDelay",type:"number",defaultValue:"100","zh-CN":"打开延迟时间（毫秒）","en-US":"Open delay in milliseconds"},{name:"closeDelay",type:"number",defaultValue:"100","zh-CN":"关闭延迟时间（毫秒）","en-US":"Close delay in milliseconds"},{name:"transition",type:"CssTransitionProps['classNames']","zh-CN":"动画配置","en-US":"Transition config"},{name:"onIsOpenChange",type:"(isOpen: boolean) => void","zh-CN":"打开/关闭状态变化回调","en-US":"Callback when open state changes"},{name:"getContainer",type:"() => HTMLElement","zh-CN":"弹出层挂载容器，默认挂载到 body","en-US":"Mount container for the popup, defaults to body"},{name:"mountOnEnter",type:"boolean","zh-CN":"是否在首次显示时才挂载","en-US":"Whether to mount on first show"},{name:"unmountOnExit",type:"boolean","zh-CN":"是否在隐藏时卸载","en-US":"Whether to unmount when hidden"},{name:"zIndex",type:"number","zh-CN":"弹出层层级","en-US":"Z-index of the popup"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"classNames",type:"Record<'arrow' | 'root' | 'popup', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'arrow' | 'root' | 'popup', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}];export{S as A,N as M,H as P,j as a,b,z as c,k as d,P as e,U as f,B as g,A as h,_ as i,R as j};
