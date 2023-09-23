import{c as V,aQ as H,a as s,aR as N,h as d,a0 as R,y as A,aS as F,r as S,w as O,o as P,ac as x,d as D,aT as W}from"./index.b26dd352.js";import{a as $}from"./QChip.b0e52ffa.js";import{u as M}from"./System.4a9f4b10.js";var Y=V({name:"QBtnToggle",props:{...H,modelValue:{required:!0},options:{type:Array,required:!0,validator:e=>e.every(o=>("label"in o||"icon"in o||"slot"in o)&&"value"in o)},color:String,textColor:String,toggleColor:{type:String,default:"primary"},toggleTextColor:String,outline:Boolean,flat:Boolean,unelevated:Boolean,rounded:Boolean,push:Boolean,glossy:Boolean,size:String,padding:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,readonly:Boolean,disable:Boolean,stack:Boolean,stretch:Boolean,spread:Boolean,clearable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","clear","click"],setup(e,{slots:o,emit:u}){const B=s(()=>e.options.find(i=>i.value===e.modelValue)!==void 0),C=s(()=>({type:"hidden",name:e.name,value:e.modelValue})),a=F(C),m=s(()=>N(e)),c=s(()=>({rounded:e.rounded,dense:e.dense,...m.value})),g=s(()=>e.options.map((i,r)=>{const{attrs:h,value:v,slot:y,...l}=i;return{slot:y,props:{key:r,"aria-pressed":v===e.modelValue?"true":"false",...h,...l,...c.value,disable:e.disable===!0||l.disable===!0,color:v===e.modelValue?n(l,"toggleColor"):n(l,"color"),textColor:v===e.modelValue?n(l,"toggleTextColor"):n(l,"textColor"),noCaps:n(l,"noCaps")===!0,noWrap:n(l,"noWrap")===!0,size:n(l,"size"),padding:n(l,"padding"),ripple:n(l,"ripple"),stack:n(l,"stack")===!0,stretch:n(l,"stretch")===!0,onClick(I){f(v,i,I)}}}}));function f(i,r,h){e.readonly!==!0&&(e.modelValue===i?e.clearable===!0&&(u("update:modelValue",null,null),u("clear")):u("update:modelValue",i,r),u("click",h))}function n(i,r){return i[r]===void 0?e[r]:i[r]}function q(){const i=g.value.map(r=>d(R,r.props,r.slot!==void 0?o[r.slot]:void 0));return e.name!==void 0&&e.disable!==!0&&B.value===!0&&a(i,"push"),A(o.default,i)}return()=>d($,{class:"q-btn-toggle",...m.value,rounded:e.rounded,stretch:e.stretch,glossy:e.glossy,spread:e.spread},q)}});const E={ratio:[String,Number]};function L(e,o){return s(()=>{const u=Number(e.ratio||(o!==void 0?o.value:void 0));return isNaN(u)!==!0&&u>0?{paddingBottom:`${100/u}%`}:null})}const G=16/9;var Z=V({name:"QImg",props:{...E,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:G},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:o,emit:u}){const B=S(e.initialRatio),C=L(e,B);let a=null,m=!1;const c=[S(null),S(y())],g=S(0),f=S(!1),n=S(!1),q=s(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),i=s(()=>({width:e.width,height:e.height})),r=s(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),h=s(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));O(()=>v(),l);function v(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function y(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function l(t){a!==null&&(clearTimeout(a),a=null),n.value=!1,t===null?(f.value=!1,c[g.value^1].value=y()):f.value=!0,c[g.value].value=t}function I({target:t}){m!==!0&&(a!==null&&(clearTimeout(a),a=null),B.value=t.naturalHeight===0?.5:t.naturalWidth/t.naturalHeight,k(t,1))}function k(t,T){m===!0||T===1e3||(t.complete===!0?w(t):a=setTimeout(()=>{a=null,k(t,T+1)},50))}function w(t){m!==!0&&(g.value=g.value^1,c[g.value].value=null,f.value=!1,n.value=!1,u("load",t.currentSrc||t.src))}function Q(t){a!==null&&(clearTimeout(a),a=null),f.value=!1,n.value=!0,c[g.value].value=null,c[g.value^1].value=y(),u("error",t)}function z(t){const T=c[t].value,_={key:"img_"+t,class:r.value,style:h.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...T};return g.value===t?(_.class+=" q-img__image--waiting",Object.assign(_,{onLoad:I,onError:Q})):_.class+=" q-img__image--loaded",d("div",{class:"q-img__container absolute-full",key:"img"+t},d("img",_))}function j(){return f.value!==!0?d("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},D(o[n.value===!0?"error":"default"])):d("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},o.loading!==void 0?o.loading():e.noSpinner===!0?void 0:[d(W,{color:e.spinnerColor,size:e.spinnerSize})])}return l(v()),P(()=>{m=!0,a!==null&&(clearTimeout(a),a=null)}),()=>{const t=[];return C.value!==null&&t.push(d("div",{key:"filler",style:C.value})),n.value!==!0&&(c[0].value!==null&&t.push(z(0)),c[1].value!==null&&t.push(z(1))),t.push(d(x,{name:"q-transition--fade"},j)),d("div",{class:q.value,style:i.value,role:"img","aria-label":e.alt},t)}}});const J=M(),b=s(()=>J.SettingInfo),p=e=>b.value.ImageHost+"/api/png/"+e,ee=e=>b.value.ImageHost+"/api/jpg/"+e,te=e=>b.value.StreamHost+"/api/file/"+e,ne=e=>b.value.StreamHost+"/api/tempimage/"+e,ae=e=>b.value.ImageHost+"/api/actressImgae/"+e;export{Y as Q,Z as a,p as b,ee as c,ne as d,ae as e,te as g};
