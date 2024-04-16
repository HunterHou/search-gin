import{i as Ne,I as ue,r as A,c as h,J as Ae,P as ke,bc as Be,s as He,ax as ze,G as p,al as X,aG as Ke,bd as Ue,aw as G,Z as Xe,L as Y,be as Ge,aB as _e,E as K,aV as se,a2 as Te,y as N,a8 as Ye,X as Je,Y as Ze,H as J,bf as Re,aU as et,b7 as tt,Q as ce,b6 as nt,aD as at,aT as U,R as ot,b4 as lt,aQ as te,b5 as de,ai as qe,aR as ve,ae as it,bg as rt,a5 as ut,bh as st,bi as ct,bj as dt,bk as vt,bl as ft,N as bt,O as ht,a6 as mt}from"./index.33288f38.js";import{a as gt,c as wt}from"./QMenu.ea08609a.js";import{b as pt}from"./use-page-sticky.15070bb8.js";import{g as Pe,s as Se,c as yt}from"./index.9503ce58.js";let Ct=0;const Tt=["click","keydown"],qt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Ct++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Pt(e,a,s,c){const o=Ne(Be,ue);if(o===ue)return console.error("QTab/QRouteTab component needs to be child of QTabs"),ue;const{proxy:t}=Y(),r=A(null),y=A(null),_=A(null),D=h(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),g=h(()=>o.currentModel.value===e.name),$=h(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(g.value===!0?" q-tab--active"+(o.tabProps.value.activeClass?" "+o.tabProps.value.activeClass:"")+(o.tabProps.value.activeColor?` text-${o.tabProps.value.activeColor}`:"")+(o.tabProps.value.activeBgColor?` bg-${o.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&o.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||o.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(c!==void 0?c.linkClass.value:"")),m=h(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(o.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),C=h(()=>e.disable===!0||o.hasFocus.value===!0||g.value===!1&&o.hasActiveTab.value===!0?-1:e.tabindex||0);function P(u,i){if(i!==!0&&r.value!==null&&r.value.focus(),e.disable===!0){c!==void 0&&c.hasRouterLink.value===!0&&X(u);return}if(c===void 0){o.updateModel({name:e.name}),s("click",u);return}if(c.hasRouterLink.value===!0){const R=(S={})=>{let x;const M=S.to===void 0||Ge(S.to,e.to)===!0?o.avoidRouteWatcher=_e():null;return c.navigateToRouterLink(u,{...S,returnRouterError:!0}).catch(Q=>{x=Q}).then(Q=>{if(M===o.avoidRouteWatcher&&(o.avoidRouteWatcher=!1,x===void 0&&(Q===void 0||Q.message.startsWith("Avoided redundant navigation")===!0)&&o.updateModel({name:e.name})),S.returnRouterError===!0)return x!==void 0?Promise.reject(x):Q})};s("click",u,R),u.defaultPrevented!==!0&&R();return}s("click",u)}function k(u){Ke(u,[13,32])?P(u,!0):Ue(u)!==!0&&u.keyCode>=35&&u.keyCode<=40&&u.altKey!==!0&&u.metaKey!==!0&&o.onKbdNavigate(u.keyCode,t.$el)===!0&&X(u),s("keydown",u)}function I(){const u=o.tabProps.value.narrowIndicator,i=[],R=p("div",{ref:_,class:["q-tab__indicator",o.tabProps.value.indicatorClass]});e.icon!==void 0&&i.push(p(G,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&i.push(p("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&i.push(e.alertIcon!==void 0?p(G,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):p("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),u===!0&&i.push(R);const S=[p("div",{class:"q-focus-helper",tabindex:-1,ref:r}),p("div",{class:m.value},Xe(a.default,i))];return u===!1&&S.push(R),S}const E={name:h(()=>e.name),rootRef:y,tabIndicatorRef:_,routeData:c};Ae(()=>{o.unregisterTab(E)}),ke(()=>{o.registerTab(E)});function F(u,i){const R={ref:y,class:$.value,tabindex:C.value,role:"tab","aria-selected":g.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:P,onKeydown:k,...i};return He(p(u,R,I()),[[ze,D.value]])}return{renderTab:F,$tabs:o}}var Vt=K({name:"QTab",props:qt,emits:Tt,setup(e,{slots:a,emit:s}){const{renderTab:c}=Pt(e,a,s);return()=>c("div")}});let Le=!1;{const e=document.createElement("div");e.setAttribute("dir","rtl"),Object.assign(e.style,{width:"1px",height:"1px",overflow:"auto"});const a=document.createElement("div");Object.assign(a.style,{width:"1000px",height:"1px"}),document.body.appendChild(e),e.appendChild(a),e.scrollLeft=-1e3,Le=e.scrollLeft>=0,e.remove()}function St(e,a,s){const c=s===!0?["left","right"]:["top","bottom"];return`absolute-${a===!0?c[0]:c[1]}${e?` text-${e}`:""}`}const xt=["left","center","right","justify"];var Ot=K({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>xt.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:a,emit:s}){const{proxy:c}=Y(),{$q:o}=c,{registerTick:t}=se(),{registerTick:r}=se(),{registerTick:y}=se(),{registerTimeout:_,removeTimeout:D}=Te(),{registerTimeout:g,removeTimeout:$}=Te(),m=A(null),C=A(null),P=A(e.modelValue),k=A(!1),I=A(!0),E=A(!1),F=A(!1),u=[],i=A(0),R=A(!1);let S=null,x=null,M;const Q=h(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:St(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),ne=h(()=>{const n=i.value,l=P.value;for(let d=0;d<n;d++)if(u[d].name.value===l)return!0;return!1}),ae=h(()=>`q-tabs__content--align-${k.value===!0?"left":F.value===!0?"justify":e.align}`),oe=h(()=>`q-tabs row no-wrap items-center q-tabs--${k.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),v=h(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+ae.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),w=h(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),L=h(()=>e.vertical!==!0&&o.lang.rtl===!0),O=h(()=>Le===!1&&L.value===!0);N(L,z),N(()=>e.modelValue,n=>{le({name:n,setCurrent:!0,skipEmit:!0})}),N(()=>e.outsideArrows,Z);function le({name:n,setCurrent:l,skipEmit:d}){P.value!==n&&(d!==!0&&e["onUpdate:modelValue"]!==void 0&&s("update:modelValue",n),(l===!0||e["onUpdate:modelValue"]===void 0)&&(De(P.value,n),P.value=n))}function Z(){t(()=>{fe({width:m.value.offsetWidth,height:m.value.offsetHeight})})}function fe(n){if(w.value===void 0||C.value===null)return;const l=n[w.value.container],d=Math.min(C.value[w.value.scroll],Array.prototype.reduce.call(C.value.children,(q,b)=>q+(b[w.value.content]||0),0)),T=l>0&&d>l;k.value=T,T===!0&&r(z),F.value=l<parseInt(e.breakpoint,10)}function De(n,l){const d=n!=null&&n!==""?u.find(q=>q.name.value===n):null,T=l!=null&&l!==""?u.find(q=>q.name.value===l):null;if(d&&T){const q=d.tabIndicatorRef.value,b=T.tabIndicatorRef.value;S!==null&&(clearTimeout(S),S=null),q.style.transition="none",q.style.transform="none",b.style.transition="none",b.style.transform="none";const f=q.getBoundingClientRect(),B=b.getBoundingClientRect();b.style.transform=e.vertical===!0?`translate3d(0,${f.top-B.top}px,0) scale3d(1,${B.height?f.height/B.height:1},1)`:`translate3d(${f.left-B.left}px,0,0) scale3d(${B.width?f.width/B.width:1},1,1)`,y(()=>{S=setTimeout(()=>{S=null,b.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",b.style.transform="none"},70)})}T&&k.value===!0&&H(T.rootRef.value)}function H(n){const{left:l,width:d,top:T,height:q}=C.value.getBoundingClientRect(),b=n.getBoundingClientRect();let f=e.vertical===!0?b.top-T:b.left-l;if(f<0){C.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(f),z();return}f+=e.vertical===!0?b.height-q:b.width-d,f>0&&(C.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(f),z())}function z(){const n=C.value;if(n===null)return;const l=n.getBoundingClientRect(),d=e.vertical===!0?n.scrollTop:Math.abs(n.scrollLeft);L.value===!0?(I.value=Math.ceil(d+l.width)<n.scrollWidth-1,E.value=d>0):(I.value=d>0,E.value=e.vertical===!0?Math.ceil(d+l.height)<n.scrollHeight:Math.ceil(d+l.width)<n.scrollWidth)}function be(n){x!==null&&clearInterval(x),x=setInterval(()=>{$e(n)===!0&&W()},5)}function he(){be(O.value===!0?Number.MAX_SAFE_INTEGER:0)}function me(){be(O.value===!0?0:Number.MAX_SAFE_INTEGER)}function W(){x!==null&&(clearInterval(x),x=null)}function Ie(n,l){const d=Array.prototype.filter.call(C.value.children,B=>B===l||B.matches&&B.matches(".q-tab.q-focusable")===!0),T=d.length;if(T===0)return;if(n===36)return H(d[0]),d[0].focus(),!0;if(n===35)return H(d[T-1]),d[T-1].focus(),!0;const q=n===(e.vertical===!0?38:37),b=n===(e.vertical===!0?40:39),f=q===!0?-1:b===!0?1:void 0;if(f!==void 0){const B=L.value===!0?-1:1,V=d.indexOf(l)+f*B;return V>=0&&V<T&&(H(d[V]),d[V].focus({preventScroll:!0})),!0}}const Me=h(()=>O.value===!0?{get:n=>Math.abs(n.scrollLeft),set:(n,l)=>{n.scrollLeft=-l}}:e.vertical===!0?{get:n=>n.scrollTop,set:(n,l)=>{n.scrollTop=l}}:{get:n=>n.scrollLeft,set:(n,l)=>{n.scrollLeft=l}});function $e(n){const l=C.value,{get:d,set:T}=Me.value;let q=!1,b=d(l);const f=n<b?-1:1;return b+=f*5,b<0?(q=!0,b=0):(f===-1&&b<=n||f===1&&b>=n)&&(q=!0,b=n),T(l,b),z(),q}function ge(n,l){for(const d in n)if(n[d]!==l[d])return!1;return!0}function Ee(){let n=null,l={matchedLen:0,queryDiff:9999,hrefLen:0};const d=u.filter(f=>f.routeData!==void 0&&f.routeData.hasRouterLink.value===!0),{hash:T,query:q}=c.$route,b=Object.keys(q).length;for(const f of d){const B=f.routeData.exact.value===!0;if(f.routeData[B===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:V,query:ie,matched:We,href:je}=f.routeData.resolvedLink.value,re=Object.keys(ie).length;if(B===!0){if(V!==T||re!==b||ge(q,ie)===!1)continue;n=f.name.value;break}if(V!==""&&V!==T||re!==0&&ge(ie,q)===!1)continue;const j={matchedLen:We.length,queryDiff:b-re,hrefLen:je.length-V.length};if(j.matchedLen>l.matchedLen){n=f.name.value,l=j;continue}else if(j.matchedLen!==l.matchedLen)continue;if(j.queryDiff<l.queryDiff)n=f.name.value,l=j;else if(j.queryDiff!==l.queryDiff)continue;j.hrefLen>l.hrefLen&&(n=f.name.value,l=j)}n===null&&u.some(f=>f.routeData===void 0&&f.name.value===P.value)===!0||le({name:n,setCurrent:!0})}function Fe(n){if(D(),R.value!==!0&&m.value!==null&&n.target&&typeof n.target.closest=="function"){const l=n.target.closest(".q-tab");l&&m.value.contains(l)===!0&&(R.value=!0,k.value===!0&&H(l))}}function Qe(){_(()=>{R.value=!1},30)}function ee(){pe.avoidRouteWatcher===!1?g(Ee):$()}function we(){if(M===void 0){const n=N(()=>c.$route.fullPath,ee);M=()=>{n(),M=void 0}}}function Ve(n){u.push(n),i.value++,Z(),n.routeData===void 0||c.$route===void 0?g(()=>{if(k.value===!0){const l=P.value,d=l!=null&&l!==""?u.find(T=>T.name.value===l):null;d&&H(d.rootRef.value)}}):(we(),n.routeData.hasRouterLink.value===!0&&ee())}function Oe(n){u.splice(u.indexOf(n),1),i.value--,Z(),M!==void 0&&n.routeData!==void 0&&(u.every(l=>l.routeData===void 0)===!0&&M(),ee())}const pe={currentModel:P,tabProps:Q,hasFocus:R,hasActiveTab:ne,registerTab:Ve,unregisterTab:Oe,verifyRouteModel:ee,updateModel:le,onKbdNavigate:Ie,avoidRouteWatcher:!1};Ye(Be,pe);function ye(){S!==null&&clearTimeout(S),W(),M!==void 0&&M()}let Ce;return Ae(ye),Je(()=>{Ce=M!==void 0,ye()}),Ze(()=>{Ce===!0&&we(),Z()}),()=>p("div",{ref:m,class:oe.value,role:"tablist",onFocusin:Fe,onFocusout:Qe},[p(gt,{onResize:fe}),p("div",{ref:C,class:v.value,onScroll:z},J(a.default)),p(G,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(I.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||o.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:he,onTouchstartPassive:he,onMouseupPassive:W,onMouseleavePassive:W,onTouchendPassive:W}),p(G,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(E.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||o.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:me,onTouchstartPassive:me,onMouseupPassive:W,onMouseleavePassive:W,onTouchendPassive:W})])}});const At=Object.keys(Re),kt=e=>At.reduce((a,s)=>{const c=e[s];return c!==void 0&&(a[s]=c),a},{});var Wt=K({name:"QBtnDropdown",props:{...Re,...et,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:a,emit:s}){const{proxy:c}=Y(),o=A(e.modelValue),t=A(null),r=_e(),y=h(()=>{const i={"aria-expanded":o.value===!0?"true":"false","aria-haspopup":"true","aria-controls":r,"aria-label":e.toggleAriaLabel||c.$q.lang.label[o.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(i["aria-disabled"]="true"),i}),_=h(()=>"q-btn-dropdown__arrow"+(o.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),D=h(()=>tt(e)),g=h(()=>kt(e));N(()=>e.modelValue,i=>{t.value!==null&&t.value[i?"show":"hide"]()}),N(()=>e.split,u);function $(i){o.value=!0,s("beforeShow",i)}function m(i){s("show",i),s("update:modelValue",!0)}function C(i){o.value=!1,s("beforeHide",i)}function P(i){s("hide",i),s("update:modelValue",!1)}function k(i){s("click",i)}function I(i){nt(i),u(),s("click",i)}function E(i){t.value!==null&&t.value.toggle(i)}function F(i){t.value!==null&&t.value.show(i)}function u(i){t.value!==null&&t.value.hide(i)}return Object.assign(c,{show:F,hide:u,toggle:E}),ke(()=>{e.modelValue===!0&&F()}),()=>{const i=[p(G,{class:_.value,name:e.dropdownIcon||c.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&i.push(p(wt,{ref:t,id:r,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:$,onShow:m,onBeforeHide:C,onHide:P},a.default)),e.split===!1?p(ce,{class:"q-btn-dropdown q-btn-dropdown--simple",...g.value,...y.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:k},{default:()=>J(a.label,[]).concat(i),loading:a.loading}):p(pt,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...D.value,glossy:e.glossy,stretch:e.stretch},()=>[p(ce,{class:"q-btn-dropdown--current",...g.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:I},{default:a.label,loading:a.loading}),p(ce,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...y.value,...D.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>i)])}}});function Bt(e){const a=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((s,c)=>{const o=parseFloat(s);o&&(a[c]=o)}),a}var _t=at({name:"touch-swipe",beforeMount(e,{value:a,arg:s,modifiers:c}){if(c.mouse!==!0&&U.has.touch!==!0)return;const o=c.mouseCapture===!0?"Capture":"",t={handler:a,sensitivity:Bt(s),direction:Pe(c),noop:ot,mouseStart(r){Se(r,t)&&lt(r)&&(te(t,"temp",[[document,"mousemove","move",`notPassive${o}`],[document,"mouseup","end","notPassiveCapture"]]),t.start(r,!0))},touchStart(r){if(Se(r,t)){const y=r.target;te(t,"temp",[[y,"touchmove","move","notPassiveCapture"],[y,"touchcancel","end","notPassiveCapture"],[y,"touchend","end","notPassiveCapture"]]),t.start(r)}},start(r,y){U.is.firefox===!0&&de(e,!0);const _=qe(r);t.event={x:_.left,y:_.top,time:Date.now(),mouse:y===!0,dir:!1}},move(r){if(t.event===void 0)return;if(t.event.dir!==!1){X(r);return}const y=Date.now()-t.event.time;if(y===0)return;const _=qe(r),D=_.left-t.event.x,g=Math.abs(D),$=_.top-t.event.y,m=Math.abs($);if(t.event.mouse!==!0){if(g<t.sensitivity[1]&&m<t.sensitivity[1]){t.end(r);return}}else if(window.getSelection().toString()!==""){t.end(r);return}else if(g<t.sensitivity[2]&&m<t.sensitivity[2])return;const C=g/y,P=m/y;t.direction.vertical===!0&&g<m&&g<100&&P>t.sensitivity[0]&&(t.event.dir=$<0?"up":"down"),t.direction.horizontal===!0&&g>m&&m<100&&C>t.sensitivity[0]&&(t.event.dir=D<0?"left":"right"),t.direction.up===!0&&g<m&&$<0&&g<100&&P>t.sensitivity[0]&&(t.event.dir="up"),t.direction.down===!0&&g<m&&$>0&&g<100&&P>t.sensitivity[0]&&(t.event.dir="down"),t.direction.left===!0&&g>m&&D<0&&m<100&&C>t.sensitivity[0]&&(t.event.dir="left"),t.direction.right===!0&&g>m&&D>0&&m<100&&C>t.sensitivity[0]&&(t.event.dir="right"),t.event.dir!==!1?(X(r),t.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),yt(),t.styleCleanup=k=>{t.styleCleanup=void 0,document.body.classList.remove("non-selectable");const I=()=>{document.body.classList.remove("no-pointer-events--children")};k===!0?setTimeout(I,50):I()}),t.handler({evt:r,touch:t.event.mouse!==!0,mouse:t.event.mouse,direction:t.event.dir,duration:y,distance:{x:g,y:m}})):t.end(r)},end(r){t.event!==void 0&&(ve(t,"temp"),U.is.firefox===!0&&de(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(!0),r!==void 0&&t.event.dir!==!1&&X(r),t.event=void 0)}};if(e.__qtouchswipe=t,c.mouse===!0){const r=c.mouseCapture===!0||c.mousecapture===!0?"Capture":"";te(t,"main",[[e,"mousedown","mouseStart",`passive${r}`]])}U.has.touch===!0&&te(t,"main",[[e,"touchstart","touchStart",`passive${c.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,a){const s=e.__qtouchswipe;s!==void 0&&(a.oldValue!==a.value&&(typeof a.value!="function"&&s.end(),s.handler=a.value),s.direction=Pe(a.modifiers))},beforeUnmount(e){const a=e.__qtouchswipe;a!==void 0&&(ve(a,"main"),ve(a,"temp"),U.is.firefox===!0&&de(e,!1),a.styleCleanup!==void 0&&a.styleCleanup(),delete e.__qtouchswipe)}});function Rt(){const e=new Map;return{getCache:function(a,s){return e[a]===void 0?e[a]=s:e[a]},getCacheWithFn:function(a,s){return e[a]===void 0?e[a]=s():e[a]}}}const Lt={name:{required:!0},disable:Boolean},xe={setup(e,{slots:a}){return()=>p("div",{class:"q-panel scroll",role:"tabpanel"},J(a.default))}},Dt={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},It=["update:modelValue","beforeTransition","transition"];function Mt(){const{props:e,emit:a,proxy:s}=Y(),{getCacheWithFn:c}=Rt();let o,t;const r=A(null),y=A(null);function _(v){const w=e.vertical===!0?"up":"left";x((s.$q.lang.rtl===!0?-1:1)*(v.direction===w?1:-1))}const D=h(()=>[[_t,_,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),g=h(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),$=h(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),m=h(()=>`--q-transition-duration: ${e.transitionDuration}ms`),C=h(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),P=h(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),k=h(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);N(()=>e.modelValue,(v,w)=>{const L=u(v)===!0?i(v):-1;t!==!0&&S(L===-1?0:L<i(w)?-1:1),r.value!==L&&(r.value=L,a("beforeTransition",v,w),ut(()=>{a("transition",v,w)}))});function I(){x(1)}function E(){x(-1)}function F(v){a("update:modelValue",v)}function u(v){return v!=null&&v!==""}function i(v){return o.findIndex(w=>w.props.name===v&&w.props.disable!==""&&w.props.disable!==!0)}function R(){return o.filter(v=>v.props.disable!==""&&v.props.disable!==!0)}function S(v){const w=v!==0&&e.animated===!0&&r.value!==-1?"q-transition--"+(v===-1?g.value:$.value):null;y.value!==w&&(y.value=w)}function x(v,w=r.value){let L=w+v;for(;L>-1&&L<o.length;){const O=o[L];if(O!==void 0&&O.props.disable!==""&&O.props.disable!==!0){S(v),t=!0,a("update:modelValue",O.props.name),setTimeout(()=>{t=!1});return}L+=v}e.infinite===!0&&o.length!==0&&w!==-1&&w!==o.length&&x(v,v===-1?o.length:-1)}function M(){const v=i(e.modelValue);return r.value!==v&&(r.value=v),!0}function Q(){const v=u(e.modelValue)===!0&&M()&&o[r.value];return e.keepAlive===!0?[p(st,P.value,[p(k.value===!0?c(C.value,()=>({...xe,name:C.value})):xe,{key:C.value,style:m.value},()=>v)])]:[p("div",{class:"q-panel scroll",style:m.value,key:C.value,role:"tabpanel"},[v])]}function ne(){if(o.length!==0)return e.animated===!0?[p(it,{name:y.value},Q)]:Q()}function ae(v){return o=rt(J(v.default,[])).filter(w=>w.props!==null&&w.props.slot===void 0&&u(w.props.name)===!0),o.length}function oe(){return o}return Object.assign(s,{next:I,previous:E,goTo:F}),{panelIndex:r,panelDirectives:D,updatePanelsList:ae,updatePanelIndex:M,getPanelContent:ne,getEnabledPanels:R,getPanels:oe,isValidPanelName:u,keepAliveProps:P,needsUniqueKeepAliveWrapper:k,goToPanelByOffset:x,goToPanel:F,nextPanel:I,previousPanel:E}}var jt=K({name:"QTabPanel",props:Lt,setup(e,{slots:a}){return()=>p("div",{class:"q-tab-panel",role:"tabpanel"},J(a.default))}}),Nt=K({name:"QField",inheritAttrs:!1,props:ct,emits:dt,setup(){return vt(ft())}}),Ht=K({name:"QTabPanels",props:{...Dt,...bt},emits:It,setup(e,{slots:a}){const s=Y(),c=ht(e,s.proxy.$q),{updatePanelsList:o,getPanelContent:t,panelDirectives:r}=Mt(),y=h(()=>"q-tab-panels q-panel-parent"+(c.value===!0?" q-tab-panels--dark q-dark":""));return()=>(o(a),mt("div",{class:y.value},t(),"pan",e.swipeable,()=>r.value))}});const zt=["\u64AD\u653E","\u5220\u9664","\u79FB\u52A8","\u7F16\u8F91","\u6587\u4EF6\u5939","\u8BE6\u60C5","\u522E\u56FE","\u8F6C\u6362","\u526A\u5207","\u66F4\u591A"];export{Ot as Q,Vt as a,Ht as b,jt as c,Wt as d,Nt as e,zt as f,Le as r};
