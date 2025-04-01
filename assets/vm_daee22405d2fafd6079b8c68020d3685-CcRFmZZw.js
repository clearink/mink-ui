var z=Object.defineProperty;var _=(n,o,s)=>o in n?z(n,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[o]=s;var $=(n,o,s)=>_(n,typeof o!="symbol"?o+"":o,s);import{c as l,i as b,r as u,w as P,f,C as D,a as O,b as U,d as W,j as e,o as R,e as F,s as H}from"./index-CwOYnZSN.js";import{B as M}from"./index-JCnzRmOf.js";import{S as v}from"./index-eX8kjn-g.js";import{w as V,g as X}from"./status-CNnWCI42.js";import{u as q}from"./index-Cnpm98eZ.js";function G(n,o,s){const{banner:i,type:p,description:d,className:m,classNames:c={}}=o;return{root:l(n,{[`${n}--as-banner`]:i,[`${n}--${p}`]:p,[`${n}--has-description`]:!b(d)},s==null?void 0:s.className,m,c.root),icon:l(`${n}__icon`,c.icon),content:l(`${n}__content`,c.content),message:l(`${n}__message`,c.message),description:l(`${n}__description`,c.description),action:l(`${n}__action`,c.action),closeBtn:l(`${n}__close-btn`,c.closeBtn)}}const J=["action","onClose","onAfterClose","banner","closable","closeIcon","description","icon","message","showIcon","type",...H];function K(n,o){const s=P(n,{showIcon:f(n.showIcon,!!n.banner),type:f(n.type,n.banner?"warning":"info")}),{action:i,showIcon:p,icon:d,type:m,message:c,description:w,onClose:A,onAfterClose:h}=s,{alert:y}=D.useState(),g=u.useRef(null),N=O("alert"),a=G(N,s,y),r=U(s,y),[I,T]=W(!0);u.useImperativeHandle(o,()=>({get nativeElement(){return g.current}}),[g]);const k=t=>{t.stopPropagation(),A&&A(t),!t.defaultPrevented&&T(!1)},B=u.useMemo(()=>{if(!p)return null;const t=f(d,X(m));return V(t,{fallback:e.jsx("span",{className:a.icon,style:r.icon,children:t}),props:S=>({className:l(S.className,a.icon),style:{...S.style,...r.icon}})})},[a.icon,d,p,r.icon,m]),[Q,C]=q(s,y,{closeIconRender:t=>e.jsx("button",{className:a.closeBtn,style:r.closeBtn,tabIndex:0,type:"button",onClick:k,children:t})}),E=R(s,J);return e.jsx(F,{unmountOnExit:!0,timeouts:{appear:0,enter:0},classNames:`${N}-motion`,when:I,onExit:t=>{t.style.setProperty("height",`${t.offsetHeight}px`)},onExiting:t=>{t.style.setProperty("height","0px")},onExited:t=>{t.style.removeProperty("height"),h==null||h()},children:e.jsxs("div",{ref:g,className:a.root,style:r.root,...E,children:[B,e.jsxs("div",{className:a.content,style:r.content,children:[e.jsx("div",{className:a.message,style:r.message,children:c}),!b(w)&&e.jsx("div",{className:a.description,style:r.description,children:w})]}),!b(i)&&e.jsx("div",{className:a.action,style:r.action,children:i}),C]})})}const j=u.forwardRef(K);class L extends u.Component{constructor(){super(...arguments);$(this,"state",{error:null,errorInfo:null})}componentDidCatch(s,i){this.setState({error:s,errorInfo:i})}render(){const{message:s,description:i,id:p,children:d}=this.props,{error:m,errorInfo:c}=this.state;return m?e.jsx(j,{id:p,message:f(s,`${m||""}`),type:"error",description:e.jsx("pre",{style:{fontSize:"0.9em",overflowX:"auto",margin:0},children:f(i,c==null?void 0:c.componentStack)})}):d}}const x=Object.assign(j,{ErrorBoundary:L});function cn(){return e.jsx(x,{message:"Success Text",type:"info",showIcon:!0})}const on={desc:{"zh-CN":`警告提示，展现需要关注的信息，适用于简短的警告提示。

`,"en-US":`警告提示，展现需要关注的信息，适用于简短的警告提示。

xxx en

`},rawText:`\`\`\`tsx
import { Alert } from '@mink-ui/core'

function App() {
  return (
    <Alert message="Success Text" type="info" showIcon />
  )
}

export default App
\`\`\`
`,cssWrapName:"cssfcf74c958bf7e207acde7ac005ccb863"};function an(){return e.jsx(v,{direction:"vertical",children:["info","success","warning","error"].map(n=>e.jsx(x,{message:`${n} Text`,type:n,showIcon:!0},n))})}const rn={desc:{"zh-CN":`警告提示，展现需要关注的信息，适用于简短的警告提示。

`,"en-US":`警告提示，展现需要关注的信息，适用于简短的警告提示。

xxx en

`},rawText:`\`\`\`tsx
import { Alert, Space } from '@mink-ui/core'

function App() {
  return (
    <Space direction="vertical">
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert key={type} message={\`\${type} Text\`} type={type} showIcon />
      ))}
    </Space>
  )
}

export default App
\`\`\`
`,cssWrapName:"css5ff270cc07572a56056ac0c0c84540eb"};function ln(){return e.jsx("div",{children:["info","success","warning","error"].map(n=>e.jsx(x,{message:`${n} Text`,type:n,showIcon:!0,closable:!0,style:{marginBottom:8}},n))})}const pn={desc:{"zh-CN":`可关闭

`,"en-US":`xxx en

`},rawText:`\`\`\`tsx
import { Alert, Space } from '@mink-ui/core'

function App() {
  return (
    <div>
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert
          key={type}
          message={\`\${type} Text\`}
          type={type}
          showIcon
          closable
          style={{ marginBottom: 8 }}
        />
      ))}
    </div>
  )
}

export default App
\`\`\`
`,cssWrapName:"css724471ddec532672eaca5cd93c7bac65"};function mn(){return e.jsx(v,{direction:"vertical",children:["info","success","warning","error"].map(n=>e.jsx(x,{message:`${n} Text`,description:"Description text",type:n,showIcon:!0},n))})}const dn={desc:{"zh-CN":`描述

`,"en-US":`xxx en

`},rawText:`\`\`\`tsx
import { Alert, Space } from '@mink-ui/core'

function App() {
  return (
    <Space direction="vertical">
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert
          key={type}
          message={\`\${type} Text\`}
          description="Description text"
          type={type}
          showIcon
        />
      ))}
    </Space>
  )
}

export default App
\`\`\`
`,cssWrapName:"cssdc6b70303cb18bcacc69622cd86cb223"};function un(){return e.jsx("div",{children:["info","success","warning","error"].map(n=>e.jsx(x,{message:`${n} Text`,type:n,showIcon:!0,closable:!0,action:e.jsx(M,{size:"small",variant:"filled",children:"action"}),style:{marginBottom:8}},n))})}const fn={desc:{"zh-CN":"通过 `action` 可以自定义右上角操作项。\n\n","en-US":"通过 `action` 可以自定义右上角操作项。\n\n"},rawText:`\`\`\`tsx
import { Alert, Button, Space } from '@mink-ui/core'

function App() {
  return (
    <div>
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert
          key={type}
          message={\`\${type} Text\`}
          type={type}
          showIcon
          closable
          action={<Button size="small" variant="filled">action</Button>}
          style={{ marginBottom: 8 }}
        />
      ))}
    </div>
  )
}

export default App
\`\`\`
`,cssWrapName:"css6c6532399210c384f3a7d73ccce2f937"};function xn(){return e.jsx("div",{children:"建设中,敬请期待!"})}const hn={desc:{"zh-CN":"TODO","en-US":"TODO"},rawText:"```tsx\nexport default function App() {\n  return <div>建设中,敬请期待!</div>\n}\n```",cssWrapName:"cssbc92de99dfb33d5b1c51d642445a5cca"};export{cn as A,rn as a,an as b,pn as c,ln as d,dn as e,mn as f,fn as g,un as h,on as i,hn as j,xn as k};
