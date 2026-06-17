import{q as M,s as _,f as $,$ as W,a as j,c as k,S as D,A as H,b as E,O as Y,r as z,o as w,D as q,j as c,C as L}from"./index-W1RE6nsY.js";import{g as v,u as X,h as F,c as G,B as J}from"./index-CKwpuKI3.js";import{u as K}from"./index-B_U17hxC.js";const T={block:!1,size:"middle"};function Q(s){return M(s)?s.map(e=>{if(!_(e))return{label:e,title:`${e}`,value:e};const{label:t,title:n}=e;return{...e,title:$(n,_(t)?void 0:`${t}`)}}):[]}class Z{_cleanup=null;$inner={current:null};$thumb={current:null};$instance={current:null};items=new Map;get inner(){return this.$inner.current}get thumb(){return this.$thumb.current}get instance(){return this.$instance.current}collect=(e,t)=>{e?this.items.set(t.value,e):this.items.delete(t.value)};dispose=()=>{this._cleanup?.(),this._cleanup=null};update=e=>{this.dispose(),this._cleanup=W(()=>{const t=this.items.get(e);if(!t||!this.instance||!this.inner)return;const n=v(this.inner),l=v(t),a=l.left-n.left;this.instance.setCssValues({transform:`translateX(${a}px)`,width:`${l.width}px`})})};resolve=e=>{const t=v(e),n=v(this.inner);return{transform:`translate3d(${t.left-n.left}px, 0, 0)`,width:`${t.width}px`}};destroy=()=>{this.dispose(),this.items.clear()}}function ee(s,e){const{disabled:t,orientation:n,prefixCls:l}=e,a=j("segmented",l);return{ns:a,classNames:{root:k(a,{[`${a}--disabled`]:t,[`${a}--vertical`]:n==="vertical"}),inner:`${a}__inner`,thumb:`${a}__thumb`}}}function te(s){const{outerNamespace:e,checked:t,option:n,isShowThumb:l}=s,{disabled:a}=n,r=j(d=>`${e||`${d}-segmented`}-item`);return{ns:r,classNames:{root:k(r,{[`${r}--disabled`]:a,[`${r}--selected`]:t&&!l}),label:`${r}__label`}}}function se(s){const e=X("segmented"),t=D.use(),{options:n,value:l,defaultValue:a,onChange:r,block:d=T.block,size:h=$(e.size,t,T.size)}=s,i=s,C={block:d,size:h},o=H(()=>new Z),b=Q(n),[u,S]=K(l,()=>$(a,b[0]?.value),r),{ns:p,classNames:x}=ee(C,i),[y,f]=E([e.classNames,{root:e.className},x,i.classNames,{root:i.className}],[e.styles,{root:e.style},i.styles,{root:i.style}],{meta:{...i,...C,options:b,value:u}}),[m,N]=Y(()=>[null,u]),[R,U]=z.useState(!1),A={...w(y,["root","inner","item"]),root:y.item},V={...w(f,["root","inner","item"]),root:f.item},P=()=>{const g=o.items.get(m[0]);if(!(!g||!o.inner))return o.resolve(g)},O=()=>{const g=o.items.get(m[1]);if(!(!g||!o.inner))return o.resolve(g)},B=()=>{U(!1)},I=q(u,()=>{N([m[1],u],()=>{U(!0)}),o.update(u)});return z.useEffect(()=>()=>{o.destroy()},[o]),{omitted:i,ns:p,cssNames:y,cssAttrs:f,ctrl:o,options:b,value:u,isShowThumb:R,outerCssNames:A,outerCssAttrs:V,returnEmpty:I,handleChange:S,handleEnter:P,handleEntering:O,handleEntered:B}}function ne(s){const{option:e,outerCssNames:t,outerCssAttrs:n,onChange:l,onCollect:a}=s,{ref:r,value:d,disabled:h}=e,{ns:i,classNames:C}=te(s),[o,b]=E([t,C,s.classNames,{root:s.className}],[n,s.styles,{root:s.style}],{meta:s}),u=F(r,p=>{a(p,e)});return{omitted:s,ns:i,cssNames:o,cssAttrs:b,refCombined:u,handleChange:()=>{!h&&l?.(d)}}}function ae(s){const{omitted:e,ns:t,cssNames:n,cssAttrs:l,refCombined:a,handleChange:r}=ne(s),{checked:d,disabled:h,option:i}=e,{label:C,title:o}=i;return c.jsxs("label",{ref:a,className:n.root,style:l.root,children:[c.jsx("input",{className:`${t}__radio`,checked:d,disabled:h,type:"radio",onChange:r}),c.jsx("div",{className:n.label,style:l.label,title:o,children:C})]})}function le(s){const{omitted:e,ns:t,cssNames:n,cssAttrs:l,ctrl:a,options:r,value:d,isShowThumb:h,outerCssNames:i,outerCssAttrs:C,returnEmpty:o,handleChange:b,handleEnter:u,handleEntering:S,handleEntered:p}=se(s),{disabled:x}=e;if(o)return null;const y=()=>h?c.jsx(L,{ref:a.$instance,classNames:`${t}-motion`,appear:!0,when:!0,timeouts:3e3,onEnter:u,onEntered:p,onEntering:S,children:(m,N)=>c.jsx("div",{ref:G(m,a.$thumb),className:k(n.thumb,N.names()),style:{...l.thumb,...N.attrs()}})}):null,f=()=>r.map(m=>c.jsx(ae,{checked:d===m.value,disabled:x||m.disabled,isShowThumb:h,option:m,outerCssAttrs:C,outerCssNames:i,outerNamespace:t,onChange:b,onCollect:a.collect},m.value));return c.jsx("div",{className:n.root,style:l.root,children:c.jsxs("div",{ref:a.$inner,className:n.inner,style:l.inner,children:[y(),f()]})})}const oe=Object.assign(le,{});function ue(){const[s,e]=z.useState("daily"),t=z.useRef();return c.jsxs("div",{children:[c.jsx(J,{onClick:()=>{clearTimeout(t.current),e("weekly"),t.current=setTimeout(()=>{e("all")},300)},children:"change"}),c.jsx(oe,{options:[{label:"Daily",value:"daily"},{label:"Weekly",value:"weekly"},{label:"Monthly",value:"monthly"},{label:"Yearly",value:"yearly"},{label:"All",value:"all"},{label:"Custom",value:"custom"}],value:s,onChange:n=>{e(n)}})]})}const me={metaInfo:{"zh-CN":`基本用法展示分段控制器。

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
`,cssName:"css-a48ff872",relPath:"packages/core/src/segmented/__docs__/examples/basic.md"},de=[{name:"options",type:"SegmentedOptionType[]","zh-CN":"选项数据","en-US":"Options data"},{name:"value",type:"SegmentedValue","zh-CN":"当前选中的值","en-US":"Currently selected value"},{name:"defaultValue",type:"SegmentedValue","zh-CN":"默认选中的值","en-US":"Default selected value"},{name:"onChange",type:"(value: SegmentedValue) => void","zh-CN":"选项变化时的回调函数","en-US":"Callback when selection changes"},{name:"disabled",type:"boolean",default:"false","zh-CN":"是否禁用","en-US":"Whether disabled"},{name:"size",type:"'small' | 'middle' | 'large'","zh-CN":"控制尺寸","en-US":"Control size"},{name:"vertical",type:"boolean","zh-CN":"是否垂直方向","en-US":"Whether vertical direction"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"classNames",type:"Record<'root' | 'item' | 'thumb', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'item' | 'thumb', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}],he=[{name:"label",type:"ReactNode","zh-CN":"选项文本","en-US":"Option label"},{name:"value",type:"string | number","zh-CN":"选项值","en-US":"Option value"},{name:"title",type:"string","zh-CN":"html title 属性","en-US":"HTML title attribute"},{name:"disabled",type:"boolean","zh-CN":"是否禁用","en-US":"Whether the option is disabled"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"classNames",type:"Record<'root' | 'label', string>","zh-CN":"语义化类名","en-US":"Semantic class names"},{name:"styles",type:"Record<'root' | 'label', React.CSSProperties>","zh-CN":"语义化样式","en-US":"Semantic styles"}];export{ue as A,me as M,de as P,he as a};
