import{a as $,c as V,f as C,F as _,i as w,s as G,P as M,t as j,Q as B,r as N,n as P,z as E,A as T,B as U,T as O,g as H,b as L,o as S,J as K,j as c}from"./index-BUOH1Umd.js";import{f as q,u as F,g as W,B as z}from"./index-2-V2RRra.js";import{a as A}from"./index-B56aqUFZ.js";import{G as D}from"./group-transition-mWHjHYee.js";import{n as J}from"./slots-0Oyo5YD6.js";import{C as Q}from"./CloseOutlined-Chj4-XJJ.js";const v={gutter:0,columns:3};function X(n){const{prefixCls:e}=n,t=$("masonry",e);return{ns:t,classNames:{root:V(t,{})}}}function Y(n){const{outerNamespace:e}=n;return{classNames:{root:$(o=>`${e||`${o}-masonry`}-item`)}}}function Z(n,e){if(n.length===0)return-1;let t=0;for(let o=0;o<n.length;o++)e(n[o],n[t])&&(t=o);return t}function k(n,e,t){return Math.max(Math.min(n,t),e)}function ee(n,e){const t=w(e)?v.columns:G(e)?C(M(n,e),e.xs,1):C(e,v.columns);return k(t,1,1/0)}function te(n,e){const{hGutter:t,vGutter:o}=(()=>{const[a,r]=j(e),s=C(M(n,a),0),m=C(M(n,r),s);return{hGutter:s,vGutter:m}})();return{hGutter:k(t,0,1/0),vGutter:k(o,0,1/0)}}function ne(n,e,t,o,a){const r={height:0},s=new Map,m=[],i=Array.from({length:t},()=>({total:0}));for(let h=0,u=0;u<n.length;u++){const{key:d,column:x}=n[u],f=e.get(d)||0,y=k(C(x,h),0,t-1),g=i[y].total?a:0;i[y].total+=f+g,y===h&&(h=Z(i,(p,l)=>p.total<l.total)),s.set(d,{"--masonry-item-width":`calc((100% - ${o*(t-1)}px) / ${t})`,"--masonry-item-top":`${i[y].total-f}px`,"--masonry-item-left":`calc((100% + ${o}px) / ${t} * ${y} )`}),m.push({...n[u],key:d,column:y})}return r.height=i.reduce((h,u)=>Math.max(h,u.total),0),{rootCssVars:r,itemCssVars:s,itemLayouts:m}}function se(n,e){return n.length!==e.length?!1:n.every((t,o)=>_(t.key,e[o].key)&&_(t.column,e[o].column))}class oe{_change;_elements=new Map;$root={current:null};get root(){return this.$root.current}_bind=e=>{this._change=e};collect=(e,t)=>{e?this._elements.set(t.key,e):this._elements.delete(t.key)};trigger=()=>{this._change(e=>{const t=new Map;let o=this._elements.size!==e.size;return this._elements.forEach((a,r)=>{const s=a.clientHeight;t.set(r,s),e.get(r)!==s&&(o=!0)}),o?t:e})};measure=e=>{this._change(t=>{const o=new Map,a=new Set(e.map(s=>s.key));let r=a.size!==t.size;return this._elements.forEach((s,m)=>{if(!a.has(m))return;const i=s.clientHeight;o.set(m,i),t.get(m)!==i&&(r=!0)}),r?o:t})}}function ae(n){const{gutter:e,columns:t}=n,o=B(),a=N.useMemo(()=>ee(o,t),[o,t]),{hGutter:r,vGutter:s}=N.useMemo(()=>te(o,e),[o,e]);return{cols:a,hGutter:r,vGutter:s}}function re(n,e){const{items:t}=n,{onLayoutChange:o}=e,[a,r]=N.useState(()=>P),[s,m]=N.useState(()=>new Map),i=E(()=>new oe);T(()=>{i._bind(l=>{m(l)})});const{cols:h,hGutter:u,vGutter:d}=ae(n),{rootCssVars:x,itemCssVars:f,itemLayouts:y}=N.useMemo(()=>ne(t,s,h,u,d),[t,s,h,u,d]),g=q(()=>{i.trigger()}),p=U(y,l=>{r(()=>O(()=>{o?.(l)}))},(l,I)=>!o||se(l,I));return A(i.$root,!0,g),H(()=>{i.measure(t)},[t,i]),N.useEffect(()=>{a()},[a]),{ctrl:i,cols:h,hGutter:u,rootCssVars:x,itemCssVars:f,hasLayoutChanged:p,handleReLayout:g}}function me(n){const e=F("masonry"),{items:t,gutter:o=v.gutter,columns:a=v.columns}=n,r=j(t,!0),s=n,m={items:r,gutter:o,columns:a},{ctrl:i,cols:h,rootCssVars:u,itemCssVars:d,hasLayoutChanged:x,handleReLayout:f}=re(m,s),{ns:y,classNames:g}=X(s),[p,l]=L([e.classNames,{root:e.className},g,s.classNames,{root:s.className}],[e.styles,{root:e.style},s.styles,{root:s.style},{root:u}],{meta:{...s,...m,items:r,columns:h}}),I={...S(p,["root","item"]),root:p.item},R={...S(l,["root","item"]),root:l.item};return{picked:m,omitted:s,ns:y,cssNames:p,cssAttrs:l,ctrl:i,itemCssVars:d,outerCssNames:I,outerCssAttrs:R,returnEmpty:x,handleReLayout:f}}function ie(n){const{ref:e,item:t,slots:o,getters:a,enabled:r,outerCssNames:s,outerCssAttrs:m,outerCssVars:i,onCollect:h,onReLayout:u}=n,d=N.useRef(null),{classNames:x}=Y(n),[f,y]=L([s,x,{root:a.names()}],[m,{root:i},{root:a.attrs()}],{}),g=J({currentState:{slots:o}}),p=W(e,d,K(l=>{h(l,t)}));return A(d,r,u),{omitted:n,cssNames:f,cssAttrs:y,refComposed:p,renderSlots:g}}function ce(n){const{omitted:e,cssNames:t,cssAttrs:o,refComposed:a,renderSlots:r}=ie(n),{item:s}=e,{children:m}=s;return c.jsx("div",{ref:a,className:t.root,style:o.root,children:r({name:"item",children:m,params:s})})}function ue(n){const{picked:e,omitted:t,ns:o,cssNames:a,cssAttrs:r,ctrl:s,itemCssVars:m,outerCssNames:i,outerCssAttrs:h,returnEmpty:u,handleReLayout:d}=me(n),{items:x}=e,{slots:f,observeItem:y}=t;return u?null:c.jsx("div",{ref:s.$root,className:a.root,style:r.root,onError:d,onLoad:d,children:c.jsx(D,{classNames:`${o}-motion`,appear:!0,items:x,children:(g,p,l)=>c.jsx(ce,{ref:g,enabled:!!y,getters:p,item:l,outerCssAttrs:h,outerCssNames:i,outerCssVars:m.get(l.key),outerNamespace:o,slots:f,onCollect:s.collect,onReLayout:d})})})}const b=Object.assign(ue,{}),le=[150,50,90,70,110,150,130,80,50,90,100,150,60,50,80].map((n,e)=>({key:`item-${e}`,data:{height:n,index:e}}));function Ce(){return c.jsx(b,{columns:4,gutter:16,items:le,slots:{item:(n,{data:e})=>e.index===4?c.jsxs("div",{className:"card no-padding",children:[c.jsx("img",{className:"image",src:"https://picsum.photos/450?auto=format"}),c.jsx("div",{className:"text",children:"image description"})]}):c.jsx("div",{className:"card",style:{height:e.height},children:e.index+1})}})}const ve={metaInfo:{"zh-CN":`基本用法描述。

`,"en-US":`Basic usage description.

`},rawText:`\`\`\`tsx
import { Masonry } from '@mink-ui/core'

const heights = [
  150,
  50,
  90,
  70,
  110,
  150,
  130,
  80,
  50,
  90,
  100,
  150,
  60,
  50,
  80,
].map((height, index) => ({
  key: \`item-\${index}\`,
  data: { height, index },
}))

export default function App() {
  return (
    <Masonry
      columns={4}
      gutter={16}
      items={heights}
      slots={{
        item: (_, { data }) => {
          if (data.index === 4) {
            return (
              <div className="card no-padding">
                <img className="image" src="https://picsum.photos/450?auto=format" />
                <div className="text">
                  image description
                </div>
              </div>
            )
          }
          return (
            <div className="card" style={{ height: data.height }}>
              {data.index + 1}
            </div>
          )
        },
      }}
    />
  )
}
\`\`\``,cssName:"css-3f2133bd",relPath:"packages/core/src/masonry/__docs__/examples/basic.md"},he=[120,55,85,160,95,140,75,110,65,130,90,145,55,100,80].map((n,e)=>({key:`item-${e}`,data:{height:n,index:e}}));function ke(){return c.jsx(b,{columns:{xs:1,sm:2,md:3,lg:4},gutter:{xs:8,sm:12,md:16},items:he,slots:{item:(n,{data:e})=>c.jsx("div",{className:"card",style:{height:e.height},children:e.index+1})}})}const Ie={metaInfo:{"zh-CN":`使用响应式参数来适配不同屏幕宽度。columns 可以设置在不同断点下的列数，gutter 可以设置不同断点下的间距大小。

`,"en-US":`使用响应式参数来适配不同屏幕宽度。columns 可以设置在不同断点下的列数，gutter 可以设置不同断点下的间距大小。

`},rawText:`\`\`\`tsx
import { Masonry } from '@mink-ui/core'

const heights = [
  120,
  55,
  85,
  160,
  95,
  140,
  75,
  110,
  65,
  130,
  90,
  145,
  55,
  100,
  80
].map((height, index) => ({
  key: \`item-\${index}\`,
  data: { height, index },
}))

export default function App() {
  return (
    <Masonry
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      gutter={{ xs: 8, sm: 12, md: 16 }}
      items={heights}
      slots={{
        item: (_, { data }) => {
          return (
            <div className="card" style={{ height: data.height }}>
              {data.index + 1}
            </div>
          )
        },
      }}
    />
  )
}
\`\`\``,cssName:"css-5feda690",relPath:"packages/core/src/masonry/__docs__/examples/responsive.md"},de=[150,50,90,70,110,150,130,80,50,90,100,150,70,50,80];function Me(){const[n,e]=N.useState(()=>de.map((a,r)=>({key:r,column:r%4,data:a}))),t=a=>{e(r=>r.filter(({key:s})=>s!==a))},o=()=>{e(a=>[...a,{key:a.length?a[a.length-1].key+1:0,data:Math.floor(Math.random()*100)+50}])};return c.jsxs("div",{children:[c.jsx(b,{columns:4,gutter:16,items:n,slots:{item:(a,{data:r,key:s})=>c.jsxs("div",{className:"card",style:{height:r},children:[Number(s)+1,c.jsx(z,{className:"close-btn",icon:c.jsx(Q,{}),size:"small",theme:"info",onClick:()=>t(s)})]})},onLayoutChange:a=>{e(r=>r.map(s=>{const m=a.find(i=>i.key===s.key);return m?{...s,column:m.column}:s}))}}),c.jsx(z,{style:{marginTop:16},block:!0,onClick:o,children:"Add Item"})]})}const be={metaInfo:{"zh-CN":`展示瀑布流动态更新的效果，配合 item.column 固化位置。

`,"en-US":`展示瀑布流动态更新的效果，配合 item.column 固化位置。

`},rawText:`\`\`\`tsx
import { useState } from 'react'
import { Button, Masonry, } from '@mink-ui/core'
import CloseOutlined from '@mink-ui/icons/CloseOutlined'

const heights = [150, 50, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 70, 50, 80]

export default function App() {
  const [items, setItems] = useState<ItemType[]>(() =>
    heights.map((height, index) => ({
      key: index,
      column: index % 4,
      data: height,
    })),
  )

  const removeItem = (removeKey: React.Key) => {
    setItems(prevItems => prevItems.filter(({ key }) => key !== removeKey))
  }

  const addItem = () => {
    setItems(prevItems => [
      ...prevItems,
      {
        key: prevItems.length ? prevItems[prevItems.length - 1].key + 1 : 0,
        data: Math.floor(Math.random() * 100) + 50,
      },
    ])
  }

  return (
    <div>
      <Masonry
        columns={4}
        gutter={16}
        items={items}
        slots={{
          item: (_, { data, key }) => {
            return (
              <div className="card" style={{ height: data }}>
                {Number(key) + 1}
                <Button
                  className="close-btn"
                  icon={<CloseOutlined />}
                  size="small"
                  theme="info"
                  onClick={() => removeItem(key)}
                />
              </div>
            )
          }
        }}
        onLayoutChange={(sortedItems) => {
          setItems(prevItems =>
            prevItems.map((item) => {
              const matchItem = sortedItems.find(sortedItem => sortedItem.key === item.key)
              return matchItem
                ? {
                    ...item,
                    column: matchItem.column,
                  }
                : item
            }),
          )
        }}
      />
      <Button style={{ marginTop: 16 }} block onClick={addItem}>
        Add Item
      </Button>
    </div>
  )
}
\`\`\``,cssName:"css-af3a2fb1",relPath:"packages/core/src/masonry/__docs__/examples/dynamic.md"},_e=[{name:"items",type:"MasonryItemType<V>[]","zh-CN":"瀑布流数据源","en-US":"Masonry data source"},{name:"gutter",type:["number","Partial<Record<Breakpoint, number>>","[number | Partial<Record<Breakpoint, number>>, number | Partial<Record<Breakpoint, number>>]"],defaultValue:0,"zh-CN":"间距，支持响应式断点或水平/垂直分别设置","en-US":"Gutter, supports responsive breakpoints or separate horizontal/vertical values"},{name:"columns",type:["number","Partial<Record<Breakpoint, number>>"],defaultValue:3,"zh-CN":"列数，支持响应式断点","en-US":"Number of columns, supports responsive breakpoints"},{name:"watchItemLayout",type:"boolean","zh-CN":"是否监听子元素布局变化","en-US":"Whether to watch child element layout changes"},{name:"onLayoutChange",type:"() => void","zh-CN":"布局变化时的回调函数","en-US":"Callback function when layout changes"},{name:"slots",type:"{ item?: (node: React.ReactNode, params: MasonryItemType<V>) => React.ReactNode }","zh-CN":"自定义插槽渲染函数，用于自定义子项渲染","en-US":"Custom slot render functions for customizing item rendering"},{name:"...",type:"HasSemanticsStyled<'root' | 'item', MasonryProps<V>>","zh-CN":"语义化样式，包含 prefixCls / className / classNames / style / styles","en-US":"Semantic styles, includes prefixCls / className / classNames / style / styles"}];export{Ce as A,ve as M,_e as P,Ie as a,ke as b,be as c,Me as d};
