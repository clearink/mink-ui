var _=Object.defineProperty;var C=(t,e,s)=>e in t?_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var f=(t,e,s)=>C(t,typeof e!="symbol"?e+"":e,s);import{g as p}from"./index-CqwDhlqj.js";import{c as b,r as S,a as T,b as j,j as i,g as P,d as v,h as z,f as k,x as N,w as R,S as V,e as D}from"./index-BbnHgTEh.js";import{u as M,a as A}from"./index-C8ntozhB.js";import{r as F}from"./reflow-ChnV4Pvj.js";function I(t,e){const{checked:s,className:o,classNames:r={},disabled:a,showThumb:l}=e;return{label:b(`${t}__label`,r.label),radio:b(`${t}__radio`),root:b(t,{[`${t}--disabled`]:a,[`${t}--selected`]:s&&!l},o,r.root)}}function O(t,e){const{checked:s,disabled:o,label:r,onChange:a,title:l,value:d}=t,m=T("segmented-item"),c=I(m,t),h=j(t);return i.jsxs("label",{ref:e,className:c.root,style:h.root,children:[i.jsx("input",{className:c.radio,checked:s,disabled:o,type:"radio",onChange:()=>{!o&&a(d)}}),i.jsx("div",{className:c.label,style:h.label,title:l,children:r})]})}const W=S.forwardRef(O);function H(t,e){const{block:s,className:o,classNames:r={},disabled:a,size:l}=e;return{group:b(`${t}__group`,r.group),root:b(t,{[`${t}--block`]:s,[`${t}--disabled`]:a,[`${t}--lg`]:l==="large",[`${t}--sm`]:l==="small"},o,r.root),thumb:b(`${t}__thumb`,r.thumb)}}class Q{constructor(){f(this,"$group",{current:null});f(this,"$thumb",{current:null});f(this,"items",new Map);f(this,"inTransition",!1)}get group(){return this.$group.current}get thumb(){return this.$thumb.current}}function Y(t){const e=P(()=>new Q),[s,o]=v([null,t]),[r,a]=v(!1),l=(n,u)=>{const y=p(e.group),$=u.left-y.left;n.style.setProperty("transform",`translate3d(${$}px, 0, 0)`),n.style.setProperty("width",`${u.width}px`)},d=()=>{if(!e.thumb||!e.inTransition)return;const n=e.items.get(t);!n||!e.group||l(e.thumb,p(n))},m=n=>{const u=e.items.get(s[0]);!u||!e.group||(e.inTransition=!0,l(n,p(u)),F(n))},c=n=>{const u=e.items.get(s[1]);!u||!e.group||l(n,p(u))},h=n=>{e.inTransition=!1,n.style.removeProperty("transform"),n.style.removeProperty("width"),a(!1)};return{returnEarly:z(t,()=>{o([s[1],t]),a(!0),d()}),refs:e,showThumb:r,handleEnter:m,handleEntering:c,handleEntered:h}}function q(t,e){var a;const{defaultValue:s,onChange:o,value:r}=t;return M({defaultValue:k(s,(a=e[0])==null?void 0:a.value),onChange:o,value:r})}const B={block:!1};function G(t=[]){return t.map(e=>{if(!N(e))return{label:e,title:`${e}`,value:e};const{label:s,title:o}=e,r=k(o,N(s)?void 0:`${s}`);return{...e,title:r}})}function J(t,e){const s=R(t,{...B,size:V.useState()}),{disabled:o,options:r}=s,a=T("segmented"),l=H(a,s),d=j(s),m=A(()=>G(r),[r]),[c,h]=q(s,m),{returnEarly:E,refs:n,showThumb:u,handleEnter:y,handleEntering:$,handleEntered:x}=Y(c);return E?null:i.jsx("div",{ref:e,className:l.root,style:d.root,children:i.jsxs("div",{ref:n.$group,className:l.group,style:d.group,children:[u&&i.jsx(D,{appear:!0,when:!0,timeouts:3e3,classNames:`${a}-thumb-motion`,onEnter:y,onEntering:$,onEntered:x,children:i.jsx("div",{ref:n.$thumb,className:l.thumb,style:d.thumb})}),m.map(g=>S.createElement(W,{...g,key:g.value,ref:w=>{w?n.items.set(g.value,w):n.items.delete(g.value)},checked:c===g.value,disabled:o||g.disabled,showThumb:u,onChange:h}))]})})}const K=S.forwardRef(J);function te(){return i.jsx(K,{options:["Daily","Weekly","Monthly","Quarterly","Yearly"],onChange:t=>{console.log(t)}})}export{te as A};
