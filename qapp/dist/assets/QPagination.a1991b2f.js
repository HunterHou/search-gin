import{c as Q,aM as W,a as l,aN as _,h as y,a0 as j,y as K,aO as G,u as R,aP as U,s as H,r as J,w as X,aQ as w,aR as Y,ap as Z,ai as p,g as ee}from"./index.5abe30a5.js";import{Q as te}from"./QBtnGroup.11d57b4d.js";import{b as ae}from"./format.a33550d6.js";var ie=Q({name:"QBtnToggle",props:{...W,modelValue:{required:!0},options:{type:Array,required:!0,validator:e=>e.every(d=>("label"in d||"icon"in d||"slot"in d)&&"value"in d)},color:String,textColor:String,toggleColor:{type:String,default:"primary"},toggleTextColor:String,outline:Boolean,flat:Boolean,unelevated:Boolean,rounded:Boolean,push:Boolean,glossy:Boolean,size:String,padding:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,readonly:Boolean,disable:Boolean,stack:Boolean,stretch:Boolean,spread:Boolean,clearable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","clear","click"],setup(e,{slots:d,emit:m}){const b=l(()=>e.options.find(i=>i.value===e.modelValue)!==void 0),D=l(()=>({type:"hidden",name:e.name,value:e.modelValue})),r=G(D),n=l(()=>_(e)),P=l(()=>({rounded:e.rounded,dense:e.dense,...n.value})),k=l(()=>e.options.map((i,o)=>{const{attrs:c,value:S,slot:h,...s}=i;return{slot:h,props:{key:o,"aria-pressed":S===e.modelValue?"true":"false",...c,...s,...P.value,disable:e.disable===!0||s.disable===!0,color:S===e.modelValue?u(s,"toggleColor"):u(s,"color"),textColor:S===e.modelValue?u(s,"toggleTextColor"):u(s,"textColor"),noCaps:u(s,"noCaps")===!0,noWrap:u(s,"noWrap")===!0,size:u(s,"size"),padding:u(s,"padding"),ripple:u(s,"ripple"),stack:u(s,"stack")===!0,stretch:u(s,"stretch")===!0,onClick(B){N(S,i,B)}}}}));function N(i,o,c){e.readonly!==!0&&(e.modelValue===i?e.clearable===!0&&(m("update:modelValue",null,null),m("clear")):m("update:modelValue",i,o),m("click",c))}function u(i,o){return i[o]===void 0?e[o]:i[o]}function O(){const i=k.value.map(o=>y(j,o.props,o.slot!==void 0?d[o.slot]:void 0));return e.name!==void 0&&e.disable!==!0&&b.value===!0&&r(i,"push"),K(d.default,i)}return()=>y(te,{class:"q-btn-toggle",...n.value,rounded:e.rounded,stretch:e.stretch,glossy:e.glossy,spread:e.spread},O)}});function F(e,d){return[!0,!1].includes(e)?e:d}var oe=Q({name:"QPagination",props:{...R,modelValue:{type:Number,required:!0},min:{type:[Number,String],default:1},max:{type:[Number,String],required:!0},maxPages:{type:[Number,String],default:0,validator:e=>(typeof e=="string"?parseInt(e,10):e)>=0},inputStyle:[Array,String,Object],inputClass:[Array,String,Object],size:String,disable:Boolean,input:Boolean,iconPrev:String,iconNext:String,iconFirst:String,iconLast:String,toFn:Function,boundaryLinks:{type:Boolean,default:null},boundaryNumbers:{type:Boolean,default:null},directionLinks:{type:Boolean,default:null},ellipses:{type:Boolean,default:null},ripple:{type:[Boolean,Object],default:null},round:Boolean,rounded:Boolean,flat:Boolean,outline:Boolean,unelevated:Boolean,push:Boolean,glossy:Boolean,color:{type:String,default:"primary"},textColor:String,activeDesign:{type:String,default:"",values:e=>e===""||U.includes(e)},activeColor:String,activeTextColor:String,gutter:String,padding:{type:String,default:"3px 2px"}},emits:["update:modelValue"],setup(e,{emit:d}){const{proxy:m}=ee(),{$q:b}=m,D=H(e,b),r=l(()=>parseInt(e.min,10)),n=l(()=>parseInt(e.max,10)),P=l(()=>parseInt(e.maxPages,10)),k=l(()=>c.value+" / "+n.value),N=l(()=>F(e.boundaryLinks,e.input)),u=l(()=>F(e.boundaryNumbers,!e.input)),O=l(()=>F(e.directionLinks,e.input)),i=l(()=>F(e.ellipses,!e.input)),o=J(null),c=l({get:()=>e.modelValue,set:t=>{if(t=parseInt(t,10),e.disable||isNaN(t))return;const a=ae(t,r.value,n.value);e.modelValue!==a&&d("update:modelValue",a)}});X(()=>`${r.value}|${n.value}`,()=>{c.value=e.modelValue});const S=l(()=>"q-pagination row no-wrap items-center"+(e.disable===!0?" disabled":"")),h=l(()=>e.gutter in w?`${w[e.gutter]}px`:e.gutter||null),s=l(()=>h.value!==null?`--q-pagination-gutter-parent:-${h.value};--q-pagination-gutter-child:${h.value}`:null),B=l(()=>{const t=[e.iconFirst||b.iconSet.pagination.first,e.iconPrev||b.iconSet.pagination.prev,e.iconNext||b.iconSet.pagination.next,e.iconLast||b.iconSet.pagination.last];return b.lang.rtl===!0?t.reverse():t}),I=l(()=>({"aria-disabled":e.disable===!0?"true":"false",role:"navigation"})),T=l(()=>Y(e,"flat")),$=l(()=>({[T.value]:!0,round:e.round,rounded:e.rounded,padding:e.padding,color:e.color,textColor:e.textColor,size:e.size,ripple:e.ripple!==null?e.ripple:!0})),A=l(()=>{const t={[T.value]:!1};return e.activeDesign!==""&&(t[e.activeDesign]=!0),t}),E=l(()=>({...A.value,color:e.activeColor||e.color,textColor:e.activeTextColor||e.textColor})),x=l(()=>{let t=Math.max(P.value,1+(i.value?2:0)+(u.value?2:0));const a={pgFrom:r.value,pgTo:n.value,ellipsesStart:!1,ellipsesEnd:!1,boundaryStart:!1,boundaryEnd:!1,marginalStyle:{minWidth:`${Math.max(2,String(n.value).length)}em`}};return P.value&&t<n.value-r.value+1&&(t=1+Math.floor(t/2)*2,a.pgFrom=Math.max(r.value,Math.min(n.value-t+1,e.modelValue-Math.floor(t/2))),a.pgTo=Math.min(n.value,a.pgFrom+t-1),u.value&&(a.boundaryStart=!0,a.pgFrom++),i.value&&a.pgFrom>r.value+(u.value?1:0)&&(a.ellipsesStart=!0,a.pgFrom++),u.value&&(a.boundaryEnd=!0,a.pgTo--),i.value&&a.pgTo<n.value-(u.value?1:0)&&(a.ellipsesEnd=!0,a.pgTo--)),a});function q(t){c.value=t}function L(t){c.value=c.value+t}const z=l(()=>{function t(){c.value=o.value,o.value=null}return{"onUpdate:modelValue":a=>{o.value=a},onKeyup:a=>{Z(a,13)===!0&&t()},onBlur:t}});function v(t,a,C){const f={"aria-label":a,"aria-current":"false",...$.value,...t};return C===!0&&Object.assign(f,{"aria-current":"true",...E.value}),a!==void 0&&(e.toFn!==void 0?f.to=e.toFn(a):f.onClick=()=>{q(a)}),y(j,f)}return Object.assign(m,{set:q,setByOffset:L}),()=>{const t=[],a=[];let C;if(N.value===!0&&(t.push(v({key:"bls",disable:e.disable||e.modelValue<=r.value,icon:B.value[0]},r.value)),a.unshift(v({key:"ble",disable:e.disable||e.modelValue>=n.value,icon:B.value[3]},n.value))),O.value===!0&&(t.push(v({key:"bdp",disable:e.disable||e.modelValue<=r.value,icon:B.value[1]},e.modelValue-1)),a.unshift(v({key:"bdn",disable:e.disable||e.modelValue>=n.value,icon:B.value[2]},e.modelValue+1))),e.input!==!0){C=[];const{pgFrom:f,pgTo:M,marginalStyle:V}=x.value;if(x.value.boundaryStart===!0){const g=r.value===e.modelValue;t.push(v({key:"bns",style:V,disable:e.disable,label:r.value},r.value,g))}if(x.value.boundaryEnd===!0){const g=n.value===e.modelValue;a.unshift(v({key:"bne",style:V,disable:e.disable,label:n.value},n.value,g))}x.value.ellipsesStart===!0&&t.push(v({key:"bes",style:V,disable:e.disable,label:"\u2026",ripple:!1},f-1)),x.value.ellipsesEnd===!0&&a.unshift(v({key:"bee",style:V,disable:e.disable,label:"\u2026",ripple:!1},M+1));for(let g=f;g<=M;g++)C.push(v({key:`bpg${g}`,style:V,disable:e.disable,label:g},g,g===e.modelValue))}return y("div",{class:S.value,...I.value},[y("div",{class:"q-pagination__content row no-wrap items-center",style:s.value},[...t,e.input===!0?y(p,{class:"inline",style:{width:`${k.value.length/1.5}em`},type:"number",dense:!0,value:o.value,disable:e.disable,dark:D.value,borderless:!0,inputClass:e.inputClass,inputStyle:e.inputStyle,placeholder:k.value,min:r.value,max:n.value,...z.value}):y("div",{class:"q-pagination__middle row justify-center"},C),...a])])}}});export{ie as Q,oe as a};
