import{e as W,a as v,c as S,d as R,o as j,j as s,i as A,C as B,m as V,t as E,S as D,k as F,F as q,n as H,r as Y,f as z}from"./index-B0wB165Y.js";import{u as G}from"./index-CpwGlcOT.js";import{K as J,W as L,u as Q}from"./index-BNZhBJ2w.js";function X(n,t){return n.key===J[t]}const Z=W()(["children","className","classNames","style","styles","accordion","collapsible","expandIcon","expandIconPlacement","keepMounted","ref","name","extra","title","expanded","outerNamespace","outerCssNames","outerCssAttrs","onChange"]);function ee(n,t){const{bordered:m,expandIconPlacement:a,size:e}=n,{ghost:d,prefixCls:r}=t,l=v("collapse",r);return{ns:l,classNames:{root:S(l,{[`${l}--bordered`]:m&&!d,[`${l}--ghost`]:d,[`${l}--icon-end`]:a==="end",[`${l}--lg`]:e==="large",[`${l}--sm`]:e==="small"})}}}function ne(n){const{expanded:t,outerNamespace:m,collapsible:a}=n,e=v(d=>`${m||`${d}-collapse`}-item`);return{ns:e,classNames:{root:S(e,{[`${e}--disabled`]:a==="disabled",[`${e}--expanded`]:t}),header:S(`${e}__header`,{[`${e}__header--collapsible`]:a==="header"}),icon:S(`${e}__icon`,{[`${e}__icon--collapsible`]:a==="icon"}),title:S(`${e}__title`,{[`${e}__title--collapsible`]:a==="title"}),extra:`${e}__extra`,content:`${e}__content`}}}function ae(n){const{name:t,accordion:m,collapsible:a,expanded:e,outerCssNames:d,outerCssAttrs:r,onChange:l}=n,{ns:x,classNames:N}=ne(n),[u,C]=R([d,N,n.classNames,{root:n.className}],[r,n.styles,{root:n.style}],{omitted:n}),c=j(n,Z);return{omitted:n,ns:x,cssNames:u,cssAttrs:C,restAttrs:c,resolveCollapsibleProps:p=>{if(!p.includes(a))return;const i=a==="disabled";return{"aria-expanded":e,"aria-disabled":i,tabIndex:i?-1:0,role:m?"tab":"button",onClick:i?void 0:()=>{l(t)},onKeyDown:i?void 0:f=>{X(f,"enter")&&l(t)}}}}}function te(n){const{omitted:t,ns:m,cssNames:a,cssAttrs:e,restAttrs:d,resolveCollapsibleProps:r}=ae(n),{ref:l,children:x,title:N,extra:u,name:C,accordion:c,expanded:h,expandIcon:p,keepMounted:i}=t,f=()=>{const o=V(p)?p({expanded:h,name:C}):p;return!A(o)&&s.jsx("span",{className:a.icon,style:e.icon,...r(["icon"]),children:o})};return s.jsxs("div",{...d,ref:l,className:a.root,style:e.root,children:[s.jsxs("div",{className:a.header,style:e.header,...r(["header"]),children:[f(),s.jsx("span",{className:a.title,style:e.title,...r(["title"]),children:N}),!A(u)&&s.jsx("span",{className:a.extra,style:e.extra,children:u})]}),s.jsx(B,{classNames:`${m}-motion`,mountOnEnter:!i,unmountOnExit:!i,when:h,onEnter:()=>({height:0}),onEntering:o=>({height:o.scrollHeight}),onExit:o=>({height:o.getBoundingClientRect().height}),onExiting:()=>({height:0}),children:(o,b)=>s.jsx("div",{ref:o,className:b.names(),style:b.attrs(),children:s.jsx("div",{className:a.content,style:e.content,role:c?"tabpanel":void 0,children:x})})})]})}function se(n){const t=n;return s.jsx("svg",{...t,children:s.jsx("path",{d:"M715.8 493.5 335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37"})})}const oe=L(se,{name:"caret-right",theme:"outlined"}),U={bordered:!0,collapsible:"header",expandIconPlacement:"start",expandIcon:s.jsx(oe,{})};function $(n,t){return t?E(n).slice(0,1):E(n)}function le(n){const t=G("collapse"),m=D.use(),{accordion:a,expandedNames:e,defaultExpandedNames:d,onChange:r,size:l=m,bordered:x=U.bordered,collapsible:N=U.collapsible,expandIcon:u=U.expandIcon,expandIconPlacement:C=U.expandIconPlacement}=n,c=n,h={bordered:x,collapsible:N,expandIcon:u,expandIconPlacement:C,size:l},[p,i]=Q({value:F(e)?void 0:$(e,a),defaultValue:()=>$(d,a),onChange:(g,y)=>{r?.(y,g)}}),{ns:f,classNames:o}=ee(h,c),[b,I]=R([t.classNames,{root:t.className},o,c.classNames,{root:c.className}],[t.styles,{root:t.style},c.styles,{root:c.style}],{picked:h,omitted:c}),M={...j(b,["root","item"]),root:b.item},O={...j(I,["root","item"]),root:I.item},K=q(g=>{let y=p.concat();const k=y.indexOf(g),w=k!==-1;a?y=w?[]:[g]:w?y.splice(k,1):y.push(g),i(y,g)});return{picked:h,omitted:c,ns:f,cssNames:b,cssAttrs:I,expandedNames:p,outerCssNames:M,outerCssAttrs:O,handleOnChange:K}}function ce(n){const{picked:t,omitted:m,ns:a,cssNames:e,cssAttrs:d,expandedNames:r,outerCssNames:l,outerCssAttrs:x,handleOnChange:N}=le(n),{collapsible:u,expandIcon:C,expandIconPlacement:c}=t,{ref:h,items:p,accordion:i,keepMounted:f}=m;return s.jsx("div",{ref:h,className:e.root,style:d.root,role:i?"tablist":void 0,children:H(p)&&p.map(o=>Y.createElement(te,{...o,key:o.name,accordion:i,collapsible:z(o.collapsible,u),expanded:i?r[0]===o.name:r.includes(o.name),expandIcon:z(o.expandIcon,C),expandIconPlacement:z(o.expandIconPlacement,c),keepMounted:z(o.keepMounted,f),outerCssAttrs:x,outerCssNames:l,outerNamespace:a,onChange:N}))})}const T=Object.assign(ce,{}),P=`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;function me(){return s.jsx(T,{items:[{name:"1",title:"This is panel header 1",children:s.jsx("p",{children:P})},{name:"2",title:"This is panel header 2",children:s.jsx("p",{children:P})},{name:"3",title:"This is panel header 3",children:s.jsx("p",{children:P})}]})}const pe={metaInfo:{"zh-CN":`基本用法展示折叠面板的展开与收起。

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
`;function he(){return s.jsx(T,{accordion:!0,items:[{name:"1",title:"This is panel header 1",children:s.jsx("p",{children:_})},{name:"2",title:"This is panel header 2",children:s.jsx("p",{children:_})},{name:"3",title:"This is panel header 3",children:s.jsx("p",{children:_})}]})}const ue={metaInfo:{"zh-CN":`基本用法展示折叠面板的展开与收起。

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
`,cssName:"css-c90bbc06",relativePath:"packages/core/src/collapse/__docs__/examples/accordion.md"},xe=[{name:"items",type:"CollapseItemType[]","zh-CN":"折叠面板内容","en-US":"Collapse panel items"},{name:"expandedNames",type:"Name | Name[]","zh-CN":"展开面板名称（受控）","en-US":"Expanded panel names (controlled)"},{name:"defaultExpandedNames",type:"Name | Name[]",default:"[]","zh-CN":"默认展开面板名称","en-US":"Default expanded panel names"},{name:"accordion",type:"boolean",default:"false","zh-CN":"是否为手风琴模式","en-US":"Whether to enable accordion mode"},{name:"bordered",type:"boolean",default:"true","zh-CN":"是否显示边框","en-US":"Whether to show border"},{name:"collapsible",type:"'header' | 'icon' | 'title' | 'disabled'",default:"'header'","zh-CN":"展开触发区域","en-US":"Trigger area for expanding"},{name:"expandIcon",type:"ReactNode | ((params: { expanded: boolean; name: Name }) => ReactNode)","zh-CN":"自定义展开图标","en-US":"Custom expand icon"},{name:"expandIconPlacement",type:"'start' | 'end'",default:"'start'","zh-CN":"展开图标位置","en-US":"Expand icon placement"},{name:"ghost",type:"boolean",default:"false","zh-CN":"是否为幽灵模式，无背景色","en-US":"Whether to enable ghost mode, no background"},{name:"keepMounted",type:"boolean",default:"false","zh-CN":"收起时是否保留元素","en-US":"Whether to keep mounted when collapsed"},{name:"size",type:"'small' | 'middle' | 'large'","zh-CN":"折叠面板尺寸","en-US":"Collapse panel size"},{name:"onChange",type:"(expandedName: Name, expandedNames: Name[]) => void","zh-CN":"展开项变化回调","en-US":"Callback when expanded items change"},{name:"children",type:"ReactNode","zh-CN":"折叠面板内容","en-US":"Content of the collapse"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"classNames",type:"Record<'root' | 'item' | 'header' | 'icon' | 'title' | 'extra' | 'content', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'item' | 'header' | 'icon' | 'title' | 'extra' | 'content', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}],Ne=[{name:"name",type:"number | string","zh-CN":"面板名称，用作唯一标识","en-US":"Panel name, used as unique identifier"},{name:"title",type:"ReactNode","zh-CN":"标题","en-US":"Title"},{name:"extra",type:"ReactNode","zh-CN":"额外内容","en-US":"Extra content"},{name:"collapsible",enum:!0,type:["header","icon","title","disabled"],defaultValue:"header","zh-CN":"展开触发区域","en-US":"Trigger area for expanding"},{name:"expandIcon",type:"ReactNode | ((params: { expanded: boolean; name: Name }) => ReactNode)","zh-CN":"自定义展开图标","en-US":"Custom expand icon"},{name:"expandIconPlacement",enum:!0,type:["start","end"],defaultValue:"start","zh-CN":"展开图标位置","en-US":"Expand icon placement"},{name:"keepMounted",type:"boolean",defaultValue:"false","zh-CN":"收起时是否保留元素","en-US":"Whether to keep mounted when collapsed"},{name:"children",type:"ReactNode","zh-CN":"面板内容","en-US":"Panel content"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"classNames",type:"Record<'root' | 'header' | 'icon' | 'title' | 'extra' | 'content', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'header' | 'icon' | 'title' | 'extra' | 'content', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}];export{me as A,pe as M,xe as P,ue as a,he as b,Ne as c};
