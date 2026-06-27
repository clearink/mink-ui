import{e as O,a as R,c as z,b as v,o as j,j as t,C as B,p as V,t as k,S as q,l as D,J as H,q as F,f as U}from"./index-B58OEZdd.js";import{i as A,W as J,u as G}from"./index-eCfWx6PV.js";import{u as L}from"./index-BySDqQgh.js";import{i as Q}from"./keyboard-C4wnD4uN.js";const X=O()(["collapsible","accordion","expandIcon","expandIconPlacement","keepMounted","item","expanded","outerNamespace","outerCssNames","outerCssAttrs","onChange"]);function Y(a,n){const{bordered:l,expandIconPlacement:s,size:e}=a,{ghost:r,prefixCls:d}=n,o=R("collapse",d);return{ns:o,classNames:{root:z(o,{[`${o}--bordered`]:l&&!r,[`${o}--ghost`]:r,[`${o}--icon-end`]:s==="end",[`${o}--lg`]:e==="large",[`${o}--sm`]:e==="small"})}}}function Z(a){const{expanded:n,collapsible:l,outerNamespace:s}=a,e=R(r=>`${s||`${r}-collapse`}-item`);return{ns:e,classNames:{root:z(e,{[`${e}--disabled`]:l==="disabled",[`${e}--expanded`]:n}),header:z(`${e}__header`,{[`${e}__header--collapsible`]:l==="header"}),icon:z(`${e}__icon`,{[`${e}__icon--collapsible`]:l==="icon"}),title:z(`${e}__title`,{[`${e}__title--collapsible`]:l==="title"}),extra:`${e}__extra`,content:`${e}__content`}}}function ee(a){const{item:n,accordion:l,collapsible:s,expanded:e,outerCssNames:r,outerCssAttrs:d,onChange:o}=a,{name:C}=n,{ns:f,classNames:u}=Z(a),[y,i]=v([r,u,n.classNames,{root:n.className}],[d,n.styles,{root:n.style}],{meta:a}),x=j(a,X);return{omitted:a,ns:f,cssNames:y,cssAttrs:i,restAttrs:x,resolveCollapsibleProps:m=>{if(!m.includes(s))return;const h=s==="disabled";return{"aria-expanded":e,"aria-disabled":h,tabIndex:h?-1:0,role:l?"tab":"button",onClick:h?void 0:()=>{o(C)},onKeyDown:h?void 0:c=>{Q(c.key,"enter")&&o(C)}}}}}function ne(a){const{omitted:n,ns:l,cssNames:s,cssAttrs:e,restAttrs:r,resolveCollapsibleProps:d}=ee(a),{item:o,accordion:C,expanded:f,expandIcon:u,keepMounted:y}=n,{ref:i,name:x,title:N,extra:m,children:h}=o,c=()=>{const p=V(u)?u({expanded:f,name:x}):u;return A(p)?t.jsx("span",{className:s.icon,style:e.icon,...d(["icon"]),children:p}):null};return t.jsxs("div",{...r,ref:i,className:s.root,style:e.root,children:[t.jsxs("div",{className:s.header,style:e.header,...d(["header"]),children:[c(),t.jsx("span",{className:s.title,style:e.title,...d(["title"]),children:N}),A(m)&&t.jsx("span",{className:s.extra,style:e.extra,children:m})]}),t.jsx(B,{classNames:`${l}-motion`,skipBeginning:!0,mountOnEnter:!y,unmountOnExit:!y,when:f,onEnter:()=>({height:0}),onEntering:p=>({height:p.scrollHeight}),onExit:p=>({height:p.clientHeight}),onExiting:()=>({height:0}),children:(p,g)=>t.jsx("div",{ref:p,className:g.names(),style:g.attrs(),children:t.jsx("div",{className:s.content,style:e.content,role:C?"tabpanel":void 0,children:h})})})]})}function ae(a){const n=a;return t.jsx("svg",{...n,children:t.jsx("path",{d:"M715.8 493.5 335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37"})})}const te=J(ae,{name:"caret-right",theme:"outlined"}),I={bordered:!0,collapsible:"header",expandIconPlacement:"start",expandIcon:t.jsx(te,{})};function T(a,n){return n?k(a).slice(0,1):k(a)}function se(a){const n=G("collapse"),l=q.use(),{accordion:s,expandedNames:e,defaultExpandedNames:r,onChange:d,size:o=l,bordered:C=I.bordered,collapsible:f=I.collapsible,expandIcon:u=I.expandIcon,expandIconPlacement:y=I.expandIconPlacement}=a,i=a,x={bordered:C,collapsible:f,expandIcon:u,expandIconPlacement:y,size:o},[N,m]=L(D(e)?void 0:T(e,s),()=>T(r,s),(S,b)=>{d?.(b,S)}),{ns:h,classNames:c}=Y(x,i),[p,g]=v([n.classNames,{root:n.className},c,i.classNames,{root:i.className}],[n.styles,{root:n.style},i.styles,{root:i.style}],{meta:{...i,...x,expandedNames:N}}),M={...j(p,["root","item"]),root:p.item},W={...j(g,["root","item"]),root:g.item},K=H(S=>{let b=N.concat();const w=b.indexOf(S),$=w!==-1;s?b=$?[]:[S]:$?b.splice(w,1):b.push(S),m(b,S)});return{picked:x,omitted:i,ns:h,cssNames:p,cssAttrs:g,expandedNames:N,outerCssNames:M,outerCssAttrs:W,handleChange:K}}function oe(a){const{picked:n,omitted:l,ns:s,cssNames:e,cssAttrs:r,expandedNames:d,outerCssNames:o,outerCssAttrs:C,handleChange:f}=se(a),{collapsible:u,expandIcon:y,expandIconPlacement:i}=n,{ref:x,items:N,accordion:m,keepMounted:h}=l;return t.jsx("div",{ref:x,className:e.root,style:r.root,role:m?"tablist":void 0,children:F(N)&&N.map(c=>t.jsx(ne,{accordion:m,collapsible:U(c.collapsible,u),expanded:m?d[0]===c.name:d.includes(c.name),expandIcon:U(c.expandIcon,y),expandIconPlacement:U(c.expandIconPlacement,i),item:c,keepMounted:U(c.keepMounted,h),outerCssAttrs:C,outerCssNames:o,outerNamespace:s,onChange:f},c.name))})}const E=Object.assign(oe,{}),P=`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;function de(){return t.jsx(E,{items:[{name:"1",title:"This is panel header 1",children:t.jsx("p",{children:P})},{name:"2",title:"This is panel header 2",children:t.jsx("p",{children:P})},{name:"3",title:"This is panel header 3",children:t.jsx("p",{children:P})}]})}const pe={metaInfo:{"zh-CN":`基本用法展示折叠面板的展开与收起。

`,"en-US":`Basic usage showing expand and collapse.

`},rawText:`\`\`\`tsx
import { Collapse } from '@mink-ui/core'

const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`

export default function App() {
  return (
    <Collapse
      items={[
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
      ]}
    />
  )
}
\`\`\`
`,cssName:"css-a0421e2c",relPath:"packages/core/src/collapse/__docs__/examples/basic.md"},_=`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;function me(){return t.jsx(E,{accordion:!0,items:[{name:"1",title:"This is panel header 1",children:t.jsx("p",{children:_})},{name:"2",title:"This is panel header 2",children:t.jsx("p",{children:_})},{name:"3",title:"This is panel header 3",children:t.jsx("p",{children:_})}]})}const he={metaInfo:{"zh-CN":`基本用法展示折叠面板的展开与收起。

`,"en-US":`Basic usage showing expand and collapse.

`},rawText:`\`\`\`tsx
import { Collapse } from '@mink-ui/core'

const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`

export default function App() {
  return (
    <Collapse
      accordion
      items={[
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
      ]}
    />
  )
}
\`\`\`
`,cssName:"css-c90bbc06",relPath:"packages/core/src/collapse/__docs__/examples/accordion.md"},ue=[{name:"items",type:"CollapseItemType[]","zh-CN":"折叠面板内容","en-US":"Collapse panel items"},{name:"expandedNames",type:"Name | Name[]","zh-CN":"展开面板名称（受控）","en-US":"Expanded panel names (controlled)"},{name:"defaultExpandedNames",type:"Name | Name[]",default:"[]","zh-CN":"默认展开面板名称","en-US":"Default expanded panel names"},{name:"accordion",type:"boolean",default:"false","zh-CN":"是否为手风琴模式","en-US":"Whether to enable accordion mode"},{name:"bordered",type:"boolean",default:"true","zh-CN":"是否显示边框","en-US":"Whether to show border"},{name:"collapsible",type:"'header' | 'icon' | 'title' | 'disabled'",default:"'header'","zh-CN":"展开触发区域","en-US":"Trigger area for expanding"},{name:"expandIcon",type:"ReactNode | ((params: { expanded: boolean; name: Name }) => ReactNode)","zh-CN":"自定义展开图标","en-US":"Custom expand icon"},{name:"expandIconPlacement",type:"'start' | 'end'",default:"'start'","zh-CN":"展开图标位置","en-US":"Expand icon placement"},{name:"ghost",type:"boolean",default:"false","zh-CN":"是否为幽灵模式，无背景色","en-US":"Whether to enable ghost mode, no background"},{name:"keepMounted",type:"boolean",default:"false","zh-CN":"收起时是否保留元素","en-US":"Whether to keep mounted when collapsed"},{name:"size",type:"'small' | 'middle' | 'large'","zh-CN":"折叠面板尺寸","en-US":"Collapse panel size"},{name:"onChange",type:"(expandedName: Name, expandedNames: Name[]) => void","zh-CN":"展开项变化回调","en-US":"Callback when expanded items change"},{name:"children",type:"ReactNode","zh-CN":"折叠面板内容","en-US":"Content of the collapse"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"classNames",type:"Record<'root' | 'item' | 'header' | 'icon' | 'title' | 'extra' | 'content', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'item' | 'header' | 'icon' | 'title' | 'extra' | 'content', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}],xe=[{name:"name",type:"number | string","zh-CN":"面板名称，用作唯一标识","en-US":"Panel name, used as unique identifier"},{name:"title",type:"ReactNode","zh-CN":"标题","en-US":"Title"},{name:"extra",type:"ReactNode","zh-CN":"额外内容","en-US":"Extra content"},{name:"collapsible",enum:!0,type:["header","icon","title","disabled"],defaultValue:"header","zh-CN":"展开触发区域","en-US":"Trigger area for expanding"},{name:"expandIcon",type:"ReactNode | ((params: { expanded: boolean; name: Name }) => ReactNode)","zh-CN":"自定义展开图标","en-US":"Custom expand icon"},{name:"expandIconPlacement",enum:!0,type:["start","end"],defaultValue:"start","zh-CN":"展开图标位置","en-US":"Expand icon placement"},{name:"keepMounted",type:"boolean",defaultValue:"false","zh-CN":"收起时是否保留元素","en-US":"Whether to keep mounted when collapsed"},{name:"children",type:"ReactNode","zh-CN":"面板内容","en-US":"Panel content"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"classNames",type:"Record<'root' | 'header' | 'icon' | 'title' | 'extra' | 'content', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'header' | 'icon' | 'title' | 'extra' | 'content', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}];export{de as A,pe as M,ue as P,he as a,me as b,xe as c};
