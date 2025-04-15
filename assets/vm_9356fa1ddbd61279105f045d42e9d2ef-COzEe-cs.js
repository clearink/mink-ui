var N=Object.defineProperty;var $=(n,t,e)=>t in n?N(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var x=(n,t,e)=>$(n,typeof t!="symbol"?t+"":t,e);import{g as A,d as g,h as P,a as b,j as s,e as k,c as B,r as w,k as W,w as T,b as v,l as M}from"./index-DNroriMt.js";import{g as y,B as p}from"./index-B80TBq8t.js";import{S as j}from"./index-5Ki3nQLZ.js";import{G as O}from"./index-GzJoFxv4.js";import{r as _}from"./reflow-B86H6x2V.js";const z=Array.from({length:10},(n,t)=>`${t}`);class R{constructor(){x(this,"$wrapper",{current:null});x(this,"items",new Map)}get wrapper(){return this.$wrapper.current}}function U(n){const{char:t}=n,e=A(()=>new R),[r,o]=g([null,t]),[i,a]=g(!0),c=(u,d)=>{const C=y(e.wrapper),E=y(d),S=C.top-E.top;u.style.setProperty("transform",`translate3d(0, ${S}px, 0)`)},h=u=>{const d=e.items.get(r[0]);!e.wrapper||!d||(c(u,d),_(u))},l=u=>{const d=e.items.get(r[1]);!e.wrapper||!d||c(u,d)},m=()=>{a(!0)};return{returnEarly:P(t,()=>{o([r[1],t]),a(!1)}),refs:e,showChar:i,handleEnter:h,handleEntering:l,handleEntered:m}}function D(n){const{char:t}=n,e=b("badge-scroll-number"),{returnEarly:r,refs:o,showChar:i,handleEnter:a,handleEntering:c,handleEntered:h}=U(n);return r?null:i?s.jsx(s.Fragment,{children:t}):s.jsx(k,{appear:!0,when:!0,timeouts:500,classNames:`${e}-motion`,onEnter:a,onEntering:c,onEntered:h,children:s.jsx("span",{ref:o.$wrapper,className:e,children:z.map(l=>s.jsx("span",{ref:m=>{o.items.set(l,m)},children:l},l))})},t)}function G(n,t){const{dot:e,className:r,classNames:o={}}=t;return{root:B(n,{[`${n}--dot`]:e},r,o.root),indicator:B(`${n}__indicator`,o.indicator)}}function F(n){const{count:t,maxCount:e}=n;return w.useMemo(()=>{if(!W(t))return null;const r=Math.min(t,e),o=`${Math.abs(r)}`.split("").map((i,a)=>({char:i,key:`${a}`,scroll:!0}));return r<0&&o.unshift({char:"-",key:"-",scroll:!1}),t>e&&o.push({char:"+",key:"+",scroll:!1}),o},[t,e])}const H={maxCount:99},L={onEnter:n=>{n.style.setProperty("width","0px")},onEntering:n=>{n.style.setProperty("width",`${n.scrollWidth}px`)},onEntered:n=>{n.style.removeProperty("width")},onEnterCancel:n=>{n.style.setProperty("width",`${n.offsetWidth}px`)},onExit:n=>{n.style.setProperty("width",`${n.offsetWidth}px`)},onExiting:n=>{n.style.setProperty("width","0px")},onExited:n=>{n.style.removeProperty("width")},onExitCancel:n=>{n.style.setProperty("width",`${n.offsetWidth}px`)}};function V(n){const t=T(n,H),{children:e}=t,r=b("badge"),o=G(r,t),i=v(t),a=F(t);return s.jsxs("span",{className:o.root,style:i.root,children:[e,M(a)&&!!a.length&&s.jsx("sup",{className:o.indicator,style:i.indicator,children:s.jsx(O,{classNames:`${r}-scroll-group-motion`,...L,children:a.map(c=>s.jsx("span",{className:`${r}-scroll-group`,children:c.scroll?s.jsx(D,{char:c.char}):c.char},c.key))})})]})}function q(n){return s.jsx("div",{children:"badge.ribbon"})}const f=Object.assign(V,{Ribbon:q});function nn(){return s.jsxs(j,{children:[s.jsx(f,{count:12,children:s.jsx(p,{children:"Badge"})}),s.jsx(f,{count:23,children:s.jsx(p,{children:"Badge"})})]})}const tn={desc:{"zh-CN":`基本

`,"en-US":`basic

`},rawText:`\`\`\`tsx
import { Badge, Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Badge count={12}>
        <Button>Badge</Button>
      </Badge>
      <Badge count={23}>
        <Button>Badge</Button>
      </Badge>
    </Space>
  )
}
\`\`\`
`,cssWrapName:"css4685aa470b43ccb7c02214626773a394"};function en(){const[n,t]=w.useState(12);return s.jsx(j,{children:s.jsx(f,{count:n,children:s.jsx(p,{onClick:()=>{t(~~(Math.random()*100))},children:"Badge"})})})}const sn={desc:{"zh-CN":`随机

`,"en-US":`basic

`},rawText:`\`\`\`tsx
import { Badge, Button, Space } from '@mink-ui/core'
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(12)
  return (
    <Space>
      <Badge count={count}>
        <Button onClick={() => {
          setCount(~~(Math.random() * 100))
        }}
        >
          Badge
        </Button>
      </Badge>
    </Space>
  )
}
\`\`\`
`,cssWrapName:"csscf398448f02e0d159fb2a0e79cd2eef2"};function rn(){return s.jsx(f,{dot:!0,count:1,children:s.jsx(p,{children:"Badge"})})}const on={desc:{"zh-CN":`红点

`,"en-US":`红点

`},rawText:`\`\`\`tsx
import { Badge, Button } from '@mink-ui/core'

export default function App() {
  return (
    <Badge dot count={1}>
      <Button>Badge</Button>
    </Badge>
  )
}
\`\`\`
`,cssWrapName:"css83c590d48860d7cb758466e7d78d584f"};function an(){return s.jsx("div",{children:"建设中,敬请期待!"})}const cn={desc:{"zh-CN":"TODO","en-US":"TODO"},rawText:"```tsx\nexport default function App() {\n  return <div>建设中,敬请期待!</div>\n}\n```",cssWrapName:"cssa9a55c5103788666a7efaa02723f19b4"};export{nn as A,sn as a,en as b,on as c,rn as d,cn as e,an as f,tn as i};
