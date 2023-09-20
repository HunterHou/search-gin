import{i as Fe,w as z,j as fe,o as ie,ao as Ve,g as X,r as j,a as b,m as Ae,ap as xe,aq as Be,a5 as Ce,u as W,p as Ee,q as $e,z as Oe,h as p,ac as G,a0 as ee,ag as Te,d as le,T as Ie,ar as Pe,a4 as je,c as we,ad as ve,as as ze,at as De,v as Le,au as Ne,av as Ke}from"./index.28e7109e.js";import{u as Se,a as qe}from"./use-dark.b4db51ef.js";function Ue({validate:e,resetValidation:t,requiresQForm:i}){const u=Fe(Ve,!1);if(u!==!1){const{props:c,proxy:d}=X();Object.assign(d,{validate:e,resetValidation:t}),z(()=>c.disable,v=>{v===!0?(typeof t=="function"&&t(),u.unbindComponent(d)):u.bindComponent(d)}),fe(()=>{c.disable!==!0&&u.bindComponent(d)}),ie(()=>{c.disable!==!0&&u.unbindComponent(d)})}else i===!0&&console.error("Parent QForm not found on useFormChild()!")}const ge=/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,me=/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,he=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,ne=/^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,ae=/^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,ue={date:e=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),time:e=>/^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),fulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),timeOrFulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),hexColor:e=>ge.test(e),hexaColor:e=>me.test(e),hexOrHexaColor:e=>he.test(e),rgbColor:e=>ne.test(e),rgbaColor:e=>ae.test(e),rgbOrRgbaColor:e=>ne.test(e)||ae.test(e),hexOrRgbColor:e=>ge.test(e)||ne.test(e),hexaOrRgbaColor:e=>me.test(e)||ae.test(e),anyColor:e=>he.test(e)||ne.test(e)||ae.test(e)},Ze=[!0,!1,"ondemand"],He={modelValue:{},error:{type:Boolean,default:null},errorMessage:String,noErrorIcon:Boolean,rules:Array,reactiveRules:Boolean,lazyRules:{type:[Boolean,String],validator:e=>Ze.includes(e)}};function Qe(e,t){const{props:i,proxy:u}=X(),c=j(!1),d=j(null),v=j(null);Ue({validate:$,resetValidation:F});let x=0,B;const S=b(()=>i.rules!==void 0&&i.rules!==null&&i.rules.length!==0),C=b(()=>i.disable!==!0&&S.value===!0),g=b(()=>i.error===!0||c.value===!0),Z=b(()=>typeof i.errorMessage=="string"&&i.errorMessage.length!==0?i.errorMessage:d.value);z(()=>i.modelValue,()=>{D()}),z(()=>i.reactiveRules,O=>{O===!0?B===void 0&&(B=z(()=>i.rules,()=>{D(!0)})):B!==void 0&&(B(),B=void 0)},{immediate:!0}),z(e,O=>{O===!0?v.value===null&&(v.value=!1):v.value===!1&&(v.value=!0,C.value===!0&&i.lazyRules!=="ondemand"&&t.value===!1&&f())});function F(){x++,t.value=!1,v.value=null,c.value=!1,d.value=null,f.cancel()}function $(O=i.modelValue){if(C.value!==!0)return!0;const V=++x,Q=t.value!==!0?()=>{v.value=!0}:()=>{},N=(R,q)=>{R===!0&&Q(),c.value=R,d.value=q||null,t.value=!1},L=[];for(let R=0;R<i.rules.length;R++){const q=i.rules[R];let T;if(typeof q=="function"?T=q(O,ue):typeof q=="string"&&ue[q]!==void 0&&(T=ue[q](O)),T===!1||typeof T=="string")return N(!0,T),!1;T!==!0&&T!==void 0&&L.push(T)}return L.length===0?(N(!1),!0):(t.value=!0,Promise.all(L).then(R=>{if(R===void 0||Array.isArray(R)===!1||R.length===0)return V===x&&N(!1),!0;const q=R.find(T=>T===!1||typeof T=="string");return V===x&&N(q!==void 0,q),q===void 0},R=>(V===x&&(console.error(R),N(!0)),!1)))}function D(O){C.value===!0&&i.lazyRules!=="ondemand"&&(v.value===!0||i.lazyRules!==!0&&O!==!0)&&f()}const f=Ae($,0);return ie(()=>{B!==void 0&&B(),f.cancel()}),Object.assign(u,{resetValidation:F,validate:$}),xe(u,"hasError",()=>g.value),{isDirtyModel:v,hasRules:S,hasError:g,errorMessage:Z,validate:$,resetValidation:F}}const be=/^on[A-Z]/;function We(e,t){const i={listeners:j({}),attributes:j({})};function u(){const c={},d={};for(const v in e)v!=="class"&&v!=="style"&&be.test(v)===!1&&(c[v]=e[v]);for(const v in t.props)be.test(v)===!0&&(d[v]=t.props[v]);i.attributes.value=c,i.listeners.value=d}return Be(u),u(),i}let se,oe=0;const I=new Array(256);for(let e=0;e<256;e++)I[e]=(e+256).toString(16).substring(1);const Ye=(()=>{const e=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{const i=new Uint8Array(t);return e.getRandomValues(i),i}}return t=>{const i=[];for(let u=t;u>0;u--)i.push(Math.floor(Math.random()*256));return i}})(),ye=4096;function Je(){(se===void 0||oe+16>ye)&&(oe=0,se=Ye(ye));const e=Array.prototype.slice.call(se,oe,oe+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,I[e[0]]+I[e[1]]+I[e[2]]+I[e[3]]+"-"+I[e[4]]+I[e[5]]+"-"+I[e[6]]+I[e[7]]+"-"+I[e[8]]+I[e[9]]+"-"+I[e[10]]+I[e[11]]+I[e[12]]+I[e[13]]+I[e[14]]+I[e[15]]}let Y=[],te=[];function Me(e){te=te.filter(t=>t!==e)}function bt(e){Me(e),te.push(e)}function yt(e){Me(e),te.length===0&&Y.length!==0&&(Y[Y.length-1](),Y=[])}function Re(e){te.length===0?e():Y.push(e)}function Xe(e){Y=Y.filter(t=>t!==e)}function de(e){return e===void 0?`f_${Je()}`:e}function ce(e){return e!=null&&(""+e).length!==0}const Ge={...Se,...He,label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,itemAligned:Boolean,counter:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,for:String,maxlength:[Number,String]},et=["update:modelValue","clear","focus","blur","popupShow","popupHide"];function tt(){const{props:e,attrs:t,proxy:i,vnode:u}=X();return{isDark:qe(e,i.$q),editable:b(()=>e.disable!==!0&&e.readonly!==!0),innerLoading:j(!1),focused:j(!1),hasPopupOpen:!1,splitAttrs:We(t,u),targetUid:j(de(e.for)),rootRef:j(null),targetRef:j(null),controlRef:j(null)}}function lt(e){const{props:t,emit:i,slots:u,attrs:c,proxy:d}=X(),{$q:v}=d;let x=null;e.hasValue===void 0&&(e.hasValue=b(()=>ce(t.modelValue))),e.emitValue===void 0&&(e.emitValue=l=>{i("update:modelValue",l)}),e.controlEvents===void 0&&(e.controlEvents={onFocusin:o,onFocusout:a}),Object.assign(e,{clearValue:s,onControlFocusin:o,onControlFocusout:a,focus:q}),e.computedCounter===void 0&&(e.computedCounter=b(()=>{if(t.counter!==!1){const l=typeof t.modelValue=="string"||typeof t.modelValue=="number"?(""+t.modelValue).length:Array.isArray(t.modelValue)===!0?t.modelValue.length:0,k=t.maxlength!==void 0?t.maxlength:t.maxValues;return l+(k!==void 0?" / "+k:"")}}));const{isDirtyModel:B,hasRules:S,hasError:C,errorMessage:g,resetValidation:Z}=Qe(e.focused,e.innerLoading),F=e.floatingLabel!==void 0?b(()=>t.stackLabel===!0||e.focused.value===!0||e.floatingLabel.value===!0):b(()=>t.stackLabel===!0||e.focused.value===!0||e.hasValue.value===!0),$=b(()=>t.bottomSlots===!0||t.hint!==void 0||S.value===!0||t.counter===!0||t.error!==null),D=b(()=>t.filled===!0?"filled":t.outlined===!0?"outlined":t.borderless===!0?"borderless":t.standout?"standout":"standard"),f=b(()=>`q-field row no-wrap items-start q-field--${D.value}`+(e.fieldClass!==void 0?` ${e.fieldClass.value}`:"")+(t.rounded===!0?" q-field--rounded":"")+(t.square===!0?" q-field--square":"")+(F.value===!0?" q-field--float":"")+(V.value===!0?" q-field--labeled":"")+(t.dense===!0?" q-field--dense":"")+(t.itemAligned===!0?" q-field--item-aligned q-item-type":"")+(e.isDark.value===!0?" q-field--dark":"")+(e.getControl===void 0?" q-field--auto-height":"")+(e.focused.value===!0?" q-field--focused":"")+(C.value===!0?" q-field--error":"")+(C.value===!0||e.focused.value===!0?" q-field--highlighted":"")+(t.hideBottomSpace!==!0&&$.value===!0?" q-field--with-bottom":"")+(t.disable===!0?" q-field--disabled":t.readonly===!0?" q-field--readonly":"")),O=b(()=>"q-field__control relative-position row no-wrap"+(t.bgColor!==void 0?` bg-${t.bgColor}`:"")+(C.value===!0?" text-negative":typeof t.standout=="string"&&t.standout.length!==0&&e.focused.value===!0?` ${t.standout}`:t.color!==void 0?` text-${t.color}`:"")),V=b(()=>t.labelSlot===!0||t.label!==void 0),Q=b(()=>"q-field__label no-pointer-events absolute ellipsis"+(t.labelColor!==void 0&&C.value!==!0?` text-${t.labelColor}`:"")),N=b(()=>({id:e.targetUid.value,editable:e.editable.value,focused:e.focused.value,floatingLabel:F.value,modelValue:t.modelValue,emitValue:e.emitValue})),L=b(()=>{const l={for:e.targetUid.value};return t.disable===!0?l["aria-disabled"]="true":t.readonly===!0&&(l["aria-readonly"]="true"),l});z(()=>t.for,l=>{e.targetUid.value=de(l)});function R(){const l=document.activeElement;let k=e.targetRef!==void 0&&e.targetRef.value;k&&(l===null||l.id!==e.targetUid.value)&&(k.hasAttribute("tabindex")===!0||(k=k.querySelector("[tabindex]")),k&&k!==l&&k.focus({preventScroll:!0}))}function q(){Re(R)}function T(){Xe(R);const l=document.activeElement;l!==null&&e.rootRef.value.contains(l)&&l.blur()}function o(l){x!==null&&(clearTimeout(x),x=null),e.editable.value===!0&&e.focused.value===!1&&(e.focused.value=!0,i("focus",l))}function a(l,k){x!==null&&clearTimeout(x),x=setTimeout(()=>{x=null,!(document.hasFocus()===!0&&(e.hasPopupOpen===!0||e.controlRef===void 0||e.controlRef.value===null||e.controlRef.value.contains(document.activeElement)!==!1))&&(e.focused.value===!0&&(e.focused.value=!1,i("blur",l)),k!==void 0&&k())})}function s(l){Ce(l),v.platform.is.mobile!==!0?(e.targetRef!==void 0&&e.targetRef.value||e.rootRef.value).focus():e.rootRef.value.contains(document.activeElement)===!0&&document.activeElement.blur(),t.type==="file"&&(e.inputRef.value.value=null),i("update:modelValue",null),i("clear",t.modelValue),W(()=>{Z(),v.platform.is.mobile!==!0&&(B.value=!1)})}function r(){const l=[];return u.prepend!==void 0&&l.push(p("div",{class:"q-field__prepend q-field__marginal row no-wrap items-center",key:"prepend",onClick:G},u.prepend())),l.push(p("div",{class:"q-field__control-container col relative-position row no-wrap q-anchor--skip"},h())),C.value===!0&&t.noErrorIcon===!1&&l.push(M("error",[p(ee,{name:v.iconSet.field.error,color:"negative"})])),t.loading===!0||e.innerLoading.value===!0?l.push(M("inner-loading-append",u.loading!==void 0?u.loading():[p(Te,{color:t.color})])):t.clearable===!0&&e.hasValue.value===!0&&e.editable.value===!0&&l.push(M("inner-clearable-append",[p(ee,{class:"q-field__focusable-action",tag:"button",name:t.clearIcon||v.iconSet.field.clear,tabindex:0,type:"button","aria-hidden":null,role:null,onClick:s})])),u.append!==void 0&&l.push(p("div",{class:"q-field__append q-field__marginal row no-wrap items-center",key:"append",onClick:G},u.append())),e.getInnerAppend!==void 0&&l.push(M("inner-append",e.getInnerAppend())),e.getControlChild!==void 0&&l.push(e.getControlChild()),l}function h(){const l=[];return t.prefix!==void 0&&t.prefix!==null&&l.push(p("div",{class:"q-field__prefix no-pointer-events row items-center"},t.prefix)),e.getShadowControl!==void 0&&e.hasShadow.value===!0&&l.push(e.getShadowControl()),e.getControl!==void 0?l.push(e.getControl()):u.rawControl!==void 0?l.push(u.rawControl()):u.control!==void 0&&l.push(p("div",{ref:e.targetRef,class:"q-field__native row",tabindex:-1,...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0},u.control(N.value))),V.value===!0&&l.push(p("div",{class:Q.value},le(u.label,t.label))),t.suffix!==void 0&&t.suffix!==null&&l.push(p("div",{class:"q-field__suffix no-pointer-events row items-center"},t.suffix)),l.concat(le(u.default))}function m(){let l,k;C.value===!0?g.value!==null?(l=[p("div",{role:"alert"},g.value)],k=`q--slot-error-${g.value}`):(l=le(u.error),k="q--slot-error"):(t.hideHint!==!0||e.focused.value===!0)&&(t.hint!==void 0?(l=[p("div",t.hint)],k=`q--slot-hint-${t.hint}`):(l=le(u.hint),k="q--slot-hint"));const U=t.counter===!0||u.counter!==void 0;if(t.hideBottomSpace===!0&&U===!1&&l===void 0)return;const w=p("div",{key:k,class:"q-field__messages col"},l);return p("div",{class:"q-field__bottom row items-start q-field__bottom--"+(t.hideBottomSpace!==!0?"animated":"stale"),onClick:G},[t.hideBottomSpace===!0?w:p(Ie,{name:"q-transition--field-message"},()=>w),U===!0?p("div",{class:"q-field__counter"},u.counter!==void 0?u.counter():e.computedCounter.value):null])}function M(l,k){return k===null?null:p("div",{key:l,class:"q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"},k)}let y=!1;return Ee(()=>{y=!0}),$e(()=>{y===!0&&t.autofocus===!0&&d.focus()}),fe(()=>{Oe.value===!0&&t.for===void 0&&(e.targetUid.value=de()),t.autofocus===!0&&d.focus()}),ie(()=>{x!==null&&clearTimeout(x)}),Object.assign(d,{focus:q,blur:T}),function(){const k=e.getControl===void 0&&u.control===void 0?{...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0,...L.value}:L.value;return p("label",{ref:e.rootRef,class:[f.value,c.class],style:c.style,...k},[u.before!==void 0?p("div",{class:"q-field__before q-field__marginal row no-wrap items-center",onClick:G},u.before()):null,p("div",{class:"q-field__inner relative-position col self-stretch"},[p("div",{ref:e.controlRef,class:O.value,tabindex:-1,...e.controlEvents},r()),$.value===!0?m():null]),u.after!==void 0?p("div",{class:"q-field__after q-field__marginal row no-wrap items-center",onClick:G},u.after()):null])}}const ke={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},re={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},_e=Object.keys(re);_e.forEach(e=>{re[e].regex=new RegExp(re[e].pattern)});const nt=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+_e.join("")+"])|(.)","g"),pe=/[.*+?^${}()|[\]\\]/g,A=String.fromCharCode(1),at={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function ot(e,t,i,u){let c,d,v,x,B,S;const C=j(null),g=j(F());function Z(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}z(()=>e.type+e.autogrow,D),z(()=>e.mask,o=>{if(o!==void 0)f(g.value,!0);else{const a=q(g.value);D(),e.modelValue!==a&&t("update:modelValue",a)}}),z(()=>e.fillMask+e.reverseFillMask,()=>{C.value===!0&&f(g.value,!0)}),z(()=>e.unmaskedValue,()=>{C.value===!0&&f(g.value)});function F(){if(D(),C.value===!0){const o=L(q(e.modelValue));return e.fillMask!==!1?T(o):o}return e.modelValue}function $(o){if(o<c.length)return c.slice(-o);let a="",s=c;const r=s.indexOf(A);if(r>-1){for(let h=o-s.length;h>0;h--)a+=A;s=s.slice(0,r)+a+s.slice(r)}return s}function D(){if(C.value=e.mask!==void 0&&e.mask.length!==0&&Z(),C.value===!1){x=void 0,c="",d="";return}const o=ke[e.mask]===void 0?e.mask:ke[e.mask],a=typeof e.fillMask=="string"&&e.fillMask.length!==0?e.fillMask.slice(0,1):"_",s=a.replace(pe,"\\$&"),r=[],h=[],m=[];let M=e.reverseFillMask===!0,y="",l="";o.replace(nt,(E,n,_,H,K)=>{if(H!==void 0){const P=re[H];m.push(P),l=P.negate,M===!0&&(h.push("(?:"+l+"+)?("+P.pattern+"+)?(?:"+l+"+)?("+P.pattern+"+)?"),M=!1),h.push("(?:"+l+"+)?("+P.pattern+")?")}else if(_!==void 0)y="\\"+(_==="\\"?"":_),m.push(_),r.push("([^"+y+"]+)?"+y+"?");else{const P=n!==void 0?n:K;y=P==="\\"?"\\\\\\\\":P.replace(pe,"\\\\$&"),m.push(P),r.push("([^"+y+"]+)?"+y+"?")}});const k=new RegExp("^"+r.join("")+"("+(y===""?".":"[^"+y+"]")+"+)?"+(y===""?"":"["+y+"]*")+"$"),U=h.length-1,w=h.map((E,n)=>n===0&&e.reverseFillMask===!0?new RegExp("^"+s+"*"+E):n===U?new RegExp("^"+E+"("+(l===""?".":l)+"+)?"+(e.reverseFillMask===!0?"$":s+"*")):new RegExp("^"+E));v=m,x=E=>{const n=k.exec(e.reverseFillMask===!0?E:E.slice(0,m.length+1));n!==null&&(E=n.slice(1).join(""));const _=[],H=w.length;for(let K=0,P=E;K<H;K++){const J=w[K].exec(P);if(J===null)break;P=P.slice(J.shift().length),_.push(...J)}return _.length!==0?_.join(""):E},c=m.map(E=>typeof E=="string"?E:A).join(""),d=c.split(A).join(a)}function f(o,a,s){const r=u.value,h=r.selectionEnd,m=r.value.length-h,M=q(o);a===!0&&D();const y=L(M),l=e.fillMask!==!1?T(y):y,k=g.value!==l;r.value!==l&&(r.value=l),k===!0&&(g.value=l),document.activeElement===r&&W(()=>{if(l===d){const w=e.reverseFillMask===!0?d.length:0;r.setSelectionRange(w,w,"forward");return}if(s==="insertFromPaste"&&e.reverseFillMask!==!0){const w=r.selectionEnd;let E=h-1;for(let n=B;n<=E&&n<w;n++)c[n]!==A&&E++;V.right(r,E);return}if(["deleteContentBackward","deleteContentForward"].indexOf(s)>-1){const w=e.reverseFillMask===!0?h===0?l.length>y.length?1:0:Math.max(0,l.length-(l===d?0:Math.min(y.length,m)+1))+1:h;r.setSelectionRange(w,w,"forward");return}if(e.reverseFillMask===!0)if(k===!0){const w=Math.max(0,l.length-(l===d?0:Math.min(y.length,m+1)));w===1&&h===1?r.setSelectionRange(w,w,"forward"):V.rightReverse(r,w)}else{const w=l.length-m;r.setSelectionRange(w,w,"backward")}else if(k===!0){const w=Math.max(0,c.indexOf(A),Math.min(y.length,h)-1);V.right(r,w)}else{const w=h-1;V.right(r,w)}});const U=e.unmaskedValue===!0?q(l):l;String(e.modelValue)!==U&&i(U,!0)}function O(o,a,s){const r=L(q(o.value));a=Math.max(0,c.indexOf(A),Math.min(r.length,a)),B=a,o.setSelectionRange(a,s,"forward")}const V={left(o,a){const s=c.slice(a-1).indexOf(A)===-1;let r=Math.max(0,a-1);for(;r>=0;r--)if(c[r]===A){a=r,s===!0&&a++;break}if(r<0&&c[a]!==void 0&&c[a]!==A)return V.right(o,0);a>=0&&o.setSelectionRange(a,a,"backward")},right(o,a){const s=o.value.length;let r=Math.min(s,a+1);for(;r<=s;r++)if(c[r]===A){a=r;break}else c[r-1]===A&&(a=r);if(r>s&&c[a-1]!==void 0&&c[a-1]!==A)return V.left(o,s);o.setSelectionRange(a,a,"forward")},leftReverse(o,a){const s=$(o.value.length);let r=Math.max(0,a-1);for(;r>=0;r--)if(s[r-1]===A){a=r;break}else if(s[r]===A&&(a=r,r===0))break;if(r<0&&s[a]!==void 0&&s[a]!==A)return V.rightReverse(o,0);a>=0&&o.setSelectionRange(a,a,"backward")},rightReverse(o,a){const s=o.value.length,r=$(s),h=r.slice(0,a+1).indexOf(A)===-1;let m=Math.min(s,a+1);for(;m<=s;m++)if(r[m-1]===A){a=m,a>0&&h===!0&&a--;break}if(m>s&&r[a-1]!==void 0&&r[a-1]!==A)return V.leftReverse(o,s);o.setSelectionRange(a,a,"forward")}};function Q(o){t("click",o),S=void 0}function N(o){if(t("keydown",o),Pe(o)===!0||o.altKey===!0)return;const a=u.value,s=a.selectionStart,r=a.selectionEnd;if(o.shiftKey||(S=void 0),o.keyCode===37||o.keyCode===39){o.shiftKey&&S===void 0&&(S=a.selectionDirection==="forward"?s:r);const h=V[(o.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];if(o.preventDefault(),h(a,S===s?r:s),o.shiftKey){const m=a.selectionStart;a.setSelectionRange(Math.min(S,m),Math.max(S,m),"forward")}}else o.keyCode===8&&e.reverseFillMask!==!0&&s===r?(V.left(a,s),a.setSelectionRange(a.selectionStart,r,"backward")):o.keyCode===46&&e.reverseFillMask===!0&&s===r&&(V.rightReverse(a,r),a.setSelectionRange(s,a.selectionEnd,"forward"))}function L(o){if(o==null||o==="")return"";if(e.reverseFillMask===!0)return R(o);const a=v;let s=0,r="";for(let h=0;h<a.length;h++){const m=o[s],M=a[h];if(typeof M=="string")r+=M,m===M&&s++;else if(m!==void 0&&M.regex.test(m))r+=M.transform!==void 0?M.transform(m):m,s++;else return r}return r}function R(o){const a=v,s=c.indexOf(A);let r=o.length-1,h="";for(let m=a.length-1;m>=0&&r>-1;m--){const M=a[m];let y=o[r];if(typeof M=="string")h=M+h,y===M&&r--;else if(y!==void 0&&M.regex.test(y))do h=(M.transform!==void 0?M.transform(y):y)+h,r--,y=o[r];while(s===m&&y!==void 0&&M.regex.test(y));else return h}return h}function q(o){return typeof o!="string"||x===void 0?typeof o=="number"?x(""+o):o:x(o)}function T(o){return d.length-o.length<=0?o:e.reverseFillMask===!0&&o.length!==0?d.slice(0,-o.length)+o:o+d.slice(o.length)}return{innerValue:g,hasMask:C,moveCursorForPaste:O,updateMaskValue:f,onMaskedKeydown:N,onMaskedClick:Q}}const rt={name:String};function kt(e={}){return(t,i,u)=>{t[i](p("input",{class:"hidden"+(u||""),...e.value}))}}function it(e){return b(()=>e.name||e.for)}function ut(e,t){function i(){const u=e.modelValue;try{const c="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(u)===u&&("length"in u?Array.from(u):[u]).forEach(d=>{c.items.add(d)}),{files:c.files}}catch{return{files:void 0}}}return t===!0?b(()=>{if(e.type==="file")return i()}):b(i)}const st=/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,dt=/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,ct=/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,ft=/[a-z0-9_ -]$/i;function vt(e){return function(i){if(i.type==="compositionend"||i.type==="change"){if(i.target.qComposing!==!0)return;i.target.qComposing=!1,e(i)}else i.type==="compositionupdate"&&i.target.qComposing!==!0&&typeof i.data=="string"&&(je.is.firefox===!0?ft.test(i.data)===!1:st.test(i.data)===!0||dt.test(i.data)===!0||ct.test(i.data)===!0)===!0&&(i.target.qComposing=!0)}}var pt=we({name:"QInput",inheritAttrs:!1,props:{...Ge,...at,...rt,modelValue:{required:!1},shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...et,"paste","change","keydown","click","animationend"],setup(e,{emit:t,attrs:i}){const{proxy:u}=X(),{$q:c}=u,d={};let v=NaN,x,B,S=null,C;const g=j(null),Z=it(e),{innerValue:F,hasMask:$,moveCursorForPaste:D,updateMaskValue:f,onMaskedKeydown:O,onMaskedClick:V}=ot(e,t,y,g),Q=ut(e,!0),N=b(()=>ce(F.value)),L=vt(m),R=tt(),q=b(()=>e.type==="textarea"||e.autogrow===!0),T=b(()=>q.value===!0||["text","search","url","tel","password"].includes(e.type)),o=b(()=>{const n={...R.splitAttrs.listeners.value,onInput:m,onPaste:h,onChange:k,onBlur:U,onFocus:ve};return n.onCompositionstart=n.onCompositionupdate=n.onCompositionend=L,$.value===!0&&(n.onKeydown=O,n.onClick=V),e.autogrow===!0&&(n.onAnimationend=M),n}),a=b(()=>{const n={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:Z.value,...R.splitAttrs.attributes.value,id:R.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return q.value===!1&&(n.type=e.type),e.autogrow===!0&&(n.rows=1),n});z(()=>e.type,()=>{g.value&&(g.value.value=e.modelValue)}),z(()=>e.modelValue,n=>{if($.value===!0){if(B===!0&&(B=!1,String(n)===v))return;f(n)}else F.value!==n&&(F.value=n,e.type==="number"&&d.hasOwnProperty("value")===!0&&(x===!0?x=!1:delete d.value));e.autogrow===!0&&W(l)}),z(()=>e.autogrow,n=>{n===!0?W(l):g.value!==null&&i.rows>0&&(g.value.style.height="auto")}),z(()=>e.dense,()=>{e.autogrow===!0&&W(l)});function s(){Re(()=>{const n=document.activeElement;g.value!==null&&g.value!==n&&(n===null||n.id!==R.targetUid.value)&&g.value.focus({preventScroll:!0})})}function r(){g.value!==null&&g.value.select()}function h(n){if($.value===!0&&e.reverseFillMask!==!0){const _=n.target;D(_,_.selectionStart,_.selectionEnd)}t("paste",n)}function m(n){if(!n||!n.target)return;if(e.type==="file"){t("update:modelValue",n.target.files);return}const _=n.target.value;if(n.target.qComposing===!0){d.value=_;return}if($.value===!0)f(_,!1,n.inputType);else if(y(_),T.value===!0&&n.target===document.activeElement){const{selectionStart:H,selectionEnd:K}=n.target;H!==void 0&&K!==void 0&&W(()=>{n.target===document.activeElement&&_.indexOf(n.target.value)===0&&n.target.setSelectionRange(H,K)})}e.autogrow===!0&&l()}function M(n){t("animationend",n),l()}function y(n,_){C=()=>{S=null,e.type!=="number"&&d.hasOwnProperty("value")===!0&&delete d.value,e.modelValue!==n&&v!==n&&(v=n,_===!0&&(B=!0),t("update:modelValue",n),W(()=>{v===n&&(v=NaN)})),C=void 0},e.type==="number"&&(x=!0,d.value=n),e.debounce!==void 0?(S!==null&&clearTimeout(S),d.value=n,S=setTimeout(C,e.debounce)):C()}function l(){requestAnimationFrame(()=>{const n=g.value;if(n!==null){const _=n.parentNode.style,{scrollTop:H}=n,{overflowY:K,maxHeight:P}=c.platform.is.firefox===!0?{}:window.getComputedStyle(n),J=K!==void 0&&K!=="scroll";J===!0&&(n.style.overflowY="hidden"),_.marginBottom=n.scrollHeight-1+"px",n.style.height="1px",n.style.height=n.scrollHeight+"px",J===!0&&(n.style.overflowY=parseInt(P,10)<n.scrollHeight?"auto":"hidden"),_.marginBottom="",n.scrollTop=H}})}function k(n){L(n),S!==null&&(clearTimeout(S),S=null),C!==void 0&&C(),t("change",n.target.value)}function U(n){n!==void 0&&ve(n),S!==null&&(clearTimeout(S),S=null),C!==void 0&&C(),x=!1,B=!1,delete d.value,e.type!=="file"&&setTimeout(()=>{g.value!==null&&(g.value.value=F.value!==void 0?F.value:"")})}function w(){return d.hasOwnProperty("value")===!0?d.value:F.value!==void 0?F.value:""}ie(()=>{U()}),fe(()=>{e.autogrow===!0&&l()}),Object.assign(R,{innerValue:F,fieldClass:b(()=>`q-${q.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:b(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length!==0),inputRef:g,emitValue:y,hasValue:N,floatingLabel:b(()=>N.value===!0&&(e.type!=="number"||isNaN(F.value)===!1)||ce(e.displayValue)),getControl:()=>p(q.value===!0?"textarea":"input",{ref:g,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...a.value,...o.value,...e.type!=="file"?{value:w()}:Q.value}),getShadowControl:()=>p("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(q.value===!0?"":" text-no-wrap")},[p("span",{class:"invisible"},w()),p("span",e.shadowText)])});const E=lt(R);return Object.assign(u,{focus:s,select:r,getNativeElement:()=>g.value}),xe(u,"nativeEl",()=>g.value),E}});const gt={xs:8,sm:10,md:14,lg:20,xl:24};var xt=we({name:"QChip",props:{...Se,...ze,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:t,emit:i}){const{proxy:{$q:u}}=X(),c=qe(e,u),d=De(e,gt),v=b(()=>e.selected===!0||e.icon!==void 0),x=b(()=>e.selected===!0?e.iconSelected||u.iconSet.chip.selected:e.icon),B=b(()=>e.iconRemove||u.iconSet.chip.remove),S=b(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),C=b(()=>{const f=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(f?` text-${f} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(S.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(c.value===!0?" q-chip--dark q-dark":"")}),g=b(()=>{const f=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},O={...f,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||u.lang.label.remove};return{chip:f,remove:O}});function Z(f){f.keyCode===13&&F(f)}function F(f){e.disable||(i("update:selected",!e.selected),i("click",f))}function $(f){(f.keyCode===void 0||f.keyCode===13)&&(Ce(f),e.disable===!1&&(i("update:modelValue",!1),i("remove")))}function D(){const f=[];S.value===!0&&f.push(p("div",{class:"q-focus-helper"})),v.value===!0&&f.push(p(ee,{class:"q-chip__icon q-chip__icon--left",name:x.value}));const O=e.label!==void 0?[p("div",{class:"ellipsis"},[e.label])]:void 0;return f.push(p("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},Ne(t.default,O))),e.iconRight&&f.push(p(ee,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&f.push(p(ee,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:B.value,...g.value.remove,onClick:$,onKeyup:$})),f}return()=>{if(e.modelValue===!1)return;const f={class:C.value,style:d.value};return S.value===!0&&Object.assign(f,g.value.chip,{onClick:F,onKeyup:Z}),Le("div",f,D(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[Ke,e.ripple]])}}});export{pt as Q,xt as a,kt as b,Re as c,Ge as d,et as e,it as f,tt as g,lt as h,ce as i,vt as j,bt as k,Je as l,We as m,yt as r,rt as u};
