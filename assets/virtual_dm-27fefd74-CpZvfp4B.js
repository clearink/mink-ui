import{K as ct,e as P,f as y,o as E,I as it,a as q,c as w,p as Q,w as at,x as Z,b as L,r as k,d as J,j as c,i as X,F as S,k as O,L as rt,m as lt,h as ut,g as ht,M as z,N as A,D,S as G,O as mt,A as dt,P as ft,Q as pt}from"./index-Gl7_0Ams.js";import{u as Y,d as vt,e as gt,B as b}from"./index-71h4mSUq.js";import{s as H,P as Ct,I as xt,W as R,D as kt}from"./index-bruDC31T.js";import{p as V}from"./pick-D45V8kPK.js";import{m as Nt,n as bt,g as tt}from"./status-c9vlYJ86.js";import{G as yt}from"./group-transition-bca9sPjL.js";import{c as $t}from"./children-CrS9bith.js";import{S as T}from"./index-DmLzjMra.js";const g={top:24,bottom:24,gap:16,stack:!0,duration:4500,placement:"topRight",showProgress:!1,pauseOnHover:!0,getContainer:()=>ct(),closable:!0},F={offset:8,threshold:3},jt={getContainer:g.getContainer},Ot=P()(["prefixCls","className","classNames","style","styles","top","bottom","gap","stack","maxCount","getContainer"]),Et=P()(["getContainer","groups","onDismiss","onGroupExited"]);function Mt(e){const t=Y("notification"),{getContainer:n=y(t.getContainer,jt.getContainer)}=e,s=e,o={getContainer:n},i=E(e,Et);return{picked:o,omitted:s,resetAttrs:i}}const j={top:g.top,bottom:g.bottom,gap:g.gap,stack:g.stack,maxCount:g.maxCount,placement:g.placement};function Lt(e){return e==="topLeft"||e==="top"||e==="topRight"}function Ht(e,t,n,s,o){const i=e.length,l=new Map;let u=0,h=0;for(let r=i-1,a=0;r>=0;r--){const{key:d}=e[r],{height:m=0}=t.get(`${d}`)||{};r===i-1&&(h=m),o?r===i-1&&(u=m+n):u+=m+n;const f=o?u-n-m+a:a,p=i-1-r,C=Math.max(m+n-h,0);a+=o?s:m+n,l.set(`${d}`,{"--nt-shift":`${f}px`,"--nt-order":`${p}`,"--nt-clip":`${C}px`})}return{itemLayouts:l,listHeight:u}}function Rt(e){return it(e)?e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`):e}function Bt(e,t,n){const{placement:s}=e,{prefixCls:o}=t,{stackEnable:i,isExpanded:l}=n,u=q("notification",o);return{ns:u,classNames:{root:w(u,{[`${u}--${Rt(s)}`]:s,[`${u}--stack`]:i,[`${u}--expanded`]:l})}}}function It(e){const{outerNamespace:t,config:n}=e,{type:s}=n,o=q(i=>`${t||`${i}-notification`}-item`);return{ns:o,classNames:{root:w(o,{[`${o}--${s}`]:s}),statusIcon:`${o}__status-icon`,closeBtn:`${o}__close-btn`,content:`${o}__content`,title:`${o}__title`,description:`${o}__description`,progress:`${o}__progress`}}}function _t(e){const t=Q(e),n=t?!0:!!e,s=t?H(e,F):F;return[n,s]}class St{constructor(t){this.forceUpdate=t}$container={current:null};$group={current:null};$sizes=new Map;get container(){return this.$container.current}get group(){return this.$group.current}delete=t=>{this.$sizes.has(t)&&(this.$sizes.delete(t),this.$sizes=new Map(this.$sizes),this.forceUpdate())};append=(t,n)=>{const{offsetHeight:s,offsetWidth:o}=t,i=this.$sizes.get(n);i&&i.height===s&&i.width===o||(this.$sizes.set(n,{height:s,width:o}),this.$sizes=new Map(this.$sizes),this.forceUpdate())};collect=(t,n)=>{t?this.append(t,`${n.key}`):this.delete(`${n.key}`)}}function Pt(e,t){const{gap:n,stack:s}=e,{items:o}=t,i=at(),l=Z(()=>new St(i)),[u,h]=L(!1),[r,{threshold:a,offset:d}]=_t(s),m=r&&(u||o.length<=a),f=!m&&r,{itemLayouts:p,listHeight:C}=k.useMemo(()=>Ht(o,l.$sizes,n,d,f),[l.$sizes,o,n,d,f]),v=()=>{r&&h(!0)},x=()=>{h(!1)},$=vt(()=>{const N=l.$container.current;N&&h(N.matches(":hover"))});return{ctrl:l,isHovering:u,isExpanded:m,listHeight:C,itemLayouts:p,stackEnable:r,handleOnMouseEnter:v,handleOnMouseLeave:x,handleSyncHovering:$}}function wt(e){const t=Y("notification"),{onGroupExited:n,top:s=y(t.top,j.top),bottom:o=y(t.bottom,j.bottom),gap:i=y(t.gap,j.gap),stack:l=y(t.stack,j.stack),maxCount:u=y(t.maxCount,j.maxCount),placement:h=y(t.placement,j.placement)}=e,r=e,a={gap:i,stack:l,placement:h},{ctrl:d,isHovering:m,isExpanded:f,listHeight:p,itemLayouts:C,stackEnable:v,handleOnMouseEnter:x,handleOnMouseLeave:$,handleSyncHovering:N}=Pt(a,r),{ns:U,classNames:B}=Bt(a,r,{stackEnable:v,isExpanded:f}),[I,_]=J([t.classNames,{root:t.className},B,e.classNames,{root:e.className}],[t.styles,{root:t.style},e.styles,{root:e.style}],{omitted:e}),nt={...E(I,["root","item"]),root:I.item},ot={...E(_,["root","item"]),root:_.item},st={height:p,...Lt(h)?{top:s}:{bottom:o}};return{omitted:r,ns:U,cssNames:I,cssAttrs:_,ctrl:d,isHovering:m,itemLayouts:C,stackEnable:v,extraCssAttrs:st,outerCssNames:nt,outerCssAttrs:ot,handleOnMouseEnter:x,handleOnMouseLeave:$,handleSyncHovering:N,handleOnGroupExited:()=>{N(),n(h)}}}function Ut(e){const{ref:t,config:n,getters:s,listHovering:o,outerCssNames:i,outerCssAttrs:l,outerCssVars:u,onCollect:h,onDismiss:r}=e,{onClose:a}=n,{ns:d,classNames:m}=It(e),[f,p]=J([i,m,n.classNames,{root:n.className},{root:s.names()}],[l,n.styles,{root:n.style},{root:u},{root:s.attrs()}],{omitted:e}),[C,v]=L(o),x=gt(t,B=>{h(B,n)});return{omitted:e,ns:d,cssNames:f,cssAttrs:p,mergedRef:x,handleOnMouseEnter:()=>{v(!0)},handleOnMouseLeave:()=>{v(!1)},handleCloseOnClick:()=>{a?.(),r(n.key)}}}function zt(e){const{omitted:t,cssNames:n,cssAttrs:s,mergedRef:o,handleOnMouseEnter:i,handleOnMouseLeave:l,handleCloseOnClick:u}=Ut(e),{config:h}=t,{type:r,closable:a,closeIcon:d,title:m,description:f}=h,p=()=>{const v=Nt(r);return $t(v,{fallback:c.jsx("span",{className:n.statusIcon,style:s.statusIcon,children:v}),transform:x=>({className:w(x.className,n.statusIcon),style:{...x.style,...s.statusIcon}})})},C=()=>{const{closeIcon:v}=bt({currentState:{closable:a,closeIcon:d},defaultState:{closeIconRender:x=>c.jsx("button",{className:n.closeBtn,style:s.closeBtn,tabIndex:0,type:"button",onClick:u,children:x})}});return v};return c.jsxs("div",{ref:o,className:n.root,style:s.root,onMouseEnter:i,onMouseLeave:l,children:[p(),c.jsxs("div",{className:n.content,style:s.content,children:[c.jsx("div",{className:n.title,style:s.title,children:m}),!X(f)&&c.jsx("div",{className:n.description,style:s.description,children:f})]}),C()]})}function At(e){const{omitted:t,ns:n,cssNames:s,cssAttrs:o,ctrl:i,isHovering:l,itemLayouts:u,stackEnable:h,extraCssAttrs:r,outerCssNames:a,outerCssAttrs:d,handleOnMouseEnter:m,handleOnMouseLeave:f,handleOnGroupExited:p}=wt(e),{items:C,onDismiss:v}=t;return c.jsx("div",{ref:i.$container,className:s.root,style:{...o.root,...r},onMouseEnter:m,onMouseLeave:f,children:c.jsx(yt,{ref:i.$group,classNames:`${n}-motion`,appear:!0,items:C,onGroupExited:p,children:(x,$,N)=>c.jsx(zt,{ref:x,config:N,getters:$,listHovering:h&&l,outerCssAttrs:d,outerCssNames:a,outerCssVars:u.get(N.key),outerNamespace:n,onCollect:i.collect,onDismiss:v})})})}function Dt(e){const{picked:t,omitted:n,resetAttrs:s}=Mt(e),{getContainer:o}=t,{groups:i,onDismiss:l,onGroupExited:u}=n;return c.jsx(Ct,{getContainer:o,children:i.map(h=>k.createElement(At,{...s,key:h.key,items:h.items,placement:h.key,onDismiss:l,onGroupExited:u}))})}const Gt={placement:g.placement,duration:g.duration,showProgress:g.showProgress,pauseOnHover:g.pauseOnHover,closable:g.closable},Vt=P()(["placement","duration","showProgress","pauseOnHover","closable","closeIcon"]);function et(e={}){const t=Z(()=>rt("nt-")),[n,s]=L([]),o=V(e,Ot),i=S(r=>{const a=H({...r,key:X(r.key)?t():`${r.key}`},V(e,Vt),Gt);s(d=>{let m=!1;const f=d.map(p=>p.key!==a.placement?p:(m=!0,{...p,items:p.items.concat(a)}));return m?f:f.concat({key:a.placement,items:[a]})})}),l=S(r=>{const a=O(r);s(d=>d.map(m=>{const{items:f}=m,p=a?[]:f.filter(C=>C.key!==r);return{...m,items:p}}))}),u=S(r=>{s(a=>a.filter(d=>d.key!==r?!0:d.items.length>0))});return[k.useMemo(()=>tt().reduce((r,a)=>(r[a]=d=>{i({...d,type:a})},r),{open:i,close:l}),[i,l]),k.createElement(Dt,{...o,key:"notification-holder",groups:n,onDismiss:l,onGroupExited:u})]}function Tt(e){return ut(e)==="Promise"||Q(e)&&lt(e.then)}const W=ht("TouchEffectContext",void 0);function Ft(e,t){if(e===t)return!1;const n=Object.keys(e),s=Object.keys(t);return n.length!==s.length?!0:n.some(o=>e[o]!==t[o])}function Wt(e){const t=z.use(),n=H(E(e,mt),t,{size:G.use(),disabled:D.use(),getLayerLevel:A.use(),touchEffect:W.use()}),{size:s,disabled:o,touchEffect:i,getLayerLevel:l,iconPrefixCls:u}=n,h=k.useMemo(()=>({prefixCls:u}),[u]),r=dt(()=>n,n,Ft);let a=e.children;return O(s)||(a=c.jsx(G,{value:s,children:a})),O(o)||(a=c.jsx(D,{value:o,children:a})),O(i)||(a=c.jsx(W,{value:i,children:a})),O(l)||(a=c.jsx(A,{value:l,children:a})),O(h.prefixCls)||(a=c.jsx(xt,{value:h,children:a})),c.jsx(z,{value:r,children:a})}const Kt=Object.assign(Wt,{});function qt(e){const{ref:t}=e,[n,s]=L(()=>M.get()),[o,i]=et(n);return k.useImperativeHandle(t,()=>({get open(){return o.open},get close(){return o.close},sync:()=>{s(M.get())}}),[o,s]),{ctxHolder:i,notificationConfig:n}}function Qt(e){const{ctxHolder:t,notificationConfig:n}=qt(e);return c.jsx(Kt,{notification:n,children:t})}class Zt{_config={...g};get=()=>({...this._config});set=t=>{this._config=t}}const M=new Zt;class Jt{_cleanup=null;_container=null;_callbacks=[];ensure=()=>this._container?this._container:new Promise(t=>{ft.createRoot(document.createDocumentFragment()).render(c.jsx(k.StrictMode,{children:c.jsx(Qt,{ref:n=>{t(this._container??=n)}})}))});dispose=()=>{this._cleanup?.(),this._cleanup=null};flush=()=>{this.dispose(),this._cleanup=pt(()=>{const t=s=>{s.sync(),this._callbacks.forEach(o=>o(s)),this._callbacks=[]},n=this.ensure();Tt(n)?n.then(t):t(n)})};open=t=>{this._callbacks.push(n=>{n.open(t)}),this.flush()};close=t=>{this._callbacks.push(n=>{n.close(t)}),this.flush()};config=t=>{M.set(H(t,M.get())),this._container?.sync()};expose=()=>{const t={open:this.open,close:this.close,config:this.config};return tt().reduce((n,s)=>(n[s]=o=>{this.open({...o,type:s})},n),t)}}const Xt=new Jt,Yt=Object.assign(Xt.expose(),{useNotification:et});function te(e){const t=e;return c.jsx("svg",{...t,children:c.jsx("path",{d:"M712 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m2-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M136 374h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m0-174h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m752 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-230 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 624H358c-87.3 0-158-70.7-158-158V484c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v182c0 127 103 230 230 230h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const ee=R(te,{name:"radius-bottomleft",theme:"outlined"});function ne(e){const t=e;return c.jsx("svg",{...t,children:c.jsx("path",{d:"M368 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-58-624h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m578 102h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m292 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m174 0h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 276h-56c-4.4 0-8 3.6-8 8v182c0 87.3-70.7 158-158 158H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c127 0 230-103 230-230V484c0-4.4-3.6-8-8-8"})})}const oe=R(ne,{name:"radius-bottomright",theme:"outlined"});function se(e){const t=e;return c.jsx("svg",{...t,children:c.jsx("path",{d:"M656 200h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m58 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 650h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m696-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174-696H358c-127 0-230 103-230 230v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-87.3 70.7-158 158-158h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const ce=R(se,{name:"radius-upleft",theme:"outlined"});function ie(e){const t=e;return c.jsx("svg",{...t,children:c.jsx("path",{d:"M368 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-2 696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m522-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-48-696H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c87.3 0 158 70.7 158 158v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-127-103-230-230-230"})})}const ae=R(ie,{name:"radius-upright",theme:"outlined"}),K=k.createContext({name:"Default"});function ge(){const[e,t]=k.useState(!0),[n,s]=Yt.useNotification({stack:e}),o=l=>{n.info({title:`Notification ${l}`,description:c.jsx(K.Consumer,{children:({name:u})=>`Hello, ${u}!`.repeat(Math.random()*10|1)}),placement:l,duration:1e10})},i=k.useMemo(()=>({name:"Mink UI"}),[]);return c.jsxs(K,{value:i,children:[s,c.jsx("div",{style:{marginBottom:24},children:c.jsxs(b,{onClick:()=>{t(l=>!l)},children:["stackEnable-",`${e}`]})}),c.jsxs(T,{children:[c.jsxs(b,{variant:"filled",onClick:()=>o("topLeft"),children:[c.jsx(ce,{}),"topLeft"]}),c.jsx(b,{variant:"filled",onClick:()=>o("top"),children:"top"}),c.jsxs(b,{variant:"filled",onClick:()=>o("topRight"),children:[c.jsx(ae,{}),"topRight"]})]}),c.jsx(kt,{}),c.jsxs(T,{children:[c.jsxs(b,{variant:"filled",onClick:()=>o("bottomLeft"),children:[c.jsx(ee,{}),"bottomLeft"]}),c.jsx(b,{variant:"filled",onClick:()=>o("bottom"),children:"bottom"}),c.jsxs(b,{variant:"filled",onClick:()=>o("bottomRight"),children:[c.jsx(oe,{}),"bottomRight"]})]})]})}const Ce={metaInfo:{"zh-CN":`基本用法描述。

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
    api.info({
      title: \`Notification \${placement}\`,
      description: <Context.Consumer>{({ name }) => \`Hello, \${name}!\`.repeat(Math.random() * 10 | 0 + 1)}</Context.Consumer>,
      placement,
      duration: 1e10
    })
  }

  const contextValue = useMemo(() => ({ name: 'Mink UI' }), [])

  return (
    <Context value={contextValue}>
      {contextHolder}
      <div style={{ marginBottom: 24 }}>
        <Button onClick={() => { setStackEnable(p => !p) }}>
          stackEnable-
          {\`\${stackEnable}\`}
        </Button>
      </div>
      <Space>
        <Button
          variant="filled"
          onClick={() => openNotification('topLeft')}
        >
          <RadiusUpleftOutlined />
          topLeft
        </Button>
        <Button
          variant="filled"
          onClick={() => openNotification('top')}
        >
          top
        </Button>
        <Button
          variant="filled"
          onClick={() => openNotification('topRight')}
        >
          <RadiusUprightOutlined />
          topRight
        </Button>
      </Space>
      <Divider />
      <Space>
        <Button
          variant="filled"
          onClick={() => openNotification('bottomLeft')}
        >
          <RadiusBottomleftOutlined />
          bottomLeft
        </Button>
        <Button
          variant="filled"
          onClick={() => openNotification('bottom')}
        >
          bottom
        </Button>
        <Button
          variant="filled"
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
`,cssName:"css-60f8c4e2",relativePath:"packages/core/src/notification/__docs__/examples/basic.md"};export{ge as A,Ce as M};
