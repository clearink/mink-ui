import{p as ke,n as M,O as E,P as le,x as _e,Q as ae,z as ue,A as ye,r as h,j as r,T as Oe,U as me,J as N,k as j,e as Te,I as ze,s as Fe,F as re,v as Re,a as he,D as Se,m as He,c as ce,f as b,b as Ae,B as fe,d as Le,G as Ve,V as We,E as De,W as Je,X as Ke}from"./index-C9J8-4R_.js";import{u as qe,B as p,S as Ge,i as pe}from"./index-DXav_JKQ.js";import{s as A,u as Me,O as Xe,p as Ye}from"./index-BUiSimNe.js";import{S as je}from"./index-BHiAPH_7.js";import{i as we}from"./keyboard-C4wnD4uN.js";import{c as Qe}from"./children-iXojJHex.js";import{n as Ze,m as et,g as ve}from"./closable-CtS302WC.js";import{i as de,C as tt}from"./index-oARu9PLq.js";const be={position:"fixed",overflow:"hidden",width:0,height:0,top:-1,left:-1,padding:0};function nt(s,e){let t=s.nextElementSibling;const n=[];for(;t&&t!==e;)n.push(t),t=t.nextElementSibling;return n}function H(s){s&&ke(s.focus)&&s.focus({preventScroll:!0})}class ot{_stack=[];_subscribers=0;_keydownCleanup=M;_focusinCleanup=M;init=e=>{const t=n=>o=>{const a=_e(this._stack,-1);a&&a[n](o)};this._keydownCleanup=E(e,"keydown",t("onKeyDown"),!0),this._focusinCleanup=E(e,"focusin",t("onFocusIn"))};clear=()=>{this._keydownCleanup(),this._focusinCleanup()};subscribe=e=>le?(this._subscribers++===0&&this.init(e),()=>{--this._subscribers===0&&this.clear(),this._subscribers=Math.max(this._subscribers,0)}):M;register=e=>(this._stack.push(e),()=>{this._stack=this._stack.filter(t=>t!==e)})}const Ce=new ot;class st{_props={};_isShiftTab=!1;_latestFocus=null;_savedElement=null;$start={current:null};$end={current:null};get start(){return this.$start.current}get end(){return this.$end.current}_bind=e=>{this._props=e};restoreFocus=()=>{const{returnFocus:e}=this._props;e&&H(this._savedElement)};handleFocus=(e,t)=>{if(!t||!this.start||!this.end)return;const n=nt(this.start,this.end);if(!n.length)return;const o=e.activeElement;if(o!==this.start&&o!==this.end){if(n.some(a=>a===t||a.contains(t))){this._latestFocus=t;return}if(this._latestFocus)return H(this._latestFocus)}H(this._isShiftTab?this.end:this.start)};subscribe=()=>Ce.subscribe(ae());activate=e=>{if(!e)return;const t=ae(this.start);this._savedElement=t.activeElement;const n=Ce.register({onKeyDown:o=>{this._isShiftTab=o.shiftKey&&we(o.key,"tab"),this.handleFocus(t,o.target)},onFocusIn:o=>{o.stopImmediatePropagation(),this.handleFocus(t,o.target)}});return()=>{n(),this.restoreFocus(),this._latestFocus=null,this._savedElement=null}}}function at(s){const{ref:e,active:t}=s,n=ue(()=>new st);return ye(()=>{n._bind(s)}),h.useImperativeHandle(e,()=>({focus:()=>{H(n.start)}}),[n]),h.useEffect(()=>n.subscribe(),[n]),h.useEffect(()=>n.activate(!!t),[t,n]),{omitted:s,ctrl:n}}function rt(s){const{omitted:e,ctrl:t}=at(s),{children:n,active:o}=e;return r.jsxs(r.Fragment,{children:[r.jsx("div",{ref:t.$start,style:be,tabIndex:o?0:-1}),n,r.jsx("div",{ref:t.$end,style:be,tabIndex:o?0:-1})]})}class ct{_stack=[];_lockDuration=200;_lastEndTime=0;_subscribers=0;_keydownCleanup=M;_composedCleanup=M;init=()=>{const e=Oe();this._composedCleanup=E(e,"compositionend",()=>{this._lastEndTime=me()}),this._keydownCleanup=E(e,"keydown",t=>{!we(t.key,"esc")||t.isComposing||me()-this._lastEndTime<this._lockDuration||_e(this._stack,-1)?.(t)})};clear=()=>{this._keydownCleanup(),this._composedCleanup()};subscribe=()=>{if(le)return this._subscribers++===0&&this.init(),()=>{--this._subscribers===0&&this.clear(),this._subscribers=Math.max(this._subscribers,0)}};activate=(e,t)=>{if(e)return this._stack.push(t),()=>{this._stack=this._stack.filter(n=>n!==t)}}}const xe=new ct;function it(s,e){const t=N(e);h.useEffect(()=>xe.subscribe(),[]),h.useEffect(()=>xe.activate(s,t),[s,t])}function se(s){const e=s?.focusable;return e===!0?{}:e}function lt(s){const{currentState:e,contextState:t,defaultState:n}=s,o=[se(e),se(t),se(n)];return o.find(l=>!j(l))&&A(...o.filter(l=>!!l),{focusTrap:!0,returnFocus:!0})||void 0}function ut(s){const{currentState:e,contextState:t,defaultState:n}=s,o=A(e?.slots||{},t?.slots||{},n?.slots||{});return a=>{const{name:i,params:l,children:c}=a,u=o[i];return u?u(c,l):c}}const v={keyboard:!0,maskClosable:!0,centered:!1,closable:!0,focusable:!0},dt={width:416,type:"confirm",closable:!1,maskClosable:!1},mt=Te()(["width","type","closable","maskClosable"]);class ht{_subjects=new Map;on=(e,t)=>{const n=this._subjects.get(e)||new Set;return this._subjects.set(e,n.add(t)),()=>this.off(e,t)};off=(e,t)=>{const n=this._subjects.get(e);n&&(n.delete(t),n.size||this._subjects.delete(e))};emit=(e,...t)=>{const n=this._subjects.get(e);n&&n.forEach(o=>o(...t))}}class ft{_listeners=new Set;_subscribers=0;_cleanup=null;init=()=>{const e=ae().documentElement;this._cleanup=E(e,"click",t=>{this._listeners.forEach(n=>{n(t)})},!0)};clear=()=>{this._cleanup?.(),this._cleanup=null};subscribe=()=>{if(le)return this._subscribers++===0&&this.init(),()=>{--this._subscribers===0&&this.clear(),this._subscribers=Math.max(this._subscribers,0)}};activate=(e,t)=>{if(e)return this._listeners.add(t),()=>{this._listeners.delete(t)}}}const ge=new ft;class pt{_cleanup=null;position=void 0;clear=()=>{this._cleanup?.(),this._cleanup=null};sync=e=>{const t=e.target,n=e.detail===0||!e.pageX&&!e.pageY,o=n&&t?t.getBoundingClientRect():null;!o&&n?this.position=void 0:o?this.position={x:o.left+o.width/2,y:o.top+o.height/2}:this.position={x:e.clientX,y:e.clientY},this.clear(),this._cleanup=ze(200,()=>{this.position=void 0})};subscribe=()=>{ge.subscribe(),ge.activate(!0,this.sync)}}const Ne=new pt;Ne.subscribe();class bt{$$channel=new ht;confirm=!1;cancel=!1;emit=(e,t)=>{this[e]=t,this.$$channel.emit(e,t)};on=(e,t)=>this.$$channel.on(e,t);resolve=(e,t,n,o)=>{if(e||!de(n))return o?.();this.emit(t,!0),n.then(()=>{this.emit(t,!1),o?.()},()=>{this.emit(t,!1)})};reset=()=>{this.emit("confirm",!1),this.emit("cancel",!1)}}class Ct{$$loading=new bt;$trap={current:null};transform=void 0;get trap(){return this.$trap.current}prepare=e=>{this.trap?.focus();const t=Ne.position;if(!t)return this.transform;const n=e.getBoundingClientRect(),o=t.x-n.left-(n.width-e.offsetWidth)/2,a=t.y-n.top-(n.height-e.offsetHeight)/2;return this.transform={transformOrigin:`${o}px ${a}px`},this.transform};reset=()=>{this.transform=void 0}}function xt(s,e){const t=Object.keys(s),n=Object.keys(e);return t.length!==n.length?!1:t.every(o=>re(s[o],e[o]))}function gt(s,e){if(j(e))return;if(!Fe(e))return{width:e};const t={},n=(o,a)=>{j(a)||(t[`--${s}-${o}-width`]=Re(a)?`${a}px`:`${a}`)};return n("xs",e.xs),n("sm",e.sm),n("md",e.md),n("lg",e.lg),n("xl",e.xl),n("xxl",e.xxl),t}function kt(s,e){const{centered:t}=s,{_isJsxModal:n,prefixCls:o,width:a,type:i}=e,l=he(f=>f),c=he("modal",o),u=Se(()=>gt(c,a),[c,a],He);return{rns:l,ns:c,cssVars:u,classNames:{root:ce(c,{[`${c}--centered`]:t,[`${c}--confirm`]:!n,[`${c}--confirm-${i}`]:!n&&i}),mask:`${c}-mask`,main:`${c}__main`,header:`${c}__header`,title:`${c}__title`,statusIcon:`${c}__status-icon`,closeBtn:`${c}__close-btn`,body:`${c}__body`,footer:`${c}__footer`}}}function _t(s){const e=qe("modal"),{_isJsxModal:t,_onDismiss:n,isOpen:o,confirmLoading:a,slots:i,onOk:l,onCancel:c,onOpened:u,onClosed:f,keyboard:_=b(e.keyboard,v.keyboard),maskClosable:C=b(e.maskClosable,v.maskClosable),centered:L=b(e.centered,v.centered),closable:$=b(e.closable,v.closable),focusable:V=b(e.focusable,v.focusable)}=s,g=s,P={maskClosable:C,centered:L,closable:$},x=ue(()=>new Ct),[I,U]=h.useState(o),{rns:W,ns:D,cssVars:O,classNames:T}=kt(P,g),[J,z]=Ae([e.classNames,{root:e.className},T,g.classNames,{root:g.className}],[e.styles,{root:e.style},g.styles,{root:g.style},{root:O}],{meta:{...g,...P}}),K=ut({currentState:{slots:i},contextState:{slots:e.slots}}),q=lt({currentState:{focusable:V},contextState:{focusable:e.focusable},defaultState:{focusable:!0}}),[y,G]=Ze({currentState:{closable:$},contextState:{closable:e.closable}}),X=N((d,m)=>t?M:x.$$loading.on(d,m)),Y=N(d=>{t&&a||!t&&x.$$loading.confirm||x.$$loading.resolve(t,"confirm",l?.(d))}),Q=N(d=>{t&&a||!t&&x.$$loading.cancel||x.$$loading.resolve(t,"cancel",c?.(d),y?.onClose)}),w=N(d=>{t&&a||(t?c?.(d):n?.(d),y?.onClose?.())}),Z=d=>{C&&d.target===d.currentTarget&&w(d)},ee=()=>{u?.()},te=()=>{U(!1),f?.(),y?.onClosed?.(),x.reset()},ne=fe(!!o,()=>{U(!0)},(d,m)=>!d||re(d,m)),oe=fe(t,()=>{x.$$loading.reset()},(d,m)=>!d||re(d,m));return it(!!o&&!!_,w),{omitted:g,rns:W,ns:D,cssNames:J,cssAttrs:z,ctrl:x,visible:I,renderSlots:K,focusableState:q,closeIconRender:G,returnEmpty:ne||oe,subscribe:X,handleOk:Y,handleCancel:Q,handleDismiss:w,handleEntered:ee,handleExited:te,handleClick:Z}}const B=Le("ModalFooterContext",{});function yt(s){const{_showCancel:e,confirmLoading:t,confirmText:n,confirmButtonProps:o,cancelText:a,cancelButtonProps:i,subscribe:l,onOk:c,onCancel:u}=s,f=Se(()=>({_showCancel:e,confirmText:n,confirmLoading:t,confirmButtonProps:o,cancelText:a,cancelButtonProps:i,subscribe:l,onOk:c,onCancel:u}),{_showCancel:e,confirmText:n,confirmLoading:t,confirmButtonProps:o,cancelText:a,cancelButtonProps:i,subscribe:l,onOk:c,onCancel:u},xt);return{omitted:s,modalFooterContextValue:f}}function St(){const s=B.use(),{cancelButtonProps:e,cancelText:t,onCancel:n}=s,{theme:o="info",children:a=b(t,"取消"),onClick:i=n}=e||{};return{picked:{children:a,theme:o,onClick:i},omitted:e}}function Mt(){const s=B.use(),{confirmLoading:e,confirmText:t,confirmButtonProps:n,onOk:o}=s,{variant:a="solid",loading:i=e,children:l=b(t,"确认"),onClick:c=o}=n||{};return{picked:{children:l,variant:a,loading:i,onClick:c},omitted:n}}function jt(){const s=B.use(),{_showCancel:e,cancelText:t,cancelButtonProps:n,subscribe:o,onCancel:a}=s,{theme:i="info",loading:l,children:c=b(t,"取消"),onClick:u=a}=n||{},f={children:c,theme:i,onClick:u},[_,C]=Me(l,()=>!1);return h.useEffect(()=>o?.("cancel",C),[o,C]),{omitted:n,picked:f,isLoading:_,visible:e}}function wt(){const s=B.use(),{confirmText:e,confirmButtonProps:t,subscribe:n,onOk:o}=s,{loading:a,theme:i="primary",variant:l="solid",children:c=b(e,"确认"),onClick:u=o}=t||{},f={children:c,theme:i,variant:l,onClick:u},[_,C]=Me(a,()=>!1);return h.useEffect(()=>n?.("confirm",C),[n,C]),{omitted:t,picked:f,isLoading:_}}function vt(){const{picked:s,omitted:e}=St();return r.jsx(p,{...e,...s})}function Nt(){const{picked:s,omitted:e}=Mt();return r.jsx(p,{...e,...s})}function Et(){const{picked:s,omitted:e,isLoading:t,visible:n}=jt();return n?r.jsx(p,{...e,...s,loading:t}):null}function Bt(){const{picked:s,omitted:e,isLoading:t}=wt();return r.jsx(p,{...e,...s,loading:t})}function $t(s){const{omitted:e,modalFooterContextValue:t}=yt(s),{_isJsxModal:n,footer:o}=e,a=()=>{const i=ke(o);if(!i&&!j(o))return o;const u={cancelButton:n?r.jsx(vt,{}):r.jsx(Et,{}),confirmButton:n?r.jsx(Nt,{}):r.jsx(Bt,{})},f=r.jsxs(r.Fragment,{children:[u.cancelButton,u.confirmButton]});return r.jsx(B,{value:t,children:i?o(f,u):f})};return r.jsx(Ve,{value:!1,children:a()})}function Ee(s){const{omitted:e,rns:t,ns:n,cssNames:o,cssAttrs:a,ctrl:i,visible:l,renderSlots:c,focusableState:u,closeIconRender:f,returnEmpty:_,subscribe:C,handleOk:L,handleCancel:$,handleDismiss:V,handleEntered:g,handleExited:P,handleClick:x}=_t(s),{_isJsxModal:I,_showCancel:U,children:W,type:D,title:O,footer:T,mask:J,isOpen:z,fresh:K,zIndex:q,transitions:y,getContainer:G,mountOnEnter:X,unmountOnExit:Y,confirmLoading:Q,confirmText:w,confirmButtonProps:Z,cancelText:ee,cancelButtonProps:te}=e,ne=m=>{const{focusTrap:k,returnFocus:Ue}=u||{};return k?r.jsx(rt,{ref:i.$trap,active:l,returnFocus:Ue,children:m}):m},oe=()=>f((m,k)=>r.jsx("button",{className:o.closeBtn,style:a.closeBtn,disabled:k,tabIndex:0,type:"button",onClick:V,children:m})),d=()=>{if(I)return null;const m=et(D,"warning");return Qe(m,{fallback:r.jsx("span",{className:o.statusIcon,style:a.statusIcon,children:m}),transform:k=>({className:ce(k.className,o.statusIcon),style:{...k.style,...a.statusIcon}})})};return _?null:r.jsx(Xe,{classNames:{mask:o.mask},styles:{mask:a.mask},resumeOnCancel:!0,getContainer:G,isOpen:z,mask:J,mountOnEnter:X,transitions:{mask:b(y?.mask,`${t}-fade-in`),content:b(y?.content,`${t}-zoom-in`)},unmountOnExit:Y,zIndex:q,onEnter:m=>i.prepare(m),onEntered:g,onEntering:()=>i.transform,onExit:()=>i.transform,onExited:P,onExiting:()=>i.transform,children:(m,k)=>r.jsx("div",{className:`${n}-wrapper`,style:l?void 0:{display:"none"},tabIndex:-1,onClick:x,children:r.jsx("div",{ref:m,className:ce(o.root,k.names()),style:{...a.root,...k.attrs()},children:c({name:"main",children:ne(r.jsx(Ge,{when:()=>!!(z||K),children:r.jsxs("div",{className:o.main,style:a.main,children:[oe(),d(),pe(O)&&r.jsx("div",{className:o.header,style:a.header,children:r.jsx("span",{className:o.title,style:a.title,children:O})}),r.jsx("div",{className:o.body,style:a.body,children:W}),pe(T,j)&&r.jsx("div",{className:o.footer,style:a.footer,children:r.jsx($t,{_isJsxModal:I,_showCancel:U,cancelButtonProps:te,cancelText:ee,confirmButtonProps:Z,confirmLoading:Q,confirmText:w,footer:T,subscribe:C,onCancel:$,onOk:L})})]})}))})})})})}function Pt(s){return r.jsx(Ee,{...s,_isJsxModal:!1})}function It(s){return r.jsx(Ee,{...s,_isJsxModal:!0})}function Ut({items:s}){return r.jsx(r.Fragment,{children:Array.from(s).map(([e,{config:t,isOpen:n}])=>h.createElement(Pt,{...t,key:e,isOpen:n},t.content))})}function Be(){let s,e;return{promise:new Promise((n,o)=>{s=n,e=o}),resolve:s,reject:e}}class Ot{_change;_prepare;_uniqueId=We("m-");_bind=(e,t)=>{this._change=e,this._prepare=t};append=(e,t)=>{this._change(n=>{const o=new Map(n);return o.set(e,{config:t,isOpen:!0}),o})};update=(e,t)=>{this._change(n=>{const o=n.get(e);if(!o)return n;const a=new Map(n);return a.set(e,{...o,config:{...o.config,...t}}),a})};close=e=>{this._change(t=>{const n=t.get(e);if(!n)return t;const o=new Map(t);return o.set(e,{...n,isOpen:!1}),o})};finish=e=>{this._change(t=>{if(!t.has(e))return t;const n=new Map(t);return n.delete(e),n})};generate=e=>{const{promise:t,resolve:n}=Be();return{promise:t,wrap:(o,a,i=!1)=>{const l=()=>{n(a),this.close(e)};return c=>{const u=o?.(c);return i||!de(u)?l():u.then(l)}}}};confirm=e=>{const t=this._uniqueId(),{promise:n,wrap:o}=this.generate(t),a=this._prepare(e);return a.onOk=o(e.onOk,!0),a.onCancel=o(e.onCancel,!1),a.onClosed=De(e.onClosed,()=>{this.finish(t)}),a._onDismiss=o(e.onCancel,!1,!0),a._showCancel=!j(e.onCancel)||a.type==="confirm",this.append(t,a),{then:i=>n.then(i),update:i=>{this.update(t,i)},close:()=>{this.close(t)}}};expose=()=>{const{confirm:e}=this;return Object.assign(ve().reduce((t,n)=>(t[n]=o=>e({...o,type:n}),t),{}),{confirm:e})}}function $e(){const[s,e]=h.useState(()=>new Map),t=ue(()=>new Ot);return ye(()=>{t._bind(o=>{e(o)},o=>A(o,Ye(dt,mt)))}),[h.useMemo(()=>t.expose(),[t]),r.jsx(Ut,{items:s},"modal-holder")]}const Tt={};class zt{_config={...Tt};get=()=>({...this._config});set=e=>{this._config=A(e,this.get())}}const ie=new zt;function Ft(s){const{ref:e}=s,[t,n]=h.useState(()=>ie.get()),[o,a]=$e();return h.useImperativeHandle(e,()=>({get confirm(){return o.confirm},sync:()=>{n(ie.get())}}),[o,n]),{ctxHolder:a,modalConfig:t}}function Rt(s){const{ctxHolder:e,modalConfig:t}=Ft(s);return r.jsx(tt,{modal:t,children:e})}class Ht{_cleanup=null;_container=null;_callbacks=[];ensure=()=>this._container?this._container:new Promise(e=>{Je.createRoot(document.createDocumentFragment()).render(r.jsx(h.StrictMode,{children:r.jsx(Rt,{ref:t=>{e(this._container??=t)}})}))});clear=()=>{this._cleanup?.(),this._cleanup=null};flush=()=>{this.clear(),this._cleanup=Ke(()=>{const e=this.ensure(),t=n=>{n.sync(),this._callbacks.forEach(o=>{o(n)}),this._callbacks.length=0};de(e)?e.then(t):t(e)})};config=e=>{ie.set(e),this._container?.sync()};confirm=e=>{const{promise:t,resolve:n}=Be();return this._callbacks.push(o=>{n({inner:o.confirm(e)})}),this.flush(),{then:o=>t.then(({inner:a})=>{a.then(o)}),update:o=>{t.then(({inner:a})=>{a.update(o)})},close:()=>{t.then(({inner:o})=>{o.close()})}}};expose=()=>{const{confirm:e,config:t}=this;return Object.assign(ve().reduce((n,o)=>(n[o]=a=>e({...a,type:o}),n),{}),{confirm:e,config:t})}}const At=new Ht,S=Object.assign(It,At.expose(),{useModal:$e});function Xt(){const[s,e]=h.useState(!1);return r.jsxs(r.Fragment,{children:[r.jsx(p,{variant:"solid",onClick:()=>e(!0),children:"Open Modal"}),r.jsxs(S,{isOpen:s,title:"Basic Modal",onCancel:()=>{e(!1)},onOk:()=>{e(!1)},children:[r.jsx("p",{children:"Some contents..."}),r.jsx("p",{children:"Some contents..."}),r.jsx("p",{children:"Some contents..."})]})]})}const Yt={metaInfo:{"zh-CN":`基本的对话框使用方式。

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
`,cssName:"css-612a8888",relPath:"packages/core/src/modal/__docs__/examples/basic.md"},Pe=h.createContext(null),Ie=h.createContext(null),F={title:"Use Hook!",onOk:async()=>{await new Promise(s=>setTimeout(s,1e3))},content:r.jsxs(r.Fragment,{children:[r.jsx(Pe.Consumer,{children:s=>`Reachable: ${s}!`}),r.jsx("br",{}),r.jsx(Ie.Consumer,{children:s=>`Unreachable: ${s}!`})]})};function Qt(){const[s,e]=S.useModal();return r.jsxs(Pe,{value:"Light",children:[r.jsxs(je,{children:[r.jsx(p,{theme:"info",onClick:()=>{s.confirm(F)},children:"Confirm"}),r.jsx(p,{theme:"info",onClick:()=>{s.warning(F)},children:"Warning"}),r.jsx(p,{theme:"info",onClick:()=>{s.info(F)},children:"Info"}),r.jsx(p,{theme:"info",onClick:()=>{s.error(F)},children:"Error"})]}),e,r.jsx(Ie,{value:"Bamboo"})]})}const Zt={metaInfo:{"zh-CN":`通过 Modal.useModal 创建支持读取 context 的 contextHolder。其中仅有 hooks 方法支持 Promise await 操作。

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
`,cssName:"css-42037374",relPath:"packages/core/src/modal/__docs__/examples/hook.md"},R={title:"Static Method",onOk:async()=>{await new Promise(s=>setTimeout(s,1e3))},content:r.jsx("div",{children:"modal content"})};function en(){return r.jsxs(je,{children:[r.jsx(p,{theme:"info",onClick:async()=>{const s=await S.confirm(R);console.log("Confirmed: ",s)},children:"Confirm"}),r.jsx(p,{theme:"info",onClick:()=>{S.warning(R)},children:"Warning"}),r.jsx(p,{theme:"info",onClick:()=>{S.info(R)},children:"Info"}),r.jsx(p,{theme:"info",onClick:()=>{S.error(R)},children:"Error"})]})}const tn={metaInfo:{"zh-CN":`通过 Modal.confirm 直接 Modal。

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
`,cssName:"css-3a0fce38",relPath:"packages/core/src/modal/__docs__/examples/static.md"},nn=[{name:"cancelButtonProps",type:"ButtonProps","zh-CN":"取消按钮属性","en-US":"Props for the cancel button"},{name:"cancelText",type:"string","zh-CN":"取消按钮文本","en-US":"Text for the cancel button"},{name:"centered",type:"boolean",defaultValue:"false","zh-CN":"是否垂直居中","en-US":"Whether to center the modal vertically"},{name:"children",type:"React.ReactNode","zh-CN":"子元素（弹窗内容）","en-US":"Children (modal content)"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"classNames",type:"Partial<Record<'mask' | 'root' | 'main' | 'header' | 'title' | 'statusIcon' | 'closeBtn' | 'body' | 'footer', string | ((props: ModalProps) => string)>>","zh-CN":"语义化类名，支持按 slot 自定义","en-US":"Semantic class names by slot"},{name:"closable",type:["boolean","CommonClosable"],defaultValue:"true","zh-CN":"是否可关闭，传入对象可配置关闭图标、禁用及回调","en-US":"Whether the modal is closable, pass an object to configure close icon, disabled state and callbacks"},{name:"confirmButtonProps",type:"ButtonProps","zh-CN":"确认按钮属性","en-US":"Props for the confirm button"},{name:"confirmLoading",type:"boolean | { delay?: number }","zh-CN":"确认按钮加载状态","en-US":"Loading state of the confirm button"},{name:"confirmText",type:"string","zh-CN":"确认按钮文本","en-US":"Text for the confirm button"},{name:"focusable",type:["boolean","{ focusTrap?: boolean; returnFocus?: boolean }"],defaultValue:"true","zh-CN":"是否可聚焦，传入对象可配置焦点捕获与返回","en-US":"Whether the modal is focusable, pass an object to configure focus trap and return"},{name:"footer",type:["React.ReactNode","(element: ReactNode, params: { confirmButton: ReactNode; cancelButton: ReactNode }) => ReactNode"],"zh-CN":"底部内容，支持自定义渲染函数","en-US":"Footer content, supports custom render function"},{name:"fresh",type:"boolean","zh-CN":"关闭后仍更新 modal 内容","en-US":"Keep updating modal content after close"},{name:"getContainer",type:"() => HTMLElement","zh-CN":"指定弹窗挂载的容器","en-US":"Specify the container to mount the modal"},{name:"isOpen",type:"boolean","zh-CN":"是否显示弹窗","en-US":"Whether the modal is visible"},{name:"keyboard",type:"boolean",defaultValue:"true","zh-CN":"是否支持 Esc 键关闭","en-US":"Whether to close on Esc key press"},{name:"mask",type:"boolean",defaultValue:"true","zh-CN":"是否显示遮罩层","en-US":"Whether to show the mask"},{name:"maskClosable",type:"boolean",defaultValue:"true","zh-CN":"点击遮罩层是否关闭","en-US":"Whether to close on mask click"},{name:"mountOnEnter",type:"boolean",defaultValue:"true","zh-CN":"进入动画开始时挂载节点","en-US":"Mount the node on enter transition"},{name:"onCancel",type:"(event: MouseEvent | KeyboardEvent) => void","zh-CN":"取消回调","en-US":"Callback when the modal is cancelled"},{name:"onClosed",type:"() => void","zh-CN":"完全关闭后触发","en-US":"Callback after the modal is fully closed"},{name:"onOk",type:"(event: MouseEvent) => void","zh-CN":"确认回调","en-US":"Callback when the modal is confirmed"},{name:"onOpened",type:"() => void","zh-CN":"完全打开后触发","en-US":"Callback after the modal is fully opened"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"slots",type:"{ main?: (node: ReactNode) => ReactNode }","zh-CN":"自定义 slot 渲染","en-US":"Custom slot rendering"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"styles",type:"Partial<Record<'mask' | 'root' | 'main' | 'header' | 'title' | 'statusIcon' | 'closeBtn' | 'body' | 'footer', React.CSSProperties | ((props: ModalProps) => React.CSSProperties)>>","zh-CN":"语义化样式，支持按 slot 自定义","en-US":"Semantic styles by slot"},{name:"title",type:"React.ReactNode","zh-CN":"弹窗标题","en-US":"Modal title"},{name:"transitions",type:"Partial<Record<'mask' | 'content', CssTransitionProps['classNames']>>","zh-CN":"动效配置，支持 mask 和 content 分别设置","en-US":"Transition configuration for mask and content"},{name:"unmountOnExit",type:"boolean",defaultValue:"false","zh-CN":"退出动画结束后卸载节点","en-US":"Unmount the node on exit transition"},{name:"width",type:["number","string","Partial<Record<Breakpoint, number | string>>"],"zh-CN":"弹窗宽度，支持响应式断点配置","en-US":"Modal width, supports responsive breakpoint configuration"},{name:"zIndex",type:"number","zh-CN":"弹窗 z-index","en-US":"Modal z-index"}];export{Xt as A,Yt as M,nn as P,Zt as a,Qt as b,tn as c,en as d};
