import{u as P,P as K,G as W,d as X,c as Y,_ as j}from"./index.0f14a770.js";import{N as J,A as V,w as Q,B as L,x as w,y as B,k as I,q as Z,r as D,n as c,R as F,e as d,b,f as ee}from"./vant.f448ad5c.js";import{u as le}from"./vue-router.168b8979.js";import{S as te}from"./index.2ba485a3.js";import{_ as ae}from"./LoadMore.vue_vue_type_script_setup_true_lang.1d9af8c7.js";import{K as ue,r as v,f as oe,e as ne,g as re,o as n,c as s,Y as u,S as t,u as l,a as g,W as r,X as i,F as m,a7 as p,R as f}from"./@vue.aac442b6.js";import"./axios.647abbdf.js";import"./@kangc.e6acbb3a.js";import"./vue.8e517399.js";import"./qs.0ddf2e0d.js";import"./side-channel.db6cd5a0.js";import"./get-intrinsic.7b6078ff.js";import"./has-symbols.6b764405.js";import"./function-bind.c99feded.js";import"./has.38a7880d.js";import"./call-bind.a2ca479f.js";import"./object-inspect.a67a4921.js";import"./element-plus.df9a4506.js";import"./lodash-es.94e8499d.js";import"./@element-plus.148c5373.js";import"./@popperjs.fd04dfd6.js";import"./@ctrl.9375a141.js";import"./dayjs.944d2b57.js";import"./async-validator.73a10b83.js";import"./memoize-one.c87f6fc8.js";import"./escape-html.86960cf8.js";import"./normalize-wheel-es.e2b4fa49.js";import"./@floating-ui.6065d27f.js";import"./pinia.78dfdeea.js";import"./vue-demi.6e7a88e9.js";import"./pinia-plugin-persist.32a83e37.js";import"./@vueuse.01f8cc47.js";import"./vue3-video-play.cdf2b84d.js";import"./highlight.js.a2669c08.js";import"./@vant.aebe3a02.js";const se={class:"mainBody"},ie={style:{"text-align":"",margin:"30px 30px",display:"inline-block"}},de={style:{"text-align":"",margin:"30px 30px",display:"inline-block"}},me={style:{"text-align":"",margin:"30px 30px",display:"inline-block"}},pe={style:{"text-align":"",margin:"30px 30px",display:"inline-block"}},fe={style:{"text-align":"",margin:"30px 30px",display:"inline-block"}},ge=ue({__name:"MSetting",setup(ve){const{go:$}=le(),k=v(!1),E=v(!1),C=v(!1),U=v(!1),T=v(!1),z=v("base"),x=v(""),_=v(""),o=oe({form:new te}),S=P(),A=document.documentElement,h=ne(()=>S.isFullscreen),N=()=>{h.value?A.requestFullscreen&&A.requestFullscreen&&document.exitFullscreen():A.requestFullscreen(),S.isFullscreen=!S.isFullscreen},M=()=>{x.value&&x.value.length>0&&(o.form.Types.push(x.value),x.value="")},R=()=>{_.value&&_.value.length>0&&(o.form.TagsLib.push(_.value),_.value="")},O=()=>{k.value=!0},H=async()=>{const y={...o.form,BaseDir:o.form.Dirs};await K(y)&&$(0)},q=async()=>{const y=await W();o.form=y},G=async()=>{const y=await Y();console.log(y),ee(y.Message)};return re(()=>{q()}),(y,a)=>(n(),s("div",se,[u(l(J),{title:"\u8BBE\u7F6E"},{left:t(()=>[g("div",null,[u(l(L),{plain:"",type:"danger",size:"small",onClick:N},{default:t(()=>[r(i(l(h)?"\u8FD8\u539F":"\u5168\u5C4F"),1)]),_:1}),u(l(L),{size:"small",plain:"",type:"danger",onClick:G},{default:t(()=>[r("\u5173\u673A")]),_:1})])]),right:t(()=>[g("div",null,[u(l(L),{size:"small",plain:"",type:"primary",onClick:H},{default:t(()=>[r("\u4FDD\u5B58")]),_:1})])]),_:1}),u(l(V),{show:k.value,"onUpdate:show":a[1]||(a[1]=e=>k.value=e),"cancel-text":"\u5173\u95ED"},{default:t(()=>[g("div",ie,[u(l(w),{modelValue:o.form.VideoTypes,"onUpdate:modelValue":a[0]||(a[0]=e=>o.form.VideoTypes=e),direction:"horizontal"},{default:t(()=>[(n(!0),s(m,null,p(o.form.Types,e=>(n(),f(l(B),{name:e,style:{margin:"4px 8px",width:"20vw"}},{default:t(()=>[r(i(e),1)]),_:2},1032,["name"]))),256))]),_:1},8,["modelValue"])])]),_:1},8,["show"]),u(l(V),{show:E.value,"onUpdate:show":a[3]||(a[3]=e=>E.value=e),"cancel-text":"\u5173\u95ED"},{default:t(()=>[g("div",de,[u(l(w),{modelValue:o.form.Dirs,"onUpdate:modelValue":a[2]||(a[2]=e=>o.form.Dirs=e),direction:"horizontal"},{default:t(()=>[(n(!0),s(m,null,p(o.form.DirsLib,e=>(n(),f(l(B),{name:e,style:{margin:"4px 8px","max-width":"80vw"}},{default:t(()=>[r(i(e),1)]),_:2},1032,["name"]))),256))]),_:1},8,["modelValue"])])]),_:1},8,["show"]),u(l(V),{show:C.value,"onUpdate:show":a[5]||(a[5]=e=>C.value=e),"cancel-text":"\u5173\u95ED"},{default:t(()=>[g("div",me,[u(l(w),{modelValue:o.form.Tags,"onUpdate:modelValue":a[4]||(a[4]=e=>o.form.Tags=e),direction:"horizontal"},{default:t(()=>[(n(!0),s(m,null,p(o.form.TagsLib,e=>(n(),f(l(B),{name:e,style:{margin:"4px 8px","max-width":"80vw"}},{default:t(()=>[r(i(e),1)]),_:2},1032,["name"]))),256))]),_:1},8,["modelValue"])])]),_:1},8,["show"]),u(l(V),{show:U.value,"onUpdate:show":a[8]||(a[8]=e=>U.value=e),"cancel-text":"\u5173\u95ED"},{default:t(()=>[u(l(I),{label:"\u6DFB\u52A0",modelValue:x.value,"onUpdate:modelValue":a[6]||(a[6]=e=>x.value=e),placeholder:"\u8BF7\u8F93\u5165\u6DFB\u52A0\u7684\u7C7B\u578B",onSearch:M},{action:t(()=>[g("div",{onClick:M},"\u6DFB\u52A0")]),_:1},8,["modelValue"]),g("div",pe,[u(l(w),{modelValue:o.form.Types,"onUpdate:modelValue":a[7]||(a[7]=e=>o.form.Types=e),direction:"horizontal"},{default:t(()=>[(n(!0),s(m,null,p(o.form.Types,e=>(n(),f(l(B),{name:e,style:{margin:"4px 8px","max-width":"80vw"}},{default:t(()=>[r(i(e),1)]),_:2},1032,["name"]))),256))]),_:1},8,["modelValue"])])]),_:1},8,["show"]),u(l(V),{show:T.value,"onUpdate:show":a[11]||(a[11]=e=>T.value=e),"cancel-text":"\u5173\u95ED"},{default:t(()=>[u(l(I),{label:"\u6DFB\u52A0",modelValue:_.value,"onUpdate:modelValue":a[9]||(a[9]=e=>_.value=e),placeholder:"\u8BF7\u8F93\u5165\u6DFB\u52A0\u7684\u6807\u7B7E",onSearch:R},{action:t(()=>[g("div",{onClick:R},"\u6DFB\u52A0")]),_:1},8,["modelValue"]),g("div",fe,[u(l(w),{modelValue:o.form.TagsLib,"onUpdate:modelValue":a[10]||(a[10]=e=>o.form.TagsLib=e),direction:"horizontal"},{default:t(()=>[(n(!0),s(m,null,p(o.form.TagsLib,e=>(n(),f(l(B),{name:e,style:{margin:"4px 8px","max-width":"80vw"}},{default:t(()=>[r(i(e),1)]),_:2},1032,["name"]))),256))]),_:1},8,["modelValue"])])]),_:1},8,["show"]),u(X),u(l(Q),{onSubmit:H},{default:t(()=>[u(l(Z),{active:z.value,"onUpdate:active":a[22]||(a[22]=e=>z.value=e),type:"card",swipeable:""},{default:t(()=>[u(l(D),{name:"base",title:"\u57FA\u7840\u8BBE\u7F6E"},{default:t(()=>[u(l(c),{style:{width:"100%",margin:"8px auto"},modelValue:o.form.ControllerHost,"onUpdate:modelValue":a[12]||(a[12]=e=>o.form.ControllerHost=e),name:"ControllerHost",label:"\u8BF7\u6C42\u670D\u52A1\u5668",placeholder:"\u8BF7\u6C42\u670D\u52A1\u5668"},null,8,["modelValue"]),u(l(c),{modelValue:o.form.ImageHost,"onUpdate:modelValue":a[13]||(a[13]=e=>o.form.ImageHost=e),label:"\u56FE\u7247\u670D\u52A1\u5668",name:"ImageHost",placeholder:"\u56FE\u7247\u670D\u52A1\u5668"},null,8,["modelValue"]),u(l(c),{modelValue:o.form.StreamHost,"onUpdate:modelValue":a[14]||(a[14]=e=>o.form.StreamHost=e),name:"StreamHost",label:"\u6D41\u670D\u52A1\u5668",placeholder:"\u6D41\u670D\u52A1\u5668"},null,8,["modelValue"]),u(l(c),{modelValue:o.form.BaseUrl,"onUpdate:modelValue":a[15]||(a[15]=e=>o.form.BaseUrl=e),name:"BaseUrl",label:"URL",placeholder:"URL"},null,8,["modelValue"]),u(l(c),{modelValue:o.form.OMUrl,"onUpdate:modelValue":a[16]||(a[16]=e=>o.form.OMUrl=e),name:"OMUrl",label:"OM-URL",placeholder:"OM-URL"},null,8,["modelValue"]),u(l(F),{style:{margin:"8px auto"}},{default:t(()=>[u(l(d),{span:6},{default:t(()=>[r(" \u70ED\u95E8\u6807\u7B7E ")]),_:1}),u(l(d),{span:18,onClick:a[17]||(a[17]=e=>C.value=!0)},{default:t(()=>[(n(!0),s(m,null,p(o.form.Tags,e=>(n(),f(l(b),{size:"large",key:e,style:{background:"green",margin:"2px 4px"}},{default:t(()=>[r(i(e),1)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1}),u(l(D),{name:"search",title:"\u641C\u7D22\u8BBE\u7F6E"},{default:t(()=>[u(l(F),null,{default:t(()=>[u(l(d),{span:6},{default:t(()=>[r(" \u89C6\u9891\u7C7B\u578B ")]),_:1}),u(l(d),{span:18,onClick:O},{default:t(()=>[(n(!0),s(m,null,p(o.form.VideoTypes,e=>(n(),f(l(b),{size:"large",key:e,style:{background:"green",margin:"2px 4px"}},{default:t(()=>[r(i(e),1)]),_:2},1024))),128))]),_:1})]),_:1}),u(l(F),null,{default:t(()=>[u(l(d),{span:6},{default:t(()=>[r(" \u5DF2\u9009\u8DEF\u5F91 ")]),_:1}),u(l(d),{span:18,onClick:a[18]||(a[18]=e=>E.value=!0)},{default:t(()=>[(n(!0),s(m,null,p(o.form.Dirs,e=>(n(),f(l(b),{key:e,size:"large",style:{background:"green",margin:"2px 4px"}},{default:t(()=>[r(i(e),1)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1}),u(l(D),{name:"dict",title:"\u5B57\u5178\u8BBE\u7F6E"},{default:t(()=>[u(l(F),{class:"rowStyle"},{default:t(()=>[u(l(d),{span:6},{default:t(()=>[r(" \u679A\u4E3E\u6807\u7B7E ")]),_:1}),u(l(d),{span:18,onClick:a[19]||(a[19]=e=>T.value=!0)},{default:t(()=>[(n(!0),s(m,null,p(o.form.TagsLib,e=>(n(),f(l(b),{key:e,size:"large",style:{background:"green",margin:"2px 4px"}},{default:t(()=>[r(i(e),1)]),_:2},1024))),128))]),_:1})]),_:1}),u(l(F),null,{default:t(()=>[u(l(d),{span:6},{default:t(()=>[r(" \u679A\u4E3E\u6587\u4EF6\u7C7B\u578B ")]),_:1}),u(l(d),{span:18,onClick:a[20]||(a[20]=e=>U.value=!0)},{default:t(()=>[(n(!0),s(m,null,p(o.form.Types,e=>(n(),f(l(b),{key:e,size:"large",style:{background:"green",margin:"2px 4px"}},{default:t(()=>[r(i(e),1)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1}),u(l(D),{name:"remark",title:"\u5907\u6CE8"},{default:t(()=>[u(l(c),{modelValue:o.form.Remark,"onUpdate:modelValue":a[21]||(a[21]=e=>o.form.Remark=e),autosize:"",type:"textarea",rows:"4",name:"Remark",label:"\u5907\u6CE8",placeholder:"\u5907\u6CE8"},null,8,["modelValue"])]),_:1})]),_:1},8,["active"])]),_:1}),u(ae)]))}});const Je=j(ge,[["__scopeId","data-v-322692dd"]]);export{Je as default};
