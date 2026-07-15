import{p as Se,n as w,U as O,V as de,x as Me,W as ce,z as me,A as we,r as m,j as r,X as He,Y as pe,J as P,l as E,e as Ae,I as Le,s as Ve,F as ie,v as We,a as be,D as ve,m as De,c as le,f as p,b as Je,B as Ce,d as qe,G as Ge,Z as Ke,E as Xe,_ as Ye,$ as Ze}from"./index-CT6LAQHG.js";import{u as Qe,B as f,S as et,i as xe}from"./index-C0OdiqOU.js";import{s as he,g as Ee,b as tt,u as je,O as nt,p as ot}from"./index-DG5YvGvY.js";import{S as Ne}from"./index-B0F-3C7F.js";import{i as Be}from"./keyboard-C4wnD4uN.js";import{c as st}from"./children-Ce1i_Mnp.js";import{n as at,m as rt,g as $e}from"./closable-BVmE3kPr.js";import{n as ct}from"./slots-CYKM2rkd.js";import{i as fe,C as it}from"./index-iQu7Fh9d.js";const ge={position:"fixed",overflow:"hidden",width:0,height:0,top:-1,left:-1,padding:0};function lt(s,e){let t=s.nextElementSibling;const n=[];for(;t&&t!==e;)n.push(t),t=t.nextElementSibling;return n}function V(s){s&&Se(s.focus)&&s.focus({preventScroll:!0})}class ut{_stack=[];_subscribers=0;_keydownCleanup=w;_focusinCleanup=w;init=e=>{const t=n=>o=>{const a=Me(this._stack,-1);a&&a[n](o)};this._keydownCleanup=O(e,"keydown",t("onKeyDown"),!0),this._focusinCleanup=O(e,"focusin",t("onFocusIn"))};dispose=()=>{this._keydownCleanup(),this._focusinCleanup()};subscribe=e=>de?(this._subscribers++===0&&this.init(e),()=>{--this._subscribers===0&&this.dispose(),this._subscribers=Math.max(this._subscribers,0)}):w;register=e=>(this._stack.push(e),()=>{this._stack=this._stack.filter(t=>t!==e)})}const ke=new ut;class dt{_props={};_isShiftTab=!1;_latestFocus=null;_savedElement=null;$start={current:null};$end={current:null};get start(){return this.$start.current}get end(){return this.$end.current}_bind=e=>{this._props=e};restoreFocus=()=>{const{returnFocus:e}=this._props;e&&V(this._savedElement)};handleFocus=(e,t)=>{if(!t||!this.start||!this.end)return;const n=lt(this.start,this.end);if(!n.length)return;const o=e.activeElement;if(o!==this.start&&o!==this.end){if(n.some(a=>a===t||a.contains(t))){this._latestFocus=t;return}if(this._latestFocus)return V(this._latestFocus)}V(this._isShiftTab?this.end:this.start)};subscribe=()=>ke.subscribe(ce());activate=e=>{if(!e)return;const t=ce(this.start);this._savedElement=t.activeElement;const n=ke.register({onKeyDown:o=>{this._isShiftTab=o.shiftKey&&Be(o.key,"tab"),this.handleFocus(t,o.target)},onFocusIn:o=>{o.stopImmediatePropagation(),this.handleFocus(t,o.target)}});return()=>{n(),this.restoreFocus(),this._latestFocus=null,this._savedElement=null}}}function mt(s){const{ref:e,active:t}=s,n=me(()=>new dt);return we(()=>{n._bind(s)}),m.useImperativeHandle(e,()=>({focus:()=>{V(n.start)}}),[n]),m.useEffect(()=>n.subscribe(),[n]),m.useEffect(()=>n.activate(!!t),[t,n]),{omitted:s,ctrl:n}}function ht(s){const{omitted:e,ctrl:t}=mt(s),{children:n,active:o}=e;return r.jsxs(r.Fragment,{children:[r.jsx("div",{ref:t.$start,style:ge,tabIndex:o?0:-1}),n,r.jsx("div",{ref:t.$end,style:ge,tabIndex:o?0:-1})]})}class ft{_stack=[];_lockDuration=200;_lastEndTime=0;_subscribers=0;_keydownCleanup=w;_composeCleanup=w;init=()=>{const e=He();this._composeCleanup=O(e,"compositionend",()=>{this._lastEndTime=pe()}),this._keydownCleanup=O(e,"keydown",t=>{!Be(t.key,"esc")||t.isComposing||pe()-this._lastEndTime<this._lockDuration||Me(this._stack,-1)?.(t)})};dispose=()=>{this._keydownCleanup(),this._composeCleanup()};subscribe=()=>{if(de)return this._subscribers++===0&&this.init(),()=>{--this._subscribers===0&&this.dispose(),this._subscribers=Math.max(this._subscribers,0)}};activate=(e,t)=>{if(e)return this._stack.push(t),()=>{this._stack=this._stack.filter(n=>n!==t)}}}const _e=new ft;function pt(s,e){const t=P(e);m.useEffect(()=>_e.subscribe(),[]),m.useEffect(()=>_e.activate(s,t),[s,t])}function re(s){const e=s?.focusable;return e===!0?{}:e}function bt(s){const{currentState:e,contextState:t,defaultState:n}=s,o=[re(e),re(t),re(n)];return o.find(l=>!E(l))&&he(...o.filter(l=>!!l),{focusTrap:!0,returnFocus:!0})||void 0}const S={keyboard:!0,maskClosable:!0,centered:!1,closable:!0,focusable:!0,fromPointerOpen:!0},Ct={width:416,type:"confirm",closable:!1,maskClosable:!1},xt=Ae()(["width","type","closable","maskClosable"]);class gt{_subjects=new Map;on=(e,t)=>{const n=this._subjects.get(e)||new Set;return this._subjects.set(e,n.add(t)),()=>{this.off(e,t)}};off=(e,t)=>{const n=this._subjects.get(e);n&&(n.delete(t),n.size||this._subjects.delete(e))};emit=(e,...t)=>{const n=this._subjects.get(e);n&&n.forEach(o=>{o(...t)})}}class kt{_listeners=new Set;_subscribers=0;_cleanup=null;init=()=>{const e=ce().documentElement;this._cleanup=O(e,"click",t=>{this._listeners.forEach(n=>{n(t)})},!0)};dispose=()=>{this._cleanup?.(),this._cleanup=null};subscribe=()=>{if(de)return this._subscribers++===0&&this.init(),()=>{--this._subscribers===0&&this.dispose(),this._subscribers=Math.max(this._subscribers,0)}};activate=(e,t)=>{if(e)return this._listeners.add(t),()=>{this._listeners.delete(t)}}}const ye=new kt;class _t{_cleanup=null;position=void 0;sync=e=>{const t=e.target,n=e.detail===0||!e.pageX&&!e.pageY,o=n&&t?Ee(t):null;!o&&n?this.position=void 0:o?this.position={x:o.left+o.width/2,y:o.top+o.height/2}:this.position={x:e.clientX,y:e.clientY},this._cleanup?.(),this._cleanup=Le(200,()=>{this.position=void 0})};subscribe=()=>{ye.subscribe(),ye.activate(!0,this.sync)}}const Pe=new _t;Pe.subscribe();class yt{$$channel=new gt;confirm=!1;cancel=!1;emit=(e,t)=>{this[e]=t,this.$$channel.emit(e,t)};on=(e,t)=>this.$$channel.on(e,t);resolve=(e,t,n,o)=>{if(e||!fe(n))return o?.();this.emit(t,!0),n.then(()=>{this.emit(t,!1),o?.()},()=>{this.emit(t,!1)})};reset=()=>{this.emit("confirm",!1),this.emit("cancel",!1)}}class St{_transform=void 0;$wrapper={current:null};$$loading=new yt;$trap={current:null};get wrapper(){return this.$wrapper.current}get trap(){return this.$trap.current}onEnter=(e,t)=>{this.trap?.focus();const n=Pe.position;if(!n||!t)return;const o=Ee(e),a=tt(this.wrapper,1e3),c=o.left+o.width/2-e.offsetWidth/2,l=o.top+o.height/2-e.offsetHeight/2,i=(n.x-c)/a.sx,u=(n.y-l)/a.sy;return this._transform={transformOrigin:`${i.toFixed(3)}px ${u.toFixed(3)}px`},this._transform};onEntering=()=>this._transform;onExit=()=>this._transform;onExiting=()=>this._transform;reset=()=>{this._transform=void 0}}function Mt(s,e){return Object.keys(s).every(n=>ie(s[n],e[n]))}function wt(s,e){if(E(e))return;if(!Ve(e))return{width:e};const t={},n=(o,a)=>{E(a)||(t[`--${s}-${o}-width`]=We(a)?`${a}px`:`${a}`)};return n("xs",e.xs),n("sm",e.sm),n("md",e.md),n("lg",e.lg),n("xl",e.xl),n("xxl",e.xxl),t}function vt(s,e){const{centered:t}=s,{_isJsxModal:n,prefixCls:o,width:a,type:c}=e,l=be(h=>h),i=be("modal",o),u=ve(()=>wt(i,a),[i,a],De);return{rns:l,ns:i,cssVars:u,classNames:{root:le(i,{[`${i}--centered`]:t,[`${i}--confirm`]:!n,[`${i}--confirm-${c}`]:!n&&c}),mask:`${i}-mask`,main:`${i}__main`,header:`${i}__header`,title:`${i}__title`,statusIcon:`${i}__status-icon`,closeBtn:`${i}__close-btn`,body:`${i}__body`,footer:`${i}__footer`}}}function Et(s){const e=Qe("modal"),{_isJsxModal:t,_onDismiss:n,isOpen:o,confirmLoading:a,slots:c,onOk:l,onCancel:i,onOpened:u,onClosed:h,keyboard:x=p(e.keyboard,S.keyboard),maskClosable:_=p(e.maskClosable,S.maskClosable),centered:W=p(e.centered,S.centered),closable:U=p(e.closable,S.closable),focusable:z=p(e.focusable,S.focusable),fromPointerOpen:D=p(e.fromPointerOpen,S.fromPointerOpen)}=s,g=s,j={keyboard:x,maskClosable:_,centered:W,closable:U,focusable:z,fromPointerOpen:D},C=me(()=>new St),[J,N]=m.useState(o),{rns:q,ns:G,cssVars:K,classNames:F}=vt(j,g),[T,X]=Je([e.classNames,{root:e.className},F,g.classNames,{root:g.className}],[e.styles,{root:e.style},g.styles,{root:g.style},{root:K}],{meta:{...g,...j}}),R=ct({currentState:{slots:c},contextState:{slots:e.slots}}),Y=bt({currentState:{focusable:z},contextState:{focusable:e.focusable},defaultState:{focusable:!0}}),[B,H]=at({currentState:{closable:U},contextState:{closable:e.closable}}),Z=P((d,y)=>t?w:C.$$loading.on(d,y)),Q=P(d=>{t&&a||!t&&C.$$loading.confirm||C.$$loading.resolve(t,"confirm",l?.(d))}),ee=P(d=>{t&&a||!t&&C.$$loading.cancel||C.$$loading.resolve(t,"cancel",i?.(d),B?.onClose)}),$=P(d=>{t&&a||(t?i?.(d):n?.(d),B?.onClose?.())}),te=d=>{_&&d.target===d.currentTarget&&$(d)},ne=()=>{u?.()},oe=()=>{N(!1),h?.(),B?.onClosed?.(),C.reset()},se=Ce(!!o,()=>{N(!0)},(d,y)=>!d||ie(d,y)),ae=Ce(t,()=>{C.$$loading.reset()},(d,y)=>!d||ie(d,y));return pt(!!o&&!!x,$),{picked:j,omitted:g,rns:q,ns:G,cssNames:T,cssAttrs:X,ctrl:C,visible:J,renderSlots:R,focusableState:Y,closeIconRender:H,returnEmpty:se||ae,subscribe:Z,handleOk:Q,handleCancel:ee,handleDismiss:$,handleEntered:ne,handleExited:oe,handleClick:te}}const I=qe("ModalFooterContext",{});function jt(s){const{_showCancel:e,confirmLoading:t,confirmText:n,confirmButtonProps:o,cancelText:a,cancelButtonProps:c,subscribe:l,onOk:i,onCancel:u}=s,h=ve(()=>({_showCancel:e,confirmText:n,confirmLoading:t,confirmButtonProps:o,cancelText:a,cancelButtonProps:c,subscribe:l,onOk:i,onCancel:u}),{_showCancel:e,confirmText:n,confirmLoading:t,confirmButtonProps:o,cancelText:a,cancelButtonProps:c,subscribe:l,onOk:i,onCancel:u},Mt);return{omitted:s,modalFooterContextValue:h}}const Oe={children:"Cancel"},v={children:"Confirm",theme:"primary",variant:"solid"};function Nt(){const s=I.use(),{cancelButtonProps:e,cancelText:t,onCancel:n}=s,{children:o=p(t,Oe.children),onClick:a=n}=e||{};return{picked:{children:o,onClick:a},omitted:e}}function Bt(){const s=I.use(),{confirmLoading:e,confirmText:t,confirmButtonProps:n,onOk:o}=s,{children:a=p(t,v.children),theme:c=v.theme,variant:l=v.variant,loading:i=e,onClick:u=o}=n||{};return{picked:{children:a,theme:c,variant:l,loading:i,onClick:u},omitted:n}}function $t(){const s=I.use(),{_showCancel:e,cancelText:t,cancelButtonProps:n,subscribe:o,onCancel:a}=s,{loading:c,children:l=p(t,Oe.children),onClick:i=a}=n||{},u={children:l,onClick:i},[h,x]=je(c,()=>!1);return m.useEffect(()=>o?.("cancel",x),[o,x]),{omitted:n,picked:u,isLoading:h,visible:e}}function Pt(){const s=I.use(),{confirmText:e,confirmButtonProps:t,subscribe:n,onOk:o}=s,{loading:a,children:c=p(e,v.children),theme:l=v.theme,variant:i=v.variant,onClick:u=o}=t||{},h={children:c,theme:l,variant:i,onClick:u},[x,_]=je(a,()=>!1);return m.useEffect(()=>n?.("confirm",_),[n,_]),{omitted:t,picked:h,isLoading:x}}function Ot(){const{picked:s,omitted:e}=Nt();return r.jsx(f,{...e,...s})}function It(){const{picked:s,omitted:e}=Bt();return r.jsx(f,{...e,...s})}function Ut(){const{picked:s,omitted:e,isLoading:t,visible:n}=$t();return n?r.jsx(f,{...e,...s,loading:t}):null}function zt(){const{picked:s,omitted:e,isLoading:t}=Pt();return r.jsx(f,{...e,...s,loading:t})}function Ft(s){const{omitted:e,modalFooterContextValue:t}=jt(s),{_isJsxModal:n,footer:o}=e,a=()=>{const c=Se(o);if(!c&&!E(o))return o;const u={cancelButton:n?r.jsx(Ot,{}):r.jsx(Ut,{}),confirmButton:n?r.jsx(It,{}):r.jsx(zt,{})},h=r.jsxs(r.Fragment,{children:[u.cancelButton,u.confirmButton]});return r.jsx(I,{value:t,children:c?o(h,u):h})};return r.jsx(Ge,{value:!1,children:a()})}function Ie(s){const{picked:e,omitted:t,rns:n,ns:o,cssNames:a,cssAttrs:c,ctrl:l,visible:i,renderSlots:u,focusableState:h,closeIconRender:x,returnEmpty:_,subscribe:W,handleOk:U,handleCancel:z,handleDismiss:D,handleEntered:g,handleExited:j,handleClick:C}=Et(s),{fromPointerOpen:J}=e,{_isJsxModal:N,_showCancel:q,children:G,type:K,title:F,footer:T,mask:X,isOpen:R,fresh:Y,zIndex:B,transitions:H,getContainer:Z,mountOnEnter:Q,unmountOnExit:ee,confirmLoading:$,confirmText:te,confirmButtonProps:ne,cancelText:oe,cancelButtonProps:se}=t,ae=b=>{const{focusTrap:k,returnFocus:Re}=h||{};return k?r.jsx(ht,{ref:l.$trap,active:i,returnFocus:Re,children:b}):b},d=()=>x((b,k)=>r.jsx("button",{className:a.closeBtn,style:c.closeBtn,disabled:k,tabIndex:0,type:"button",onClick:D,children:b})),y=()=>{if(N)return null;const b=rt(K,"warning");return st(b,{fallback:r.jsx("span",{className:a.statusIcon,style:c.statusIcon,children:b}),transform:k=>({className:le(k.className,a.statusIcon),style:{...k.style,...c.statusIcon}})})};return _?null:r.jsx(nt,{classNames:{mask:a.mask},style:{left:0,top:0},styles:{mask:c.mask},skipBeginning:!0,getContainer:Z,isOpen:R,mask:X,mountOnEnter:Q,transitions:{mask:p(H?.mask,`${n}-fade-in`),content:p(H?.content,`${n}-zoom-in`)},unmountOnExit:ee,zIndex:B,onEnter:b=>l.onEnter(b,!!J),onEntered:g,onEntering:l.onEntering,onExit:l.onExit,onExited:j,onExiting:l.onExiting,children:(b,k)=>r.jsx("div",{ref:l.$wrapper,className:`${o}-wrapper`,style:i?void 0:{display:"none"},tabIndex:-1,onClick:C,children:r.jsx("div",{ref:b,className:le(a.root,k.names()),style:{...c.root,...k.attrs()},children:u({name:"main",children:ae(r.jsx(et,{when:()=>!!(R||Y),children:r.jsxs("div",{className:a.main,style:c.main,children:[d(),y(),xe(F)&&r.jsx("div",{className:a.header,style:c.header,children:r.jsx("span",{className:a.title,style:c.title,children:F})}),r.jsx("div",{className:a.body,style:c.body,children:G}),xe(T,E)&&r.jsx("div",{className:a.footer,style:c.footer,children:r.jsx(Ft,{_isJsxModal:N,_showCancel:q,cancelButtonProps:se,cancelText:oe,confirmButtonProps:ne,confirmLoading:$,confirmText:te,footer:T,subscribe:W,onCancel:z,onOk:U})})]})}))})})})})}function Tt(s){return r.jsx(Ie,{...s,_isJsxModal:!1})}function Rt(s){return r.jsx(Ie,{...s,_isJsxModal:!0})}function Ht(s){const{items:e}=s;return r.jsx(r.Fragment,{children:Array.from(e).map(([t,{config:n,isOpen:o}])=>m.createElement(Tt,{...n,key:t,isOpen:o},n.content))})}function Ue(){let s,e;return{promise:new Promise((n,o)=>{s=n,e=o}),resolve:s,reject:e}}class At{_change;_prepare;_uniqueId=Ke("m-");_bind=(e,t)=>{this._change=e,this._prepare=t};append=(e,t)=>{this._change(n=>{const o=new Map(n);return o.set(e,{config:t,isOpen:!0}),o})};update=(e,t)=>{this._change(n=>{const o=n.get(e);if(!o)return n;const a=new Map(n);return a.set(e,{...o,config:{...o.config,...t}}),a})};close=e=>{this._change(t=>{const n=t.get(e);if(!n)return t;const o=new Map(t);return o.set(e,{...n,isOpen:!1}),o})};finish=e=>{this._change(t=>{if(!t.has(e))return t;const n=new Map(t);return n.delete(e),n})};generate=e=>{const{promise:t,resolve:n}=Ue();return{promise:t,wrap:(o,a,c=!1)=>{const l=()=>{n(a),this.close(e)};return i=>{const u=o?.(i);return c||!fe(u)?l():u.then(l)}}}};confirm=e=>{const t=this._uniqueId(),{promise:n,wrap:o}=this.generate(t),a=this._prepare(e);return a.onOk=o(e.onOk,!0),a.onCancel=o(e.onCancel,!1),a.onClosed=Xe(e.onClosed,()=>{this.finish(t)}),a._onDismiss=o(e.onCancel,!1,!0),a._showCancel=!E(e.onCancel)||a.type==="confirm",this.append(t,a),{then:c=>n.then(c),update:c=>{this.update(t,c)},close:()=>{this.close(t)}}};expose=()=>{const{confirm:e}=this;return Object.assign($e().reduce((t,n)=>(t[n]=o=>e({...o,type:n}),t),{}),{confirm:e})}}function ze(){const[s,e]=m.useState(()=>new Map),t=me(()=>new At);return we(()=>{t._bind(o=>{e(o)},o=>he(o,ot(Ct,xt)))}),[m.useMemo(()=>t.expose(),[t]),r.jsx(Ht,{items:s},"modal-holder")]}class Lt{_config={};get=()=>({...this._config});set=e=>{this._config=he(e,this.get())}}const ue=new Lt;function Vt(s){const{ref:e}=s,[t,n]=m.useState(()=>ue.get()),[o,a]=ze();return m.useImperativeHandle(e,()=>({get confirm(){return o.confirm},sync:()=>{n(ue.get())}}),[o,n]),{ctxHolder:a,modalConfig:t}}function Wt(s){const{ctxHolder:e,modalConfig:t}=Vt(s);return r.jsx(it,{modal:t,children:e})}class Dt{_cleanup=null;_container=null;_callbacks=[];ensure=()=>this._container?this._container:new Promise(e=>{Ye.createRoot(document.createDocumentFragment()).render(r.jsx(m.StrictMode,{children:r.jsx(Wt,{ref:t=>{e(this._container??=t)}})}))});flush=()=>{this._cleanup?.(),this._cleanup=Ze(()=>{const e=this.ensure(),t=n=>{n.sync(),this._callbacks.forEach(o=>{o(n)}),this._callbacks.length=0};fe(e)?e.then(t):t(e)})};config=e=>{ue.set(e),this._container?.sync()};confirm=e=>{const{promise:t,resolve:n}=Ue();return this._callbacks.push(o=>{n({inner:o.confirm(e)})}),this.flush(),{then:o=>t.then(({inner:a})=>{a.then(o)}),update:o=>{t.then(({inner:a})=>{a.update(o)})},close:()=>{t.then(({inner:o})=>{o.close()})}}};expose=()=>{const{confirm:e,config:t}=this;return Object.assign($e().reduce((n,o)=>(n[o]=a=>e({...a,type:o}),n),{}),{confirm:e,config:t})}}const Jt=new Dt,M=Object.assign(Rt,Jt.expose(),{useModal:ze});function nn(){const[s,e]=m.useState(!1);return r.jsxs(r.Fragment,{children:[r.jsx(f,{theme:"primary",variant:"solid",onClick:()=>e(!0),children:"Open Modal"}),r.jsxs(M,{isOpen:s,title:"Basic Modal",onCancel:()=>{e(!1)},onOk:()=>{e(!1)},children:[r.jsx("p",{children:"Some contents..."}),r.jsx("p",{children:"Some contents..."}),r.jsx("p",{children:"Some contents..."})]})]})}const on={metaInfo:{"zh-CN":`基本的对话框使用方式。

`,"en-US":`Basic modal usage.

`},rawText:`\`\`\`tsx
import { useState } from 'react'
import { Button, Modal } from '@mink-ui/core'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button theme="primary" variant="solid" onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={isOpen}
        title="Basic Modal"
        onCancel={() => { setIsOpen(false) }}
        onOk={() => { setIsOpen(false) }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}
\`\`\`
`,cssName:"css-612a8888",relPath:"packages/core/src/modal/__docs__/examples/basic.md"},Fe=m.createContext(null),Te=m.createContext(null),A={title:"Use Hook!",onOk:async()=>{await new Promise(s=>setTimeout(s,1e3))},content:r.jsxs(r.Fragment,{children:[r.jsx(Fe.Consumer,{children:s=>`Reachable: ${s}!`}),r.jsx("br",{}),r.jsx(Te.Consumer,{children:s=>`Unreachable: ${s}!`})]})};function sn(){const[s,e]=M.useModal();return r.jsxs(Fe,{value:"Light",children:[r.jsxs(Ne,{children:[r.jsx(f,{theme:"info",onClick:()=>{s.confirm(A)},children:"Confirm"}),r.jsx(f,{theme:"info",onClick:()=>{s.warning(A)},children:"Warning"}),r.jsx(f,{theme:"info",onClick:()=>{s.info(A)},children:"Info"}),r.jsx(f,{theme:"info",onClick:()=>{s.error(A)},children:"Error"})]}),e,r.jsx(Te,{value:"Bamboo"})]})}const an={metaInfo:{"zh-CN":`通过 Modal.useModal 创建支持读取 context 的 contextHolder。其中仅有 hooks 方法支持 Promise await 操作。

`,"en-US":`通过 Modal.useModal 创建支持读取 context 的 contextHolder。其中仅有 hooks 方法支持 Promise await 操作。en-US

`},rawText:`\`\`\`tsx
import { createContext } from 'react'
import { Button, Modal, Space } from '@mink-ui/core'

const ReachableContext = createContext<string | null>(null)
const UnreachableContext = createContext<string | null>(null)

const config = {
  title: 'Use Hook!',
  onOk: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
  },
  content: (
    <>
      <ReachableContext.Consumer>{name => \`Reachable: \${name}!\`}</ReachableContext.Consumer>
      <br />
      <UnreachableContext.Consumer>{name => \`Unreachable: \${name}!\`}</UnreachableContext.Consumer>
    </>
  ),
}

export default function App() {
  const [modal, contextHolder] = Modal.useModal()

  return (
    <ReachableContext value="Light">
      <Space>
        <Button
          theme="info"
          onClick={() => { modal.confirm(config) }}
        >
          Confirm
        </Button>
        <Button
          theme="info"
          onClick={() => { modal.warning(config) }}
        >
          Warning
        </Button>
        <Button
          theme="info"
          onClick={() => { modal.info(config) }}
        >
          Info
        </Button>
        <Button
          theme="info"
          onClick={() => { modal.error(config) }}
        >
          Error
        </Button>
      </Space>
      {/* \`contextHolder\` should always be placed under the context you want to access */}
      {contextHolder}

      {/* Can not access this context since \`contextHolder\` is not in it */}
      <UnreachableContext value="Bamboo" />
    </ReachableContext>
  )
}
\`\`\`
`,cssName:"css-42037374",relPath:"packages/core/src/modal/__docs__/examples/hook.md"},L={title:"Static Method",onOk:async()=>{await new Promise(s=>setTimeout(s,1e3))},content:r.jsx("div",{children:"modal content"})};function rn(){return r.jsxs(Ne,{children:[r.jsx(f,{theme:"info",onClick:async()=>{const s=await M.confirm(L);console.log("Confirmed: ",s)},children:"Confirm"}),r.jsx(f,{theme:"info",onClick:()=>{M.warning(L)},children:"Warning"}),r.jsx(f,{theme:"info",onClick:()=>{M.info(L)},children:"Info"}),r.jsx(f,{theme:"info",onClick:()=>{M.error(L)},children:"Error"})]})}const cn={metaInfo:{"zh-CN":`通过 Modal.confirm 直接 Modal。

`,"en-US":`通过 Modal.confirm 直接 Modal。en-US

`},rawText:`\`\`\`tsx
import { createContext } from 'react'
import { Button, Modal, Space } from '@mink-ui/core'

const config = {
  title: 'Static Method',
  onOk: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
  },
  content: (
    <div>
      modal content
    </div>
  ),
}

export default function App() {
  return (
    <Space>
      <Button
        theme="info"
        onClick={async () => {
          const confirmed = await Modal.confirm(config)
          console.log('Confirmed: ', confirmed)
        }}
      >
        Confirm
      </Button>
      <Button
        theme="info"
        onClick={() => { Modal.warning(config) }}
      >
        Warning
      </Button>
      <Button
        theme="info"
        onClick={() => { Modal.info(config) }}
      >
        Info
      </Button>
      <Button
        theme="info"
        onClick={() => { Modal.error(config) }}
      >
        Error
      </Button>
    </Space>
  )
}
\`\`\`
`,cssName:"css-3a0fce38",relPath:"packages/core/src/modal/__docs__/examples/static.md"},ln=[{name:"cancelButtonProps",type:"ButtonProps","zh-CN":"取消按钮属性","en-US":"Props for the cancel button"},{name:"cancelText",type:"string","zh-CN":"取消按钮文本","en-US":"Text for the cancel button"},{name:"centered",type:"boolean",defaultValue:"false","zh-CN":"是否垂直居中","en-US":"Whether to center the modal vertically"},{name:"children",type:"React.ReactNode","zh-CN":"子元素（弹窗内容）","en-US":"Children (modal content)"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"classNames",type:"Partial<Record<'mask' | 'root' | 'main' | 'header' | 'title' | 'statusIcon' | 'closeBtn' | 'body' | 'footer', string | ((props: ModalProps) => string)>>","zh-CN":"语义化类名，支持按 slot 自定义","en-US":"Semantic class names by slot"},{name:"closable",type:["boolean","CommonClosable"],defaultValue:"true","zh-CN":"是否可关闭，传入对象可配置关闭图标、禁用及回调","en-US":"Whether the modal is closable, pass an object to configure close icon, disabled state and callbacks"},{name:"confirmButtonProps",type:"ButtonProps","zh-CN":"确认按钮属性","en-US":"Props for the confirm button"},{name:"confirmLoading",type:"boolean | { delay?: number }","zh-CN":"确认按钮加载状态","en-US":"Loading state of the confirm button"},{name:"confirmText",type:"string","zh-CN":"确认按钮文本","en-US":"Text for the confirm button"},{name:"focusable",type:["boolean","{ focusTrap?: boolean; returnFocus?: boolean }"],defaultValue:"true","zh-CN":"是否可聚焦，传入对象可配置焦点捕获与返回","en-US":"Whether the modal is focusable, pass an object to configure focus trap and return"},{name:"footer",type:["React.ReactNode","(element: ReactNode, params: { confirmButton: ReactNode; cancelButton: ReactNode }) => ReactNode"],"zh-CN":"底部内容，支持自定义渲染函数","en-US":"Footer content, supports custom render function"},{name:"fresh",type:"boolean","zh-CN":"关闭后仍更新 modal 内容","en-US":"Keep updating modal content after close"},{name:"getContainer",type:"() => HTMLElement","zh-CN":"指定弹窗挂载的容器","en-US":"Specify the container to mount the modal"},{name:"isOpen",type:"boolean","zh-CN":"是否显示弹窗","en-US":"Whether the modal is visible"},{name:"keyboard",type:"boolean",defaultValue:"true","zh-CN":"是否支持 Esc 键关闭","en-US":"Whether to close on Esc key press"},{name:"mask",type:"boolean",defaultValue:"true","zh-CN":"是否显示遮罩层","en-US":"Whether to show the mask"},{name:"maskClosable",type:"boolean",defaultValue:"true","zh-CN":"点击遮罩层是否关闭","en-US":"Whether to close on mask click"},{name:"mountOnEnter",type:"boolean",defaultValue:"true","zh-CN":"进入动画开始时挂载节点","en-US":"Mount the node on enter transition"},{name:"onCancel",type:"(event: MouseEvent | KeyboardEvent) => void","zh-CN":"取消回调","en-US":"Callback when the modal is cancelled"},{name:"onClosed",type:"() => void","zh-CN":"完全关闭后触发","en-US":"Callback after the modal is fully closed"},{name:"onOk",type:"(event: MouseEvent) => void","zh-CN":"确认回调","en-US":"Callback when the modal is confirmed"},{name:"onOpened",type:"() => void","zh-CN":"完全打开后触发","en-US":"Callback after the modal is fully opened"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"slots",type:"{ main?: (node: ReactNode) => ReactNode }","zh-CN":"自定义 slot 渲染","en-US":"Custom slot rendering"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"styles",type:"Partial<Record<'mask' | 'root' | 'main' | 'header' | 'title' | 'statusIcon' | 'closeBtn' | 'body' | 'footer', React.CSSProperties | ((props: ModalProps) => React.CSSProperties)>>","zh-CN":"语义化样式，支持按 slot 自定义","en-US":"Semantic styles by slot"},{name:"title",type:"React.ReactNode","zh-CN":"弹窗标题","en-US":"Modal title"},{name:"transitions",type:"Partial<Record<'mask' | 'content', CssTransitionProps['classNames']>>","zh-CN":"动效配置，支持 mask 和 content 分别设置","en-US":"Transition configuration for mask and content"},{name:"unmountOnExit",type:"boolean",defaultValue:"false","zh-CN":"退出动画结束后卸载节点","en-US":"Unmount the node on exit transition"},{name:"width",type:["number","string","Partial<Record<Breakpoint, number | string>>"],"zh-CN":"弹窗宽度，支持响应式断点配置","en-US":"Modal width, supports responsive breakpoint configuration"},{name:"zIndex",type:"number","zh-CN":"弹窗 z-index","en-US":"Modal z-index"}];export{nn as A,on as M,ln as P,an as a,sn as b,cn as c,rn as d};
