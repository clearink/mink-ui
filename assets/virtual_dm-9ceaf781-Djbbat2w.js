import{e as E,a as z,c as N,i as T,f as h,r as _,b as M,d as O,o as D,j as e,C as U}from"./index-Gl7_0Ams.js";import{M as a}from"./index-D3KBkm6H.js";import{C as x}from"./index-bruDC31T.js";import{P as C}from"./index-Dsii8orU.js";import{c as R}from"./children-CrS9bith.js";import{m as Q,n as F}from"./status-c9vlYJ86.js";import{u as H,B as V}from"./index-71h4mSUq.js";import{S as v}from"./index-DmLzjMra.js";import{P as W,a as X}from"./virtual_dm-60d613bb-BaLw3neP.js";const q=E()(["prefixCls","className","classNames","style","styles","closeIcon","closable","ref","type","message","description","action","banner","icon","showIcon","onClose","onClosed"]);function G(n,r){const{type:c}=n,{banner:l,description:o,prefixCls:t}=r,s=z("alert",t);return{ns:s,classNames:{root:N(s,{[`${s}--as-banner`]:l,[`${s}--${c}`]:c,[`${s}--has-description`]:!T(o)}),statusIcon:`${s}__status-icon`,closeBtn:`${s}__close-btn`,content:`${s}__content`,message:`${s}__message`,description:`${s}__description`,action:`${s}__action`}}}function J(n){const r=H("alert"),{ref:c,type:l=h(n.type,n.banner?"warning":"info"),showIcon:o=h(n.showIcon,!!n.banner),onClose:t}=n,s=n,p={type:l,showIcon:o},j=_.useRef(null),[y,g]=M(!0),{ns:I,classNames:d}=G(p,s),[f,w]=O([r.classNames,{root:r.className},d,s.classNames,{root:s.className}],[r.styles,{root:r.style},s.styles,{root:s.style}]),b=D(n,q),A=()=>{t?.(),g(!1)};return _.useImperativeHandle(c,()=>({nativeElement:j.current})),{picked:p,omitted:s,ns:I,cssNames:f,cssAttrs:w,restAttrs:b,globalConfig:r,visible:y,handleCloseOnClick:A}}function S(n){const{picked:r,omitted:c,ns:l,cssNames:o,cssAttrs:t,restAttrs:s,globalConfig:p,visible:j,handleCloseOnClick:y}=J(n),{showIcon:g,type:I}=r,{description:d,action:f,message:w,icon:b,closable:A,closeIcon:$,onClosed:k}=c,B=()=>{if(!g)return null;const i=b??Q(I);return R(i,{fallback:e.jsx("span",{className:o.statusIcon,style:t.statusIcon,children:i}),transform:m=>({className:N(m.className,o.statusIcon),style:{...m.style,...t.statusIcon}})})},P=()=>{const{closeIcon:i}=F({currentState:{closable:A,closeIcon:$},contextState:{closable:p.closable,closeIcon:p.closeIcon},defaultState:{closeIconRender:m=>e.jsx("button",{className:o.closeBtn,style:t.closeBtn,tabIndex:0,type:"button",onClick:y,children:m})}});return i};return e.jsx(U,{classNames:`${l}-motion`,unmountOnExit:!0,timeouts:{appear:0,enter:0},when:j,onExit:i=>({height:i.getBoundingClientRect().height}),onExited:()=>{k?.()},onExiting:()=>({height:0}),children:(i,m)=>e.jsxs("div",{...s,ref:i,className:N(o.root,m.names()),style:{...t.root,...m.attrs()},children:[B(),e.jsxs("div",{className:o.content,style:t.content,children:[e.jsx("div",{className:o.message,style:t.message,children:w}),!T(d)&&e.jsx("div",{className:o.description,style:t.description,children:d})]}),!T(f)&&e.jsx("div",{className:o.action,style:t.action,children:f}),P()]})})}class K extends _.Component{state={error:null,errorInfo:null};componentDidCatch(r,c){this.setState({error:r,errorInfo:c})}render(){const{message:r,description:c,id:l,children:o}=this.props,{error:t,errorInfo:s}=this.state;return t?e.jsx(S,{description:e.jsx("pre",{style:{fontSize:"0.9em",overflowX:"auto",margin:0},children:h(c,s?.componentStack)}),id:l,message:h(r,`${t||""}`),type:"error"}):o}}const u=Object.assign(S,{ErrorBoundary:K});function L(){return e.jsx(u,{showIcon:!0,message:"Success Text",type:"info"})}const Y={metaInfo:{"zh-CN":`警告提示，展现需要关注的信息，适用于简短的警告提示。

`,"en-US":`警告提示，展现需要关注的信息，适用于简短的警告提示。

xxx en

`},rawText:`\`\`\`tsx
import { Alert } from '@mink-ui/core'

function App() {
  return (
    <Alert showIcon message="Success Text" type="info" />
  )
}

export default App
\`\`\`
`,cssName:"css-05ccb863",relativePath:"packages/core/src/alert/__docs__/examples/basic.md"};function Z(){return e.jsx(v,{orientation:"vertical",children:["info","success","warning","error"].map(n=>e.jsx(u,{showIcon:!0,message:`${n} Text`,type:n},n))})}const ee={metaInfo:{"zh-CN":`警告提示，展现需要关注的信息，适用于简短的警告提示。

`,"en-US":`警告提示，展现需要关注的信息，适用于简短的警告提示。

xxx en

`},rawText:`\`\`\`tsx
import { Alert, Space } from '@mink-ui/core'

function App() {
  return (
    <Space orientation="vertical">
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert key={type} showIcon message={\`\${type} Text\`} type={type} />
      ))}
    </Space>
  )
}

export default App
\`\`\`
`,cssName:"css-c84540eb",relativePath:"packages/core/src/alert/__docs__/examples/type.md"};function ne(){return e.jsx("div",{children:["info","success","warning","error"].map(n=>e.jsx(u,{style:{marginBottom:8},closable:!0,showIcon:!0,message:`${n} Text`,type:n},n))})}const se={metaInfo:{"zh-CN":`可关闭

`,"en-US":`xxx en

`},rawText:`\`\`\`tsx
import { Alert, Space } from '@mink-ui/core'

function App() {
  return (
    <div>
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert
          key={type}
          style={{ marginBottom: 8 }}
          closable
          showIcon
          message={\`\${type} Text\`}
          type={type}
        />
      ))}
    </div>
  )
}

export default App
\`\`\`
`,cssName:"css-3c7bac65",relativePath:"packages/core/src/alert/__docs__/examples/closable.md"};function te(){return e.jsx(v,{orientation:"vertical",children:["info","success","warning","error"].map(n=>e.jsx(u,{showIcon:!0,description:"Description text",message:`${n} Text`,type:n},n))})}const oe={metaInfo:{"zh-CN":`描述

`,"en-US":`xxx en

`},rawText:`\`\`\`tsx
import { Alert, Space } from '@mink-ui/core'

function App() {
  return (
    <Space orientation="vertical">
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert
          key={type}
          showIcon
          description="Description text"
          message={\`\${type} Text\`}
          type={type}
        />
      ))}
    </Space>
  )
}

export default App
\`\`\`
`,cssName:"css-d86cb223",relativePath:"packages/core/src/alert/__docs__/examples/description.md"};function ae(){return e.jsx("div",{children:["info","success","warning","error"].map(n=>e.jsx(u,{style:{marginBottom:8},closable:!0,showIcon:!0,action:e.jsx(V,{size:"small",variant:"filled",children:"action"}),message:`${n} Text`,type:n},n))})}const re={metaInfo:{"zh-CN":"通过 `action` 可以自定义右上角操作项。\n\n","en-US":"通过 `action` 可以自定义右上角操作项。\n\n"},rawText:`\`\`\`tsx
import { Alert, Button, Space } from '@mink-ui/core'

function App() {
  return (
    <div>
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert
          key={type}
          style={{ marginBottom: 8 }}
          closable
          showIcon
          action={<Button size="small" variant="filled">action</Button>}
          message={\`\${type} Text\`}
          type={type}
        />
      ))}
    </div>
  )
}

export default App
\`\`\`
`,cssName:"css-cce2f937",relativePath:"packages/core/src/alert/__docs__/examples/action.md"};function he(){return e.jsxs("div",{className:"document-container",children:[e.jsx(a,{rawText:`## 何时使用

`}),e.jsx(a,{rawText:"随你"}),e.jsx(a,{rawText:`## 代码演示

`}),e.jsx(x,{...Y,title:"基本用法",element:e.jsx(L,{})}),e.jsx(x,{...ee,title:"不同类型",element:e.jsx(Z,{})}),e.jsx(x,{...se,title:"可关闭",element:e.jsx(ne,{})}),e.jsx(x,{...oe,title:"含有描述",element:e.jsx(te,{})}),e.jsx(x,{...re,title:"操作项",element:e.jsx(ae,{})}),e.jsx(a,{rawText:`## API

`}),e.jsx(a,{rawText:`### Alert Props

`}),e.jsx(C,{columns:W}),e.jsx(a,{rawText:`### Alert.ErrorBoundary Props

`}),e.jsx(C,{columns:X}),e.jsx(a,{rawText:`## Semantic DOM

`}),e.jsx(a,{rawText:`<semantic src="./examples/semantic.md" />

`}),e.jsx(a,{rawText:"TODO"}),e.jsx(a,{rawText:`## FAQ

`}),e.jsx(a,{rawText:`### Q1

`}),e.jsx(a,{rawText:"xxx"}),e.jsx(a,{rawText:`### Q2

`}),e.jsx(a,{rawText:`xxx
`})]})}export{he as default};
