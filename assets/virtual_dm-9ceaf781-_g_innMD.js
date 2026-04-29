import{j as e,i as $,a as L,o as E,r as p,b as R,c as T,d as _,f as C,e as U,g as D,C as V}from"./index-lKdCcfyw.js";import{M as l}from"./index-DpkfVBNe.js";import{W as f,s as d,S as I,C as x}from"./index-CUvNlcih.js";import{P as k}from"./index-EVMNPoW4.js";import{c as Q}from"./children-Bg1ZoXIn.js";import{u as W,B as H}from"./index-BSCRxZB_.js";import{S as B}from"./space-CklsVt2X.js";import{P as X,a as Z}from"./virtual_dm-60d613bb-C6UfwQoc.js";function G(n){const s=d(n,{fill:"currentColor",fillRule:"evenodd"});return e.jsx("svg",{...s,children:e.jsx("path",{d:"M799.86 166.31q.02 0 .08.06l57.69 57.7q.05.04.06.08v.06q0 .04-.06.09L569.93 512l287.7 287.7q.05.05.06.09v.07q0 .02-.06.08l-57.7 57.69q-.04.05-.07.06h-.07q-.04 0-.09-.06L512 569.93l-287.7 287.7q-.05.05-.09.06h-.07q-.03 0-.08-.06l-57.69-57.7q-.05-.04-.06-.07v-.07q0-.04.06-.09L454.07 512l-287.7-287.7q-.05-.05-.06-.09v-.07q0-.03.06-.08l57.7-57.69q.04-.05.07-.06h.07q.04 0 .09.06L512 454.07l287.7-287.7q.05-.05.09-.06z"})})}const J=f(G,{name:"close",theme:"outlined"});function K(n){return n===null}function q(n){const s=n?n.closable:void 0,r=n?n.closeIcon:void 0;if($(s))return K(r)?!1:$(r)?void 0:{closeIcon:r};if(s===!1)return!1;const a={closeIcon:r};return L(s)?d(s,a):a}function Y(n,s){if(!n)return null;const{closeIcon:r}=n,{closeIconRender:a}=s,c=E(n,["closable","closeIcon","closeIconRender"]),o=a?a(r):r;return p.isValidElement(o)?p.cloneElement(o,c):e.jsx("span",{...c,children:o})}function ee(n){const{currentState:s,contextState:r,defaultState:a}=n,c=q(s),o=q(r),t=d(a||{},{closeIcon:e.jsx(J,{})});let i;return c===!1?i=!1:c?i=d(c,o||{},t):o===!1?i=!1:i=t.closable?t:!1,{closable:i!==!1,closeIcon:Y(i,t)}}function ne(n){const s=n;return e.jsx("svg",{...s,children:e.jsx("path",{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64m193.5 301.7-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7"})})}const se=f(ne,{name:"check-circle",theme:"filled"});function te(n){const s=d(n,{fill:"currentColor",fillRule:"evenodd"});return e.jsx("svg",{...s,children:e.jsx("path",{d:"M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64m127.98 274.82h-.04l-.08.06L512 466.76 384.14 338.89q-.05-.07-.08-.06h-.07q-.04 0-.09.05l-45.02 45.02-.05.09v.09l.06.06L466.75 512 338.89 639.86q-.07.05-.06.08v.07q0 .04.05.09l45.02 45.02.09.05h.07q.03 0 .08-.05L512 557.25l127.86 127.87q.05.06.08.05h.07q.04 0 .09-.05l45.02-45.02.05-.09v-.09l-.05-.06L557.25 512l127.87-127.86q.06-.05.05-.08v-.07q0-.04-.05-.09l-45.02-45.02-.09-.05h-.07Z"})})}const oe=f(te,{name:"close-circle",theme:"filled"});function ce(n){const s=n;return e.jsx("svg",{...s,children:e.jsx("path",{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64m-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96"})})}const re=f(ce,{name:"exclamation-circle",theme:"filled"});function ae(n){const s=n;return e.jsx("svg",{...s,children:e.jsx("path",{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64m32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96"})})}const le=f(ae,{name:"info-circle",theme:"filled"});function ie(n){switch(n){case I.info:return e.jsx(le,{});case I.warning:return e.jsx(re,{});case I.success:return e.jsx(se,{});case I.error:return e.jsx(oe,{});default:return null}}const me=["prefixCls","className","classNames","style","styles","closeIcon","closable","ref","type","message","description","action","banner","icon","showIcon"];function ue(n,s){const{type:r}=n,{banner:a,description:c,prefixCls:o}=s,t=R("alert",o);return{ns:t,classNames:{root:T(t,{[`${t}--as-banner`]:a,[`${t}--${r}`]:r,[`${t}--has-description`]:!_(c)}),icon:`${t}__icon`,content:`${t}__content`,message:`${t}__message`,description:`${t}__description`,action:`${t}__action`,closeBtn:`${t}__close-btn`}}}function xe(n){const s=W("alert"),{ref:r,type:a=C(n.type,n.banner?"warning":"info"),showIcon:c=C(n.showIcon,!!n.banner),onClose:o}=n,t=n,i={type:a,showIcon:c},b=p.useRef(null),[w,v]=U(!0),{ns:y,classNames:j}=ue(i,t),[g,A]=D([s.classNames,{root:s.className},j,t.classNames,{root:t.className}],[s.styles,{root:s.style},t.styles,{root:t.style}]),N=E(n,me),S=()=>{o?.(),v(!1)};return p.useImperativeHandle(r,()=>({nativeElement:b.current})),{picked:i,omitted:t,ns:y,cssNames:g,cssAttrs:A,globalConfig:s,visible:w,attrs:N,handleOnClose:S}}function M(n){const{picked:s,omitted:r,ns:a,cssNames:c,cssAttrs:o,globalConfig:t,visible:i,attrs:b,handleOnClose:w}=xe(n),{showIcon:v,type:y}=s,{description:j,action:g,message:A,icon:N,closable:S,closeIcon:P,onClosed:z}=r,O=()=>{if(!v)return null;const m=N??ie(y);return Q(m,{fallback:e.jsx("span",{className:c.icon,style:o.icon,children:m}),transform:u=>({className:T(u.className,c.icon),style:{...u.style,...o.icon}})})},F=()=>{const{closeIcon:m}=ee({currentState:{closable:S,closeIcon:P},contextState:{closable:t.closable,closeIcon:t.closeIcon},defaultState:{closeIconRender:u=>e.jsx("button",{className:c.closeBtn,style:o.closeBtn,tabIndex:0,type:"button",onClick:w,children:u})}});return m};return e.jsx(V,{classNames:`${a}-motion`,unmountOnExit:!0,timeouts:{appear:0,enter:0},when:i,onExit:m=>({height:m.getBoundingClientRect().height}),onExited:()=>{z?.()},onExiting:()=>({height:0}),children:(m,u)=>e.jsxs("div",{...b,ref:m,className:T(c.root,u.names()),style:{...o.root,...u.attrs()},children:[O(),e.jsxs("div",{className:c.content,style:o.content,children:[e.jsx("div",{className:c.message,style:o.message,children:A}),!_(j)&&e.jsx("div",{className:c.description,style:o.description,children:j})]}),!_(g)&&e.jsx("div",{className:c.action,style:o.action,children:g}),F()]})})}class pe extends p.Component{state={error:null,errorInfo:null};componentDidCatch(s,r){this.setState({error:s,errorInfo:r})}render(){const{message:s,description:r,id:a,children:c}=this.props,{error:o,errorInfo:t}=this.state;return o?e.jsx(M,{description:e.jsx("pre",{style:{fontSize:"0.9em",overflowX:"auto",margin:0},children:C(r,t?.componentStack)}),id:a,message:C(s,`${o||""}`),type:"error"}):c}}const h=Object.assign(M,{ErrorBoundary:pe});function de(){return e.jsx(h,{showIcon:!0,message:"Success Text",type:"info"})}const fe={metaInfo:{"zh-CN":`警告提示，展现需要关注的信息，适用于简短的警告提示。

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
`,cssName:"css-05ccb863",relativePath:"packages/core/src/alert/__docs__/examples/basic.md"};function he(){return e.jsx(B,{orientation:"vertical",children:["info","success","warning","error"].map(n=>e.jsx(h,{showIcon:!0,message:`${n} Text`,type:n},n))})}const je={metaInfo:{"zh-CN":`警告提示，展现需要关注的信息，适用于简短的警告提示。

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
`,cssName:"css-c84540eb",relativePath:"packages/core/src/alert/__docs__/examples/type.md"};function ge(){return e.jsx("div",{children:["info","success","warning","error"].map(n=>e.jsx(h,{style:{marginBottom:8},closable:!0,showIcon:!0,message:`${n} Text`,type:n},n))})}const Ie={metaInfo:{"zh-CN":`可关闭

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
`,cssName:"css-3c7bac65",relativePath:"packages/core/src/alert/__docs__/examples/closable.md"};function Ce(){return e.jsx(B,{orientation:"vertical",children:["info","success","warning","error"].map(n=>e.jsx(h,{showIcon:!0,description:"Description text",message:`${n} Text`,type:n},n))})}const be={metaInfo:{"zh-CN":`描述

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
`,cssName:"css-d86cb223",relativePath:"packages/core/src/alert/__docs__/examples/description.md"};function we(){return e.jsx("div",{children:["info","success","warning","error"].map(n=>e.jsx(h,{style:{marginBottom:8},closable:!0,showIcon:!0,action:e.jsx(H,{size:"small",variant:"filled",children:"action"}),message:`${n} Text`,type:n},n))})}const ve={metaInfo:{"zh-CN":"通过 `action` 可以自定义右上角操作项。\n\n","en-US":"通过 `action` 可以自定义右上角操作项。\n\n"},rawText:`\`\`\`tsx
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
`,cssName:"css-cce2f937",relativePath:"packages/core/src/alert/__docs__/examples/action.md"};function qe(){return e.jsxs("div",{className:"document-container",children:[e.jsx(l,{rawText:`## 何时使用

`}),e.jsx(l,{rawText:"随你"}),e.jsx(l,{rawText:`## 代码演示

`}),e.jsx(x,{...fe,title:"基本用法",element:e.jsx(de,{})}),e.jsx(x,{...je,title:"不同类型",element:e.jsx(he,{})}),e.jsx(x,{...Ie,title:"可关闭",element:e.jsx(ge,{})}),e.jsx(x,{...be,title:"含有描述",element:e.jsx(Ce,{})}),e.jsx(x,{...ve,title:"操作项",element:e.jsx(we,{})}),e.jsx(l,{rawText:`## API

`}),e.jsx(l,{rawText:`### Alert Props

`}),e.jsx(k,{columns:X}),e.jsx(l,{rawText:`### Alert.ErrorBoundary Props

`}),e.jsx(k,{columns:Z}),e.jsx(l,{rawText:`## Semantic DOM

`}),e.jsx(l,{rawText:`<semantic src="./examples/semantic.md" />

`}),e.jsx(l,{rawText:"TODO"}),e.jsx(l,{rawText:`## FAQ

`}),e.jsx(l,{rawText:`### Q1

`}),e.jsx(l,{rawText:"xxx"}),e.jsx(l,{rawText:`### Q2

`}),e.jsx(l,{rawText:`xxx
`})]})}export{qe as default};
