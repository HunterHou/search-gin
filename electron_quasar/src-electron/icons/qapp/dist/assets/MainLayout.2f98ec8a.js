import{d as z,o as i,c as p,w as t,a as e,Q as W,e as k,f,t as _,r as S,g as J,h as L,i as K,j as x,k as y,l as b,m as O,n as T,p as m,q as X,s as Y,u as h,v as Z,x as ee,y as te,F as H,z as R,A as oe,B as q,C as u,D as le}from"./index.6cbd7867.js";import{Q as N,a as ne,b as ae,c as se,d as re,e as U,f as de,P as ue,g as ie}from"./PlayingVideo.3079ed9f.js";import{C as B,Q as ce}from"./ClosePopup.f55c0d39.js";import{u as A}from"./System.62413352.js";import{u as me}from"./index.cbe10a33.js";import{Q as fe,a as pe}from"./QTooltip.e47ba4b9.js";import{G as I}from"./settingAPI.0dac8b58.js";import"./index.9cd9b2eb.js";import"./QChip.b4d308f7.js";import"./searchAPI.5cbd0ee6.js";import"./axios.ecb6ef83.js";const G=z({__name:"EssentialLink",props:{title:{},caption:{default:""},link:{default:"#"},icon:{default:""}},setup(C){return(o,r)=>(i(),p(fe,{clickable:"",tag:"a",target:"_self",to:o.link},{default:t(()=>[e(pe,null,{default:t(()=>[e(N,null,{default:t(()=>[o.icon?(i(),p(W,{key:0,name:o.icon},null,8,["name"])):k("",!0),f(_(o.title),1)]),_:1})]),_:1})]),_:1},8,["to"]))}});const we={style:{width:"240px",padding:"10px"}},he=L("div",{class:"text-h6"},"\u5173\u673A\u8BBE\u7F6E",-1),ye={class:"q-gutter-sm"},ve={key:0,style:{display:"flex","flex-direction":"row","justify-content":"space-between"}},ge={__name:"ShutdownComponent",setup(C,{expose:o}){const r=S(!1),d=A(),l=J({shutdownHH:0,shutdownMM:0,shutdownSS:0,shutdownType:"now",shutdownTime:new Date}),V=()=>{r.value=!0},Q=()=>{r.value=!1},v=()=>{clearTimeout(d.shutdownTimer),console.log("view.shutdownType",l.shutdownType),l.shutdownType=="now"?(console.log("GetShutDown now"),I()):(d.shutdownLeftSecond=(l.shutdownHH||0)*3600+(l.shutdownMM||0)*60+(l.shutdownSS||0),console.log("shutdownLeftSecond",d.shutdownLeftSecond),d.shutdownTimer=setInterval(()=>{console.log(d.shutdownLeftSecond),d.shutdownLeftSecond=d.shutdownLeftSecond-1,d.shutdownLeftSecond<0&&(clearTimeout(d.shutdownTimer),I(),console.log("GetShutDown timeout"))},1e3))};return o({open:V,close:Q}),(g,n)=>(i(),p(Y,{modelValue:r.value,"onUpdate:modelValue":n[5]||(n[5]=s=>r.value=s),title:"\u5173\u673A\u8BBE\u7F6E"},{default:t(()=>[e(X,{class:"my-card"},{default:t(()=>[L("div",we,[he,e(K,{class:"q-pt-none"},{default:t(()=>[L("div",ye,[e(x,{modelValue:l.shutdownType,"onUpdate:modelValue":n[0]||(n[0]=s=>l.shutdownType=s),val:"now",label:"\u7ACB\u5373"},null,8,["modelValue"]),e(x,{modelValue:l.shutdownType,"onUpdate:modelValue":n[1]||(n[1]=s=>l.shutdownType=s),val:"target",label:"\u5B9A\u65F6"},null,8,["modelValue"])]),l.shutdownType=="target"?(i(),y("div",ve,[e(b,{class:"timeSelect",modelValue:l.shutdownHH,"onUpdate:modelValue":n[2]||(n[2]=s=>l.shutdownHH=s)},null,8,["modelValue"]),e(b,{class:"timeSelect",modelValue:l.shutdownMM,"onUpdate:modelValue":n[3]||(n[3]=s=>l.shutdownMM=s)},null,8,["modelValue"]),e(b,{class:"timeSelect",modelValue:l.shutdownSS,"onUpdate:modelValue":n[4]||(n[4]=s=>l.shutdownSS=s)},null,8,["modelValue"])])):k("",!0)]),_:1})]),e(O,{align:"right"},{default:t(()=>[T((i(),p(m,{flat:"",color:"primary"},{default:t(()=>[f("\u53D6\u6D88")]),_:1})),[[B]]),T((i(),p(m,{flat:"",color:"primary",onClick:v},{default:t(()=>[f("\u786E\u5B9A")]),_:1})),[[B]])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}},_e={key:0},$e={__name:"MainLayout",setup(C){const o=A(),r=me(),d=S(null),l=h(()=>r.screen.width>1e3),V=h(()=>r.platform.is.mobile?r.screen.width:r.screen.width/2),Q=h(()=>o.Playing||{}),v=h(()=>o.shutdownLeftSecond?`${Math.floor(o.shutdownLeftSecond/3600)} \u65F6 ${Math.floor(o.shutdownLeftSecond/60%60)} \u5206 ${Math.floor(o.shutdownLeftSecond%60)} \u79D2`:null),g=S(null);Z(Q,w=>{w&&w.Id?g.value.open(w):g.value.stop()});const n=S(!1),s=h(()=>ee().path),j=()=>{window.location.reload()},E=()=>{d.value.open()},P=[{title:"\u9996\u9875",caption:"quasar.dev",icon:"home",link:"/"},{title:"\u641C\u7D22",caption:"github.com/quasarframework",icon:"search",link:"/search"},{title:"\u56FE\u9274",caption:"chat.quasar.dev",icon:"image",link:"/picture"},{title:"\u8BBE\u7F6E",caption:"chat.quasar.dev",icon:"settings",link:"/setting"},{title:"\u7CFB\u7EDF",caption:"forum.quasar.dev",icon:"chat",link:"/system"}];return(w,c)=>{const F=te("router-view");return i(),y("div",null,[e(ne,{view:"LHR lpr lfr",container:"",style:{height:"100vh"},class:"shadow-2 rounded-borders"},{default:t(()=>[e(ae,{reveal:"",class:"bg-black"},{default:t(()=>[e(se,null,{default:t(()=>[e(m,{flat:"",onClick:c[0]||(c[0]=a=>n.value=!n.value),round:"",dense:"",icon:"menu"}),e(re,{style:{"-webkit-app-region":"drag"}},{default:t(()=>[f(" \u6587\u4EF6\u641C\u7D22"),e(m,{dense:"",flat:"",icon:"refresh",onClick:j})]),_:1}),(i(),y(H,null,R(P,a=>T(e(G,q({key:a.title},a,{style:{color:s.value===a.link?"red":"",scale:1.2}}),null,16,["style"]),[[oe,l.value]])),64)),v.value?(i(),p(m,{key:0,dense:"",flat:"",color:"red"},{default:t(()=>[f("\u5173\u673A\u5012\u8BA1\u65F6\uFF1A"+_(v.value),1)]),_:1})):k("",!0),e(ce),e(m,{onClick:c[1]||(c[1]=a=>u(r).dark.set(!u(r).dark.mode)),dense:"",flat:"",color:"red"},{default:t(()=>[f(_(u(r).dark.mode?"\u81EA\u7136":"\u6697\u9ED1"),1)]),_:1}),e(m,{color:"green",flat:"",onClick:c[2]||(c[2]=a=>u(o).drawerRight=!u(o).drawerRight),round:"",dense:"",icon:"menu"},{default:t(()=>{var a,M,D,$;return[u(o).drawerRight?(i(),y("span",_e,_(`${u(o)&&((M=(a=u(o).Playing)==null?void 0:a.Code)==null?void 0:M.substring(0,8))||(($=(D=u(o).Playing)==null?void 0:D.Title)==null?void 0:$.substring(0,8))}`),1)):k("",!0)]}),_:1}),e(m,{dense:"",flat:"",icon:"ti-timer",onClick:E})]),_:1})]),_:1}),e(U,{modelValue:n.value,"onUpdate:modelValue":c[3]||(c[3]=a=>n.value=a),width:200,breakpoint:700,bordered:""},{default:t(()=>[e(le,{class:"fit"},{default:t(()=>[e(de,null,{default:t(()=>[e(N,{header:""},{default:t(()=>[f(" \u4F60\u7684\u641C\u7D22\u5DE5\u5177 ")]),_:1}),(i(),y(H,null,R(P,a=>e(G,q({key:a.title},a,{style:{color:s.value===a.link?"red":"",scale:1.2}}),null,16,["style"])),64))]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(U,{side:"right",width:V.value,modelValue:u(o).drawerRight,"onUpdate:modelValue":c[4]||(c[4]=a=>u(o).drawerRight=a),bordered:"",class:"bg-grey-3"},{default:t(()=>[e(ue,{ref_key:"vue3VideoPlayRef",ref:g,mode:"drawer"},null,512)]),_:1},8,["width","modelValue"]),e(ie,null,{default:t(()=>[e(F)]),_:1})]),_:1}),e(ge,{ref_key:"shutdown",ref:d},null,512)])}}};export{$e as default};