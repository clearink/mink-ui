import{e as w,o as I,M as K,a as W,c as A,s as Q,r as d,z as O,A as q,g as X,b as F,J as Y,j as i,l as tt,Z as et,K as ot,i as st,_ as nt,$ as ct}from"./index-DgAuvIcz.js";import{u as B,f as it,g as at,i as rt,W as $,B as b}from"./index-Dnsvbew9.js";import{s as U,P as lt,p as R,D as ut}from"./index-BhTecg-v.js";import{G as ht}from"./group-transition-Bw0d-9o_.js";import{c as mt}from"./children-CgMYhbbf.js";import{n as ft,m as dt,g as Z}from"./closable-BPvb1V0F.js";import{C as pt,i as vt}from"./index-DSsWjTyS.js";import{S as G}from"./index-Cui3TRwq.js";const N={top:24,bottom:24,gap:16,stack:!0,duration:4500,placement:"topRight",showProgress:!1,pauseOnHover:!0,closable:!0},P={offset:8,threshold:3},gt=w()(["prefixCls","className","classNames","style","styles","top","bottom","gap","stack","maxCount","getContainer"]),xt=w()(["getContainer","groups","onDismiss","onGroupExited"]);function Ct(s){const t=B("notification"),{getContainer:e=t.getContainer}=s,n=s,o={getContainer:e},c=I(s,xt);return{picked:o,omitted:n,restAttrs:c}}const j={top:N.top,bottom:N.bottom,gap:N.gap,stack:N.stack,maxCount:N.maxCount,placement:N.placement};function kt(s){return s==="topLeft"||s==="top"||s==="topRight"}function bt(s,t,e,n,o){const c=s.length,a=new Map;let r=0,l=0;for(let u=c-1,h=0;u>=0;u--){const{key:v}=s[u],m=t.get(v)||0;u===c-1&&(l=m),o?u===c-1&&(r=m+e):r+=m+e;const g=o?r-e-m+h:h,x=c-1-u,f=Math.max(m+e-l,0);h+=o?n:m+e,a.set(v,{"--notification-item-shift":`${g}px`,"--notification-item-order":`${x}`,"--notification-item-clip":`${f}px`})}return{itemCssVars:a,rootHeight:r}}function Nt(s){return K(s)?s.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`):s}function _t(s,t,e){const{placement:n}=s,{prefixCls:o}=t,{stackEnable:c,isExpanded:a}=e,r=W("notification",o);return{ns:r,classNames:{root:A(r,{[`${r}--${Nt(n)}`]:n,[`${r}--stack`]:c,[`${r}--expanded`]:a})}}}function yt(s){const{outerNamespace:t,item:e}=s,{type:n}=e,o=W(c=>`${t||`${c}-notification`}-item`);return{ns:o,classNames:{root:A(o,{[`${o}--${n}`]:n}),statusIcon:`${o}__status-icon`,closeBtn:`${o}__close-btn`,content:`${o}__content`,title:`${o}__title`,description:`${o}__description`,progress:`${o}__progress`}}}function jt(s){const t=Q(s),e=t?!0:!!s,n=t?U(s,P):P;return[e,n]}class Mt{_elements=new Map;_change;$root={current:null};get root(){return this.$root.current}_bind=t=>{this._change=t};collect=(t,e)=>{t?this._elements.set(e.key,t):this._elements.delete(e.key)};measure=t=>{const e=new Map,n=new Set(t.map(o=>o.key));this._elements.forEach((o,c)=>{n.has(c)&&e.set(c,o.offsetHeight)}),this._change(()=>e)}}function Et(s,t){const{gap:e,stack:n}=s,{items:o}=t,[c,a]=d.useState(()=>new Map),r=O(()=>new Mt);q(()=>{r._bind(k=>{a(k)})});const[l,u]=d.useState(!1),[h,{threshold:v,offset:m}]=jt(n),g=h&&(l||o.length<=v),x=!g&&h,{itemCssVars:f,rootHeight:p}=d.useMemo(()=>bt(o,c,e,m,x),[c,o,e,m,x]),_=()=>{h&&u(!0)},C=()=>{u(!1)},y=it(()=>{const k=r.root;k&&u(k.matches(":hover"))});return X(()=>{r.measure(o)},[r,o]),{ctrl:r,isHovering:l,isExpanded:g,rootHeight:p,itemCssVars:f,stackEnable:h,handleMouseEnter:_,handleMouseLeave:C,handleRecheckHover:y}}function Rt(s){const t=B("notification"),{onGroupExited:e,top:n=j.top,bottom:o=j.bottom,gap:c=j.gap,stack:a=j.stack,maxCount:r=j.maxCount,placement:l=j.placement}=s,u=s,h={top:n,bottom:o,gap:c,stack:a,maxCount:r,placement:l},{ctrl:v,isHovering:m,isExpanded:g,rootHeight:x,itemCssVars:f,stackEnable:p,handleMouseEnter:_,handleMouseLeave:C,handleRecheckHover:y}=Et(h,u),{ns:k,classNames:S}=_t(h,u,{stackEnable:p,isExpanded:g}),[M,E]=F([t.classNames,{root:t.className},S,u.classNames,{root:u.className}],[t.styles,{root:t.style},u.styles,{root:u.style},{root:{height:x}},{root:kt(l)?{top:n}:{bottom:o}}],{meta:{...u,...h}}),D={...I(M,["root","item"]),root:M.item},H={...I(E,["root","item"]),root:E.item};return{omitted:u,ns:k,cssNames:M,cssAttrs:E,ctrl:v,isHovering:m,itemCssVars:f,stackEnable:p,outerCssNames:D,outerCssAttrs:H,handleMouseEnter:_,handleMouseLeave:C,handleGroupExited:()=>{y(),e(l)},handleRecheckHover:y}}function Bt(s){const t=B("notification"),{ref:e,item:n,getters:o,listHovering:c,outerCssNames:a,outerCssAttrs:r,outerCssVars:l,onCollect:u,onDismiss:h}=s,{closable:v,onClose:m}=n,{ns:g,classNames:x}=yt(s),[f,p]=F([a,x,n.classNames,{root:n.className},{root:o.names()}],[r,n.styles,{root:n.style},{root:l},{root:o.attrs()}],{meta:s}),[_,C]=d.useState(c),y=at(e,Y(H=>{u(H,n)})),[k,S]=ft({currentState:{closable:v},contextState:{closable:t.closable}});return{omitted:s,ns:g,cssNames:f,cssAttrs:p,refComposed:y,globalConfig:t,closeIconRender:S,handleClose:()=>{h(n.key),m?.(),k?.onClose?.()},handleMouseEnter:()=>{C(!0)},handleMouseLeave:()=>{C(!1)}}}function $t(s){const{omitted:t,cssNames:e,cssAttrs:n,refComposed:o,closeIconRender:c,handleClose:a,handleMouseEnter:r,handleMouseLeave:l}=Bt(s),{item:u}=t,{type:h,title:v,description:m}=u,g=()=>c((f,p)=>i.jsx("button",{className:e.closeBtn,style:n.closeBtn,disabled:p,tabIndex:0,type:"button",onClick:a,children:f})),x=()=>{const f=dt(h);return mt(f,{fallback:i.jsx("span",{className:e.statusIcon,style:n.statusIcon,children:f}),transform:p=>({className:A(p.className,e.statusIcon),style:{...p.style,...n.statusIcon}})})};return i.jsxs("div",{ref:o,className:e.root,style:n.root,onMouseEnter:r,onMouseLeave:l,children:[g(),x(),i.jsxs("div",{className:e.content,style:n.content,children:[i.jsx("div",{className:e.title,style:n.title,children:v}),rt(m)&&i.jsx("div",{className:e.description,style:n.description,children:m})]})]})}function St(s){const{omitted:t,ns:e,cssNames:n,cssAttrs:o,ctrl:c,isHovering:a,itemCssVars:r,stackEnable:l,outerCssNames:u,outerCssAttrs:h,handleMouseEnter:v,handleMouseLeave:m,handleGroupExited:g}=Rt(s),{items:x,onDismiss:f}=t;return i.jsx("div",{ref:c.$root,className:n.root,style:o.root,onMouseEnter:v,onMouseLeave:m,children:i.jsx(ht,{classNames:`${e}-motion`,appear:!0,items:x,onGroupExited:g,children:(p,_,C)=>i.jsx($t,{ref:p,getters:_,item:C,listHovering:l&&a,outerCssAttrs:h,outerCssNames:u,outerCssVars:r.get(C.key),outerNamespace:e,onCollect:c.collect,onDismiss:f})})})}function Ht(s){const{picked:t,omitted:e,restAttrs:n}=Ct(s),{getContainer:o}=t,{groups:c,onDismiss:a,onGroupExited:r}=e;return i.jsx(lt,{getContainer:o,children:c.map(l=>d.createElement(St,{...n,key:l.key,items:Array.from(l.items.values()),placement:l.key,onDismiss:a,onGroupExited:r}))})}const V=w()(["placement","duration","showProgress","pauseOnHover","closable"]);class It{_change;_prepare;_bind=(t,e)=>{this._change=t,this._prepare=e};open=t=>{const e=this._prepare(t);this._change(n=>{let o=!1;const c=n.map(a=>a.key!==e.placement?a:(o=!0,{...a,items:new Map(a.items).set(e.key,e)}));return o?c:c.concat({key:e.placement,items:new Map().set(e.key,e)})})};close=t=>{const e=tt(t);this._change(n=>n.map(o=>{if(e)return{...o,items:new Map};const c=new Map(o.items);return c.delete(t),{...o,items:c}}))};finish=t=>{this._change(e=>e.filter(n=>n.key!==t?!0:n.items.size>0))};expose=()=>{const{open:t,close:e}=this;return Object.assign(Z().reduce((n,o)=>(n[o]=c=>{t({...c,type:o})},n),{}),{open:t,close:e})}}function J(s={}){const t=B("notification"),e=O(()=>et("nt-")),[n,o]=d.useState([]),c=O(()=>new It);q(()=>{c._bind(l=>{o(l)},l=>U({...l,key:st(l.key)?e():ot(l.key)},R(s,V),R(t,["closable"]),R(N,V)))});const a=d.useMemo(()=>c.expose(),[c]),r=R(s,gt);return[a,d.createElement(Ht,{...r,key:"notification-holder",groups:n,onDismiss:c.close,onGroupExited:c.finish})]}class Ot{_config={...N};get=()=>({...this._config});set=t=>{this._config=U(t,this.get())}}const L=new Ot;function Lt(s){const{ref:t}=s,[e,n]=d.useState(()=>L.get()),[o,c]=J(e);return d.useImperativeHandle(t,()=>({get open(){return o.open},get close(){return o.close},sync:()=>{n(L.get())}}),[o,n]),{ctxHolder:c,notificationConfig:e}}function wt(s){const{ctxHolder:t,notificationConfig:e}=Lt(s);return i.jsx(pt,{notification:e,children:t})}class At{_cleanup=null;_container=null;_callbacks=[];ensure=()=>this._container?this._container:new Promise(t=>{nt.createRoot(document.createDocumentFragment()).render(i.jsx(d.StrictMode,{children:i.jsx(wt,{ref:e=>{t(this._container??=e)}})}))});flush=()=>{this._cleanup?.(),this._cleanup=ct(()=>{const t=this.ensure(),e=n=>{n.sync(),this._callbacks.forEach(o=>{o(n)}),this._callbacks.length=0};vt(t)?t.then(e):e(t)})};open=t=>{this._callbacks.push(e=>{e.open(t)}),this.flush()};close=t=>{this._callbacks.push(e=>{e.close(t)}),this.flush()};config=t=>{L.set(t),this._container?.sync()};expose=()=>{const{open:t,close:e,config:n}=this;return Object.assign(Z().reduce((o,c)=>(o[c]=a=>{t({...a,type:c})},o),{}),{open:t,close:e,config:n})}}const Ut=new At,Dt=Object.assign(Ut.expose(),{useNotification:J});function Gt(s){const t=s;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M368 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-58-624h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m578 102h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m292 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m174 0h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 276h-56c-4.4 0-8 3.6-8 8v182c0 87.3-70.7 158-158 158H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c127 0 230-103 230-230V484c0-4.4-3.6-8-8-8"})})}const Pt=$(Gt,{name:"radius-bottomright",theme:"outlined"});function Vt(s){const t=s;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M712 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m2-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M136 374h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m0-174h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m752 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-230 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 624H358c-87.3 0-158-70.7-158-158V484c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v182c0 127 103 230 230 230h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const zt=$(Vt,{name:"radius-bottomleft",theme:"outlined"});function Tt(s){const t=s;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M368 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-2 696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m522-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-48-696H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c87.3 0 158 70.7 158 158v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-127-103-230-230-230"})})}const z=$(Tt,{name:"radius-upright",theme:"outlined"});function Wt(s){const t=s;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M656 200h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m58 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 650h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m696-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174-696H358c-127 0-230 103-230 230v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-87.3 70.7-158 158-158h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const qt=$(Wt,{name:"radius-upleft",theme:"outlined"}),T=d.createContext({name:"Default"});function oe(){const[s,t]=d.useState(!0),[e,n]=Dt.useNotification({stack:s}),o=(a,r)=>{const l="Hello".repeat(Math.random()>.5?12:32);e.info({key:r,title:`Notification ${a}`,description:i.jsx(T.Consumer,{children:({name:u})=>`${l}, ${u}!`}),placement:a,duration:1e10})},c=d.useMemo(()=>({name:"Mink UI"}),[]);return i.jsxs(T,{value:c,children:[n,i.jsx("div",{style:{marginBottom:24},children:i.jsxs(b,{theme:"primary",variant:"solid",onClick:()=>{t(a=>!a)},children:["stackEnable-",`${s}`]})}),i.jsxs(G,{children:[i.jsxs(b,{theme:"info",onClick:()=>o("topLeft"),children:[i.jsx(qt,{}),"topLeft"]}),i.jsx(b,{theme:"info",onClick:()=>o("top"),children:"top"}),i.jsxs(b,{theme:"info",onClick:()=>o("topRight"),children:[i.jsx(z,{}),"topRight"]}),i.jsxs(b,{theme:"info",onClick:()=>o("topRight","1"),children:[i.jsx(z,{}),"topRight--update-1"]})]}),i.jsx(ut,{}),i.jsxs(G,{children:[i.jsxs(b,{theme:"info",onClick:()=>o("bottomLeft"),children:[i.jsx(zt,{}),"bottomLeft"]}),i.jsx(b,{theme:"info",onClick:()=>o("bottom"),children:"bottom"}),i.jsxs(b,{theme:"info",onClick:()=>o("bottomRight"),children:[i.jsx(Pt,{}),"bottomRight"]})]})]})}const se={metaInfo:{"zh-CN":`基本用法描述。

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
`,cssName:"css-60f8c4e2",relPath:"packages/core/src/notification/__docs__/examples/basic.md"};export{oe as A,se as M};
