import{c as v,a as o,h as g,d as b,u as k,s as P,g as f,r as p,w as Q,a6 as _,a7 as B}from"./index.b26dd352.js";import{u as S,b as I,c as L}from"./QMenu.5489355c.js";var j=v({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:s}){const a=o(()=>parseInt(e.lines,10)),r=o(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(a.value===1?" ellipsis":"")),n=o(()=>e.lines!==void 0&&a.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":a.value}:null);return()=>g("div",{style:n.value,class:r.value},b(s.default))}}),M=v({name:"QList",props:{...k,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:s}){const a=f(),r=P(e,a.proxy.$q),n=o(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(r.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>g(e.tag,{class:n.value},b(s.default))}}),A=v({name:"QPopupProxy",props:{...S,breakpoint:{type:[String,Number],default:450}},emits:["show","hide"],setup(e,{slots:s,emit:a,attrs:r}){const{proxy:n}=f(),{$q:h}=n,i=p(!1),l=p(null),m=o(()=>parseInt(e.breakpoint,10)),{canShow:w}=I({showing:i});function c(){return h.screen.width<m.value||h.screen.height<m.value?"dialog":"menu"}const u=p(c()),q=o(()=>u.value==="menu"?{maxHeight:"99vh"}:{});Q(()=>c(),t=>{i.value!==!0&&(u.value=t)});function x(t){i.value=!0,a("show",t)}function y(t){i.value=!1,u.value=c(),a("hide",t)}return Object.assign(n,{show(t){w(t)===!0&&l.value.show(t)},hide(t){l.value.hide(t)},toggle(t){l.value.toggle(t)}}),_(n,"currentComponent",()=>({type:u.value,ref:l.value})),()=>{const t={ref:l,...q.value,...r,onShow:x,onHide:y};let d;return u.value==="dialog"?d=B:(d=L,Object.assign(t,{target:e.target,contextMenu:e.contextMenu,noParentEvent:!0,separateClosePopup:!0})),g(d,t,s.default)}}});export{j as Q,M as a,A as b};
