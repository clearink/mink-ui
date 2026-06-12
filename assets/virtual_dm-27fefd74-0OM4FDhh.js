import{e as w,o as I,L as Z,a as T,c as A,s as J,r as f,z as L,A as W,b as q,j as i,k as K,X as Q,i as Y,V as tt,W as et}from"./index-MrfF1wwl.js";import{u as R,f as nt,h as ot,i as st,W as B,B as N}from"./index-BUUmuQX0.js";import{s as P,P as ct,p as $,D as it}from"./index-BQK0WB1A.js";import{G as at}from"./group-transition-Il2IJCFA.js";import{c as rt}from"./children-BYkTuB6U.js";import{n as lt,m as ut,g as F}from"./closable-qvUxyvLg.js";import{C as ht,i as mt}from"./index-Ilq8771D.js";import{S as V}from"./index-CIc82ULJ.js";const b={top:24,bottom:24,gap:16,stack:!0,duration:4500,placement:"topRight",showProgress:!1,pauseOnHover:!0,closable:!0},D={offset:8,threshold:3},dt=w()(["prefixCls","className","classNames","style","styles","top","bottom","gap","stack","maxCount","getContainer"]),ft=w()(["getContainer","groups","onDismiss","onGroupExited"]);function pt(n){const t=R("notification"),{getContainer:e=t.getContainer}=n,s=n,o={getContainer:e},c=I(n,ft);return{picked:o,omitted:s,restAttrs:c}}const j={top:b.top,bottom:b.bottom,gap:b.gap,stack:b.stack,maxCount:b.maxCount,placement:b.placement};function vt(n){return n==="topLeft"||n==="top"||n==="topRight"}function gt(n,t,e,s,o){const c=n.length,a=new Map;let r=0,l=0;for(let u=c-1,m=0;u>=0;u--){const{key:v}=n[u],h=t.get(`${v}`)||0;u===c-1&&(l=h),o?u===c-1&&(r=h+e):r+=h+e;const g=o?r-e-h+m:m,x=c-1-u,d=Math.max(h+e-l,0);m+=o?s:h+e,a.set(`${v}`,{"--nt-shift":`${g}px`,"--nt-order":`${x}`,"--nt-clip":`${d}px`})}return{itemCssVars:a,listHeight:r}}function xt(n){return Z(n)?n.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`):n}function Ct(n,t,e){const{placement:s}=n,{prefixCls:o}=t,{stackEnable:c,isExpanded:a}=e,r=T("notification",o);return{ns:r,classNames:{root:A(r,{[`${r}--${xt(s)}`]:s,[`${r}--stack`]:c,[`${r}--expanded`]:a})}}}function kt(n){const{outerNamespace:t,config:e}=n,{type:s}=e,o=T(c=>`${t||`${c}-notification`}-item`);return{ns:o,classNames:{root:A(o,{[`${o}--${s}`]:s}),statusIcon:`${o}__status-icon`,closeBtn:`${o}__close-btn`,content:`${o}__content`,title:`${o}__title`,description:`${o}__description`,progress:`${o}__progress`}}}function bt(n){const t=J(n),e=t?!0:!!n,s=t?P(n,D):D;return[e,s]}class Nt{_change;$container={current:null};get container(){return this.$container.current}_bind=t=>{this._change=t};append=(t,e)=>{const{offsetHeight:s}=t;this._change(o=>{if(o.get(e)===s)return o;const c=new Map(o);return c.set(e,s),c})};delete=t=>{this._change(e=>{if(!e.has(t))return e;const s=new Map(e);return s.delete(t),s})};collect=(t,e)=>{t?this.append(t,`${e.key}`):this.delete(`${e.key}`)}}function _t(n,t){const{gap:e,stack:s}=n,{items:o}=t,[c,a]=f.useState(()=>new Map),r=L(()=>new Nt);W(()=>{r._bind(k=>{a(k)})});const[l,u]=f.useState(!1),[m,{threshold:v,offset:h}]=bt(s),g=m&&(l||o.length<=v),x=!g&&m,{itemCssVars:d,listHeight:p}=f.useMemo(()=>gt(o,c,e,h,x),[c,o,e,h,x]),_=()=>{m&&u(!0)},C=()=>{u(!1)},M=nt(()=>{const k=r.container;k&&u(k.matches(":hover"))});return{ctrl:r,isHovering:l,isExpanded:g,listHeight:p,itemCssVars:d,stackEnable:m,handleMouseEnter:_,handleMouseLeave:C,handleRecheckHover:M}}function Mt(n){const t=R("notification"),{onGroupExited:e,top:s=j.top,bottom:o=j.bottom,gap:c=j.gap,stack:a=j.stack,maxCount:r=j.maxCount,placement:l=j.placement}=n,u=n,m={gap:c,stack:a,placement:l},{ctrl:v,isHovering:h,isExpanded:g,listHeight:x,itemCssVars:d,stackEnable:p,handleMouseEnter:_,handleMouseLeave:C,handleRecheckHover:M}=_t(m,u),{ns:k,classNames:H}=Ct(m,u,{stackEnable:p,isExpanded:g}),[y,E]=q([t.classNames,{root:t.className},H,n.classNames,{root:n.className}],[t.styles,{root:t.style},n.styles,{root:n.style},{root:{height:x}},{root:vt(l)?{top:s}:{bottom:o}}],{meta:n}),U={...I(y,["root","item"]),root:y.item},S={...I(E,["root","item"]),root:E.item};return{omitted:u,ns:k,cssNames:y,cssAttrs:E,ctrl:v,isHovering:h,itemCssVars:d,stackEnable:p,outerCssNames:U,outerCssAttrs:S,handleMouseEnter:_,handleMouseLeave:C,handleGroupExited:()=>{M(),e(l)},handleRecheckHover:M}}function jt(n){const t=R("notification"),{ref:e,config:s,getters:o,listHovering:c,outerCssNames:a,outerCssAttrs:r,outerCssVars:l,onCollect:u,onDismiss:m}=n,{closable:v,onClose:h}=s,{ns:g,classNames:x}=kt(n),[d,p]=q([a,x,s.classNames,{root:s.className},{root:o.names()}],[r,s.styles,{root:s.style},{root:l},{root:o.attrs()}],{meta:n}),[_,C]=f.useState(c),M=ot(e,S=>{u(S,s)}),[k,H]=lt({currentState:{closable:v},contextState:{closable:t.closable}});return{omitted:n,ns:g,cssNames:d,cssAttrs:p,refCombined:M,globalConfig:t,closeIconRender:H,handleClose:()=>{m(s.key),h?.(),k?.onClose?.()},handleMouseEnter:()=>{C(!0)},handleMouseLeave:()=>{C(!1)}}}function yt(n){const{omitted:t,cssNames:e,cssAttrs:s,refCombined:o,closeIconRender:c,handleClose:a,handleMouseEnter:r,handleMouseLeave:l}=jt(n),{config:u}=t,{type:m,title:v,description:h}=u,g=()=>c((d,p)=>i.jsx("button",{className:e.closeBtn,style:s.closeBtn,disabled:p,tabIndex:0,type:"button",onClick:a,children:d})),x=()=>{const d=ut(m);return rt(d,{fallback:i.jsx("span",{className:e.statusIcon,style:s.statusIcon,children:d}),transform:p=>({className:A(p.className,e.statusIcon),style:{...p.style,...s.statusIcon}})})};return i.jsxs("div",{ref:o,className:e.root,style:s.root,onMouseEnter:r,onMouseLeave:l,children:[g(),x(),i.jsxs("div",{className:e.content,style:s.content,children:[i.jsx("div",{className:e.title,style:s.title,children:v}),st(h)&&i.jsx("div",{className:e.description,style:s.description,children:h})]})]})}function Et(n){const{omitted:t,ns:e,cssNames:s,cssAttrs:o,ctrl:c,isHovering:a,itemCssVars:r,stackEnable:l,outerCssNames:u,outerCssAttrs:m,handleMouseEnter:v,handleMouseLeave:h,handleGroupExited:g}=Mt(n),{items:x,onDismiss:d}=t;return i.jsx("div",{ref:c.$container,className:s.root,style:o.root,onMouseEnter:v,onMouseLeave:h,children:i.jsx(at,{classNames:`${e}-motion`,appear:!0,items:x,onGroupExited:g,children:(p,_,C)=>i.jsx(yt,{ref:p,config:C,getters:_,listHovering:l&&a,outerCssAttrs:m,outerCssNames:u,outerCssVars:r.get(C.key),outerNamespace:e,onCollect:c.collect,onDismiss:d})})})}function $t(n){const{picked:t,omitted:e,restAttrs:s}=pt(n),{getContainer:o}=t,{groups:c,onDismiss:a,onGroupExited:r}=e;return i.jsx(ct,{getContainer:o,children:c.map(l=>f.createElement(Et,{...s,key:l.key,items:Array.from(l.items.values()),placement:l.key,onDismiss:a,onGroupExited:r}))})}const G=w()(["placement","duration","showProgress","pauseOnHover","closable"]);class Rt{_change;_prepare;_bind=(t,e)=>{this._change=t,this._prepare=e};open=t=>{const e=this._prepare(t);this._change(s=>{let o=!1;const c=s.map(a=>a.key!==e.placement?a:(o=!0,{...a,items:new Map(a.items).set(e.key,e)}));return o?c:c.concat({key:e.placement,items:new Map().set(e.key,e)})})};close=t=>{const e=K(t);this._change(s=>s.map(o=>{if(e)return{...o,items:new Map};const c=new Map(o.items);return c.delete(t),{...o,items:c}}))};finish=t=>{this._change(e=>e.filter(s=>s.key!==t?!0:s.items.size>0))};expose=()=>{const{open:t,close:e}=this;return Object.assign(F().reduce((s,o)=>(s[o]=c=>{t({...c,type:o})},s),{}),{open:t,close:e})}}function X(n={}){const t=R("notification"),e=L(()=>Q("nt-")),[s,o]=f.useState([]),c=L(()=>new Rt);W(()=>{c._bind(l=>{o(l)},l=>P({...l,key:Y(l.key)?e():`${l.key}`},$(n,G),$(t,["closable"]),$(b,G)))});const a=f.useMemo(()=>c.expose(),[c]),r=$(n,dt);return[a,f.createElement($t,{...r,key:"notification-holder",groups:s,onDismiss:c.close,onGroupExited:c.finish})]}function Bt(n){const{ref:t}=n,[e,s]=f.useState(()=>O.get()),[o,c]=X(e);return f.useImperativeHandle(t,()=>({get open(){return o.open},get close(){return o.close},sync:()=>{s(O.get())}}),[o,s]),{ctxHolder:c,notificationConfig:e}}function Ht(n){const{ctxHolder:t,notificationConfig:e}=Bt(n);return i.jsx(ht,{notification:e,children:t})}class St{_config={...b};get=()=>({...this._config});set=t=>{this._config=P(t,this.get())}}const O=new St;class It{_cleanup=null;_container=null;_callbacks=[];ensure=()=>this._container?this._container:new Promise(t=>{tt.createRoot(document.createDocumentFragment()).render(i.jsx(f.StrictMode,{children:i.jsx(Ht,{ref:e=>{t(this._container??=e)}})}))});clear=()=>{this._cleanup?.(),this._cleanup=null};flush=()=>{this.clear(),this._cleanup=et(()=>{const t=this.ensure(),e=s=>{s.sync(),this._callbacks.forEach(o=>{o(s)}),this._callbacks.length=0};mt(t)?t.then(e):e(t)})};open=t=>{this._callbacks.push(e=>{e.open(t)}),this.flush()};close=t=>{this._callbacks.push(e=>{e.close(t)}),this.flush()};config=t=>{O.set(t),this._container?.sync()};expose=()=>{const{open:t,close:e,config:s}=this;return Object.assign(F().reduce((o,c)=>(o[c]=a=>{t({...a,type:c})},o),{}),{open:t,close:e,config:s})}}const Lt=new It,Ot=Object.assign(Lt.expose(),{useNotification:X});function wt(n){const t=n;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M712 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m2-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M136 374h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m0-174h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m752 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-230 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 624H358c-87.3 0-158-70.7-158-158V484c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v182c0 127 103 230 230 230h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const At=B(wt,{name:"radius-bottomleft",theme:"outlined"});function Pt(n){const t=n;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M368 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-58-624h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m578 102h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m292 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m174 0h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 276h-56c-4.4 0-8 3.6-8 8v182c0 87.3-70.7 158-158 158H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c127 0 230-103 230-230V484c0-4.4-3.6-8-8-8"})})}const Ut=B(Pt,{name:"radius-bottomright",theme:"outlined"});function Vt(n){const t=n;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M656 200h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m58 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 650h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m696-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174-696H358c-127 0-230 103-230 230v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-87.3 70.7-158 158-158h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const Dt=B(Vt,{name:"radius-upleft",theme:"outlined"});function Gt(n){const t=n;return i.jsx("svg",{...t,children:i.jsx("path",{d:"M368 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-2 696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m522-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-48-696H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c87.3 0 158 70.7 158 158v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-127-103-230-230-230"})})}const zt=B(Gt,{name:"radius-upright",theme:"outlined"}),z=f.createContext({name:"Default"});function Yt(){const[n,t]=f.useState(!0),[e,s]=Ot.useNotification({stack:n}),o=a=>{const r="Hello".repeat(Math.random()>.5?12:32);e.info({title:`Notification ${a}`,description:i.jsx(z.Consumer,{children:({name:l})=>`${r}, ${l}!`}),placement:a,duration:1e10})},c=f.useMemo(()=>({name:"Mink UI"}),[]);return i.jsxs(z,{value:c,children:[s,i.jsx("div",{style:{marginBottom:24},children:i.jsxs(N,{variant:"solid",onClick:()=>{t(a=>!a)},children:["stackEnable-",`${n}`]})}),i.jsxs(V,{children:[i.jsxs(N,{theme:"info",onClick:()=>o("topLeft"),children:[i.jsx(Dt,{}),"topLeft"]}),i.jsx(N,{theme:"info",onClick:()=>o("top"),children:"top"}),i.jsxs(N,{theme:"info",onClick:()=>o("topRight"),children:[i.jsx(zt,{}),"topRight"]})]}),i.jsx(it,{}),i.jsxs(V,{children:[i.jsxs(N,{theme:"info",onClick:()=>o("bottomLeft"),children:[i.jsx(At,{}),"bottomLeft"]}),i.jsx(N,{theme:"info",onClick:()=>o("bottom"),children:"bottom"}),i.jsxs(N,{theme:"info",onClick:()=>o("bottomRight"),children:[i.jsx(Ut,{}),"bottomRight"]})]})]})}const te={metaInfo:{"zh-CN":`基本用法描述。

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

  const openNotification = (placement) => {
    const prefix = 'Hello'.repeat(Math.random() > 0.5 ? 12 : 32)
    api.info({
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
`,cssName:"css-60f8c4e2",relPath:"packages/core/src/notification/__docs__/examples/basic.md"};export{Yt as A,te as M};
