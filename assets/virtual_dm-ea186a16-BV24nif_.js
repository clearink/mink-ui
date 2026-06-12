import{q as I,s as _,f as $,W as M,a as j,c as k,S as D,z as q,D as H,b as R,N as Y,r as z,o as w,B as F,j as c,C as L}from"./index-MrfF1wwl.js";import{g as v,u as X,a as G,h as J,c as K,B as Q}from"./index-BUUmuQX0.js";import{u as Z}from"./index-BQK0WB1A.js";const E={block:!1,size:"middle"};function ee(n){return I(n)?n.map(e=>{if(!_(e))return{label:e,title:`${e}`,value:e};const{label:t,title:s}=e;return{...e,title:$(s,_(t)?void 0:`${t}`)}}):[]}class te{_cleanup=null;$inner={current:null};$thumb={current:null};$instance={current:null};items=new Map;get inner(){return this.$inner.current}get thumb(){return this.$thumb.current}get instance(){return this.$instance.current}collect=(e,t)=>{e?this.items.set(t.value,e):this.items.delete(t.value)};clear=()=>{this._cleanup?.(),this._cleanup=null};update=e=>{this.clear(),this._cleanup=M(()=>{const t=this.items.get(e);if(!t||!this.instance||!this.inner)return;const s=v(this.inner),l=v(t),a=l.left-s.left;this.instance.setCssValues({transform:`translateX(${a}px)`,width:`${l.width}px`})})};resolve=e=>{const t=v(e),s=v(this.inner);return{transform:`translate3d(${t.left-s.left}px, 0, 0)`,width:`${t.width}px`}};destroy=()=>{this.clear(),this.items.clear()}}function ne(n,e){const{disabled:t,orientation:s,prefixCls:l}=e,a=j("segmented",l);return{ns:a,classNames:{root:k(a,{[`${a}--disabled`]:t,[`${a}--vertical`]:s==="vertical"}),inner:`${a}__inner`,thumb:`${a}__thumb`}}}function se(n){const{outerNamespace:e,checked:t,config:s,isShowThumb:l}=n,{disabled:a}=s,r=j(d=>`${e||`${d}-segmented`}-item`);return{ns:r,classNames:{root:k(r,{[`${r}--disabled`]:a,[`${r}--selected`]:t&&!l}),label:`${r}__label`}}}function ae(n){const e=X("segmented"),t=D.use(),{options:s,value:l,defaultValue:a,onChange:r,block:d=E.block,size:h=$(e.size,t,E.size)}=n,i=n,C={block:d,size:h},o=q(()=>new te),b=H(()=>ee(s),s,G),[u,S]=Z(l,()=>$(a,b[0]?.value),r),{ns:f,classNames:x}=ne(C,i),[y,g]=R([e.classNames,{root:e.className},x,i.classNames,{root:i.className}],[e.styles,{root:e.style},i.styles,{root:i.style}],{meta:{...i,...C,options:b,value:u}}),[m,N]=Y(()=>[null,u]),[T,U]=z.useState(!1),A={...w(y,["root","inner","item"]),root:y.item},V={...w(g,["root","inner","item"]),root:g.item},P=()=>{const p=o.items.get(m[0]);if(!(!p||!o.inner))return o.resolve(p)},O=()=>{const p=o.items.get(m[1]);if(!(!p||!o.inner))return o.resolve(p)},B=()=>{U(!1)},W=F(u,()=>{N([m[1],u],()=>{U(!0)}),o.update(u)});return z.useEffect(()=>()=>{o.destroy()},[o]),{omitted:i,ns:f,cssNames:y,cssAttrs:g,ctrl:o,options:b,value:u,isShowThumb:T,outerCssNames:A,outerCssAttrs:V,returnEmpty:W,handleChange:S,handleEnter:P,handleEntering:O,handleEntered:B}}function le(n){const{config:e,outerCssNames:t,outerCssAttrs:s,onChange:l,onCollect:a}=n,{ref:r,value:d,disabled:h}=e,{ns:i,classNames:C}=se(n),[o,b]=R([t,C,n.classNames,{root:n.className}],[s,n.styles,{root:n.style}],{meta:n}),u=J(r,f=>{a(f,e)});return{omitted:n,ns:i,cssNames:o,cssAttrs:b,refCombined:u,handleChange:()=>{!h&&l?.(d)}}}function oe(n){const{omitted:e,ns:t,cssNames:s,cssAttrs:l,refCombined:a,handleChange:r}=le(n),{checked:d,config:h}=e,{label:i,title:C,disabled:o}=h;return c.jsxs("label",{ref:a,className:s.root,style:l.root,children:[c.jsx("input",{className:`${t}__radio`,checked:d,disabled:o,type:"radio",onChange:r}),c.jsx("div",{className:s.label,style:l.label,title:C,children:i})]})}function re(n){const{omitted:e,ns:t,cssNames:s,cssAttrs:l,ctrl:a,options:r,value:d,isShowThumb:h,outerCssNames:i,outerCssAttrs:C,returnEmpty:o,handleChange:b,handleEnter:u,handleEntering:S,handleEntered:f}=ae(n),{disabled:x}=e;if(o)return null;const y=()=>h?c.jsx(L,{ref:a.$instance,classNames:`${t}-motion`,appear:!0,when:!0,timeouts:3e3,onEnter:u,onEntered:f,onEntering:S,children:(m,N)=>c.jsx("div",{ref:K(m,a.$thumb),className:k(s.thumb,N.names()),style:{...l.thumb,...N.attrs()}})}):null,g=()=>r.map(m=>c.jsx(oe,{checked:d===m.value,config:m,disabled:x||m.disabled,isShowThumb:h,outerCssAttrs:C,outerCssNames:i,outerNamespace:t,onChange:b,onCollect:a.collect},m.value));return c.jsx("div",{className:s.root,style:l.root,children:c.jsxs("div",{ref:a.$inner,className:s.inner,style:l.inner,children:[y(),g()]})})}const ie=Object.assign(re,{});function de(){const[n,e]=z.useState("daily"),t=z.useRef();return c.jsxs("div",{children:[c.jsx(Q,{onClick:()=>{clearTimeout(t.current),e("weekly"),t.current=setTimeout(()=>{e("all")},300)},children:"change"}),c.jsx(ie,{options:[{label:"Daily",value:"daily"},{label:"Weekly",value:"weekly"},{label:"Monthly",value:"monthly"},{label:"Yearly",value:"yearly"},{label:"All",value:"all"},{label:"Custom",value:"custom"}],value:n,onChange:s=>{e(s)}})]})}const he={metaInfo:{"zh-CN":`基本用法展示分段控制器。

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
`,cssName:"css-a48ff872",relPath:"packages/core/src/segmented/__docs__/examples/basic.md"},Ce=[{name:"options",type:"SegmentedOption[]","zh-CN":"选项数据","en-US":"Options data"},{name:"value",type:"SegmentedValue","zh-CN":"当前选中的值","en-US":"Currently selected value"},{name:"defaultValue",type:"SegmentedValue","zh-CN":"默认选中的值","en-US":"Default selected value"},{name:"onChange",type:"(value: SegmentedValue) => void","zh-CN":"选项变化时的回调函数","en-US":"Callback when selection changes"},{name:"disabled",type:"boolean",default:"false","zh-CN":"是否禁用","en-US":"Whether disabled"},{name:"size",type:"'small' | 'middle' | 'large'","zh-CN":"控制尺寸","en-US":"Control size"},{name:"vertical",type:"boolean","zh-CN":"是否垂直方向","en-US":"Whether vertical direction"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"classNames",type:"Record<'root' | 'item' | 'thumb', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'item' | 'thumb', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}],be=[{name:"label",type:"ReactNode","zh-CN":"选项文本","en-US":"Option label"},{name:"value",type:"string | number","zh-CN":"选项值","en-US":"Option value"},{name:"title",type:"string","zh-CN":"html title 属性","en-US":"HTML title attribute"},{name:"disabled",type:"boolean","zh-CN":"是否禁用","en-US":"Whether the option is disabled"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"classNames",type:"Record<'root' | 'label', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'label', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}];export{de as A,he as M,Ce as P,be as a};
