import{e as Ge,c as Xe,a as Ye,b as be,d as ke,Q as E,f as Je}from"./Setting.08531f03.js";import{Q as Ie}from"./QPageSticky.8e4b8d4e.js";import{n as Ze,c as Ne,C as et,aF as tt,D as ot,r as I,a as C,aG as nt,E as lt,aH as it,F as at,aI as rt,w as L,o as ie,az as Pe,au as Oe,k as st,h as y,ac as ut,g as Ce,d as Ae,aA as Fe,ax as dt,bf as Ue,aw as _e,a0 as W,V as B,br as ct,b4 as ft,j as K,bs as ze,u as pt,s as mt,bt as gt,H as ht,aN as vt,R as x,$ as z,a1 as ae,a2 as re,S as se,T as h,X as Q,Y as ue,W as de,b0 as yt,aa as le,U as p,al as M,O as bt,aY as kt,a5 as O}from"./index.b26dd352.js";import{u as Tt,v as Le,d as wt,p as He,e as St,b as Ct,r as $e,s as xt,f as It,a as Be,Q as Pt}from"./QMenu.5489355c.js";import{c as qe}from"./selection.f9249189.js";import{u as Ot}from"./use-quasar.1e82836c.js";import{a as _t,b as zt,P as Lt}from"./settingAPI.eb051327.js";import{Q as Se}from"./QChip.b0e52ffa.js";import{b as Re}from"./index.6efedac5.js";import"./QResizeObserver.5fedf3b8.js";import"./touch.3df10340.js";import"./axios.93234622.js";function Me(t,e){if(e&&t===e)return null;const n=t.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(n)===!0)return t;const o=window.getComputedStyle?window.getComputedStyle(t):t.currentStyle,r=o.display;return r==="block"||r==="table"?t:Me(t.parentNode)}function Te(t,e,n){return!t||t===document.body?!1:n===!0&&t===e||(e===document?document.body:e).contains(t.parentNode)}function Ve(t,e,n){if(n||(n=document.createRange(),n.selectNode(t),n.setStart(t,0)),e.count===0)n.setEnd(t,e.count);else if(e.count>0)if(t.nodeType===Node.TEXT_NODE)t.textContent.length<e.count?e.count-=t.textContent.length:(n.setEnd(t,e.count),e.count=0);else for(let o=0;e.count!==0&&o<t.childNodes.length;o++)n=Ve(t.childNodes[o],e,n);return n}const Ht=/^https?:\/\//;class $t{constructor(e,n){this.el=e,this.eVm=n,this._range=null}get selection(){if(this.el){const e=document.getSelection();if(Te(e.anchorNode,this.el,!0)&&Te(e.focusNode,this.el,!0))return e}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length!==0:!1}get range(){const e=this.selection;return e!==null&&e.rangeCount?e.getRangeAt(0):this._range}get parent(){const e=this.range;if(e!==null){const n=e.startContainer;return n.nodeType===document.ELEMENT_NODE?n:n.parentNode}return null}get blockParent(){const e=this.parent;return e!==null?Me(e,this.el):null}save(e=this.range){e!==null&&(this._range=e)}restore(e=this._range){const n=document.createRange(),o=document.getSelection();e!==null?(n.setStart(e.startContainer,e.startOffset),n.setEnd(e.endContainer,e.endOffset),o.removeAllRanges(),o.addRange(n)):(o.selectAllChildren(this.el),o.collapseToEnd())}savePosition(){let e=-1,n;const o=document.getSelection(),r=this.el.parentNode;if(o.focusNode&&Te(o.focusNode,r))for(n=o.focusNode,e=o.focusOffset;n&&n!==r;)n!==this.el&&n.previousSibling?(n=n.previousSibling,e+=n.textContent.length):n=n.parentNode;this.savedPos=e}restorePosition(e=0){if(this.savedPos>0&&this.savedPos<e){const n=window.getSelection(),o=Ve(this.el,{count:this.savedPos});o&&(o.collapse(!1),n.removeAllRanges(),n.addRange(o))}}hasParent(e,n){const o=n?this.parent:this.blockParent;return o!==null?o.nodeName.toLowerCase()===e.toLowerCase():!1}hasParents(e,n,o=this.parent){return o===null?!1:e.includes(o.nodeName.toLowerCase())===!0?!0:n===!0?this.hasParents(e,n,o.parentNode):!1}is(e,n){if(this.selection===null)return!1;switch(e){case"formatBlock":return n==="DIV"&&this.parent===this.el||this.hasParent(n,n==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(e)===n;case"fontName":const o=document.queryCommandValue(e);return o===`"${n}"`||o===n;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const r=document.queryCommandState(e);return n!==void 0?r===n:r}}getParentAttribute(e){return this.parent!==null?this.parent.getAttribute(e):null}can(e){if(e==="outdent")return this.hasParents(["blockquote","li"],!0);if(e==="indent")return this.hasParents(["li"],!0);if(e==="link")return this.selection!==null||this.is("link")}apply(e,n,o=Ze){if(e==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(n)&&this.is(e,n)&&(e="outdent",n=null),n==="PRE"&&this.is(e,"PRE")&&(n="P");else if(e==="print"){o();const r=window.open();r.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),r.print(),r.close();return}else if(e==="link"){const r=this.getParentAttribute("href");if(r===null){const d=this.selectWord(this.selection),u=d?d.toString():"";if(!u.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=Ht.test(u)?u:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(d.getRangeAt(0))}else this.eVm.editLinkUrl.value=r,this.range.selectNodeContents(this.parent),this.save();return}else if(e==="fullscreen"){this.eVm.toggleFullscreen(),o();return}else if(e==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),o();return}document.execCommand(e,!1,n),o()}selectWord(e){if(e===null||e.isCollapsed!==!0||e.modify===void 0)return e;const n=document.createRange();n.setStart(e.anchorNode,e.anchorOffset),n.setEnd(e.focusNode,e.focusOffset);const o=n.collapsed?["backward","forward"]:["forward","backward"];n.detach();const r=e.focusNode,d=e.focusOffset;return e.collapse(e.anchorNode,e.anchorOffset),e.modify("move",o[0],"character"),e.modify("move",o[1],"word"),e.extend(r,d),e.modify("extend",o[1],"character"),e.modify("extend",o[0],"word"),e}}var Bt=Ne({name:"QTooltip",inheritAttrs:!1,props:{...Tt,...et,...tt,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:Le},self:{type:String,default:"top middle",validator:Le},offset:{type:Array,default:()=>[14,14],validator:wt},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...ot],setup(t,{slots:e,emit:n,attrs:o}){let r,d;const u=Ce(),{proxy:{$q:c}}=u,a=I(null),s=I(!1),f=C(()=>He(t.anchor,c.lang.rtl)),v=C(()=>He(t.self,c.lang.rtl)),m=C(()=>t.persistent!==!0),{registerTick:b,removeTick:H}=nt(),{registerTimeout:_}=lt(),{transitionProps:F,transitionStyle:q}=it(t),{localScrollTarget:U,changeScrollEvent:V,unconfigureScrollTarget:ce}=St(t,Z),{anchorEl:P,canShow:G,anchorEvents:k}=Ct({showing:s,configureAnchorEl:ye}),{show:fe,hide:D}=at({showing:s,canShow:G,handleShow:me,handleHide:ge,hideOnRouteChange:m,processOnMount:!0});Object.assign(k,{delayShow:he,delayHide:ve});const{showPortal:X,hidePortal:Y,renderPortal:pe}=rt(u,a,te,"tooltip");if(c.platform.is.mobile===!0){const T={anchorEl:P,innerRef:a,onClickOutside(S){return D(S),S.target.classList.contains("q-dialog__backdrop")&&Fe(S),!0}},A=C(()=>t.modelValue===null&&t.persistent!==!0&&s.value===!0);L(A,S=>{(S===!0?It:$e)(T)}),ie(()=>{$e(T)})}function me(T){X(),b(()=>{d=new MutationObserver(()=>N()),d.observe(a.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),N(),Z()}),r===void 0&&(r=L(()=>c.screen.width+"|"+c.screen.height+"|"+t.self+"|"+t.anchor+"|"+c.lang.rtl,N)),_(()=>{X(!0),n("show",T)},t.transitionDuration)}function ge(T){H(),Y(),J(),_(()=>{Y(!0),n("hide",T)},t.transitionDuration)}function J(){d!==void 0&&(d.disconnect(),d=void 0),r!==void 0&&(r(),r=void 0),ce(),Pe(k,"tooltipTemp")}function N(){xt({targetEl:a.value,offset:t.offset,anchorEl:P.value,anchorOrigin:f.value,selfOrigin:v.value,maxHeight:t.maxHeight,maxWidth:t.maxWidth})}function he(T){if(c.platform.is.mobile===!0){qe(),document.body.classList.add("non-selectable");const A=P.value,S=["touchmove","touchcancel","touchend","click"].map(R=>[A,R,"delayHide","passiveCapture"]);Oe(k,"tooltipTemp",S)}_(()=>{fe(T)},t.delay)}function ve(T){c.platform.is.mobile===!0&&(Pe(k,"tooltipTemp"),qe(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),_(()=>{D(T)},t.hideDelay)}function ye(){if(t.noParentEvent===!0||P.value===null)return;const T=c.platform.is.mobile===!0?[[P.value,"touchstart","delayShow","passive"]]:[[P.value,"mouseenter","delayShow","passive"],[P.value,"mouseleave","delayHide","passive"]];Oe(k,"anchor",T)}function Z(){if(P.value!==null||t.scrollTarget!==void 0){U.value=st(P.value,t.scrollTarget);const T=t.noParentEvent===!0?N:D;V(U.value,T)}}function ee(){return s.value===!0?y("div",{...o,ref:a,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",o.class],style:[o.style,q.value],role:"tooltip"},Ae(e.default)):null}function te(){return y(ut,F.value,ee)}return ie(J),Object.assign(u.proxy,{updatePosition:N}),pe}});function De(t,e,n){e.handler?e.handler(t,n,n.caret):n.runCmd(e.cmd,e.param)}function xe(t){return y("div",{class:"q-editor__toolbar-group"},t)}function je(t,e,n,o=!1){const r=o||(e.type==="toggle"?e.toggled?e.toggled(t):e.cmd&&t.caret.is(e.cmd,e.param):!1),d=[];if(e.tip&&t.$q.platform.is.desktop){const u=e.key?y("div",[y("small",`(CTRL + ${String.fromCharCode(e.key)})`)]):null;d.push(y(Bt,{delay:1e3},()=>[y("div",{innerHTML:e.tip}),u]))}return y(W,{...t.buttonProps.value,icon:e.icon!==null?e.icon:void 0,color:r?e.toggleColor||t.props.toolbarToggleColor:e.color||t.props.toolbarColor,textColor:r&&!t.props.toolbarPush?null:e.textColor||t.props.toolbarTextColor,label:e.label,disable:e.disable?typeof e.disable=="function"?e.disable(t):!0:!1,size:"sm",onClick(u){n&&n(),De(u,e,t)}},()=>d)}function qt(t,e){const n=e.list==="only-icons";let o=e.label,r=e.icon!==null?e.icon:void 0,d,u;function c(){s.component.proxy.hide()}if(n)u=e.options.map(f=>{const v=f.type===void 0?t.caret.is(f.cmd,f.param):!1;return v&&(o=f.tip,r=f.icon!==null?f.icon:void 0),je(t,f,c,v)}),d=t.toolbarBackgroundClass.value,u=[xe(u)];else{const f=t.props.toolbarToggleColor!==void 0?`text-${t.props.toolbarToggleColor}`:null,v=t.props.toolbarTextColor!==void 0?`text-${t.props.toolbarTextColor}`:null,m=e.list==="no-icons";u=e.options.map(b=>{const H=b.disable?b.disable(t):!1,_=b.type===void 0?t.caret.is(b.cmd,b.param):!1;_&&(o=b.tip,r=b.icon!==null?b.icon:void 0);const F=b.htmlTip;return y(Pt,{active:_,activeClass:f,clickable:!0,disable:H,dense:!0,onClick(q){c(),t.contentRef.value!==null&&t.contentRef.value.focus(),t.caret.restore(),De(q,b,t)}},()=>[m===!0?null:y(Be,{class:_?f:v,side:!0},()=>y(B,{name:b.icon!==null?b.icon:void 0})),y(Be,F?()=>y("div",{class:"text-no-wrap",innerHTML:b.htmlTip}):b.tip?()=>y("div",{class:"text-no-wrap"},b.tip):void 0)])}),d=[t.toolbarBackgroundClass.value,v]}const a=e.highlight&&o!==e.label,s=y(Ge,{...t.buttonProps.value,noCaps:!0,noWrap:!0,color:a?t.props.toolbarToggleColor:t.props.toolbarColor,textColor:a&&!t.props.toolbarPush?null:t.props.toolbarTextColor,label:e.fixedLabel?e.label:o,icon:e.fixedIcon?e.icon!==null?e.icon:void 0:r,contentClass:d,onShow:f=>t.emit("dropdownShow",f),onHide:f=>t.emit("dropdownHide",f),onBeforeShow:f=>t.emit("dropdownBeforeShow",f),onBeforeHide:f=>t.emit("dropdownBeforeHide",f)},()=>u);return s}function Et(t){if(t.caret)return t.buttons.value.filter(e=>!t.isViewingSource.value||e.find(n=>n.cmd==="viewsource")).map(e=>xe(e.map(n=>t.isViewingSource.value&&n.cmd!=="viewsource"?!1:n.type==="slot"?Ae(t.slots[n.slot]):n.type==="dropdown"?qt(t,n):je(t,n))))}function Nt(t,e,n,o={}){const r=Object.keys(o);if(r.length===0)return{};const d={default_font:{cmd:"fontName",param:t,icon:n,tip:e}};return r.forEach(u=>{const c=o[u];d[u]={cmd:"fontName",param:c,icon:n,tip:c,htmlTip:`<font face="${c}">${c}</font>`}}),d}function At(t){if(t.caret){const e=t.props.toolbarColor||t.props.toolbarTextColor;let n=t.editLinkUrl.value;const o=()=>{t.caret.restore(),n!==t.editLinkUrl.value&&document.execCommand("createLink",!1,n===""?" ":n),t.editLinkUrl.value=null};return[y("div",{class:`q-mx-xs text-${e}`},`${t.$q.lang.editor.url}: `),y("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:n,onInput:r=>{dt(r),n=r.target.value},onKeydown:r=>{if(Ue(r)!==!0)switch(r.keyCode){case 13:return _e(r),o();case 27:_e(r),t.caret.restore(),(!t.editLinkUrl.value||t.editLinkUrl.value==="https://")&&document.execCommand("unlink"),t.editLinkUrl.value=null;break}}}),xe([y(W,{key:"qedt_btm_rem",tabindex:-1,...t.buttonProps.value,label:t.$q.lang.label.remove,noCaps:!0,onClick:()=>{t.caret.restore(),document.execCommand("unlink"),t.editLinkUrl.value=null}}),y(W,{key:"qedt_btm_upd",...t.buttonProps.value,label:t.$q.lang.label.update,noCaps:!0,onClick:o})])]}}let j=0;const Ft={fullscreen:Boolean,noRouteFullscreenExit:Boolean},Ut=["update:fullscreen","fullscreen"];function Rt(){const t=Ce(),{props:e,emit:n,proxy:o}=t;let r,d,u;const c=I(!1);ct(t)===!0&&L(()=>o.$route.fullPath,()=>{e.noRouteFullscreenExit!==!0&&f()}),L(()=>e.fullscreen,v=>{c.value!==v&&a()}),L(c,v=>{n("update:fullscreen",v),n("fullscreen",v)});function a(){c.value===!0?f():s()}function s(){c.value!==!0&&(c.value=!0,u=o.$el.parentNode,u.replaceChild(d,o.$el),document.body.appendChild(o.$el),j++,j===1&&document.body.classList.add("q-body--fullscreen-mixin"),r={handler:f},ze.add(r))}function f(){c.value===!0&&(r!==void 0&&(ze.remove(r),r=void 0),u.replaceChild(o.$el,d),c.value=!1,j=Math.max(0,j-1),j===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),o.$el.scrollIntoView!==void 0&&setTimeout(()=>{o.$el.scrollIntoView()})))}return ft(()=>{d=document.createElement("span")}),K(()=>{e.fullscreen===!0&&s()}),ie(f),Object.assign(o,{toggleFullscreen:a,setFullscreen:s,exitFullscreen:f}),{inFullscreen:c,toggleFullscreen:a}}const Mt=Object.prototype.toString,we=Object.prototype.hasOwnProperty,Vt=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(t=>"[object "+t+"]"));function Ee(t){if(t!==Object(t)||Vt.has(Mt.call(t))===!0||t.constructor&&we.call(t,"constructor")===!1&&we.call(t.constructor.prototype,"isPrototypeOf")===!1)return!1;let e;for(e in t);return e===void 0||we.call(t,e)}function Qe(){let t,e,n,o,r,d,u=arguments[0]||{},c=1,a=!1;const s=arguments.length;for(typeof u=="boolean"&&(a=u,u=arguments[1]||{},c=2),Object(u)!==u&&typeof u!="function"&&(u={}),s===c&&(u=this,c--);c<s;c++)if((t=arguments[c])!==null)for(e in t)n=u[e],o=t[e],u!==o&&(a===!0&&o&&((r=Array.isArray(o))||Ee(o)===!0)?(r===!0?d=Array.isArray(n)===!0?n:[]:d=Ee(n)===!0?n:{},u[e]=Qe(a,d,o)):o!==void 0&&(u[e]=o));return u}var Dt=Ne({name:"QEditor",props:{...pt,...Ft,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:t=>t.length===0||t.every(e=>e.length),default(){return[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]}},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:t=>["div","p"].includes(t),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...Ut,"update:modelValue","keydown","click","mouseup","keyup","touchend","focus","blur","dropdownShow","dropdownHide","dropdownBeforeShow","dropdownBeforeHide","linkShow","linkHide"],setup(t,{slots:e,emit:n,attrs:o}){const{proxy:r,vnode:d}=Ce(),{$q:u}=r,c=mt(t,u),{inFullscreen:a,toggleFullscreen:s}=Rt(),f=gt(o,d),v=I(null),m=I(null),b=I(null),H=I(!1),_=C(()=>!t.readonly&&!t.disable);let F,q,U=t.modelValue;document.execCommand("defaultParagraphSeparator",!1,t.paragraphTag),F=window.getComputedStyle(document.body).fontFamily;const V=C(()=>t.toolbarBg?` bg-${t.toolbarBg}`:""),ce=C(()=>{const l=t.toolbarOutline!==!0&&t.toolbarPush!==!0;return{type:"a",flat:l,noWrap:!0,outline:t.toolbarOutline,push:t.toolbarPush,rounded:t.toolbarRounded,dense:!0,color:t.toolbarColor,disable:!_.value,size:"sm"}}),P=C(()=>{const l=u.lang.editor,i=u.iconSet.editor;return{bold:{cmd:"bold",icon:i.bold,tip:l.bold,key:66},italic:{cmd:"italic",icon:i.italic,tip:l.italic,key:73},strike:{cmd:"strikeThrough",icon:i.strikethrough,tip:l.strikethrough,key:83},underline:{cmd:"underline",icon:i.underline,tip:l.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:i.unorderedList,tip:l.unorderedList},ordered:{cmd:"insertOrderedList",icon:i.orderedList,tip:l.orderedList},subscript:{cmd:"subscript",icon:i.subscript,tip:l.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:i.superscript,tip:l.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:g=>g.caret&&!g.caret.can("link"),icon:i.hyperlink,tip:l.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:i.toggleFullscreen,tip:l.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:i.viewSource,tip:l.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:i.quote,tip:l.quote,key:81},left:{cmd:"justifyLeft",icon:i.left,tip:l.left},center:{cmd:"justifyCenter",icon:i.center,tip:l.center},right:{cmd:"justifyRight",icon:i.right,tip:l.right},justify:{cmd:"justifyFull",icon:i.justify,tip:l.justify},print:{type:"no-state",cmd:"print",icon:i.print,tip:l.print,key:80},outdent:{type:"no-state",disable:g=>g.caret&&!g.caret.can("outdent"),cmd:"outdent",icon:i.outdent,tip:l.outdent},indent:{type:"no-state",disable:g=>g.caret&&!g.caret.can("indent"),cmd:"indent",icon:i.indent,tip:l.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:i.removeFormat,tip:l.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:i.hr,tip:l.hr},undo:{type:"no-state",cmd:"undo",icon:i.undo,tip:l.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:i.redo,tip:l.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:i.heading1||i.heading,tip:l.heading1,htmlTip:`<h1 class="q-ma-none">${l.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:i.heading2||i.heading,tip:l.heading2,htmlTip:`<h2 class="q-ma-none">${l.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:i.heading3||i.heading,tip:l.heading3,htmlTip:`<h3 class="q-ma-none">${l.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:i.heading4||i.heading,tip:l.heading4,htmlTip:`<h4 class="q-ma-none">${l.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:i.heading5||i.heading,tip:l.heading5,htmlTip:`<h5 class="q-ma-none">${l.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:i.heading6||i.heading,tip:l.heading6,htmlTip:`<h6 class="q-ma-none">${l.heading6}</h6>`},p:{cmd:"formatBlock",param:t.paragraphTag,icon:i.heading,tip:l.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:i.code,htmlTip:`<code>${l.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:i.size1||i.size,tip:l.size1,htmlTip:`<font size="1">${l.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:i.size2||i.size,tip:l.size2,htmlTip:`<font size="2">${l.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:i.size3||i.size,tip:l.size3,htmlTip:`<font size="3">${l.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:i.size4||i.size,tip:l.size4,htmlTip:`<font size="4">${l.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:i.size5||i.size,tip:l.size5,htmlTip:`<font size="5">${l.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:i.size6||i.size,tip:l.size6,htmlTip:`<font size="6">${l.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:i.size7||i.size,tip:l.size7,htmlTip:`<font size="7">${l.size7}</font>`}}}),G=C(()=>{const l=t.definitions||{},i=t.definitions||t.fonts?Qe(!0,{},P.value,l,Nt(F,u.lang.editor.defaultFont,u.iconSet.editor.font,t.fonts)):P.value;return t.toolbar.map(g=>g.map(w=>{if(w.options)return{type:"dropdown",icon:w.icon,label:w.label,size:"sm",dense:!0,fixedLabel:w.fixedLabel,fixedIcon:w.fixedIcon,highlight:w.highlight,list:w.list,options:w.options.map(Ke=>i[Ke])};const $=i[w];return $?$.type==="no-state"||l[w]&&($.cmd===void 0||P.value[$.cmd]&&P.value[$.cmd].type==="no-state")?$:Object.assign({type:"toggle"},$):{type:"slot",slot:w}}))}),k={$q:u,props:t,slots:e,emit:n,inFullscreen:a,toggleFullscreen:s,runCmd:A,isViewingSource:H,editLinkUrl:b,toolbarBackgroundClass:V,buttonProps:ce,contentRef:m,buttons:G,setContent:T};L(()=>t.modelValue,l=>{U!==l&&(U=l,T(l,!0))}),L(b,l=>{n(`link${l?"Show":"Hide"}`)});const fe=C(()=>t.toolbar&&t.toolbar.length!==0),D=C(()=>{const l={},i=g=>{g.key&&(l[g.key]={cmd:g.cmd,param:g.param})};return G.value.forEach(g=>{g.forEach(w=>{w.options?w.options.forEach(i):i(w)})}),l}),X=C(()=>a.value?t.contentStyle:[{minHeight:t.minHeight,height:t.height,maxHeight:t.maxHeight},t.contentStyle]),Y=C(()=>`q-editor q-editor--${H.value===!0?"source":"default"}`+(t.disable===!0?" disabled":"")+(a.value===!0?" fullscreen column":"")+(t.square===!0?" q-editor--square no-border-radius":"")+(t.flat===!0?" q-editor--flat":"")+(t.dense===!0?" q-editor--dense":"")+(c.value===!0?" q-editor--dark q-dark":"")),pe=C(()=>[t.contentClass,"q-editor__content",{col:a.value,"overflow-auto":a.value||t.maxHeight}]),me=C(()=>t.disable===!0?{"aria-disabled":"true"}:t.readonly===!0?{"aria-readonly":"true"}:{});function ge(){if(m.value!==null){const l=`inner${H.value===!0?"Text":"HTML"}`,i=m.value[l];i!==t.modelValue&&(U=i,n("update:modelValue",i))}}function J(l){if(n("keydown",l),l.ctrlKey!==!0||Ue(l)===!0){S();return}const i=l.keyCode,g=D.value[i];if(g!==void 0){const{cmd:w,param:$}=g;Fe(l),A(w,$,!1)}}function N(l){S(),n("click",l)}function he(l){if(m.value!==null){const{scrollTop:i,scrollHeight:g}=m.value;q=g-i}k.caret.save(),n("blur",l)}function ve(l){ht(()=>{m.value!==null&&q!==void 0&&(m.value.scrollTop=m.value.scrollHeight-q)}),n("focus",l)}function ye(l){const i=v.value;if(i!==null&&i.contains(l.target)===!0&&(l.relatedTarget===null||i.contains(l.relatedTarget)!==!0)){const g=`inner${H.value===!0?"Text":"HTML"}`;k.caret.restorePosition(m.value[g].length),S()}}function Z(l){const i=v.value;i!==null&&i.contains(l.target)===!0&&(l.relatedTarget===null||i.contains(l.relatedTarget)!==!0)&&(k.caret.savePosition(),S())}function ee(){q=void 0}function te(l){k.caret.save()}function T(l,i){if(m.value!==null){i===!0&&k.caret.savePosition();const g=`inner${H.value===!0?"Text":"HTML"}`;m.value[g]=l,i===!0&&(k.caret.restorePosition(m.value[g].length),S())}}function A(l,i,g=!0){R(),k.caret.restore(),k.caret.apply(l,i,()=>{R(),k.caret.save(),g&&S()})}function S(){setTimeout(()=>{b.value=null,r.$forceUpdate()},1)}function R(){vt(()=>{m.value!==null&&m.value.focus({preventScroll:!0})})}function We(){return m.value}return K(()=>{k.caret=r.caret=new $t(m.value,k),T(t.modelValue),S(),document.addEventListener("selectionchange",te)}),ie(()=>{document.removeEventListener("selectionchange",te)}),Object.assign(r,{runCmd:A,refreshToolbar:S,focus:R,getContentEl:We}),()=>{let l;if(fe.value){const i=[y("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+V.value},Et(k))];b.value!==null&&i.push(y("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+V.value},At(k))),l=y("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},i)}return y("div",{ref:v,class:Y.value,style:{height:a.value===!0?"100%":null},...me.value,onFocusin:ye,onFocusout:Z},[l,y("div",{ref:m,style:X.value,class:pe.value,contenteditable:_.value,placeholder:t.placeholder,...f.listeners.value,onInput:ge,onKeydown:J,onClick:N,onBlur:he,onFocus:ve,onMousedown:ee,onTouchstartPassive:ee})])}}});const jt={key:1},oe={__name:"MutiSelector",props:{modelValue:{type:Array,default:()=>[]},options:{type:Array,default:()=>[]}},emits:["update:model-value","onchange"],setup(t,{emit:e}){const n=t,o=I(null),{isOutside:r}=Re(o),d=I([]),u=I(!1);L(()=>r.value,a=>{a&&setTimeout(()=>{r.value?u.value=!1:u.value=!0},3e3)});const c=a=>{e("update:model-value",a),e("onchange",a)};return L(()=>n.modelValue,a=>{d.value=a}),K(()=>{d.value=n.modelValue}),(a,s)=>(x(),z("div",{ref_key:"target",ref:o,style:{width:"100%",height:"100%",padding:"1px"}},[u.value?de("",!0):(x(),z("span",{key:0,onClick:s[0]||(s[0]=f=>u.value=!0)},[(x(!0),z(ae,null,re(d.value,f=>(x(),se(Se,{dense:"",color:"orange","text-color":"white",key:f},{default:h(()=>[Q(ue(f),1)]),_:2},1024))),128))])),u.value?(x(),z("div",jt,[(x(!0),z(ae,null,re(n.options,f=>(x(),se(yt,{class:"checkItem",modelValue:d.value,"onUpdate:modelValue":[s[1]||(s[1]=v=>d.value=v),c],key:f,val:f,label:f,color:"teal",cl:""},null,8,["modelValue","val","label"]))),128))])):de("",!0)],512))}};const Qt={key:1},Wt={style:{display:"flex","flex-direction":"row"}},ne={__name:"MutiInput",props:{modelValue:{type:Array,default:()=>[]},options:{type:Array,default:()=>[]}},emits:["update:model-value","onchange"],setup(t,{emit:e}){const n=t,o=I(null),{isOutside:r}=Re(o),d=I([]),u=I(""),c=I(!1);L(()=>r.value,f=>{f&&setTimeout(()=>{r.value?c.value=!1:c.value=!0},3e3)});const a=()=>{const f=u.value;d.value||(d.value=[]),!(d.value.indexOf(f)>=0)&&(d.value.push(f),u.value=null,e("update:model-value",d.value),e("onchange",d.value))},s=f=>{d.value||(d.value=[]),console.log(f),!(d.value.indexOf(f)<0)&&(d.value=d.value.filter(v=>v!=f),e("update:model-value",d.value),e("onchange",d.value))};return L(()=>n.modelValue,f=>{d.value=f}),K(()=>{d.value=n.modelValue}),(f,v)=>(x(),z("div",{ref_key:"target",ref:o,style:{width:"100%",height:"100%",padding:"1px"}},[c.value?de("",!0):(x(),z("span",{key:0,onClick:v[0]||(v[0]=m=>c.value=!0)},[(x(!0),z(ae,null,re(d.value,m=>(x(),se(Se,{dense:"",color:"orange","text-color":"white",key:m},{default:h(()=>[Q(ue(m),1)]),_:2},1024))),128))])),c.value?(x(),z("div",Qt,[(x(!0),z(ae,null,re(d.value,m=>(x(),se(Se,{dense:"",color:"green","text-color":"white",key:m,removable:"",onRemove:b=>s(m)},{default:h(()=>[Q(ue(m),1)]),_:2},1032,["onRemove"]))),128)),le("div",Wt,[p(M,{outlined:"","model-value":u.value,"onUpdate:modelValue":v[1]||(v[1]=m=>u.value=m),class:"inputText"},null,8,["model-value"]),p(W,{outlined:"",onClick:a},{default:h(()=>[Q("\u6DFB\u52A0")]),_:1})])])):de("",!0)],512))}},Kt={class:"q-pa-md"},Gt={style:{margin:"40px 10px 40px 10px"}},Xt={style:{display:"flex","flex-direction":"row","justify-content":"space-between",width:"100%"}},Yt=["href"],co={__name:"SettingPage",setup(t){const e=Ot(),n=I("search"),o=bt({settingInfo:{},ipAddr:""}),r=async()=>{const{Code:c,Message:a}=await Lt(o.settingInfo);console.log(c,a),c!=200?e.notify({message:`${a}`}):e.notify({message:`${a}`})},d=async()=>{const{data:c}=await _t();console.log(c),o.settingInfo=c},u=async()=>{const{Code:c,Data:a}=await zt();c=="200"&&(o.ipAddr=`http://${a}:10081`)};return K(()=>{d(),u()}),(c,a)=>(x(),z("div",Kt,[p(Ie,{position:"top",offset:[20,20],style:{width:"100%"}},{default:h(()=>[p(Ye,{modelValue:n.value,"onUpdate:modelValue":a[0]||(a[0]=s=>n.value=s),style:{width:"100%"},dense:"","no-caps":"","inline-label":"",class:"shadow-2","active-color":"primary","indicator-color":"primary",align:"justify"},{default:h(()=>[p(be,{name:"search",label:"\u641C\u7D22\u8BBE\u7F6E"}),p(be,{name:"base",label:"\u57FA\u7840\u8BBE\u7F6E"}),p(be,{name:"system",label:"\u7CFB\u7EDF\u8BBE\u7F6E"})]),_:1},8,["modelValue"])]),_:1}),le("div",Gt,[le("div",Xt,[le("a",{href:o.ipAddr},"\u8BBF\u95EE\uFF1A "+ue(o.ipAddr),9,Yt)]),p(kt),p(Xe,{modelValue:n.value,"onUpdate:modelValue":a[19]||(a[19]=s=>n.value=s),animated:""},{default:h(()=>[p(ke,{name:"search"},{default:h(()=>[p(E,{color:"purple-12",label:"Buttons","stack-label":""},{prepend:h(()=>[p(B,{name:"event"})]),control:h(()=>[p(oe,{"model-value":o.settingInfo.Buttons,options:O(Je),onOnchange:a[1]||(a[1]=s=>o.settingInfo.Buttons=s)},null,8,["model-value","options"])]),_:1}),p(E,{color:"purple-12",label:"Dirs","stack-label":""},{prepend:h(()=>[p(B,{name:"event"})]),control:h(()=>[p(oe,{"model-value":o.settingInfo.Dirs,options:o.settingInfo.DirsLib,onOnchange:a[2]||(a[2]=s=>o.settingInfo.Dirs=s)},null,8,["model-value","options"])]),_:1}),p(E,{color:"purple-12",label:"MovieTypes","stack-label":""},{prepend:h(()=>[p(B,{name:"event"})]),control:h(()=>[p(ne,{modelValue:o.settingInfo.MovieTypes,"onUpdate:modelValue":a[3]||(a[3]=s=>o.settingInfo.MovieTypes=s),onOnchange:a[4]||(a[4]=s=>o.settingInfo.MovieTypes=s)},null,8,["modelValue"])]),_:1}),p(E,{color:"purple-12",label:"VideoTypes","stack-label":""},{prepend:h(()=>[p(B,{name:"event"})]),control:h(()=>[p(oe,{"model-value":o.settingInfo.VideoTypes,options:o.settingInfo.Types,onOnchange:a[5]||(a[5]=s=>o.settingInfo.VideoTypes=s)},null,8,["model-value","options"])]),_:1}),p(E,{color:"purple-12",label:"Tags","stack-label":""},{prepend:h(()=>[p(B,{name:"event"})]),control:h(()=>[p(oe,{"model-value":o.settingInfo.Tags,options:o.settingInfo.TagsLib,onOnchange:a[6]||(a[6]=s=>o.settingInfo.Tags=s)},null,8,["model-value","options"])]),_:1})]),_:1}),p(ke,{name:"base"},{default:h(()=>[p(M,{modelValue:o.settingInfo.ControllerHost,"onUpdate:modelValue":a[7]||(a[7]=s=>o.settingInfo.ControllerHost=s),label:"ControllerHost"},null,8,["modelValue"]),p(M,{modelValue:o.settingInfo.ImageHost,"onUpdate:modelValue":a[8]||(a[8]=s=>o.settingInfo.ImageHost=s),label:"ImageHost"},null,8,["modelValue"]),p(M,{modelValue:o.settingInfo.StreamHost,"onUpdate:modelValue":a[9]||(a[9]=s=>o.settingInfo.StreamHost=s),label:"StreamHost"},null,8,["modelValue"]),p(M,{modelValue:o.settingInfo.BaseUrl,"onUpdate:modelValue":a[10]||(a[10]=s=>o.settingInfo.BaseUrl=s),label:"BaseUrl"},null,8,["modelValue"]),p(M,{modelValue:o.settingInfo.OMUrl,"onUpdate:modelValue":a[11]||(a[11]=s=>o.settingInfo.OMUrl=s),label:"OMUrl"},null,8,["modelValue"]),p(E,{color:"purple-12",label:"DirsLib","stack-label":""},{prepend:h(()=>[p(B,{name:"event"})]),control:h(()=>[p(ne,{modelValue:o.settingInfo.DirsLib,"onUpdate:modelValue":a[12]||(a[12]=s=>o.settingInfo.DirsLib=s),onOnchange:a[13]||(a[13]=s=>o.settingInfo.DirsLib=s)},null,8,["modelValue"])]),_:1}),p(E,{color:"purple-12",label:"TagsLib","stack-label":""},{prepend:h(()=>[p(B,{name:"event"})]),control:h(()=>[p(ne,{modelValue:o.settingInfo.TagsLib,"onUpdate:modelValue":a[14]||(a[14]=s=>o.settingInfo.TagsLib=s),onOnchange:a[15]||(a[15]=s=>o.settingInfo.TagsLib=s)},null,8,["modelValue"])]),_:1}),p(E,{color:"purple-12",label:"Types","stack-label":""},{prepend:h(()=>[p(B,{name:"event"})]),control:h(()=>[p(ne,{modelValue:o.settingInfo.Types,"onUpdate:modelValue":a[16]||(a[16]=s=>o.settingInfo.Types=s),onOnchange:a[17]||(a[17]=s=>o.settingInfo.Types=s)},null,8,["modelValue"])]),_:1})]),_:1}),p(ke,{name:"system"},{default:h(()=>[p(Dt,{modelValue:o.settingInfo.SystemHtml,"onUpdate:modelValue":a[18]||(a[18]=s=>o.settingInfo.SystemHtml=s),dense:O(e).screen.lt.md,toolbar:[[{label:O(e).lang.editor.align,icon:O(e).iconSet.editor.align,fixedLabel:!0,list:"only-icons",options:["left","center","right","justify"]},{label:O(e).lang.editor.align,icon:O(e).iconSet.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token","hr","link","custom_btn"],["print","fullscreen"],[{label:O(e).lang.editor.formatting,icon:O(e).iconSet.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:O(e).lang.editor.fontSize,icon:O(e).iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{label:O(e).lang.editor.defaultFont,icon:O(e).iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"],["viewsource"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["modelValue","dense","toolbar"])]),_:1})]),_:1},8,["modelValue"])]),p(Ie,{position:"bottom",offset:[20,20]},{default:h(()=>[p(W,{color:"blue",style:{width:"10rem"},onClick:r},{default:h(()=>[Q("\u63D0\u4EA4")]),_:1})]),_:1})]))}};export{co as default};