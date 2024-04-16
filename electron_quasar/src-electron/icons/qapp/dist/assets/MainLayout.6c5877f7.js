import{d as Y,o as u,a as m,w as l,Q as r,e as y,t as N,f as g,r as v,g as E,h as e,j as C,k as Z,l as P,m as _,n as S,p as ee,s as Q,u as te,v as oe,c as h,x as le,y as H,z as ne,F as q,A as U,B as se,C as R,D as V}from"./index.940a83ae.js";import{Q as ae,a as re,b as ue,c as de,d as ie,e as $,f as ce,g as fe,h as me,P as pe,i as we}from"./PlayingVideo.3b5fdf09.js";import{u as G}from"./System.246d9fda.js";import{u as he}from"./axios.f25db47e.js";import{Q as ye}from"./QMenu.ed7ab857.js";import{C as B,_ as ve}from"./ListEdit.020225b1.js";import{G as z}from"./settingAPI.3be68499.js";import{o as ge}from"./index.25a65a1d.js";import"./index.55b978f2.js";import"./use-page-sticky.580f484d.js";import"./searchAPI.4a67ccbb.js";import"./Setting.b7cdeb97.js";import"./use-dialog-plugin-component.321ed723.js";const I=Y({__name:"EssentialLink",props:{title:{},caption:{default:""},link:{default:"#"},icon:{default:""}},setup(L){return(d,i)=>(u(),m(ye,{clickable:"",tag:"a",target:"_self",to:d.link,style:{padding:"0"}},{default:l(()=>[d.icon?(u(),m(r,{key:0,style:{margin:"1px  8px"},flat:"",dense:"",icon:d.icon},{default:l(()=>[y(N(d.title),1)]),_:1},8,["icon"])):g("",!0)]),_:1},8,["to"]))}});const ke={style:{width:"240px",padding:"10px"}},_e=C("div",{class:"text-h6"},"\u5173\u673A\u8BBE\u7F6E",-1),Se={class:"q-gutter-sm"},Ve={key:0,style:{display:"flex","flex-direction":"row","justify-content":"space-between"}},Ce={__name:"ShutdownComponent",setup(L,{expose:d}){const i=v(!1),o=G(),t=E({shutdownHH:0,shutdownMM:0,shutdownSS:0,shutdownType:"now",shutdownTime:new Date}),k=()=>{i.value=!0},w=()=>{i.value=!1},c=()=>{clearTimeout(o.shutdownTimer),console.log("view.shutdownType",t.shutdownType),t.shutdownType=="now"?(console.log("GetShutDown now"),z()):(o.shutdownLeftSecond=(t.shutdownHH||0)*3600+(t.shutdownMM||0)*60+(t.shutdownSS||0),console.log("shutdownLeftSecond",o.shutdownLeftSecond),o.shutdownTimer=setInterval(()=>{console.log(o.shutdownLeftSecond),o.shutdownLeftSecond=o.shutdownLeftSecond-1,o.shutdownLeftSecond<0&&(clearTimeout(o.shutdownTimer),z(),console.log("GetShutDown timeout"))},1e3))};return d({open:k,close:w}),(T,n)=>(u(),m(oe,{modelValue:i.value,"onUpdate:modelValue":n[5]||(n[5]=a=>i.value=a),title:"\u5173\u673A\u8BBE\u7F6E"},{default:l(()=>[e(te,{class:"my-card"},{default:l(()=>[C("div",ke,[_e,e(Z,{class:"q-pt-none"},{default:l(()=>[C("div",Se,[e(P,{modelValue:t.shutdownType,"onUpdate:modelValue":n[0]||(n[0]=a=>t.shutdownType=a),val:"now",label:"\u7ACB\u5373"},null,8,["modelValue"]),e(P,{modelValue:t.shutdownType,"onUpdate:modelValue":n[1]||(n[1]=a=>t.shutdownType=a),val:"target",label:"\u5B9A\u65F6"},null,8,["modelValue"])]),t.shutdownType=="target"?(u(),_("div",Ve,[e(S,{class:"timeSelect",modelValue:t.shutdownHH,"onUpdate:modelValue":n[2]||(n[2]=a=>t.shutdownHH=a)},null,8,["modelValue"]),e(S,{class:"timeSelect",modelValue:t.shutdownMM,"onUpdate:modelValue":n[3]||(n[3]=a=>t.shutdownMM=a)},null,8,["modelValue"]),e(S,{class:"timeSelect",modelValue:t.shutdownSS,"onUpdate:modelValue":n[4]||(n[4]=a=>t.shutdownSS=a)},null,8,["modelValue"])])):g("",!0)]),_:1})]),e(ee,{align:"right"},{default:l(()=>[Q((u(),m(r,{flat:"",color:"primary"},{default:l(()=>[y("\u53D6\u6D88")]),_:1})),[[B]]),Q((u(),m(r,{flat:"",color:"primary",onClick:c},{default:l(()=>[y("\u786E\u5B9A")]),_:1})),[[B]])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}},Be={__name:"MainLayout",setup(L){const d=v(null),i=v(null),o=G(),t=he(),k=v(null),w=v(!1),c=E({fullscreen:!1});ge(["ctrl","y"],()=>{D()});const T=h(()=>t.screen.width>1e3),n=h(()=>t.platform.is.electron),a=h(()=>t.platform.is.mobile?t.screen.width:t.screen.width/2),W=h(()=>o.Playing||{}),b=h(()=>le().path),D=()=>{d.value.open({tabName:"history"})},A=()=>{window.close()},F=()=>{window.electron.hideMainWindow()},j=()=>{o.isDark=!o.isDark},K=()=>{n.value?window.electron.maxMainWindow():c.fullscreen?t.fullscreen.exit():t.fullscreen.request(),c.fullscreen=!c.fullscreen},x=h(()=>o.shutdownLeftSecond?`${Math.floor(o.shutdownLeftSecond/3600)} \u65F6 ${Math.floor(o.shutdownLeftSecond/60%60)} \u5206 ${Math.floor(o.shutdownLeftSecond%60)} \u79D2`:null);H(W,p=>{p&&p.Id?i.value.open(p):i.value.stop()}),t.dark.set(o.isDark),H(()=>o.isDark,p=>{t.dark.set(p)});const J=()=>{window.location.reload()},O=()=>{k.value.open()},M=[{title:"\u9996\u9875",caption:"quasar.dev",icon:"home",link:"/"},{title:"\u641C\u7D22",caption:"github.com/quasarframework",icon:"search",link:"/search"},{title:"\u56FE\u9274",caption:"chat.quasar.dev",icon:"image",link:"/picture"},{title:"\u914D\u7F6E",caption:"chat.quasar.dev",icon:"settings",link:"/setting"},{title:"\u7CFB\u7EDF",caption:"forum.quasar.dev",icon:"chat",link:"/system"}];return(p,f)=>{const X=ne("router-view");return u(),_("div",null,[e(ae,{view:"hHh Lpr lff",style:{height:"100vh"},class:"shadow-2 rounded-borders"},{default:l(()=>[e(re,{reveal:"",class:"bg-black"},{default:l(()=>[e(ue,{class:"q-electron-drag"},{default:l(()=>[e(r,{flat:"",onClick:f[0]||(f[0]=s=>w.value=!w.value),round:"",dense:"",icon:"menu"}),e(de,{style:{"-webkit-app-region":"drag"}},{default:l(()=>[y(" \u6587\u4EF6\u641C\u7D22 ")]),_:1}),(u(),_(q,null,U(M,s=>Q(e(I,R({key:s.title},s,{style:{color:b.value===s.link?"red":"",scale:1.2}}),null,16,["style"]),[[se,T.value]])),64)),e(ie),x.value?(u(),m(r,{key:0,dense:"",flat:"",color:"red"},{default:l(()=>[y("\u5173\u673A\u5012\u8BA1\u65F6\uFF1A"+N(x.value),1)]),_:1})):g("",!0),e(r,{dense:"",flat:"",size:"lg",icon:"refresh",onClick:J}),e(r,{dense:"",flat:"",size:"md",icon:"ti-settings",onClick:D}),e(r,{dense:"",flat:"",icon:"ti-na",onClick:O}),e(r,{onClick:j,dense:"",icon:"ti-reload",flat:"",color:V(t).dark.mode?"white":"grey"},null,8,["color"]),n.value?(u(),m(r,{key:1,dense:"",flat:"",icon:"ti-minus",onClick:F})):g("",!0),e(r,{flat:"",dense:"",size:"lg",icon:c.fullscreen?"fullscreen_exit":"fullscreen",modelValue:c.fullscreen,"onUpdate:modelValue":f[1]||(f[1]=s=>c.fullscreen=s),onClick:K},null,8,["icon","modelValue"]),n.value?(u(),m(r,{key:2,dense:"",flat:"",size:"lg",icon:"ti-close",onClick:A})):g("",!0)]),_:1})]),_:1}),e($,{modelValue:w.value,"onUpdate:modelValue":f[2]||(f[2]=s=>w.value=s),width:200,breakpoint:700,bordered:""},{default:l(()=>[e(ce,{class:"fit"},{default:l(()=>[e(fe,null,{default:l(()=>[e(me,{header:""},{default:l(()=>[y(" \u4F60\u7684\u641C\u7D22\u5DE5\u5177 ")]),_:1}),(u(),_(q,null,U(M,s=>e(I,R({key:s.title},s,{style:{color:b.value===s.link?"red":"",scale:1.2}}),null,16,["style"])),64))]),_:1})]),_:1})]),_:1},8,["modelValue"]),e($,{side:"right",width:a.value,modelValue:V(o).drawerRight,"onUpdate:modelValue":f[3]||(f[3]=s=>V(o).drawerRight=s),bordered:"",class:"bg-grey-3"},{default:l(()=>[e(pe,{ref_key:"vue3VideoPlayRef",ref:i,mode:"drawer"},null,512)]),_:1},8,["width","modelValue"]),e(we,null,{default:l(()=>[e(X)]),_:1})]),_:1}),e(Ce,{ref_key:"shutdown",ref:k},null,512),e(ve,{ref_key:"listEditRef",ref:d},null,512)])}}};export{Be as default};