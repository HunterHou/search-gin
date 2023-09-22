import{c as G,aW as vt,aX as ht,b2 as mt,aZ as gt,r as R,ao as Ye,av as He,H as Ge,at as oe,w as Q,j as _e,o as fe,g as Z,ay as me,m as Be,be as Ie,ar as ae,N as bt,C as yt,u as Ze,bf as Je,D as wt,a as x,s as et,bg as ge,E as Le,bh as pt,F as xt,bi as Ct,bj as Tt,ax as Ee,bk as qt,bl as Fe,k as Pt,bm as St,h as k,d as ie,a2 as tt,b9 as kt,bn as At,bo as Bt,ap as le,bp as nt,bd as at,aQ as Lt,ai as de,ae as Pe,aw as Et,i as Mt,e as Se,bq as ot,z as _t,aD as Rt,b4 as $t,y as Dt,a$ as Wt,K as Ht,v as It,x as Ft,aq as Qt,n as Vt,as as zt,au as ke,br as jt,bs as Ot,I as Kt}from"./index.c4b700f0.js";import{Q as Nt}from"./QBtnGroup.49d91984.js";import{c as lt,g as Qe,s as Ve}from"./selection.462e2502.js";import{Q as Ut}from"./QItem.1eed172b.js";var qn=G({name:"QField",inheritAttrs:!1,props:vt,emits:ht,setup(){return mt(gt())}});const Xt={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function Yt({showing:e,avoidEmit:t,configureAnchorEl:l}){const{props:a,proxy:o,emit:n}=Z(),i=R(null);let h=null;function p(u){return i.value===null?!1:u===void 0||u.touches===void 0||u.touches.length<=1}const m={};l===void 0&&(Object.assign(m,{hide(u){o.hide(u)},toggle(u){o.toggle(u),u.qAnchorHandled=!0},toggleKey(u){Ye(u,13)===!0&&m.toggle(u)},contextClick(u){o.hide(u),He(u),Ge(()=>{o.show(u),u.qAnchorHandled=!0})},prevent:He,mobileTouch(u){if(m.mobileCleanup(u),p(u)!==!0)return;o.hide(u),i.value.classList.add("non-selectable");const v=u.target;oe(m,"anchor",[[v,"touchmove","mobileCleanup","passive"],[v,"touchend","mobileCleanup","passive"],[v,"touchcancel","mobileCleanup","passive"],[i.value,"contextmenu","prevent","notPassive"]]),h=setTimeout(()=>{h=null,o.show(u),u.qAnchorHandled=!0},300)},mobileCleanup(u){i.value.classList.remove("non-selectable"),h!==null&&(clearTimeout(h),h=null),e.value===!0&&u!==void 0&&lt()}}),l=function(u=a.contextMenu){if(a.noParentEvent===!0||i.value===null)return;let v;u===!0?o.$q.platform.is.mobile===!0?v=[[i.value,"touchstart","mobileTouch","passive"]]:v=[[i.value,"mousedown","hide","passive"],[i.value,"contextmenu","contextClick","notPassive"]]:v=[[i.value,"click","toggle","passive"],[i.value,"keyup","toggleKey","passive"]],oe(m,"anchor",v)});function f(){me(m,"anchor")}function A(u){for(i.value=u;i.value.classList.contains("q-anchor--skip");)i.value=i.value.parentNode;l()}function b(){if(a.target===!1||a.target===""||o.$el.parentNode===null)i.value=null;else if(a.target===!0)A(o.$el.parentNode);else{let u=a.target;if(typeof a.target=="string")try{u=document.querySelector(a.target)}catch{u=void 0}u!=null?(i.value=u.$el||u,l()):(i.value=null,console.error(`Anchor: target "${a.target}" not found`))}}return Q(()=>a.contextMenu,u=>{i.value!==null&&(f(),l(u))}),Q(()=>a.target,()=>{i.value!==null&&f(),b()}),Q(()=>a.noParentEvent,u=>{i.value!==null&&(u===!0?f():l())}),_e(()=>{b(),t!==!0&&a.modelValue===!0&&i.value===null&&n("update:modelValue",!1)}),fe(()=>{h!==null&&clearTimeout(h),f()}),{anchorEl:i,canShow:p,anchorEvents:m}}function Gt(e,t){const l=R(null);let a;function o(h,p){const m=`${p!==void 0?"add":"remove"}EventListener`,f=p!==void 0?p:a;h!==window&&h[m]("scroll",f,Be.passive),window[m]("scroll",f,Be.passive),a=p}function n(){l.value!==null&&(o(l.value),l.value=null)}const i=Q(()=>e.noParentEvent,()=>{l.value!==null&&(n(),t())});return fe(i),{localScrollTarget:l,unconfigureScrollTarget:n,changeScrollEvent:o}}const{notPassiveCapture:be}=Be,Y=[];function ye(e){const t=e.target;if(t===void 0||t.nodeType===8||t.classList.contains("no-pointer-events")===!0)return;let l=Ie.length-1;for(;l>=0;){const a=Ie[l].$;if(a.type.name==="QTooltip"){l--;continue}if(a.type.name!=="QDialog")break;if(a.props.seamless!==!0)return;l--}for(let a=Y.length-1;a>=0;a--){const o=Y[a];if((o.anchorEl.value===null||o.anchorEl.value.contains(t)===!1)&&(t===document.body||o.innerRef.value!==null&&o.innerRef.value.contains(t)===!1))e.qClickOutside=!0,o.onClickOutside(e);else return}}function Zt(e){Y.push(e),Y.length===1&&(document.addEventListener("mousedown",ye,be),document.addEventListener("touchstart",ye,be))}function ze(e){const t=Y.findIndex(l=>l===e);t>-1&&(Y.splice(t,1),Y.length===0&&(document.removeEventListener("mousedown",ye,be),document.removeEventListener("touchstart",ye,be)))}let je,Oe;function Ke(e){const t=e.split(" ");return t.length!==2?!1:["top","center","bottom"].includes(t[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(t[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function Jt(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const Me={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{Me[`${e}#ltr`]=e,Me[`${e}#rtl`]=e});function Ne(e,t){const l=e.split(" ");return{vertical:l[0],horizontal:Me[`${l[1]}#${t===!0?"rtl":"ltr"}`]}}function en(e,t){let{top:l,left:a,right:o,bottom:n,width:i,height:h}=e.getBoundingClientRect();return t!==void 0&&(l-=t[1],a-=t[0],n+=t[1],o+=t[0],i+=t[0],h+=t[1]),{top:l,bottom:n,height:h,left:a,right:o,width:i,middle:a+(o-a)/2,center:l+(n-l)/2}}function tn(e,t,l){let{top:a,left:o}=e.getBoundingClientRect();return a+=t.top,o+=t.left,l!==void 0&&(a+=l[1],o+=l[0]),{top:a,bottom:a+1,height:1,left:o,right:o+1,width:1,middle:o,center:a}}function nn(e,t){return{top:0,center:t/2,bottom:t,left:0,middle:e/2,right:e}}function Ue(e,t,l,a){return{top:e[l.vertical]-t[a.vertical],left:e[l.horizontal]-t[a.horizontal]}}function it(e,t=0){if(e.targetEl===null||e.anchorEl===null||t>5)return;if(e.targetEl.offsetHeight===0||e.targetEl.offsetWidth===0){setTimeout(()=>{it(e,t+1)},10);return}const{targetEl:l,offset:a,anchorEl:o,anchorOrigin:n,selfOrigin:i,absoluteOffset:h,fit:p,cover:m,maxHeight:f,maxWidth:A}=e;if(ae.is.ios===!0&&window.visualViewport!==void 0){const B=document.body.style,{offsetLeft:q,offsetTop:L}=window.visualViewport;q!==je&&(B.setProperty("--q-pe-left",q+"px"),je=q),L!==Oe&&(B.setProperty("--q-pe-top",L+"px"),Oe=L)}const{scrollLeft:b,scrollTop:u}=l,v=h===void 0?en(o,m===!0?[0,0]:a):tn(o,h,a);Object.assign(l.style,{top:0,left:0,minWidth:null,minHeight:null,maxWidth:A||"100vw",maxHeight:f||"100vh",visibility:"visible"});const{offsetWidth:_,offsetHeight:$}=l,{elWidth:W,elHeight:F}=p===!0||m===!0?{elWidth:Math.max(v.width,_),elHeight:m===!0?Math.max(v.height,$):$}:{elWidth:_,elHeight:$};let s={maxWidth:A,maxHeight:f};(p===!0||m===!0)&&(s.minWidth=v.width+"px",m===!0&&(s.minHeight=v.height+"px")),Object.assign(l.style,s);const c=nn(W,F);let C=Ue(v,c,n,i);if(h===void 0||a===void 0)Ae(C,v,c,n,i);else{const{top:B,left:q}=C;Ae(C,v,c,n,i);let L=!1;if(C.top!==B){L=!0;const D=2*a[1];v.center=v.top-=D,v.bottom-=D+2}if(C.left!==q){L=!0;const D=2*a[0];v.middle=v.left-=D,v.right-=D+2}L===!0&&(C=Ue(v,c,n,i),Ae(C,v,c,n,i))}s={top:C.top+"px",left:C.left+"px"},C.maxHeight!==void 0&&(s.maxHeight=C.maxHeight+"px",v.height>C.maxHeight&&(s.minHeight=s.maxHeight)),C.maxWidth!==void 0&&(s.maxWidth=C.maxWidth+"px",v.width>C.maxWidth&&(s.minWidth=s.maxWidth)),Object.assign(l.style,s),l.scrollTop!==u&&(l.scrollTop=u),l.scrollLeft!==b&&(l.scrollLeft=b)}function Ae(e,t,l,a,o){const n=l.bottom,i=l.right,h=bt(),p=window.innerHeight-h,m=document.body.clientWidth;if(e.top<0||e.top+n>p)if(o.vertical==="center")e.top=t[a.vertical]>p/2?Math.max(0,p-n):0,e.maxHeight=Math.min(n,p);else if(t[a.vertical]>p/2){const f=Math.min(p,a.vertical==="center"?t.center:a.vertical===o.vertical?t.bottom:t.top);e.maxHeight=Math.min(n,f),e.top=Math.max(0,f-n)}else e.top=Math.max(0,a.vertical==="center"?t.center:a.vertical===o.vertical?t.top:t.bottom),e.maxHeight=Math.min(n,p-e.top);if(e.left<0||e.left+i>m)if(e.maxWidth=Math.min(i,m),o.horizontal==="middle")e.left=t[a.horizontal]>m/2?Math.max(0,m-i):0;else if(t[a.horizontal]>m/2){const f=Math.min(m,a.horizontal==="middle"?t.middle:a.horizontal===o.horizontal?t.right:t.left);e.maxWidth=Math.min(i,f),e.left=Math.max(0,f-e.maxWidth)}else e.left=Math.max(0,a.horizontal==="middle"?t.middle:a.horizontal===o.horizontal?t.left:t.right),e.maxWidth=Math.min(i,m-e.left)}var an=G({name:"QMenu",inheritAttrs:!1,props:{...Xt,...yt,...Ze,...Je,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:Ke},self:{type:String,validator:Ke},offset:{type:Array,validator:Jt},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...wt,"click","escapeKey"],setup(e,{slots:t,emit:l,attrs:a}){let o=null,n,i,h;const p=Z(),{proxy:m}=p,{$q:f}=m,A=R(null),b=R(!1),u=x(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),v=et(e,f),{registerTick:_,removeTick:$}=ge(),{registerTimeout:W}=Le(),{transitionProps:F,transitionStyle:s}=pt(e),{localScrollTarget:c,changeScrollEvent:C,unconfigureScrollTarget:B}=Gt(e,se),{anchorEl:q,canShow:L}=Yt({showing:b}),{hide:D}=xt({showing:b,canShow:L,handleShow:we,handleHide:K,hideOnRouteChange:u,processOnMount:!0}),{showPortal:J,hidePortal:ee,renderPortal:re}=Ct(p,A,pe,"menu"),g={anchorEl:q,innerRef:A,onClickOutside(y){if(e.persistent!==!0&&b.value===!0)return D(y),(y.type==="touchstart"||y.target.classList.contains("q-dialog__backdrop"))&&le(y),!0}},P=x(()=>Ne(e.anchor||(e.cover===!0?"center middle":"bottom start"),f.lang.rtl)),H=x(()=>e.cover===!0?P.value:Ne(e.self||"top start",f.lang.rtl)),z=x(()=>(e.square===!0?" q-menu--square":"")+(v.value===!0?" q-menu--dark q-dark":"")),ue=x(()=>e.autoClose===!0?{onClick:ve}:{}),U=x(()=>b.value===!0&&e.persistent!==!0);Q(U,y=>{y===!0?(At(V),Zt(g)):(Fe(V),ze(g))});function te(){kt(()=>{let y=A.value;y&&y.contains(document.activeElement)!==!0&&(y=y.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||y.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||y.querySelector("[autofocus], [data-autofocus]")||y,y.focus({preventScroll:!0}))})}function we(y){if(o=e.noRefocus===!1?document.activeElement:null,Tt(ce),J(),se(),n=void 0,y!==void 0&&(e.touchPosition||e.contextMenu)){const ne=Ee(y);if(ne.left!==void 0){const{top:xe,left:Ce}=q.value.getBoundingClientRect();n={left:ne.left-Ce,top:ne.top-xe}}}i===void 0&&(i=Q(()=>f.screen.width+"|"+f.screen.height+"|"+e.self+"|"+e.anchor+"|"+f.lang.rtl,X)),e.noFocus!==!0&&document.activeElement.blur(),_(()=>{X(),e.noFocus!==!0&&te()}),W(()=>{f.platform.is.ios===!0&&(h=e.autoClose,A.value.click()),X(),J(!0),l("show",y)},e.transitionDuration)}function K(y){$(),ee(),j(!0),o!==null&&(y===void 0||y.qClickOutside!==!0)&&(((y&&y.type.indexOf("key")===0?o.closest('[tabindex]:not([tabindex^="-"])'):void 0)||o).focus(),o=null),W(()=>{ee(!0),l("hide",y)},e.transitionDuration)}function j(y){n=void 0,i!==void 0&&(i(),i=void 0),(y===!0||b.value===!0)&&(qt(ce),B(),ze(g),Fe(V)),y!==!0&&(o=null)}function se(){(q.value!==null||e.scrollTarget!==void 0)&&(c.value=Pt(q.value,e.scrollTarget),C(c.value,X))}function ve(y){h!==!0?(St(m,y),l("click",y)):h=!1}function ce(y){U.value===!0&&e.noFocus!==!0&&Bt(A.value,y.target)!==!0&&te()}function V(y){l("escapeKey"),D(y)}function X(){it({targetEl:A.value,offset:e.offset,anchorEl:q.value,anchorOrigin:P.value,selfOrigin:H.value,absoluteOffset:n,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function pe(){return k(tt,F.value,()=>b.value===!0?k("div",{role:"menu",...a,ref:A,tabindex:-1,class:["q-menu q-position-engine scroll"+z.value,a.class],style:[a.style,s.value],...ue.value},ie(t.default)):null)}return fe(j),Object.assign(m,{focus:te,updatePosition:X}),re}});let rt=!1;{const e=document.createElement("div");e.setAttribute("dir","rtl"),Object.assign(e.style,{width:"1px",height:"1px",overflow:"auto"});const t=document.createElement("div");Object.assign(t.style,{width:"1000px",height:"1px"}),document.body.appendChild(e),e.appendChild(t),e.scrollLeft=-1e3,rt=e.scrollLeft>=0,e.remove()}const on=Object.keys(nt),ln=e=>on.reduce((t,l)=>{const a=e[l];return a!==void 0&&(t[l]=a),t},{});var Pn=G({name:"QBtnDropdown",props:{...nt,...Je,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:l}){const{proxy:a}=Z(),o=R(e.modelValue),n=R(null),i=at(),h=x(()=>{const c={"aria-expanded":o.value===!0?"true":"false","aria-haspopup":"true","aria-controls":i,"aria-label":e.toggleAriaLabel||a.$q.lang.label[o.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(c["aria-disabled"]="true"),c}),p=x(()=>"q-btn-dropdown__arrow"+(o.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),m=x(()=>Lt(e)),f=x(()=>ln(e));Q(()=>e.modelValue,c=>{n.value!==null&&n.value[c?"show":"hide"]()}),Q(()=>e.split,s);function A(c){o.value=!0,l("beforeShow",c)}function b(c){l("show",c),l("update:modelValue",!0)}function u(c){o.value=!1,l("beforeHide",c)}function v(c){l("hide",c),l("update:modelValue",!1)}function _(c){l("click",c)}function $(c){Et(c),s(),l("click",c)}function W(c){n.value!==null&&n.value.toggle(c)}function F(c){n.value!==null&&n.value.show(c)}function s(c){n.value!==null&&n.value.hide(c)}return Object.assign(a,{show:F,hide:s,toggle:W}),_e(()=>{e.modelValue===!0&&F()}),()=>{const c=[k(de,{class:p.value,name:e.dropdownIcon||a.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&c.push(k(an,{ref:n,id:i,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:A,onShow:b,onBeforeHide:u,onHide:v},t.default)),e.split===!1?k(Pe,{class:"q-btn-dropdown q-btn-dropdown--simple",...f.value,...h.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:_},{default:()=>ie(t.label,[]).concat(c),loading:t.loading}):k(Nt,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...m.value,glossy:e.glossy,stretch:e.stretch},()=>[k(Pe,{class:"q-btn-dropdown--current",...f.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:$},{default:t.label,loading:t.loading}),k(Pe,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...h.value,...m.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>c)])}}});let rn=0;const un=["click","keydown"],sn={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${rn++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function cn(e,t,l,a){const o=Mt(ot,Se);if(o===Se)return console.error("QTab/QRouteTab component needs to be child of QTabs"),Se;const{proxy:n}=Z(),i=R(null),h=R(null),p=R(null),m=x(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),f=x(()=>o.currentModel.value===e.name),A=x(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(f.value===!0?" q-tab--active"+(o.tabProps.value.activeClass?" "+o.tabProps.value.activeClass:"")+(o.tabProps.value.activeColor?` text-${o.tabProps.value.activeColor}`:"")+(o.tabProps.value.activeBgColor?` bg-${o.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&o.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||o.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(a!==void 0?a.linkClass.value:"")),b=x(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(o.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),u=x(()=>e.disable===!0||o.hasFocus.value===!0||f.value===!1&&o.hasActiveTab.value===!0?-1:e.tabindex||0);function v(s,c){if(c!==!0&&i.value!==null&&i.value.focus(),e.disable===!0){a!==void 0&&a.hasRouterLink.value===!0&&le(s);return}if(a===void 0){o.updateModel({name:e.name}),l("click",s);return}if(a.hasRouterLink.value===!0){const C=(B={})=>{let q;const L=B.to===void 0||Wt(B.to,e.to)===!0?o.avoidRouteWatcher=at():null;return a.navigateToRouterLink(s,{...B,returnRouterError:!0}).catch(D=>{q=D}).then(D=>{if(L===o.avoidRouteWatcher&&(o.avoidRouteWatcher=!1,q===void 0&&(D===void 0||D.message.startsWith("Avoided redundant navigation")===!0)&&o.updateModel({name:e.name})),B.returnRouterError===!0)return q!==void 0?Promise.reject(q):D})};l("click",s,C),s.defaultPrevented!==!0&&C();return}l("click",s)}function _(s){Ye(s,[13,32])?v(s,!0):$t(s)!==!0&&s.keyCode>=35&&s.keyCode<=40&&s.altKey!==!0&&s.metaKey!==!0&&o.onKbdNavigate(s.keyCode,n.$el)===!0&&le(s),l("keydown",s)}function $(){const s=o.tabProps.value.narrowIndicator,c=[],C=k("div",{ref:p,class:["q-tab__indicator",o.tabProps.value.indicatorClass]});e.icon!==void 0&&c.push(k(de,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&c.push(k("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&c.push(e.alertIcon!==void 0?k(de,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):k("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),s===!0&&c.push(C);const B=[k("div",{class:"q-focus-helper",tabindex:-1,ref:i}),k("div",{class:b.value},Dt(t.default,c))];return s===!1&&B.push(C),B}const W={name:x(()=>e.name),rootRef:h,tabIndicatorRef:p,routeData:a};fe(()=>{o.unregisterTab(W)}),_e(()=>{o.registerTab(W)});function F(s,c){const C={ref:h,class:A.value,tabindex:u.value,role:"tab","aria-selected":f.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:v,onKeydown:_,...c};return _t(k(s,C,$()),[[Rt,m.value]])}return{renderTab:F,$tabs:o}}var Sn=G({name:"QTab",props:sn,emits:un,setup(e,{slots:t,emit:l}){const{renderTab:a}=cn(e,t,l);return()=>a("div")}});function dn(e,t,l){const a=l===!0?["left","right"]:["top","bottom"];return`absolute-${t===!0?a[0]:a[1]}${e?` text-${e}`:""}`}const fn=["left","center","right","justify"];var kn=G({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>fn.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:t,emit:l}){const{proxy:a}=Z(),{$q:o}=a,{registerTick:n}=ge(),{registerTick:i}=ge(),{registerTick:h}=ge(),{registerTimeout:p,removeTimeout:m}=Le(),{registerTimeout:f,removeTimeout:A}=Le(),b=R(null),u=R(null),v=R(e.modelValue),_=R(!1),$=R(!0),W=R(!1),F=R(!1),s=[],c=R(0),C=R(!1);let B=null,q=null,L;const D=x(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:dn(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),J=x(()=>{const r=c.value,d=v.value;for(let w=0;w<r;w++)if(s[w].name.value===d)return!0;return!1}),ee=x(()=>`q-tabs__content--align-${_.value===!0?"left":F.value===!0?"justify":e.align}`),re=x(()=>`q-tabs row no-wrap items-center q-tabs--${_.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),g=x(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+ee.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),P=x(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),H=x(()=>e.vertical!==!0&&o.lang.rtl===!0),z=x(()=>rt===!1&&H.value===!0);Q(H,j),Q(()=>e.modelValue,r=>{ue({name:r,setCurrent:!0,skipEmit:!0})}),Q(()=>e.outsideArrows,U);function ue({name:r,setCurrent:d,skipEmit:w}){v.value!==r&&(w!==!0&&e["onUpdate:modelValue"]!==void 0&&l("update:modelValue",r),(d===!0||e["onUpdate:modelValue"]===void 0)&&(we(v.value,r),v.value=r))}function U(){n(()=>{te({width:b.value.offsetWidth,height:b.value.offsetHeight})})}function te(r){if(P.value===void 0||u.value===null)return;const d=r[P.value.container],w=Math.min(u.value[P.value.scroll],Array.prototype.reduce.call(u.value.children,(M,S)=>M+(S[P.value.content]||0),0)),E=d>0&&w>d;_.value=E,E===!0&&i(j),F.value=d<parseInt(e.breakpoint,10)}function we(r,d){const w=r!=null&&r!==""?s.find(M=>M.name.value===r):null,E=d!=null&&d!==""?s.find(M=>M.name.value===d):null;if(w&&E){const M=w.tabIndicatorRef.value,S=E.tabIndicatorRef.value;B!==null&&(clearTimeout(B),B=null),M.style.transition="none",M.style.transform="none",S.style.transition="none",S.style.transform="none";const T=M.getBoundingClientRect(),I=S.getBoundingClientRect();S.style.transform=e.vertical===!0?`translate3d(0,${T.top-I.top}px,0) scale3d(1,${I.height?T.height/I.height:1},1)`:`translate3d(${T.left-I.left}px,0,0) scale3d(${I.width?T.width/I.width:1},1,1)`,h(()=>{B=setTimeout(()=>{B=null,S.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",S.style.transform="none"},70)})}E&&_.value===!0&&K(E.rootRef.value)}function K(r){const{left:d,width:w,top:E,height:M}=u.value.getBoundingClientRect(),S=r.getBoundingClientRect();let T=e.vertical===!0?S.top-E:S.left-d;if(T<0){u.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(T),j();return}T+=e.vertical===!0?S.height-M:S.width-w,T>0&&(u.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(T),j())}function j(){const r=u.value;if(r===null)return;const d=r.getBoundingClientRect(),w=e.vertical===!0?r.scrollTop:Math.abs(r.scrollLeft);H.value===!0?($.value=Math.ceil(w+d.width)<r.scrollWidth-1,W.value=w>0):($.value=w>0,W.value=e.vertical===!0?Math.ceil(w+d.height)<r.scrollHeight:Math.ceil(w+d.width)<r.scrollWidth)}function se(r){q!==null&&clearInterval(q),q=setInterval(()=>{y(r)===!0&&V()},5)}function ve(){se(z.value===!0?Number.MAX_SAFE_INTEGER:0)}function ce(){se(z.value===!0?0:Number.MAX_SAFE_INTEGER)}function V(){q!==null&&(clearInterval(q),q=null)}function X(r,d){const w=Array.prototype.filter.call(u.value.children,I=>I===d||I.matches&&I.matches(".q-tab.q-focusable")===!0),E=w.length;if(E===0)return;if(r===36)return K(w[0]),w[0].focus(),!0;if(r===35)return K(w[E-1]),w[E-1].focus(),!0;const M=r===(e.vertical===!0?38:37),S=r===(e.vertical===!0?40:39),T=M===!0?-1:S===!0?1:void 0;if(T!==void 0){const I=H.value===!0?-1:1,O=w.indexOf(d)+T*I;return O>=0&&O<E&&(K(w[O]),w[O].focus({preventScroll:!0})),!0}}const pe=x(()=>z.value===!0?{get:r=>Math.abs(r.scrollLeft),set:(r,d)=>{r.scrollLeft=-d}}:e.vertical===!0?{get:r=>r.scrollTop,set:(r,d)=>{r.scrollTop=d}}:{get:r=>r.scrollLeft,set:(r,d)=>{r.scrollLeft=d}});function y(r){const d=u.value,{get:w,set:E}=pe.value;let M=!1,S=w(d);const T=r<S?-1:1;return S+=T*5,S<0?(M=!0,S=0):(T===-1&&S<=r||T===1&&S>=r)&&(M=!0,S=r),E(d,S),j(),M}function ne(r,d){for(const w in r)if(r[w]!==d[w])return!1;return!0}function xe(){let r=null,d={matchedLen:0,queryDiff:9999,hrefLen:0};const w=s.filter(T=>T.routeData!==void 0&&T.routeData.hasRouterLink.value===!0),{hash:E,query:M}=a.$route,S=Object.keys(M).length;for(const T of w){const I=T.routeData.exact.value===!0;if(T.routeData[I===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:O,query:Te,matched:dt,href:ft}=T.routeData.resolvedLink.value,qe=Object.keys(Te).length;if(I===!0){if(O!==E||qe!==S||ne(M,Te)===!1)continue;r=T.name.value;break}if(O!==""&&O!==E||qe!==0&&ne(Te,M)===!1)continue;const N={matchedLen:dt.length,queryDiff:S-qe,hrefLen:ft.length-O.length};if(N.matchedLen>d.matchedLen){r=T.name.value,d=N;continue}else if(N.matchedLen!==d.matchedLen)continue;if(N.queryDiff<d.queryDiff)r=T.name.value,d=N;else if(N.queryDiff!==d.queryDiff)continue;N.hrefLen>d.hrefLen&&(r=T.name.value,d=N)}r===null&&s.some(T=>T.routeData===void 0&&T.name.value===v.value)===!0||ue({name:r,setCurrent:!0})}function Ce(r){if(m(),C.value!==!0&&b.value!==null&&r.target&&typeof r.target.closest=="function"){const d=r.target.closest(".q-tab");d&&b.value.contains(d)===!0&&(C.value=!0,_.value===!0&&K(d))}}function ut(){p(()=>{C.value=!1},30)}function he(){$e.avoidRouteWatcher===!1?f(xe):A()}function Re(){if(L===void 0){const r=Q(()=>a.$route.fullPath,he);L=()=>{r(),L=void 0}}}function st(r){s.push(r),c.value++,U(),r.routeData===void 0||a.$route===void 0?f(()=>{if(_.value===!0){const d=v.value,w=d!=null&&d!==""?s.find(E=>E.name.value===d):null;w&&K(w.rootRef.value)}}):(Re(),r.routeData.hasRouterLink.value===!0&&he())}function ct(r){s.splice(s.indexOf(r),1),c.value--,U(),L!==void 0&&r.routeData!==void 0&&(s.every(d=>d.routeData===void 0)===!0&&L(),he())}const $e={currentModel:v,tabProps:D,hasFocus:C,hasActiveTab:J,registerTab:st,unregisterTab:ct,verifyRouteModel:he,updateModel:ue,onKbdNavigate:X,avoidRouteWatcher:!1};Ht(ot,$e);function De(){B!==null&&clearTimeout(B),V(),L!==void 0&&L()}let We;return fe(De),It(()=>{We=L!==void 0,De()}),Ft(()=>{We===!0&&Re(),U()}),()=>k("div",{ref:b,class:re.value,role:"tablist",onFocusin:Ce,onFocusout:ut},[k(Ut,{onResize:te}),k("div",{ref:u,class:g.value,onScroll:j},ie(t.default)),k(de,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+($.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||o.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:ve,onTouchstartPassive:ve,onMouseupPassive:V,onMouseleavePassive:V,onTouchendPassive:V}),k(de,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(W.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||o.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:ce,onTouchstartPassive:ce,onMouseupPassive:V,onMouseleavePassive:V,onTouchendPassive:V})])}});function vn(e){const t=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((l,a)=>{const o=parseFloat(l);o&&(t[a]=o)}),t}var hn=Qt({name:"touch-swipe",beforeMount(e,{value:t,arg:l,modifiers:a}){if(a.mouse!==!0&&ae.has.touch!==!0)return;const o=a.mouseCapture===!0?"Capture":"",n={handler:t,sensitivity:vn(l),direction:Qe(a),noop:Vt,mouseStart(i){Ve(i,n)&&zt(i)&&(oe(n,"temp",[[document,"mousemove","move",`notPassive${o}`],[document,"mouseup","end","notPassiveCapture"]]),n.start(i,!0))},touchStart(i){if(Ve(i,n)){const h=i.target;oe(n,"temp",[[h,"touchmove","move","notPassiveCapture"],[h,"touchcancel","end","notPassiveCapture"],[h,"touchend","end","notPassiveCapture"]]),n.start(i)}},start(i,h){ae.is.firefox===!0&&ke(e,!0);const p=Ee(i);n.event={x:p.left,y:p.top,time:Date.now(),mouse:h===!0,dir:!1}},move(i){if(n.event===void 0)return;if(n.event.dir!==!1){le(i);return}const h=Date.now()-n.event.time;if(h===0)return;const p=Ee(i),m=p.left-n.event.x,f=Math.abs(m),A=p.top-n.event.y,b=Math.abs(A);if(n.event.mouse!==!0){if(f<n.sensitivity[1]&&b<n.sensitivity[1]){n.end(i);return}}else if(window.getSelection().toString()!==""){n.end(i);return}else if(f<n.sensitivity[2]&&b<n.sensitivity[2])return;const u=f/h,v=b/h;n.direction.vertical===!0&&f<b&&f<100&&v>n.sensitivity[0]&&(n.event.dir=A<0?"up":"down"),n.direction.horizontal===!0&&f>b&&b<100&&u>n.sensitivity[0]&&(n.event.dir=m<0?"left":"right"),n.direction.up===!0&&f<b&&A<0&&f<100&&v>n.sensitivity[0]&&(n.event.dir="up"),n.direction.down===!0&&f<b&&A>0&&f<100&&v>n.sensitivity[0]&&(n.event.dir="down"),n.direction.left===!0&&f>b&&m<0&&b<100&&u>n.sensitivity[0]&&(n.event.dir="left"),n.direction.right===!0&&f>b&&m>0&&b<100&&u>n.sensitivity[0]&&(n.event.dir="right"),n.event.dir!==!1?(le(i),n.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),lt(),n.styleCleanup=_=>{n.styleCleanup=void 0,document.body.classList.remove("non-selectable");const $=()=>{document.body.classList.remove("no-pointer-events--children")};_===!0?setTimeout($,50):$()}),n.handler({evt:i,touch:n.event.mouse!==!0,mouse:n.event.mouse,direction:n.event.dir,duration:h,distance:{x:f,y:b}})):n.end(i)},end(i){n.event!==void 0&&(me(n,"temp"),ae.is.firefox===!0&&ke(e,!1),n.styleCleanup!==void 0&&n.styleCleanup(!0),i!==void 0&&n.event.dir!==!1&&le(i),n.event=void 0)}};if(e.__qtouchswipe=n,a.mouse===!0){const i=a.mouseCapture===!0||a.mousecapture===!0?"Capture":"";oe(n,"main",[[e,"mousedown","mouseStart",`passive${i}`]])}ae.has.touch===!0&&oe(n,"main",[[e,"touchstart","touchStart",`passive${a.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,t){const l=e.__qtouchswipe;l!==void 0&&(t.oldValue!==t.value&&(typeof t.value!="function"&&l.end(),l.handler=t.value),l.direction=Qe(t.modifiers))},beforeUnmount(e){const t=e.__qtouchswipe;t!==void 0&&(me(t,"main"),me(t,"temp"),ae.is.firefox===!0&&ke(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(),delete e.__qtouchswipe)}});function mn(){const e=new Map;return{getCache:function(t,l){return e[t]===void 0?e[t]=l:e[t]},getCacheWithFn:function(t,l){return e[t]===void 0?e[t]=l():e[t]}}}const gn={name:{required:!0},disable:Boolean},Xe={setup(e,{slots:t}){return()=>k("div",{class:"q-panel scroll",role:"tabpanel"},ie(t.default))}},bn={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},yn=["update:modelValue","beforeTransition","transition"];function wn(){const{props:e,emit:t,proxy:l}=Z(),{getCacheWithFn:a}=mn();let o,n;const i=R(null),h=R(null);function p(g){const P=e.vertical===!0?"up":"left";q((l.$q.lang.rtl===!0?-1:1)*(g.direction===P?1:-1))}const m=x(()=>[[hn,p,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),f=x(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),A=x(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),b=x(()=>`--q-transition-duration: ${e.transitionDuration}ms`),u=x(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),v=x(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),_=x(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);Q(()=>e.modelValue,(g,P)=>{const H=s(g)===!0?c(g):-1;n!==!0&&B(H===-1?0:H<c(P)?-1:1),i.value!==H&&(i.value=H,t("beforeTransition",g,P),Ge(()=>{t("transition",g,P)}))});function $(){q(1)}function W(){q(-1)}function F(g){t("update:modelValue",g)}function s(g){return g!=null&&g!==""}function c(g){return o.findIndex(P=>P.props.name===g&&P.props.disable!==""&&P.props.disable!==!0)}function C(){return o.filter(g=>g.props.disable!==""&&g.props.disable!==!0)}function B(g){const P=g!==0&&e.animated===!0&&i.value!==-1?"q-transition--"+(g===-1?f.value:A.value):null;h.value!==P&&(h.value=P)}function q(g,P=i.value){let H=P+g;for(;H>-1&&H<o.length;){const z=o[H];if(z!==void 0&&z.props.disable!==""&&z.props.disable!==!0){B(g),n=!0,t("update:modelValue",z.props.name),setTimeout(()=>{n=!1});return}H+=g}e.infinite===!0&&o.length!==0&&P!==-1&&P!==o.length&&q(g,g===-1?o.length:-1)}function L(){const g=c(e.modelValue);return i.value!==g&&(i.value=g),!0}function D(){const g=s(e.modelValue)===!0&&L()&&o[i.value];return e.keepAlive===!0?[k(Ot,v.value,[k(_.value===!0?a(u.value,()=>({...Xe,name:u.value})):Xe,{key:u.value,style:b.value},()=>g)])]:[k("div",{class:"q-panel scroll",style:b.value,key:u.value,role:"tabpanel"},[g])]}function J(){if(o.length!==0)return e.animated===!0?[k(tt,{name:h.value},D)]:D()}function ee(g){return o=jt(ie(g.default,[])).filter(P=>P.props!==null&&P.props.slot===void 0&&s(P.props.name)===!0),o.length}function re(){return o}return Object.assign(l,{next:$,previous:W,goTo:F}),{panelIndex:i,panelDirectives:m,updatePanelsList:ee,updatePanelIndex:L,getPanelContent:J,getEnabledPanels:C,getPanels:re,isValidPanelName:s,keepAliveProps:v,needsUniqueKeepAliveWrapper:_,goToPanelByOffset:q,goToPanel:F,nextPanel:$,previousPanel:W}}var An=G({name:"QTabPanel",props:gn,setup(e,{slots:t}){return()=>k("div",{class:"q-tab-panel",role:"tabpanel"},ie(t.default))}}),Bn=G({name:"QTabPanels",props:{...bn,...Ze},emits:yn,setup(e,{slots:t}){const l=Z(),a=et(e,l.proxy.$q),{updatePanelsList:o,getPanelContent:n,panelDirectives:i}=wn(),h=x(()=>"q-tab-panels q-panel-parent"+(a.value===!0?" q-tab-panels--dark q-dark":""));return()=>(o(t),Kt("div",{class:h.value},n(),"pan",e.swipeable,()=>i.value))}});export{an as Q,qn as a,kn as b,Sn as c,Bn as d,An as e,Pn as f,Jt as g,Gt as h,Yt as i,ze as j,Zt as k,Ne as p,rt as r,it as s,Xt as u,Ke as v};
