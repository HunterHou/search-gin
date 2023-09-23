import{c as F,a as r,h as p,d as ue,i as pe,e as W,r as w,w as _,o as se,f as lt,g as Y,l as ce,j as Re,n as ot,k as rt,m as nt,p as it,q as ut,u as Ae,s as De,t as st,v as ct,x as vt,y as We,z as ie,A as _e,B as ge,C as dt,D as ft,E as ht,F as mt,G as bt,H as ke,I as Te,J as gt,K as Fe,L as yt,M as St,N as ye,O as ne,P as zt,Q as wt,R as te,S as Ce,T as L,U as C,V as pt,W as qt,X as ee,Y as Ie,Z as _t,_ as kt,$ as Se,a0 as ze,a1 as Pe,a2 as $e,a3 as Tt,a4 as xe,a5 as K}from"./index.6a121600.js";import{Q as le,a as Ct,b as Pt}from"./QItem.058c4bad.js";import{Q as je,a as $t}from"./QList.58fd36e0.js";import{T as ae}from"./TouchPan.e9fc3817.js";import{b as U}from"./format.a33550d6.js";import{P as xt}from"./PlayingVideo.004ae201.js";import{u as Bt}from"./System.0283e853.js";import{G as Lt}from"./settingAPI.8d767f18.js";import{u as Mt}from"./use-quasar.a6b43963.js";import"./selection.7c5dab50.js";import"./QChip.5b48a351.js";import"./index.8721f5a7.js";import"./searchAPI.4428ae37.js";import"./axios.4bc9150b.js";var Qt=F({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:b}){const d=r(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>p("div",{class:d.value},ue(b.default))}});const Ot=p("div",{class:"q-space"});var Ht=F({name:"QSpace",setup(){return()=>Ot}}),Vt=F({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:b}){const d=r(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>p("div",{class:d.value,role:"toolbar"},ue(b.default))}}),Rt=F({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:b,emit:d}){const{proxy:{$q:c}}=Y(),n=pe(ce,W);if(n===W)return console.error("QHeader needs to be child of QLayout"),W;const f=w(parseInt(e.heightHint,10)),i=w(!0),t=r(()=>e.reveal===!0||n.view.value.indexOf("H")>-1||c.platform.is.ios&&n.isContainer.value===!0),k=r(()=>{if(e.modelValue!==!0)return 0;if(t.value===!0)return i.value===!0?f.value:0;const u=f.value-n.scroll.value.position;return u>0?u:0}),q=r(()=>e.modelValue!==!0||t.value===!0&&i.value!==!0),l=r(()=>e.modelValue===!0&&q.value===!0&&e.reveal===!0),$=r(()=>"q-header q-layout__section--marginal "+(t.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(q.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),s=r(()=>{const u=n.rows.value.top,x={};return u[0]==="l"&&n.left.space===!0&&(x[c.lang.rtl===!0?"right":"left"]=`${n.left.size}px`),u[2]==="r"&&n.right.space===!0&&(x[c.lang.rtl===!0?"left":"right"]=`${n.right.size}px`),x});function y(u,x){n.update("header",u,x)}function S(u,x){u.value!==x&&(u.value=x)}function H({height:u}){S(f,u),y("size",u)}function P(u){l.value===!0&&S(i,!0),d("focusin",u)}_(()=>e.modelValue,u=>{y("space",u),S(i,!0),n.animate()}),_(k,u=>{y("offset",u)}),_(()=>e.reveal,u=>{u===!1&&S(i,e.modelValue)}),_(i,u=>{n.animate(),d("reveal",u)}),_(n.scroll,u=>{e.reveal===!0&&S(i,u.direction==="up"||u.position<=e.revealOffset||u.position-u.inflectionPoint<100)});const g={};return n.instances.header=g,e.modelValue===!0&&y("size",f.value),y("space",e.modelValue),y("offset",k.value),se(()=>{n.instances.header===g&&(n.instances.header=void 0,y("size",0),y("offset",0),y("space",!1))}),()=>{const u=lt(b.default,[]);return e.elevated===!0&&u.push(p("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),u.push(p(le,{debounce:0,onResize:H})),p("header",{class:$.value,style:s.value,onFocusin:P},u)}}});const{passive:Be}=nt,At=["both","horizontal","vertical"];var Ee=F({name:"QScrollObserver",props:{axis:{type:String,validator:e=>At.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:b}){const d={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let c=null,n,f;_(()=>e.scrollTarget,()=>{k(),t()});function i(){c!==null&&c();const $=Math.max(0,it(n)),s=ut(n),y={top:$-d.position.top,left:s-d.position.left};if(e.axis==="vertical"&&y.top===0||e.axis==="horizontal"&&y.left===0)return;const S=Math.abs(y.top)>=Math.abs(y.left)?y.top<0?"up":"down":y.left<0?"left":"right";d.position={top:$,left:s},d.directionChanged=d.direction!==S,d.delta=y,d.directionChanged===!0&&(d.direction=S,d.inflectionPoint=d.position),b("scroll",{...d})}function t(){n=rt(f,e.scrollTarget),n.addEventListener("scroll",q,Be),q(!0)}function k(){n!==void 0&&(n.removeEventListener("scroll",q,Be),n=void 0)}function q($){if($===!0||e.debounce===0||e.debounce==="0")i();else if(c===null){const[s,y]=e.debounce?[setTimeout(i,e.debounce),clearTimeout]:[requestAnimationFrame(i),cancelAnimationFrame];c=()=>{y(s),c=null}}}const{proxy:l}=Y();return _(()=>l.$q.lang.rtl,i),Re(()=>{f=l.$el.parentNode,t()}),se(()=>{c!==null&&c(),k()}),Object.assign(l,{trigger:q,getPosition:()=>d}),ot}});const Le=["vertical","horizontal"],we={vertical:{offset:"offsetY",scroll:"scrollTop",dir:"down",dist:"y"},horizontal:{offset:"offsetX",scroll:"scrollLeft",dir:"right",dist:"x"}},Me={prevent:!0,mouse:!0,mouseAllDir:!0},Qe=e=>e>=250?50:Math.ceil(e/5);var Dt=F({name:"QScrollArea",props:{...Ae,thumbStyle:Object,verticalThumbStyle:Object,horizontalThumbStyle:Object,barStyle:[Array,String,Object],verticalBarStyle:[Array,String,Object],horizontalBarStyle:[Array,String,Object],contentStyle:[Array,String,Object],contentActiveStyle:[Array,String,Object],delay:{type:[String,Number],default:1e3},visible:{type:Boolean,default:null},tabindex:[String,Number],onScroll:Function},setup(e,{slots:b,emit:d}){const c=w(!1),n=w(!1),f=w(!1),i={vertical:w(0),horizontal:w(0)},t={vertical:{ref:w(null),position:w(0),size:w(0)},horizontal:{ref:w(null),position:w(0),size:w(0)}},{proxy:k}=Y(),q=De(e,k.$q);let l=null,$;const s=w(null),y=r(()=>"q-scrollarea"+(q.value===!0?" q-scrollarea--dark":""));t.vertical.percentage=r(()=>{const o=t.vertical.size.value-i.vertical.value;if(o<=0)return 0;const v=U(t.vertical.position.value/o,0,1);return Math.round(v*1e4)/1e4}),t.vertical.thumbHidden=r(()=>(e.visible===null?f.value:e.visible)!==!0&&c.value===!1&&n.value===!1||t.vertical.size.value<=i.vertical.value+1),t.vertical.thumbStart=r(()=>t.vertical.percentage.value*(i.vertical.value-t.vertical.thumbSize.value)),t.vertical.thumbSize=r(()=>Math.round(U(i.vertical.value*i.vertical.value/t.vertical.size.value,Qe(i.vertical.value),i.vertical.value))),t.vertical.style=r(()=>({...e.thumbStyle,...e.verticalThumbStyle,top:`${t.vertical.thumbStart.value}px`,height:`${t.vertical.thumbSize.value}px`})),t.vertical.thumbClass=r(()=>"q-scrollarea__thumb q-scrollarea__thumb--v absolute-right"+(t.vertical.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),t.vertical.barClass=r(()=>"q-scrollarea__bar q-scrollarea__bar--v absolute-right"+(t.vertical.thumbHidden.value===!0?" q-scrollarea__bar--invisible":"")),t.horizontal.percentage=r(()=>{const o=t.horizontal.size.value-i.horizontal.value;if(o<=0)return 0;const v=U(Math.abs(t.horizontal.position.value)/o,0,1);return Math.round(v*1e4)/1e4}),t.horizontal.thumbHidden=r(()=>(e.visible===null?f.value:e.visible)!==!0&&c.value===!1&&n.value===!1||t.horizontal.size.value<=i.horizontal.value+1),t.horizontal.thumbStart=r(()=>t.horizontal.percentage.value*(i.horizontal.value-t.horizontal.thumbSize.value)),t.horizontal.thumbSize=r(()=>Math.round(U(i.horizontal.value*i.horizontal.value/t.horizontal.size.value,Qe(i.horizontal.value),i.horizontal.value))),t.horizontal.style=r(()=>({...e.thumbStyle,...e.horizontalThumbStyle,[k.$q.lang.rtl===!0?"right":"left"]:`${t.horizontal.thumbStart.value}px`,width:`${t.horizontal.thumbSize.value}px`})),t.horizontal.thumbClass=r(()=>"q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom"+(t.horizontal.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),t.horizontal.barClass=r(()=>"q-scrollarea__bar q-scrollarea__bar--h absolute-bottom"+(t.horizontal.thumbHidden.value===!0?" q-scrollarea__bar--invisible":""));const S=r(()=>t.vertical.thumbHidden.value===!0&&t.horizontal.thumbHidden.value===!0?e.contentStyle:e.contentActiveStyle),H=[[ae,o=>{A(o,"vertical")},void 0,{vertical:!0,...Me}]],P=[[ae,o=>{A(o,"horizontal")},void 0,{horizontal:!0,...Me}]];function g(){const o={};return Le.forEach(v=>{const z=t[v];o[v+"Position"]=z.position.value,o[v+"Percentage"]=z.percentage.value,o[v+"Size"]=z.size.value,o[v+"ContainerSize"]=i[v].value}),o}const u=st(()=>{const o=g();o.ref=k,d("scroll",o)},0);function x(o,v,z){if(Le.includes(o)===!1){console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");return}(o==="vertical"?_e:ge)(s.value,v,z)}function h({height:o,width:v}){let z=!1;i.vertical.value!==o&&(i.vertical.value=o,z=!0),i.horizontal.value!==v&&(i.horizontal.value=v,z=!0),z===!0&&R()}function T({position:o}){let v=!1;t.vertical.position.value!==o.top&&(t.vertical.position.value=o.top,v=!0),t.horizontal.position.value!==o.left&&(t.horizontal.position.value=o.left,v=!0),v===!0&&R()}function B({height:o,width:v}){t.horizontal.size.value!==v&&(t.horizontal.size.value=v,R()),t.vertical.size.value!==o&&(t.vertical.size.value=o,R())}function A(o,v){const z=t[v];if(o.isFirst===!0){if(z.thumbHidden.value===!0)return;$=z.position.value,n.value=!0}else if(n.value!==!0)return;o.isFinal===!0&&(n.value=!1);const Q=we[v],X=i[v].value,ve=(z.size.value-X)/(X-z.thumbSize.value),de=o.distance[Q.dist],oe=$+(o.direction===Q.dir?1:-1)*de*ve;J(oe,v)}function I(o,v){const z=t[v];if(z.thumbHidden.value!==!0){const Q=o[we[v].offset];if(Q<z.thumbStart.value||Q>z.thumbStart.value+z.thumbSize.value){const X=Q-z.thumbSize.value/2;J(X/i[v].value*z.size.value,v)}z.ref.value!==null&&z.ref.value.dispatchEvent(new MouseEvent(o.type,o))}}function D(o){I(o,"vertical")}function V(o){I(o,"horizontal")}function R(){c.value=!0,l!==null&&clearTimeout(l),l=setTimeout(()=>{l=null,c.value=!1},e.delay),e.onScroll!==void 0&&u()}function J(o,v){s.value[we[v].scroll]=o}function j(){f.value=!0}function Z(){f.value=!1}let G=null;return _(()=>k.$q.lang.rtl,o=>{s.value!==null&&ge(s.value,Math.abs(t.horizontal.position.value)*(o===!0?-1:1))}),ct(()=>{G={top:t.vertical.position.value,left:t.horizontal.position.value}}),vt(()=>{if(G===null)return;const o=s.value;o!==null&&(ge(o,G.left),_e(o,G.top))}),se(u.cancel),Object.assign(k,{getScrollTarget:()=>s.value,getScroll:g,getScrollPosition:()=>({top:t.vertical.position.value,left:t.horizontal.position.value}),getScrollPercentage:()=>({top:t.vertical.percentage.value,left:t.horizontal.percentage.value}),setScrollPosition:x,setScrollPercentage(o,v,z){x(o,v*(t[o].size.value-i[o].value)*(o==="horizontal"&&k.$q.lang.rtl===!0?-1:1),z)}}),()=>p("div",{class:y.value,onMouseenter:j,onMouseleave:Z},[p("div",{ref:s,class:"q-scrollarea__container scroll relative-position fit hide-scrollbar",tabindex:e.tabindex!==void 0?e.tabindex:void 0},[p("div",{class:"q-scrollarea__content absolute",style:S.value},We(b.default,[p(le,{debounce:0,onResize:B})])),p(Ee,{axis:"both",onScroll:T})]),p(le,{debounce:0,onResize:h}),p("div",{class:t.vertical.barClass.value,style:[e.barStyle,e.verticalBarStyle],"aria-hidden":"true",onMousedown:D}),p("div",{class:t.horizontal.barClass.value,style:[e.barStyle,e.horizontalBarStyle],"aria-hidden":"true",onMousedown:V}),ie(p("div",{ref:t.vertical.ref,class:t.vertical.thumbClass.value,style:t.vertical.style.value,"aria-hidden":"true"}),H),ie(p("div",{ref:t.horizontal.ref,class:t.horizontal.thumbClass.value,style:t.horizontal.style.value,"aria-hidden":"true"}),P)])}});const Oe=150;var He=F({name:"QDrawer",inheritAttrs:!1,props:{...dt,...Ae,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...ft,"onLayout","miniState"],setup(e,{slots:b,emit:d,attrs:c}){const n=Y(),{proxy:{$q:f}}=n,i=De(e,f),{preventBodyScroll:t}=gt(),{registerTimeout:k,removeTimeout:q}=ht(),l=pe(ce,W);if(l===W)return console.error("QDrawer needs to be child of QLayout"),W;let $,s=null,y;const S=w(e.behavior==="mobile"||e.behavior!=="desktop"&&l.totalWidth.value<=e.breakpoint),H=r(()=>e.mini===!0&&S.value!==!0),P=r(()=>H.value===!0?e.miniWidth:e.width),g=w(e.showIfAbove===!0&&S.value===!1?!0:e.modelValue===!0),u=r(()=>e.persistent!==!0&&(S.value===!0||X.value===!0));function x(a,m){if(A(),a!==!1&&l.animate(),O(0),S.value===!0){const M=l.instances[o.value];M!==void 0&&M.belowBreakpoint===!0&&M.hide(!1),E(1),l.isContainer.value!==!0&&t(!0)}else E(0),a!==!1&&he(!1);k(()=>{a!==!1&&he(!0),m!==!0&&d("show",a)},Oe)}function h(a,m){I(),a!==!1&&l.animate(),E(0),O(R.value*P.value),me(),m!==!0?k(()=>{d("hide",a)},Oe):q()}const{show:T,hide:B}=mt({showing:g,hideOnRouteChange:u,handleShow:x,handleHide:h}),{addToHistory:A,removeFromHistory:I}=bt(g,B,u),D={belowBreakpoint:S,hide:B},V=r(()=>e.side==="right"),R=r(()=>(f.lang.rtl===!0?-1:1)*(V.value===!0?1:-1)),J=w(0),j=w(!1),Z=w(!1),G=w(P.value*R.value),o=r(()=>V.value===!0?"left":"right"),v=r(()=>g.value===!0&&S.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:P.value:0),z=r(()=>e.overlay===!0||e.miniToOverlay===!0||l.view.value.indexOf(V.value?"R":"L")>-1||f.platform.is.ios===!0&&l.isContainer.value===!0),Q=r(()=>e.overlay===!1&&g.value===!0&&S.value===!1),X=r(()=>e.overlay===!0&&g.value===!0&&S.value===!1),ve=r(()=>"fullscreen q-drawer__backdrop"+(g.value===!1&&j.value===!1?" hidden":"")),de=r(()=>({backgroundColor:`rgba(0,0,0,${J.value*.4})`})),oe=r(()=>V.value===!0?l.rows.value.top[2]==="r":l.rows.value.top[0]==="l"),Ne=r(()=>V.value===!0?l.rows.value.bottom[2]==="r":l.rows.value.bottom[0]==="l"),Ue=r(()=>{const a={};return l.header.space===!0&&oe.value===!1&&(z.value===!0?a.top=`${l.header.offset}px`:l.header.space===!0&&(a.top=`${l.header.size}px`)),l.footer.space===!0&&Ne.value===!1&&(z.value===!0?a.bottom=`${l.footer.offset}px`:l.footer.space===!0&&(a.bottom=`${l.footer.size}px`)),a}),Ge=r(()=>{const a={width:`${P.value}px`,transform:`translateX(${G.value}px)`};return S.value===!0?a:Object.assign(a,Ue.value)}),Ke=r(()=>"q-drawer__content fit "+(l.isContainer.value!==!0?"scroll":"overflow-auto")),Xe=r(()=>`q-drawer q-drawer--${e.side}`+(Z.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(i.value===!0?" q-drawer--dark q-dark":"")+(j.value===!0?" no-transition":g.value===!0?"":" q-layout--prevent-focus")+(S.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${H.value===!0?"mini":"standard"}`+(z.value===!0||Q.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(oe.value===!0?" q-drawer--top-padding":""))),Ye=r(()=>{const a=f.lang.rtl===!0?e.side:o.value;return[[ae,tt,void 0,{[a]:!0,mouse:!0}]]}),Je=r(()=>{const a=f.lang.rtl===!0?o.value:e.side;return[[ae,qe,void 0,{[a]:!0,mouse:!0}]]}),Ze=r(()=>{const a=f.lang.rtl===!0?o.value:e.side;return[[ae,qe,void 0,{[a]:!0,mouse:!0,mouseAllDir:!0}]]});function fe(){at(S,e.behavior==="mobile"||e.behavior!=="desktop"&&l.totalWidth.value<=e.breakpoint)}_(S,a=>{a===!0?($=g.value,g.value===!0&&B(!1)):e.overlay===!1&&e.behavior!=="mobile"&&$!==!1&&(g.value===!0?(O(0),E(0),me()):T(!1))}),_(()=>e.side,(a,m)=>{l.instances[m]===D&&(l.instances[m]=void 0,l[m].space=!1,l[m].offset=0),l.instances[a]=D,l[a].size=P.value,l[a].space=Q.value,l[a].offset=v.value}),_(l.totalWidth,()=>{(l.isContainer.value===!0||document.qScrollPrevented!==!0)&&fe()}),_(()=>e.behavior+e.breakpoint,fe),_(l.isContainer,a=>{g.value===!0&&t(a!==!0),a===!0&&fe()}),_(l.scrollbarWidth,()=>{O(g.value===!0?0:void 0)}),_(v,a=>{N("offset",a)}),_(Q,a=>{d("onLayout",a),N("space",a)}),_(V,()=>{O()}),_(P,a=>{O(),be(e.miniToOverlay,a)}),_(()=>e.miniToOverlay,a=>{be(a,P.value)}),_(()=>f.lang.rtl,()=>{O()}),_(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(et(),l.animate())}),_(H,a=>{d("miniState",a)});function O(a){a===void 0?ke(()=>{a=g.value===!0?0:P.value,O(R.value*a)}):(l.isContainer.value===!0&&V.value===!0&&(S.value===!0||Math.abs(a)===P.value)&&(a+=R.value*l.scrollbarWidth.value),G.value=a)}function E(a){J.value=a}function he(a){const m=a===!0?"remove":l.isContainer.value!==!0?"add":"";m!==""&&document.body.classList[m]("q-body--drawer-toggle")}function et(){s!==null&&clearTimeout(s),n.proxy&&n.proxy.$el&&n.proxy.$el.classList.add("q-drawer--mini-animate"),Z.value=!0,s=setTimeout(()=>{s=null,Z.value=!1,n&&n.proxy&&n.proxy.$el&&n.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function tt(a){if(g.value!==!1)return;const m=P.value,M=U(a.distance.x,0,m);if(a.isFinal===!0){M>=Math.min(75,m)===!0?T():(l.animate(),E(0),O(R.value*m)),j.value=!1;return}O((f.lang.rtl===!0?V.value!==!0:V.value)?Math.max(m-M,0):Math.min(0,M-m)),E(U(M/m,0,1)),a.isFirst===!0&&(j.value=!0)}function qe(a){if(g.value!==!0)return;const m=P.value,M=a.direction===e.side,re=(f.lang.rtl===!0?M!==!0:M)?U(a.distance.x,0,m):0;if(a.isFinal===!0){Math.abs(re)<Math.min(75,m)===!0?(l.animate(),E(1),O(0)):B(),j.value=!1;return}O(R.value*re),E(U(1-re/m,0,1)),a.isFirst===!0&&(j.value=!0)}function me(){t(!1),he(!0)}function N(a,m){l.update(e.side,a,m)}function at(a,m){a.value!==m&&(a.value=m)}function be(a,m){N("size",a===!0?e.miniWidth:m)}return l.instances[e.side]=D,be(e.miniToOverlay,P.value),N("space",Q.value),N("offset",v.value),e.showIfAbove===!0&&e.modelValue!==!0&&g.value===!0&&e["onUpdate:modelValue"]!==void 0&&d("update:modelValue",!0),Re(()=>{d("onLayout",Q.value),d("miniState",H.value),$=e.showIfAbove===!0;const a=()=>{(g.value===!0?x:h)(!1,!0)};if(l.totalWidth.value!==0){ke(a);return}y=_(l.totalWidth,()=>{y(),y=void 0,g.value===!1&&e.showIfAbove===!0&&S.value===!1?T(!1):a()})}),se(()=>{y!==void 0&&y(),s!==null&&(clearTimeout(s),s=null),g.value===!0&&me(),l.instances[e.side]===D&&(l.instances[e.side]=void 0,N("size",0),N("offset",0),N("space",!1))}),()=>{const a=[];S.value===!0&&(e.noSwipeOpen===!1&&a.push(ie(p("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),Ye.value)),a.push(Te("div",{ref:"backdrop",class:ve.value,style:de.value,"aria-hidden":"true",onClick:B},void 0,"backdrop",e.noSwipeBackdrop!==!0&&g.value===!0,()=>Ze.value)));const m=H.value===!0&&b.mini!==void 0,M=[p("div",{...c,key:""+m,class:[Ke.value,c.class]},m===!0?b.mini():ue(b.default))];return e.elevated===!0&&g.value===!0&&M.push(p("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),a.push(Te("aside",{ref:"content",class:Xe.value,style:Ge.value},M,"contentclose",e.noSwipeClose!==!0&&S.value===!0,()=>Je.value)),p("div",{class:"q-drawer-container"},a)}}}),Wt=F({name:"QPageContainer",setup(e,{slots:b}){const{proxy:{$q:d}}=Y(),c=pe(ce,W);if(c===W)return console.error("QPageContainer needs to be child of QLayout"),W;Fe(yt,!0);const n=r(()=>{const f={};return c.header.space===!0&&(f.paddingTop=`${c.header.size}px`),c.right.space===!0&&(f[`padding${d.lang.rtl===!0?"Left":"Right"}`]=`${c.right.size}px`),c.footer.space===!0&&(f.paddingBottom=`${c.footer.size}px`),c.left.space===!0&&(f[`padding${d.lang.rtl===!0?"Right":"Left"}`]=`${c.left.size}px`),f});return()=>p("div",{class:"q-page-container",style:n.value},ue(b.default))}}),Ft=F({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:b,emit:d}){const{proxy:{$q:c}}=Y(),n=w(null),f=w(c.screen.height),i=w(e.container===!0?0:c.screen.width),t=w({position:0,direction:"down",inflectionPoint:0}),k=w(0),q=w(St.value===!0?0:ye()),l=r(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),$=r(()=>e.container===!1?{minHeight:c.screen.height+"px"}:null),s=r(()=>q.value!==0?{[c.lang.rtl===!0?"left":"right"]:`${q.value}px`}:null),y=r(()=>q.value!==0?{[c.lang.rtl===!0?"right":"left"]:0,[c.lang.rtl===!0?"left":"right"]:`-${q.value}px`,width:`calc(100% + ${q.value}px)`}:null);function S(h){if(e.container===!0||document.qScrollPrevented!==!0){const T={position:h.position.top,direction:h.direction,directionChanged:h.directionChanged,inflectionPoint:h.inflectionPoint.top,delta:h.delta.top};t.value=T,e.onScroll!==void 0&&d("scroll",T)}}function H(h){const{height:T,width:B}=h;let A=!1;f.value!==T&&(A=!0,f.value=T,e.onScrollHeight!==void 0&&d("scrollHeight",T),g()),i.value!==B&&(A=!0,i.value=B),A===!0&&e.onResize!==void 0&&d("resize",h)}function P({height:h}){k.value!==h&&(k.value=h,g())}function g(){if(e.container===!0){const h=f.value>k.value?ye():0;q.value!==h&&(q.value=h)}}let u=null;const x={instances:{},view:r(()=>e.view),isContainer:r(()=>e.container),rootRef:n,height:f,containerHeight:k,scrollbarWidth:q,totalWidth:r(()=>i.value+q.value),rows:r(()=>{const h=e.view.toLowerCase().split(" ");return{top:h[0].split(""),middle:h[1].split(""),bottom:h[2].split("")}}),header:ne({size:0,offset:0,space:!1}),right:ne({size:300,offset:0,space:!1}),footer:ne({size:0,offset:0,space:!1}),left:ne({size:300,offset:0,space:!1}),scroll:t,animate(){u!==null?clearTimeout(u):document.body.classList.add("q-body--layout-animate"),u=setTimeout(()=>{u=null,document.body.classList.remove("q-body--layout-animate")},155)},update(h,T,B){x[h][T]=B}};if(Fe(ce,x),ye()>0){let B=function(){h=null,T.classList.remove("hide-scrollbar")},A=function(){if(h===null){if(T.scrollHeight>c.screen.height)return;T.classList.add("hide-scrollbar")}else clearTimeout(h);h=setTimeout(B,300)},I=function(D){h!==null&&D==="remove"&&(clearTimeout(h),B()),window[`${D}EventListener`]("resize",A)},h=null;const T=document.body;_(()=>e.container!==!0?"add":"remove",I),e.container!==!0&&I("add"),zt(()=>{I("remove")})}return()=>{const h=We(b.default,[p(Ee,{onScroll:S}),p(le,{onResize:H})]),T=p("div",{class:l.value,style:$.value,ref:e.container===!0?void 0:n,tabindex:-1},h);return e.container===!0?p("div",{class:"q-layout-container overflow-hidden",ref:n},[p(le,{onResize:P}),p("div",{class:"absolute-full",style:s.value},[p("div",{class:"scroll",style:y.value},[T])])]):T}}});const Ve=wt({__name:"EssentialLink",props:{title:{},caption:{default:""},link:{default:"#"},icon:{default:""}},setup(e){return(b,d)=>(te(),Ce(Ct,{clickable:"",tag:"a",target:"_self",to:b.link},{default:L(()=>[C(Pt,null,{default:L(()=>[C(je,null,{default:L(()=>[b.icon?(te(),Ce(pt,{key:0,name:b.icon},null,8,["name"])):qt("",!0),ee(Ie(b.title),1)]),_:1})]),_:1})]),_:1},8,["to"]))}}),oa={__name:"MainLayout",setup(e){const b=Bt(),d=Mt(),c=r(()=>d.screen.width>1e3),n=r(()=>b.Playing||{}),f=w(null);_(n,q=>{q&&q.Id?f.value.open(q):f.value.stop()});const i=w(!1),t=r(()=>_t().path),k=[{title:"\u9996\u9875",caption:"quasar.dev",icon:"home",link:"/"},{title:"\u641C\u7D22",caption:"github.com/quasarframework",icon:"search",link:"/search"},{title:"\u56FE\u9274",caption:"chat.quasar.dev",icon:"image",link:"/picture"},{title:"\u8BBE\u7F6E",caption:"chat.quasar.dev",icon:"settings",link:"/setting"},{title:"\u7CFB\u7EDF",caption:"forum.quasar.dev",icon:"chat",link:"/system"}];return(q,l)=>{const $=kt("router-view");return te(),Se("div",null,[C(Ft,{view:"LHR lpr lfr",container:"",style:{height:"100vh"},class:"shadow-2 rounded-borders"},{default:L(()=>[C(Rt,{reveal:"",class:"bg-black"},{default:L(()=>[C(Vt,null,{default:L(()=>[C(ze,{flat:"",onClick:l[0]||(l[0]=s=>i.value=!i.value),round:"",dense:"",icon:"menu"}),C(Qt,null,{default:L(()=>[ee("\u6587\u4EF6\u641C\u7D22")]),_:1}),(te(),Se(Pe,null,$e(k,s=>ie(C(Ve,xe({key:s.title},s,{style:{color:t.value==s.link?"red":"",scale:1.2}}),null,16,["style"]),[[Tt,c.value]])),64)),C(Ht),C(ze,{onClick:l[1]||(l[1]=s=>K(Lt)())},{default:L(()=>[ee("\u5173\u673A")]),_:1}),C(ze,{flat:"",onClick:l[2]||(l[2]=s=>K(b).drawerRight=!K(b).drawerRight),round:"",dense:"",icon:"menu"},{default:L(()=>{var s;return[ee(Ie(`${K(b)&&((s=K(b).Playing)==null?void 0:s.Code)||""}`),1)]}),_:1})]),_:1})]),_:1}),C(He,{modelValue:i.value,"onUpdate:modelValue":l[3]||(l[3]=s=>i.value=s),width:200,breakpoint:700,bordered:"",class:"bg-grey-3"},{default:L(()=>[C(Dt,{class:"fit"},{default:L(()=>[C($t,null,{default:L(()=>[C(je,{header:""},{default:L(()=>[ee(" \u4F60\u7684\u641C\u7D22\u5DE5\u5177 ")]),_:1}),(te(),Se(Pe,null,$e(k,s=>C(Ve,xe({key:s.title},s,{style:{color:t.value==s.link?"red":"",scale:1.2}}),null,16,["style"])),64))]),_:1})]),_:1})]),_:1},8,["modelValue"]),C(He,{side:"right",width:c.value?750:400,modelValue:K(b).drawerRight,"onUpdate:modelValue":l[4]||(l[4]=s=>K(b).drawerRight=s),bordered:"",class:"bg-grey-3"},{default:L(()=>[C(xt,{ref_key:"vue3VideoPlayRef",ref:f,mode:"drawer"},null,512)]),_:1},8,["width","modelValue"]),C(Wt,null,{default:L(()=>[C($)]),_:1})]),_:1})])}}};export{oa as default};
