import{E as L,N as H,O as Z,c as v,G as h,H as V,L as J,Z as W,r as _,y as O,a6 as X,a5 as Y,av as ee,P as te,o as m,m as M,h as u,w as l,Q as C,j as n,F as P,A as j,a as S,e as k,t as x,f as Q,k as R,aC as K,p as E,u as G}from"./index.dce5c937.js";import{T as ae,R as le,O as ne,f as se}from"./searchAPI.f1a92fe3.js";import{c as F,u as oe}from"./axios.920b0171.js";import{o as re}from"./index.db429e6d.js";import{u as ie}from"./System.3e9c461a.js";var ue=L({name:"QBanner",props:{...H,inlineActions:Boolean,dense:Boolean,rounded:Boolean},setup(e,{slots:o}){const{proxy:{$q:c}}=J(),y=Z(e,c),r=v(()=>"q-banner row items-center"+(e.dense===!0?" q-banner--dense":"")+(y.value===!0?" q-banner--dark q-dark":"")+(e.rounded===!0?" rounded-borders":"")),d=v(()=>`q-banner__actions row items-center justify-end col-${e.inlineActions===!0?"auto":"all"}`);return()=>{const b=[h("div",{class:"q-banner__avatar col-auto row items-center self-start"},V(o.avatar)),h("div",{class:"q-banner__content col text-body2"},V(o.default))],g=V(o.action);return g!==void 0&&b.push(h("div",{class:d.value},g)),h("div",{class:r.value+(e.inlineActions===!1&&g!==void 0?" q-banner--top-padding":""),role:"alert"},b)}}});const de=["top","middle","bottom"];var ce=L({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:e=>de.includes(e)}},setup(e,{slots:o}){const c=v(()=>e.align!==void 0?{verticalAlign:e.align}:null),y=v(()=>{const r=e.outline===!0&&e.color||e.textColor;return`q-badge flex inline items-center no-wrap q-badge--${e.multiLine===!0?"multi":"single"}-line`+(e.outline===!0?" q-badge--outline":e.color!==void 0?` bg-${e.color}`:"")+(r!==void 0?` text-${r}`:"")+(e.floating===!0?" q-badge--floating":"")+(e.rounded===!0?" q-badge--rounded":"")+(e.transparent===!0?" q-badge--transparent":"")});return()=>h("div",{class:y.value,style:c.value,role:"status","aria-label":e.label},W(o.default,e.label!==void 0?[e.label]:[]))}}),U=L({name:"QSplitter",props:{...H,modelValue:{type:Number,required:!0},reverse:Boolean,unit:{type:String,default:"%",validator:e=>["%","px"].includes(e)},limits:{type:Array,validator:e=>e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"?!1:e[0]>=0&&e[0]<=e[1]},emitImmediately:Boolean,horizontal:Boolean,disable:Boolean,beforeClass:[Array,String,Object],afterClass:[Array,String,Object],separatorClass:[Array,String,Object],separatorStyle:[Array,String,Object]},emits:["update:modelValue"],setup(e,{slots:o,emit:c}){const{proxy:{$q:y}}=J(),r=Z(e,y),d=_(null),b={before:_(null),after:_(null)},g=v(()=>`q-splitter no-wrap ${e.horizontal===!0?"q-splitter--horizontal column":"q-splitter--vertical row"} q-splitter--${e.disable===!0?"disabled":"workable"}`+(r.value===!0?" q-splitter--dark":"")),w=v(()=>e.horizontal===!0?"height":"width"),B=v(()=>e.reverse!==!0?"before":"after"),q=v(()=>e.limits!==void 0?e.limits:e.unit==="%"?[10,90]:[50,1/0]);function z(t){return(e.unit==="%"?t:Math.round(t))+e.unit}const T=v(()=>({[B.value]:{[w.value]:z(e.modelValue)}}));let $,p,D,N,f;function A(t){if(t.isFirst===!0){const I=d.value.getBoundingClientRect()[w.value];$=e.horizontal===!0?"up":"left",p=e.unit==="%"?100:I,D=Math.min(p,q.value[1],Math.max(q.value[0],e.modelValue)),N=(e.reverse!==!0?1:-1)*(e.horizontal===!0?1:y.lang.rtl===!0?-1:1)*(e.unit==="%"?I===0?0:100/I:1),d.value.classList.add("q-splitter--active");return}if(t.isFinal===!0){f!==e.modelValue&&c("update:modelValue",f),d.value.classList.remove("q-splitter--active");return}const i=D+N*(t.direction===$?-1:1)*t.distance[e.horizontal===!0?"y":"x"];f=Math.min(p,q.value[1],Math.max(q.value[0],i)),b[B.value].value.style[w.value]=z(f),e.emitImmediately===!0&&e.modelValue!==f&&c("update:modelValue",f)}const a=v(()=>[[ae,A,void 0,{[e.horizontal===!0?"vertical":"horizontal"]:!0,prevent:!0,stop:!0,mouse:!0,mouseAllDir:!0}]]);function s(t,i){t<i[0]?c("update:modelValue",i[0]):t>i[1]&&c("update:modelValue",i[1])}return O(()=>e.modelValue,t=>{s(t,q.value)}),O(()=>e.limits,()=>{Y(()=>{s(e.modelValue,q.value)})}),()=>{const t=[h("div",{ref:b.before,class:["q-splitter__panel q-splitter__before"+(e.reverse===!0?" col":""),e.beforeClass],style:T.value.before},V(o.before)),h("div",{class:["q-splitter__separator",e.separatorClass],style:e.separatorStyle,"aria-disabled":e.disable===!0?"true":void 0},[X("div",{class:"q-splitter__separator-area absolute-full"},V(o.separator),"sep",e.disable!==!0,()=>a.value)]),h("div",{ref:b.after,class:["q-splitter__panel q-splitter__after"+(e.reverse===!0?"":" col"),e.afterClass],style:T.value.after},V(o.after))];return h("div",{class:g.value,ref:d},W(o.default,t))}}});const me=async()=>{const e=await F().get("/api/typeSizeMap");return e&&e.data},fe=async()=>{const e=await F().get("/api/tagSizeMap");return e&&e.data},ve=async()=>{const e=await F().get("/api/scanTime");return e&&e.data},ye=n("div",{class:"text-h5 q-pa-md"},"\u6587\u4EF6\u626B\u63CF\u5206\u6790",-1),_e={class:"q-pa-md"},he=n("div",{class:"text-h5 q-mb-md"},"\u6807\u7B7E\u5206\u5E03",-1),be={class:"q-gutter-sm",style:{display:"flex","flex-direction":"row","flex-wrap":"wrap","justify-content":"flex-start"}},ge={class:"q-pa-md"},qe=n("div",{class:"text-h5 q-mb-md"},"\u626B\u63CF\u5206\u6790",-1),xe={class:"row justify-center q-gutter-sm"},Ce={class:"text-h6"},we={class:"text-subtitle2"},Se={class:"text-subtitle2"},ke={class:"q-pa-md"},Ve=n("div",{class:"text-h5 q-mb-md"},"\u6587\u4EF6\u5206\u6790",-1),Be={class:"row justify-center q-gutter-sm"},ze={class:"text-h6"},pe={class:"text-subtitle2"},Me={class:"text-subtitle2"},Te={style:{display:"flex","flex-direction":"row","justify-content":"space-around"}},Ie={__name:"IndexPage",setup(e){const o=_(50),c=_(50),{push:y}=ee(),r=ie();document.title="\u5206\u6790";const d=oe(),b=_(!1),g=_([]),w=_([]),B=_([]);re(["`"],()=>{f()});const q=a=>{r.setPage(1),r.FileSearchParam.Keyword=a,r.setMovieType(""),y("/search?from=index")},z=a=>{const{IsDir:s,Name:t}=a,i=!s&&t!=="\u5168\u90E8"?t:"";r.setPage(1),s&&r.setKeyword(t),r.setMovieType(i),y("/search?from=index")},T=async()=>{const a=await me();a&&(g.value=a,$(),p())},$=async()=>{const a=await fe();a&&(w.value=a)},p=async()=>{const a=await ve();B.value=a};te(()=>{T()});const D=async a=>{const{Name:s}=a;(await ne({dirpath:s})).Code==200?d.notify({type:"positive",message:"\u6267\u884C\u6210\u529F"}):d.notify({type:"warning",message:"\u6267\u884C\u5931\u8D25"})},N=async a=>{const{Name:s}=a;(await se({dirpath:s})).Code==200?(d.notify({type:"positive",message:"\u6267\u884C\u6210\u529F"}),f()):d.notify({type:"warning",message:"\u6267\u884C\u5931\u8D25"})},f=async()=>{const{data:a}=await le();console.log(a),a.Code==200?A():d.notify({type:"warning",message:a.Message})},A=()=>{window.location.reload()};return(a,s)=>(m(),M("div",null,[u(ue,{"inline-actions":"",rounded:"",class:"bg-blue text-white q-mt-sd",style:{position:"relative"}},{action:l(()=>[u(C,{style:{background:"#ff0080",color:"white"},label:"\u626B\u63CF",icon:"search",loading:b.value,size:"small",onClick:s[0]||(s[0]=t=>f())},null,8,["loading"]),u(C,{color:"green",class:"q-ml-md",label:"\u5237\u65B0",icon:"refresh",onClick:A})]),default:l(()=>[ye]),_:1}),u(U,{modelValue:o.value,"onUpdate:modelValue":s[2]||(s[2]=t=>o.value=t)},{before:l(()=>[n("div",_e,[he,n("div",be,[(m(!0),M(P,null,j(w.value,t=>(m(),M("div",{key:t,style:{width:"auto"}},[t.Cnt>1?(m(),S(C,{key:0,color:"secondary",class:"btn-fixed-width",onClick:i=>q(t.Name)},{default:l(()=>[k(x(`${t.Name} (${t.Cnt})`)+" ",1),u(ce,{color:"orange",floating:""},{default:l(()=>[k(x(t.SizeStr),1)]),_:2},1024)]),_:2},1032,["onClick"])):Q("",!0)]))),128))])])]),after:l(()=>[u(U,{modelValue:c.value,"onUpdate:modelValue":s[1]||(s[1]=t=>c.value=t),horizontal:""},{before:l(()=>[n("div",ge,[qe,n("div",xe,[(m(!0),M(P,null,j(B.value,t=>(m(),S(G,{class:"my-card",key:t},{default:l(()=>[u(R,null,{default:l(()=>[n("div",Ce,x(t.Name),1),n("div",we,"\u65F6\u95F4\uFF1A"+x(t.Cnt),1),n("div",Se,"\u6587\u4EF6\u6570\uFF1A"+x(t.Size),1)]),_:2},1024),u(K),u(E,{vertical:""},{default:l(()=>[u(C,{flat:"",color:"blue",onClick:i=>z({...t,IsDir:!0})},{default:l(()=>[k("\u4F20\u9001")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128))])])]),after:l(()=>[n("div",ke,[Ve,n("div",Be,[(m(!0),M(P,null,j(g.value,t=>(m(),S(G,{class:"my-card",key:t},{default:l(()=>[u(R,null,{default:l(()=>[n("div",ze,x(t.Name),1),n("div",pe,"\u6587\u4EF6\u6570\uFF1A"+x(t.Cnt),1),n("div",Me,"\u6587\u4EF6\u5927\u5C0F\uFF1A"+x(t.SizeStr),1)]),_:2},1024),u(K),u(E,{vertical:""},{default:l(()=>[n("div",Te,[t.IsDir?Q("",!0):(m(),S(C,{key:0,color:"blue",flat:"",onClick:i=>z(t)},{default:l(()=>[k("\u4F20\u9001")]),_:2},1032,["onClick"])),t.IsDir?(m(),S(C,{key:1,color:"blue",flat:"",onClick:i=>D(t)},{default:l(()=>[k("\u6253\u5F00")]),_:2},1032,["onClick"])):Q("",!0),t.IsDir?(m(),S(C,{key:2,color:"red",flat:"",onClick:i=>N(t)},{default:l(()=>[k("\u5220\u9664")]),_:2},1032,["onClick"])):Q("",!0)])]),_:2},1024)]),_:2},1024))),128))])])]),_:1},8,["modelValue"])]),_:1},8,["modelValue"])]))}};export{Ie as default};
