var J=Object.defineProperty;var K=(n,t,e)=>t in n?J(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var r=(n,t,e)=>K(n,typeof t!="symbol"?t+"":t,e);import{t as Q,v as Y,n as tt,j as s,D as et,S as nt,M as ot,c as C,r as g,w as $,a as z,b as st,i as ct,g as F,y as V,d as A,h as it,p as I,N as at,O as rt,E as lt,R as ht}from"./index-CtjwIB4J.js";import{a as ut,i as dt,u as mt,n as ft,B as R}from"./index-BhbBz5E2.js";import{g as pt,w as vt,p as W}from"./status-C9gaZyj_.js";import{c as gt,a as xt,P as kt,w as S,D as bt}from"./index-DosD74QQ.js";import{p as D}from"./pick-BK4giCUn.js";import{u as Ct}from"./index-BqxgZOiT.js";import{c as Nt}from"./index--2uJzH5L.js";import{G as jt}from"./index-BApC6rNu.js";import{S as _}from"./index-DYth-1rK.js";function Et(n){return Q(n)==="Promise"||Y(n)&&tt(n.then)}const yt=["top","bottom","topLeft","topRight","bottomLeft","bottomRight"];function Rt(n){const{children:t,touchEffect:e={}}=n;return s.jsx(ut.Provider,{value:e,children:s.jsx(et.Provider,{value:void 0,children:s.jsx(nt.Provider,{value:void 0,children:t})})})}const G={top:24,bottom:24,duration:4500,placement:"topRight",showProgress:!1,pauseOnHover:!0,getContainer:ot,stack:!0};class Bt{constructor(){r(this,"config",{...G});r(this,"get",()=>({...this.config}));r(this,"set",t=>{this.config=t})}}const w=new Bt;function Mt(n,t){const{type:e,className:c,classNames:o={}}=t;return{root:C(n,{[`${n}--${e}`]:e},c,o.root),content:C(`${n}__content`,o.content),icon:C(`${n}__icon`,o.icon),closeBtn:C(`${n}__close-btn`,o.closeBtn),message:C(`${n}__message`,o.message),description:C(`${n}__description`,o.description),progress:C(`${n}__progress`,o.progress)}}const X={duration:4500,placement:"topRight",showProgress:!1,pauseOnHover:!0,closable:!0};function wt(n,t){const e=$(n,X),{message:c,description:o,duration:i,type:l,showProgress:v,onClick:h,onClose:d}=e,k=z("notification-notice"),a=Mt(k,e),m=st(e),p=Nt(i,d);g.useEffect(p,[p]);const j=x=>{x.stopPropagation(),x.preventDefault(),d()},b=g.useMemo(()=>{const x=pt(l);return vt(x,{fallback:s.jsx("span",{className:a.icon,children:x}),props:u=>({className:C(u.className,a.icon),style:{...u.style,...m.icon}})})},[a.icon,m.icon,l]),[B,E]=Ct(e,void 0,{closeIconRender:x=>s.jsx("button",{className:a.closeBtn,style:m.closeBtn,tabIndex:0,type:"button",onClick:j,children:x})});return s.jsxs("div",{ref:t,className:a.root,style:m.root,onClick:h,children:[b,s.jsxs("div",{className:a.content,children:[s.jsx("div",{className:a.message,children:c}),!ct(o)&&s.jsx("div",{className:a.description,children:o})]}),E,!!v&&s.jsx("progress",{className:a.progress,style:m.progress})]})}const $t=g.forwardRef(wt);function St(n){return Array.from(n.components||[]).reduce((t,[e,{isExiting:c,isExited:o,element:i}])=>{const l=n.panels.get(e);return l&&i&&!(c||o)&&t.push([l,i,e]),t},[])}function Ot(n){const{props:{placement:t},refs:e,stackEnable:c,stackConfig:o}=n,{threshold:i,gap:l,offset:v}=o,h=new Map,d=St(e);if(c&&d.reverse(),!d.length)return h;const k=t.startsWith("top")?1:-1,a=d.length,m=a<=i||e.hovers.size>0,p=d[0][0];for(let j=0,b=0,B=1;b<a;b++){const[E,x,u]=d[b],y=(m?E:p).offsetHeight;h.set(u,{delta:j,scale:B,height:y,wrapper:x}),!(b>=a-1)&&(j+=(m?E.offsetHeight+l:v)*k,m||(B=1-v*2*Math.min(b+1,3)/p.offsetWidth))}return h}class Ut{constructor(){r(this,"components");r(this,"panels",new Map);r(this,"hovers",new Set);r(this,"reset",()=>{this.hovers.clear()})}}function Pt(n,t,e){const{notices:c,placement:o}=n,i=F(()=>new Ut),l=V(),[v,h]=A(()=>new Map),d=()=>{const u=new Set(c.map(N=>N.key)),y=i.hovers.size;i.hovers.forEach(N=>{u.has(N)||i.hovers.delete(N)}),i.hovers.size!==y&&l()},k=u=>{t&&(d(),i.hovers.add(u),l())},a=u=>{t&&(i.hovers.delete(u),l())},m=()=>{const u=new Map;Ot({props:n,refs:i,stackEnable:t,stackConfig:e}).forEach(({delta:y,scale:N,height:O},U)=>{const P=`translate3d(${o==="top"||o==="bottom"?"-50%":"0"}, ${y}px, 0) scaleX(${N})`;u.set(U,{transform:P,height:O})}),h(u)};return{refs:i,transforms:v,handleUpdate:t?m:()=>{h(new Map)},handleEnter:t?d:void 0,handleEntering:t?m:void 0,handleExit:u=>{u.style.setProperty("height",`${u.offsetHeight}px`)},handleExiting:u=>{t&&m(),u.style.setProperty("height","0px")},handleMouseEnter:k,handleMouseLeave:a}}function It(n){const{stack:t}=n,e=t&&!dt(t),c=e?!0:!!t,o=g.useMemo(()=>{const i={threshold:3,offset:8,gap:16};return e?$(t,i):i},[e,t]);return{stackEnable:c,stackConfig:o}}function Ht(n){const{notices:t,placement:e,top:c,bottom:o,stack:i,onClose:l,onFinished:v}=n,h=z("notification"),{stackEnable:d,stackConfig:k}=It(n),{gap:a,threshold:m}=k,{refs:p,transforms:j,handleUpdate:b,handleEnter:B,handleEntering:E,handleExit:x,handleExiting:u,handleMouseEnter:y,handleMouseLeave:N}=Pt(n,d,k),O=mt(b),U=it([i,p.hovers.size],{compare:xt,listener:O}),[H,P]=gt(!0);if(g.useEffect(()=>()=>{p.reset()},[p]),U||H)return null;const L=d&&(t.length<=m||p.hovers.size>0);return s.jsx("div",{className:C(h,{[`${h}--${e}`]:e,[`${h}--stack`]:d,[`${h}--expanded`]:L}),style:{...e.startsWith("bottom")?{bottom:o}:{top:c},zIndex:P},children:s.jsx(jt,{ref:f=>{p.components=f==null?void 0:f.components},appear:!0,classNames:`${h}-motion`,onEnter:B,onEntering:E,onExit:x,onExiting:u,onFinished:v,children:t.map(f=>s.jsxs("div",{className:`${h}-notice-wrapper`,onMouseEnter:()=>{y(f.key)},onMouseLeave:()=>{N(f.key)},style:j.get(f.key),children:[g.createElement($t,{...f,key:f.key,ref:M=>{M?p.panels.set(f.key,M):p.panels.delete(f.key)},onClose:()=>{var M;(M=f.onClose)==null||M.call(f),l(f.key)}}),L&&s.jsx("div",{className:`${h}-pointer-holder`,style:{height:a}})]},f.key))})})}const T=["duration","pauseOnHover","placement","showProgress","closable","closeIcon"];class Lt{constructor(){r(this,"uniqueId",at("nt-"));r(this,"configs",yt.map(t=>({placement:t,visible:!1,notices:[]})))}}class Dt{constructor(t,e){r(this,"open",t=>{const e=$(t,{key:I(t.key)?this.states.uniqueId():t.key},D(w.get(),T),D(X,T)),c=this.configs.find(o=>o.placement===e.placement);c&&(c.notices.push(e),c.visible=!0,this.forceUpdate())});r(this,"close",t=>{let e=I(t);this.states.configs=this.states.configs.map(c=>{const{notices:o}=c;if(I(t))return{...c,notices:[]};const i=o.filter(l=>l.key!==t);return i.length===o.length?c:(e=!0,{...c,notices:i})}),e&&this.forceUpdate()});r(this,"finish",t=>{this.states.configs=this.states.configs.map(e=>e.placement!==t?e:{...e,visible:e.notices.length>0},null),this.forceUpdate()});r(this,"inject",()=>{const t=W.reduce((e,c)=>(e[c]=o=>{this.open({...o,type:c})},e),{});return{open:this.open,close:this.close,...t}});this.forceUpdate=t,this.states=e}get configs(){return this.states.configs}}function Z(n){const t=$(n||{},G),{getContainer:e,top:c,bottom:o,stack:i,maxCount:l}=t,v=V(),h=F(()=>new Lt),d=g.useMemo(()=>new Dt(v,h),[v,h]),k=g.useMemo(()=>d.inject(),[d]);return[k,s.jsx(kt,{getContainer:e,children:h.configs.map(a=>a.visible&&s.jsx(Ht,{top:c,bottom:o,stack:i,maxCount:l,placement:a.placement,notices:a.notices,onClose:m=>{k.close(m)},onFinished:()=>{d.finish(a.placement)}},a.placement))})]}function _t(n,t){const[e,c]=A(w.get),[o,i]=Z(e);return g.useImperativeHandle(t,()=>({get open(){return o.open},get close(){return o.close},sync:()=>{c(w.get())}}),[o.close,o.open,c]),s.jsx(Rt,{children:i})}const Tt=g.forwardRef(_t);class qt{constructor(){r(this,"holder",null);r(this,"flushCleanup",ft);r(this,"queue",[]);r(this,"_ensure",()=>this.holder?this.holder:new Promise(t=>{rt(document.createDocumentFragment()).render(s.jsx(g.StrictMode,{children:s.jsx(Tt,{ref:e=>{this.holder||(this.holder=e),this.holder&&t(this.holder)}})}))}));r(this,"flush",()=>{this.flushCleanup(),this.flushCleanup=lt(()=>{const t=this._ensure(),e=c=>{c.sync(),this.queue.forEach(o=>{o(c)}),this.queue=[]};Et(t)?t.then(e):e(t)})});r(this,"open",t=>{this.queue.push(e=>{e.open(t)}),this.flush()});r(this,"close",t=>{this.queue.push(e=>{e.close(t)}),this.flush()});r(this,"config",t=>{var e;w.set($(t,w.get())),(e=this.holder)==null||e.sync()});r(this,"inject",()=>{const t=W.reduce((e,c)=>(e[c]=o=>{this.open({...o,type:c})},e),{});return{open:this.open,close:this.close,config:this.config,...t}})}}const zt=new qt,Ft=Object.assign(zt.inject(),{useNotification:Z});function Vt(n){const t=n;return s.jsx("svg",{...t,children:s.jsx("path",{d:"M712 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m2-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M136 374h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m0-174h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m752 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-230 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 624H358c-87.3 0-158-70.7-158-158V484c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v182c0 127 103 230 230 230h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const At=S(Vt,{name:"radius-bottomleft",theme:"outlined"});function Wt(n){const t=n;return s.jsx("svg",{...t,children:s.jsx("path",{d:"M368 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-58-624h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m578 102h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m292 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m174 0h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 276h-56c-4.4 0-8 3.6-8 8v182c0 87.3-70.7 158-158 158H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c127 0 230-103 230-230V484c0-4.4-3.6-8-8-8"})})}const Gt=S(Wt,{name:"radius-bottomright",theme:"outlined"});function Xt(n){const t=n;return s.jsx("svg",{...t,children:s.jsx("path",{d:"M656 200h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m58 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 650h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m696-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174-696H358c-127 0-230 103-230 230v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-87.3 70.7-158 158-158h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const Zt=S(Xt,{name:"radius-upleft",theme:"outlined"});function Jt(n){const t=n;return s.jsx("svg",{...t,children:s.jsx("path",{d:"M368 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-2 696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m522-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-48-696H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c87.3 0 158 70.7 158 158v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-127-103-230-230-230"})})}const Kt=S(Jt,{name:"radius-upright",theme:"outlined"}),q=ht.createContext({name:"Default"});function re(){const[n,t]=g.useState(!0),[e,c]=Ft.useNotification({stack:n}),o=l=>{e.info({message:`Notification ${l}`,description:s.jsx(q.Consumer,{children:({name:v})=>`Hello, ${v}!`}),placement:l,duration:1e10})},i=g.useMemo(()=>({name:"Ink UI"}),[]);return s.jsxs(q.Provider,{value:i,children:[c,s.jsx("div",{style:{marginBottom:24},children:s.jsxs(R,{onClick:()=>{t(l=>!l)},children:["stackEnable-",`${n}`]})}),s.jsxs(_,{children:[s.jsxs(R,{variant:"filled",onClick:()=>o("topLeft"),children:[s.jsx(Zt,{}),"topLeft"]}),s.jsx(R,{variant:"filled",onClick:()=>o("top"),children:"top"}),s.jsxs(R,{variant:"filled",onClick:()=>o("topRight"),children:[s.jsx(Kt,{}),"topRight"]})]}),s.jsx(bt,{}),s.jsxs(_,{children:[s.jsxs(R,{variant:"filled",onClick:()=>o("bottomLeft"),children:[s.jsx(At,{}),"bottomLeft"]}),s.jsx(R,{variant:"filled",onClick:()=>o("bottom"),children:"bottom"}),s.jsxs(R,{variant:"filled",onClick:()=>o("bottomRight"),children:[s.jsx(Gt,{}),"bottomRight"]})]})]})}const le={desc:{"zh-CN":`基础用法

`,"en-US":`基础用法

`},rawText:`\`\`\`tsx
import { Button, Divider, Space, notification } from '@mink-ui/core'
import RadiusBottomleftOutlined from '@mink-ui/icons/lib/icons/RadiusBottomleftOutlined'
import RadiusBottomrightOutlined from '@mink-ui/icons/lib/icons/RadiusBottomrightOutlined'
import RadiusUpleftOutlined from '@mink-ui/icons/lib/icons/RadiusUpleftOutlined'
import RadiusUprightOutlined from '@mink-ui/icons/lib/icons/RadiusUprightOutlined'
import React, { useMemo, useState } from 'react'

const Context = React.createContext({ name: 'Default' })

export default function App() {
  const [stackEnable, setStackEnable] = useState(true)

  const [api, contextHolder] = notification.useNotification({
    stack: stackEnable
  })

  const openNotification = (placement) => {
    api.info({
      message: \`Notification \${placement}\`,
      description: <Context.Consumer>{({ name }) => \`Hello, \${name}!\`}</Context.Consumer>,
      placement,
      duration: 1e10
    })
  }

  const contextValue = useMemo(() => ({ name: 'Ink UI' }), [])

  return (
    <Context.Provider value={contextValue}>
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
    </Context.Provider>
  )
}
\`\`\`
`,cssWrapName:"cssb89e7032449378f2075c219b60f8c4e2"};export{re as A,le as i};
