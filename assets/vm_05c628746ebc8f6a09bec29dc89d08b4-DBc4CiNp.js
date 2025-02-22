import{m as F,j as o,c as m,r as E,w as T,a as A,b as O,o as z,n as D,i as W,e as q,s as U,p as V,q as B,l as G}from"./index-x3Cl-sSR.js";import{n as J}from"./index-BbBPHn7m.js";import{w as L,t as v,u as Q}from"./index-CasDW5Io.js";import{k as X}from"./keyboard-DDjTZLpe.js";import{p as Y}from"./pick-BK4giCUn.js";const H=F({collapsible:"header",expandedNames:[],onItemClick:J});function Z(e){const a=e;return o.jsx("svg",{...a,children:o.jsx("path",{d:"M715.8 493.5 335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37"})})}const ee=L(Z,{name:"caret-right",theme:"outlined"});function ne(e,a,{ctx:t,expanded:s}){const{className:i,classNames:n,disabled:c}=a;return{content:m(`${e}__content`,n==null?void 0:n.content),extra:m(`${e}__extra`,n==null?void 0:n.extra),header:m(`${e}__header`,{[`${e}__collapsible`]:t.collapsible==="header"},n==null?void 0:n.header),icon:m(`${e}__icon`,{[`${e}__collapsible`]:t.collapsible==="icon"},n==null?void 0:n.icon),root:m(e,{[`${e}--disabled`]:c,[`${e}--expanded`]:s},i,n==null?void 0:n.root),title:m(`${e}__title`,{[`${e}__collapsible`]:t.collapsible==="title"},n==null?void 0:n.title)}}const te={showExpandIcon:!0},oe={onEnter:e=>{e.style.setProperty("height","0px")},onEntering:e=>{e.style.setProperty("height",`${e.scrollHeight}px`)},onEntered:e=>{e.style.removeProperty("height")},onEnterCancel:e=>{e.style.setProperty("height",`${e.offsetHeight}px`)},onExit:e=>{e.style.setProperty("height",`${e.offsetHeight}px`)},onExiting:e=>{e.style.setProperty("height","0px")},onExited:e=>{e.style.removeProperty("height")},onExitCancel:e=>{e.style.setProperty("height",`${e.offsetHeight}px`)}},se=["name","title","extra","disabled","showExpandIcon","keepMounted","unmountOnExit","expandIcon","children",...U];function ae(e,a){const t=H.useState(),s=T({...e,disabled:e.disabled||t.disabled},Y(t,["expandIcon","keepMounted","unmountOnExit"]),{...te,expandIcon:o.jsx(ee,{})}),{disabled:i,expandIcon:n,extra:c,name:l,showExpandIcon:g,title:b}=s,f=A("collapse-item"),p=t.expandedNames.includes(l),r=ne(f,s,{ctx:t,expanded:p}),d=O(s),u=y=>{if(!(i||t.collapsible!==y))return()=>{t.onItemClick(l)}},$=y=>{y.key===X.enter&&t.onItemClick(l)},w=z(s,se);return o.jsxs("div",{...w,ref:a,className:r.root,style:d.root,children:[o.jsxs("div",{className:r.header,style:d.header,"aria-disabled":!!i,"aria-expanded":!!p,role:t.accordion?"tab":"button",tabIndex:0,onClick:u("header"),onKeyDown:$,children:[!!g&&o.jsx("span",{className:r.icon,style:d.icon,onClick:u("icon"),children:D(n)?n({expanded:p,name:l}):n}),o.jsx("span",{className:r.title,style:d.title,onClick:u("title"),children:b}),!W(c)&&o.jsx("span",{className:r.extra,style:d.extra,children:c})]}),o.jsx(q,{mountOnEnter:!s.keepMounted,classNames:`${f}-motion`,unmountOnExit:!s.keepMounted&&s.unmountOnExit,when:p,...oe,children:o.jsx("div",{role:t.accordion?"tabpanel":void 0,children:o.jsx("div",{className:r.content,style:d.content,children:s.children})})})]})}const M=E.forwardRef(ae);function ie(e,a){const{bordered:t,className:s,classNames:i,expandIconPosition:n,ghost:c,size:l}=a;return{root:m(e,{[`${e}--bordered`]:t&&!c,[`${e}--ghost`]:c,[`${e}--icon-end`]:n==="end",[`${e}--lg`]:l==="large",[`${e}--sm`]:l==="small"},s,i==null?void 0:i.root)}}const le={bordered:!0,collapsible:"header",expandIconPosition:"start"};function P(e,a){return a?v(e).slice(0,1):v(e)}function de(e,a){const t=T(e,le),{accordion:s,children:i,collapsible:n,defaultExpandedNames:c,disabled:l,expandIcon:g,expandIconPosition:b,expandedNames:f,items:p,keepMounted:r,onChange:d,unmountOnExit:u}=t,$=O(t),w=A("collapse"),y=ie(w,t),[C,R]=Q({defaultValue:()=>P(c,s),value:V(f)?void 0:P(f,s)}),I=B(h=>{let x=C.concat();const k=x.indexOf(h),_=k>-1;s?x=_?[]:[h]:_?x.splice(k,1):x.push(h),R(x),d==null||d(h,x)}),S=E.useMemo(()=>({accordion:s,collapsible:n,disabled:l,expandIcon:g,expandIconPosition:b,expandedNames:C,keepMounted:r,onItemClick:I,unmountOnExit:u}),[s,g,b,C,r,I,u,n,l]);return o.jsx("div",{ref:a,className:y.root,style:$.root,role:s?"tablist":void 0,children:o.jsx(H.Provider,{value:S,children:G(p)?p.map(h=>E.createElement(M,{...h,key:h.name})):i})})}const ce=E.forwardRef(de),K=Object.assign(ce,{Item:M}),N=`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`,re=[{name:"1",title:"This is panel header 1",children:o.jsx("p",{children:N})},{name:"2",title:"This is panel header 2",children:o.jsx("p",{children:N})},{name:"3",title:"This is panel header 3",children:o.jsx("p",{children:N})}];function ye(){const e=(a,t)=>{console.log(a,t)};return o.jsx(K,{items:re,defaultExpandedNames:["1"],onChange:e})}const ge={desc:{},rawText:`\`\`\`tsx
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
`,cssWrapName:"css666977b50101462d730d7154a0421e2c"},j=`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`,pe=[{name:"1",title:"This is panel header 1",children:o.jsx("p",{children:j})},{name:"2",title:"This is panel header 2",children:o.jsx("p",{children:j})},{name:"3",title:"This is panel header 3",children:o.jsx("p",{children:j})}];function be(){const e=(a,t)=>{console.log(a,t)};return o.jsx(K,{accordion:!0,items:pe,defaultExpandedNames:["1"],onChange:e})}const Ee={desc:{},rawText:`\`\`\`tsx
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
`,cssWrapName:"css6f5f30965dc2a14a38ae948ac90bbc06"};export{ye as A,Ee as a,be as b,ge as i};
