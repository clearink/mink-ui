var Ye=Object.defineProperty;var et=(n,e,t)=>e in n?Ye(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var l=(n,e,t)=>et(n,typeof e!="symbol"?e+"":e,t);import{n as T,i as Pe,e as tt,B as st}from"./index-ekRem82_.js";import{t as U,R as be,m as K,i as w,v as L,l as W,x as se,k as he,n as P,p as $,r as h,y as Me,g as Z,w as A,j as p,h as Ne,o as pe,d as Se,q as Le,z as rt,A as nt,f as it,a as J,c as Q,D as we,S as Ie,B as at,E as lt,F as Ue,G as re,I as ot}from"./index-CR1k0Zhi.js";import{i as ut,t as V,a as qe,p as te,r as oe,b as me}from"./index-DrFKhB_b.js";import{u as ze,a as Ve,b as ct}from"./index-CuZpwL93.js";import{f as dt}from"./flatten-children-BrarxHwr.js";import{G as ht}from"./index-9b_gXZB1.js";import{p as Ce}from"./pick-BK4giCUn.js";import{i as pt}from"./is-null-D6OXYL3N.js";function mt(n){return U(n)==="Date"}const ft=ut?be.useLayoutEffect:be.useEffect,ce=K({register:()=>T,triggerFormChange:T,triggerFormFinish:T}),F=()=>{},D=K({getFieldError:F,getFieldValue:F,getFieldsError:F,getFieldsValue:F,getInternalHooks:()=>({dispatch:F,ensureInitialized:F,getControl:F,metaUpdate:F,registerField:F,registerSubscribe:F,registerWatch:F,setFields:F,setInitialValues:F,setInternalFormMisc:F,setPreserve:F,subscribe:F}),isFieldTouched:F,isFieldValidating:F,isFieldsTouched:F,isFieldsValidating:F,resetFields:F,setFieldValue:F,setFieldsValue:F,submitForm:F,validateField:F,validateFields:F});function ne(n){return V(n).reduce((e,t)=>`${e}_${U(t)}:${t}`,"")}function gt(n,...e){const t=n.length;return e.every(s=>s<t&&s>=0)}function Oe(n,e,t){if(!e.length)return t;const[s,...r]=e;let i={};return L(n)?i={...n}:W(n)?i=n.concat():he(s)&&(i=[]),i[s]=Oe(i[s],r,t),i}function xe(n,e,t){return L(n)?Oe(n,e,t):n}function q(n,e){const t=e.length;for(let s=0;s<t;s++){if(w(n))return n;n=n[e[s]]}return t?n:void 0}function Te(n,e){if(!e.length)return n;const[t,...s]=e;return se(n,t)&&(s.length?Te(n[t],s):delete n[t]),n}function Ft(n,e){return L(n)?Te(n,e):n}function De(n,e,t=new WeakMap){if(U(n)!==U(e)||!L(n))return e;if(t.has(n))return t.get(n);if(W(n))return e;if(!L(n))return n;const s={...n};return t.set(n,s),Object.entries(e).reduce((r,[i,a])=>(r[i]=De(r[i],a,t),r),s)}function _t(n,...e){const t=W(n)?n.concat():{...n};return e.reduce((s,r)=>De(s,r),t)}function We(n,e){if(!L(n)||!e.length)return n;const[t,...s]=e,r=W(n)?[]:{};return r[t]=We(n[t],s),r}function vt(n,e){const t=e.length;for(let s=0;s<t;s++){const r=e[s];if(!se(n,r))return!1;n=n[r]}return!!t}class yt{constructor(e,t,s){l(this,"_dirty",!1);l(this,"_errors",[]);l(this,"_getInitial");l(this,"_key","");l(this,"_name",[]);l(this,"_props",{});l(this,"_shouldHook");l(this,"_touched",!1);l(this,"_validating",!1);l(this,"_warnings",[]);l(this,"lastValidate",null);l(this,"forceUpdate");l(this,"metaUpdate",e=>{const t=this.meta;!w(e.dirty)&&(this._dirty=e.dirty),!w(e.touched)&&(this._touched=e.touched),!w(e.errors)&&(this._errors=e.errors),!w(e.warnings)&&(this._warnings=e.warnings),!w(e.validating)&&(this._validating=e.validating),this.lastValidate=this._validating?Promise.resolve([]):null;const s=this.meta,r=this.mounted();if(qe(t,s)&&r)return;const{children:i,onMetaChange:a}=this._props;a==null||a({...s,mounted:r}),P(i)&&this.forceUpdate()});l(this,"reset",()=>{this.metaUpdate({dirty:!1,errors:[],touched:!1,validating:!1,warnings:[]}),this.lastValidate=null,this.mounted()&&this._reset()});l(this,"setGetInitial",e=>{this._getInitial=e});l(this,"setInternalFieldProps",e=>{this._props=e,this._shouldHook=e.shouldUpdate,this._name!==e.name&&(this._key=ne(e.name),this._name=e.name||[])});l(this,"shouldUpdate",(e,t,s)=>{const{_key:r,_name:i,_shouldHook:a}=this;return $(a)&&r?q(e,i)!==q(t,i):P(a)?a(e,t,s):!!a});l(this,"validate",async(e,t)=>{const{rule:s}=this._props;if(!this._touched||!s||!this._key)return;const r=s.validate(e,t);return this.lastValidate=r,r.then(()=>{}).catch(i=>i).then((i={})=>{if(this.lastValidate!==r)return;const{issues:a=[]}=i,o=a.map(u=>u.message);this.metaUpdate({errors:o,validating:!1})})});this._reset=t,this.mounted=s,this.forceUpdate=()=>s()&&e()}get dirty(){var e;return this._dirty||!$(this._props.initialValue)?!0:!$((e=this._getInitial)==null?void 0:e.call(this))}get meta(){return{dirty:this.dirty,errors:this._errors,name:this._name,touched:this._touched,validating:this._validating,warnings:[]}}}class $t{constructor(e){l(this,"_errors",[]);l(this,"_name");l(this,"_props",{});l(this,"_warnings",[]);this._name=V(e)}}const X=Symbol.for("_$ink$_");class bt{constructor(e){l(this,"_getInternalHooks",e=>{if(!(e===X))return;const{$controls:s,$dispatch:r,$initial:i,$props:a}=this,{$dependencies:o,$watch:u}=r;return{dispatch:r.dispatch,ensureInitialized:i.ensureInitialized,metaUpdate:s.metaUpdate,registerField:r.registerField,registerWatch:u.registerWatch,setFields:r.setFields,setInitialValues:i.setInitialValues,setInternalFormMisc:a.setInternalFormMisc,subscribe:o.subscribe}});l(this,"$controls");l(this,"$dispatch");l(this,"$initial");l(this,"$props");l(this,"$state");l(this,"injectForm",()=>{const{$controls:e,$dispatch:t,$state:s}=this;return{getFieldError:e.getFieldError,getFieldValue:s.getFieldValue,getFieldsError:e.getFieldsError,getFieldsValue:s.getFieldsValue,getInternalHooks:this._getInternalHooks,isFieldTouched:e.isFieldTouched,isFieldValidating:e.isFieldValidating,isFieldsTouched:e.isFieldsTouched,isFieldsValidating:e.isFieldsValidating,resetFields:t.resetFields,setFieldValue:t.setFieldValue,setFieldsValue:t.setFieldsValue,submitForm:t.submitForm,validateField:t.validateField,validateFields:t.validateFields}});this.forceUpdate=e,this.$props=new wt(e),this.$controls=new xt(this.$props),this.$state=new Et(this.$controls),this.$initial=new Ct(this.$state),this.$dispatch=new kt(this.$props,this.$controls,this.$state,this.$initial)}}class wt{constructor(e){l(this,"_parent");l(this,"_props",{});l(this,"setInternalFormMisc",(e,t)=>{this._parent=t,this._props=e});this.forceUpdate=e}get useRenderProps(){return P(this._props.children)}}class It{constructor(){l(this,"_dependencies",new Map);l(this,"findDependencies",(e,t)=>{if(!e.length)return;const s=[],r=this._dependencies;e.forEach(i=>{var a;(a=r.get(i._key))==null||a.forEach(o=>{!o.dirty&&!o._touched||t.has(o)||(s.push(o),t.add(o))})}),this.findDependencies(s,t)});l(this,"subscribe",e=>{const{dependencies:t=[]}=e._props,s=e._key,r=this._dependencies,i=t.map(a=>{const o=ne(a);if(!o||s===o)return T;const u=r.get(o)||new Set;return r.set(o,u.add(e)),()=>{u.delete(e),u.size===0&&r.delete(o)}});return()=>i.forEach(a=>a())})}}class Vt{constructor(){l(this,"_watchList",new Set);l(this,"publishWatch",()=>{this._watchList.forEach(tt)});l(this,"registerWatch",e=>(this._watchList.add(e),()=>{this._watchList.delete(e)}))}}class Ct{constructor(e){l(this,"_initial",{});l(this,"deleteFieldValue",e=>this.$state.deleteFieldValue(e));l(this,"getFieldValue",e=>this.$state.getFieldValue(e));l(this,"setFieldValue",(e,t)=>this.$state.setFieldValue(e,t));l(this,"ensureInitialized",e=>{const t=e._name,s=e._props.initialValue,r=this.$state.state;if(!e._key)return[r,r];if(!$(this.getFieldValue(t)))return[r,r];const a=this.getInitialValue(t)??s;return $(a)?[r,r]:this.setFieldValue(t,a)});l(this,"getInitialValue",e=>q(this._initial,V(e)));l(this,"initialFieldsValue",e=>{if($(e))return this.deleteFieldValue();const t=this.$state.state;return e.forEach(this.deleteFieldValue),[t,this.$state.state]});l(this,"setInitialValues",e=>{this._initial=e||{}});this.$state=e}}class xt{constructor(e){l(this,"_controls",{list:[],map:new Map});l(this,"pushControl",(e,t)=>{const s=e._key;e.setGetInitial(()=>t.getInitialValue(e._name));const{list:r,map:i}=this._controls;if(te(r,e),!s)return()=>oe(r,e);const a=i.get(s)??[];return i.set(s,te(a,e)),()=>{oe(r,e),oe(a,e),!a.length&&i.delete(s)}});l(this,"getControls",(e=!1)=>{const t=this._controls.list;return e?t.filter(s=>s._key):t});l(this,"getControlsByName",(e,t)=>{if($(t))return this.getControls(!0);const s=this._controls.map;return t.reduce((r,i)=>{const a=ne(i),o=s.get(a);return!o&&!e&&r.push(new $t(i)),o?te(r,o):r},[])});l(this,"getFieldError",e=>this.getFieldsError([e])[0].errors);l(this,"getFieldsError",e=>this.getControlsByName(!1,e).map(s=>{const{_errors:r,_name:i,_warnings:a}=s;return{errors:r,name:i,warnings:a}}));l(this,"getValidateControls",e=>this.getControlsByName(!0,e).filter(t=>!!t._props.rule));l(this,"isFieldTouched",e=>this.isFieldsTouched([e]));l(this,"isFieldValidating",e=>this.isFieldsValidating([e]));l(this,"isFieldsTouched",e=>this.getControlsByName(!0,e).some(s=>!s._touched));l(this,"isFieldsValidating",e=>this.getControlsByName(!0,e).some(s=>!s._validating));l(this,"metaUpdate",(e,t)=>{this.getControlsByName(!0,[e]).forEach(s=>{s.metaUpdate(t)})});l(this,"registerField",(e,t)=>{const{$initial:s,$state:r,dispatch:i}=t,a=this.pushControl(e,s);return i({control:e,type:"registerField"}),()=>{const{_key:o,_name:u,_props:c}=e;a(),!((c.preserve??this.$props._props.preserve??!0)||c.isListField)&&r.getFieldValue(u)!==s.getInitialValue(u)&&(this._controls.map.has(o)||i({control:e,type:"removeField"}))}});this.$props=e}}class Et{constructor(e){l(this,"_state",{});l(this,"cleanupField",e=>(e.metaUpdate({}),this.deleteFieldValue(e._name)));l(this,"deleteFieldValue",e=>{const t=this._state;return $(e)?this._state={}:this._state=Ft(this._state,V(e)),[t,this._state]});l(this,"getFieldValue",e=>q(this._state,V(e)));l(this,"getFields",e=>this.$controls.getControlsByName(!0,e).map(t=>{const s=t._name,r=this.getFieldValue(s);return{...t.meta,name:s,value:r}}));l(this,"getFieldsValue",e=>{if(e===!0)return this._state;const t=$(e),s=Pe(e)?[]:e,r=this.$controls.getControlsByName(!1,s),i=this._state;return r.reduceRight((a,o)=>{const{_name:u,_props:c}=o;return t&&c.isListField||vt(a,u)?a:xe(a,u,q(i,u))},{})});l(this,"setFieldValue",(e,t)=>{const s=this._state,r=V(e);return r.length?(this._state=xe(this._state,r,t),[s,this._state]):[s,s]});l(this,"setFieldsData",e=>{const t=this._state;return e.forEach(s=>{se(s,"value")&&this.setFieldValue(s.name,s.value)}),[t,this._state]});l(this,"setFieldsValue",e=>{const t=this._state;return this._state=_t(this._state,e),[t,this._state]});this.$controls=e}get state(){return this._state}}class kt{constructor(e,t,s,r){l(this,"lastValidate",null);l(this,"$dependencies",new It);l(this,"$watch",new Vt);l(this,"dispatch",e=>{const{$controls:t,$initial:s,$state:r}=this;if(e.type==="fieldEvent"){const{control:i,type:a,value:o}=e,u=i._name,[c,d]=r.setFieldValue(u,o),m=this.updateControl(f=>f.shouldUpdate(c,d,a));return this.triggerOnValuesChange(d,u),this.triggerOnFieldsChange([i].concat(m))}if(e.type==="setFieldsValue"){const{state:i,type:a}=e,[o,u]=r.setFieldsValue(i);return this.updateControl(c=>c.shouldUpdate(o,u,a))}if(e.type==="setFields"){const{fields:i,type:a}=e;i.forEach(c=>t.metaUpdate(c.name,c));const[o,u]=r.setFieldsData(i);return this.updateControl(c=>c.shouldUpdate(o,u,a))}if(e.type==="removeField"){const{control:i,type:a}=e,[o,u]=r.cleanupField(i);return this.updateControl(c=>c.shouldUpdate(o,u,a))}if(e.type==="registerField"){const{control:i,type:a}=e,{initialValue:o}=i._props;if($(o)||r.getFieldValue(i._name)!==o)return;const[u,c]=s.ensureInitialized(i);return this.updateControl(d=>d===i?!1:d._key===i._key?!0:d._shouldHook?d.shouldUpdate(u,c,a):!1)}if(e.type==="resetFields"){const{nameList:i,type:a}=e,o=s.initialFieldsValue(i)[0],u=t.getControlsByName(!0,i);u.forEach(s.ensureInitialized),u.forEach(d=>d.reset());const c=r.state;return this.updateControl(d=>d.shouldUpdate(o,c,a))}});l(this,"publishDependentControl",e=>{const t=new Set;this.$dependencies.findDependencies(e,t);const s=Array.from(t),r=s.map(({_name:i})=>i);return r.length>0&&this.validateFields(r),s});l(this,"registerField",e=>(e._shouldHook===!0&&e.forceUpdate(),this.$controls.registerField(e,this)));l(this,"resetFields",e=>{this.dispatch({nameList:e,type:"resetFields"})});l(this,"setFieldValue",(e,t)=>{this.dispatch({fields:[{name:e,value:t}],type:"setFields"})});l(this,"setFields",e=>{this.dispatch({fields:e,type:"setFields"})});l(this,"setFieldsValue",e=>{this.dispatch({state:e,type:"setFieldsValue"})});l(this,"submitForm",()=>{this.validateFields().then(this.triggerOnFinish,this.triggerOnFailed)});l(this,"triggerOnFailed",e=>{var t,s;(s=(t=this.$props._props).onFailed)==null||s.call(t,e)});l(this,"triggerOnFieldsChange",e=>{const{name:t,onFieldsChange:s}=this.$props._props,r=this.$props._parent;if(!s&&!r)return;const{getFields:i}=this.$state,a=e.map(u=>u._name),o=i(a);!$(t)&&(r==null||r.triggerFormChange(t,o)),s==null||s(o,()=>i())});l(this,"triggerOnFinish",e=>{const{onFinish:t}=this.$props._props;if(!(!t||e==="invalid-validate"))try{t(e)}catch(s){console.error(s)}});l(this,"triggerOnValuesChange",(e,t)=>{const{onValuesChange:s}=this.$props._props;if(!s)return;const r=We(e,t);s(r,()=>this.$state.getFieldsValue())});l(this,"updateControl",e=>{const t=this.$controls.getControls().filter(e);return this.$props.useRenderProps?this.$props.forceUpdate():t.forEach(s=>s.forceUpdate()),this.$watch.publishWatch(),this.publishDependentControl(t)});l(this,"validateField",e=>this.validateFields([e]));l(this,"validateFields",e=>{const{getFieldValue:t,getFieldsValue:s}=this.$state,{getFieldsError:r,getValidateControls:i}=this.$controls,a=i(e),o=a.map(d=>{const m=d._name;return d.metaUpdate({errors:[],touched:!0,validating:!0,warnings:[]}),d.validate(t(m),{path:m})});this.triggerOnFieldsChange(a);const u=Promise.all(o);this.lastValidate=u;const c=u.then(()=>{if(u!==this.lastValidate)return"invalid-validate";const d=r(e).filter(({errors:f})=>f.length);this.triggerOnFieldsChange(a);const m=s(e);return d.length?Promise.reject({errorFields:d,values:m}):m});return c.catch(d=>d),c});this.$props=e,this.$controls=t,this.$state=s,this.$initial=r}}function jt(){const n=ze(),[e,t]=h.useReducer(i=>i+1,0),s=Me();return[Z(()=>new yt(s,t,n)),e]}function Pt(n,e,t){return function s(r){if(P(r)){const a=r(n(),t.meta,e);return{...s(a),functional:!0}}const i=dt(r);return i.length===1&&h.isValidElement(i[0])?{children:i[0],valid:!0}:{children:i,valid:!1}}}function Mt(n){return e=>!e||!L(e.target)||!se(e.target,n)?e:e.target[n]}function Nt(n){return e=>({[n]:e})}function St(n,e,t,s){const{formatter:r,getValueFromEvent:i,getValueProps:a,name:o,rule:u,trigger:c,validateTrigger:d}=A(n,{getValueFromEvent:Mt(n.valuePropName),getValueProps:Nt(n.valuePropName)});return(m={})=>{if(!t._key)return m;const f=e.getFieldValue(o),_={...m,...a(f),[c]:(...I)=>{var b;let v=i(...I);P(r)&&(v=r(v,f,()=>e.getFieldsValue())),s==null||s.metaUpdate(o,{dirty:!0,touched:!0}),s==null||s.dispatch({control:t,type:"fieldEvent",value:v}),c&&((b=m[c])==null||b.call(m,...I))}};return V(d??e.validateTrigger).reduce((I,v)=>(v===!1||(I[v]=(...b)=>{var j;(j=_[v])==null||j.call(_,...b),u&&e.validateField(o)}),I),{..._})}}function Lt(n,e,t,s){const r=St(n,e,t,s),i=Pt(r,e,t),{children:a,functional:o,valid:u}=i(n.children);if(o||!u)return a;const c=r(a.props);return h.cloneElement(a,c)}const Ut={trigger:"onChange",valuePropName:"value"};function qt(n){const e=A(n,Ut),{rule:t,dependencies:s}=e,r=D.useState(),i=h.useMemo(()=>r.getInternalHooks(X),[r]),[a,o]=jt();h.useMemo(()=>{a.setInternalFieldProps(e)},[a,e]),Z(()=>{i.ensureInitialized(a)}),h.useEffect(()=>i.registerField(a),[a,i]);const u=me(()=>s,[s]);h.useEffect(()=>i.subscribe(a),[a,i,u]);const c=Ne(t,(m,f)=>{!m&&f&&a.metaUpdate({errors:[],warnings:[]})}),d=Lt(e,r,a,i);return c?null:p.jsx(h.Fragment,{children:d},o)}function Ae(n){const{isListField:e,name:t}=n,{listPath:s=[]}=D.useState(),r=$(t)?[]:s.concat(V(t)),i=e?"keep":ne(r);return p.jsx(qt,{...n,name:r},i)}function Be(n){const e=ze(),t=Me();return Z(()=>{const s=()=>e()&&t();return n||new bt(s).injectForm()})}const zt={preserve:!0,tag:"form",validateTrigger:"onChange"},Ot=["name","tag","form","children","onReset","initialValues","validateTrigger","preserve","validationSchema","fields","onFinish","onFieldsChange","onValuesChange","onFailed"];function Tt(n,e){const t=A(n,zt),{children:s,fields:r,form:i,initialValues:a,name:o,onReset:u,tag:c,validateTrigger:d}=t,m=Be(i),f=ce.useState();h.useImperativeHandle(e,()=>m,[m]);const _=h.useMemo(()=>m.getInternalHooks(X),[m]);h.useMemo(()=>{_.setInternalFormMisc(t,f)},[_,f,t]),Z(()=>{_.setInitialValues(a)}),h.useEffect(()=>f.register(m,o),[m,o,f]);const C=h.useRef(r);ft(()=>{r&&!qe(C.current,r)&&_.setFields(r),C.current=r},[r,_]);const I=y=>{y==null||y.preventDefault(),y==null||y.stopPropagation(),m.submitForm()},v=y=>{y==null||y.preventDefault(),y==null||y.stopPropagation(),m.resetFields(),u==null||u(y)},b=h.useMemo(()=>({...m,formName:o,validateTrigger:d}),[m,d,o]),j=p.jsx(D.Provider,{value:b,children:P(s)?s(m.getFieldsValue(!0),m):s});if(w(c))return j;const R={...pe(t,Ot),onReset:v,onSubmit:I};return h.createElement(c,R,j)}const Dt=h.forwardRef(Tt);function Re(n,e){const[t,s]=Se(void 0),r=D.useState(),i=e??r,a=h.useMemo(()=>i==null?void 0:i.getInternalHooks(X),[i]),o=me(()=>V(n),[n]),u=Le(()=>a==null?void 0:a.registerWatch(()=>{const c=i==null?void 0:i.getFieldValue(o);rt(c,t)||s(c)}));return h.useEffect(u,[u,o]),t}class Wt{constructor(){l(this,"_context",null);l(this,"_id",0);l(this,"_keys",[]);l(this,"_listPath",[]);l(this,"_rule");l(this,"append",e=>{this._keys=this._keys.concat(this._id),this.dispatchEvent(this.getFieldList().concat(e)),this._id+=1});l(this,"dispatchEvent",e=>{var s,r;const t=(s=this._context)==null?void 0:s.getInternalHooks(X);t==null||t.dispatch({fields:[{name:this._listPath,value:e}],type:"setFields"}),this._rule&&((r=this._context)==null||r.validateFields([this._listPath]))});l(this,"getFieldList",()=>{var t;const e=(t=this._context)==null?void 0:t.getFieldValue(this._listPath);return V(e)});l(this,"insert",(e,t)=>{const s=this.getFieldList().concat();s.splice(e,0,t),this._keys.splice(e,0,this._id),this.dispatchEvent(s),this._id+=1});l(this,"move",(e,t)=>{const s=this.getFieldList().concat();gt(s,e,t)&&(s.splice(t,0,s.splice(e,1)[0]),this._keys.splice(t,0,this._keys.splice(e,1)[0]),this.dispatchEvent(s))});l(this,"prepend",e=>{this._keys=[this._id,...this._keys],this.dispatchEvent([e].concat(this.getFieldList())),this._id+=1});l(this,"remove",e=>{const t=new Set(V(e)),s=(i,a)=>t.size===0?!1:!t.has(a),r=this.getFieldList();this._keys=this._keys.filter(s),this.dispatchEvent(r.filter(s))});l(this,"replace",(e,t)=>{const s=this.getFieldList();s[e]=t,this.dispatchEvent(s)});l(this,"swap",(e,t)=>{const s=this.getFieldList();[s[e],s[t]]=[s[t],s[e]];const r=this._keys;[this._keys[e],this._keys[t]]=[r[t],r[e]],this.dispatchEvent(s)});l(this,"ensureFieldKey",e=>{const t=this._keys[e];return $(t)&&(this._keys[e]=this._id,this._id+=1),this._keys[e]});l(this,"getFeatures",()=>({append:this.append,insert:this.insert,move:this.move,prepend:this.prepend,remove:this.remove,replace:this.replace,swap:this.swap}));l(this,"setInternalFormListMisc",(e,t,s)=>{this._context=e,this._listPath=t,this._rule=s})}}function He(n){const{children:e,initialValue:t,name:s,preserve:r,rule:i}=n,a=D.useState(),o=me(()=>V(a.listPath).concat(V(s)),[a.listPath,s]),u=h.useMemo(()=>({...a,listPath:o}),[a,o]),c=Z(()=>new Wt);c.setInternalFormListMisc(a,o,i);const d=h.useMemo(()=>c.getFeatures(),[c]);return P(e)?p.jsx(D.Provider,{value:u,children:p.jsx(Ae,{initialValue:t,name:[],preserve:r,rule:i,shouldUpdate:(f,_,C)=>{const I=V(s),v=q(f,I),b=q(_,I);return C!=="setFields"&&C!=="fieldEvent"?v!==b:U(v)!==U(b)?!0:W(b)&&v.length!==b.length},children:({value:f},_)=>{const C=V(f,!0).map((I,v)=>({isListField:!0,key:c.ensureFieldKey(v),name:v}));return e(C,d,_)}})}):null}function At(n){const e=h.useRef({}),t=ce.useState(),s=h.useMemo(()=>({register:nt(t.register,(r,i)=>i?(e.current[i]=r,()=>{delete e.current[i]}):T),triggerFormChange:t.triggerFormChange,triggerFormFinish:t.triggerFormFinish}),[t]);return p.jsx(ce.Provider,{value:s,children:n.children})}const ie=Object.assign(Dt,{Field:Ae,List:He,Provider:At,useForm:Be,useWatch:Re});function ue(n,e,t){return e.map((s,r)=>({key:h.isValidElement(s)?`${s.key}-${s.type}-${n}-${r}`:`${s}-${U(s)}`,status:it(t,n),value:s}))}function Bt(n){const{help:e,helpStatus:t,errors:s,warnings:r}=n,i=Ve(40,s||[]),a=Ve(40,r||[]);return h.useMemo(()=>w(e)?te(ue("error",i),ue("warning",a)):ue("help",[e],t),[i,e,t,a])}const Rt={onEnter:n=>{n.style.setProperty("height","0px")},onEntering:n=>{n.style.setProperty("height",`${n.scrollHeight}px`)},onEntered:n=>{n.style.removeProperty("height")},onEnterCancel:n=>{n.style.setProperty("height",`${n.offsetHeight}px`)},onExit:n=>{n.style.setProperty("height",`${n.offsetHeight}px`)},onExiting:n=>{n.style.setProperty("height","0px")},onExited:n=>{n.style.removeProperty("height")},onExitCancel:n=>{n.style.setProperty("height",`${n.offsetHeight}px`)}};function Ge(n){const{className:e,onFinished:t}=n,s=J("form-item-message"),r=Bt(n);return p.jsx("div",{className:Q(s,e),children:p.jsx(ht,{appear:!0,classNames:`${s}-motion`,...Rt,onFinished:t,children:r.map(i=>p.jsx("div",{className:`${s}--${i.status}`,children:i.value},i.key))})})}const B=K({labelAlign:"right",layout:"horizontal"}),Ke=K({}),Ze=K(T);function Je(n){const e=ie.useForm();return h.useMemo(()=>n??{...e,scrollToField:t=>{console.log(t)}},[e,n])}function Ht(n,e){const{className:t,layout:s,requiredMark:r,size:i}=e;return Q(n,{[`${n}--${s}`]:s,[`${n}--${i}`]:i,[`${n}--hide-required-mark`]:!r},t)}const Gt={colon:!0,layout:"horizontal",requiredMark:!0},Kt=["form","colon","layout","labelAlign","labelWrap","labelCol","wrapperCol","size","disabled","scrollToFirstError","requiredMark"];function Zt(n,e){const t=A(n,{...Gt,disabled:we.useState(),size:Ie.useState()}),{colon:s,disabled:r,form:i,labelAlign:a,labelCol:o,labelWrap:u,layout:c,name:d,onFailed:m,requiredMark:f,size:_,wrapperCol:C}=t,I=J("form"),v=Ht(I,t),b=Je(i);h.useImperativeHandle(e,()=>b,[b]);const j=h.useMemo(()=>({colon:s,form:b,formName:d,labelAlign:a,labelCol:o,labelWrap:u,layout:c,requiredMark:f,wrapperCol:C}),[s,f,b,a,o,u,c,d,C]),R=le=>{m==null||m(le)},y=pe(t,Kt);return p.jsx(we.Provider,{value:r,children:p.jsx(Ie.Provider,{value:_,children:p.jsx(B.Provider,{value:j,children:p.jsx(ie,{...y,className:v,form:b,name:d,onFailed:R})})})})}const Jt=h.forwardRef(Zt);function Qt(){return B.useState().form}function Xt(n,e,t={}){return Q(n,e&&`${n}--has-${e}`,t.className)}function Yt(n,e){return h.useMemo(()=>{const t="";return w(e)?n.validating?"validating":n.errors.length?"error":n.warnings.length?"warning":n.touched?"success":t:e},[n,e])}function es(n,e){const{getOuter:t}=n,[s,r]=Se(0),i=()=>{!e&&r(0)},a=Le(()=>{const u=t();if(!e||!u)return;const c=at(u);r(Number.parseFloat(c.marginBottom))}),o=Ne(e,a);return h.useEffect(()=>lt(a),[a]),{returnEarly:o,offset:s,cleanOffset:i}}function ts(){return{dirty:!1,errors:[],mounted:!1,name:[],touched:!1,validating:!1,warnings:[]}}function Ee(){const[n,e]=ct(80,ts),t=h.useCallback(s=>{s.mounted&&e(s)},[e]);return[n,t]}function ss(n){const e=B.useState(),t=A(n,{wrapperCol:e.wrapperCol}),{children:s,extra:r,help:i,validateStatus:a,wrapperCol:o}=t,[u,c]=Ee(),[d,m]=Ee(),f=Yt(u,a),_=J("form-item__control"),C=Xt(_,f,o),I=h.useMemo(()=>({validateStatus:f}),[f]),v=h.useMemo(()=>u.errors.concat(d.errors),[u.errors,d.errors]),b=h.useMemo(()=>u.warnings.concat(d.warnings),[u.warnings,d.warnings]),j=!w(i)||!!(v.length||b.length),{returnEarly:R,offset:y,cleanOffset:le}=es(t,j);return R?null:p.jsx(Ue,{...o,className:C,children:p.jsxs(Ke.Provider,{value:I,children:[p.jsx("div",{className:`${_}-input`,children:s(c,m)}),!!(j||y)&&p.jsx("div",{className:`${_}-status`,style:{minHeight:y},children:p.jsx(Ge,{errors:v,help:i,helpStatus:f,warnings:b,onFinished:le})}),!w(r)&&p.jsx("div",{className:`${_}-extra`,children:r}),!!y&&p.jsx("div",{className:`${_}-offset`,style:{marginBottom:-y}})]})})}function rs(n,e,t){const{colon:s,labelAlign:r,labelCol:i={},labelWrap:a,required:o,requiredMark:u}=e;return Q(n,{[`${n}--${r}`]:r,[`${n}--colon`]:s,[`${n}--has-colon`]:s&&t.layout!=="vertical",[`${n}--required`]:o,[`${n}--required-optional`]:u==="optional",[`${n}--wrap`]:a},i.className)}function ns(n,e){const{colon:t,label:s,required:r,requiredMark:i,tooltip:a}=n,o=e.layout!=="vertical"&&t;let u=s;return o&&re(u)&&(u=u.replace(/[:|：]\s*$/,"")),u}function is(n){const e=B.useState(),t=A(n,{colon:e.colon,labelAlign:e.labelAlign,labelCol:e.labelCol,labelWrap:e.labelWrap,requiredMark:e.requiredMark}),{htmlFor:s,label:r}=t,i=J("form-item__label"),a=rs(i,t,e),o=re(r)?r:void 0;return p.jsx(Ue,{...t.labelCol,className:a,children:p.jsx("label",{htmlFor:s,title:o,children:ns(t,e)})})}function as(n,e){const{className:t,hidden:s}=e;return Q(n,s&&`${n}--hidden`,t)}function Qe(n,e){return h.useMemo(()=>{if(w(n))return;const t=V(n).join("_");return w(e)?t:`${e}_${t}`},[e,n])}function ls(n){const{children:e,dependencies:t=[],name:s,shouldUpdate:r}=n,i=V(s).length,a=P(e);return i&&a||r&&t.length||a&&!(r||t.length)||t.length&&!(a||i)?!0:(i&&!a&&!h.isValidElement(e),!1)}function Xe(n,e,t){const{children:s}=n;if(ls(n))return()=>null;if(P(s))return()=>s(e);if(!h.isValidElement(s))return()=>s;const r=s.props.id;return w(t)||!w(r)?s:h.cloneElement(s,{id:t})}const os=["colon","htmlFor","label","labelAlign","labelCol","labelWrap","requiredMark","tooltip"],us=["wrapperCol","extra","help","validateStatus"];function cs(n){const{form:e,formName:t}=B.useState(),s=Ze.useState(),r=Qe(n.name,t);return p.jsx(ie.Field,{...n,onMetaChange:s,children:Xe(n,e,r)})}function ds(n){const{label:e,name:t,required:s,style:r}=n,{form:i,formName:a}=B.useState(),o=J("form-item"),u=Qe(t,a),c=as(o,n),d=h.useRef(null),m=h.useCallback(()=>d.current,[]),f=Ce(n,os),_=Ce(n,us);return p.jsxs(ot,{ref:d,className:c,style:r,children:[!w(e)&&p.jsx(is,{htmlFor:u,required:s,...f}),p.jsx(ss,{..._,getOuter:m,children:(C,I)=>p.jsx(Ze.Provider,{value:I,children:p.jsx(ie.Field,{...n,onMetaChange:C,children:Xe(n,i,u)})})})]})}function hs(n){return h.createElement(n.noStyle?cs:ds,n)}function ps(){const{validateStatus:n}=Ke.useState();return n}const O=Object.assign(Jt,{ErrorList:Ge,Item:Object.assign(hs,{useStatus:ps}),List:He,useForm:Je,useFormInstance:Qt,useWatch:Re});function ms(n){return p.jsx("input",{...n,value:n.value||"",style:{height:32}})}function As(){return p.jsx(O,{children:p.jsx(O.Item,{label:"username",name:"username",children:p.jsx(ms,{placeholder:"username"})})})}const x=n=>({status:"valid",value:n});function S(n){return(e,t)=>n.abortEarly&&!n.issue.isEmpty?Promise.reject(n.issue):(n.issue.addIssue(e,n.path,t),{status:"invalid"})}function g(n,e,t){return async(s,r)=>await n(s)?x(s):S(r)(e,{value:s,...t})}function fs(n=[]){return n.reduce((e,t)=>he(t)?`${e}[${t}]`:t.includes(".")?`${e}['${t}']`:e.length?`${e}.${t}`:`${t}`,"")}class z extends TypeError{constructor(){super(...arguments);l(this,"issues",[])}static ensure(t,s){const r=(t==null?void 0:t.path)||[];return{abortEarly:(t==null?void 0:t.abortEarly)??!1,issue:(t==null?void 0:t.issue)??new z,path:w(s)?r:r.concat(s)}}static format(t,s=[]){return(r={})=>{if(P(t))return t({...r,path:s});if(!re(t))return t;const i={...r,path:fs(s)||"this"};return Object.entries(i).reduce((a,[o,u])=>{const c=new RegExp(`{#${o}}`,"g");return a.replace(c,String(u))},t)}}addIssue(t,s,r){const i=z.format(t,s)(r);this.issues.push({message:i,path:s})}addIssues(t){return this.issues=this.issues.concat(t),this}get isEmpty(){return!this.issues.length}get message(){const t=this.issues.map(s=>{try{return JSON.stringify(s.message),s.message}catch{return"error can not stringify"}});return JSON.stringify(t,null,2)}}const de={invalid:"{#path} is invalid",required:"{#path} is a required field"},k={email:"{#path} must be a valid email",invalid:"{#path} must be a string",length:"{#path} must be exactly {#length} characters",lowercase:"{#path} must be a lowercase string",max:"{#path} must be at most {#max} characters",min:"{#path} must be at least {#min} characters",range:"{#path} length be between {#min} and {#max}",regex:'{#path} must match the following: "{#regex}"',uppercase:"{#path} must be a upper case string",url:"{#path} must be a valid URL",uuid:"{#path} must be a valid UUID"},N={equal:"{#path} must be equal to {#equal}",integer:"{#path} must be an integer",invalid:"{#path} must be a number",max:"{#path} must be less than {#max}",min:"{#path} must be greater than {#min}",negative:"{#path} must be a negative number",positive:"{#path} must be a positive number",range:"{#path} be between {#min} and {#max}"},Y={false:"{#path} field must be false",invalid:"{#path} must be a boolean",true:"{#path} field must be true"},ee={invalid:"{#path} must be a date",max:"{#path} field must be at earlier than {#max}",min:"{#path} field must be later than {#min}"},gs={invalid:"{#path} must be a object",unknown:"{#path} field has unspecified keys: {#unknown}"},H={invalid:"{#path} must be a array",length:"{#path} must have {#length} items",max:"{#path} field must have less than or equal to {#max} items",min:"{#path} field must have at least {#min} items",nonempty:"{#path} must have at least one items"},Fs={invalid:"{#path} must be include {#enums}"},_s={invalid:"{#path} is invalid union type"};class M{constructor(){l(this,"_In");l(this,"_Out");l(this,"rules",new Map)}_refine(e,t){return this.rules.set(e,t),this}_remove(e){return this.rules.delete(e),this}_validate(e,t){const s=[...this.rules.values()].map(r=>r(e,t));return Promise.all(s).then(r=>{for(let i=0,a=r.length;i<a;i++){const o=r[i];if(o.status==="invalid")return o}return x(e)})}nullable(){return E.nullable(this)}or(e){return G.create([this,e])}preprocess(e){return E.preprocess(this,e)}refine(e,t=de.invalid){return E.refinement(this,e,t)}required(e=de.required){const t=s=>!w(s);return E.required(this,g(t,e))}transform(e){return E.transform(this,e)}union(e){return G.create([this,e])}async validate(e,t){const s=z.ensure({...t,issue:void 0}),r=await this._validate(e,s);if(r.status==="valid")return r.value;throw s.issue}}class E extends M{constructor(e,t){super(),this.schema=e,this.options=t}static nullable(e){return new E(e,{type:"nullable"})}static preprocess(e,t){return new E(e,{handler:t,type:"preprocess"})}static refinement(e,t,s){const r=g(t,s);return new E(e,{handler:r,type:"refinement"})}static required(e,t){return new E(e,{handler:t,type:"required"})}static transform(e,t){return new E(e,{handler:t,type:"transform"})}get _type(){return this.options.type}async _validate(e,t){const{options:s}=this;if(s.type==="transform"){const i=await this.schema._validate(e,t);if(i.status==="invalid")return i;const a=await s.handler(e);return x(a)}if(s.type==="preprocess"){const i=await s.handler(e);return this.schema._validate(i,t)}if(s.type==="nullable")return pt(e)?x(e):this.schema._validate(e,t);if(s.type==="required"){const i=await s.handler(e,t);return i.status==="invalid"?i:this.schema._validate(e,t)}const r=await this.schema._validate(e,t);return r.status==="invalid"?r:s.handler(e,t)}unwrap(){return this.schema}}class G extends M{constructor(e){super(),this.inner=e}static create(e){return new G(e)}async _validate(e,t){if($(e))return x(e);const s=await Promise.all(this.inner.map(async r=>{const i=z.ensure(pe(t,["issue"]));try{return[i,await r._validate(e,i)]}catch(a){return[i,a]}}));for(let r=0,i=s.length;r<i;r++){const a=s[r][1];if(a.status==="valid")return a}for(let r=0,i=s.length;r<i;r++){const a=s[r][1];if(a.status==="invalid")return a}return S(t)(_s.invalid,{value:e})}}class ae extends M{static create(){return new ae}_validate(e){return x(e)}}class fe extends M{constructor(e){super(),this.inner=e}static create(e){return new fe(e??ae.create())}async _validate(e,t){if($(e))return x(e);if(!W(e))return S(t)(H.invalid,{value:e});const s=await super._validate(e,t);return s.status==="invalid"?s:this._validateInner(e,t)}async _validateInner(e,t){const s=e.map((r,i)=>{const a=z.ensure(t,i);return this.inner._validate(r,a)});return Promise.all(s).then(r=>{for(let i=0,a=r.length;i<a;i++){const o=r[i];if(o.status==="invalid")return o}return x(e)})}length(e,t=H.length){const s=r=>r.length===e;return this._refine("length",g(s,t,{length:e}))}max(e,t=H.max){const s=r=>r.length<=e;return this._refine("max",g(s,t,{max:e}))}min(e,t=H.min){const s=r=>r.length>=e;return this._refine("min",g(s,t,{min:e}))}nonempty(e=H.nonempty){return this.min(1,e)}get element(){return this.inner}}class ge extends M{constructor(e=Y.invalid){super(),this.message=e}static create(e=Y.invalid){return new ge(e)}_validate(e,t){return $(e)?x(e):Pe(e)?super._validate(e,t):S(t)(this.message,{value:e})}false(e=Y.false){const t=s=>s===!1;return this._refine("boolean",g(t,e))}true(e=Y.true){const t=s=>s===!0;return this._refine("boolean",g(t,e))}}class Fe extends M{constructor(e=ee.invalid){super(),this.message=e}static create(e=ee.invalid){return new Fe(e)}_validate(e,t){return $(e)?x(e):!mt(e)||Number.isNaN(e.getTime())?S(t)(this.message,{value:e}):super._validate(e,t)}max(e,t=ee.max){const s=r=>r<=e;return this._refine("max",g(s,t,{max:e}))}min(e,t=ee.min){const s=r=>r>=e;return this._refine("min",g(s,t,{min:e}))}}class _e extends M{constructor(e){super(),this.inner=e}static create(e){return new _e(e)}_validate(e,t){return $(e)?x(e):this.inner.includes(e)?super._validate(e,t):S(t)(Fs.invalid,{enums:this.inner,value:e})}get enum(){return this.inner}}class ve extends M{constructor(e=N.invalid){super(),this.message=e}static create(e=N.invalid){return new ve(e)}_validate(e,t){return $(e)?x(e):!he(e)||Number.isNaN(e)?S(t)(this.message,{value:e}):super._validate(e,t)}equal(e,t=N.equal){const s=r=>r===e;return this._refine("equal",g(s,t,{equal:e}))}integer(e=N.integer){const t=s=>Number.isInteger(s);return this._refine("integer",g(t,e))}max(e,t=N.max){const s=r=>r<=e;return this._refine("max",g(s,t,{max:e}))}min(e,t=N.min){const s=r=>r>=e;return this._refine("min",g(s,t,{min:e}))}negative(e=N.negative){const t=s=>s<0;return this._refine("negative",g(t,e))}positive(e=N.positive){const t=s=>s>0;return this._refine("positive",g(t,e))}range(e,t,s=N.range){const r=i=>i>=e&&i<=t;return this._refine("range",g(r,s,{max:t,min:e}))}}class ye extends M{constructor(e){super(),this.inner=e}static create(e){return new ye(e)}async _validate(e,t){if($(e))return x(e);if(!L(e))return S(t)(gs.invalid,{value:e});const s=await super._validate(e,t);return s.status==="invalid"?s:this._validateInner(e,t)}async _validateInner(e,t){const s=Object.entries(this.shape).map(([r,i])=>{const a=z.ensure(t,r);return i._validate(e[r],a)});return Promise.all(s).then(r=>{for(let i=0,a=r.length;i<a;i++){const o=r[i][1];if(o.status==="invalid")return o}return x(e)})}passthrough(){return this._remove("strict"),this}get shape(){return this.inner}}const vs=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,ys=/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,$s=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;class $e extends M{constructor(e=k.invalid){super(),this.message=e}static create(e=k.invalid){return new $e(e)}_validate(e,t){return $(e)||e===""?x(e):re(e)?super._validate(e,t):S(t)(this.message,{value:e})}email(e=k.email){const t=s=>vs.test(s);return this._refine("email",g(t,e))}length(e,t=k.length){const s=r=>r.length===e;return this._refine("length",g(s,t,{length:e}))}lowercase(e=k.lowercase){const t=s=>s===s.toLowerCase();return this._refine("lowercase",g(t,e))}max(e,t=k.max){const s=r=>r.length<=e;return this._refine("max",g(s,t,{max:e}))}min(e,t=k.min){const s=r=>r.length>=e;return this._refine("min",g(s,t,{min:e}))}range(e,t,s=k.range){const r=i=>i.length>=e&&i.length<=t;return this._refine("range",g(r,s,{max:t,min:e}))}regex(e,t=k.regex){const s=r=>e.test(r);return this._refine("regex",g(s,t,{regex:e}))}required(e=de.required){const t=s=>!(w(s)||s==="");return E.required(this,g(t,e))}uppercase(e=k.uppercase){const t=s=>s===s.toUpperCase();return this._refine("uppercase",g(t,e))}url(e=k.url){const t=s=>ys.test(s);return this._refine("url",g(t,e))}uuid(e=k.uuid){const t=s=>$s.test(s);return this._refine("uuid",g(t,e))}}const bs=$e.create,ws=ve.create,Is=ge.create,Vs=ye.create,Cs=ae.create,xs=fe.create,Es=_e.create,ks=Fe.create,js=G.create,Ps=E.refinement,{preprocess:Ms,refinement:Bs,transform:Ns}=E,ke={any:Cs,array:xs,boolean:Is,date:ks,enums:Es,number:ws,object:Vs,preprocess:Ms,refine:Ps,string:bs,transform:Ns,union:js};function je(n){return p.jsx("input",{...n,value:n.value||"",style:{height:32}})}function Rs(){return p.jsxs(O,{onFinish:n=>{console.log("finish",n)},onFailed:n=>{console.log("failed",n)},children:[p.jsx(O.Item,{label:"username",name:"username",rule:ke.string().min(3).max(7).required(),children:p.jsx(je,{placeholder:"username"})}),p.jsx(O.Item,{label:"email",name:"email",rule:ke.string().email().required(),children:p.jsx(je,{placeholder:"username"})}),p.jsx(O.Item,{wrapperCol:{offset:2},children:p.jsx(st,{type:"submit",children:"submit"})})]})}function Hs(){return p.jsx("div",{children:"建设中,敬请期待!"})}export{As as A,Rs as a,Hs as b};
