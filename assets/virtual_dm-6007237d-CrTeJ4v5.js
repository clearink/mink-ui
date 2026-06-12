import{p as _e,n as M,O as $,P as le,x as ke,Q as ae,z as ue,A as ye,r as m,j as r,T as Pe,U as he,J as E,k as w,e as Te,V as Ue,W as Re,I as ze,s as He,F as re,v as Ae,a as me,D as Se,m as Le,c as ce,f as b,b as We,B as fe,d as Ve,G as De,X as Je,E as qe}from"./index-B9VCtSys.js";import{u as Ge,B as p,S as Ke,i as pe}from"./index-CGqzzYup.js";import{s as A,u as Me,O as Xe,p as Ye}from"./index-Dx4ITALr.js";import{S as we}from"./index-Dt4utubC.js";import{i as je}from"./keyboard-C4wnD4uN.js";import{c as Qe}from"./children-D73NmXIY.js";import{g as ve,n as Ze,m as et}from"./closable-ChRruNdI.js";import{C as tt,i as de}from"./index-DrlPGt33.js";const be={position:"fixed",overflow:"hidden",width:0,height:0,top:-1,left:-1,padding:0};function nt(o,e){let t=o.nextElementSibling;const n=[];for(;t&&t!==e;)n.push(t),t=t.nextElementSibling;return n}function H(o){o&&_e(o.focus)&&o.focus({preventScroll:!0})}class st{_stack=[];_subscribers=0;_keydownCleanup=M;_focusinCleanup=M;init=e=>{const t=n=>s=>{const a=ke(this._stack,-1);a&&a[n](s)};this._keydownCleanup=$(e,"keydown",t("onKeyDown"),!0),this._focusinCleanup=$(e,"focusin",t("onFocusIn"))};clear=()=>{this._keydownCleanup(),this._focusinCleanup()};subscribe=e=>le?(this._subscribers++===0&&this.init(e),()=>{--this._subscribers===0&&this.clear(),this._subscribers=Math.max(this._subscribers,0)}):M;register=e=>(this._stack.push(e),()=>{this._stack=this._stack.filter(t=>t!==e)})}const xe=new st;class ot{_props={};_isShiftTab=!1;_latestFocus=null;_savedElement=null;$start={current:null};$end={current:null};get start(){return this.$start.current}get end(){return this.$end.current}_bind=e=>{this._props=e};restoreFocus=()=>{const{returnFocus:e}=this._props;e&&H(this._savedElement)};handleFocus=(e,t)=>{if(!t||!this.start||!this.end)return;const n=nt(this.start,this.end);if(!n.length)return;const s=e.activeElement;if(s!==this.start&&s!==this.end){if(n.some(a=>a===t||a.contains(t))){this._latestFocus=t;return}if(this._latestFocus)return H(this._latestFocus)}H(this._isShiftTab?this.end:this.start)};subscribe=()=>xe.subscribe(ae());activate=e=>{if(!e)return;const t=ae(this.start);this._savedElement=t.activeElement;const n=xe.register({onKeyDown:s=>{this._isShiftTab=s.shiftKey&&je(s.key,"tab"),this.handleFocus(t,s.target)},onFocusIn:s=>{s.stopImmediatePropagation(),this.handleFocus(t,s.target)}});return()=>{n(),this.restoreFocus(),this._latestFocus=null,this._savedElement=null}}}function at(o){const{ref:e,active:t}=o,n=ue(()=>new ot);return ye(()=>{n._bind(o)}),m.useImperativeHandle(e,()=>({focus:()=>{H(n.start)}}),[n]),m.useEffect(()=>n.subscribe(),[n]),m.useEffect(()=>n.activate(!!t),[t,n]),{omitted:o,ctrl:n}}function rt(o){const{omitted:e,ctrl:t}=at(o),{children:n,active:s}=e;return r.jsxs(r.Fragment,{children:[r.jsx("div",{ref:t.$start,style:be,tabIndex:s?0:-1}),n,r.jsx("div",{ref:t.$end,style:be,tabIndex:s?0:-1})]})}class ct{_stack=[];_lockDuration=200;_lastEndTime=0;_subscribers=0;_keydownCleanup=M;_composedCleanup=M;init=()=>{const e=Pe();this._composedCleanup=$(e,"compositionend",()=>{this._lastEndTime=he()}),this._keydownCleanup=$(e,"keydown",t=>{!je(t.key,"esc")||t.isComposing||he()-this._lastEndTime<this._lockDuration||ke(this._stack,-1)?.(t)})};clear=()=>{this._keydownCleanup(),this._composedCleanup()};subscribe=()=>{if(le)return this._subscribers++===0&&this.init(),()=>{--this._subscribers===0&&this.clear(),this._subscribers=Math.max(this._subscribers,0)}};activate=(e,t)=>{if(e)return this._stack.push(t),()=>{this._stack=this._stack.filter(n=>n!==t)}}}const Ce=new ct;function it(o,e){const t=E(e);m.useEffect(()=>Ce.subscribe(),[]),m.useEffect(()=>Ce.activate(o,t),[o,t])}function oe(o){const e=o?.focusable;return e===!0?{}:e}function lt(o){const{currentState:e,contextState:t,defaultState:n}=o,s=[oe(e),oe(t),oe(n)];return s.find(l=>!w(l))&&A(...s.filter(l=>!!l),{focusTrap:!0,returnFocus:!0})||void 0}function ut(o){const{currentState:e,contextState:t,defaultState:n}=o,s=A(e?.slots||{},t?.slots||{},n?.slots||{});return a=>{const{name:i,params:l,children:c}=a,u=s[i];return u?u(c,l):c}}const v={keyboard:!0,maskClosable:!0,centered:!1,closable:!0,focusable:!0},dt={width:416,type:"confirm",closable:!1,maskClosable:!1},ht=Te()(["width","type","closable","maskClosable"]);class mt{_subjects=new Map;on=(e,t)=>{const n=this._subjects.get(e)||new Set;return this._subjects.set(e,n.add(t)),()=>this.off(e,t)};off=(e,t)=>{const n=this._subjects.get(e);n&&(n.delete(t),n.size||this._subjects.delete(e))};emit=(e,...t)=>{const n=this._subjects.get(e);n&&n.forEach(s=>s(...t))}}class ft{_listeners=new Set;_subscribers=0;_cleanup=null;init=()=>{const e=ae().documentElement;this._cleanup=$(e,"click",t=>{this._listeners.forEach(n=>{n(t)})},!0)};clear=()=>{this._cleanup?.(),this._cleanup=null};subscribe=()=>{if(le)return this._subscribers++===0&&this.init(),()=>{--this._subscribers===0&&this.clear(),this._subscribers=Math.max(this._subscribers,0)}};activate=(e,t)=>{if(e)return this._listeners.add(t),()=>{this._listeners.delete(t)}}}const ge=new ft;function Ee(){let o,e;return{promise:new Promise((n,s)=>{o=n,e=s}),resolve:o,reject:e}}const pt={};function bt(o){const{ref:e}=o,[t,n]=m.useState(()=>ie.get()),[s,a]=Ne();return m.useImperativeHandle(e,()=>({get confirm(){return s.confirm},sync:()=>{n(ie.get())}}),[s,n]),{ctxHolder:a,modalConfig:t}}function xt(o){const{ctxHolder:e,modalConfig:t}=bt(o);return r.jsx(tt,{modal:t,children:e})}class Ct{_cleanup=null;position=void 0;clear=()=>{this._cleanup?.(),this._cleanup=null};sync=e=>{const t=e.target,n=e.detail===0||!e.pageX&&!e.pageY,s=n&&t?t.getBoundingClientRect():null;!s&&n?this.position=void 0:s?this.position={x:s.left+s.width/2,y:s.top+s.height/2}:this.position={x:e.clientX,y:e.clientY},this.clear(),this._cleanup=ze(200,()=>{this.position=void 0})};subscribe=()=>{ge.subscribe(),ge.activate(!0,this.sync)}}const $e=new Ct;class gt{_config={...pt};get=()=>({...this._config});set=e=>{this._config=A(e,this.get())}}const ie=new gt;class _t{_cleanup=null;_container=null;_callbacks=[];ensure=()=>this._container?this._container:new Promise(e=>{Ue.createRoot(document.createDocumentFragment()).render(r.jsx(m.StrictMode,{children:r.jsx(xt,{ref:t=>{e(this._container??=t)}})}))});clear=()=>{this._cleanup?.(),this._cleanup=null};flush=()=>{this.clear(),this._cleanup=Re(()=>{const e=this.ensure(),t=n=>{n.sync(),this._callbacks.forEach(s=>{s(n)}),this._callbacks.length=0};de(e)?e.then(t):t(e)})};config=e=>{ie.set(e),this._container?.sync()};confirm=e=>{const{promise:t,resolve:n}=Ee();return this._callbacks.push(s=>{n({inner:s.confirm(e)})}),this.flush(),{then:s=>t.then(({inner:a})=>{a.then(s)}),update:s=>{t.then(({inner:a})=>{a.update(s)})},close:()=>{t.then(({inner:s})=>{s.close()})}}};expose=()=>{const{confirm:e,config:t}=this;return Object.assign(ve().reduce((n,s)=>(n[s]=a=>e({...a,type:s}),n),{}),{confirm:e,config:t})}}const kt=new _t;$e.subscribe();class yt{$$channel=new mt;confirm=!1;cancel=!1;emit=(e,t)=>{this[e]=t,this.$$channel.emit(e,t)};on=(e,t)=>this.$$channel.on(e,t);resolve=(e,t,n,s)=>{if(e||!de(n))return s?.();this.emit(t,!0),n.then(()=>{this.emit(t,!1),s?.()},()=>{this.emit(t,!1)})};reset=()=>{this.emit("confirm",!1),this.emit("cancel",!1)}}class St{$$loading=new yt;$trap={current:null};transform=void 0;get trap(){return this.$trap.current}prepare=e=>{this.trap?.focus();const t=$e.position;if(!t)return this.transform;const n=e.getBoundingClientRect(),s=t.x-n.left-(n.width-e.offsetWidth)/2,a=t.y-n.top-(n.height-e.offsetHeight)/2;return this.transform={transformOrigin:`${s}px ${a}px`},this.transform};reset=()=>{this.transform=void 0}}function Mt(o,e){const t=Object.keys(o),n=Object.keys(e);return t.length!==n.length?!1:t.every(s=>re(o[s],e[s]))}function wt(o,e){if(w(e))return;if(!He(e))return{width:e};const t={},n=(s,a)=>{w(a)||(t[`--${o}-${s}-width`]=Ae(a)?`${a}px`:`${a}`)};return n("xs",e.xs),n("sm",e.sm),n("md",e.md),n("lg",e.lg),n("xl",e.xl),n("xxl",e.xxl),t}function jt(o,e){const{centered:t}=o,{_isJsxModal:n,prefixCls:s,width:a,type:i}=e,l=me(f=>f),c=me("modal",s),u=Se(()=>wt(c,a),[c,a],Le);return{rns:l,ns:c,cssVars:u,classNames:{root:ce(c,{[`${c}--centered`]:t,[`${c}--confirm`]:!n,[`${c}--confirm-${i}`]:!n&&i}),mask:`${c}-mask`,main:`${c}__main`,header:`${c}__header`,title:`${c}__title`,statusIcon:`${c}__status-icon`,closeBtn:`${c}__close-btn`,body:`${c}__body`,footer:`${c}__footer`}}}function vt(o){const e=Ge("modal"),{_isJsxModal:t,_onDismiss:n,isOpen:s,confirmLoading:a,slots:i,onOk:l,onCancel:c,onOpened:u,onClosed:f,keyboard:k=b(e.keyboard,v.keyboard),maskClosable:x=b(e.maskClosable,v.maskClosable),centered:L=b(e.centered,v.centered),closable:N=b(e.closable,v.closable),focusable:W=b(e.focusable,v.focusable)}=o,g=o,I={maskClosable:x,centered:L,closable:N},C=ue(()=>new St),[O,F]=m.useState(s),{rns:V,ns:D,cssVars:P,classNames:T}=jt(I,g),[J,U]=We([e.classNames,{root:e.className},T,g.classNames,{root:g.className}],[e.styles,{root:e.style},g.styles,{root:g.style},{root:P}],{meta:{...g,...I}}),q=ut({currentState:{slots:i},contextState:{slots:e.slots}}),G=lt({currentState:{focusable:W},contextState:{focusable:e.focusable},defaultState:{focusable:!0}}),[y,K]=Ze({currentState:{closable:N},contextState:{closable:e.closable}}),X=E((d,h)=>t?M:C.$$loading.on(d,h)),Y=E(d=>{t&&a||!t&&C.$$loading.confirm||C.$$loading.resolve(t,"confirm",l?.(d))}),Q=E(d=>{t&&a||!t&&C.$$loading.cancel||C.$$loading.resolve(t,"cancel",c?.(d),y?.onClose)}),j=E(d=>{t&&a||(t?c?.(d):n?.(d),y?.onClose?.())}),Z=d=>{x&&d.target===d.currentTarget&&j(d)},ee=()=>{u?.()},te=()=>{F(!1),f?.(),y?.onClosed?.(),C.reset()},ne=fe(!!s,()=>{F(!0)},(d,h)=>!d||re(d,h)),se=fe(t,()=>{C.$$loading.reset()},(d,h)=>!d||re(d,h));return it(!!s&&!!k,j),{omitted:g,rns:V,ns:D,cssNames:J,cssAttrs:U,ctrl:C,visible:O,renderSlots:q,focusableState:G,closeIconRender:K,returnEmpty:ne||se,subscribe:X,handleOk:Y,handleCancel:Q,handleDismiss:j,handleEntered:ee,handleExited:te,handleClick:Z}}const B=Ve("ModalFooterContext",{});function Et(o){const{_showCancel:e,confirmLoading:t,confirmText:n,confirmButtonProps:s,cancelText:a,cancelButtonProps:i,subscribe:l,onOk:c,onCancel:u}=o,f=Se(()=>({_showCancel:e,confirmText:n,confirmLoading:t,confirmButtonProps:s,cancelText:a,cancelButtonProps:i,subscribe:l,onOk:c,onCancel:u}),{_showCancel:e,confirmText:n,confirmLoading:t,confirmButtonProps:s,cancelText:a,cancelButtonProps:i,subscribe:l,onOk:c,onCancel:u},Mt);return{omitted:o,modalFooterContextValue:f}}function $t(){const o=B.use(),{cancelButtonProps:e,cancelText:t,onCancel:n}=o,{theme:s="info",children:a=b(t,"取消"),onClick:i=n}=e||{};return{picked:{children:a,theme:s,onClick:i},omitted:e}}function Bt(){const o=B.use(),{confirmLoading:e,confirmText:t,confirmButtonProps:n,onOk:s}=o,{variant:a="solid",loading:i=e,children:l=b(t,"确认"),onClick:c=s}=n||{};return{picked:{children:l,variant:a,loading:i,onClick:c},omitted:n}}function Nt(){const o=B.use(),{_showCancel:e,cancelText:t,cancelButtonProps:n,subscribe:s,onCancel:a}=o,{theme:i="info",loading:l,children:c=b(t,"取消"),onClick:u=a}=n||{},f={children:c,theme:i,onClick:u},[k,x]=Me(l,()=>!1);return m.useEffect(()=>s?.("cancel",x),[s,x]),{omitted:n,picked:f,isLoading:k,visible:e}}function It(){const o=B.use(),{confirmText:e,confirmButtonProps:t,subscribe:n,onOk:s}=o,{loading:a,theme:i="primary",variant:l="solid",children:c=b(e,"确认"),onClick:u=s}=t||{},f={children:c,theme:i,variant:l,onClick:u},[k,x]=Me(a,()=>!1);return m.useEffect(()=>n?.("confirm",x),[n,x]),{omitted:t,picked:f,isLoading:k}}function Ot(){const{picked:o,omitted:e}=$t();return r.jsx(p,{...e,...o})}function Ft(){const{picked:o,omitted:e}=Bt();return r.jsx(p,{...e,...o})}function Pt(){const{picked:o,omitted:e,isLoading:t,visible:n}=Nt();return n?r.jsx(p,{...e,...o,loading:t}):null}function Tt(){const{picked:o,omitted:e,isLoading:t}=It();return r.jsx(p,{...e,...o,loading:t})}function Ut(o){const{omitted:e,modalFooterContextValue:t}=Et(o),{_isJsxModal:n,footer:s}=e,a=()=>{const i=_e(s);if(!i&&!w(s))return s;const u={cancelButton:n?r.jsx(Ot,{}):r.jsx(Pt,{}),confirmButton:n?r.jsx(Ft,{}):r.jsx(Tt,{})},f=r.jsxs(r.Fragment,{children:[u.cancelButton,u.confirmButton]});return r.jsx(B,{value:t,children:i?s(f,u):f})};return r.jsx(De,{value:!1,children:a()})}function Be(o){const{omitted:e,rns:t,ns:n,cssNames:s,cssAttrs:a,ctrl:i,visible:l,renderSlots:c,focusableState:u,closeIconRender:f,returnEmpty:k,subscribe:x,handleOk:L,handleCancel:N,handleDismiss:W,handleEntered:g,handleExited:I,handleClick:C}=vt(o),{_isJsxModal:O,_showCancel:F,children:V,type:D,title:P,footer:T,mask:J,isOpen:U,fresh:q,zIndex:G,transitions:y,getContainer:K,mountOnEnter:X,unmountOnExit:Y,confirmLoading:Q,confirmText:j,confirmButtonProps:Z,cancelText:ee,cancelButtonProps:te}=e,ne=h=>{const{focusTrap:_,returnFocus:Fe}=u||{};return _?r.jsx(rt,{ref:i.$trap,active:l,returnFocus:Fe,children:h}):h},se=()=>f((h,_)=>r.jsx("button",{className:s.closeBtn,style:a.closeBtn,disabled:_,tabIndex:0,type:"button",onClick:W,children:h})),d=()=>{if(O)return null;const h=et(D,"warning");return Qe(h,{fallback:r.jsx("span",{className:s.statusIcon,style:a.statusIcon,children:h}),transform:_=>({className:ce(_.className,s.statusIcon),style:{..._.style,...a.statusIcon}})})};return k?null:r.jsx(Xe,{classNames:{mask:s.mask},styles:{mask:a.mask},resumeOnCancel:!0,getContainer:K,isOpen:U,mask:J,mountOnEnter:X,transitions:{mask:b(y?.mask,`${t}-fade-in`),content:b(y?.content,`${t}-zoom-in`)},unmountOnExit:Y,zIndex:G,onEnter:h=>i.prepare(h),onEntered:g,onEntering:()=>i.transform,onExit:()=>i.transform,onExited:I,onExiting:()=>i.transform,children:(h,_)=>r.jsx("div",{className:`${n}-wrapper`,style:l?void 0:{display:"none"},tabIndex:-1,onClick:C,children:r.jsx("div",{ref:h,className:ce(s.root,_.names()),style:{...a.root,..._.attrs()},children:c({name:"main",children:ne(r.jsx(Ke,{when:()=>!!(U||q),children:r.jsxs("div",{className:s.main,style:a.main,children:[se(),d(),pe(P)&&r.jsx("div",{className:s.header,style:a.header,children:r.jsx("span",{className:s.title,style:a.title,children:P})}),r.jsx("div",{className:s.body,style:a.body,children:V}),pe(T,w)&&r.jsx("div",{className:s.footer,style:a.footer,children:r.jsx(Ut,{_isJsxModal:O,_showCancel:F,cancelButtonProps:te,cancelText:ee,confirmButtonProps:Z,confirmLoading:Q,confirmText:j,footer:T,subscribe:x,onCancel:N,onOk:L})})]})}))})})})})}function Rt(o){return r.jsx(Be,{...o,_isJsxModal:!1})}function zt(o){return r.jsx(Be,{...o,_isJsxModal:!0})}function Ht({items:o}){return r.jsx(r.Fragment,{children:Array.from(o).map(([e,{config:t,isOpen:n}])=>m.createElement(Rt,{...t,key:e,isOpen:n},t.content))})}class At{_change;_prepare;_uniqueId=Je("m-");_bind=(e,t)=>{this._change=e,this._prepare=t};append=(e,t)=>{this._change(n=>{const s=new Map(n);return s.set(e,{config:t,isOpen:!0}),s})};update=(e,t)=>{this._change(n=>{const s=n.get(e);if(!s)return n;const a=new Map(n);return a.set(e,{...s,config:{...s.config,...t}}),a})};close=e=>{this._change(t=>{const n=t.get(e);if(!n)return t;const s=new Map(t);return s.set(e,{...n,isOpen:!1}),s})};finish=e=>{this._change(t=>{if(!t.has(e))return t;const n=new Map(t);return n.delete(e),n})};generate=e=>{const{promise:t,resolve:n}=Ee();return{promise:t,wrap:(s,a,i=!1)=>{const l=()=>{n(a),this.close(e)};return c=>{const u=s?.(c);return i||!de(u)?l():u.then(l)}}}};confirm=e=>{const t=this._uniqueId(),{promise:n,wrap:s}=this.generate(t),a=this._prepare(e);return a.onOk=s(e.onOk,!0),a.onCancel=s(e.onCancel,!1),a.onClosed=qe(e.onClosed,()=>{this.finish(t)}),a._onDismiss=s(e.onCancel,!1,!0),a._showCancel=!w(e.onCancel)||a.type==="confirm",this.append(t,a),{then:i=>n.then(i),update:i=>{this.update(t,i)},close:()=>{this.close(t)}}};expose=()=>{const{confirm:e}=this;return Object.assign(ve().reduce((t,n)=>(t[n]=s=>e({...s,type:n}),t),{}),{confirm:e})}}function Ne(){const[o,e]=m.useState(()=>new Map),t=ue(()=>new At);return ye(()=>{t._bind(s=>{e(s)},s=>A(s,Ye(dt,ht)))}),[m.useMemo(()=>t.expose(),[t]),r.jsx(Ht,{items:o},"modal-holder")]}const S=Object.assign(zt,kt.expose(),{useModal:Ne});function Xt(){const[o,e]=m.useState(!1);return r.jsxs(r.Fragment,{children:[r.jsx(p,{variant:"solid",onClick:()=>e(!0),children:"Open Modal"}),r.jsxs(S,{isOpen:o,title:"Basic Modal",onCancel:()=>{e(!1)},onOk:()=>{e(!1)},children:[r.jsx("p",{children:"Some contents..."}),r.jsx("p",{children:"Some contents..."}),r.jsx("p",{children:"Some contents..."})]})]})}const Yt={metaInfo:{"zh-CN":`基本的对话框使用方式。

`,"en-US":`Basic modal usage.

`},rawText:`\`\`\`tsx
import { useState } from 'react'
import { Button, Modal } from '@mink-ui/core'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="solid" onClick={() => setIsOpen(true)}>Open Modal</Button>

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
`,cssName:"css-612a8888",relPath:"packages/core/src/modal/__docs__/examples/basic.md"},Ie=m.createContext(null),Oe=m.createContext(null),R={title:"Use Hook!",onOk:async()=>{await new Promise(o=>setTimeout(o,1e3))},content:r.jsxs(r.Fragment,{children:[r.jsx(Ie.Consumer,{children:o=>`Reachable: ${o}!`}),r.jsx("br",{}),r.jsx(Oe.Consumer,{children:o=>`Unreachable: ${o}!`})]})};function Qt(){const[o,e]=S.useModal();return r.jsxs(Ie,{value:"Light",children:[r.jsxs(we,{children:[r.jsx(p,{theme:"info",onClick:()=>{o.confirm(R)},children:"Confirm"}),r.jsx(p,{theme:"info",onClick:()=>{o.warning(R)},children:"Warning"}),r.jsx(p,{theme:"info",onClick:()=>{o.info(R)},children:"Info"}),r.jsx(p,{theme:"info",onClick:()=>{o.error(R)},children:"Error"})]}),e,r.jsx(Oe,{value:"Bamboo"})]})}const Zt={metaInfo:{"zh-CN":`通过 Modal.useModal 创建支持读取 context 的 contextHolder。其中仅有 hooks 方法支持 Promise await 操作。

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
`,cssName:"css-42037374",relPath:"packages/core/src/modal/__docs__/examples/hook.md"},z={title:"Static Method",onOk:async()=>{await new Promise(o=>setTimeout(o,1e3))},content:r.jsx("div",{children:"modal content"})};function en(){return r.jsxs(we,{children:[r.jsx(p,{theme:"info",onClick:async()=>{const o=await S.confirm(z);console.log("Confirmed: ",o)},children:"Confirm"}),r.jsx(p,{theme:"info",onClick:()=>{S.warning(z)},children:"Warning"}),r.jsx(p,{theme:"info",onClick:()=>{S.info(z)},children:"Info"}),r.jsx(p,{theme:"info",onClick:()=>{S.error(z)},children:"Error"})]})}const tn={metaInfo:{"zh-CN":`通过 Modal.confirm 直接 Modal。

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
`,cssName:"css-3a0fce38",relPath:"packages/core/src/modal/__docs__/examples/static.md"},nn=[{name:"open",type:"boolean","zh-CN":"是否显示弹窗","en-US":"Whether the modal is visible"},{name:"onClose",type:"() => void","zh-CN":"关闭回调","en-US":"Callback when the modal is closed"},{name:"title",type:"React.ReactNode","zh-CN":"弹窗标题","en-US":"Modal title"},{name:"footer",type:["React.ReactNode","null"],"zh-CN":"底部内容，设为 null 时不显示","en-US":"Footer content, hidden when set to null"},{name:"closable",type:"boolean",defaultValue:"true","zh-CN":"是否显示关闭按钮","en-US":"Whether to show the close button"},{name:"maskClosable",type:"boolean",defaultValue:"true","zh-CN":"点击遮罩层是否关闭","en-US":"Whether to close on mask click"},{name:"mask",type:"boolean",defaultValue:"true","zh-CN":"是否显示遮罩层","en-US":"Whether to show the mask"},{name:"width",type:["number","string"],"zh-CN":"弹窗宽度","en-US":"Modal width"},{name:"centered",type:"boolean",defaultValue:"true","zh-CN":"是否居中显示","en-US":"Whether to center the modal"},{name:"children",type:"React.ReactNode","zh-CN":"组件内容","en-US":"Component content"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"classNames",type:"Record<'root', string>","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"styles",type:"Record<'root', React.CSSProperties>","zh-CN":"自定义样式","en-US":"Custom style"}];export{Xt as A,Yt as M,nn as P,Zt as a,Qt as b,tn as c,en as d};
