import{e as K,a as T,c as S,b as E,o as j,j as a,C as B,p as V,t as $,S as q,k as D,J as F,q as H,r as J,f as z}from"./index-D6VRxUZK.js";import{i as A,W as G,u as L}from"./index-B3pNPVv9.js";import{u as Q}from"./index-CTcjYFvm.js";import{i as X}from"./keyboard-C4wnD4uN.js";const Y=K()(["children","className","classNames","style","styles","accordion","collapsible","expandIcon","expandIconPlacement","keepMounted","ref","name","extra","title","expanded","outerNamespace","outerCssNames","outerCssAttrs","onChange"]);function Z(n,t){const{bordered:c,expandIconPlacement:s,size:e}=n,{ghost:d,prefixCls:m}=t,l=T("collapse",m);return{ns:l,classNames:{root:S(l,{[`${l}--bordered`]:c&&!d,[`${l}--ghost`]:d,[`${l}--icon-end`]:s==="end",[`${l}--lg`]:e==="large",[`${l}--sm`]:e==="small"})}}}function ee(n){const{expanded:t,collapsible:c,outerNamespace:s}=n,e=T(d=>`${s||`${d}-collapse`}-item`);return{ns:e,classNames:{root:S(e,{[`${e}--disabled`]:c==="disabled",[`${e}--expanded`]:t}),header:S(`${e}__header`,{[`${e}__header--collapsible`]:c==="header"}),icon:S(`${e}__icon`,{[`${e}__icon--collapsible`]:c==="icon"}),title:S(`${e}__title`,{[`${e}__title--collapsible`]:c==="title"}),extra:`${e}__extra`,content:`${e}__content`}}}function ne(n){const{name:t,accordion:c,collapsible:s,expanded:e,outerCssNames:d,outerCssAttrs:m,onChange:l}=n,{ns:x,classNames:N}=ee(n),[u,C]=E([d,N,n.classNames,{root:n.className}],[m,n.styles,{root:n.style}],{meta:n}),i=j(n,Y);return{omitted:n,ns:x,cssNames:u,cssAttrs:C,restAttrs:i,resolveCollapsibleProps:p=>{if(!p.includes(s))return;const r=s==="disabled";return{"aria-expanded":e,"aria-disabled":r,tabIndex:r?-1:0,role:c?"tab":"button",onClick:r?void 0:()=>{l(t)},onKeyDown:r?void 0:f=>{X(f.key,"enter")&&l(t)}}}}}function ae(n){const{omitted:t,ns:c,cssNames:s,cssAttrs:e,restAttrs:d,resolveCollapsibleProps:m}=ne(n),{ref:l,children:x,title:N,extra:u,name:C,accordion:i,expanded:h,expandIcon:p,keepMounted:r}=t,f=()=>{const o=V(p)?p({expanded:h,name:C}):p;return A(o)?a.jsx("span",{className:s.icon,style:e.icon,...m(["icon"]),children:o}):null};return a.jsxs("div",{...d,ref:l,className:s.root,style:e.root,children:[a.jsxs("div",{className:s.header,style:e.header,...m(["header"]),children:[f(),a.jsx("span",{className:s.title,style:e.title,...m(["title"]),children:N}),A(u)&&a.jsx("span",{className:s.extra,style:e.extra,children:u})]}),a.jsx(B,{classNames:`${c}-motion`,resumeOnCancel:!0,mountOnEnter:!r,unmountOnExit:!r,when:h,onEnter:()=>({height:0}),onEntering:o=>({height:o.scrollHeight}),onExit:o=>({height:o.getBoundingClientRect().height}),onExiting:()=>({height:0}),children:(o,b)=>a.jsx("div",{ref:o,className:b.names(),style:b.attrs(),children:a.jsx("div",{className:s.content,style:e.content,role:i?"tabpanel":void 0,children:x})})})]})}function te(n){const t=n;return a.jsx("svg",{...t,children:a.jsx("path",{d:"M715.8 493.5 335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37"})})}const se=G(te,{name:"caret-right",theme:"outlined"}),U={bordered:!0,collapsible:"header",expandIconPlacement:"start",expandIcon:a.jsx(se,{})};function R(n,t){return t?$(n).slice(0,1):$(n)}function oe(n){const t=L("collapse"),c=q.use(),{accordion:s,expandedNames:e,defaultExpandedNames:d,onChange:m,size:l=c,bordered:x=U.bordered,collapsible:N=U.collapsible,expandIcon:u=U.expandIcon,expandIconPlacement:C=U.expandIconPlacement}=n,i=n,h={bordered:x,collapsible:N,expandIcon:u,expandIconPlacement:C,size:l},[p,r]=Q(D(e)?void 0:R(e,s),()=>R(d,s),(g,y)=>{m?.(y,g)}),{ns:f,classNames:o}=Z(h,i),[b,I]=E([t.classNames,{root:t.className},o,i.classNames,{root:i.className}],[t.styles,{root:t.style},i.styles,{root:i.style}],{meta:{...i,...h,expandedNames:p}}),M={...j(b,["root","item"]),root:b.item},O={...j(I,["root","item"]),root:I.item},W=F(g=>{let y=p.concat();const k=y.indexOf(g),w=k!==-1;s?y=w?[]:[g]:w?y.splice(k,1):y.push(g),r(y,g)});return{picked:h,omitted:i,ns:f,cssNames:b,cssAttrs:I,expandedNames:p,outerCssNames:M,outerCssAttrs:O,handleChange:W}}function le(n){const{picked:t,omitted:c,ns:s,cssNames:e,cssAttrs:d,expandedNames:m,outerCssNames:l,outerCssAttrs:x,handleChange:N}=oe(n),{collapsible:u,expandIcon:C,expandIconPlacement:i}=t,{ref:h,items:p,accordion:r,keepMounted:f}=c;return a.jsx("div",{ref:h,className:e.root,style:d.root,role:r?"tablist":void 0,children:H(p)&&p.map(o=>J.createElement(ae,{...o,key:o.name,accordion:r,collapsible:z(o.collapsible,u),expanded:r?m[0]===o.name:m.includes(o.name),expandIcon:z(o.expandIcon,C),expandIconPlacement:z(o.expandIconPlacement,i),keepMounted:z(o.keepMounted,f),outerCssAttrs:x,outerCssNames:l,outerNamespace:s,onChange:N}))})}const v=Object.assign(le,{}),P=`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;function me(){return a.jsx(v,{items:[{name:"1",title:"This is panel header 1",children:a.jsx("p",{children:P})},{name:"2",title:"This is panel header 2",children:a.jsx("p",{children:P})},{name:"3",title:"This is panel header 3",children:a.jsx("p",{children:P})}]})}const pe={metaInfo:{"zh-CN":`基本用法展示折叠面板的展开与收起。

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
`;function he(){return a.jsx(v,{accordion:!0,items:[{name:"1",title:"This is panel header 1",children:a.jsx("p",{children:_})},{name:"2",title:"This is panel header 2",children:a.jsx("p",{children:_})},{name:"3",title:"This is panel header 3",children:a.jsx("p",{children:_})}]})}const ue={metaInfo:{"zh-CN":`基本用法展示折叠面板的展开与收起。

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
`,cssName:"css-c90bbc06",relPath:"packages/core/src/collapse/__docs__/examples/accordion.md"},xe=[{name:"items",type:"CollapseItemType[]","zh-CN":"折叠面板内容","en-US":"Collapse panel items"},{name:"expandedNames",type:"Name | Name[]","zh-CN":"展开面板名称（受控）","en-US":"Expanded panel names (controlled)"},{name:"defaultExpandedNames",type:"Name | Name[]",default:"[]","zh-CN":"默认展开面板名称","en-US":"Default expanded panel names"},{name:"accordion",type:"boolean",default:"false","zh-CN":"是否为手风琴模式","en-US":"Whether to enable accordion mode"},{name:"bordered",type:"boolean",default:"true","zh-CN":"是否显示边框","en-US":"Whether to show border"},{name:"collapsible",type:"'header' | 'icon' | 'title' | 'disabled'",default:"'header'","zh-CN":"展开触发区域","en-US":"Trigger area for expanding"},{name:"expandIcon",type:"ReactNode | ((params: { expanded: boolean; name: Name }) => ReactNode)","zh-CN":"自定义展开图标","en-US":"Custom expand icon"},{name:"expandIconPlacement",type:"'start' | 'end'",default:"'start'","zh-CN":"展开图标位置","en-US":"Expand icon placement"},{name:"ghost",type:"boolean",default:"false","zh-CN":"是否为幽灵模式，无背景色","en-US":"Whether to enable ghost mode, no background"},{name:"keepMounted",type:"boolean",default:"false","zh-CN":"收起时是否保留元素","en-US":"Whether to keep mounted when collapsed"},{name:"size",type:"'small' | 'middle' | 'large'","zh-CN":"折叠面板尺寸","en-US":"Collapse panel size"},{name:"onChange",type:"(expandedName: Name, expandedNames: Name[]) => void","zh-CN":"展开项变化回调","en-US":"Callback when expanded items change"},{name:"children",type:"ReactNode","zh-CN":"折叠面板内容","en-US":"Content of the collapse"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"classNames",type:"Record<'root' | 'item' | 'header' | 'icon' | 'title' | 'extra' | 'content', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'item' | 'header' | 'icon' | 'title' | 'extra' | 'content', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}],Ne=[{name:"name",type:"number | string","zh-CN":"面板名称，用作唯一标识","en-US":"Panel name, used as unique identifier"},{name:"title",type:"ReactNode","zh-CN":"标题","en-US":"Title"},{name:"extra",type:"ReactNode","zh-CN":"额外内容","en-US":"Extra content"},{name:"collapsible",enum:!0,type:["header","icon","title","disabled"],defaultValue:"header","zh-CN":"展开触发区域","en-US":"Trigger area for expanding"},{name:"expandIcon",type:"ReactNode | ((params: { expanded: boolean; name: Name }) => ReactNode)","zh-CN":"自定义展开图标","en-US":"Custom expand icon"},{name:"expandIconPlacement",enum:!0,type:["start","end"],defaultValue:"start","zh-CN":"展开图标位置","en-US":"Expand icon placement"},{name:"keepMounted",type:"boolean",defaultValue:"false","zh-CN":"收起时是否保留元素","en-US":"Whether to keep mounted when collapsed"},{name:"children",type:"ReactNode","zh-CN":"面板内容","en-US":"Panel content"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"classNames",type:"Record<'root' | 'header' | 'icon' | 'title' | 'extra' | 'content', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'header' | 'icon' | 'title' | 'extra' | 'content', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}];export{me as A,pe as M,xe as P,ue as a,he as b,Ne as c};
