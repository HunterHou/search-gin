import{E as b,u as a,G as n,H as _,P as y,aZ as C,R as x,a_ as R,$ as Q,N as $,Q as r,a$ as w,ar as I,af as z}from"./index.6b10a76a.js";var V=b({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(e,{slots:c}){const o=a(()=>{const l=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(i=>e[i]===!0).map(i=>`q-btn-group--${i}`).join(" ");return`q-btn-group row no-wrap${l.length!==0?" "+l:""}`+(e.spread===!0?" q-btn-group--spread":" inline")});return()=>n("div",{class:o.value},_(c.default))}});const D={xs:8,sm:10,md:14,lg:20,xl:24};var j=b({name:"QChip",props:{...y,...C,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:c,emit:o}){const{proxy:{$q:l}}=$(),i=x(e,l),m=R(e,D),f=a(()=>e.selected===!0||e.icon!==void 0),q=a(()=>e.selected===!0?e.iconSelected||l.iconSet.chip.selected:e.icon),g=a(()=>e.iconRemove||l.iconSet.chip.remove),u=a(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),B=a(()=>{const t=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(t?` text-${t} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(u.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(i.value===!0?" q-chip--dark q-dark":"")}),d=a(()=>{const t=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},s={...t,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||l.lang.label.remove};return{chip:t,remove:s}});function S(t){t.keyCode===13&&h(t)}function h(t){e.disable||(o("update:selected",!e.selected),o("click",t))}function v(t){(t.keyCode===void 0||t.keyCode===13)&&(z(t),e.disable===!1&&(o("update:modelValue",!1),o("remove")))}function k(){const t=[];u.value===!0&&t.push(n("div",{class:"q-focus-helper"})),f.value===!0&&t.push(n(r,{class:"q-chip__icon q-chip__icon--left",name:q.value}));const s=e.label!==void 0?[n("div",{class:"ellipsis"},[e.label])]:void 0;return t.push(n("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},w(c.default,s))),e.iconRight&&t.push(n(r,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&t.push(n(r,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:g.value,...d.value.remove,onClick:v,onKeyup:v})),t}return()=>{if(e.modelValue===!1)return;const t={class:B.value,style:m.value};return u.value===!0&&Object.assign(t,d.value.chip,{onClick:h,onKeyup:S}),Q("div",t,k(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[I,e.ripple]])}}});export{j as Q,V as a};
