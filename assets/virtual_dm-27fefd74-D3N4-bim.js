import{e as w,o as I,M as K,a as W,c as A,s as Q,r as f,A as O,B as q,g as X,b as F,J as Y,j as i,k as tt,Z as et,K as nt,i as ot,_ as st,$ as ct}from"./index-BOv0hSqX.js";import{u as B,f as it,h as at,i as rt,W as $,B as b}from"./index-5KAbZXcY.js";import{s as U,P as lt,p as R,D as ut}from"./index-CX99x1UG.js";import{G as ht}from"./group-transition-CVID9ONl.js";import{c as mt}from"./children-CazfncC5.js";import{n as dt,m as ft,g as Z}from"./closable-ByQpJBe5.js";import{C as pt,i as vt}from"./index-Baohq-ki.js";import{S as G}from"./index-BB_wrkYL.js";const N={top:24,bottom:24,gap:16,stack:!0,duration:4500,placement:"topRight",showProgress:!1,pauseOnHover:!0,closable:!0},P={offset:8,threshold:3},gt=w()(["prefixCls","className","classNames","style","styles","top","bottom","gap","stack","maxCount","getContainer"]),xt=w()(["getContainer","groups","onDismiss","onGroupExited"]);function Ct(o){const t=B("notification"),{getContainer:e=t.getContainer}=o,s=o,n={getContainer:e},c=I(o,xt);return{picked:n,omitted:s,restAttrs:c}}const j={top:N.top,bottom:N.bottom,gap:N.gap,stack:N.stack,maxCount:N.maxCount,placement:N.placement};function kt(o){return o==="topLeft"||o==="top"||o==="topRight"}function bt(o,t,e,s,n){const c=o.length,a=new Map;let r=0,l=0;for(let u=c-1,h=0;u>=0;u--){const{key:v}=o[u],m=t.get(v)||0;u===c-1&&(l=m),n?u===c-1&&(r=m+e):r+=m+e;const g=n?r-e-m+h:h,x=c-1-u,d=Math.max(m+e-l,0);h+=n?s:m+e,a.set(v,{"--notification-item-shift":`${g}px`,"--notification-item-order":`${x}`,"--notification-item-clip":`${d}px`})}return{itemCssVars:a,rootHeight:r}}function Nt(o){return K(o)?o.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`):o}function _t(o,t,e){const{placement:s}=o,{prefixCls:n}=t,{stackEnable:c,isExpanded:a}=e,r=W("notification",n);return{ns:r,classNames:{root:A(r,{[`${r}--${Nt(s)}`]:s,[`${r}--stack`]:c,[`${r}--expanded`]:a})}}}function yt(o){const{outerNamespace:t,item:e}=o,{type:s}=e,n=W(c=>`${t||`${c}-notification`}-item`);return{ns:n,classNames:{root:A(n,{[`${n}--${s}`]:s}),statusIcon:`${n}__status-icon`,closeBtn:`${n}__close-btn`,content:`${n}__content`,title:`${n}__title`,description:`${n}__description`,progress:`${n}__progress`}}}function jt(o){const t=Q(o),e=t?!0:!!o,s=t?U(o,P):P;return[e,s]}class Mt{_elements=new Map;_change;$root={current:null};get root(){return this.$root.current}_bind=t=>{this._change=t};collect=(t,e)=>{t?this._elements.set(e.key,t):this._elements.delete(e.key)};measure=t=>{const e=new Map,s=new Set(t.map(n=>n.key));this._elements.forEach((n,c)=>{s.has(c)&&e.set(c,n.offsetHeight)}),this._change(()=>e)}}function Et(o,t){const{gap:e,stack:s}=o,{items:n}=t,[c,a]=f.useState(()=>new Map),r=O(()=>new Mt);q(()=>{r._bind(k=>{a(k)})});const[l,u]=f.useState(!1),[h,{threshold:v,offset:m}]=jt(s),g=h&&(l||n.length<=v),x=!g&&h,{itemCssVars:d,rootHeight:p}=f.useMemo(()=>bt(n,c,e,m,x),[c,n,e,m,x]),_=()=>{h&&u(!0)},C=()=>{u(!1)},y=it(()=>{const k=r.root;k&&u(k.matches(":hover"))});return X(()=>{r.measure(n)},[r,n]),{ctrl:r,isHovering:l,isExpanded:g,rootHeight:p,itemCssVars:d,stackEnable:h,handleMouseEnter:_,handleMouseLeave:C,handleRecheckHover:y}}function Rt(o){const t=B("notification"),{onGroupExited:e,top:s=j.top,bottom:n=j.bottom,gap:c=j.gap,stack:a=j.stack,maxCount:r=j.maxCount,placement:l=j.placement}=o,u=o,h={top:s,bottom:n,gap:c,stack:a,maxCount:r,placement:l},{ctrl:v,isHovering:m,isExpanded:g,rootHeight:x,itemCssVars:d,stackEnable:p,handleMouseEnter:_,handleMouseLeave:C,handleRecheckHover:y}=Et(h,u),{ns:k,classNames:S}=_t(h,u,{stackEnable:p,isExpanded:g}),[M,E]=F([t.classNames,{root:t.className},S,u.classNames,{root:u.className}],[t.styles,{root:t.style},u.styles,{root:u.style},{root:{height:x}},{root:kt(l)?{top:s}:{bottom:n}}],{meta:{...u,...h}}),D={...I(M,["root","item"]),root:M.item},H={...I(E,["root","item"]),root:E.item};return{omitted:u,ns:k,cssNames:M,cssAttrs:E,ctrl:v,isHovering:m,itemCssVars:d,stackEnable:p,outerCssNames:D,outerCssAttrs:H,handleMouseEnter:_,handleMouseLeave:C,handleGroupExited:()=>{y(),e(l)},handleRecheckHover:y}}function Bt(o){const t=B("notification"),{ref:e,item:s,getters:n,listHovering:c,outerCssNames:a,outerCssAttrs:r,outerCssVars:l,onCollect:u,onDismiss:h}=o,{closable:v,onClose:m}=s,{ns:g,classNames:x}=yt(o),[d,p]=F([a,x,s.classNames,{root:s.className},{root:n.names()}],[r,s.styles,{root:s.style},{root:l},{root:n.attrs()}],{meta:o}),[_,C]=f.useState(c),y=at(e,Y(H=>{u(H,s)})),[k,S]=dt({currentState:{closable:v},contextState:{closable:t.closable}});return{omitted:o,ns:g,cssNames:d,cssAttrs:p,refCombined:y,globalConfig:t,closeIconRender:S,handleClose:()=>{h(s.key),m?.(),k?.onClose?.()},handleMouseEnter:()=>{C(!0)},handleMouseLeave:()=>{C(!1)}}}function $t(o){const{omitted:t,cssNames:e,cssAttrs:s,refCombined:n,closeIconRender:c,handleClose:a,handleMouseEnter:r,handleMouseLeave:l}=Bt(o),{item:u}=t,{type:h,title:v,description:m}=u,g=()=>c((d,p)=>i.jsx("button",{className:e.closeBtn,style:s.closeBtn,disabled:p,tabIndex:0,type:"button",onClick:a,children:d})),x=()=>{const d=ft(h);return mt(d,{fallback:i.jsx("span",{className:e.statusIcon,style:s.statusIcon,children:d}),transform:p=>({className:A(p.className,e.statusIcon),style:{...p.style,...s.statusIcon}})})};return i.jsxs("div",{ref:n,className:e.root,style:s.root,onMouseEnter:r,onMouseLeave:l,children:[g(),x(),i.jsxs("div",{className:e.content,style:s.content,children:[i.jsx("div",{className:e.title,style:s.title,children:v}),rt(m)&&i.jsx("div",{className:e.description,style:s.description,children:m})]})]})}function St(o){const{omitted:t,ns:e,cssNames:s,cssAttrs:n,ctrl:c,isHovering:a,itemCssVars:r,stackEnable:l,outerCssNames:u,outerCssAttrs:h,handleMouseEnter:v,handleMouseLeave:m,handleGroupExited:g}=Rt(o),{items:x,onDismiss:d}=t;return i.jsx("div",{ref:c.$root,className:s.root,style:n.root,onMouseEnter:v,onMouseLeave:m,children:i.jsx(ht,{classNames:`${e}-motion`,appear:!0,items:x,onGroupExited:g,children:(p,_,C)=>i.jsx($t,{ref:p,getters:_,item:C,listHovering:l&&a,outerCssAttrs:h,outerCssNames:u,outerCssVars:r.get(C.key),outerNamespace:e,onCollect:c.collect,onDismiss:d})})})}function Ht(o){const{picked:t,omitted:e,restAttrs:s}=Ct(o),{getContainer:n}=t,{groups:c,onDismiss:a,onGroupExited:r}=e;return i.jsx(lt,{getContainer:n,children:c.map(l=>f.createElement(St,{...s,key:l.key,items:Array.from(l.items.values()),placement:l.key,onDismiss:a,onGroupExited:r}))})}const V=w()(["placement","duration","showProgress","pauseOnHover","closable"]);class It{_change;_prepare;_bind=(t,e)=>{this._change=t,this._prepare=e};open=t=>{const e=this._prepare(t);this._change(s=>{let n=!1;const c=s.map(a=>a.key!==e.placement?a:(n=!0,{...a,items:new Map(a.items).set(e.key,e)}));return n?c:c.concat({key:e.placement,items:new Map().set(e.key,e)})})};close=t=>{const e=tt(t);this._change(s=>s.map(n=>{if(e)return{...n,items:new Map};const c=new Map(n.items);return c.delete(t),{...n,items:c}}))};finish=t=>{this._change(e=>e.filter(s=>s.key!==t?!0:s.items.size>0))};expose=()=>{const{open:t,close:e}=this;return Object.assign(Z().reduce((s,n)=>(s[n]=c=>{t({...c,type:n})},s),{}),{open:t,close:e})}}function J(o={}){const t=B("notification"),e=O(()=>et("nt-")),[s,n]=f.useState([]),c=O(()=>new It);q(()=>{c._bind(l=>{n(l)},l=>U({...l,key:ot(l.key)?e():nt(l.key)},R(o,V),R(t,["closable"]),R(N,V)))});const a=f.useMemo(()=>c.expose(),[c]),r=R(o,gt);return[a,f.createElement(Ht,{...r,key:"notification-holder",groups:s,onDismiss:c.close,onGroupExited:c.finish})]}class Ot{_config={...N};get=()=>({...this._config});set=t=>{this._config=U(t,this.get())}}const L=new Ot;function Lt(o){const{ref:t}=o,[e,s]=f.useState(()=>L.get()),[n,c]=J(e);return f.useImperativeHandle(t,()=>({get open(){return n.open},get close(){return n.close},sync:()=>{s(L.get())}}),[n,s]),{ctxHolder:c,notificationConfig:e}}function wt(o){const{ctxHolder:t,notificationConfig:e}=Lt(o);return i.jsx(pt,{notification:e,children:t})}class At{_cleanup=null;_container=null;_callbacks=[];ensure=()=>this._container?this._container:new Promise(t=>{st.createRoot(document.createDocumentFragment()).render(i.jsx(f.StrictMode,{children:i.jsx(wt,{ref:e=>{t(this._container??=e)}})}))});dispose=()=>{this._cleanup?.(),this._cleanup=null};flush=()=>{this.dispose(),this._cleanup=ct(()=>{const t=this.ensure(),e=s=>{s.sync(),this._callbacks.forEach(n=>{n(s)}),this._callbacks.length=0};vt(t)?t.then(e):e(t)})};open=t=>{this._callbacks.push(e=>{e.open(t)}),this.flush()};close=t=>{this._callbacks.push(e=>{e.close(t)}),this.flush()};config=t=>{L.set(t),this._container?.sync()};expose=()=>{const{open:t,close:e,config:s}=this;return Object.assign(Z().reduce((n,c)=>(n[c]=a=>{t({...a,type:c})},n),{}),{open:t,close:e,config:s})}}const Ut=new At,Dt=Object.assign(Ut.expose(),{useNotification:J});function Gt(o){const t=o;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M712 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m2-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M136 374h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m0-174h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m752 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-230 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 624H358c-87.3 0-158-70.7-158-158V484c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v182c0 127 103 230 230 230h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const Pt=$(Gt,{name:"radius-bottomleft",theme:"outlined"});function Vt(o){const t=o;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M368 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-58-624h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m578 102h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m292 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m174 0h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 276h-56c-4.4 0-8 3.6-8 8v182c0 87.3-70.7 158-158 158H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c127 0 230-103 230-230V484c0-4.4-3.6-8-8-8"})})}const zt=$(Vt,{name:"radius-bottomright",theme:"outlined"});function Tt(o){const t=o;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M368 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-2 696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m522-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-48-696H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c87.3 0 158 70.7 158 158v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-127-103-230-230-230"})})}const z=$(Tt,{name:"radius-upright",theme:"outlined"});function Wt(o){const t=o;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M656 200h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m58 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 650h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m696-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174-696H358c-127 0-230 103-230 230v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-87.3 70.7-158 158-158h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const qt=$(Wt,{name:"radius-upleft",theme:"outlined"}),T=f.createContext({name:"Default"});function ne(){const[o,t]=f.useState(!0),[e,s]=Dt.useNotification({stack:o}),n=(a,r)=>{const l="Hello".repeat(Math.random()>.5?12:32);e.info({key:r,title:`Notification ${a}`,description:i.jsx(T.Consumer,{children:({name:u})=>`${l}, ${u}!`}),placement:a,duration:1e10})},c=f.useMemo(()=>({name:"Mink UI"}),[]);return i.jsxs(T,{value:c,children:[s,i.jsx("div",{style:{marginBottom:24},children:i.jsxs(b,{variant:"solid",onClick:()=>{t(a=>!a)},children:["stackEnable-",`${o}`]})}),i.jsxs(G,{children:[i.jsxs(b,{theme:"info",onClick:()=>n("topLeft"),children:[i.jsx(qt,{}),"topLeft"]}),i.jsx(b,{theme:"info",onClick:()=>n("top"),children:"top"}),i.jsxs(b,{theme:"info",onClick:()=>n("topRight"),children:[i.jsx(z,{}),"topRight"]}),i.jsxs(b,{theme:"info",onClick:()=>n("topRight","1"),children:[i.jsx(z,{}),"topRight--update-1"]})]}),i.jsx(ut,{}),i.jsxs(G,{children:[i.jsxs(b,{theme:"info",onClick:()=>n("bottomLeft"),children:[i.jsx(Pt,{}),"bottomLeft"]}),i.jsx(b,{theme:"info",onClick:()=>n("bottom"),children:"bottom"}),i.jsxs(b,{theme:"info",onClick:()=>n("bottomRight"),children:[i.jsx(zt,{}),"bottomRight"]})]})]})}const oe={metaInfo:{"zh-CN":`基本用法描述。

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
        <Button variant="solid" onClick={() => { setStackEnable(p => !p) }}>
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
`,cssName:"css-60f8c4e2",relPath:"packages/core/src/notification/__docs__/examples/basic.md"};export{ne as A,oe as M};
