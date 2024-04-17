import{E as S,c as l,G as s,H as k,N as $,b9 as C,O as _,ba as w,a6 as Q,L as B,aw as q,bb as R,ax as O,al as P,i as z,I as y,M as I}from"./index.190a0fa9.js";var A=S({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(e,{slots:d}){const a=l(()=>{const i=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(n=>e[n]===!0).map(n=>`q-btn-group--${n}`).join(" ");return`q-btn-group row no-wrap${i.length!==0?" "+i:""}`+(e.spread===!0?" q-btn-group--spread":" inline")});return()=>s("div",{class:a.value},k(d.default))}});const L={xs:8,sm:10,md:14,lg:20,xl:24};var D=S({name:"QChip",props:{...$,...C,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:d,emit:a}){const{proxy:{$q:i}}=B(),n=_(e,i),f=w(e,L),v=l(()=>e.selected===!0||e.icon!==void 0),h=l(()=>e.selected===!0?e.iconSelected||i.iconSet.chip.selected:e.icon),m=l(()=>e.iconRemove||i.iconSet.chip.remove),b=l(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),p=l(()=>{const t=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(t?` text-${t} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(b.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(n.value===!0?" q-chip--dark q-dark":"")}),o=l(()=>{const t=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},x={...t,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||i.lang.label.remove};return{chip:t,remove:x}});function c(t){t.keyCode===13&&r(t)}function r(t){e.disable||(a("update:selected",!e.selected),a("click",t))}function g(t){(t.keyCode===void 0||t.keyCode===13)&&(P(t),e.disable===!1&&(a("update:modelValue",!1),a("remove")))}function u(){const t=[];b.value===!0&&t.push(s("div",{class:"q-focus-helper"})),v.value===!0&&t.push(s(q,{class:"q-chip__icon q-chip__icon--left",name:h.value}));const x=e.label!==void 0?[s("div",{class:"ellipsis"},[e.label])]:void 0;return t.push(s("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},R(d.default,x))),e.iconRight&&t.push(s(q,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&t.push(s(q,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:m.value,...o.value.remove,onClick:g,onKeyup:g})),t}return()=>{if(e.modelValue===!1)return;const t={class:p.value,style:f.value};return b.value===!0&&Object.assign(t,o.value.chip,{onClick:r,onKeyup:c}),Q("div",t,u(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[O,e.ripple]])}}});const V={position:{type:String,default:"bottom-right",validator:e=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(e)},offset:{type:Array,validator:e=>e.length===2},expand:Boolean};function G(){const{props:e,proxy:{$q:d}}=B(),a=z(I,y);if(a===y)return console.error("QPageSticky needs to be child of QLayout"),y;const i=l(()=>{const o=e.position;return{top:o.indexOf("top")>-1,right:o.indexOf("right")>-1,bottom:o.indexOf("bottom")>-1,left:o.indexOf("left")>-1,vertical:o==="top"||o==="bottom",horizontal:o==="left"||o==="right"}}),n=l(()=>a.header.offset),f=l(()=>a.right.offset),v=l(()=>a.footer.offset),h=l(()=>a.left.offset),m=l(()=>{let o=0,c=0;const r=i.value,g=d.lang.rtl===!0?-1:1;r.top===!0&&n.value!==0?c=`${n.value}px`:r.bottom===!0&&v.value!==0&&(c=`${-v.value}px`),r.left===!0&&h.value!==0?o=`${g*h.value}px`:r.right===!0&&f.value!==0&&(o=`${-g*f.value}px`);const u={transform:`translate(${o}, ${c})`};return e.offset&&(u.margin=`${e.offset[1]}px ${e.offset[0]}px`),r.vertical===!0?(h.value!==0&&(u[d.lang.rtl===!0?"right":"left"]=`${h.value}px`),f.value!==0&&(u[d.lang.rtl===!0?"left":"right"]=`${f.value}px`)):r.horizontal===!0&&(n.value!==0&&(u.top=`${n.value}px`),v.value!==0&&(u.bottom=`${v.value}px`)),u}),b=l(()=>`q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand===!0?"expand":"shrink"}`);function p(o){const c=k(o.default);return s("div",{class:b.value,style:m.value},e.expand===!0?c:[s("div",c)])}return{$layout:a,getStickyContent:p}}export{D as Q,G as a,A as b,V as u};
