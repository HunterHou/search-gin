var g=Object.defineProperty;var m=(e,t,s)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var n=(e,t,s)=>(m(e,typeof t!="symbol"?t+"":t,s),s);import{u as d}from"./index.2d315a65.js";class p{constructor(){n(this,"Id");n(this,"Tags");n(this,"MovieType");n(this,"FileType");n(this,"Jpg");n(this,"Png");n(this,"Actress");n(this,"Code");n(this,"MTime");n(this,"SizeStr");n(this,"Name");n(this,"originName")}}class C extends p{constructor(){super(...arguments);n(this,"Page",1);n(this,"PageSize",14);n(this,"OnlyRepeat",!1);n(this,"Keyword");n(this,"SortField","MTime");n(this,"SortType","desc")}}const i=d(),F=e=>{let{Name:t,Tags:s,FileType:a,Code:r,Actress:u}=e.formItem,o="";if(t.indexOf("\u300A")>=0){const c=t.substr(0,t.indexOf("\u300A")+1),f=t.substr(t.indexOf("\u300B"),t.length);o=c,s&&s.length>0&&(o+=s),o+=f}else o=t.replaceAll("."+a,""),o=o+"\u300A"+s+"\u300B."+a;e.formItem.originName=o},S=e=>{if(!e)return;let{MovieType:t,Name:s,FileType:a}=e.currentFile||{},r="";if(s.indexOf("{{")>=0){const u=s.substr(0,s.indexOf("{{")),o=s.substr(s.indexOf("}}")+2,s.length);r=u,t&&t!==""&&(r+="{{"+t+"}}"),r+=o}else r=s.replaceAll("."+a,""),r=r+"{{"+t+"}}."+a;e.currentFile.Name=r,e.currentFile.originName=r},h=e=>{const t=i.getSettingInfo.BaseUrl+"/search/"+e;window.open(t)},O=e=>{const t=i.getSettingInfo.BaseUrl+"/"+e;window.open(t)},v=(e,t)=>{const s=i.getSuggestions;if(!s)return;const r=(e?s.filter(l(e)):s).slice(0,50);t(r)},x=(e,t)=>{var r;const s=(r=i.getSettingInfo)==null?void 0:r.TagsLib,a=e?s.filter(l(e)):s;t(a)},l=e=>t=>t.toLowerCase().indexOf(e.toLowerCase())>=0,A=(e,t)=>!e||!t||e.indexOf(t)<0,B=e=>!e.customerTag,N=e=>e!=="\u9A91\u5175",M=e=>e!=="\u65AF\u5DF4\u8FBE",b=e=>e!=="\u56FD\u4EA7",I=e=>e!=="\u6B65\u5175",w=e=>{const{target:{volume:t,muted:s}}=e;i.videoOptions.volume=t,i.videoOptions.muted=s};export{p as M,C as a,x as b,B as c,N as d,I as e,v as f,b as g,M as h,S as i,O as j,h as k,F as l,A as n,w as v};
