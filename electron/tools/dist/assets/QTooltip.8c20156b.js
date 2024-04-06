import{E as ee,u as T,G as O,H as de,P as Te,aC as Ke,R as ke,aD as je,r as M,N as te,aw as we,af as fe,L as ze,aE as he,_ as Qe,aF as U,aG as ue,v as W,Z as Ie,K as j,aH as re,aI as se,aJ as me,aK as Ne,a4 as Ve,S as Ee,aL as qe,T as Se,aM as Ce,U as He,aN as Pe,V as pe,aO as We,aP as Ue,ac as Ge,aQ as Xe,aR as ge,aS as Me,aT as Ye,aj as Le,aU as Je,aV as Ze,aW as et}from"./index.6b10a76a.js";var ot=ee({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:n}){const l=T(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>O("div",{class:l.value},de(n.default))}}),it=ee({name:"QItem",props:{...Te,...Ke,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:n,emit:l}){const{proxy:{$q:t}}=te(),a=ke(e,t),{hasLink:u,linkAttrs:i,linkClass:r,linkTag:h,navigateOnClick:s}=je(),v=M(null),g=M(null),b=T(()=>e.clickable===!0||u.value===!0||e.tag==="label"),o=T(()=>e.disable!==!0&&b.value===!0),f=T(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(a.value===!0?" q-item--dark":"")+(u.value===!0&&e.active===null?r.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(o.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),E=T(()=>{if(e.insetLevel===void 0)return null;const d=t.lang.rtl===!0?"Right":"Left";return{["padding"+d]:16+e.insetLevel*56+"px"}});function C(d){o.value===!0&&(g.value!==null&&(d.qKeyEvent!==!0&&document.activeElement===v.value?g.value.focus():document.activeElement===g.value&&v.value.focus()),s(d))}function H(d){if(o.value===!0&&we(d,13)===!0){fe(d),d.qKeyEvent=!0;const k=new MouseEvent("click",d);k.qKeyEvent=!0,v.value.dispatchEvent(k)}l("keyup",d)}function P(){const d=ze(n.default,[]);return o.value===!0&&d.unshift(O("div",{class:"q-focus-helper",tabindex:-1,ref:g})),d}return()=>{const d={ref:v,class:f.value,style:E.value,role:"listitem",onClick:C,onKeyup:H};return o.value===!0?(d.tabindex=e.tabindex||"0",Object.assign(d,i.value)):b.value===!0&&(d["aria-disabled"]="true"),O(h.value,d,P())}}});const Be={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function Oe({showing:e,avoidEmit:n,configureAnchorEl:l}){const{props:t,proxy:a,emit:u}=te(),i=M(null);let r=null;function h(o){return i.value===null?!1:o===void 0||o.touches===void 0||o.touches.length<=1}const s={};l===void 0&&(Object.assign(s,{hide(o){a.hide(o)},toggle(o){a.toggle(o),o.qAnchorHandled=!0},toggleKey(o){we(o,13)===!0&&s.toggle(o)},contextClick(o){a.hide(o),he(o),Qe(()=>{a.show(o),o.qAnchorHandled=!0})},prevent:he,mobileTouch(o){if(s.mobileCleanup(o),h(o)!==!0)return;a.hide(o),i.value.classList.add("non-selectable");const f=o.target;U(s,"anchor",[[f,"touchmove","mobileCleanup","passive"],[f,"touchend","mobileCleanup","passive"],[f,"touchcancel","mobileCleanup","passive"],[i.value,"contextmenu","prevent","notPassive"]]),r=setTimeout(()=>{r=null,a.show(o),o.qAnchorHandled=!0},300)},mobileCleanup(o){i.value.classList.remove("non-selectable"),r!==null&&(clearTimeout(r),r=null),e.value===!0&&o!==void 0&&ue()}}),l=function(o=t.contextMenu){if(t.noParentEvent===!0||i.value===null)return;let f;o===!0?a.$q.platform.is.mobile===!0?f=[[i.value,"touchstart","mobileTouch","passive"]]:f=[[i.value,"mousedown","hide","passive"],[i.value,"contextmenu","contextClick","notPassive"]]:f=[[i.value,"click","toggle","passive"],[i.value,"keyup","toggleKey","passive"]],U(s,"anchor",f)});function v(){re(s,"anchor")}function g(o){for(i.value=o;i.value.classList.contains("q-anchor--skip");)i.value=i.value.parentNode;l()}function b(){if(t.target===!1||t.target===""||a.$el.parentNode===null)i.value=null;else if(t.target===!0)g(a.$el.parentNode);else{let o=t.target;if(typeof t.target=="string")try{o=document.querySelector(t.target)}catch{o=void 0}o!=null?(i.value=o.$el||o,l()):(i.value=null,console.error(`Anchor: target "${t.target}" not found`))}}return W(()=>t.contextMenu,o=>{i.value!==null&&(v(),l(o))}),W(()=>t.target,()=>{i.value!==null&&v(),b()}),W(()=>t.noParentEvent,o=>{i.value!==null&&(o===!0?v():l())}),Ie(()=>{b(),n!==!0&&t.modelValue===!0&&i.value===null&&u("update:modelValue",!1)}),j(()=>{r!==null&&clearTimeout(r),v()}),{anchorEl:i,canShow:h,anchorEvents:s}}function Re(e,n){const l=M(null);let t;function a(r,h){const s=`${h!==void 0?"add":"remove"}EventListener`,v=h!==void 0?h:t;r!==window&&r[s]("scroll",v,se.passive),window[s]("scroll",v,se.passive),t=h}function u(){l.value!==null&&(a(l.value),l.value=null)}const i=W(()=>e.noParentEvent,()=>{l.value!==null&&(u(),n())});return j(i),{localScrollTarget:l,unconfigureScrollTarget:u,changeScrollEvent:a}}const{notPassiveCapture:G}=se,B=[];function X(e){const n=e.target;if(n===void 0||n.nodeType===8||n.classList.contains("no-pointer-events")===!0)return;let l=me.length-1;for(;l>=0;){const t=me[l].$;if(t.type.name==="QTooltip"){l--;continue}if(t.type.name!=="QDialog")break;if(t.props.seamless!==!0)return;l--}for(let t=B.length-1;t>=0;t--){const a=B[t];if((a.anchorEl.value===null||a.anchorEl.value.contains(n)===!1)&&(n===document.body||a.innerRef.value!==null&&a.innerRef.value.contains(n)===!1))e.qClickOutside=!0,a.onClickOutside(e);else return}}function Ae(e){B.push(e),B.length===1&&(document.addEventListener("mousedown",X,G),document.addEventListener("touchstart",X,G))}function Y(e){const n=B.findIndex(l=>l===e);n>-1&&(B.splice(n,1),B.length===0&&(document.removeEventListener("mousedown",X,G),document.removeEventListener("touchstart",X,G)))}let be,ye;function J(e){const n=e.split(" ");return n.length!==2?!1:["top","center","bottom"].includes(n[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(n[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function _e(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const ce={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{ce[`${e}#ltr`]=e,ce[`${e}#rtl`]=e});function Z(e,n){const l=e.split(" ");return{vertical:l[0],horizontal:ce[`${l[1]}#${n===!0?"rtl":"ltr"}`]}}function tt(e,n){let{top:l,left:t,right:a,bottom:u,width:i,height:r}=e.getBoundingClientRect();return n!==void 0&&(l-=n[1],t-=n[0],u+=n[1],a+=n[0],i+=n[0],r+=n[1]),{top:l,bottom:u,height:r,left:t,right:a,width:i,middle:t+(a-t)/2,center:l+(u-l)/2}}function nt(e,n,l){let{top:t,left:a}=e.getBoundingClientRect();return t+=n.top,a+=n.left,l!==void 0&&(t+=l[1],a+=l[0]),{top:t,bottom:t+1,height:1,left:a,right:a+1,width:1,middle:a,center:t}}function lt(e,n){return{top:0,center:n/2,bottom:n,left:0,middle:e/2,right:e}}function xe(e,n,l,t){return{top:e[l.vertical]-n[t.vertical],left:e[l.horizontal]-n[t.horizontal]}}function ve(e,n=0){if(e.targetEl===null||e.anchorEl===null||n>5)return;if(e.targetEl.offsetHeight===0||e.targetEl.offsetWidth===0){setTimeout(()=>{ve(e,n+1)},10);return}const{targetEl:l,offset:t,anchorEl:a,anchorOrigin:u,selfOrigin:i,absoluteOffset:r,fit:h,cover:s,maxHeight:v,maxWidth:g}=e;if(Ne.is.ios===!0&&window.visualViewport!==void 0){const p=document.body.style,{offsetLeft:y,offsetTop:q}=window.visualViewport;y!==be&&(p.setProperty("--q-pe-left",y+"px"),be=y),q!==ye&&(p.setProperty("--q-pe-top",q+"px"),ye=q)}const{scrollLeft:b,scrollTop:o}=l,f=r===void 0?tt(a,s===!0?[0,0]:t):nt(a,r,t);Object.assign(l.style,{top:0,left:0,minWidth:null,minHeight:null,maxWidth:g||"100vw",maxHeight:v||"100vh",visibility:"visible"});const{offsetWidth:E,offsetHeight:C}=l,{elWidth:H,elHeight:P}=h===!0||s===!0?{elWidth:Math.max(f.width,E),elHeight:s===!0?Math.max(f.height,C):C}:{elWidth:E,elHeight:C};let d={maxWidth:g,maxHeight:v};(h===!0||s===!0)&&(d.minWidth=f.width+"px",s===!0&&(d.minHeight=f.height+"px")),Object.assign(l.style,d);const k=lt(H,P);let m=xe(f,k,u,i);if(r===void 0||t===void 0)ie(m,f,k,u,i);else{const{top:p,left:y}=m;ie(m,f,k,u,i);let q=!1;if(m.top!==p){q=!0;const w=2*t[1];f.center=f.top-=w,f.bottom-=w+2}if(m.left!==y){q=!0;const w=2*t[0];f.middle=f.left-=w,f.right-=w+2}q===!0&&(m=xe(f,k,u,i),ie(m,f,k,u,i))}d={top:m.top+"px",left:m.left+"px"},m.maxHeight!==void 0&&(d.maxHeight=m.maxHeight+"px",f.height>m.maxHeight&&(d.minHeight=d.maxHeight)),m.maxWidth!==void 0&&(d.maxWidth=m.maxWidth+"px",f.width>m.maxWidth&&(d.minWidth=d.maxWidth)),Object.assign(l.style,d),l.scrollTop!==o&&(l.scrollTop=o),l.scrollLeft!==b&&(l.scrollLeft=b)}function ie(e,n,l,t,a){const u=l.bottom,i=l.right,r=Ve(),h=window.innerHeight-r,s=document.body.clientWidth;if(e.top<0||e.top+u>h)if(a.vertical==="center")e.top=n[t.vertical]>h/2?Math.max(0,h-u):0,e.maxHeight=Math.min(u,h);else if(n[t.vertical]>h/2){const v=Math.min(h,t.vertical==="center"?n.center:t.vertical===a.vertical?n.bottom:n.top);e.maxHeight=Math.min(u,v),e.top=Math.max(0,v-u)}else e.top=Math.max(0,t.vertical==="center"?n.center:t.vertical===a.vertical?n.top:n.bottom),e.maxHeight=Math.min(u,h-e.top);if(e.left<0||e.left+i>s)if(e.maxWidth=Math.min(i,s),a.horizontal==="middle")e.left=n[t.horizontal]>s/2?Math.max(0,s-i):0;else if(n[t.horizontal]>s/2){const v=Math.min(s,t.horizontal==="middle"?n.middle:t.horizontal===a.horizontal?n.right:n.left);e.maxWidth=Math.min(i,v),e.left=Math.max(0,v-e.maxWidth)}else e.left=Math.max(0,t.horizontal==="middle"?n.middle:t.horizontal===a.horizontal?n.left:n.right),e.maxWidth=Math.min(i,s-e.left)}var ut=ee({name:"QMenu",inheritAttrs:!1,props:{...Be,...Ee,...Te,...qe,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:J},self:{type:String,validator:J},offset:{type:Array,validator:_e},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...Se,"click","escapeKey"],setup(e,{slots:n,emit:l,attrs:t}){let a=null,u,i,r;const h=te(),{proxy:s}=h,{$q:v}=s,g=M(null),b=M(!1),o=T(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),f=ke(e,v),{registerTick:E,removeTick:C}=Ce(),{registerTimeout:H}=He(),{transitionProps:P,transitionStyle:d}=Pe(e),{localScrollTarget:k,changeScrollEvent:m,unconfigureScrollTarget:p}=Re(e,x),{anchorEl:y,canShow:q}=Oe({showing:b}),{hide:w}=pe({showing:b,canShow:q,handleShow:N,handleHide:ae,hideOnRouteChange:o,processOnMount:!0}),{showPortal:A,hidePortal:_,renderPortal:ne}=We(h,g,$e,"menu"),$={anchorEl:y,innerRef:g,onClickOutside(c){if(e.persistent!==!0&&b.value===!0)return w(c),(c.type==="touchstart"||c.target.classList.contains("q-dialog__backdrop"))&&fe(c),!0}},z=T(()=>Z(e.anchor||(e.cover===!0?"center middle":"bottom start"),v.lang.rtl)),Q=T(()=>e.cover===!0?z.value:Z(e.self||"top start",v.lang.rtl)),L=T(()=>(e.square===!0?" q-menu--square":"")+(f.value===!0?" q-menu--dark q-dark":"")),le=T(()=>e.autoClose===!0?{onClick:F}:{}),I=T(()=>b.value===!0&&e.persistent!==!0);W(I,c=>{c===!0?(Ze(R),Ae($)):(ge(R),Y($))});function D(){Je(()=>{let c=g.value;c&&c.contains(document.activeElement)!==!0&&(c=c.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||c.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||c.querySelector("[autofocus], [data-autofocus]")||c,c.focus({preventScroll:!0}))})}function N(c){if(a=e.noRefocus===!1?document.activeElement:null,Ue(S),A(),x(),u=void 0,c!==void 0&&(e.touchPosition||e.contextMenu)){const oe=Ge(c);if(oe.left!==void 0){const{top:De,left:Fe}=y.value.getBoundingClientRect();u={left:oe.left-Fe,top:oe.top-De}}}i===void 0&&(i=W(()=>v.screen.width+"|"+v.screen.height+"|"+e.self+"|"+e.anchor+"|"+v.lang.rtl,K)),e.noFocus!==!0&&document.activeElement.blur(),E(()=>{K(),e.noFocus!==!0&&D()}),H(()=>{v.platform.is.ios===!0&&(r=e.autoClose,g.value.click()),K(),A(!0),l("show",c)},e.transitionDuration)}function ae(c){C(),_(),V(!0),a!==null&&(c===void 0||c.qClickOutside!==!0)&&(((c&&c.type.indexOf("key")===0?a.closest('[tabindex]:not([tabindex^="-"])'):void 0)||a).focus(),a=null),H(()=>{_(!0),l("hide",c)},e.transitionDuration)}function V(c){u=void 0,i!==void 0&&(i(),i=void 0),(c===!0||b.value===!0)&&(Xe(S),p(),Y($),ge(R)),c!==!0&&(a=null)}function x(){(y.value!==null||e.scrollTarget!==void 0)&&(k.value=Me(y.value,e.scrollTarget),m(k.value,K))}function F(c){r!==!0?(Ye(s,c),l("click",c)):r=!1}function S(c){I.value===!0&&e.noFocus!==!0&&et(g.value,c.target)!==!0&&D()}function R(c){l("escapeKey"),w(c)}function K(){ve({targetEl:g.value,offset:e.offset,anchorEl:y.value,anchorOrigin:z.value,selfOrigin:Q.value,absoluteOffset:u,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function $e(){return O(Le,P.value,()=>b.value===!0?O("div",{role:"menu",...t,ref:g,tabindex:-1,class:["q-menu q-position-engine scroll"+L.value,t.class],style:[t.style,d.value],...le.value},de(n.default)):null)}return j(V),Object.assign(s,{focus:D,updatePosition:K}),ne}}),rt=ee({name:"QTooltip",inheritAttrs:!1,props:{...Be,...Ee,...qe,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:J},self:{type:String,default:"top middle",validator:J},offset:{type:Array,default:()=>[14,14],validator:_e},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...Se],setup(e,{slots:n,emit:l,attrs:t}){let a,u;const i=te(),{proxy:{$q:r}}=i,h=M(null),s=M(!1),v=T(()=>Z(e.anchor,r.lang.rtl)),g=T(()=>Z(e.self,r.lang.rtl)),b=T(()=>e.persistent!==!0),{registerTick:o,removeTick:f}=Ce(),{registerTimeout:E}=He(),{transitionProps:C,transitionStyle:H}=Pe(e),{localScrollTarget:P,changeScrollEvent:d,unconfigureScrollTarget:k}=Re(e,N),{anchorEl:m,canShow:p,anchorEvents:y}=Oe({showing:s,configureAnchorEl:D}),{show:q,hide:w}=pe({showing:s,canShow:p,handleShow:$,handleHide:z,hideOnRouteChange:b,processOnMount:!0});Object.assign(y,{delayShow:le,delayHide:I});const{showPortal:A,hidePortal:_,renderPortal:ne}=We(i,h,V,"tooltip");if(r.platform.is.mobile===!0){const x={anchorEl:m,innerRef:h,onClickOutside(S){return w(S),S.target.classList.contains("q-dialog__backdrop")&&fe(S),!0}},F=T(()=>e.modelValue===null&&e.persistent!==!0&&s.value===!0);W(F,S=>{(S===!0?Ae:Y)(x)}),j(()=>{Y(x)})}function $(x){A(),o(()=>{u=new MutationObserver(()=>L()),u.observe(h.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),L(),N()}),a===void 0&&(a=W(()=>r.screen.width+"|"+r.screen.height+"|"+e.self+"|"+e.anchor+"|"+r.lang.rtl,L)),E(()=>{A(!0),l("show",x)},e.transitionDuration)}function z(x){f(),_(),Q(),E(()=>{_(!0),l("hide",x)},e.transitionDuration)}function Q(){u!==void 0&&(u.disconnect(),u=void 0),a!==void 0&&(a(),a=void 0),k(),re(y,"tooltipTemp")}function L(){ve({targetEl:h.value,offset:e.offset,anchorEl:m.value,anchorOrigin:v.value,selfOrigin:g.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function le(x){if(r.platform.is.mobile===!0){ue(),document.body.classList.add("non-selectable");const F=m.value,S=["touchmove","touchcancel","touchend","click"].map(R=>[F,R,"delayHide","passiveCapture"]);U(y,"tooltipTemp",S)}E(()=>{q(x)},e.delay)}function I(x){r.platform.is.mobile===!0&&(re(y,"tooltipTemp"),ue(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),E(()=>{w(x)},e.hideDelay)}function D(){if(e.noParentEvent===!0||m.value===null)return;const x=r.platform.is.mobile===!0?[[m.value,"touchstart","delayShow","passive"]]:[[m.value,"mouseenter","delayShow","passive"],[m.value,"mouseleave","delayHide","passive"]];U(y,"anchor",x)}function N(){if(m.value!==null||e.scrollTarget!==void 0){P.value=Me(m.value,e.scrollTarget);const x=e.noParentEvent===!0?L:w;d(P.value,x)}}function ae(){return s.value===!0?O("div",{...t,ref:h,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",t.class],style:[t.style,H.value],role:"tooltip"},de(n.default)):null}function V(){return O(Le,C.value,ae)}return j(Q),Object.assign(i.proxy,{updatePosition:L}),ne}});export{it as Q,ot as a,Oe as b,ut as c,rt as d,Be as u};
