import{r as C,j as o}from"./index-DCi0LQqD.js";import{d as m,e as p,i as g,c as b,u as f,o as k,g as j,w as $,D as N,T as _,h as S}from"./index-DdocyDJ_.js";import{n as x}from"./noop-DX6rZLP_.js";function V(e,n){return!Object.is(e,n)}function v(e,n){const s=!g(e);return[s?e:n,s]}function E(e){const{defaultValue:n,onChange:s,shouldUpdate:t=V,value:a}=e,[c,l]=C.useState(n),[r,i]=v(a,c),d=m(u=>{const h=p(u)?u(r):u;t(r,h)&&(i||l(h),s&&s(h))});return[r,d]}function F(e,n){const{className:s}=n;return b(e,{},s)}const w=["children"];function D(e){const{children:n}=e,s=f("checkbox-group"),t=F(s,e),a=k(e,w);return o.jsxs("div",{...a,className:t,children:[o.jsx("input",{type:"checkbox"}),o.jsx("span",{children:n})]})}const G=j({cancelValue:x,registerValue:x});function U(e){const{checked:n,defaultChecked:s,onChange:t}=e;return E({defaultValue:s,onChange:t,value:n})}function y(e,n,s){const{className:t,indeterminate:a}=n,{checked:c,disabled:l}=s;return b(e,{[`${e}--checked`]:c,[`${e}--disabled`]:l,[`${e}--indeterminate`]:a},t)}const A=["autoFocus","children","disabled","checked","defaultChecked","indeterminate","onChange"];function O(e){const n=G.useState(),s=$({...e,disabled:e.disabled||n.disabled},{disabled:N.useState()}),{children:t,disabled:a}=s,c=f("checkbox"),[l,r]=U(s),i=y(c,s,{checked:l,disabled:a}),d=k(s,A);return o.jsx(_,{component:"Checkbox",disabled:l,selector:`.${c}__input`,children:o.jsxs("label",{...d,className:i,children:[o.jsx("input",{className:`${c}__original`,checked:!!l,type:"checkbox",onChange:u=>{!a&&r(u.target.checked)}}),o.jsx("span",{className:`${c}__input`}),!S(t)&&o.jsx("span",{className:`${c}__label`,children:t})]})})}const P=Object.assign(O,{Group:D});function I(){const e=n=>{console.log(`checked = ${n}`)};return o.jsx(P,{onChange:e,children:"Checkbox"})}export{I as A};
