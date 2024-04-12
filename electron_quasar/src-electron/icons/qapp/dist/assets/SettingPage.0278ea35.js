import{d as Ae,b as Re,Q as Ve,a as te,c as oe,e as P,f as Qe}from"./Setting.0b121489.js";import{Q as de}from"./QPageSticky.a518bece.js";import{R as Me,H as De,G as y,b6 as je,bd as ge,aP as ce,Q as F,aw as _,r as T,bz as Ke,y as L,bm as Ge,P as U,J as he,bA as fe,L as ve,E as We,N as Je,O as Xe,bB as Ye,c as x,al as Ze,a5 as et,b1 as tt,o as w,m as I,F as D,B as j,a as K,w as h,g as E,t as G,f as W,aK as ot,j as M,e as f,n as H,h as nt,aC as lt,A as S}from"./index.b79f9052.js";import{e as it,a as pe,Q as at}from"./QMenu.c03b1df6.js";import{u as rt}from"./axios.a9d686d1.js";import{a as st,b as ut,P as dt}from"./settingAPI.7d65be4a.js";import{Q as ie}from"./use-page-sticky.61e13b79.js";import{a as ye}from"./index.21c409de.js";function be(t,e){if(e&&t===e)return null;const o=t.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(o)===!0)return t;const n=window.getComputedStyle?window.getComputedStyle(t):t.currentStyle,s=n.display;return s==="block"||s==="table"?t:be(t.parentNode)}function ne(t,e,o){return!t||t===document.body?!1:o===!0&&t===e||(e===document?document.body:e).contains(t.parentNode)}function ke(t,e,o){if(o||(o=document.createRange(),o.selectNode(t),o.setStart(t,0)),e.count===0)o.setEnd(t,e.count);else if(e.count>0)if(t.nodeType===Node.TEXT_NODE)t.textContent.length<e.count?e.count-=t.textContent.length:(o.setEnd(t,e.count),e.count=0);else for(let n=0;e.count!==0&&n<t.childNodes.length;n++)o=ke(t.childNodes[n],e,o);return o}const ct=/^https?:\/\//;class ft{constructor(e,o){this.el=e,this.eVm=o,this._range=null}get selection(){if(this.el){const e=document.getSelection();if(ne(e.anchorNode,this.el,!0)&&ne(e.focusNode,this.el,!0))return e}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length!==0:!1}get range(){const e=this.selection;return e!==null&&e.rangeCount?e.getRangeAt(0):this._range}get parent(){const e=this.range;if(e!==null){const o=e.startContainer;return o.nodeType===document.ELEMENT_NODE?o:o.parentNode}return null}get blockParent(){const e=this.parent;return e!==null?be(e,this.el):null}save(e=this.range){e!==null&&(this._range=e)}restore(e=this._range){const o=document.createRange(),n=document.getSelection();e!==null?(o.setStart(e.startContainer,e.startOffset),o.setEnd(e.endContainer,e.endOffset),n.removeAllRanges(),n.addRange(o)):(n.selectAllChildren(this.el),n.collapseToEnd())}savePosition(){let e=-1,o;const n=document.getSelection(),s=this.el.parentNode;if(n.focusNode&&ne(n.focusNode,s))for(o=n.focusNode,e=n.focusOffset;o&&o!==s;)o!==this.el&&o.previousSibling?(o=o.previousSibling,e+=o.textContent.length):o=o.parentNode;this.savedPos=e}restorePosition(e=0){if(this.savedPos>0&&this.savedPos<e){const o=window.getSelection(),n=ke(this.el,{count:this.savedPos});n&&(n.collapse(!1),o.removeAllRanges(),o.addRange(n))}}hasParent(e,o){const n=o?this.parent:this.blockParent;return n!==null?n.nodeName.toLowerCase()===e.toLowerCase():!1}hasParents(e,o,n=this.parent){return n===null?!1:e.includes(n.nodeName.toLowerCase())===!0?!0:o===!0?this.hasParents(e,o,n.parentNode):!1}is(e,o){if(this.selection===null)return!1;switch(e){case"formatBlock":return o==="DIV"&&this.parent===this.el||this.hasParent(o,o==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(e)===o;case"fontName":const n=document.queryCommandValue(e);return n===`"${o}"`||n===o;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const s=document.queryCommandState(e);return o!==void 0?s===o:s}}getParentAttribute(e){return this.parent!==null?this.parent.getAttribute(e):null}can(e){if(e==="outdent")return this.hasParents(["blockquote","li"],!0);if(e==="indent")return this.hasParents(["li"],!0);if(e==="link")return this.selection!==null||this.is("link")}apply(e,o,n=Me){if(e==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(o)&&this.is(e,o)&&(e="outdent",o=null),o==="PRE"&&this.is(e,"PRE")&&(o="P");else if(e==="print"){n();const s=window.open();s.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),s.print(),s.close();return}else if(e==="link"){const s=this.getParentAttribute("href");if(s===null){const d=this.selectWord(this.selection),u=d?d.toString():"";if(!u.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=ct.test(u)?u:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(d.getRangeAt(0))}else this.eVm.editLinkUrl.value=s,this.range.selectNodeContents(this.parent),this.save();return}else if(e==="fullscreen"){this.eVm.toggleFullscreen(),n();return}else if(e==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),n();return}document.execCommand(e,!1,o),n()}selectWord(e){if(e===null||e.isCollapsed!==!0||e.modify===void 0)return e;const o=document.createRange();o.setStart(e.anchorNode,e.anchorOffset),o.setEnd(e.focusNode,e.focusOffset);const n=o.collapsed?["backward","forward"]:["forward","backward"];o.detach();const s=e.focusNode,d=e.focusOffset;return e.collapse(e.anchorNode,e.anchorOffset),e.modify("move",n[0],"character"),e.modify("move",n[1],"word"),e.extend(s,d),e.modify("extend",n[1],"character"),e.modify("extend",n[0],"word"),e}}function we(t,e,o){e.handler?e.handler(t,o,o.caret):o.runCmd(e.cmd,e.param)}function ae(t){return y("div",{class:"q-editor__toolbar-group"},t)}function Ce(t,e,o,n=!1){const s=n||(e.type==="toggle"?e.toggled?e.toggled(t):e.cmd&&t.caret.is(e.cmd,e.param):!1),d=[];if(e.tip&&t.$q.platform.is.desktop){const u=e.key?y("div",[y("small",`(CTRL + ${String.fromCharCode(e.key)})`)]):null;d.push(y(it,{delay:1e3},()=>[y("div",{innerHTML:e.tip}),u]))}return y(F,{...t.buttonProps.value,icon:e.icon!==null?e.icon:void 0,color:s?e.toggleColor||t.props.toolbarToggleColor:e.color||t.props.toolbarColor,textColor:s&&!t.props.toolbarPush?null:e.textColor||t.props.toolbarTextColor,label:e.label,disable:e.disable?typeof e.disable=="function"?e.disable(t):!0:!1,size:"sm",onClick(u){o&&o(),we(u,e,t)}},()=>d)}function pt(t,e){const o=e.list==="only-icons";let n=e.label,s=e.icon!==null?e.icon:void 0,d,u;function p(){r.component.proxy.hide()}if(o)u=e.options.map(c=>{const v=c.type===void 0?t.caret.is(c.cmd,c.param):!1;return v&&(n=c.tip,s=c.icon!==null?c.icon:void 0),Ce(t,c,p,v)}),d=t.toolbarBackgroundClass.value,u=[ae(u)];else{const c=t.props.toolbarToggleColor!==void 0?`text-${t.props.toolbarToggleColor}`:null,v=t.props.toolbarTextColor!==void 0?`text-${t.props.toolbarTextColor}`:null,m=e.list==="no-icons";u=e.options.map(b=>{const $=b.disable?b.disable(t):!1,O=b.type===void 0?t.caret.is(b.cmd,b.param):!1;O&&(n=b.tip,s=b.icon!==null?b.icon:void 0);const A=b.htmlTip;return y(at,{active:O,activeClass:c,clickable:!0,disable:$,dense:!0,onClick(q){p(),t.contentRef.value!==null&&t.contentRef.value.focus(),t.caret.restore(),we(q,b,t)}},()=>[m===!0?null:y(pe,{class:O?c:v,side:!0},()=>y(_,{name:b.icon!==null?b.icon:void 0})),y(pe,A?()=>y("div",{class:"text-no-wrap",innerHTML:b.htmlTip}):b.tip?()=>y("div",{class:"text-no-wrap"},b.tip):void 0)])}),d=[t.toolbarBackgroundClass.value,v]}const a=e.highlight&&n!==e.label,r=y(Ae,{...t.buttonProps.value,noCaps:!0,noWrap:!0,color:a?t.props.toolbarToggleColor:t.props.toolbarColor,textColor:a&&!t.props.toolbarPush?null:t.props.toolbarTextColor,label:e.fixedLabel?e.label:n,icon:e.fixedIcon?e.icon!==null?e.icon:void 0:s,contentClass:d,onShow:c=>t.emit("dropdownShow",c),onHide:c=>t.emit("dropdownHide",c),onBeforeShow:c=>t.emit("dropdownBeforeShow",c),onBeforeHide:c=>t.emit("dropdownBeforeHide",c)},()=>u);return r}function mt(t){if(t.caret)return t.buttons.value.filter(e=>!t.isViewingSource.value||e.find(o=>o.cmd==="viewsource")).map(e=>ae(e.map(o=>t.isViewingSource.value&&o.cmd!=="viewsource"?!1:o.type==="slot"?De(t.slots[o.slot]):o.type==="dropdown"?pt(t,o):Ce(t,o))))}function gt(t,e,o,n={}){const s=Object.keys(n);if(s.length===0)return{};const d={default_font:{cmd:"fontName",param:t,icon:o,tip:e}};return s.forEach(u=>{const p=n[u];d[u]={cmd:"fontName",param:p,icon:o,tip:p,htmlTip:`<font face="${p}">${p}</font>`}}),d}function ht(t){if(t.caret){const e=t.props.toolbarColor||t.props.toolbarTextColor;let o=t.editLinkUrl.value;const n=()=>{t.caret.restore(),o!==t.editLinkUrl.value&&document.execCommand("createLink",!1,o===""?" ":o),t.editLinkUrl.value=null};return[y("div",{class:`q-mx-xs text-${e}`},`${t.$q.lang.editor.url}: `),y("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:o,onInput:s=>{je(s),o=s.target.value},onKeydown:s=>{if(ge(s)!==!0)switch(s.keyCode){case 13:return ce(s),n();case 27:ce(s),t.caret.restore(),(!t.editLinkUrl.value||t.editLinkUrl.value==="https://")&&document.execCommand("unlink"),t.editLinkUrl.value=null;break}}}),ae([y(F,{key:"qedt_btm_rem",tabindex:-1,...t.buttonProps.value,label:t.$q.lang.label.remove,noCaps:!0,onClick:()=>{t.caret.restore(),document.execCommand("unlink"),t.editLinkUrl.value=null}}),y(F,{key:"qedt_btm_upd",...t.buttonProps.value,label:t.$q.lang.label.update,noCaps:!0,onClick:n})])]}}let N=0;const vt={fullscreen:Boolean,noRouteFullscreenExit:Boolean},yt=["update:fullscreen","fullscreen"];function bt(){const t=ve(),{props:e,emit:o,proxy:n}=t;let s,d,u;const p=T(!1);Ke(t)===!0&&L(()=>n.$route.fullPath,()=>{e.noRouteFullscreenExit!==!0&&c()}),L(()=>e.fullscreen,v=>{p.value!==v&&a()}),L(p,v=>{o("update:fullscreen",v),o("fullscreen",v)});function a(){p.value===!0?c():r()}function r(){p.value!==!0&&(p.value=!0,u=n.$el.parentNode,u.replaceChild(d,n.$el),document.body.appendChild(n.$el),N++,N===1&&document.body.classList.add("q-body--fullscreen-mixin"),s={handler:c},fe.add(s))}function c(){p.value===!0&&(s!==void 0&&(fe.remove(s),s=void 0),u.replaceChild(n.$el,d),p.value=!1,N=Math.max(0,N-1),N===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),n.$el.scrollIntoView!==void 0&&setTimeout(()=>{n.$el.scrollIntoView()})))}return Ge(()=>{d=document.createElement("span")}),U(()=>{e.fullscreen===!0&&r()}),he(c),Object.assign(n,{toggleFullscreen:a,setFullscreen:r,exitFullscreen:c}),{inFullscreen:p,toggleFullscreen:a}}const kt=Object.prototype.toString,le=Object.prototype.hasOwnProperty,wt=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(t=>"[object "+t+"]"));function me(t){if(t!==Object(t)||wt.has(kt.call(t))===!0||t.constructor&&le.call(t,"constructor")===!1&&le.call(t.constructor.prototype,"isPrototypeOf")===!1)return!1;let e;for(e in t);return e===void 0||le.call(t,e)}function Te(){let t,e,o,n,s,d,u=arguments[0]||{},p=1,a=!1;const r=arguments.length;for(typeof u=="boolean"&&(a=u,u=arguments[1]||{},p=2),Object(u)!==u&&typeof u!="function"&&(u={}),r===p&&(u=this,p--);p<r;p++)if((t=arguments[p])!==null)for(e in t)o=u[e],n=t[e],u!==n&&(a===!0&&n&&((s=Array.isArray(n))||me(n)===!0)?(s===!0?d=Array.isArray(o)===!0?o:[]:d=me(o)===!0?o:{},u[e]=Te(a,d,n)):n!==void 0&&(u[e]=n));return u}var Ct=We({name:"QEditor",props:{...Je,...vt,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:t=>t.length===0||t.every(e=>e.length),default(){return[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]}},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:t=>["div","p"].includes(t),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...yt,"update:modelValue","keydown","click","mouseup","keyup","touchend","focus","blur","dropdownShow","dropdownHide","dropdownBeforeShow","dropdownBeforeHide","linkShow","linkHide"],setup(t,{slots:e,emit:o,attrs:n}){const{proxy:s,vnode:d}=ve(),{$q:u}=s,p=Xe(t,u),{inFullscreen:a,toggleFullscreen:r}=bt(),c=Ye(n,d),v=T(null),m=T(null),b=T(null),$=T(!1),O=x(()=>!t.readonly&&!t.disable);let A,q,J=t.modelValue;document.execCommand("defaultParagraphSeparator",!1,t.paragraphTag),A=window.getComputedStyle(document.body).fontFamily;const X=x(()=>t.toolbarBg?` bg-${t.toolbarBg}`:""),Se=x(()=>{const l=t.toolbarOutline!==!0&&t.toolbarPush!==!0;return{type:"a",flat:l,noWrap:!0,outline:t.toolbarOutline,push:t.toolbarPush,rounded:t.toolbarRounded,dense:!0,color:t.toolbarColor,disable:!O.value,size:"sm"}}),R=x(()=>{const l=u.lang.editor,i=u.iconSet.editor;return{bold:{cmd:"bold",icon:i.bold,tip:l.bold,key:66},italic:{cmd:"italic",icon:i.italic,tip:l.italic,key:73},strike:{cmd:"strikeThrough",icon:i.strikethrough,tip:l.strikethrough,key:83},underline:{cmd:"underline",icon:i.underline,tip:l.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:i.unorderedList,tip:l.unorderedList},ordered:{cmd:"insertOrderedList",icon:i.orderedList,tip:l.orderedList},subscript:{cmd:"subscript",icon:i.subscript,tip:l.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:i.superscript,tip:l.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:g=>g.caret&&!g.caret.can("link"),icon:i.hyperlink,tip:l.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:i.toggleFullscreen,tip:l.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:i.viewSource,tip:l.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:i.quote,tip:l.quote,key:81},left:{cmd:"justifyLeft",icon:i.left,tip:l.left},center:{cmd:"justifyCenter",icon:i.center,tip:l.center},right:{cmd:"justifyRight",icon:i.right,tip:l.right},justify:{cmd:"justifyFull",icon:i.justify,tip:l.justify},print:{type:"no-state",cmd:"print",icon:i.print,tip:l.print,key:80},outdent:{type:"no-state",disable:g=>g.caret&&!g.caret.can("outdent"),cmd:"outdent",icon:i.outdent,tip:l.outdent},indent:{type:"no-state",disable:g=>g.caret&&!g.caret.can("indent"),cmd:"indent",icon:i.indent,tip:l.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:i.removeFormat,tip:l.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:i.hr,tip:l.hr},undo:{type:"no-state",cmd:"undo",icon:i.undo,tip:l.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:i.redo,tip:l.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:i.heading1||i.heading,tip:l.heading1,htmlTip:`<h1 class="q-ma-none">${l.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:i.heading2||i.heading,tip:l.heading2,htmlTip:`<h2 class="q-ma-none">${l.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:i.heading3||i.heading,tip:l.heading3,htmlTip:`<h3 class="q-ma-none">${l.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:i.heading4||i.heading,tip:l.heading4,htmlTip:`<h4 class="q-ma-none">${l.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:i.heading5||i.heading,tip:l.heading5,htmlTip:`<h5 class="q-ma-none">${l.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:i.heading6||i.heading,tip:l.heading6,htmlTip:`<h6 class="q-ma-none">${l.heading6}</h6>`},p:{cmd:"formatBlock",param:t.paragraphTag,icon:i.heading,tip:l.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:i.code,htmlTip:`<code>${l.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:i.size1||i.size,tip:l.size1,htmlTip:`<font size="1">${l.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:i.size2||i.size,tip:l.size2,htmlTip:`<font size="2">${l.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:i.size3||i.size,tip:l.size3,htmlTip:`<font size="3">${l.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:i.size4||i.size,tip:l.size4,htmlTip:`<font size="4">${l.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:i.size5||i.size,tip:l.size5,htmlTip:`<font size="5">${l.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:i.size6||i.size,tip:l.size6,htmlTip:`<font size="6">${l.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:i.size7||i.size,tip:l.size7,htmlTip:`<font size="7">${l.size7}</font>`}}}),re=x(()=>{const l=t.definitions||{},i=t.definitions||t.fonts?Te(!0,{},R.value,l,gt(A,u.lang.editor.defaultFont,u.iconSet.editor.font,t.fonts)):R.value;return t.toolbar.map(g=>g.map(k=>{if(k.options)return{type:"dropdown",icon:k.icon,label:k.label,size:"sm",dense:!0,fixedLabel:k.fixedLabel,fixedIcon:k.fixedIcon,highlight:k.highlight,list:k.list,options:k.options.map(Ue=>i[Ue])};const z=i[k];return z?z.type==="no-state"||l[k]&&(z.cmd===void 0||R.value[z.cmd]&&R.value[z.cmd].type==="no-state")?z:Object.assign({type:"toggle"},z):{type:"slot",slot:k}}))}),C={$q:u,props:t,slots:e,emit:o,inFullscreen:a,toggleFullscreen:r,runCmd:Z,isViewingSource:$,editLinkUrl:b,toolbarBackgroundClass:X,buttonProps:Se,contentRef:m,buttons:re,setContent:Y};L(()=>t.modelValue,l=>{J!==l&&(J=l,Y(l,!0))}),L(b,l=>{o(`link${l?"Show":"Hide"}`)});const xe=x(()=>t.toolbar&&t.toolbar.length!==0),Ie=x(()=>{const l={},i=g=>{g.key&&(l[g.key]={cmd:g.cmd,param:g.param})};return re.value.forEach(g=>{g.forEach(k=>{k.options?k.options.forEach(i):i(k)})}),l}),ze=x(()=>a.value?t.contentStyle:[{minHeight:t.minHeight,height:t.height,maxHeight:t.maxHeight},t.contentStyle]),_e=x(()=>`q-editor q-editor--${$.value===!0?"source":"default"}`+(t.disable===!0?" disabled":"")+(a.value===!0?" fullscreen column":"")+(t.square===!0?" q-editor--square no-border-radius":"")+(t.flat===!0?" q-editor--flat":"")+(t.dense===!0?" q-editor--dense":"")+(p.value===!0?" q-editor--dark q-dark":"")),Le=x(()=>[t.contentClass,"q-editor__content",{col:a.value,"overflow-auto":a.value||t.maxHeight}]),Be=x(()=>t.disable===!0?{"aria-disabled":"true"}:t.readonly===!0?{"aria-readonly":"true"}:{});function Pe(){if(m.value!==null){const l=`inner${$.value===!0?"Text":"HTML"}`,i=m.value[l];i!==t.modelValue&&(J=i,o("update:modelValue",i))}}function $e(l){if(o("keydown",l),l.ctrlKey!==!0||ge(l)===!0){B();return}const i=l.keyCode,g=Ie.value[i];if(g!==void 0){const{cmd:k,param:z}=g;Ze(l),Z(k,z,!1)}}function Oe(l){B(),o("click",l)}function qe(l){if(m.value!==null){const{scrollTop:i,scrollHeight:g}=m.value;q=g-i}C.caret.save(),o("blur",l)}function He(l){et(()=>{m.value!==null&&q!==void 0&&(m.value.scrollTop=m.value.scrollHeight-q)}),o("focus",l)}function Ne(l){const i=v.value;if(i!==null&&i.contains(l.target)===!0&&(l.relatedTarget===null||i.contains(l.relatedTarget)!==!0)){const g=`inner${$.value===!0?"Text":"HTML"}`;C.caret.restorePosition(m.value[g].length),B()}}function Ee(l){const i=v.value;i!==null&&i.contains(l.target)===!0&&(l.relatedTarget===null||i.contains(l.relatedTarget)!==!0)&&(C.caret.savePosition(),B())}function se(){q=void 0}function ue(l){C.caret.save()}function Y(l,i){if(m.value!==null){i===!0&&C.caret.savePosition();const g=`inner${$.value===!0?"Text":"HTML"}`;m.value[g]=l,i===!0&&(C.caret.restorePosition(m.value[g].length),B())}}function Z(l,i,g=!0){ee(),C.caret.restore(),C.caret.apply(l,i,()=>{ee(),C.caret.save(),g&&B()})}function B(){setTimeout(()=>{b.value=null,s.$forceUpdate()},1)}function ee(){tt(()=>{m.value!==null&&m.value.focus({preventScroll:!0})})}function Fe(){return m.value}return U(()=>{C.caret=s.caret=new ft(m.value,C),Y(t.modelValue),B(),document.addEventListener("selectionchange",ue)}),he(()=>{document.removeEventListener("selectionchange",ue)}),Object.assign(s,{runCmd:Z,refreshToolbar:B,focus:ee,getContentEl:Fe}),()=>{let l;if(xe.value){const i=[y("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+X.value},mt(C))];b.value!==null&&i.push(y("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+X.value},ht(C))),l=y("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},i)}return y("div",{ref:v,class:_e.value,style:{height:a.value===!0?"100%":null},...Be.value,onFocusin:Ne,onFocusout:Ee},[l,y("div",{ref:m,style:ze.value,class:Le.value,contenteditable:O.value,placeholder:t.placeholder,...c.listeners.value,onInput:Pe,onKeydown:$e,onClick:Oe,onBlur:qe,onFocus:He,onMousedown:se,onTouchstartPassive:se})])}}});const Tt={key:1},V={__name:"MutiSelector",props:{modelValue:{type:Array,default:()=>[]},options:{type:Array,default:()=>[]}},emits:["update:model-value","onchange"],setup(t,{emit:e}){const o=t,n=T(null),{isOutside:s}=ye(n),d=T([]),u=T(!1);L(()=>s.value,a=>{a&&setTimeout(()=>{s.value?u.value=!1:u.value=!0},3e3)});const p=a=>{e("update:model-value",a),e("onchange",a)};return L(()=>o.modelValue,a=>{d.value=a}),U(()=>{d.value=o.modelValue}),(a,r)=>(w(),I("div",{ref_key:"target",ref:n,style:{width:"100%",height:"100%",padding:"1px"}},[u.value?W("",!0):(w(),I("span",{key:0,onClick:r[0]||(r[0]=c=>u.value=!0)},[(w(!0),I(D,null,j(d.value,c=>(w(),K(ie,{dense:"",color:"orange","text-color":"white",key:c},{default:h(()=>[E(G(c),1)]),_:2},1024))),128))])),u.value?(w(),I("div",Tt,[(w(!0),I(D,null,j(o.options,c=>(w(),K(ot,{class:"checkItem",modelValue:d.value,"onUpdate:modelValue":[r[1]||(r[1]=v=>d.value=v),p],key:c,val:c,label:c,color:"teal",cl:""},null,8,["modelValue","val","label"]))),128))])):W("",!0)],512))}};const St={key:1},xt={style:{display:"flex","flex-direction":"row"}},Q={__name:"MutiInput",props:{modelValue:{type:Array,default:()=>[]},options:{type:Array,default:()=>[]}},emits:["update:model-value","onchange"],setup(t,{emit:e}){const o=t,n=T(null),{isOutside:s}=ye(n),d=T([]),u=T(""),p=T(!1);L(()=>s.value,c=>{c&&setTimeout(()=>{s.value?p.value=!1:p.value=!0},3e3)});const a=()=>{const c=u.value;d.value||(d.value=[]),!(d.value.indexOf(c)>=0)&&(d.value.push(c),u.value=null,e("update:model-value",d.value),e("onchange",d.value))},r=c=>{d.value||(d.value=[]),console.log(c),!(d.value.indexOf(c)<0)&&(d.value=d.value.filter(v=>v!=c),e("update:model-value",d.value),e("onchange",d.value))};return L(()=>o.modelValue,c=>{d.value=c}),U(()=>{d.value=o.modelValue}),(c,v)=>(w(),I("div",{ref_key:"target",ref:n,style:{width:"100%",height:"100%",padding:"1px"}},[p.value?W("",!0):(w(),I("span",{key:0,onClick:v[0]||(v[0]=m=>p.value=!0)},[(w(!0),I(D,null,j(d.value,m=>(w(),K(ie,{dense:"",color:"orange","text-color":"white",key:m},{default:h(()=>[E(G(m),1)]),_:2},1024))),128))])),p.value?(w(),I("div",St,[(w(!0),I(D,null,j(d.value,m=>(w(),K(ie,{dense:"",color:"green","text-color":"white",key:m,removable:"",onRemove:b=>r(m)},{default:h(()=>[E(G(m),1)]),_:2},1032,["onRemove"]))),128)),M("div",xt,[f(H,{outlined:"","model-value":u.value,"onUpdate:modelValue":v[1]||(v[1]=m=>u.value=m),class:"inputText"},null,8,["model-value"]),f(F,{outlined:"",onClick:a},{default:h(()=>[E("\u6DFB\u52A0")]),_:1})])])):W("",!0)],512))}},It={class:"q-pa-md"},zt={style:{margin:"40px 10px 40px 10px"}},_t={style:{display:"flex","flex-direction":"row","justify-content":"space-between",width:"100%"}},Lt=["href"],Ft={__name:"SettingPage",setup(t){const e=rt(),o=T("search"),n=nt({settingInfo:{},ipAddr:""}),s=async()=>{const{Code:p,Message:a}=await dt(n.settingInfo);console.log(p,a),p!=200?e.notify({message:`${a}`}):e.notify({message:`${a}`})},d=async()=>{const{data:p}=await st();console.log(p),n.settingInfo=p},u=async()=>{const{Code:p,Data:a}=await ut();p=="200"&&(n.ipAddr=`http://${a}:10081`)};return U(()=>{document.title="\u8BBE\u7F6E",d(),u()}),(p,a)=>(w(),I("div",It,[f(de,{position:"top",offset:[20,20],style:{width:"100%"}},{default:h(()=>[f(Ve,{modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=r=>o.value=r),style:{width:"100%"},dense:"","no-caps":"","inline-label":"",class:"shadow-2","active-color":"primary","indicator-color":"primary",align:"justify"},{default:h(()=>[f(te,{name:"search",label:"\u641C\u7D22\u8BBE\u7F6E"}),f(te,{name:"base",label:"\u57FA\u7840\u8BBE\u7F6E"}),f(te,{name:"system",label:"\u7CFB\u7EDF\u8BBE\u7F6E"})]),_:1},8,["modelValue"])]),_:1}),M("div",zt,[M("div",_t,[M("a",{href:n.ipAddr},"\u8BBF\u95EE\uFF1A "+G(n.ipAddr),9,Lt)]),f(lt),f(Re,{modelValue:o.value,"onUpdate:modelValue":a[19]||(a[19]=r=>o.value=r),animated:""},{default:h(()=>[f(oe,{name:"search"},{default:h(()=>[f(P,{color:"purple-12",label:"Buttons","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(V,{"model-value":n.settingInfo.Buttons,options:S(Qe),onOnchange:a[1]||(a[1]=r=>n.settingInfo.Buttons=r)},null,8,["model-value","options"])]),_:1}),f(P,{color:"purple-12",label:"Dirs","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(V,{"model-value":n.settingInfo.Dirs,options:n.settingInfo.DirsLib,onOnchange:a[2]||(a[2]=r=>n.settingInfo.Dirs=r)},null,8,["model-value","options"])]),_:1}),f(P,{color:"purple-12",label:"MovieTypes","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(Q,{modelValue:n.settingInfo.MovieTypes,"onUpdate:modelValue":a[3]||(a[3]=r=>n.settingInfo.MovieTypes=r),onOnchange:a[4]||(a[4]=r=>n.settingInfo.MovieTypes=r)},null,8,["modelValue"])]),_:1}),f(P,{color:"purple-12",label:"VideoTypes","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(V,{"model-value":n.settingInfo.VideoTypes,options:n.settingInfo.Types,onOnchange:a[5]||(a[5]=r=>n.settingInfo.VideoTypes=r)},null,8,["model-value","options"])]),_:1}),f(P,{color:"purple-12",label:"Tags","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(V,{"model-value":n.settingInfo.Tags,options:n.settingInfo.TagsLib,onOnchange:a[6]||(a[6]=r=>n.settingInfo.Tags=r)},null,8,["model-value","options"])]),_:1})]),_:1}),f(oe,{name:"base"},{default:h(()=>[f(H,{modelValue:n.settingInfo.ControllerHost,"onUpdate:modelValue":a[7]||(a[7]=r=>n.settingInfo.ControllerHost=r),label:"ControllerHost"},null,8,["modelValue"]),f(H,{modelValue:n.settingInfo.ImageHost,"onUpdate:modelValue":a[8]||(a[8]=r=>n.settingInfo.ImageHost=r),label:"ImageHost"},null,8,["modelValue"]),f(H,{modelValue:n.settingInfo.StreamHost,"onUpdate:modelValue":a[9]||(a[9]=r=>n.settingInfo.StreamHost=r),label:"StreamHost"},null,8,["modelValue"]),f(H,{modelValue:n.settingInfo.BaseUrl,"onUpdate:modelValue":a[10]||(a[10]=r=>n.settingInfo.BaseUrl=r),label:"BaseUrl"},null,8,["modelValue"]),f(H,{modelValue:n.settingInfo.OMUrl,"onUpdate:modelValue":a[11]||(a[11]=r=>n.settingInfo.OMUrl=r),label:"OMUrl"},null,8,["modelValue"]),f(P,{color:"purple-12",label:"DirsLib","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(Q,{modelValue:n.settingInfo.DirsLib,"onUpdate:modelValue":a[12]||(a[12]=r=>n.settingInfo.DirsLib=r),onOnchange:a[13]||(a[13]=r=>n.settingInfo.DirsLib=r)},null,8,["modelValue"])]),_:1}),f(P,{color:"purple-12",label:"TagsLib","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(Q,{modelValue:n.settingInfo.TagsLib,"onUpdate:modelValue":a[14]||(a[14]=r=>n.settingInfo.TagsLib=r),onOnchange:a[15]||(a[15]=r=>n.settingInfo.TagsLib=r)},null,8,["modelValue"])]),_:1}),f(P,{color:"purple-12",label:"Types","stack-label":""},{prepend:h(()=>[f(_,{name:"event"})]),control:h(()=>[f(Q,{modelValue:n.settingInfo.Types,"onUpdate:modelValue":a[16]||(a[16]=r=>n.settingInfo.Types=r),onOnchange:a[17]||(a[17]=r=>n.settingInfo.Types=r)},null,8,["modelValue"])]),_:1})]),_:1}),f(oe,{name:"system"},{default:h(()=>[f(Ct,{modelValue:n.settingInfo.SystemHtml,"onUpdate:modelValue":a[18]||(a[18]=r=>n.settingInfo.SystemHtml=r),dense:S(e).screen.lt.md,toolbar:[[{label:S(e).lang.editor.align,icon:S(e).iconSet.editor.align,fixedLabel:!0,list:"only-icons",options:["left","center","right","justify"]},{label:S(e).lang.editor.align,icon:S(e).iconSet.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token","hr","link","custom_btn"],["print","fullscreen"],[{label:S(e).lang.editor.formatting,icon:S(e).iconSet.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:S(e).lang.editor.fontSize,icon:S(e).iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{label:S(e).lang.editor.defaultFont,icon:S(e).iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"],["viewsource"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["modelValue","dense","toolbar"])]),_:1})]),_:1},8,["modelValue"])]),f(de,{position:"bottom",offset:[20,20]},{default:h(()=>[f(F,{color:"blue",style:{width:"10rem"},onClick:s},{default:h(()=>[E("\u63D0\u4EA4")]),_:1})]),_:1})]))}};export{Ft as default};
