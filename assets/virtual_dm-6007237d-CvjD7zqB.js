import{p as _e,n as M,U as B,V as le,x as ye,W as ae,A as ue,B as Se,r as h,j as r,X as ze,Y as he,J as E,k as j,e as Fe,I as Re,s as He,y as re,v as Ae,a as fe,E as Me,m as Le,c as ce,f as b,b as Ve,D as pe,g as We,G as De,Z as Je,F as qe,_ as Ge,$ as Ke}from"./index-W1RE6nsY.js";import{u as Xe,B as p,S as Ye,i as be}from"./index-CKwpuKI3.js";import{s as de,u as ve,O as Ze,p as Qe}from"./index-B_U17hxC.js";import{S as je}from"./index-vc16XwVB.js";import{i as we}from"./keyboard-C4wnD4uN.js";import{c as et}from"./children-TqxlpQT6.js";import{n as tt,m as nt,g as Ne}from"./closable-CD2_eZn_.js";import{n as ot}from"./slots-CW_vGGko.js";import{i as me,C as st}from"./index-Bp7OlkBN.js";const Ce={position:"fixed",overflow:"hidden",width:0,height:0,top:-1,left:-1,padding:0};function at(s,e){let t=s.nextElementSibling;const n=[];for(;t&&t!==e;)n.push(t),t=t.nextElementSibling;return n}function A(s){s&&_e(s.focus)&&s.focus({preventScroll:!0})}class rt{_stack=[];_subscribers=0;_keydownCleanup=M;_focusinCleanup=M;init=e=>{const t=n=>o=>{const a=ye(this._stack,-1);a&&a[n](o)};this._keydownCleanup=B(e,"keydown",t("onKeyDown"),!0),this._focusinCleanup=B(e,"focusin",t("onFocusIn"))};dispose=()=>{this._keydownCleanup(),this._focusinCleanup()};subscribe=e=>le?(this._subscribers++===0&&this.init(e),()=>{--this._subscribers===0&&this.dispose(),this._subscribers=Math.max(this._subscribers,0)}):M;register=e=>(this._stack.push(e),()=>{this._stack=this._stack.filter(t=>t!==e)})}const xe=new rt;class ct{_props={};_isShiftTab=!1;_latestFocus=null;_savedElement=null;$start={current:null};$end={current:null};get start(){return this.$start.current}get end(){return this.$end.current}_bind=e=>{this._props=e};restoreFocus=()=>{const{returnFocus:e}=this._props;e&&A(this._savedElement)};handleFocus=(e,t)=>{if(!t||!this.start||!this.end)return;const n=at(this.start,this.end);if(!n.length)return;const o=e.activeElement;if(o!==this.start&&o!==this.end){if(n.some(a=>a===t||a.contains(t))){this._latestFocus=t;return}if(this._latestFocus)return A(this._latestFocus)}A(this._isShiftTab?this.end:this.start)};subscribe=()=>xe.subscribe(ae());activate=e=>{if(!e)return;const t=ae(this.start);this._savedElement=t.activeElement;const n=xe.register({onKeyDown:o=>{this._isShiftTab=o.shiftKey&&we(o.key,"tab"),this.handleFocus(t,o.target)},onFocusIn:o=>{o.stopImmediatePropagation(),this.handleFocus(t,o.target)}});return()=>{n(),this.restoreFocus(),this._latestFocus=null,this._savedElement=null}}}function it(s){const{ref:e,active:t}=s,n=ue(()=>new ct);return Se(()=>{n._bind(s)}),h.useImperativeHandle(e,()=>({focus:()=>{A(n.start)}}),[n]),h.useEffect(()=>n.subscribe(),[n]),h.useEffect(()=>n.activate(!!t),[t,n]),{omitted:s,ctrl:n}}function lt(s){const{omitted:e,ctrl:t}=it(s),{children:n,active:o}=e;return r.jsxs(r.Fragment,{children:[r.jsx("div",{ref:t.$start,style:Ce,tabIndex:o?0:-1}),n,r.jsx("div",{ref:t.$end,style:Ce,tabIndex:o?0:-1})]})}class ut{_stack=[];_lockDuration=200;_lastEndTime=0;_subscribers=0;_keydownCleanup=M;_composeCleanup=M;init=()=>{const e=ze();this._composeCleanup=B(e,"compositionend",()=>{this._lastEndTime=he()}),this._keydownCleanup=B(e,"keydown",t=>{!we(t.key,"esc")||t.isComposing||he()-this._lastEndTime<this._lockDuration||ye(this._stack,-1)?.(t)})};dispose=()=>{this._keydownCleanup(),this._composeCleanup()};subscribe=()=>{if(le)return this._subscribers++===0&&this.init(),()=>{--this._subscribers===0&&this.dispose(),this._subscribers=Math.max(this._subscribers,0)}};activate=(e,t)=>{if(e)return this._stack.push(t),()=>{this._stack=this._stack.filter(n=>n!==t)}}}const ge=new ut;function dt(s,e){const t=E(e);h.useEffect(()=>ge.subscribe(),[]),h.useEffect(()=>ge.activate(s,t),[s,t])}function se(s){const e=s?.focusable;return e===!0?{}:e}function mt(s){const{currentState:e,contextState:t,defaultState:n}=s,o=[se(e),se(t),se(n)];return o.find(l=>!j(l))&&de(...o.filter(l=>!!l),{focusTrap:!0,returnFocus:!0})||void 0}const N={keyboard:!0,maskClosable:!0,centered:!1,closable:!0,focusable:!0},ht={width:416,type:"confirm",closable:!1,maskClosable:!1},ft=Fe()(["width","type","closable","maskClosable"]);class pt{_subjects=new Map;on=(e,t)=>{const n=this._subjects.get(e)||new Set;return this._subjects.set(e,n.add(t)),()=>this.off(e,t)};off=(e,t)=>{const n=this._subjects.get(e);n&&(n.delete(t),n.size||this._subjects.delete(e))};emit=(e,...t)=>{const n=this._subjects.get(e);n&&n.forEach(o=>o(...t))}}class bt{_listeners=new Set;_subscribers=0;_cleanup=null;init=()=>{const e=ae().documentElement;this._cleanup=B(e,"click",t=>{this._listeners.forEach(n=>{n(t)})},!0)};dispose=()=>{this._cleanup?.(),this._cleanup=null};subscribe=()=>{if(le)return this._subscribers++===0&&this.init(),()=>{--this._subscribers===0&&this.dispose(),this._subscribers=Math.max(this._subscribers,0)}};activate=(e,t)=>{if(e)return this._listeners.add(t),()=>{this._listeners.delete(t)}}}const ke=new bt;class Ct{_cleanup=null;position=void 0;sync=e=>{const t=e.target,n=e.detail===0||!e.pageX&&!e.pageY,o=n&&t?t.getBoundingClientRect():null;!o&&n?this.position=void 0:o?this.position={x:o.left+o.width/2,y:o.top+o.height/2}:this.position={x:e.clientX,y:e.clientY},this._cleanup?.(),this._cleanup=Re(200,()=>{this.position=void 0})};subscribe=()=>{ke.subscribe(),ke.activate(!0,this.sync)}}const Ee=new Ct;Ee.subscribe();class xt{$$channel=new pt;confirm=!1;cancel=!1;emit=(e,t)=>{this[e]=t,this.$$channel.emit(e,t)};on=(e,t)=>this.$$channel.on(e,t);resolve=(e,t,n,o)=>{if(e||!me(n))return o?.();this.emit(t,!0),n.then(()=>{this.emit(t,!1),o?.()},()=>{this.emit(t,!1)})};reset=()=>{this.emit("confirm",!1),this.emit("cancel",!1)}}class gt{$$loading=new xt;$trap={current:null};transform=void 0;get trap(){return this.$trap.current}prepare=e=>{this.trap?.focus();const t=Ee.position;if(!t)return this.transform;const n=e.getBoundingClientRect(),o=t.x-n.left-(n.width-e.offsetWidth)/2,a=t.y-n.top-(n.height-e.offsetHeight)/2;return this.transform={transformOrigin:`${o}px ${a}px`},this.transform};reset=()=>{this.transform=void 0}}function kt(s,e){return Object.keys(s).every(n=>re(s[n],e[n]))}function _t(s,e){if(j(e))return;if(!He(e))return{width:e};const t={},n=(o,a)=>{j(a)||(t[`--${s}-${o}-width`]=Ae(a)?`${a}px`:`${a}`)};return n("xs",e.xs),n("sm",e.sm),n("md",e.md),n("lg",e.lg),n("xl",e.xl),n("xxl",e.xxl),t}function yt(s,e){const{centered:t}=s,{_isJsxModal:n,prefixCls:o,width:a,type:i}=e,l=fe(f=>f),c=fe("modal",o),u=Me(()=>_t(c,a),[c,a],Le);return{rns:l,ns:c,cssVars:u,classNames:{root:ce(c,{[`${c}--centered`]:t,[`${c}--confirm`]:!n,[`${c}--confirm-${i}`]:!n&&i}),mask:`${c}-mask`,main:`${c}__main`,header:`${c}__header`,title:`${c}__title`,statusIcon:`${c}__status-icon`,closeBtn:`${c}__close-btn`,body:`${c}__body`,footer:`${c}__footer`}}}function St(s){const e=Xe("modal"),{_isJsxModal:t,_onDismiss:n,isOpen:o,confirmLoading:a,slots:i,onOk:l,onCancel:c,onOpened:u,onClosed:f,keyboard:k=b(e.keyboard,N.keyboard),maskClosable:_=b(e.maskClosable,N.maskClosable),centered:L=b(e.centered,N.centered),closable:P=b(e.closable,N.closable),focusable:V=b(e.focusable,N.focusable)}=s,x=s,I={maskClosable:_,centered:L,closable:P},C=ue(()=>new gt),[U,O]=h.useState(o),{rns:W,ns:D,cssVars:T,classNames:z}=yt(I,x),[J,F]=Ve([e.classNames,{root:e.className},z,x.classNames,{root:x.className}],[e.styles,{root:e.style},x.styles,{root:x.style},{root:T}],{meta:{...x,...I}}),q=ot({currentState:{slots:i},contextState:{slots:e.slots}}),G=mt({currentState:{focusable:V},contextState:{focusable:e.focusable},defaultState:{focusable:!0}}),[y,K]=tt({currentState:{closable:P},contextState:{closable:e.closable}}),X=E((d,m)=>t?M:C.$$loading.on(d,m)),Y=E(d=>{t&&a||!t&&C.$$loading.confirm||C.$$loading.resolve(t,"confirm",l?.(d))}),Z=E(d=>{t&&a||!t&&C.$$loading.cancel||C.$$loading.resolve(t,"cancel",c?.(d),y?.onClose)}),w=E(d=>{t&&a||(t?c?.(d):n?.(d),y?.onClose?.())}),Q=d=>{_&&d.target===d.currentTarget&&w(d)},ee=()=>{u?.()},te=()=>{O(!1),f?.(),y?.onClosed?.(),C.reset()},ne=pe(!!o,()=>{O(!0)},(d,m)=>!d||re(d,m)),oe=pe(t,()=>{C.$$loading.reset()},(d,m)=>!d||re(d,m));return dt(!!o&&!!k,w),{omitted:x,rns:W,ns:D,cssNames:J,cssAttrs:F,ctrl:C,visible:U,renderSlots:q,focusableState:G,closeIconRender:K,returnEmpty:ne||oe,subscribe:X,handleOk:Y,handleCancel:Z,handleDismiss:w,handleEntered:ee,handleExited:te,handleClick:Q}}const $=We("ModalFooterContext",{});function Mt(s){const{_showCancel:e,confirmLoading:t,confirmText:n,confirmButtonProps:o,cancelText:a,cancelButtonProps:i,subscribe:l,onOk:c,onCancel:u}=s,f=Me(()=>({_showCancel:e,confirmText:n,confirmLoading:t,confirmButtonProps:o,cancelText:a,cancelButtonProps:i,subscribe:l,onOk:c,onCancel:u}),{_showCancel:e,confirmText:n,confirmLoading:t,confirmButtonProps:o,cancelText:a,cancelButtonProps:i,subscribe:l,onOk:c,onCancel:u},kt);return{omitted:s,modalFooterContextValue:f}}const Be={children:"Cancel"},v={children:"Confirm",theme:"primary",variant:"solid"};function vt(){const s=$.use(),{cancelButtonProps:e,cancelText:t,onCancel:n}=s,{children:o=b(t,Be.children),onClick:a=n}=e||{};return{picked:{children:o,onClick:a},omitted:e}}function jt(){const s=$.use(),{confirmLoading:e,confirmText:t,confirmButtonProps:n,onOk:o}=s,{children:a=b(t,v.children),theme:i=v.theme,variant:l=v.variant,loading:c=e,onClick:u=o}=n||{};return{picked:{children:a,theme:i,variant:l,loading:c,onClick:u},omitted:n}}function wt(){const s=$.use(),{_showCancel:e,cancelText:t,cancelButtonProps:n,subscribe:o,onCancel:a}=s,{loading:i,children:l=b(t,Be.children),onClick:c=a}=n||{},u={children:l,onClick:c},[f,k]=ve(i,()=>!1);return h.useEffect(()=>o?.("cancel",k),[o,k]),{omitted:n,picked:u,isLoading:f,visible:e}}function Nt(){const s=$.use(),{confirmText:e,confirmButtonProps:t,subscribe:n,onOk:o}=s,{loading:a,children:i=b(e,v.children),theme:l=v.theme,variant:c=v.variant,onClick:u=o}=t||{},f={children:i,theme:l,variant:c,onClick:u},[k,_]=ve(a,()=>!1);return h.useEffect(()=>n?.("confirm",_),[n,_]),{omitted:t,picked:f,isLoading:k}}function Et(){const{picked:s,omitted:e}=vt();return r.jsx(p,{...e,...s})}function Bt(){const{picked:s,omitted:e}=jt();return r.jsx(p,{...e,...s})}function $t(){const{picked:s,omitted:e,isLoading:t,visible:n}=wt();return n?r.jsx(p,{...e,...s,loading:t}):null}function Pt(){const{picked:s,omitted:e,isLoading:t}=Nt();return r.jsx(p,{...e,...s,loading:t})}function It(s){const{omitted:e,modalFooterContextValue:t}=Mt(s),{_isJsxModal:n,footer:o}=e,a=()=>{const i=_e(o);if(!i&&!j(o))return o;const u={cancelButton:n?r.jsx(Et,{}):r.jsx($t,{}),confirmButton:n?r.jsx(Bt,{}):r.jsx(Pt,{})},f=r.jsxs(r.Fragment,{children:[u.cancelButton,u.confirmButton]});return r.jsx($,{value:t,children:i?o(f,u):f})};return r.jsx(De,{value:!1,children:a()})}function $e(s){const{omitted:e,rns:t,ns:n,cssNames:o,cssAttrs:a,ctrl:i,visible:l,renderSlots:c,focusableState:u,closeIconRender:f,returnEmpty:k,subscribe:_,handleOk:L,handleCancel:P,handleDismiss:V,handleEntered:x,handleExited:I,handleClick:C}=St(s),{_isJsxModal:U,_showCancel:O,children:W,type:D,title:T,footer:z,mask:J,isOpen:F,fresh:q,zIndex:G,transitions:y,getContainer:K,mountOnEnter:X,unmountOnExit:Y,confirmLoading:Z,confirmText:w,confirmButtonProps:Q,cancelText:ee,cancelButtonProps:te}=e,ne=m=>{const{focusTrap:g,returnFocus:Te}=u||{};return g?r.jsx(lt,{ref:i.$trap,active:l,returnFocus:Te,children:m}):m},oe=()=>f((m,g)=>r.jsx("button",{className:o.closeBtn,style:a.closeBtn,disabled:g,tabIndex:0,type:"button",onClick:V,children:m})),d=()=>{if(U)return null;const m=nt(D,"warning");return et(m,{fallback:r.jsx("span",{className:o.statusIcon,style:a.statusIcon,children:m}),transform:g=>({className:ce(g.className,o.statusIcon),style:{...g.style,...a.statusIcon}})})};return k?null:r.jsx(Ze,{classNames:{mask:o.mask},styles:{mask:a.mask},resumeOnCancel:!0,getContainer:K,isOpen:F,mask:J,mountOnEnter:X,transitions:{mask:b(y?.mask,`${t}-fade-in`),content:b(y?.content,`${t}-zoom-in`)},unmountOnExit:Y,zIndex:G,onEnter:m=>i.prepare(m),onEntered:x,onEntering:()=>i.transform,onExit:()=>i.transform,onExited:I,onExiting:()=>i.transform,children:(m,g)=>r.jsx("div",{className:`${n}-wrapper`,style:l?void 0:{display:"none"},tabIndex:-1,onClick:C,children:r.jsx("div",{ref:m,className:ce(o.root,g.names()),style:{...a.root,...g.attrs()},children:c({name:"main",children:ne(r.jsx(Ye,{when:()=>!!(F||q),children:r.jsxs("div",{className:o.main,style:a.main,children:[oe(),d(),be(T)&&r.jsx("div",{className:o.header,style:a.header,children:r.jsx("span",{className:o.title,style:a.title,children:T})}),r.jsx("div",{className:o.body,style:a.body,children:W}),be(z,j)&&r.jsx("div",{className:o.footer,style:a.footer,children:r.jsx(It,{_isJsxModal:U,_showCancel:O,cancelButtonProps:te,cancelText:ee,confirmButtonProps:Q,confirmLoading:Z,confirmText:w,footer:z,subscribe:_,onCancel:P,onOk:L})})]})}))})})})})}function Ut(s){return r.jsx($e,{...s,_isJsxModal:!1})}function Ot(s){return r.jsx($e,{...s,_isJsxModal:!0})}function Tt(s){const{items:e}=s;return r.jsx(r.Fragment,{children:Array.from(e).map(([t,{config:n,isOpen:o}])=>h.createElement(Ut,{...n,key:t,isOpen:o},n.content))})}function Pe(){let s,e;return{promise:new Promise((n,o)=>{s=n,e=o}),resolve:s,reject:e}}class zt{_change;_prepare;_uniqueId=Je("m-");_bind=(e,t)=>{this._change=e,this._prepare=t};append=(e,t)=>{this._change(n=>{const o=new Map(n);return o.set(e,{config:t,isOpen:!0}),o})};update=(e,t)=>{this._change(n=>{const o=n.get(e);if(!o)return n;const a=new Map(n);return a.set(e,{...o,config:{...o.config,...t}}),a})};close=e=>{this._change(t=>{const n=t.get(e);if(!n)return t;const o=new Map(t);return o.set(e,{...n,isOpen:!1}),o})};finish=e=>{this._change(t=>{if(!t.has(e))return t;const n=new Map(t);return n.delete(e),n})};generate=e=>{const{promise:t,resolve:n}=Pe();return{promise:t,wrap:(o,a,i=!1)=>{const l=()=>{n(a),this.close(e)};return c=>{const u=o?.(c);return i||!me(u)?l():u.then(l)}}}};confirm=e=>{const t=this._uniqueId(),{promise:n,wrap:o}=this.generate(t),a=this._prepare(e);return a.onOk=o(e.onOk,!0),a.onCancel=o(e.onCancel,!1),a.onClosed=qe(e.onClosed,()=>{this.finish(t)}),a._onDismiss=o(e.onCancel,!1,!0),a._showCancel=!j(e.onCancel)||a.type==="confirm",this.append(t,a),{then:i=>n.then(i),update:i=>{this.update(t,i)},close:()=>{this.close(t)}}};expose=()=>{const{confirm:e}=this;return Object.assign(Ne().reduce((t,n)=>(t[n]=o=>e({...o,type:n}),t),{}),{confirm:e})}}function Ie(){const[s,e]=h.useState(()=>new Map),t=ue(()=>new zt);return Se(()=>{t._bind(o=>{e(o)},o=>de(o,Qe(ht,ft)))}),[h.useMemo(()=>t.expose(),[t]),r.jsx(Tt,{items:s},"modal-holder")]}class Ft{_config={};get=()=>({...this._config});set=e=>{this._config=de(e,this.get())}}const ie=new Ft;function Rt(s){const{ref:e}=s,[t,n]=h.useState(()=>ie.get()),[o,a]=Ie();return h.useImperativeHandle(e,()=>({get confirm(){return o.confirm},sync:()=>{n(ie.get())}}),[o,n]),{ctxHolder:a,modalConfig:t}}function Ht(s){const{ctxHolder:e,modalConfig:t}=Rt(s);return r.jsx(st,{modal:t,children:e})}class At{_cleanup=null;_container=null;_callbacks=[];ensure=()=>this._container?this._container:new Promise(e=>{Ge.createRoot(document.createDocumentFragment()).render(r.jsx(h.StrictMode,{children:r.jsx(Ht,{ref:t=>{e(this._container??=t)}})}))});flush=()=>{this._cleanup?.(),this._cleanup=Ke(()=>{const e=this.ensure(),t=n=>{n.sync(),this._callbacks.forEach(o=>{o(n)}),this._callbacks.length=0};me(e)?e.then(t):t(e)})};config=e=>{ie.set(e),this._container?.sync()};confirm=e=>{const{promise:t,resolve:n}=Pe();return this._callbacks.push(o=>{n({inner:o.confirm(e)})}),this.flush(),{then:o=>t.then(({inner:a})=>{a.then(o)}),update:o=>{t.then(({inner:a})=>{a.update(o)})},close:()=>{t.then(({inner:o})=>{o.close()})}}};expose=()=>{const{confirm:e,config:t}=this;return Object.assign(Ne().reduce((n,o)=>(n[o]=a=>e({...a,type:o}),n),{}),{confirm:e,config:t})}}const Lt=new At,S=Object.assign(Ot,Lt.expose(),{useModal:Ie});function Zt(){const[s,e]=h.useState(!1);return r.jsxs(r.Fragment,{children:[r.jsx(p,{theme:"primary",variant:"solid",onClick:()=>e(!0),children:"Open Modal"}),r.jsxs(S,{isOpen:s,title:"Basic Modal",onCancel:()=>{e(!1)},onOk:()=>{e(!1)},children:[r.jsx("p",{children:"Some contents..."}),r.jsx("p",{children:"Some contents..."}),r.jsx("p",{children:"Some contents..."})]})]})}const Qt={metaInfo:{"zh-CN":`基本的对话框使用方式。

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
`,cssName:"css-612a8888",relPath:"packages/core/src/modal/__docs__/examples/basic.md"},Ue=h.createContext(null),Oe=h.createContext(null),R={title:"Use Hook!",onOk:async()=>{await new Promise(s=>setTimeout(s,1e3))},content:r.jsxs(r.Fragment,{children:[r.jsx(Ue.Consumer,{children:s=>`Reachable: ${s}!`}),r.jsx("br",{}),r.jsx(Oe.Consumer,{children:s=>`Unreachable: ${s}!`})]})};function en(){const[s,e]=S.useModal();return r.jsxs(Ue,{value:"Light",children:[r.jsxs(je,{children:[r.jsx(p,{theme:"info",onClick:()=>{s.confirm(R)},children:"Confirm"}),r.jsx(p,{theme:"info",onClick:()=>{s.warning(R)},children:"Warning"}),r.jsx(p,{theme:"info",onClick:()=>{s.info(R)},children:"Info"}),r.jsx(p,{theme:"info",onClick:()=>{s.error(R)},children:"Error"})]}),e,r.jsx(Oe,{value:"Bamboo"})]})}const tn={metaInfo:{"zh-CN":`通过 Modal.useModal 创建支持读取 context 的 contextHolder。其中仅有 hooks 方法支持 Promise await 操作。

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
`,cssName:"css-42037374",relPath:"packages/core/src/modal/__docs__/examples/hook.md"},H={title:"Static Method",onOk:async()=>{await new Promise(s=>setTimeout(s,1e3))},content:r.jsx("div",{children:"modal content"})};function nn(){return r.jsxs(je,{children:[r.jsx(p,{theme:"info",onClick:async()=>{const s=await S.confirm(H);console.log("Confirmed: ",s)},children:"Confirm"}),r.jsx(p,{theme:"info",onClick:()=>{S.warning(H)},children:"Warning"}),r.jsx(p,{theme:"info",onClick:()=>{S.info(H)},children:"Info"}),r.jsx(p,{theme:"info",onClick:()=>{S.error(H)},children:"Error"})]})}const on={metaInfo:{"zh-CN":`通过 Modal.confirm 直接 Modal。

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
`,cssName:"css-3a0fce38",relPath:"packages/core/src/modal/__docs__/examples/static.md"},sn=[{name:"cancelButtonProps",type:"ButtonProps","zh-CN":"取消按钮属性","en-US":"Props for the cancel button"},{name:"cancelText",type:"string","zh-CN":"取消按钮文本","en-US":"Text for the cancel button"},{name:"centered",type:"boolean",defaultValue:"false","zh-CN":"是否垂直居中","en-US":"Whether to center the modal vertically"},{name:"children",type:"React.ReactNode","zh-CN":"子元素（弹窗内容）","en-US":"Children (modal content)"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"classNames",type:"Partial<Record<'mask' | 'root' | 'main' | 'header' | 'title' | 'statusIcon' | 'closeBtn' | 'body' | 'footer', string | ((props: ModalProps) => string)>>","zh-CN":"语义化类名，支持按 slot 自定义","en-US":"Semantic class names by slot"},{name:"closable",type:["boolean","CommonClosable"],defaultValue:"true","zh-CN":"是否可关闭，传入对象可配置关闭图标、禁用及回调","en-US":"Whether the modal is closable, pass an object to configure close icon, disabled state and callbacks"},{name:"confirmButtonProps",type:"ButtonProps","zh-CN":"确认按钮属性","en-US":"Props for the confirm button"},{name:"confirmLoading",type:"boolean | { delay?: number }","zh-CN":"确认按钮加载状态","en-US":"Loading state of the confirm button"},{name:"confirmText",type:"string","zh-CN":"确认按钮文本","en-US":"Text for the confirm button"},{name:"focusable",type:["boolean","{ focusTrap?: boolean; returnFocus?: boolean }"],defaultValue:"true","zh-CN":"是否可聚焦，传入对象可配置焦点捕获与返回","en-US":"Whether the modal is focusable, pass an object to configure focus trap and return"},{name:"footer",type:["React.ReactNode","(element: ReactNode, params: { confirmButton: ReactNode; cancelButton: ReactNode }) => ReactNode"],"zh-CN":"底部内容，支持自定义渲染函数","en-US":"Footer content, supports custom render function"},{name:"fresh",type:"boolean","zh-CN":"关闭后仍更新 modal 内容","en-US":"Keep updating modal content after close"},{name:"getContainer",type:"() => HTMLElement","zh-CN":"指定弹窗挂载的容器","en-US":"Specify the container to mount the modal"},{name:"isOpen",type:"boolean","zh-CN":"是否显示弹窗","en-US":"Whether the modal is visible"},{name:"keyboard",type:"boolean",defaultValue:"true","zh-CN":"是否支持 Esc 键关闭","en-US":"Whether to close on Esc key press"},{name:"mask",type:"boolean",defaultValue:"true","zh-CN":"是否显示遮罩层","en-US":"Whether to show the mask"},{name:"maskClosable",type:"boolean",defaultValue:"true","zh-CN":"点击遮罩层是否关闭","en-US":"Whether to close on mask click"},{name:"mountOnEnter",type:"boolean",defaultValue:"true","zh-CN":"进入动画开始时挂载节点","en-US":"Mount the node on enter transition"},{name:"onCancel",type:"(event: MouseEvent | KeyboardEvent) => void","zh-CN":"取消回调","en-US":"Callback when the modal is cancelled"},{name:"onClosed",type:"() => void","zh-CN":"完全关闭后触发","en-US":"Callback after the modal is fully closed"},{name:"onOk",type:"(event: MouseEvent) => void","zh-CN":"确认回调","en-US":"Callback when the modal is confirmed"},{name:"onOpened",type:"() => void","zh-CN":"完全打开后触发","en-US":"Callback after the modal is fully opened"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"slots",type:"{ main?: (node: ReactNode) => ReactNode }","zh-CN":"自定义 slot 渲染","en-US":"Custom slot rendering"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"styles",type:"Partial<Record<'mask' | 'root' | 'main' | 'header' | 'title' | 'statusIcon' | 'closeBtn' | 'body' | 'footer', React.CSSProperties | ((props: ModalProps) => React.CSSProperties)>>","zh-CN":"语义化样式，支持按 slot 自定义","en-US":"Semantic styles by slot"},{name:"title",type:"React.ReactNode","zh-CN":"弹窗标题","en-US":"Modal title"},{name:"transitions",type:"Partial<Record<'mask' | 'content', CssTransitionProps['classNames']>>","zh-CN":"动效配置，支持 mask 和 content 分别设置","en-US":"Transition configuration for mask and content"},{name:"unmountOnExit",type:"boolean",defaultValue:"false","zh-CN":"退出动画结束后卸载节点","en-US":"Unmount the node on exit transition"},{name:"width",type:["number","string","Partial<Record<Breakpoint, number | string>>"],"zh-CN":"弹窗宽度，支持响应式断点配置","en-US":"Modal width, supports responsive breakpoint configuration"},{name:"zIndex",type:"number","zh-CN":"弹窗 z-index","en-US":"Modal z-index"}];export{Zt as A,Qt as M,sn as P,tn as a,en as b,on as c,nn as d};
