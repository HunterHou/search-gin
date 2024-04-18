import{d as Ae,b as Re,Q as Ve,a as te,c as oe,e as P,f as Qe}from"./Setting.0863823f.js";import{Q as de}from"./QPageSticky.13447bd3.js";import{R as Me,H as De,G as y,b6 as je,bd as ge,aP as ce,Q as U,aw as _,r as T,bA as Ke,y as L,bo as Ge,P as F,J as he,bB as fe,L as ve,E as We,N as Je,O as Xe,bC as Ye,c as x,al as Ze,a5 as et,b1 as tt,o as w,m as I,F as D,A as j,a as K,w as h,e as E,t as G,f as W,aK as ot,j as M,h as f,n as O,g as nt,aC as lt,D as S}from"./index.a657d947.js";import{d as it,e as pe,Q as at}from"./QMenu.2f37609b.js";import{u as rt}from"./axios.0b902684.js";import{a as st,b as ut,P as dt}from"./settingAPI.cd6c5769.js";import{Q as ie}from"./use-page-sticky.0c5e1c43.js";import{a as ye}from"./index.c2827aa8.js";function be(t,e){if(e&&t===e)return null;const n=t.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(n)===!0)return t;const o=window.getComputedStyle?window.getComputedStyle(t):t.currentStyle,s=o.display;return s==="block"||s==="table"?t:be(t.parentNode)}function ne(t,e,n){return!t||t===document.body?!1:n===!0&&t===e||(e===document?document.body:e).contains(t.parentNode)}function ke(t,e,n){if(n||(n=document.createRange(),n.selectNode(t),n.setStart(t,0)),e.count===0)n.setEnd(t,e.count);else if(e.count>0)if(t.nodeType===Node.TEXT_NODE)t.textContent.length<e.count?e.count-=t.textContent.length:(n.setEnd(t,e.count),e.count=0);else for(let o=0;e.count!==0&&o<t.childNodes.length;o++)n=ke(t.childNodes[o],e,n);return n}const ct=/^https?:\/\//;class ft{constructor(e,n){this.el=e,this.eVm=n,this._range=null}get selection(){if(this.el){const e=document.getSelection();if(ne(e.anchorNode,this.el,!0)&&ne(e.focusNode,this.el,!0))return e}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length!==0:!1}get range(){const e=this.selection;return e!==null&&e.rangeCount?e.getRangeAt(0):this._range}get parent(){const e=this.range;if(e!==null){const n=e.startContainer;return n.nodeType===document.ELEMENT_NODE?n:n.parentNode}return null}get blockParent(){const e=this.parent;return e!==null?be(e,this.el):null}save(e=this.range){e!==null&&(this._range=e)}restore(e=this._range){const n=document.createRange(),o=document.getSelection();e!==null?(n.setStart(e.startContainer,e.startOffset),n.setEnd(e.endContainer,e.endOffset),o.removeAllRanges(),o.addRange(n)):(o.selectAllChildren(this.el),o.collapseToEnd())}savePosition(){let e=-1,n;const o=document.getSelection(),s=this.el.parentNode;if(o.focusNode&&ne(o.focusNode,s))for(n=o.focusNode,e=o.focusOffset;n&&n!==s;)n!==this.el&&n.previousSibling?(n=n.previousSibling,e+=n.textContent.length):n=n.parentNode;this.savedPos=e}restorePosition(e=0){if(this.savedPos>0&&this.savedPos<e){const n=window.getSelection(),o=ke(this.el,{count:this.savedPos});o&&(o.collapse(!1),n.removeAllRanges(),n.addRange(o))}}hasParent(e,n){const o=n?this.parent:this.blockParent;return o!==null?o.nodeName.toLowerCase()===e.toLowerCase():!1}hasParents(e,n,o=this.parent){return o===null?!1:e.includes(o.nodeName.toLowerCase())===!0?!0:n===!0?this.hasParents(e,n,o.parentNode):!1}is(e,n){if(this.selection===null)return!1;switch(e){case"formatBlock":return n==="DIV"&&this.parent===this.el||this.hasParent(n,n==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(e)===n;case"fontName":const o=document.queryCommandValue(e);return o===`"${n}"`||o===n;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const s=document.queryCommandState(e);return n!==void 0?s===n:s}}getParentAttribute(e){return this.parent!==null?this.parent.getAttribute(e):null}can(e){if(e==="outdent")return this.hasParents(["blockquote","li"],!0);if(e==="indent")return this.hasParents(["li"],!0);if(e==="link")return this.selection!==null||this.is("link")}apply(e,n,o=Me){if(e==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(n)&&this.is(e,n)&&(e="outdent",n=null),n==="PRE"&&this.is(e,"PRE")&&(n="P");else if(e==="print"){o();const s=window.open();s.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),s.print(),s.close();return}else if(e==="link"){const s=this.getParentAttribute("href");if(s===null){const d=this.selectWord(this.selection),u=d?d.toString():"";if(!u.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=ct.test(u)?u:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(d.getRangeAt(0))}else this.eVm.editLinkUrl.value=s,this.range.selectNodeContents(this.parent),this.save();return}else if(e==="fullscreen"){this.eVm.toggleFullscreen(),o();return}else if(e==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),o();return}document.execCommand(e,!1,n),o()}selectWord(e){if(e===null||e.isCollapsed!==!0||e.modify===void 0)return e;const n=document.createRange();n.setStart(e.anchorNode,e.anchorOffset),n.setEnd(e.focusNode,e.focusOffset);const o=n.collapsed?["backward","forward"]:["forward","backward"];n.detach();const s=e.focusNode,d=e.focusOffset;return e.collapse(e.anchorNode,e.anchorOffset),e.modify("move",o[0],"character"),e.modify("move",o[1],"word"),e.extend(s,d),e.modify("extend",o[1],"character"),e.modify("extend",o[0],"word"),e}}function we(t,e,n){e.handler?e.handler(t,n,n.caret):n.runCmd(e.cmd,e.param)}function ae(t){return y("div",{class:"q-editor__toolbar-group"},t)}function Ce(t,e,n,o=!1){const s=o||(e.type==="toggle"?e.toggled?e.toggled(t):e.cmd&&t.caret.is(e.cmd,e.param):!1),d=[];if(e.tip&&t.$q.platform.is.desktop){const u=e.key?y("div",[y("small",`(CTRL + ${String.fromCharCode(e.key)})`)]):null;d.push(y(it,{delay:1e3},()=>[y("div",{innerHTML:e.tip}),u]))}return y(U,{...t.buttonProps.value,icon:e.icon!==null?e.icon:void 0,color:s?e.toggleColor||t.props.toolbarToggleColor:e.color||t.props.toolbarColor,textColor:s&&!t.props.toolbarPush?null:e.textColor||t.props.toolbarTextColor,label:e.label,disable:e.disable?typeof e.disable=="function"?e.disable(t):!0:!1,size:"sm",onClick(u){n&&n(),we(u,e,t)}},()=>d)}function pt(t,e){const n=e.list==="only-icons";let o=e.label,s=e.icon!==null?e.icon:void 0,d,u;function p(){r.component.proxy.hide()}if(n)u=e.options.map(c=>{const v=c.type===void 0?t.caret.is(c.cmd,c.param):!1;return v&&(o=c.tip,s=c.icon!==null?c.icon:void 0),Ce(t,c,p,v)}),d=t.toolbarBackgroundClass.value,u=[ae(u)];else{const c=t.props.toolbarToggleColor!==void 0?`text-${t.props.toolbarToggleColor}`:null,v=t.props.toolbarTextColor!==void 0?`text-${t.props.toolbarTextColor}`:null,m=e.list==="no-icons";u=e.options.map(b=>{const $=b.disable?b.disable(t):!1,q=b.type===void 0?t.caret.is(b.cmd,b.param):!1;q&&(o=b.tip,s=b.icon!==null?b.icon:void 0);const A=b.htmlTip;return y(at,{active:q,activeClass:c,clickable:!0,disable:$,dense:!0,onClick(H){p(),t.contentRef.value!==null&&t.contentRef.value.focus(),t.caret.restore(),we(H,b,t)}},()=>[m===!0?null:y(pe,{class:q?c:v,side:!0},()=>y(_,{name:b.icon!==null?b.icon:void 0})),y(pe,A?()=>y("div",{class:"text-no-wrap",innerHTML:b.htmlTip}):b.tip?()=>y("div",{class:"text-no-wrap"},b.tip):void 0)])}),d=[t.toolbarBackgroundClass.value,v]}const a=e.highlight&&o!==e.label,r=y(Ae,{...t.buttonProps.value,noCaps:!0,noWrap:!0,color:a?t.props.toolbarToggleColor:t.props.toolbarColor,textColor:a&&!t.props.toolbarPush?null:t.props.toolbarTextColor,label:e.fixedLabel?e.label:o,icon:e.fixedIcon?e.icon!==null?e.icon:void 0:s,contentClass:d,onShow:c=>t.emit("dropdownShow",c),onHide:c=>t.emit("dropdownHide",c),onBeforeShow:c=>t.emit("dropdownBeforeShow",c),onBeforeHide:c=>t.emit("dropdownBeforeHide",c)},()=>u);return r}function mt(t){if(t.caret)return t.buttons.value.filter(e=>!t.isViewingSource.value||e.find(n=>n.cmd==="viewsource")).map(e=>ae(e.map(n=>t.isViewingSource.value&&n.cmd!=="viewsource"?!1:n.type==="slot"?De(t.slots[n.slot]):n.type==="dropdown"?pt(t,n):Ce(t,n))))}function gt(t,e,n,o={}){const s=Object.keys(o);if(s.length===0)return{};const d={default_font:{cmd:"fontName",param:t,icon:n,tip:e}};return s.forEach(u=>{const p=o[u];d[u]={cmd:"fontName",param:p,icon:n,tip:p,htmlTip:`<font face="${p}">${p}</font>`}}),d}function ht(t){if(t.caret){const e=t.props.toolbarColor||t.props.toolbarTextColor;let n=t.editLinkUrl.value;const o=()=>{t.caret.restore(),n!==t.editLinkUrl.value&&document.execCommand("createLink",!1,n===""?" ":n),t.editLinkUrl.value=null};return[y("div",{class:`q-mx-xs text-${e}`},`${t.$q.lang.editor.url}: `),y("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:n,onInput:s=>{je(s),n=s.target.value},onKeydown:s=>{if(ge(s)!==!0)switch(s.keyCode){case 13:return ce(s),o();case 27:ce(s),t.caret.restore(),(!t.editLinkUrl.value||t.editLinkUrl.value==="https://")&&document.execCommand("unlink"),t.editLinkUrl.value=null;break}}}),ae([y(U,{key:"qedt_btm_rem",tabindex:-1,...t.buttonProps.value,label:t.$q.lang.label.remove,noCaps:!0,onClick:()=>{t.caret.restore(),document.execCommand("unlink"),t.editLinkUrl.value=null}}),y(U,{key:"qedt_btm_upd",...t.buttonProps.value,label:t.$q.lang.label.update,noCaps:!0,onClick:o})])]}}let N=0;const vt={fullscreen:Boolean,noRouteFullscreenExit:Boolean},yt=["update:fullscreen","fullscreen"];function bt(){const t=ve(),{props:e,emit:n,proxy:o}=t;let s,d,u;const p=T(!1);Ke(t)===!0&&L(()=>o.$route.fullPath,()=>{e.noRouteFullscreenExit!==!0&&c()}),L(()=>e.fullscreen,v=>{p.value!==v&&a()}),L(p,v=>{n("update:fullscreen",v),n("fullscreen",v)});function a(){p.value===!0?c():r()}function r(){p.value!==!0&&(p.value=!0,u=o.$el.parentNode,u.replaceChild(d,o.$el),document.body.appendChild(o.$el),N++,N===1&&document.body.classList.add("q-body--fullscreen-mixin"),s={handler:c},fe.add(s))}function c(){p.value===!0&&(s!==void 0&&(fe.remove(s),s=void 0),u.replaceChild(o.$el,d),p.value=!1,N=Math.max(0,N-1),N===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),o.$el.scrollIntoView!==void 0&&setTimeout(()=>{o.$el.scrollIntoView()})))}return Ge(()=>{d=document.createElement("span")}),F(()=>{e.fullscreen===!0&&r()}),he(c),Object.assign(o,{toggleFullscreen:a,setFullscreen:r,exitFullscreen:c}),{inFullscreen:p,toggleFullscreen:a}}const kt=Object.prototype.toString,le=Object.prototype.hasOwnProperty,wt=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(t=>"[object "+t+"]"));function me(t){if(t!==Object(t)||wt.has(kt.call(t))===!0||t.constructor&&le.call(t,"constructor")===!1&&le.call(t.constructor.prototype,"isPrototypeOf")===!1)return!1;let e;for(e in t);return e===void 0||le.call(t,e)}function Te(){let t,e,n,o,s,d,u=arguments[0]||{},p=1,a=!1;const r=arguments.length;for(typeof u=="boolean"&&(a=u,u=arguments[1]||{},p=2),Object(u)!==u&&typeof u!="function"&&(u={}),r===p&&(u=this,p--);p<r;p++)if((t=arguments[p])!==null)for(e in t)n=u[e],o=t[e],u!==o&&(a===!0&&o&&((s=Array.isArray(o))||me(o)===!0)?(s===!0?d=Array.isArray(n)===!0?n:[]:d=me(n)===!0?n:{},u[e]=Te(a,d,o)):o!==void 0&&(u[e]=o));return u}var Ct=We({name:"QEditor",props:{...Je,...vt,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:t=>t.length===0||t.every(e=>e.length),default(){return[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]}},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:t=>["div","p"].includes(t),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...yt,"update:modelValue","keydown","click","mouseup","keyup","touchend","focus","blur","dropdownShow","dropdownHide","dropdownBeforeShow","dropdownBeforeHide","linkShow","linkHide"],setup(t,{slots:e,emit:n,attrs:o}){const{proxy:s,vnode:d}=ve(),{$q:u}=s,p=Xe(t,u),{inFullscreen:a,toggleFullscreen:r}=bt(),c=Ye(o,d),v=T(null),m=T(null),b=T(null),$=T(!1),q=x(()=>!t.readonly&&!t.disable);let A,H,J=t.modelValue;document.execCommand("defaultParagraphSeparator",!1,t.paragraphTag),A=window.getComputedStyle(document.body).fontFamily;const X=x(()=>t.toolbarBg?` bg-${t.toolbarBg}`:""),Se=x(()=>{const l=t.toolbarOutline!==!0&&t.toolbarPush!==!0;return{type:"a",flat:l,noWrap:!0,outline:t.toolbarOutline,push:t.toolbarPush,rounded:t.toolbarRounded,dense:!0,color:t.toolbarColor,disable:!q.value,size:"sm"}}),R=x(()=>{const l=u.lang.editor,i=u.iconSet.editor;return{bold:{cmd:"bold",icon:i.bold,tip:l.bold,key:66},italic:{cmd:"italic",icon:i.italic,tip:l.italic,key:73},strike:{cmd:"strikeThrough",icon:i.strikethrough,tip:l.strikethrough,key:83},underline:{cmd:"underline",icon:i.underline,tip:l.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:i.unorderedList,tip:l.unorderedList},ordered:{cmd:"insertOrderedList",icon:i.orderedList,tip:l.orderedList},subscript:{cmd:"subscript",icon:i.subscript,tip:l.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:i.superscript,tip:l.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:g=>g.caret&&!g.caret.can("link"),icon:i.hyperlink,tip:l.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:i.toggleFullscreen,tip:l.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:i.viewSource,tip:l.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:i.quote,tip:l.quote,key:81},left:{cmd:"justifyLeft",icon:i.left,tip:l.left},center:{cmd:"justifyCenter",icon:i.center,tip:l.center},right:{cmd:"justifyRight",icon:i.right,tip:l.right},justify:{cmd:"justifyFull",icon:i.justify,tip:l.justify},print:{type:"no-state",cmd:"print",icon:i.print,tip:l.print,key:80},outdent:{type:"no-state",disable:g=>g.caret&&!g.caret.can("outdent"),cmd:"outdent",icon:i.outdent,tip:l.outdent},indent:{type:"no-state",disable:g=>g.caret&&!g.caret.can("indent"),cmd:"indent",icon:i.indent,tip:l.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:i.removeFormat,tip:l.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:i.hr,tip:l.hr},undo:{type:"no-state",cmd:"undo",icon:i.undo,tip:l.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:i.redo,tip:l.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:i.heading1||i.heading,tip:l.heading1,htmlTip:`<h1 class="q-ma-none">${l.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:i.heading2||i.heading,tip:l.heading2,htmlTip:`<h2 class="q-ma-none">${l.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:i.heading3||i.heading,tip:l.heading3,htmlTip:`<h3 class="q-ma-none">${l.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:i.heading4||i.heading,tip:l.heading4,htmlTip:`<h4 class="q-ma-none">${l.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:i.heading5||i.heading,tip:l.heading5,htmlTip:`<h5 class="q-ma-none">${l.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:i.heading6||i.heading,tip:l.heading6,htmlTip:`<h6 class="q-ma-none">${l.heading6}</h6>`},p:{cmd:"formatBlock",param:t.paragraphTag,icon:i.heading,tip:l.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:i.code,htmlTip:`<code>${l.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:i.size1||i.size,tip:l.size1,htmlTip:`<font size="1">${l.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:i.size2||i.size,tip:l.size2,htmlTip:`<font size="2">${l.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:i.size3||i.size,tip:l.size3,htmlTip:`<font size="3">${l.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:i.size4||i.size,tip:l.size4,htmlTip:`<font size="4">${l.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:i.size5||i.size,tip:l.size5,htmlTip:`<font size="5">${l.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:i.size6||i.size,tip:l.size6,htmlTip:`<font size="6">${l.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:i.size7||i.size,tip:l.size7,htmlTip:`<font size="7">${l.size7}</font>`}}}),re=x(()=>{const l=t.definitions||{},i=t.definitions||t.fonts?Te(!0,{},R.value,l,gt(A,u.lang.editor.defaultFont,u.iconSet.editor.font,t.fonts)):R.value;return t.toolbar.map(g=>g.map(k=>{if(k.options)return{type:"dropdown",icon:k.icon,label:k.label,size:"sm",dense:!0,fixedLabel:k.fixedLabel,fixedIcon:k.fixedIcon,highlight:k.highlight,list:k.list,options:k.options.map(Fe=>i[Fe])};const z=i[k];return z?z.type==="no-state"||l[k]&&(z.cmd===void 0||R.value[z.cmd]&&R.value[z.cmd].type==="no-state")?z:Object.assign({type:"toggle"},z):{type:"slot",slot:k}}))}),C={$q:u,props:t,slots:e,emit:n,inFullscreen:a,toggleFullscreen:r,runCmd:Z,isViewingSource:$,editLinkUrl:b,toolbarBackgroundClass:X,buttonProps:Se,contentRef:m,buttons:re,setContent:Y};L(()=>t.modelValue,l=>{J!==l&&(J=l,Y(l,!0))}),L(b,l=>{n(`link${l?"Show":"Hide"}`)});const xe=x(()=>t.toolbar&&t.toolbar.length!==0),Ie=x(()=>{const l={},i=g=>{g.key&&(l[g.key]={cmd:g.cmd,param:g.param})};return re.value.forEach(g=>{g.forEach(k=>{k.options?k.options.forEach(i):i(k)})}),l}),ze=x(()=>a.value?t.contentStyle:[{minHeight:t.minHeight,height:t.height,maxHeight:t.maxHeight},t.contentStyle]),_e=x(()=>`q-editor q-editor--${$.value===!0?"source":"default"}`+(t.disable===!0?" disabled":"")+(a.value===!0?" fullscreen column":"")+(t.square===!0?" q-editor--square no-border-radius":"")+(t.flat===!0?" q-editor--flat":"")+(t.dense===!0?" q-editor--dense":"")+(p.value===!0?" q-editor--dark q-dark":"")),Le=x(()=>[t.contentClass,"q-editor__content",{col:a.value,"overflow-auto":a.value||t.maxHeight}]),Be=x(()=>t.disable===!0?{"aria-disabled":"true"}:t.readonly===!0?{"aria-readonly":"true"}:{});function Pe(){if(m.value!==null){const l=`inner${$.value===!0?"Text":"HTML"}`,i=m.value[l];i!==t.modelValue&&(J=i,n("update:modelValue",i))}}function $e(l){if(n("keydown",l),l.ctrlKey!==!0||ge(l)===!0){B();return}const i=l.keyCode,g=Ie.value[i];if(g!==void 0){const{cmd:k,param:z}=g;Ze(l),Z(k,z,!1)}}function Oe(l){B(),n("click",l)}function qe(l){if(m.value!==null){const{scrollTop:i,scrollHeight:g}=m.value;H=g-i}C.caret.save(),n("blur",l)}function He(l){et(()=>{m.value!==null&&H!==void 0&&(m.value.scrollTop=m.value.scrollHeight-H)}),n("focus",l)}function Ne(l){const i=v.value;if(i!==null&&i.contains(l.target)===!0&&(l.relatedTarget===null||i.contains(l.relatedTarget)!==!0)){const g=`inner${$.value===!0?"Text":"HTML"}`;C.caret.restorePosition(m.value[g].length),B()}}function Ee(l){const i=v.value;i!==null&&i.contains(l.target)===!0&&(l.relatedTarget===null||i.contains(l.relatedTarget)!==!0)&&(C.caret.savePosition(),B())}function se(){H=void 0}function ue(l){C.caret.save()}function Y(l,i){if(m.value!==null){i===!0&&C.caret.savePosition();const g=`inner${$.value===!0?"Text":"HTML"}`;m.value[g]=l,i===!0&&(C.caret.restorePosition(m.value[g].length),B())}}function Z(l,i,g=!0){ee(),C.caret.restore(),C.caret.apply(l,i,()=>{ee(),C.caret.save(),g&&B()})}function B(){setTimeout(()=>{b.value=null,s.$forceUpdate()},1)}function ee(){tt(()=>{m.value!==null&&m.value.focus({preventScroll:!0})})}function Ue(){return m.value}return F(()=>{C.caret=s.caret=new ft(m.value,C),Y(t.modelValue),B(),document.addEventListener("selectionchange",ue)}),he(()=>{document.removeEventListener("selectionchange",ue)}),Object.assign(s,{runCmd:Z,refreshToolbar:B,focus:ee,getContentEl:Ue}),()=>{let l;if(xe.value){const i=[y("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+X.value},mt(C))];b.value!==null&&i.push(y("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+X.value},ht(C))),l=y("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},i)}return y("div",{ref:v,class:_e.value,style:{height:a.value===!0?"100%":null},...Be.value,onFocusin:Ne,onFocusout:Ee},[l,y("div",{ref:m,style:ze.value,class:Le.value,contenteditable:q.value,placeholder:t.placeholder,...c.listeners.value,onInput:Pe,onKeydown:$e,onClick:Oe,onBlur:qe,onFocus:He,onMousedown:se,onTouchstartPassive:se})])}}});const Tt={key:1},V={__name:"MutiSelector",props:{modelValue:{type:Array,default:()=>[]},options:{type:Array,default:()=>[]}},emits:["update:model-value","onchange"],setup(t,{emit:e}){const n=t,o=T(null),{isOutside:s}=ye(o),d=T([]),u=T(!1);L(()=>s.value,a=>{a&&setTimeout(()=>{s.value?u.value=!1:u.value=!0},3e3)});const p=a=>{e("update:model-value",a),e("onchange",a)};return L(()=>n.modelValue,a=>{d.value=a}),F(()=>{d.value=n.modelValue}),(a,r)=>(w(),I("div",{ref_key:"target",ref:o,style:{width:"100%",height:"100%",padding:"1px"}},[u.value?W("",!0):(w(),I("span",{key:0,onClick:r[0]||(r[0]=c=>u.value=!0)},[(w(!0),I(D,null,j(d.value,c=>(w(),K(ie,{dense:"",color:"orange","text-color":"white",key:c},{default:h(()=>[E(G(c),1)]),_:2},1024))),128))])),u.value?(w(),I("div",Tt,[(w(!0),I(D,null,j(n.options,c=>(w(),K(ot,{class:"checkItem",modelValue:d.value,"onUpdate:modelValue":[r[1]||(r[1]=v=>d.value=v),p],key:c,val:c,label:c,color:"teal",cl:""},null,8,["modelValue","val","label"]))),128))])):W("",!0)],512))}};const St={key:1},xt={style:{display:"flex","flex-direction":"row"}},Q={__name:"MutiInput",props:{modelValue:{type:Array,default:()=>[]},options:{type:Array,default:()=>[]}},emits:["update:model-value","onchange"],setup(t,{emit:e}){const n=t,o=T(null),{isOutside:s}=ye(o),d=T([]),u=T(""),p=T(!1);L(()=>s.value,c=>{c&&setTimeout(()=>{s.value?p.value=!1:p.value=!0},3e3)});const a=()=>{const c=u.value;d.value||(d.value=[]),!(d.value.indexOf(c)>=0)&&(d.value.push(c),u.value=null,e("update:model-value",d.value),e("onchange",d.value))},r=c=>{d.value||(d.value=[]),console.log(c),!(d.value.indexOf(c)<0)&&(d.value=d.value.filter(v=>v!=c),e("update:model-value",d.value),e("onchange",d.value))};return L(()=>n.modelValue,c=>{d.value=c}),F(()=>{d.value=n.modelValue}),(c,v)=>(w(),I("div",{ref_key:"target",ref:o,style:{width:"100%",height:"100%",padding:"1px"}},[p.value?W("",!0):(w(),I("span",{key:0,onClick:v[0]||(v[0]=m=>p.value=!0)},[(w(!0),I(D,null,j(d.value,m=>(w(),K(ie,{dense:"",color:"orange","text-color":"white",key:m},{default:h(()=>[E(G(m),1)]),_:2},1024))),128))])),p.value?(w(),I("div",St,[(w(!0),I(D,null,j(d.value,m=>(w(),K(ie,{dense:"",color:"green","text-color":"white",key:m,removable:"",onRemove:b=>r(m)},{default:h(()=>[E(G(m),1)]),_:2},1032,["onRemove"]))),128)),M("div",xt,[f(O,{outlined:"","model-value":u.value,"onUpdate:modelValue":v[1]||(v[1]=m=>u.value=m),class:"inputText"},null,8,["model-value"]),f(U,{outlined:"",onClick:a},{default:h(()=>[E("\u6DFB\u52A0")]),_:1})])])):W("",!0)],512))}},It={class:"q-pa-md"},zt={style:{margin:"40px 10px 40px 10px"}},_t={style:{display:"flex","flex-direction":"row","justify-content":"space-between",width:"100%"}},Lt=["href"],Ut={__name:"SettingPage",setup(t){const e=rt(),n=T("search"),o=nt({settingInfo:{},ipAddr:""}),s=async()=>{const{Code:p,Message:a}=await dt(o.settingInfo);console.log(p,a),p!=200?e.notify({message:`${a}`}):e.notify({message:`${a}`})},d=async()=>{const{data:p}=await st();console.log(p),o.settingInfo=p},u=async()=>{const{Code:p,Data:a}=await ut();p=="200"&&(o.ipAddr=`http://${a}:10081`)};return F(()=>{document.title="\u8BBE\u7F6E",d(),u()}),(p,a)=>(w(),I("div",It,[f(de,{position:"top",offset:[20,20],style:{width:"100%"}},{default:h(()=>[f(Ve,{modelValue:n.value,"onUpdate:modelValue":a[0]||(a[0]=r=>n.value=r),style:{width:"100%"},dense:"","no-caps":"","inline-label":"",class:"shadow-2","active-color":"primary","indicator-color":"primary",align:"justify"},{default:h(()=>[f(te,{name:"search",label:"\u641C\u7D22\u8BBE\u7F6E"}),f(te,{name:"base",label:"\u57FA\u7840\u8BBE\u7F6E"}),f(te,{name:"system",label:"\u7CFB\u7EDF\u8BBE\u7F6E"})]),_:1},8,["modelValue"])]),_:1}),M("div",zt,[M("div",_t,[M("a",{href:o.ipAddr},"\u8BBF\u95EE\uFF1A "+G(o.ipAddr),9,Lt)]),f(lt),f(Re,{modelValue:n.value,"onUpdate:modelValue":a[20]||(a[20]=r=>n.value=r),animated:""},{default:h(()=>[f(oe,{name:"search"},{default:h(()=>[f(P,{color:"purple-12",label:"Buttons","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(V,{"model-value":o.settingInfo.Buttons,options:S(Qe),onOnchange:a[1]||(a[1]=r=>o.settingInfo.Buttons=r)},null,8,["model-value","options"])]),_:1}),f(P,{color:"purple-12",label:"Dirs","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(V,{"model-value":o.settingInfo.Dirs,options:o.settingInfo.DirsLib,onOnchange:a[2]||(a[2]=r=>o.settingInfo.Dirs=r)},null,8,["model-value","options"])]),_:1}),f(P,{color:"purple-12",label:"MovieTypes","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(Q,{modelValue:o.settingInfo.MovieTypes,"onUpdate:modelValue":a[3]||(a[3]=r=>o.settingInfo.MovieTypes=r),onOnchange:a[4]||(a[4]=r=>o.settingInfo.MovieTypes=r)},null,8,["modelValue"])]),_:1}),f(P,{color:"purple-12",label:"VideoTypes","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(V,{"model-value":o.settingInfo.VideoTypes,options:o.settingInfo.Types,onOnchange:a[5]||(a[5]=r=>o.settingInfo.VideoTypes=r)},null,8,["model-value","options"])]),_:1}),f(P,{color:"purple-12",label:"Tags","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(V,{"model-value":o.settingInfo.Tags,options:o.settingInfo.TagsLib,onOnchange:a[6]||(a[6]=r=>o.settingInfo.Tags=r)},null,8,["model-value","options"])]),_:1})]),_:1}),f(oe,{name:"base"},{default:h(()=>[f(O,{modelValue:o.settingInfo.ControllerHost,"onUpdate:modelValue":a[7]||(a[7]=r=>o.settingInfo.ControllerHost=r),label:"ControllerHost"},null,8,["modelValue"]),f(O,{modelValue:o.settingInfo.ImageHost,"onUpdate:modelValue":a[8]||(a[8]=r=>o.settingInfo.ImageHost=r),label:"ImageHost"},null,8,["modelValue"]),f(O,{modelValue:o.settingInfo.StreamHost,"onUpdate:modelValue":a[9]||(a[9]=r=>o.settingInfo.StreamHost=r),label:"StreamHost"},null,8,["modelValue"]),f(O,{modelValue:o.settingInfo.BaseUrl,"onUpdate:modelValue":a[10]||(a[10]=r=>o.settingInfo.BaseUrl=r),label:"BaseUrl"},null,8,["modelValue"]),f(O,{modelValue:o.settingInfo.ImageUrl,"onUpdate:modelValue":a[11]||(a[11]=r=>o.settingInfo.ImageUrl=r),label:"ImageUrl"},null,8,["modelValue"]),f(O,{modelValue:o.settingInfo.OMUrl,"onUpdate:modelValue":a[12]||(a[12]=r=>o.settingInfo.OMUrl=r),label:"OMUrl"},null,8,["modelValue"]),f(P,{color:"purple-12",label:"DirsLib","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(Q,{modelValue:o.settingInfo.DirsLib,"onUpdate:modelValue":a[13]||(a[13]=r=>o.settingInfo.DirsLib=r),onOnchange:a[14]||(a[14]=r=>o.settingInfo.DirsLib=r)},null,8,["modelValue"])]),_:1}),f(P,{color:"purple-12",label:"TagsLib","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(Q,{modelValue:o.settingInfo.TagsLib,"onUpdate:modelValue":a[15]||(a[15]=r=>o.settingInfo.TagsLib=r),onOnchange:a[16]||(a[16]=r=>o.settingInfo.TagsLib=r)},null,8,["modelValue"])]),_:1}),f(P,{color:"purple-12",label:"Types","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(Q,{modelValue:o.settingInfo.Types,"onUpdate:modelValue":a[17]||(a[17]=r=>o.settingInfo.Types=r),onOnchange:a[18]||(a[18]=r=>o.settingInfo.Types=r)},null,8,["modelValue"])]),_:1})]),_:1}),f(oe,{name:"system"},{default:h(()=>[f(Ct,{modelValue:o.settingInfo.SystemHtml,"onUpdate:modelValue":a[19]||(a[19]=r=>o.settingInfo.SystemHtml=r),dense:S(e).screen.lt.md,toolbar:[[{label:S(e).lang.editor.align,icon:S(e).iconSet.editor.align,fixedLabel:!0,list:"only-icons",options:["left","center","right","justify"]},{label:S(e).lang.editor.align,icon:S(e).iconSet.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token","hr","link","custom_btn"],["print","fullscreen"],[{label:S(e).lang.editor.formatting,icon:S(e).iconSet.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:S(e).lang.editor.fontSize,icon:S(e).iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{label:S(e).lang.editor.defaultFont,icon:S(e).iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"],["viewsource"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["modelValue","dense","toolbar"])]),_:1})]),_:1},8,["modelValue"])]),f(de,{position:"bottom",offset:[20,20]},{default:h(()=>[f(U,{color:"blue",style:{width:"10rem"},onClick:s},{default:h(()=>[E("\u63D0\u4EA4")]),_:1})]),_:1})]))}};export{Ut as default};
