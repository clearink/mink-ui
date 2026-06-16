import{p as ke,n as M,U as E,V as ie,x as _e,W as oe,A as le,B as ye,r as h,j as r,X as Oe,Y as me,J as N,k as j,e as Te,I as ze,s as Fe,y as ae,v as Re,a as he,E as Se,m as He,c as re,f as b,b as Ae,D as fe,d as Le,G as Ve,Z as We,F as De,_ as Je,$ as qe}from"./index-BOv0hSqX.js";import{u as Ge,B as p,S as Ke,i as pe}from"./index-5KAbZXcY.js";import{s as ue,u as Me,O as Xe,p as Ye}from"./index-CX99x1UG.js";import{S as je}from"./index-BB_wrkYL.js";import{i as we}from"./keyboard-C4wnD4uN.js";import{c as Ze}from"./children-CazfncC5.js";import{n as Qe,m as et,g as ve}from"./closable-ByQpJBe5.js";import{n as tt}from"./slots-Rn8Rmf8g.js";import{i as de,C as nt}from"./index-Baohq-ki.js";const be={position:"fixed",overflow:"hidden",width:0,height:0,top:-1,left:-1,padding:0};function st(o,e){let t=o.nextElementSibling;const n=[];for(;t&&t!==e;)n.push(t),t=t.nextElementSibling;return n}function H(o){o&&ke(o.focus)&&o.focus({preventScroll:!0})}class ot{_stack=[];_subscribers=0;_keydownCleanup=M;_focusinCleanup=M;init=e=>{const t=n=>s=>{const a=_e(this._stack,-1);a&&a[n](s)};this._keydownCleanup=E(e,"keydown",t("onKeyDown"),!0),this._focusinCleanup=E(e,"focusin",t("onFocusIn"))};dispose=()=>{this._keydownCleanup(),this._focusinCleanup()};subscribe=e=>ie?(this._subscribers++===0&&this.init(e),()=>{--this._subscribers===0&&this.dispose(),this._subscribers=Math.max(this._subscribers,0)}):M;register=e=>(this._stack.push(e),()=>{this._stack=this._stack.filter(t=>t!==e)})}const Ce=new ot;class at{_props={};_isShiftTab=!1;_latestFocus=null;_savedElement=null;$start={current:null};$end={current:null};get start(){return this.$start.current}get end(){return this.$end.current}_bind=e=>{this._props=e};restoreFocus=()=>{const{returnFocus:e}=this._props;e&&H(this._savedElement)};handleFocus=(e,t)=>{if(!t||!this.start||!this.end)return;const n=st(this.start,this.end);if(!n.length)return;const s=e.activeElement;if(s!==this.start&&s!==this.end){if(n.some(a=>a===t||a.contains(t))){this._latestFocus=t;return}if(this._latestFocus)return H(this._latestFocus)}H(this._isShiftTab?this.end:this.start)};subscribe=()=>Ce.subscribe(oe());activate=e=>{if(!e)return;const t=oe(this.start);this._savedElement=t.activeElement;const n=Ce.register({onKeyDown:s=>{this._isShiftTab=s.shiftKey&&we(s.key,"tab"),this.handleFocus(t,s.target)},onFocusIn:s=>{s.stopImmediatePropagation(),this.handleFocus(t,s.target)}});return()=>{n(),this.restoreFocus(),this._latestFocus=null,this._savedElement=null}}}function rt(o){const{ref:e,active:t}=o,n=le(()=>new at);return ye(()=>{n._bind(o)}),h.useImperativeHandle(e,()=>({focus:()=>{H(n.start)}}),[n]),h.useEffect(()=>n.subscribe(),[n]),h.useEffect(()=>n.activate(!!t),[t,n]),{omitted:o,ctrl:n}}function ct(o){const{omitted:e,ctrl:t}=rt(o),{children:n,active:s}=e;return r.jsxs(r.Fragment,{children:[r.jsx("div",{ref:t.$start,style:be,tabIndex:s?0:-1}),n,r.jsx("div",{ref:t.$end,style:be,tabIndex:s?0:-1})]})}class it{_stack=[];_lockDuration=200;_lastEndTime=0;_subscribers=0;_keydownCleanup=M;_composeCleanup=M;init=()=>{const e=Oe();this._composeCleanup=E(e,"compositionend",()=>{this._lastEndTime=me()}),this._keydownCleanup=E(e,"keydown",t=>{!we(t.key,"esc")||t.isComposing||me()-this._lastEndTime<this._lockDuration||_e(this._stack,-1)?.(t)})};dispose=()=>{this._keydownCleanup(),this._composeCleanup()};subscribe=()=>{if(ie)return this._subscribers++===0&&this.init(),()=>{--this._subscribers===0&&this.dispose(),this._subscribers=Math.max(this._subscribers,0)}};activate=(e,t)=>{if(e)return this._stack.push(t),()=>{this._stack=this._stack.filter(n=>n!==t)}}}const xe=new it;function lt(o,e){const t=N(e);h.useEffect(()=>xe.subscribe(),[]),h.useEffect(()=>xe.activate(o,t),[o,t])}function se(o){const e=o?.focusable;return e===!0?{}:e}function ut(o){const{currentState:e,contextState:t,defaultState:n}=o,s=[se(e),se(t),se(n)];return s.find(l=>!j(l))&&ue(...s.filter(l=>!!l),{focusTrap:!0,returnFocus:!0})||void 0}const v={keyboard:!0,maskClosable:!0,centered:!1,closable:!0,focusable:!0},dt={width:416,type:"confirm",closable:!1,maskClosable:!1},mt=Te()(["width","type","closable","maskClosable"]);class ht{_subjects=new Map;on=(e,t)=>{const n=this._subjects.get(e)||new Set;return this._subjects.set(e,n.add(t)),()=>this.off(e,t)};off=(e,t)=>{const n=this._subjects.get(e);n&&(n.delete(t),n.size||this._subjects.delete(e))};emit=(e,...t)=>{const n=this._subjects.get(e);n&&n.forEach(s=>s(...t))}}class ft{_listeners=new Set;_subscribers=0;_cleanup=null;init=()=>{const e=oe().documentElement;this._cleanup=E(e,"click",t=>{this._listeners.forEach(n=>{n(t)})},!0)};dispose=()=>{this._cleanup?.(),this._cleanup=null};subscribe=()=>{if(ie)return this._subscribers++===0&&this.init(),()=>{--this._subscribers===0&&this.dispose(),this._subscribers=Math.max(this._subscribers,0)}};activate=(e,t)=>{if(e)return this._listeners.add(t),()=>{this._listeners.delete(t)}}}const ge=new ft;class pt{_cleanup=null;position=void 0;dispose=()=>{this._cleanup?.(),this._cleanup=null};sync=e=>{const t=e.target,n=e.detail===0||!e.pageX&&!e.pageY,s=n&&t?t.getBoundingClientRect():null;!s&&n?this.position=void 0:s?this.position={x:s.left+s.width/2,y:s.top+s.height/2}:this.position={x:e.clientX,y:e.clientY},this.dispose(),this._cleanup=ze(200,()=>{this.position=void 0})};subscribe=()=>{ge.subscribe(),ge.activate(!0,this.sync)}}const Ne=new pt;Ne.subscribe();class bt{$$channel=new ht;confirm=!1;cancel=!1;emit=(e,t)=>{this[e]=t,this.$$channel.emit(e,t)};on=(e,t)=>this.$$channel.on(e,t);resolve=(e,t,n,s)=>{if(e||!de(n))return s?.();this.emit(t,!0),n.then(()=>{this.emit(t,!1),s?.()},()=>{this.emit(t,!1)})};reset=()=>{this.emit("confirm",!1),this.emit("cancel",!1)}}class Ct{$$loading=new bt;$trap={current:null};transform=void 0;get trap(){return this.$trap.current}prepare=e=>{this.trap?.focus();const t=Ne.position;if(!t)return this.transform;const n=e.getBoundingClientRect(),s=t.x-n.left-(n.width-e.offsetWidth)/2,a=t.y-n.top-(n.height-e.offsetHeight)/2;return this.transform={transformOrigin:`${s}px ${a}px`},this.transform};reset=()=>{this.transform=void 0}}function xt(o,e){return Object.keys(o).every(n=>ae(o[n],e[n]))}function gt(o,e){if(j(e))return;if(!Fe(e))return{width:e};const t={},n=(s,a)=>{j(a)||(t[`--${o}-${s}-width`]=Re(a)?`${a}px`:`${a}`)};return n("xs",e.xs),n("sm",e.sm),n("md",e.md),n("lg",e.lg),n("xl",e.xl),n("xxl",e.xxl),t}function kt(o,e){const{centered:t}=o,{_isJsxModal:n,prefixCls:s,width:a,type:i}=e,l=he(f=>f),c=he("modal",s),u=Se(()=>gt(c,a),[c,a],He);return{rns:l,ns:c,cssVars:u,classNames:{root:re(c,{[`${c}--centered`]:t,[`${c}--confirm`]:!n,[`${c}--confirm-${i}`]:!n&&i}),mask:`${c}-mask`,main:`${c}__main`,header:`${c}__header`,title:`${c}__title`,statusIcon:`${c}__status-icon`,closeBtn:`${c}__close-btn`,body:`${c}__body`,footer:`${c}__footer`}}}function _t(o){const e=Ge("modal"),{_isJsxModal:t,_onDismiss:n,isOpen:s,confirmLoading:a,slots:i,onOk:l,onCancel:c,onOpened:u,onClosed:f,keyboard:_=b(e.keyboard,v.keyboard),maskClosable:C=b(e.maskClosable,v.maskClosable),centered:A=b(e.centered,v.centered),closable:$=b(e.closable,v.closable),focusable:L=b(e.focusable,v.focusable)}=o,g=o,P={maskClosable:C,centered:A,closable:$},x=le(()=>new Ct),[I,U]=h.useState(s),{rns:V,ns:W,cssVars:O,classNames:T}=kt(P,g),[D,z]=Ae([e.classNames,{root:e.className},T,g.classNames,{root:g.className}],[e.styles,{root:e.style},g.styles,{root:g.style},{root:O}],{meta:{...g,...P}}),J=tt({currentState:{slots:i},contextState:{slots:e.slots}}),q=ut({currentState:{focusable:L},contextState:{focusable:e.focusable},defaultState:{focusable:!0}}),[y,G]=Qe({currentState:{closable:$},contextState:{closable:e.closable}}),K=N((d,m)=>t?M:x.$$loading.on(d,m)),X=N(d=>{t&&a||!t&&x.$$loading.confirm||x.$$loading.resolve(t,"confirm",l?.(d))}),Y=N(d=>{t&&a||!t&&x.$$loading.cancel||x.$$loading.resolve(t,"cancel",c?.(d),y?.onClose)}),w=N(d=>{t&&a||(t?c?.(d):n?.(d),y?.onClose?.())}),Z=d=>{C&&d.target===d.currentTarget&&w(d)},Q=()=>{u?.()},ee=()=>{U(!1),f?.(),y?.onClosed?.(),x.reset()},te=fe(!!s,()=>{U(!0)},(d,m)=>!d||ae(d,m)),ne=fe(t,()=>{x.$$loading.reset()},(d,m)=>!d||ae(d,m));return lt(!!s&&!!_,w),{omitted:g,rns:V,ns:W,cssNames:D,cssAttrs:z,ctrl:x,visible:I,renderSlots:J,focusableState:q,closeIconRender:G,returnEmpty:te||ne,subscribe:K,handleOk:X,handleCancel:Y,handleDismiss:w,handleEntered:Q,handleExited:ee,handleClick:Z}}const B=Le("ModalFooterContext",{});function yt(o){const{_showCancel:e,confirmLoading:t,confirmText:n,confirmButtonProps:s,cancelText:a,cancelButtonProps:i,subscribe:l,onOk:c,onCancel:u}=o,f=Se(()=>({_showCancel:e,confirmText:n,confirmLoading:t,confirmButtonProps:s,cancelText:a,cancelButtonProps:i,subscribe:l,onOk:c,onCancel:u}),{_showCancel:e,confirmText:n,confirmLoading:t,confirmButtonProps:s,cancelText:a,cancelButtonProps:i,subscribe:l,onOk:c,onCancel:u},xt);return{omitted:o,modalFooterContextValue:f}}function St(){const o=B.use(),{cancelButtonProps:e,cancelText:t,onCancel:n}=o,{theme:s="info",children:a=b(t,"取消"),onClick:i=n}=e||{};return{picked:{children:a,theme:s,onClick:i},omitted:e}}function Mt(){const o=B.use(),{confirmLoading:e,confirmText:t,confirmButtonProps:n,onOk:s}=o,{variant:a="solid",loading:i=e,children:l=b(t,"确认"),onClick:c=s}=n||{};return{picked:{children:l,variant:a,loading:i,onClick:c},omitted:n}}function jt(){const o=B.use(),{_showCancel:e,cancelText:t,cancelButtonProps:n,subscribe:s,onCancel:a}=o,{theme:i="info",loading:l,children:c=b(t,"取消"),onClick:u=a}=n||{},f={children:c,theme:i,onClick:u},[_,C]=Me(l,()=>!1);return h.useEffect(()=>s?.("cancel",C),[s,C]),{omitted:n,picked:f,isLoading:_,visible:e}}function wt(){const o=B.use(),{confirmText:e,confirmButtonProps:t,subscribe:n,onOk:s}=o,{loading:a,theme:i="primary",variant:l="solid",children:c=b(e,"确认"),onClick:u=s}=t||{},f={children:c,theme:i,variant:l,onClick:u},[_,C]=Me(a,()=>!1);return h.useEffect(()=>n?.("confirm",C),[n,C]),{omitted:t,picked:f,isLoading:_}}function vt(){const{picked:o,omitted:e}=St();return r.jsx(p,{...e,...o})}function Nt(){const{picked:o,omitted:e}=Mt();return r.jsx(p,{...e,...o})}function Et(){const{picked:o,omitted:e,isLoading:t,visible:n}=jt();return n?r.jsx(p,{...e,...o,loading:t}):null}function Bt(){const{picked:o,omitted:e,isLoading:t}=wt();return r.jsx(p,{...e,...o,loading:t})}function $t(o){const{omitted:e,modalFooterContextValue:t}=yt(o),{_isJsxModal:n,footer:s}=e,a=()=>{const i=ke(s);if(!i&&!j(s))return s;const u={cancelButton:n?r.jsx(vt,{}):r.jsx(Et,{}),confirmButton:n?r.jsx(Nt,{}):r.jsx(Bt,{})},f=r.jsxs(r.Fragment,{children:[u.cancelButton,u.confirmButton]});return r.jsx(B,{value:t,children:i?s(f,u):f})};return r.jsx(Ve,{value:!1,children:a()})}function Ee(o){const{omitted:e,rns:t,ns:n,cssNames:s,cssAttrs:a,ctrl:i,visible:l,renderSlots:c,focusableState:u,closeIconRender:f,returnEmpty:_,subscribe:C,handleOk:A,handleCancel:$,handleDismiss:L,handleEntered:g,handleExited:P,handleClick:x}=_t(o),{_isJsxModal:I,_showCancel:U,children:V,type:W,title:O,footer:T,mask:D,isOpen:z,fresh:J,zIndex:q,transitions:y,getContainer:G,mountOnEnter:K,unmountOnExit:X,confirmLoading:Y,confirmText:w,confirmButtonProps:Z,cancelText:Q,cancelButtonProps:ee}=e,te=m=>{const{focusTrap:k,returnFocus:Ue}=u||{};return k?r.jsx(ct,{ref:i.$trap,active:l,returnFocus:Ue,children:m}):m},ne=()=>f((m,k)=>r.jsx("button",{className:s.closeBtn,style:a.closeBtn,disabled:k,tabIndex:0,type:"button",onClick:L,children:m})),d=()=>{if(I)return null;const m=et(W,"warning");return Ze(m,{fallback:r.jsx("span",{className:s.statusIcon,style:a.statusIcon,children:m}),transform:k=>({className:re(k.className,s.statusIcon),style:{...k.style,...a.statusIcon}})})};return _?null:r.jsx(Xe,{classNames:{mask:s.mask},styles:{mask:a.mask},resumeOnCancel:!0,getContainer:G,isOpen:z,mask:D,mountOnEnter:K,transitions:{mask:b(y?.mask,`${t}-fade-in`),content:b(y?.content,`${t}-zoom-in`)},unmountOnExit:X,zIndex:q,onEnter:m=>i.prepare(m),onEntered:g,onEntering:()=>i.transform,onExit:()=>i.transform,onExited:P,onExiting:()=>i.transform,children:(m,k)=>r.jsx("div",{className:`${n}-wrapper`,style:l?void 0:{display:"none"},tabIndex:-1,onClick:x,children:r.jsx("div",{ref:m,className:re(s.root,k.names()),style:{...a.root,...k.attrs()},children:c({name:"main",children:te(r.jsx(Ke,{when:()=>!!(z||J),children:r.jsxs("div",{className:s.main,style:a.main,children:[ne(),d(),pe(O)&&r.jsx("div",{className:s.header,style:a.header,children:r.jsx("span",{className:s.title,style:a.title,children:O})}),r.jsx("div",{className:s.body,style:a.body,children:V}),pe(T,j)&&r.jsx("div",{className:s.footer,style:a.footer,children:r.jsx($t,{_isJsxModal:I,_showCancel:U,cancelButtonProps:ee,cancelText:Q,confirmButtonProps:Z,confirmLoading:Y,confirmText:w,footer:T,subscribe:C,onCancel:$,onOk:A})})]})}))})})})})}function Pt(o){return r.jsx(Ee,{...o,_isJsxModal:!1})}function It(o){return r.jsx(Ee,{...o,_isJsxModal:!0})}function Ut(o){const{items:e}=o;return r.jsx(r.Fragment,{children:Array.from(e).map(([t,{config:n,isOpen:s}])=>h.createElement(Pt,{...n,key:t,isOpen:s},n.content))})}function Be(){let o,e;return{promise:new Promise((n,s)=>{o=n,e=s}),resolve:o,reject:e}}class Ot{_change;_prepare;_uniqueId=We("m-");_bind=(e,t)=>{this._change=e,this._prepare=t};append=(e,t)=>{this._change(n=>{const s=new Map(n);return s.set(e,{config:t,isOpen:!0}),s})};update=(e,t)=>{this._change(n=>{const s=n.get(e);if(!s)return n;const a=new Map(n);return a.set(e,{...s,config:{...s.config,...t}}),a})};close=e=>{this._change(t=>{const n=t.get(e);if(!n)return t;const s=new Map(t);return s.set(e,{...n,isOpen:!1}),s})};finish=e=>{this._change(t=>{if(!t.has(e))return t;const n=new Map(t);return n.delete(e),n})};generate=e=>{const{promise:t,resolve:n}=Be();return{promise:t,wrap:(s,a,i=!1)=>{const l=()=>{n(a),this.close(e)};return c=>{const u=s?.(c);return i||!de(u)?l():u.then(l)}}}};confirm=e=>{const t=this._uniqueId(),{promise:n,wrap:s}=this.generate(t),a=this._prepare(e);return a.onOk=s(e.onOk,!0),a.onCancel=s(e.onCancel,!1),a.onClosed=De(e.onClosed,()=>{this.finish(t)}),a._onDismiss=s(e.onCancel,!1,!0),a._showCancel=!j(e.onCancel)||a.type==="confirm",this.append(t,a),{then:i=>n.then(i),update:i=>{this.update(t,i)},close:()=>{this.close(t)}}};expose=()=>{const{confirm:e}=this;return Object.assign(ve().reduce((t,n)=>(t[n]=s=>e({...s,type:n}),t),{}),{confirm:e})}}function $e(){const[o,e]=h.useState(()=>new Map),t=le(()=>new Ot);return ye(()=>{t._bind(s=>{e(s)},s=>ue(s,Ye(dt,mt)))}),[h.useMemo(()=>t.expose(),[t]),r.jsx(Ut,{items:o},"modal-holder")]}class Tt{_config={};get=()=>({...this._config});set=e=>{this._config=ue(e,this.get())}}const ce=new Tt;function zt(o){const{ref:e}=o,[t,n]=h.useState(()=>ce.get()),[s,a]=$e();return h.useImperativeHandle(e,()=>({get confirm(){return s.confirm},sync:()=>{n(ce.get())}}),[s,n]),{ctxHolder:a,modalConfig:t}}function Ft(o){const{ctxHolder:e,modalConfig:t}=zt(o);return r.jsx(nt,{modal:t,children:e})}class Rt{_cleanup=null;_container=null;_callbacks=[];ensure=()=>this._container?this._container:new Promise(e=>{Je.createRoot(document.createDocumentFragment()).render(r.jsx(h.StrictMode,{children:r.jsx(Ft,{ref:t=>{e(this._container??=t)}})}))});dispose=()=>{this._cleanup?.(),this._cleanup=null};flush=()=>{this.dispose(),this._cleanup=qe(()=>{const e=this.ensure(),t=n=>{n.sync(),this._callbacks.forEach(s=>{s(n)}),this._callbacks.length=0};de(e)?e.then(t):t(e)})};config=e=>{ce.set(e),this._container?.sync()};confirm=e=>{const{promise:t,resolve:n}=Be();return this._callbacks.push(s=>{n({inner:s.confirm(e)})}),this.flush(),{then:s=>t.then(({inner:a})=>{a.then(s)}),update:s=>{t.then(({inner:a})=>{a.update(s)})},close:()=>{t.then(({inner:s})=>{s.close()})}}};expose=()=>{const{confirm:e,config:t}=this;return Object.assign(ve().reduce((n,s)=>(n[s]=a=>e({...a,type:s}),n),{}),{confirm:e,config:t})}}const Ht=new Rt,S=Object.assign(It,Ht.expose(),{useModal:$e});function Xt(){const[o,e]=h.useState(!1);return r.jsxs(r.Fragment,{children:[r.jsx(p,{variant:"solid",onClick:()=>e(!0),children:"Open Modal"}),r.jsxs(S,{isOpen:o,title:"Basic Modal",onCancel:()=>{e(!1)},onOk:()=>{e(!1)},children:[r.jsx("p",{children:"Some contents..."}),r.jsx("p",{children:"Some contents..."}),r.jsx("p",{children:"Some contents..."})]})]})}const Yt={metaInfo:{"zh-CN":`基本的对话框使用方式。

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
`,cssName:"css-612a8888",relPath:"packages/core/src/modal/__docs__/examples/basic.md"},Pe=h.createContext(null),Ie=h.createContext(null),F={title:"Use Hook!",onOk:async()=>{await new Promise(o=>setTimeout(o,1e3))},content:r.jsxs(r.Fragment,{children:[r.jsx(Pe.Consumer,{children:o=>`Reachable: ${o}!`}),r.jsx("br",{}),r.jsx(Ie.Consumer,{children:o=>`Unreachable: ${o}!`})]})};function Zt(){const[o,e]=S.useModal();return r.jsxs(Pe,{value:"Light",children:[r.jsxs(je,{children:[r.jsx(p,{theme:"info",onClick:()=>{o.confirm(F)},children:"Confirm"}),r.jsx(p,{theme:"info",onClick:()=>{o.warning(F)},children:"Warning"}),r.jsx(p,{theme:"info",onClick:()=>{o.info(F)},children:"Info"}),r.jsx(p,{theme:"info",onClick:()=>{o.error(F)},children:"Error"})]}),e,r.jsx(Ie,{value:"Bamboo"})]})}const Qt={metaInfo:{"zh-CN":`通过 Modal.useModal 创建支持读取 context 的 contextHolder。其中仅有 hooks 方法支持 Promise await 操作。

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
`,cssName:"css-42037374",relPath:"packages/core/src/modal/__docs__/examples/hook.md"},R={title:"Static Method",onOk:async()=>{await new Promise(o=>setTimeout(o,1e3))},content:r.jsx("div",{children:"modal content"})};function en(){return r.jsxs(je,{children:[r.jsx(p,{theme:"info",onClick:async()=>{const o=await S.confirm(R);console.log("Confirmed: ",o)},children:"Confirm"}),r.jsx(p,{theme:"info",onClick:()=>{S.warning(R)},children:"Warning"}),r.jsx(p,{theme:"info",onClick:()=>{S.info(R)},children:"Info"}),r.jsx(p,{theme:"info",onClick:()=>{S.error(R)},children:"Error"})]})}const tn={metaInfo:{"zh-CN":`通过 Modal.confirm 直接 Modal。

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
`,cssName:"css-3a0fce38",relPath:"packages/core/src/modal/__docs__/examples/static.md"},nn=[{name:"cancelButtonProps",type:"ButtonProps","zh-CN":"取消按钮属性","en-US":"Props for the cancel button"},{name:"cancelText",type:"string","zh-CN":"取消按钮文本","en-US":"Text for the cancel button"},{name:"centered",type:"boolean",defaultValue:"false","zh-CN":"是否垂直居中","en-US":"Whether to center the modal vertically"},{name:"children",type:"React.ReactNode","zh-CN":"子元素（弹窗内容）","en-US":"Children (modal content)"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"classNames",type:"Partial<Record<'mask' | 'root' | 'main' | 'header' | 'title' | 'statusIcon' | 'closeBtn' | 'body' | 'footer', string | ((props: ModalProps) => string)>>","zh-CN":"语义化类名，支持按 slot 自定义","en-US":"Semantic class names by slot"},{name:"closable",type:["boolean","CommonClosable"],defaultValue:"true","zh-CN":"是否可关闭，传入对象可配置关闭图标、禁用及回调","en-US":"Whether the modal is closable, pass an object to configure close icon, disabled state and callbacks"},{name:"confirmButtonProps",type:"ButtonProps","zh-CN":"确认按钮属性","en-US":"Props for the confirm button"},{name:"confirmLoading",type:"boolean | { delay?: number }","zh-CN":"确认按钮加载状态","en-US":"Loading state of the confirm button"},{name:"confirmText",type:"string","zh-CN":"确认按钮文本","en-US":"Text for the confirm button"},{name:"focusable",type:["boolean","{ focusTrap?: boolean; returnFocus?: boolean }"],defaultValue:"true","zh-CN":"是否可聚焦，传入对象可配置焦点捕获与返回","en-US":"Whether the modal is focusable, pass an object to configure focus trap and return"},{name:"footer",type:["React.ReactNode","(element: ReactNode, params: { confirmButton: ReactNode; cancelButton: ReactNode }) => ReactNode"],"zh-CN":"底部内容，支持自定义渲染函数","en-US":"Footer content, supports custom render function"},{name:"fresh",type:"boolean","zh-CN":"关闭后仍更新 modal 内容","en-US":"Keep updating modal content after close"},{name:"getContainer",type:"() => HTMLElement","zh-CN":"指定弹窗挂载的容器","en-US":"Specify the container to mount the modal"},{name:"isOpen",type:"boolean","zh-CN":"是否显示弹窗","en-US":"Whether the modal is visible"},{name:"keyboard",type:"boolean",defaultValue:"true","zh-CN":"是否支持 Esc 键关闭","en-US":"Whether to close on Esc key press"},{name:"mask",type:"boolean",defaultValue:"true","zh-CN":"是否显示遮罩层","en-US":"Whether to show the mask"},{name:"maskClosable",type:"boolean",defaultValue:"true","zh-CN":"点击遮罩层是否关闭","en-US":"Whether to close on mask click"},{name:"mountOnEnter",type:"boolean",defaultValue:"true","zh-CN":"进入动画开始时挂载节点","en-US":"Mount the node on enter transition"},{name:"onCancel",type:"(event: MouseEvent | KeyboardEvent) => void","zh-CN":"取消回调","en-US":"Callback when the modal is cancelled"},{name:"onClosed",type:"() => void","zh-CN":"完全关闭后触发","en-US":"Callback after the modal is fully closed"},{name:"onOk",type:"(event: MouseEvent) => void","zh-CN":"确认回调","en-US":"Callback when the modal is confirmed"},{name:"onOpened",type:"() => void","zh-CN":"完全打开后触发","en-US":"Callback after the modal is fully opened"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"},{name:"slots",type:"{ main?: (node: ReactNode) => ReactNode }","zh-CN":"自定义 slot 渲染","en-US":"Custom slot rendering"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"styles",type:"Partial<Record<'mask' | 'root' | 'main' | 'header' | 'title' | 'statusIcon' | 'closeBtn' | 'body' | 'footer', React.CSSProperties | ((props: ModalProps) => React.CSSProperties)>>","zh-CN":"语义化样式，支持按 slot 自定义","en-US":"Semantic styles by slot"},{name:"title",type:"React.ReactNode","zh-CN":"弹窗标题","en-US":"Modal title"},{name:"transitions",type:"Partial<Record<'mask' | 'content', CssTransitionProps['classNames']>>","zh-CN":"动效配置，支持 mask 和 content 分别设置","en-US":"Transition configuration for mask and content"},{name:"unmountOnExit",type:"boolean",defaultValue:"false","zh-CN":"退出动画结束后卸载节点","en-US":"Unmount the node on exit transition"},{name:"width",type:["number","string","Partial<Record<Breakpoint, number | string>>"],"zh-CN":"弹窗宽度，支持响应式断点配置","en-US":"Modal width, supports responsive breakpoint configuration"},{name:"zIndex",type:"number","zh-CN":"弹窗 z-index","en-US":"Modal z-index"}];export{Xt as A,Yt as M,nn as P,Qt as a,Zt as b,tn as c,en as d};
