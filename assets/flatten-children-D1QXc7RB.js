import{a as o,h as p,I as f}from"./index-DdocyDJ_.js";import{r as u}from"./index-DCi0LQqD.js";function t(n,e){if(!o(e))n.push(e);else for(let r=0,s=e.length;r<s;r++)n.push(e[r]);return n}function a(n){return u.Children.toArray(n).reduce((e,r)=>p(r)?e:!f.isFragment(r)||!r.props?t(e,r):t(e,a(r.props.children)),[])}export{a as f,t as p};
