import{M as K,e as w,o as I,a as W,c as A,s as Q,r as d,A as O,B as q,h as X,b as F,J as Y,j as i,k as tt,Z as et,K as ot,i as nt,_ as st,$ as ct}from"./index-DQ7YvQSV.js";import{u as B,f as it,h as at,i as rt,W as $,B as b}from"./index-ChOA-dDE.js";import{s as U,P as lt,p as R,D as ut}from"./index-B5n-OJFp.js";import{G as ht}from"./group-transition-CR4GJoFl.js";import{c as mt}from"./children-BSWi1Eil.js";import{n as ft,m as dt,g as Z}from"./closable-Bq680P70.js";import{C as pt,i as vt}from"./index-B_kqTTY_.js";import{S as G}from"./index-I_oH1cmo.js";function gt(n){return K(n)?n.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`):n}const N={top:24,bottom:24,gap:16,stack:!0,duration:4500,placement:"topRight",showProgress:!1,pauseOnHover:!0,closable:!0},P={offset:8,threshold:3},xt=w()(["prefixCls","className","classNames","style","styles","top","bottom","gap","stack","maxCount","getContainer"]),Ct=w()(["getContainer","groups","onDismiss","onGroupExited"]);function kt(n){const t=B("notification"),{getContainer:e=t.getContainer}=n,s=n,o={getContainer:e},c=I(n,Ct);return{picked:o,omitted:s,restAttrs:c}}const j={top:N.top,bottom:N.bottom,gap:N.gap,stack:N.stack,maxCount:N.maxCount,placement:N.placement};function bt(n){return n==="topLeft"||n==="top"||n==="topRight"}function Nt(n,t,e,s,o){const c=n.length,a=new Map;let r=0,l=0;for(let u=c-1,h=0;u>=0;u--){const{key:v}=n[u],m=t.get(v)||0;u===c-1&&(l=m),o?u===c-1&&(r=m+e):r+=m+e;const g=o?r-e-m+h:h,x=c-1-u,f=Math.max(m+e-l,0);h+=o?s:m+e,a.set(v,{"--notification-item-shift":`${g}px`,"--notification-item-order":`${x}`,"--notification-item-clip":`${f}px`})}return{itemCssVars:a,rootHeight:r}}function _t(n,t,e){const{placement:s}=n,{prefixCls:o}=t,{stackEnable:c,isExpanded:a}=e,r=W("notification",o);return{ns:r,classNames:{root:A(r,{[`${r}--${gt(s)}`]:s,[`${r}--stack`]:c,[`${r}--expanded`]:a})}}}function yt(n){const{outerNamespace:t,item:e}=n,{type:s}=e,o=W(c=>`${t||`${c}-notification`}-item`);return{ns:o,classNames:{root:A(o,{[`${o}--${s}`]:s}),statusIcon:`${o}__status-icon`,closeBtn:`${o}__close-btn`,content:`${o}__content`,title:`${o}__title`,description:`${o}__description`,progress:`${o}__progress`}}}function jt(n){const t=Q(n),e=t?!0:!!n,s=t?U(n,P):P;return[e,s]}class Mt{_elements=new Map;_change;$root={current:null};get root(){return this.$root.current}_bind=t=>{this._change=t};collect=(t,e)=>{t?this._elements.set(e.key,t):this._elements.delete(e.key)};measure=t=>{const e=new Map,s=new Set(t.map(o=>o.key));this._elements.forEach((o,c)=>{s.has(c)&&e.set(c,o.offsetHeight)}),this._change(()=>e)}}function Et(n,t){const{gap:e,stack:s}=n,{items:o}=t,[c,a]=d.useState(()=>new Map),r=O(()=>new Mt);q(()=>{r._bind(k=>{a(k)})});const[l,u]=d.useState(!1),[h,{threshold:v,offset:m}]=jt(s),g=h&&(l||o.length<=v),x=!g&&h,{itemCssVars:f,rootHeight:p}=d.useMemo(()=>Nt(o,c,e,m,x),[c,o,e,m,x]),_=()=>{h&&u(!0)},C=()=>{u(!1)},y=it(()=>{const k=r.root;k&&u(k.matches(":hover"))});return X(()=>{r.measure(o)},[r,o]),{ctrl:r,isHovering:l,isExpanded:g,rootHeight:p,itemCssVars:f,stackEnable:h,handleMouseEnter:_,handleMouseLeave:C,handleRecheckHover:y}}function Rt(n){const t=B("notification"),{onGroupExited:e,top:s=j.top,bottom:o=j.bottom,gap:c=j.gap,stack:a=j.stack,maxCount:r=j.maxCount,placement:l=j.placement}=n,u=n,h={top:s,bottom:o,gap:c,stack:a,maxCount:r,placement:l},{ctrl:v,isHovering:m,isExpanded:g,rootHeight:x,itemCssVars:f,stackEnable:p,handleMouseEnter:_,handleMouseLeave:C,handleRecheckHover:y}=Et(h,u),{ns:k,classNames:S}=_t(h,u,{stackEnable:p,isExpanded:g}),[M,E]=F([t.classNames,{root:t.className},S,u.classNames,{root:u.className}],[t.styles,{root:t.style},u.styles,{root:u.style},{root:{height:x}},{root:bt(l)?{top:s}:{bottom:o}}],{meta:{...u,...h}}),D={...I(M,["root","item"]),root:M.item},H={...I(E,["root","item"]),root:E.item};return{omitted:u,ns:k,cssNames:M,cssAttrs:E,ctrl:v,isHovering:m,itemCssVars:f,stackEnable:p,outerCssNames:D,outerCssAttrs:H,handleMouseEnter:_,handleMouseLeave:C,handleGroupExited:()=>{y(),e(l)},handleRecheckHover:y}}function Bt(n){const t=B("notification"),{ref:e,item:s,getters:o,listHovering:c,outerCssNames:a,outerCssAttrs:r,outerCssVars:l,onCollect:u,onDismiss:h}=n,{closable:v,onClose:m}=s,{ns:g,classNames:x}=yt(n),[f,p]=F([a,x,s.classNames,{root:s.className},{root:o.names()}],[r,s.styles,{root:s.style},{root:l},{root:o.attrs()}],{meta:n}),[_,C]=d.useState(c),y=at(e,Y(H=>{u(H,s)})),[k,S]=ft({currentState:{closable:v},contextState:{closable:t.closable}});return{omitted:n,ns:g,cssNames:f,cssAttrs:p,refCombined:y,globalConfig:t,closeIconRender:S,handleClose:()=>{h(s.key),m?.(),k?.onClose?.()},handleMouseEnter:()=>{C(!0)},handleMouseLeave:()=>{C(!1)}}}function $t(n){const{omitted:t,cssNames:e,cssAttrs:s,refCombined:o,closeIconRender:c,handleClose:a,handleMouseEnter:r,handleMouseLeave:l}=Bt(n),{item:u}=t,{type:h,title:v,description:m}=u,g=()=>c((f,p)=>i.jsx("button",{className:e.closeBtn,style:s.closeBtn,disabled:p,tabIndex:0,type:"button",onClick:a,children:f})),x=()=>{const f=dt(h);return mt(f,{fallback:i.jsx("span",{className:e.statusIcon,style:s.statusIcon,children:f}),transform:p=>({className:A(p.className,e.statusIcon),style:{...p.style,...s.statusIcon}})})};return i.jsxs("div",{ref:o,className:e.root,style:s.root,onMouseEnter:r,onMouseLeave:l,children:[g(),x(),i.jsxs("div",{className:e.content,style:s.content,children:[i.jsx("div",{className:e.title,style:s.title,children:v}),rt(m)&&i.jsx("div",{className:e.description,style:s.description,children:m})]})]})}function St(n){const{omitted:t,ns:e,cssNames:s,cssAttrs:o,ctrl:c,isHovering:a,itemCssVars:r,stackEnable:l,outerCssNames:u,outerCssAttrs:h,handleMouseEnter:v,handleMouseLeave:m,handleGroupExited:g}=Rt(n),{items:x,onDismiss:f}=t;return i.jsx("div",{ref:c.$root,className:s.root,style:o.root,onMouseEnter:v,onMouseLeave:m,children:i.jsx(ht,{classNames:`${e}-motion`,appear:!0,items:x,onGroupExited:g,children:(p,_,C)=>i.jsx($t,{ref:p,getters:_,item:C,listHovering:l&&a,outerCssAttrs:h,outerCssNames:u,outerCssVars:r.get(C.key),outerNamespace:e,onCollect:c.collect,onDismiss:f})})})}function Ht(n){const{picked:t,omitted:e,restAttrs:s}=kt(n),{getContainer:o}=t,{groups:c,onDismiss:a,onGroupExited:r}=e;return i.jsx(lt,{getContainer:o,children:c.map(l=>d.createElement(St,{...s,key:l.key,items:Array.from(l.items.values()),placement:l.key,onDismiss:a,onGroupExited:r}))})}const V=w()(["placement","duration","showProgress","pauseOnHover","closable"]);class It{_change;_prepare;_bind=(t,e)=>{this._change=t,this._prepare=e};open=t=>{const e=this._prepare(t);this._change(s=>{let o=!1;const c=s.map(a=>a.key!==e.placement?a:(o=!0,{...a,items:new Map(a.items).set(e.key,e)}));return o?c:c.concat({key:e.placement,items:new Map().set(e.key,e)})})};close=t=>{const e=tt(t);this._change(s=>s.map(o=>{if(e)return{...o,items:new Map};const c=new Map(o.items);return c.delete(t),{...o,items:c}}))};finish=t=>{this._change(e=>e.filter(s=>s.key!==t?!0:s.items.size>0))};expose=()=>{const{open:t,close:e}=this;return Object.assign(Z().reduce((s,o)=>(s[o]=c=>{t({...c,type:o})},s),{}),{open:t,close:e})}}function J(n={}){const t=B("notification"),e=O(()=>et("nt-")),[s,o]=d.useState([]),c=O(()=>new It);q(()=>{c._bind(l=>{o(l)},l=>U({...l,key:nt(l.key)?e():ot(l.key)},R(n,V),R(t,["closable"]),R(N,V)))});const a=d.useMemo(()=>c.expose(),[c]),r=R(n,xt);return[a,d.createElement(Ht,{...r,key:"notification-holder",groups:s,onDismiss:c.close,onGroupExited:c.finish})]}class Ot{_config={...N};get=()=>({...this._config});set=t=>{this._config=U(t,this.get())}}const L=new Ot;function Lt(n){const{ref:t}=n,[e,s]=d.useState(()=>L.get()),[o,c]=J(e);return d.useImperativeHandle(t,()=>({get open(){return o.open},get close(){return o.close},sync:()=>{s(L.get())}}),[o,s]),{ctxHolder:c,notificationConfig:e}}function wt(n){const{ctxHolder:t,notificationConfig:e}=Lt(n);return i.jsx(pt,{notification:e,children:t})}class At{_cleanup=null;_container=null;_callbacks=[];ensure=()=>this._container?this._container:new Promise(t=>{st.createRoot(document.createDocumentFragment()).render(i.jsx(d.StrictMode,{children:i.jsx(wt,{ref:e=>{t(this._container??=e)}})}))});flush=()=>{this._cleanup?.(),this._cleanup=ct(()=>{const t=this.ensure(),e=s=>{s.sync(),this._callbacks.forEach(o=>{o(s)}),this._callbacks.length=0};vt(t)?t.then(e):e(t)})};open=t=>{this._callbacks.push(e=>{e.open(t)}),this.flush()};close=t=>{this._callbacks.push(e=>{e.close(t)}),this.flush()};config=t=>{L.set(t),this._container?.sync()};expose=()=>{const{open:t,close:e,config:s}=this;return Object.assign(Z().reduce((o,c)=>(o[c]=a=>{t({...a,type:c})},o),{}),{open:t,close:e,config:s})}}const Ut=new At,Dt=Object.assign(Ut.expose(),{useNotification:J});function Gt(n){const t=n;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M712 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m2-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M136 374h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m0-174h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m752 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-230 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 624H358c-87.3 0-158-70.7-158-158V484c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v182c0 127 103 230 230 230h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const Pt=$(Gt,{name:"radius-bottomleft",theme:"outlined"});function Vt(n){const t=n;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M368 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-58-624h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m578 102h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m292 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m174 0h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 276h-56c-4.4 0-8 3.6-8 8v182c0 87.3-70.7 158-158 158H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c127 0 230-103 230-230V484c0-4.4-3.6-8-8-8"})})}const zt=$(Vt,{name:"radius-bottomright",theme:"outlined"});function Tt(n){const t=n;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M656 200h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m58 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 650h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m696-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174-696H358c-127 0-230 103-230 230v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-87.3 70.7-158 158-158h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const Wt=$(Tt,{name:"radius-upleft",theme:"outlined"});function qt(n){const t=n;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M368 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-2 696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m522-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-48-696H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c87.3 0 158 70.7 158 158v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-127-103-230-230-230"})})}const z=$(qt,{name:"radius-upright",theme:"outlined"}),T=d.createContext({name:"Default"});function oe(){const[n,t]=d.useState(!0),[e,s]=Dt.useNotification({stack:n}),o=(a,r)=>{const l="Hello".repeat(Math.random()>.5?12:32);e.info({key:r,title:`Notification ${a}`,description:i.jsx(T.Consumer,{children:({name:u})=>`${l}, ${u}!`}),placement:a,duration:1e10})},c=d.useMemo(()=>({name:"Mink UI"}),[]);return i.jsxs(T,{value:c,children:[s,i.jsx("div",{style:{marginBottom:24},children:i.jsxs(b,{theme:"primary",variant:"solid",onClick:()=>{t(a=>!a)},children:["stackEnable-",`${n}`]})}),i.jsxs(G,{children:[i.jsxs(b,{theme:"info",onClick:()=>o("topLeft"),children:[i.jsx(Wt,{}),"topLeft"]}),i.jsx(b,{theme:"info",onClick:()=>o("top"),children:"top"}),i.jsxs(b,{theme:"info",onClick:()=>o("topRight"),children:[i.jsx(z,{}),"topRight"]}),i.jsxs(b,{theme:"info",onClick:()=>o("topRight","1"),children:[i.jsx(z,{}),"topRight--update-1"]})]}),i.jsx(ut,{}),i.jsxs(G,{children:[i.jsxs(b,{theme:"info",onClick:()=>o("bottomLeft"),children:[i.jsx(Pt,{}),"bottomLeft"]}),i.jsx(b,{theme:"info",onClick:()=>o("bottom"),children:"bottom"}),i.jsxs(b,{theme:"info",onClick:()=>o("bottomRight"),children:[i.jsx(zt,{}),"bottomRight"]})]})]})}const ne={metaInfo:{"zh-CN":`基本用法描述。

`,"en-US":`Basic usage description.

`},rawText:`\`\`\`tsx
import { createContext, useMemo, useState } from 'react'
import { Button, Divider, notification, Space } from '@mink-ui/core'
import RadiusBottomleftOutlined from '@mink-ui/icons/RadiusBottomleftOutlined'
import RadiusBottomrightOutlined from '@mink-ui/icons/RadiusBottomrightOutlined'
import RadiusUpleftOutlined from '@mink-ui/icons/RadiusUpleftOutlined'
import RadiusUprightOutlined from '@mink-ui/icons/RadiusUprightOutlined'

const Context = createContext({ name: 'Default' })

export default function App() {
  const [stackEnable, setStackEnable] = useState(true)

  const [api, contextHolder] = notification.useNotification({
    stack: stackEnable
  })

  const openNotification = (placement, key) => {
    const prefix = 'Hello'.repeat(Math.random() > 0.5 ? 12 : 32)
    api.info({
      key,
      title: \`Notification \${placement}\`,
      description: <Context.Consumer>{({ name }) => \`\${prefix}, \${name}!\`}</Context.Consumer>,
      placement,
      duration: 1e10,
    })
  }

  const contextValue = useMemo(() => ({ name: 'Mink UI' }), [])

  return (
    <Context value={contextValue}>
      {contextHolder}
      <div style={{ marginBottom: 24 }}>
        <Button theme="primary" variant="solid" onClick={() => { setStackEnable(p => !p) }}>
          stackEnable-
          {\`\${stackEnable}\`}
        </Button>
      </div>
      <Space>
        <Button
          theme="info"
          onClick={() => openNotification('topLeft')}
        >
          <RadiusUpleftOutlined />
          topLeft
        </Button>
        <Button
          theme="info"
          onClick={() => openNotification('top')}
        >
          top
        </Button>
        <Button
          theme="info"
          onClick={() => openNotification('topRight')}
        >
          <RadiusUprightOutlined />
          topRight
        </Button>
        <Button
          theme="info"
          onClick={() => openNotification('topRight', '1')}
        >
          <RadiusUprightOutlined />
          topRight--update-1
        </Button>
      </Space>
      <Divider />
      <Space>
        <Button
          theme="info"
          onClick={() => openNotification('bottomLeft')}
        >
          <RadiusBottomleftOutlined />
          bottomLeft
        </Button>
        <Button
          theme="info"
          onClick={() => openNotification('bottom')}
        >
          bottom
        </Button>
        <Button
          theme="info"
          onClick={() => openNotification('bottomRight')}
        >
          <RadiusBottomrightOutlined />
          bottomRight
        </Button>
      </Space>
    </Context>
  )
}
\`\`\`
`,cssName:"css-60f8c4e2",relPath:"packages/core/src/notification/__docs__/examples/basic.md"};export{oe as A,ne as M};
