import{c as j,q as y,r as f,l as z,C as h,w as C,f as u,a as E,b as k,j as m,o as G,s as P}from"./index-BbnHgTEh.js";import{f as b}from"./flatten-children-t69O8MW5.js";function v(s,a){const{align:t,direction:e,wrap:n,className:o,classNames:r={}}=a,c=e==="horizontal",i=c&&y(t)?"center":t;return{root:j(s,{[`${s}--${e}`]:e&&!c,[`${s}--align-${i}`]:i,[`${s}--wrap`]:n},o,r.root)}}const A={default:16,large:24,small:8};function F(s,a){return f.useMemo(()=>{const t=z(s)?s:[s,s],e=a?2:1;return t.map((n=0)=>(A[n]??n)/e)||0},[s,a])}const d={direction:"horizontal",size:"small",wrap:!1},I=["align","direction","size","split","wrap","children","split",...P];function D(s){const{space:a}=h.useState(),t=C(s,{...d,size:u(a==null?void 0:a.size,d.size)}),{children:e,size:n,split:o}=t,r=E("space"),c=v(r,t),i=k(t),[g,x]=F(n,!!o),N=b(e).map((l,p,S)=>{const $=S.length-p===1,w=u(l==null?void 0:l.key,`${p}`);return m.jsxs(f.Fragment,{children:[m.jsx("div",{className:`${r}-item`,children:l}),!!o&&!$&&m.jsx("span",{className:`${r}-item-split`,children:o})]},w)});return m.jsx("div",{...G(t,I),className:c.root,style:{...i.root,columnGap:g,rowGap:x},children:N})}export{D as S};
