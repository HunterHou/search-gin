import{E as w,ah as A,c,b7 as H,G as m,Q as N,Z as F,aj as O,r as y,y as P,J as R,ae as x,H as M,b8 as D}from"./index.dce5c937.js";import{b as W}from"./use-page-sticky.e7b0d671.js";import{u as $}from"./System.3e9c461a.js";function X(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Y(e,t,a){return a<=t?t:Math.min(a,Math.max(t,e))}function p(e,t,a){if(a<=t)return t;const s=a-t+1;let g=t+(e-t)%s;return g<t&&(g=s+g),g===0?0:g}function ee(e,t=2,a="0"){if(e==null)return e;const s=""+e;return s.length>=t?s:new Array(t-s.length+1).join(a)+s}var te=w({name:"QBtnToggle",props:{...A,modelValue:{required:!0},options:{type:Array,required:!0,validator:e=>e.every(t=>("label"in t||"icon"in t||"slot"in t)&&"value"in t)},color:String,textColor:String,toggleColor:{type:String,default:"primary"},toggleTextColor:String,outline:Boolean,flat:Boolean,unelevated:Boolean,rounded:Boolean,push:Boolean,glossy:Boolean,size:String,padding:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,readonly:Boolean,disable:Boolean,stack:Boolean,stretch:Boolean,spread:Boolean,clearable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","clear","click"],setup(e,{slots:t,emit:a}){const s=c(()=>e.options.find(o=>o.value===e.modelValue)!==void 0),g=c(()=>({type:"hidden",name:e.name,value:e.modelValue})),i=O(g),v=c(()=>H(e)),d=c(()=>({rounded:e.rounded,dense:e.dense,...v.value})),f=c(()=>e.options.map((o,u)=>{const{attrs:b,value:S,slot:B,...r}=o;return{slot:B,props:{key:u,"aria-pressed":S===e.modelValue?"true":"false",...b,...r,...d.value,disable:e.disable===!0||r.disable===!0,color:S===e.modelValue?l(r,"toggleColor"):l(r,"color"),textColor:S===e.modelValue?l(r,"toggleTextColor"):l(r,"textColor"),noCaps:l(r,"noCaps")===!0,noWrap:l(r,"noWrap")===!0,size:l(r,"size"),padding:l(r,"padding"),ripple:l(r,"ripple"),stack:l(r,"stack")===!0,stretch:l(r,"stretch")===!0,onClick(q){h(S,o,q)}}}}));function h(o,u,b){e.readonly!==!0&&(e.modelValue===o?e.clearable===!0&&(a("update:modelValue",null,null),a("clear")):a("update:modelValue",o,u),a("click",b))}function l(o,u){return o[u]===void 0?e[u]:o[u]}function _(){const o=f.value.map(u=>m(N,u.props,u.slot!==void 0?t[u.slot]:void 0));return e.name!==void 0&&e.disable!==!0&&s.value===!0&&i(o,"push"),F(t.default,o)}return()=>m(W,{class:"q-btn-toggle",...v.value,rounded:e.rounded,stretch:e.stretch,glossy:e.glossy,spread:e.spread},_)}});const E={ratio:[String,Number]};function G(e,t){return c(()=>{const a=Number(e.ratio||(t!==void 0?t.value:void 0));return isNaN(a)!==!0&&a>0?{paddingBottom:`${100/a}%`}:null})}const J=16/9;var ne=w({name:"QImg",props:{...E,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:J},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:t,emit:a}){const s=y(e.initialRatio),g=G(e,s);let i=null,v=!1;const d=[y(null),y(B())],f=y(0),h=y(!1),l=y(!1),_=c(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),o=c(()=>({width:e.width,height:e.height})),u=c(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),b=c(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));P(()=>S(),r);function S(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function B(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function r(n){i!==null&&(clearTimeout(i),i=null),l.value=!1,n===null?(h.value=!1,d[f.value^1].value=B()):h.value=!0,d[f.value].value=n}function q({target:n}){v!==!0&&(i!==null&&(clearTimeout(i),i=null),s.value=n.naturalHeight===0?.5:n.naturalWidth/n.naturalHeight,z(n,1))}function z(n,I){v===!0||I===1e3||(n.complete===!0?V(n):i=setTimeout(()=>{i=null,z(n,I+1)},50))}function V(n){v!==!0&&(f.value=f.value^1,d[f.value].value=null,h.value=!1,l.value=!1,a("load",n.currentSrc||n.src))}function j(n){i!==null&&(clearTimeout(i),i=null),h.value=!1,l.value=!0,d[f.value].value=null,d[f.value^1].value=B(),a("error",n)}function k(n){const I=d[n].value,T={key:"img_"+n,class:u.value,style:b.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...I};return f.value===n?(T.class+=" q-img__image--waiting",Object.assign(T,{onLoad:q,onError:j})):T.class+=" q-img__image--loaded",m("div",{class:"q-img__container absolute-full",key:"img"+n},m("img",T))}function Q(){return h.value!==!0?m("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},M(t[l.value===!0?"error":"default"])):m("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},t.loading!==void 0?t.loading():e.noSpinner===!0?void 0:[m(D,{color:e.spinnerColor,size:e.spinnerSize})])}return r(S()),R(()=>{v=!0,i!==null&&(clearTimeout(i),i=null)}),()=>{const n=[];return g.value!==null&&n.push(m("div",{key:"filler",style:g.value})),l.value!==!0&&(d[0].value!==null&&n.push(k(0)),d[1].value!==null&&n.push(k(1))),n.push(m(x,{name:"q-transition--fade"},Q)),m("div",{class:_.value,style:o.value,role:"img","aria-label":e.alt},n)}}});const L=$(),C=c(()=>L.SettingInfo),ae=e=>C.value.ImageHost+"/api/png/"+e,le=e=>C.value.ImageHost+"/api/jpg/"+e,ie=e=>C.value.StreamHost+"/api/file/"+e,re=e=>C.value.StreamHost+"/api/tempimage/"+e,oe=e=>C.value.ImageHost+"/api/actressImgae/"+e;export{te as Q,ne as a,Y as b,ae as c,X as d,le as e,re as f,ie as g,oe as h,p as n,ee as p};
