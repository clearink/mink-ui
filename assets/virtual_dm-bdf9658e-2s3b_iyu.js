import{b as T,c as g,g as v,o as E,j as s,d as A,C as W,m as B,t as k,S as V,i as D,E as q,n as F,r as H,f as z}from"./index-lKdCcfyw.js";import{u as Y}from"./index-BSCRxZB_.js";import{K as G,W as J,u as L}from"./index-CUvNlcih.js";function Q(n,a){return n.key===G[a]}const X=["children","className","classNames","style","styles","accordion","collapsible","expandIcon","expandIconPlacement","keepMounted","ref","name","extra","title","expanded","rootCssNames","rootCssAttrs","rootNamespace","onChange"];function Z(n,a){const{bordered:r,expandIconPlacement:t,size:e}=n,{ghost:d,prefixCls:m}=a,l=T("collapse",m);return{ns:l,classNames:{root:g(l,{[`${l}--bordered`]:r&&!d,[`${l}--ghost`]:d,[`${l}--icon-end`]:t==="end",[`${l}--lg`]:e==="large",[`${l}--sm`]:e==="small"})}}}function ee(n){const{expanded:a,rootNamespace:r,collapsible:t}=n,e=T(d=>`${r||d}-item`);return{ns:e,classNames:{root:g(e,{[`${e}--disabled`]:t==="disabled",[`${e}--expanded`]:a}),header:g(`${e}__header`,{[`${e}__header--collapsible`]:t==="header"}),icon:g(`${e}__icon`,{[`${e}__icon--collapsible`]:t==="icon"}),title:g(`${e}__title`,{[`${e}__title--collapsible`]:t==="title"}),extra:`${e}__extra`,content:`${e}__content`}}}function ne(n){const{name:a,accordion:r,collapsible:t,expanded:e,rootCssNames:d,rootCssAttrs:m,onChange:l}=n,{ns:u,classNames:N}=ee(n),[x,C]=v([d,N,n.classNames,{root:n.className}],[m,n.styles,{root:n.style}],{omitted:n}),c=E(n,X);return{omitted:n,ns:u,cssNames:x,cssAttrs:C,restAttrs:c,resolveCollapsibleProps:p=>{if(!p.includes(t))return;const i=t==="disabled";return{"aria-expanded":e,"aria-disabled":i,tabIndex:i?-1:0,role:r?"tab":"button",onClick:i?void 0:()=>{l(a)},onKeyDown:i?void 0:f=>{Q(f,"enter")&&l(a)}}}}}function ae(n){const{omitted:a,ns:r,cssNames:t,cssAttrs:e,restAttrs:d,resolveCollapsibleProps:m}=ne(n),{ref:l,children:u,title:N,extra:x,name:C,accordion:c,expanded:h,expandIcon:p,keepMounted:i}=a,f=()=>{const o=B(p)?p({expanded:h,name:C}):p;return!A(o)&&s.jsx("span",{className:t.icon,style:e.icon,...m(["icon"]),children:o})};return s.jsxs("div",{...d,ref:l,className:t.root,style:e.root,children:[s.jsxs("div",{className:t.header,style:e.header,...m(["header"]),children:[f(),s.jsx("span",{className:t.title,style:e.title,...m(["title"]),children:N}),!A(x)&&s.jsx("span",{className:t.extra,style:e.extra,children:x})]}),s.jsx(W,{classNames:`${r}-motion`,mountOnEnter:!i,unmountOnExit:!i,when:h,onEnter:()=>({height:0}),onEntering:o=>({height:o.scrollHeight}),onExit:o=>({height:o.getBoundingClientRect().height}),onExiting:()=>({height:0}),children:(o,y)=>s.jsx("div",{ref:o,className:y.names(),style:y.attrs(),children:s.jsx("div",{className:t.content,style:e.content,role:c?"tabpanel":void 0,children:u})})})]})}function te(n){const a=n;return s.jsx("svg",{...a,children:s.jsx("path",{d:"M715.8 493.5 335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37"})})}const se=J(te,{name:"caret-right",theme:"outlined"}),U={bordered:!0,collapsible:"header",expandIconPlacement:"start",expandIcon:s.jsx(se,{})};function R(n,a){return a?k(n).slice(0,1):k(n)}function oe(n){const a=Y("collapse"),r=V.use(),{expandedNames:t,accordion:e,defaultExpandedNames:d,onChange:m,size:l=r,bordered:u=U.bordered,collapsible:N=U.collapsible,expandIcon:x=U.expandIcon,expandIconPlacement:C=U.expandIconPlacement}=n,c=n,h={bordered:u,collapsible:N,expandIcon:x,expandIconPlacement:C,size:l},[p,i]=L({defaultValue:()=>R(d,e),value:D(t)?void 0:R(t,e)}),{ns:f,classNames:o}=Z(h,c),[y,I]=v([a.classNames,{root:a.className},o,c.classNames,{root:c.className}],[a.styles,{root:a.style},c.styles,{root:c.style}],{picked:h,omitted:c}),M={...E(y,["root","item"]),root:y.item},K={...E(I,["root","item"]),root:I.item},O=q(S=>{let b=p.concat();const j=b.indexOf(S),w=j!==-1;e?b=w?[]:[S]:w?b.splice(j,1):b.push(S),i(b),m?.(S,b)});return{picked:h,omitted:c,ns:f,cssNames:y,cssAttrs:I,rootCssNames:M,rootCssAttrs:K,expandedNames:p,handleOnChange:O}}function $(n){const{picked:a,omitted:r,ns:t,cssNames:e,cssAttrs:d,rootCssNames:m,rootCssAttrs:l,expandedNames:u,handleOnChange:N}=oe(n),{collapsible:x,expandIcon:C,expandIconPlacement:c}=a,{ref:h,items:p,accordion:i,keepMounted:f}=r;return s.jsx("div",{ref:h,className:e.root,style:d.root,role:i?"tablist":void 0,children:F(p)&&p.map(o=>H.createElement(ae,{...o,key:o.name,accordion:i,collapsible:z(o.collapsible,x),expanded:i?u[0]===o.name:u.includes(o.name),expandIcon:z(o.expandIcon,C),expandIconPlacement:z(o.expandIconPlacement,c),keepMounted:z(o.keepMounted,f),rootCssAttrs:l,rootCssNames:m,rootNamespace:t,onChange:N}))})}const P=`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;function de(){return s.jsx($,{items:[{name:"1",title:"This is panel header 1",children:s.jsx("p",{children:P})},{name:"2",title:"This is panel header 2",children:s.jsx("p",{children:P})},{name:"3",title:"This is panel header 3",children:s.jsx("p",{children:P})}]})}const re={metaInfo:{"zh-CN":`基本用法展示折叠面板的展开与收起。

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
`,cssName:"css-a0421e2c",relativePath:"packages/core/src/collapse/__docs__/examples/basic.md"},_=`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;function me(){return s.jsx($,{accordion:!0,items:[{name:"1",title:"This is panel header 1",children:s.jsx("p",{children:_})},{name:"2",title:"This is panel header 2",children:s.jsx("p",{children:_})},{name:"3",title:"This is panel header 3",children:s.jsx("p",{children:_})}]})}const pe={metaInfo:{"zh-CN":`基本用法展示折叠面板的展开与收起。

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
`,cssName:"css-c90bbc06",relativePath:"packages/core/src/collapse/__docs__/examples/accordion.md"},he=[{name:"items",type:"CollapseItemType[]","zh-CN":"折叠面板内容","en-US":"Collapse panel items"},{name:"expandedNames",type:"Name | Name[]","zh-CN":"展开面板名称（受控）","en-US":"Expanded panel names (controlled)"},{name:"defaultExpandedNames",type:"Name | Name[]",default:"[]","zh-CN":"默认展开面板名称","en-US":"Default expanded panel names"},{name:"accordion",type:"boolean",default:"false","zh-CN":"是否为手风琴模式","en-US":"Whether to enable accordion mode"},{name:"bordered",type:"boolean",default:"true","zh-CN":"是否显示边框","en-US":"Whether to show border"},{name:"collapsible",type:"'header' | 'icon' | 'title' | 'disabled'",default:"'header'","zh-CN":"展开触发区域","en-US":"Trigger area for expanding"},{name:"expandIcon",type:"ReactNode | ((params: { expanded: boolean; name: Name }) => ReactNode)","zh-CN":"自定义展开图标","en-US":"Custom expand icon"},{name:"expandIconPlacement",type:"'start' | 'end'",default:"'start'","zh-CN":"展开图标位置","en-US":"Expand icon placement"},{name:"ghost",type:"boolean",default:"false","zh-CN":"是否为幽灵模式，无背景色","en-US":"Whether to enable ghost mode, no background"},{name:"keepMounted",type:"boolean",default:"false","zh-CN":"收起时是否保留元素","en-US":"Whether to keep mounted when collapsed"},{name:"size",type:"'small' | 'middle' | 'large'","zh-CN":"折叠面板尺寸","en-US":"Collapse panel size"},{name:"onChange",type:"(expandedName: Name, expandedNames: Name[]) => void","zh-CN":"展开项变化回调","en-US":"Callback when expanded items change"},{name:"children",type:"ReactNode","zh-CN":"折叠面板内容","en-US":"Content of the collapse"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"classNames",type:"Record<'root' | 'item' | 'header' | 'icon' | 'title' | 'extra' | 'content', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'item' | 'header' | 'icon' | 'title' | 'extra' | 'content', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}],ue=[{name:"name",type:"number | string","zh-CN":"面板名称，用作唯一标识","en-US":"Panel name, used as unique identifier"},{name:"title",type:"ReactNode","zh-CN":"标题","en-US":"Title"},{name:"extra",type:"ReactNode","zh-CN":"额外内容","en-US":"Extra content"},{name:"collapsible",enum:!0,type:["header","icon","title","disabled"],defaultValue:"header","zh-CN":"展开触发区域","en-US":"Trigger area for expanding"},{name:"expandIcon",type:"ReactNode | ((params: { expanded: boolean; name: Name }) => ReactNode)","zh-CN":"自定义展开图标","en-US":"Custom expand icon"},{name:"expandIconPlacement",enum:!0,type:["start","end"],defaultValue:"start","zh-CN":"展开图标位置","en-US":"Expand icon placement"},{name:"keepMounted",type:"boolean",defaultValue:"false","zh-CN":"收起时是否保留元素","en-US":"Whether to keep mounted when collapsed"},{name:"children",type:"ReactNode","zh-CN":"面板内容","en-US":"Panel content"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"classNames",type:"Record<'root' | 'header' | 'icon' | 'title' | 'extra' | 'content', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'header' | 'icon' | 'title' | 'extra' | 'content', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}];export{de as A,re as M,he as P,pe as a,me as b,ue as c};
