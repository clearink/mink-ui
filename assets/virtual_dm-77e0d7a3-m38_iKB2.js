import{q as B,s as U,f as z,$ as W,a as T,c as x,S as I,z as M,b as j,O as D,r as N,o as _,B as H,j as c,C as L}from"./index-Dr6lDk65.js";import{u as Y,g as q,B as F}from"./index-lD9sanz9.js";import{u as G}from"./index-Id53yg6J.js";const $={block:!1,size:"middle"};function J(s){return B(s)?s.map(e=>{if(!U(e))return{label:e,title:`${e}`,value:e};const{label:t,title:n}=e;return{...e,title:z(n,U(t)?void 0:`${t}`)}}):[]}class K{_cleanup=null;$instance={current:null};items=new Map;get instance(){return this.$instance.current}dispose=()=>{this._cleanup?.(),this._cleanup=null};collect=(e,t)=>{e?this.items.set(t.value,e):this.items.delete(t.value)};resolve=e=>{const t=this.items.get(e);if(t)return{transform:`translate3d(${t.offsetLeft}px, 0, 0)`,width:`${t.clientWidth}px`}};update=e=>{this.dispose(),this._cleanup=W(()=>{const t=this.instance?this.resolve(e):null;t&&this.instance.setCssValues(t)})};destroy=()=>{this.dispose(),this.items.clear()}}function Q(s,e){const{disabled:t,orientation:n,prefixCls:l}=e,a=T("segmented",l);return{ns:a,classNames:{root:x(a,{[`${a}--disabled`]:t,[`${a}--vertical`]:n==="vertical"}),inner:`${a}__inner`,thumb:`${a}__thumb`}}}function X(s){const{outerNamespace:e,checked:t,option:n,isShowThumb:l}=s,{disabled:a}=n,o=T(d=>`${e||`${d}-segmented`}-item`);return{ns:o,classNames:{root:x(o,{[`${o}--disabled`]:a,[`${o}--selected`]:t&&!l}),label:`${o}__label`}}}function Z(s){const e=Y("segmented"),t=I.use(),{options:n,value:l,defaultValue:a,onChange:o,block:d=$.block,size:h=z(e.size,t,$.size)}=s,r=s,C={block:d,size:h},i=M(()=>new K),p=J(n),[u,f]=G(l,()=>z(a,p[0]?.value),o),{ns:y,classNames:v}=Q(C,r),[b,S]=j([e.classNames,{root:e.className},v,r.classNames,{root:r.className}],[e.styles,{root:e.style},r.styles,{root:r.style}],{meta:{...r,...C,options:p,value:u}}),[m,g]=D(()=>[null,u]),[E,k]=N.useState(!1),w={..._(b,["root","inner","item"]),root:b.item},R={..._(S,["root","inner","item"]),root:S.item},A=()=>i.resolve(m[0]),V=()=>i.resolve(m[1]),P=()=>{k(!1)},O=H(u,()=>{g([m[1],u],()=>{k(!0)}),i.update(u)});return N.useEffect(()=>()=>{i.destroy()},[i]),{omitted:r,ns:y,cssNames:b,cssAttrs:S,ctrl:i,options:p,value:u,isShowThumb:E,outerCssNames:w,outerCssAttrs:R,returnEmpty:O,handleChange:f,handleEnter:A,handleEntering:V,handleEntered:P}}function ee(s){const{option:e,outerCssNames:t,outerCssAttrs:n,onChange:l,onCollect:a}=s,{ref:o,value:d,disabled:h}=e,{ns:r,classNames:C}=X(s),[i,p]=j([t,C,s.classNames,{root:s.className}],[n,s.styles,{root:s.style}],{meta:s}),u=q(o,y=>{a(y,e)});return{omitted:s,ns:r,cssNames:i,cssAttrs:p,refComposed:u,handleChange:()=>{!h&&l?.(d)}}}function te(s){const{omitted:e,ns:t,cssNames:n,cssAttrs:l,refComposed:a,handleChange:o}=ee(s),{checked:d,disabled:h,option:r}=e,{label:C,title:i}=r;return c.jsxs("label",{ref:a,className:n.root,style:l.root,children:[c.jsx("input",{className:`${t}__radio`,checked:d,disabled:h,type:"radio",onChange:o}),c.jsx("div",{className:n.label,style:l.label,title:i,children:C})]})}function se(s){const{omitted:e,ns:t,cssNames:n,cssAttrs:l,ctrl:a,options:o,value:d,isShowThumb:h,outerCssNames:r,outerCssAttrs:C,returnEmpty:i,handleChange:p,handleEnter:u,handleEntering:f,handleEntered:y}=Z(s),{disabled:v}=e;if(i)return null;const b=()=>h?c.jsx(L,{ref:a.$instance,classNames:`${t}-motion`,appear:!0,when:!0,timeouts:3e3,onEnter:u,onEntered:y,onEntering:f,children:(m,g)=>c.jsx("div",{ref:m,className:x(n.thumb,g.names()),style:{...l.thumb,...g.attrs()}})}):null,S=()=>o.map(m=>c.jsx(te,{checked:d===m.value,disabled:v||m.disabled,isShowThumb:h,option:m,outerCssAttrs:C,outerCssNames:r,outerNamespace:t,onChange:p,onCollect:a.collect},m.value));return c.jsx("div",{className:n.root,style:l.root,children:c.jsxs("div",{className:n.inner,style:l.inner,children:[b(),S()]})})}const ne=Object.assign(se,{});function re(){const[s,e]=N.useState("daily"),t=N.useRef();return c.jsxs("div",{children:[c.jsx(F,{onClick:()=>{clearTimeout(t.current),e("weekly"),t.current=setTimeout(()=>{e("all")},300)},children:"change"}),c.jsx(ne,{options:[{label:"Daily",value:"daily"},{label:"Weekly",value:"weekly"},{label:"Monthly",value:"monthly"},{label:"Yearly",value:"yearly"},{label:"All",value:"all"},{label:"Custom",value:"custom"}],value:s,onChange:n=>{e(n)}})]})}const ie={metaInfo:{"zh-CN":`基本用法展示分段控制器。

`,"en-US":`Basic usage of segmented control.

`},rawText:`\`\`\`tsx
import { useRef, useState } from 'react'
import { Button, Segmented } from '@mink-ui/core'

export default function App() {
  const [value, setValue] = useState('daily')
  const t = useRef()
  return (
    <div>
      <Button onClick={() => {
        clearTimeout(t.current)
        setValue('weekly')

        t.current = setTimeout(() => {
          setValue('all')
        }, 300)
      }}
      >
        change
      </Button>
      <Segmented
        options={[
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Yearly', value: 'yearly' },
          { label: 'All', value: 'all' },
          { label: 'Custom', value: 'custom' }
        ]}
        value={value}
        onChange={(value) => { setValue(value) }}
      />
    </div>
  )
}
\`\`\`
`,cssName:"css-a48ff872",relPath:"packages/core/src/segmented/__docs__/examples/basic.md"},ce=[{name:"options",type:"SegmentedOptionType[]","zh-CN":"选项数据","en-US":"Options data"},{name:"value",type:"SegmentedValue","zh-CN":"当前选中的值","en-US":"Currently selected value"},{name:"defaultValue",type:"SegmentedValue","zh-CN":"默认选中的值","en-US":"Default selected value"},{name:"onChange",type:"(value: SegmentedValue) => void","zh-CN":"选项变化时的回调函数","en-US":"Callback when selection changes"},{name:"disabled",type:"boolean",default:"false","zh-CN":"是否禁用","en-US":"Whether disabled"},{name:"size",type:"'small' | 'middle' | 'large'","zh-CN":"控制尺寸","en-US":"Control size"},{name:"vertical",type:"boolean","zh-CN":"是否垂直方向","en-US":"Whether vertical direction"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"classNames",type:"Record<'root' | 'item' | 'thumb', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'item' | 'thumb', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}],ue=[{name:"label",type:"ReactNode","zh-CN":"选项文本","en-US":"Option label"},{name:"value",type:"string | number","zh-CN":"选项值","en-US":"Option value"},{name:"title",type:"string","zh-CN":"html title 属性","en-US":"HTML title attribute"},{name:"disabled",type:"boolean","zh-CN":"是否禁用","en-US":"Whether the option is disabled"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"classNames",type:"Record<'root' | 'label', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'label', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}];export{re as A,ie as M,ce as P,ue as a};
