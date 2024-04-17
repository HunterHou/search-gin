import{r as C,aa as Ne,P as G,E as K,J as O,R as Ve,a5 as se,G as M,L as N,T as Q,aG as Ee,aP as ge,aQ as J,y as W,aR as ce,aS as be,aT as Ie,ab as Ue,a0 as Se,aU as qe,a1 as pe,c as T,aV as Ce,a2 as He,aW as Pe,a3 as Le,aX as We,S as Me,ae as Re,H as ve,al as he,N as Be,aA as Xe,O as Oe,aY as Ye,K as Ge,aZ as Je,ai as Ze,a_ as et,a$ as ye,b0 as tt,b1 as nt,b2 as lt,b3 as it}from"./index.ac7298ea.js";import{c as de}from"./index.bf75bae5.js";function ot(){const e=C(!Ne.value);return e.value===!1&&G(()=>{e.value=!0}),e}const ze=typeof ResizeObserver!="undefined",xe=ze===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var dt=K({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:l}){let n=null,t,i={width:-1,height:-1};function s(r){r===!0||e.debounce===0||e.debounce==="0"?o():n===null&&(n=setTimeout(o,e.debounce))}function o(){if(n!==null&&(clearTimeout(n),n=null),t){const{offsetWidth:r,offsetHeight:u}=t;(r!==i.width||u!==i.height)&&(i={width:r,height:u},l("resize",i))}}const{proxy:c}=N();if(ze===!0){let r;const u=d=>{t=c.$el.parentNode,t?(r=new ResizeObserver(s),r.observe(t),o()):d!==!0&&se(()=>{u(!0)})};return G(()=>{u()}),O(()=>{n!==null&&clearTimeout(n),r!==void 0&&(r.disconnect!==void 0?r.disconnect():t&&r.unobserve(t))}),Ve}else{let d=function(){n!==null&&(clearTimeout(n),n=null),u!==void 0&&(u.removeEventListener!==void 0&&u.removeEventListener("resize",s,Q.passive),u=void 0)},g=function(){d(),t&&t.contentDocument&&(u=t.contentDocument.defaultView,u.addEventListener("resize",s,Q.passive),o())};const r=ot();let u;return G(()=>{se(()=>{t=c.$el,t&&g()})}),O(d),c.trigger=s,()=>{if(r.value===!0)return M("object",{style:xe.style,tabindex:-1,type:"text/html",data:xe.url,"aria-hidden":"true",onLoad:g})}}}});const Ae={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function $e({showing:e,avoidEmit:l,configureAnchorEl:n}){const{props:t,proxy:i,emit:s}=N(),o=C(null);let c=null;function r(a){return o.value===null?!1:a===void 0||a.touches===void 0||a.touches.length<=1}const u={};n===void 0&&(Object.assign(u,{hide(a){i.hide(a)},toggle(a){i.toggle(a),a.qAnchorHandled=!0},toggleKey(a){Ee(a,13)===!0&&u.toggle(a)},contextClick(a){i.hide(a),ge(a),se(()=>{i.show(a),a.qAnchorHandled=!0})},prevent:ge,mobileTouch(a){if(u.mobileCleanup(a),r(a)!==!0)return;i.hide(a),o.value.classList.add("non-selectable");const h=a.target;J(u,"anchor",[[h,"touchmove","mobileCleanup","passive"],[h,"touchend","mobileCleanup","passive"],[h,"touchcancel","mobileCleanup","passive"],[o.value,"contextmenu","prevent","notPassive"]]),c=setTimeout(()=>{c=null,i.show(a),a.qAnchorHandled=!0},300)},mobileCleanup(a){o.value.classList.remove("non-selectable"),c!==null&&(clearTimeout(c),c=null),e.value===!0&&a!==void 0&&de()}}),n=function(a=t.contextMenu){if(t.noParentEvent===!0||o.value===null)return;let h;a===!0?i.$q.platform.is.mobile===!0?h=[[o.value,"touchstart","mobileTouch","passive"]]:h=[[o.value,"mousedown","hide","passive"],[o.value,"contextmenu","contextClick","notPassive"]]:h=[[o.value,"click","toggle","passive"],[o.value,"keyup","toggleKey","passive"]],J(u,"anchor",h)});function d(){ce(u,"anchor")}function g(a){for(o.value=a;o.value.classList.contains("q-anchor--skip");)o.value=o.value.parentNode;n()}function b(){if(t.target===!1||t.target===""||i.$el.parentNode===null)o.value=null;else if(t.target===!0)g(i.$el.parentNode);else{let a=t.target;if(typeof t.target=="string")try{a=document.querySelector(t.target)}catch{a=void 0}a!=null?(o.value=a.$el||a,n()):(o.value=null,console.error(`Anchor: target "${t.target}" not found`))}}return W(()=>t.contextMenu,a=>{o.value!==null&&(d(),n(a))}),W(()=>t.target,()=>{o.value!==null&&d(),b()}),W(()=>t.noParentEvent,a=>{o.value!==null&&(a===!0?d():n())}),G(()=>{b(),l!==!0&&t.modelValue===!0&&o.value===null&&s("update:modelValue",!1)}),O(()=>{c!==null&&clearTimeout(c),d()}),{anchorEl:o,canShow:r,anchorEvents:u}}function De(e,l){const n=C(null);let t;function i(c,r){const u=`${r!==void 0?"add":"remove"}EventListener`,d=r!==void 0?r:t;c!==window&&c[u]("scroll",d,Q.passive),window[u]("scroll",d,Q.passive),t=r}function s(){n.value!==null&&(i(n.value),n.value=null)}const o=W(()=>e.noParentEvent,()=>{n.value!==null&&(s(),l())});return O(o),{localScrollTarget:n,unconfigureScrollTarget:s,changeScrollEvent:i}}const{notPassiveCapture:Z}=Q,B=[];function ee(e){const l=e.target;if(l===void 0||l.nodeType===8||l.classList.contains("no-pointer-events")===!0)return;let n=be.length-1;for(;n>=0;){const t=be[n].$;if(t.type.name==="QTooltip"){n--;continue}if(t.type.name!=="QDialog")break;if(t.props.seamless!==!0)return;n--}for(let t=B.length-1;t>=0;t--){const i=B[t];if((i.anchorEl.value===null||i.anchorEl.value.contains(l)===!1)&&(l===document.body||i.innerRef.value!==null&&i.innerRef.value.contains(l)===!1))e.qClickOutside=!0,i.onClickOutside(e);else return}}function _e(e){B.push(e),B.length===1&&(document.addEventListener("mousedown",ee,Z),document.addEventListener("touchstart",ee,Z))}function te(e){const l=B.findIndex(n=>n===e);l>-1&&(B.splice(l,1),B.length===0&&(document.removeEventListener("mousedown",ee,Z),document.removeEventListener("touchstart",ee,Z)))}let Te,we;function ne(e){const l=e.split(" ");return l.length!==2?!1:["top","center","bottom"].includes(l[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(l[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function je(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const fe={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{fe[`${e}#ltr`]=e,fe[`${e}#rtl`]=e});function le(e,l){const n=e.split(" ");return{vertical:n[0],horizontal:fe[`${n[1]}#${l===!0?"rtl":"ltr"}`]}}function at(e,l){let{top:n,left:t,right:i,bottom:s,width:o,height:c}=e.getBoundingClientRect();return l!==void 0&&(n-=l[1],t-=l[0],s+=l[1],i+=l[0],o+=l[0],c+=l[1]),{top:n,bottom:s,height:c,left:t,right:i,width:o,middle:t+(i-t)/2,center:n+(s-n)/2}}function ut(e,l,n){let{top:t,left:i}=e.getBoundingClientRect();return t+=l.top,i+=l.left,n!==void 0&&(t+=n[1],i+=n[0]),{top:t,bottom:t+1,height:1,left:i,right:i+1,width:1,middle:i,center:t}}function rt(e,l){return{top:0,center:l/2,bottom:l,left:0,middle:e/2,right:e}}function ke(e,l,n,t){return{top:e[n.vertical]-l[t.vertical],left:e[n.horizontal]-l[t.horizontal]}}function me(e,l=0){if(e.targetEl===null||e.anchorEl===null||l>5)return;if(e.targetEl.offsetHeight===0||e.targetEl.offsetWidth===0){setTimeout(()=>{me(e,l+1)},10);return}const{targetEl:n,offset:t,anchorEl:i,anchorOrigin:s,selfOrigin:o,absoluteOffset:c,fit:r,cover:u,maxHeight:d,maxWidth:g}=e;if(Ie.is.ios===!0&&window.visualViewport!==void 0){const L=document.body.style,{offsetLeft:y,offsetTop:S}=window.visualViewport;y!==Te&&(L.setProperty("--q-pe-left",y+"px"),Te=y),S!==we&&(L.setProperty("--q-pe-top",S+"px"),we=S)}const{scrollLeft:b,scrollTop:a}=n,h=c===void 0?at(i,u===!0?[0,0]:t):ut(i,c,t);Object.assign(n.style,{top:0,left:0,minWidth:null,minHeight:null,maxWidth:g||"100vw",maxHeight:d||"100vh",visibility:"visible"});const{offsetWidth:E,offsetHeight:p}=n,{elWidth:H,elHeight:P}=r===!0||u===!0?{elWidth:Math.max(h.width,E),elHeight:u===!0?Math.max(h.height,p):p}:{elWidth:E,elHeight:p};let v={maxWidth:g,maxHeight:d};(r===!0||u===!0)&&(v.minWidth=h.width+"px",u===!0&&(v.minHeight=h.height+"px")),Object.assign(n.style,v);const w=rt(H,P);let m=ke(h,w,s,o);if(c===void 0||t===void 0)re(m,h,w,s,o);else{const{top:L,left:y}=m;re(m,h,w,s,o);let S=!1;if(m.top!==L){S=!0;const k=2*t[1];h.center=h.top-=k,h.bottom-=k+2}if(m.left!==y){S=!0;const k=2*t[0];h.middle=h.left-=k,h.right-=k+2}S===!0&&(m=ke(h,w,s,o),re(m,h,w,s,o))}v={top:m.top+"px",left:m.left+"px"},m.maxHeight!==void 0&&(v.maxHeight=m.maxHeight+"px",h.height>m.maxHeight&&(v.minHeight=v.maxHeight)),m.maxWidth!==void 0&&(v.maxWidth=m.maxWidth+"px",h.width>m.maxWidth&&(v.minWidth=v.maxWidth)),Object.assign(n.style,v),n.scrollTop!==a&&(n.scrollTop=a),n.scrollLeft!==b&&(n.scrollLeft=b)}function re(e,l,n,t,i){const s=n.bottom,o=n.right,c=Ue(),r=window.innerHeight-c,u=document.body.clientWidth;if(e.top<0||e.top+s>r)if(i.vertical==="center")e.top=l[t.vertical]>r/2?Math.max(0,r-s):0,e.maxHeight=Math.min(s,r);else if(l[t.vertical]>r/2){const d=Math.min(r,t.vertical==="center"?l.center:t.vertical===i.vertical?l.bottom:l.top);e.maxHeight=Math.min(s,d),e.top=Math.max(0,d-s)}else e.top=Math.max(0,t.vertical==="center"?l.center:t.vertical===i.vertical?l.top:l.bottom),e.maxHeight=Math.min(s,r-e.top);if(e.left<0||e.left+o>u)if(e.maxWidth=Math.min(o,u),i.horizontal==="middle")e.left=l[t.horizontal]>u/2?Math.max(0,u-o):0;else if(l[t.horizontal]>u/2){const d=Math.min(u,t.horizontal==="middle"?l.middle:t.horizontal===i.horizontal?l.right:l.left);e.maxWidth=Math.min(o,d),e.left=Math.max(0,d-e.maxWidth)}else e.left=Math.max(0,t.horizontal==="middle"?l.middle:t.horizontal===i.horizontal?l.left:l.right),e.maxWidth=Math.min(o,u-e.left)}var ft=K({name:"QTooltip",inheritAttrs:!1,props:{...Ae,...Se,...qe,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:ne},self:{type:String,default:"top middle",validator:ne},offset:{type:Array,default:()=>[14,14],validator:je},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...pe],setup(e,{slots:l,emit:n,attrs:t}){let i,s;const o=N(),{proxy:{$q:c}}=o,r=C(null),u=C(!1),d=T(()=>le(e.anchor,c.lang.rtl)),g=T(()=>le(e.self,c.lang.rtl)),b=T(()=>e.persistent!==!0),{registerTick:a,removeTick:h}=Ce(),{registerTimeout:E}=He(),{transitionProps:p,transitionStyle:H}=Pe(e),{localScrollTarget:P,changeScrollEvent:v,unconfigureScrollTarget:w}=De(e,X),{anchorEl:m,canShow:L,anchorEvents:y}=$e({showing:u,configureAnchorEl:_}),{show:S,hide:k}=Le({showing:u,canShow:L,handleShow:D,handleHide:V,hideOnRouteChange:b,processOnMount:!0});Object.assign(y,{delayShow:oe,delayHide:U});const{showPortal:A,hidePortal:$,renderPortal:ie}=We(o,r,Y,"tooltip");if(c.platform.is.mobile===!0){const x={anchorEl:m,innerRef:r,onClickOutside(q){return k(q),q.target.classList.contains("q-dialog__backdrop")&&he(q),!0}},j=T(()=>e.modelValue===null&&e.persistent!==!0&&u.value===!0);W(j,q=>{(q===!0?_e:te)(x)}),O(()=>{te(x)})}function D(x){A(),a(()=>{s=new MutationObserver(()=>R()),s.observe(r.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),R(),X()}),i===void 0&&(i=W(()=>c.screen.width+"|"+c.screen.height+"|"+e.self+"|"+e.anchor+"|"+c.lang.rtl,R)),E(()=>{A(!0),n("show",x)},e.transitionDuration)}function V(x){h(),$(),I(),E(()=>{$(!0),n("hide",x)},e.transitionDuration)}function I(){s!==void 0&&(s.disconnect(),s=void 0),i!==void 0&&(i(),i=void 0),w(),ce(y,"tooltipTemp")}function R(){me({targetEl:r.value,offset:e.offset,anchorEl:m.value,anchorOrigin:d.value,selfOrigin:g.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function oe(x){if(c.platform.is.mobile===!0){de(),document.body.classList.add("non-selectable");const j=m.value,q=["touchmove","touchcancel","touchend","click"].map(z=>[j,z,"delayHide","passiveCapture"]);J(y,"tooltipTemp",q)}E(()=>{S(x)},e.delay)}function U(x){c.platform.is.mobile===!0&&(ce(y,"tooltipTemp"),de(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),E(()=>{k(x)},e.hideDelay)}function _(){if(e.noParentEvent===!0||m.value===null)return;const x=c.platform.is.mobile===!0?[[m.value,"touchstart","delayShow","passive"]]:[[m.value,"mouseenter","delayShow","passive"],[m.value,"mouseleave","delayHide","passive"]];J(y,"anchor",x)}function X(){if(m.value!==null||e.scrollTarget!==void 0){P.value=Me(m.value,e.scrollTarget);const x=e.noParentEvent===!0?R:k;v(P.value,x)}}function ae(){return u.value===!0?M("div",{...t,ref:r,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",t.class],style:[t.style,H.value],role:"tooltip"},ve(l.default)):null}function Y(){return M(Re,p.value,ae)}return O(I),Object.assign(o.proxy,{updatePosition:R}),ie}}),vt=K({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:l}){const n=T(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>M("div",{class:n.value},ve(l.default))}}),ht=K({name:"QItem",props:{...Be,...Xe,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:l,emit:n}){const{proxy:{$q:t}}=N(),i=Oe(e,t),{hasLink:s,linkAttrs:o,linkClass:c,linkTag:r,navigateOnClick:u}=Ye(),d=C(null),g=C(null),b=T(()=>e.clickable===!0||s.value===!0||e.tag==="label"),a=T(()=>e.disable!==!0&&b.value===!0),h=T(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(i.value===!0?" q-item--dark":"")+(s.value===!0&&e.active===null?c.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(a.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),E=T(()=>{if(e.insetLevel===void 0)return null;const v=t.lang.rtl===!0?"Right":"Left";return{["padding"+v]:16+e.insetLevel*56+"px"}});function p(v){a.value===!0&&(g.value!==null&&(v.qKeyEvent!==!0&&document.activeElement===d.value?g.value.focus():document.activeElement===g.value&&d.value.focus()),u(v))}function H(v){if(a.value===!0&&Ee(v,13)===!0){he(v),v.qKeyEvent=!0;const w=new MouseEvent("click",v);w.qKeyEvent=!0,d.value.dispatchEvent(w)}n("keyup",v)}function P(){const v=Ge(l.default,[]);return a.value===!0&&v.unshift(M("div",{class:"q-focus-helper",tabindex:-1,ref:g})),v}return()=>{const v={ref:d,class:h.value,style:E.value,role:"listitem",onClick:p,onKeyup:H};return a.value===!0?(v.tabindex=e.tabindex||"0",Object.assign(v,o.value)):b.value===!0&&(v["aria-disabled"]="true"),M(r.value,v,P())}}}),mt=K({name:"QMenu",inheritAttrs:!1,props:{...Ae,...Se,...Be,...qe,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:ne},self:{type:String,validator:ne},offset:{type:Array,validator:je},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...pe,"click","escapeKey"],setup(e,{slots:l,emit:n,attrs:t}){let i=null,s,o,c;const r=N(),{proxy:u}=r,{$q:d}=u,g=C(null),b=C(!1),a=T(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),h=Oe(e,d),{registerTick:E,removeTick:p}=Ce(),{registerTimeout:H}=He(),{transitionProps:P,transitionStyle:v}=Pe(e),{localScrollTarget:w,changeScrollEvent:m,unconfigureScrollTarget:L}=De(e,x),{anchorEl:y,canShow:S}=$e({showing:b}),{hide:k}=Le({showing:b,canShow:S,handleShow:X,handleHide:ae,hideOnRouteChange:a,processOnMount:!0}),{showPortal:A,hidePortal:$,renderPortal:ie}=We(r,g,Fe,"menu"),D={anchorEl:y,innerRef:g,onClickOutside(f){if(e.persistent!==!0&&b.value===!0)return k(f),(f.type==="touchstart"||f.target.classList.contains("q-dialog__backdrop"))&&he(f),!0}},V=T(()=>le(e.anchor||(e.cover===!0?"center middle":"bottom start"),d.lang.rtl)),I=T(()=>e.cover===!0?V.value:le(e.self||"top start",d.lang.rtl)),R=T(()=>(e.square===!0?" q-menu--square":"")+(h.value===!0?" q-menu--dark q-dark":"")),oe=T(()=>e.autoClose===!0?{onClick:j}:{}),U=T(()=>b.value===!0&&e.persistent!==!0);W(U,f=>{f===!0?(lt(z),_e(D)):(ye(z),te(D))});function _(){nt(()=>{let f=g.value;f&&f.contains(document.activeElement)!==!0&&(f=f.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||f.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||f.querySelector("[autofocus], [data-autofocus]")||f,f.focus({preventScroll:!0}))})}function X(f){if(i=e.noRefocus===!1?document.activeElement:null,Je(q),A(),x(),s=void 0,f!==void 0&&(e.touchPosition||e.contextMenu)){const ue=Ze(f);if(ue.left!==void 0){const{top:Qe,left:Ke}=y.value.getBoundingClientRect();s={left:ue.left-Ke,top:ue.top-Qe}}}o===void 0&&(o=W(()=>d.screen.width+"|"+d.screen.height+"|"+e.self+"|"+e.anchor+"|"+d.lang.rtl,F)),e.noFocus!==!0&&document.activeElement.blur(),E(()=>{F(),e.noFocus!==!0&&_()}),H(()=>{d.platform.is.ios===!0&&(c=e.autoClose,g.value.click()),F(),A(!0),n("show",f)},e.transitionDuration)}function ae(f){p(),$(),Y(!0),i!==null&&(f===void 0||f.qClickOutside!==!0)&&(((f&&f.type.indexOf("key")===0?i.closest('[tabindex]:not([tabindex^="-"])'):void 0)||i).focus(),i=null),H(()=>{$(!0),n("hide",f)},e.transitionDuration)}function Y(f){s=void 0,o!==void 0&&(o(),o=void 0),(f===!0||b.value===!0)&&(et(q),L(),te(D),ye(z)),f!==!0&&(i=null)}function x(){(y.value!==null||e.scrollTarget!==void 0)&&(w.value=Me(y.value,e.scrollTarget),m(w.value,F))}function j(f){c!==!0?(tt(u,f),n("click",f)):c=!1}function q(f){U.value===!0&&e.noFocus!==!0&&it(g.value,f.target)!==!0&&_()}function z(f){n("escapeKey"),k(f)}function F(){me({targetEl:g.value,offset:e.offset,anchorEl:y.value,anchorOrigin:V.value,selfOrigin:I.value,absoluteOffset:s,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function Fe(){return M(Re,P.value,()=>b.value===!0?M("div",{role:"menu",...t,ref:g,tabindex:-1,class:["q-menu q-position-engine scroll"+R.value,t.class],style:[t.style,v.value],...oe.value},ve(l.default)):null)}return O(Y),Object.assign(u,{focus:_,updatePosition:F}),ie}});export{ht as Q,dt as a,$e as b,mt as c,ft as d,vt as e,Ae as u};
