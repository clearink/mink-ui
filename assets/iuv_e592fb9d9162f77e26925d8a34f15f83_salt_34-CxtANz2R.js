var J=Object.defineProperty;var K=(s,e,t)=>e in s?J(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var a=(s,e,t)=>K(s,typeof e!="symbol"?e+"":e,t);import{a as Q,i as Y,u as ee,n as te,B as w}from"./index-BzUGu1zc.js";import{t as se,v as ne,n as ce,j as c,D as oe,S as ie,M as re,c as N,r as g,w as P,a as F,b as ae,i as he,g as z,y as V,d as A,h as le,p as O,N as ue,O as de,E as me,R as fe}from"./index-CQYuhXvO.js";import{g as pe,w as ve,p as G}from"./status-BHWpQKyw.js";import{c as ge,a as xe,P as je,w as S,D as ye}from"./index-5fqhV3Hv.js";import{p as _}from"./pick-BK4giCUn.js";import{u as Ne}from"./index-E6OIvdpD.js";import{c as Ce}from"./index-DhkZ8yl3.js";import{G as Ee}from"./index-DlwX0xPp.js";import{S as T}from"./index-BOK2gJn1.js";function be(s){return se(s)==="Promise"||ne(s)&&ce(s.then)}const ke=["top","bottom","topLeft","topRight","bottomLeft","bottomRight"];function we(s){const{children:e,touchEffect:t={}}=s;return c.jsx(Q.Provider,{value:t,children:c.jsx(oe.Provider,{value:void 0,children:c.jsx(ie.Provider,{value:void 0,children:e})})})}const W={top:24,bottom:24,duration:4500,placement:"topRight",showProgress:!1,pauseOnHover:!0,getContainer:re,stack:!0};class Me{constructor(){a(this,"config",{...W});a(this,"get",()=>({...this.config}));a(this,"set",e=>{this.config=e})}}const R=new Me;function $e(s,e){const{type:t,className:o,classNames:n={}}=e;return{root:N(s,{[`${s}--${t}`]:t},o,n.root),content:N(`${s}__content`,n.content),icon:N(`${s}__icon`,n.icon),closeBtn:N(`${s}__close-btn`,n.closeBtn),message:N(`${s}__message`,n.message),description:N(`${s}__description`,n.description),progress:N(`${s}__progress`,n.progress)}}const X={duration:4500,placement:"topRight",showProgress:!1,pauseOnHover:!0,closable:!0};function Re(s,e){const t=P(s,X),{message:o,description:n,duration:i,type:h,showProgress:v,onClick:l,onClose:d}=t,j=F("notification-notice"),r=$e(j,t),m=ae(t),p=Ce(i,d);g.useEffect(p,[p]);const E=x=>{x.stopPropagation(),x.preventDefault(),d()},y=g.useMemo(()=>{const x=pe(h);return ve(x,{fallback:c.jsx("span",{className:r.icon,children:x}),props:u=>({className:N(u.className,r.icon),style:{...u.style,...m.icon}})})},[r.icon,m.icon,h]),[M,b]=Ne(t,void 0,{closeIconRender:x=>c.jsx("button",{className:r.closeBtn,style:m.closeBtn,tabIndex:0,type:"button",onClick:E,children:x})});return c.jsxs("div",{ref:e,className:r.root,style:m.root,onClick:l,children:[y,c.jsxs("div",{className:r.content,children:[c.jsx("div",{className:r.message,children:o}),!he(n)&&c.jsx("div",{className:r.description,children:n})]}),b,!!v&&c.jsx("progress",{className:r.progress,style:m.progress})]})}const Pe=g.forwardRef(Re);function Se(s){return Array.from(s.components||[]).reduce((e,[t,{isExiting:o,isExited:n,element:i}])=>{const h=s.panels.get(t);return h&&i&&!(o||n)&&e.push([h,i,t]),e},[])}function Ie(s){const{props:{placement:e},refs:t,stackEnable:o,stackConfig:n}=s,{threshold:i,gap:h,offset:v}=n,l=new Map,d=Se(t);if(o&&d.reverse(),!d.length)return l;const j=e.startsWith("top")?1:-1,r=d.length,m=r<=i||t.hovers.size>0,p=d[0][0];for(let E=0,y=0,M=1;y<r;y++){const[b,x,u]=d[y],k=(m?b:p).offsetHeight;l.set(u,{delta:E,scale:M,height:k,wrapper:x}),!(y>=r-1)&&(E+=(m?b.offsetHeight+h:v)*j,m||(M=1-v*2*Math.min(y+1,3)/p.offsetWidth))}return l}class Ue{constructor(){a(this,"components");a(this,"panels",new Map);a(this,"hovers",new Set);a(this,"reset",()=>{this.hovers.clear()})}}function He(s,e,t){const{notices:o,placement:n}=s,i=z(()=>new Ue),h=V(),[v,l]=A(()=>new Map),d=()=>{const u=new Set(o.map(C=>C.key)),k=i.hovers.size;i.hovers.forEach(C=>{u.has(C)||i.hovers.delete(C)}),i.hovers.size!==k&&h()},j=u=>{e&&(d(),i.hovers.add(u),h())},r=u=>{e&&(i.hovers.delete(u),h())},m=()=>{const u=new Map;Ie({props:s,refs:i,stackEnable:e,stackConfig:t}).forEach(({delta:k,scale:C,height:I},U)=>{const H=`translate3d(${n==="top"||n==="bottom"?"-50%":"0"}, ${k}px, 0) scaleX(${C})`;u.set(U,{transform:H,height:I})}),l(u)};return{refs:i,transforms:v,handleUpdate:e?m:()=>{l(new Map)},handleEnter:e?d:void 0,handleEntering:e?m:void 0,handleExit:u=>{u.style.setProperty("height",`${u.offsetHeight}px`)},handleExiting:u=>{e&&m(),u.style.setProperty("height","0px")},handleMouseEnter:j,handleMouseLeave:r}}function Oe(s){const{stack:e}=s,t=e&&!Y(e),o=t?!0:!!e,n=g.useMemo(()=>{const i={threshold:3,offset:8,gap:16};return t?P(e,i):i},[t,e]);return{stackEnable:o,stackConfig:n}}function Be(s){const{notices:e,placement:t,top:o,bottom:n,stack:i,onClose:h,onFinished:v}=s,l=F("notification"),{stackEnable:d,stackConfig:j}=Oe(s),{gap:r,threshold:m}=j,{refs:p,transforms:E,handleUpdate:y,handleEnter:M,handleEntering:b,handleExit:x,handleExiting:u,handleMouseEnter:k,handleMouseLeave:C}=He(s,d,j),I=ee(y),U=le([i,p.hovers.size],{compare:xe,listener:I}),[B,H]=ge(!0);if(g.useEffect(()=>()=>{p.reset()},[p]),U||B)return null;const L=d&&(e.length<=m||p.hovers.size>0);return c.jsx("div",{className:N(l,{[`${l}--${t}`]:t,[`${l}--stack`]:d,[`${l}--expanded`]:L}),style:{...t.startsWith("bottom")?{bottom:n}:{top:o},zIndex:H},children:c.jsx(Ee,{ref:f=>{p.components=f==null?void 0:f.components},appear:!0,classNames:`${l}-motion`,onEnter:M,onEntering:b,onExit:x,onExiting:u,onFinished:v,children:e.map(f=>c.jsxs("div",{className:`${l}-notice-wrapper`,onMouseEnter:()=>{k(f.key)},onMouseLeave:()=>{C(f.key)},style:E.get(f.key),children:[g.createElement(Pe,{...f,key:f.key,ref:$=>{$?p.panels.set(f.key,$):p.panels.delete(f.key)},onClose:()=>{var $;($=f.onClose)==null||$.call(f),h(f.key)}}),L&&c.jsx("div",{className:`${l}-pointer-holder`,style:{height:r}})]},f.key))})})}const D=["duration","pauseOnHover","placement","showProgress","closable","closeIcon"];class Le{constructor(){a(this,"uniqueId",ue("nt-"));a(this,"configs",ke.map(e=>({placement:e,visible:!1,notices:[]})))}}class _e{constructor(e,t){a(this,"open",e=>{const t=P(e,{key:O(e.key)?this.states.uniqueId():e.key},_(R.get(),D),_(X,D)),o=this.configs.find(n=>n.placement===t.placement);o&&(o.notices.push(t),o.visible=!0,this.forceUpdate())});a(this,"close",e=>{let t=O(e);this.states.configs=this.states.configs.map(o=>{const{notices:n}=o;if(O(e))return{...o,notices:[]};const i=n.filter(h=>h.key!==e);return i.length===n.length?o:(t=!0,{...o,notices:i})}),t&&this.forceUpdate()});a(this,"finish",e=>{this.states.configs=this.states.configs.map(t=>t.placement!==e?t:{...t,visible:t.notices.length>0},null),this.forceUpdate()});a(this,"inject",()=>{const e=G.reduce((t,o)=>(t[o]=n=>{this.open({...n,type:o})},t),{});return{open:this.open,close:this.close,...e}});this.forceUpdate=e,this.states=t}get configs(){return this.states.configs}}function Z(s){const e=P(s||{},W),{getContainer:t,top:o,bottom:n,stack:i,maxCount:h}=e,v=V(),l=z(()=>new Le),d=g.useMemo(()=>new _e(v,l),[v,l]),j=g.useMemo(()=>d.inject(),[d]);return[j,c.jsx(je,{getContainer:t,children:l.configs.map(r=>r.visible&&c.jsx(Be,{top:o,bottom:n,stack:i,maxCount:h,placement:r.placement,notices:r.notices,onClose:m=>{j.close(m)},onFinished:()=>{d.finish(r.placement)}},r.placement))})]}function Te(s,e){const[t,o]=A(R.get),[n,i]=Z(t);return g.useImperativeHandle(e,()=>({get open(){return n.open},get close(){return n.close},sync:()=>{o(R.get())}}),[n.close,n.open,o]),c.jsx(we,{children:i})}const De=g.forwardRef(Te);class qe{constructor(){a(this,"holder",null);a(this,"flushCleanup",te);a(this,"queue",[]);a(this,"_ensure",()=>this.holder?this.holder:new Promise(e=>{de(document.createDocumentFragment()).render(c.jsx(g.StrictMode,{children:c.jsx(De,{ref:t=>{this.holder||(this.holder=t),this.holder&&e(this.holder)}})}))}));a(this,"flush",()=>{this.flushCleanup(),this.flushCleanup=me(()=>{const e=this._ensure(),t=o=>{o.sync(),this.queue.forEach(n=>{n(o)}),this.queue=[]};be(e)?e.then(t):t(e)})});a(this,"open",e=>{this.queue.push(t=>{t.open(e)}),this.flush()});a(this,"close",e=>{this.queue.push(t=>{t.close(e)}),this.flush()});a(this,"config",e=>{var t;R.set(P(e,R.get())),(t=this.holder)==null||t.sync()});a(this,"inject",()=>{const e=G.reduce((t,o)=>(t[o]=n=>{this.open({...n,type:o})},t),{});return{open:this.open,close:this.close,config:this.config,...e}})}}const Fe=new qe,ze=Object.assign(Fe.inject(),{useNotification:Z});function Ve(s){const e=s;return c.jsx("svg",{...e,children:c.jsx("path",{d:"M712 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m2-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M136 374h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m0-174h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m752 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-230 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 624H358c-87.3 0-158-70.7-158-158V484c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v182c0 127 103 230 230 230h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const Ae=S(Ve,{name:"radius-bottomleft",theme:"outlined"});function Ge(s){const e=s;return c.jsx("svg",{...e,children:c.jsx("path",{d:"M368 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-58-624h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m578 102h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m292 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m174 0h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m230 276h-56c-4.4 0-8 3.6-8 8v182c0 87.3-70.7 158-158 158H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c127 0 230-103 230-230V484c0-4.4-3.6-8-8-8"})})}const We=S(Ge,{name:"radius-bottomright",theme:"outlined"});function Xe(s){const e=s;return c.jsx("svg",{...e,children:c.jsx("path",{d:"M656 200h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8m58 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 650h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m696-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174-696H358c-127 0-230 103-230 230v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-87.3 70.7-158 158-158h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8"})})}const Ze=S(Xe,{name:"radius-upleft",theme:"outlined"});function Je(s){const e=s;return c.jsx("svg",{...e,children:c.jsx("path",{d:"M368 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-2 696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m522-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M192 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m-48-696H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c87.3 0 158 70.7 158 158v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-127-103-230-230-230"})})}const Ke=S(Je,{name:"radius-upright",theme:"outlined"}),q=fe.createContext({name:"Default"});function at(){const[s,e]=g.useState(!0),[t,o]=ze.useNotification({stack:s}),n=h=>{t.info({message:`Notification ${h}`,description:c.jsx(q.Consumer,{children:({name:v})=>`Hello, ${v}!`}),placement:h,duration:1e10})},i=g.useMemo(()=>({name:"Ink UI"}),[]);return c.jsxs(q.Provider,{value:i,children:[o,c.jsx("div",{style:{marginBottom:24},children:c.jsxs(w,{onClick:()=>{e(h=>!h)},children:["stackEnable-",`${s}`]})}),c.jsxs(T,{children:[c.jsxs(w,{variant:"filled",onClick:()=>n("topLeft"),children:[c.jsx(Ze,{}),"topLeft"]}),c.jsx(w,{variant:"filled",onClick:()=>n("top"),children:"top"}),c.jsxs(w,{variant:"filled",onClick:()=>n("topRight"),children:[c.jsx(Ke,{}),"topRight"]})]}),c.jsx(ye,{}),c.jsxs(T,{children:[c.jsxs(w,{variant:"filled",onClick:()=>n("bottomLeft"),children:[c.jsx(Ae,{}),"bottomLeft"]}),c.jsx(w,{variant:"filled",onClick:()=>n("bottom"),children:"bottom"}),c.jsxs(w,{variant:"filled",onClick:()=>n("bottomRight"),children:[c.jsx(We,{}),"bottomRight"]})]})]})}export{at as A};
