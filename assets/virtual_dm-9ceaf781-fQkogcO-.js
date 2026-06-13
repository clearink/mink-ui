import{e as P,a as E,c as S,f as w,r as g,b as z,o as M,j as e,C as R}from"./index-BfznwktP.js";import{M as o}from"./index-Cuzsf05u.js";import{C as u}from"./index-pu6pPv76.js";import{P as v}from"./index-B4mDxQ3z.js";import{c as O}from"./children-s0jJ63z6.js";import{i as $,u as D,c as U,B as Q}from"./index-Bgr2oJWO.js";import{n as F,m as H}from"./closable-BSCfBtOs.js";import{S as k}from"./index-C4PgHaiP.js";import{P as V,a as W}from"./virtual_dm-60d613bb-DnoPlfWo.js";const X=P()(["prefixCls","className","classNames","style","styles","closable","ref","type","message","description","action","banner","icon","showIcon","onClose","onClosed"]);function q(n,r){const{type:a}=n,{banner:m,description:p,prefixCls:t}=r,s=E("alert",t);return{ns:s,classNames:{root:S(s,{[`${s}--as-banner`]:m,[`${s}--${a}`]:a,[`${s}--has-description`]:$(p)}),statusIcon:`${s}__status-icon`,closeBtn:`${s}__close-btn`,content:`${s}__content`,message:`${s}__message`,description:`${s}__description`,action:`${s}__action`}}}function G(n){const r=D("alert"),{ref:a,closable:m,onClose:p,onClosed:t,type:s=w(n.type,n.banner?"warning":"info"),showIcon:b=w(n.showIcon,!!n.banner)}=n,i=n,x={type:s,showIcon:b},f=g.useRef(null),[I,A]=g.useState(!0),{ns:T,classNames:h}=q(x,i),[j,N]=z([r.classNames,{root:r.className},h,i.classNames,{root:i.className}],[r.styles,{root:r.style},i.styles,{root:i.style}],{meta:{...i,...x}}),[y,_]=F({currentState:{closable:m},contextState:{closable:r.closable}}),C=M(n,X),c=()=>{A(!1),p?.(),y?.onClose?.()},l=()=>{t?.(),y?.onClosed?.()};return g.useImperativeHandle(a,()=>({nativeElement:f.current})),{picked:x,omitted:i,$element:f,ns:T,cssNames:j,cssAttrs:N,visible:I,closeIconRender:_,restAttrs:C,handleClose:c,handleClosed:l}}function B(n){const{picked:r,omitted:a,$element:m,ns:p,cssNames:t,cssAttrs:s,visible:b,closeIconRender:i,restAttrs:x,handleClose:f,handleClosed:I}=G(n),{showIcon:A,type:T}=r,{description:h,action:j,message:N,icon:y}=a,_=()=>{if(!A)return null;const c=y??H(T);return O(c,{fallback:e.jsx("span",{className:t.statusIcon,style:s.statusIcon,children:c}),transform:l=>({className:S(l.className,t.statusIcon),style:{...l.style,...s.statusIcon}})})},C=()=>i((c,l)=>e.jsx("button",{className:t.closeBtn,style:s.closeBtn,disabled:l,tabIndex:0,type:"button",onClick:f,children:c}));return e.jsx(R,{classNames:`${p}-motion`,unmountOnExit:!0,timeouts:{appear:0,enter:0},when:b,onExit:c=>({height:c.getBoundingClientRect().height}),onExited:I,onExiting:()=>({height:0}),children:(c,l)=>e.jsxs("div",{...x,ref:U(c,m),className:S(t.root,l.names()),style:{...s.root,...l.attrs()},children:[_(),e.jsxs("div",{className:t.content,style:s.content,children:[e.jsx("div",{className:t.message,style:s.message,children:N}),$(h)&&e.jsx("div",{className:t.description,style:s.description,children:h})]}),$(j)&&e.jsx("div",{className:t.action,style:s.action,children:j}),C()]})})}class J extends g.Component{state={error:null,errorInfo:null};componentDidCatch(r,a){this.setState({error:r,errorInfo:a})}render(){const{message:r,description:a,id:m,children:p}=this.props,{error:t,errorInfo:s}=this.state;return t?e.jsx(B,{description:e.jsx("pre",{style:{fontSize:"0.9em",overflowX:"auto",margin:0},children:w(a,s?.componentStack)}),id:m,message:w(r,`${t||""}`),type:"error"}):p}}const d=Object.assign(B,{ErrorBoundary:J});function K(){return e.jsx(d,{showIcon:!0,message:"Success Text",type:"success"})}const L={metaInfo:{"zh-CN":`警告提示，展现需要关注的信息，适用于简短的警告提示。

`,"en-US":`警告提示，展现需要关注的信息，适用于简短的警告提示。

xxx en

`},rawText:`\`\`\`tsx
import { Alert } from '@mink-ui/core'

function App() {
  return (
    <Alert showIcon message="Success Text" type="success" />
  )
}

export default App
\`\`\`
`,cssName:"css-05ccb863",relPath:"packages/core/src/alert/__docs__/examples/basic.md"};function Y(){return e.jsx(k,{orientation:"vertical",children:["info","success","warning","error"].map(n=>e.jsx(d,{showIcon:!0,message:`${n} Text`,type:n},n))})}const Z={metaInfo:{"zh-CN":`警告提示，展现需要关注的信息，适用于简短的警告提示。

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
`,cssName:"css-c84540eb",relPath:"packages/core/src/alert/__docs__/examples/type.md"};function ee(){return e.jsx("div",{children:["info","success","warning","error"].map(n=>e.jsx(d,{style:{marginBottom:8},closable:!0,showIcon:!0,message:`${n} Text`,type:n},n))})}const ne={metaInfo:{"zh-CN":`可关闭

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
`,cssName:"css-3c7bac65",relPath:"packages/core/src/alert/__docs__/examples/closable.md"};function se(){return e.jsx(k,{orientation:"vertical",children:["info","success","warning","error"].map(n=>e.jsx(d,{showIcon:!0,description:"Description text",message:`${n} Text`,type:n},n))})}const te={metaInfo:{"zh-CN":`描述

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
`,cssName:"css-d86cb223",relPath:"packages/core/src/alert/__docs__/examples/description.md"};function oe(){return e.jsx("div",{children:["info","success","warning","error"].map(n=>e.jsx(d,{style:{marginBottom:8},closable:!0,showIcon:!0,action:e.jsx(Q,{size:"small",variant:"solid",children:"action"}),message:`${n} Text`,type:n},n))})}const re={metaInfo:{"zh-CN":"通过 `action` 可以自定义右上角操作项。\n\n","en-US":"通过 `action` 可以自定义右上角操作项。\n\n"},rawText:`\`\`\`tsx
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
          action={<Button size="small" variant="solid">action</Button>}
          message={\`\${type} Text\`}
          type={type}
        />
      ))}
    </div>
  )
}

export default App
\`\`\`
`,cssName:"css-cce2f937",relPath:"packages/core/src/alert/__docs__/examples/action.md"};function fe(){return e.jsxs("div",{className:"document-container",children:[e.jsx(o,{rawText:`## 何时使用

`}),e.jsx(o,{rawText:"随你"}),e.jsx(o,{rawText:`## 代码演示

`}),e.jsx(u,{...L,title:"基本用法",element:e.jsx(K,{})}),e.jsx(u,{...Z,title:"不同类型",element:e.jsx(Y,{})}),e.jsx(u,{...ne,title:"可关闭",element:e.jsx(ee,{})}),e.jsx(u,{...te,title:"含有描述",element:e.jsx(se,{})}),e.jsx(u,{...re,title:"操作项",element:e.jsx(oe,{})}),e.jsx(o,{rawText:`## API

`}),e.jsx(o,{rawText:`### Alert Props

`}),e.jsx(v,{columns:V}),e.jsx(o,{rawText:`### Alert.ErrorBoundary Props

`}),e.jsx(v,{columns:W}),e.jsx(o,{rawText:`## Semantic DOM

`}),e.jsx(o,{rawText:`<semantic src="./examples/semantic.md" />

`}),e.jsx(o,{rawText:"TODO"}),e.jsx(o,{rawText:`## FAQ

`}),e.jsx(o,{rawText:`### Q1

`}),e.jsx(o,{rawText:"xxx"}),e.jsx(o,{rawText:`### Q2

`}),e.jsx(o,{rawText:`xxx
`})]})}export{fe as default};
