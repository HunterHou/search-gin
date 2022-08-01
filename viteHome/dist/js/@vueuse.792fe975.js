import{d as P,r as f,i as N,w as O,u as T,g as M,e as H,f as I,h as L,n as R}from"./@vue.319fa35e.js";var h;const d=typeof window<"u",Y=e=>typeof e=="string",w=()=>{};d&&((h=window==null?void 0:window.navigator)==null?void 0:h.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function p(e){return typeof e=="function"?e():T(e)}function v(e){return M()?(H(e),!0):!1}function x(e,t=!0){I()?L(e):t?e():R(e)}const C=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,F=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,W=(e,t,n)=>{const o=e.getFullYear(),s=e.getMonth(),r=e.getDate(),a=e.getHours(),u=e.getMinutes(),i=e.getSeconds(),l=e.getMilliseconds(),m=e.getDay(),g={YY:()=>String(o).slice(-2),YYYY:()=>o,M:()=>s+1,MM:()=>`${s+1}`.padStart(2,"0"),D:()=>String(r),DD:()=>`${r}`.padStart(2,"0"),H:()=>String(a),HH:()=>`${a}`.padStart(2,"0"),h:()=>`${a%12||12}`.padStart(1,"0"),hh:()=>`${a%12||12}`.padStart(2,"0"),m:()=>String(u),mm:()=>`${u}`.padStart(2,"0"),s:()=>String(i),ss:()=>`${i}`.padStart(2,"0"),SSS:()=>`${l}`.padStart(3,"0"),d:()=>m,dd:()=>e.toLocaleDateString(n,{weekday:"narrow"}),ddd:()=>e.toLocaleDateString(n,{weekday:"short"}),dddd:()=>e.toLocaleDateString(n,{weekday:"long"})};return t.replace(F,(c,A)=>A||g[c]())},G=e=>{if(e===null)return new Date(NaN);if(e===void 0)return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){const t=e.match(C);if(t){const n=t[2]-1||0,o=(t[7]||"0").substring(0,3);return new Date(t[1],n,t[3]||1,t[4]||0,t[5]||0,t[6]||0,o)}}return new Date(e)};function ee(e,t="HH:mm:ss",n={}){return P(()=>W(G(p(e)),p(t),n==null?void 0:n.locales))}function q(e,t=1e3,n={}){const{immediate:o=!0,immediateCallback:s=!1}=n;let r=null;const a=f(!1);function u(){r&&(clearInterval(r),r=null)}function i(){a.value=!1,u()}function l(){T(t)<=0||(a.value=!0,s&&e(),u(),r=setInterval(e,p(t)))}if(o&&d&&l(),N(t)){const m=O(t,()=>{a.value&&d&&l()});v(m)}return v(i),{isActive:a,pause:i,resume:l}}function K(e,t,n={}){const{immediate:o=!0}=n,s=f(!1);let r=null;function a(){r&&(clearTimeout(r),r=null)}function u(){s.value=!1,a()}function i(...l){a(),s.value=!0,r=setTimeout(()=>{s.value=!1,r=null,e(...l)},p(t))}return o&&(s.value=!0,d&&i()),v(u),{isPending:s,start:i,stop:u}}function U(e){var t;const n=p(e);return(t=n==null?void 0:n.$el)!=null?t:n}const _=d?window:void 0,j=d?window.navigator:void 0;function b(...e){let t,n,o,s;if(Y(e[0])?([n,o,s]=e,t=_):[t,n,o,s]=e,!t)return w;let r=w;const a=O(()=>U(t),i=>{r(),i&&(i.addEventListener(n,o,s),r=()=>{i.removeEventListener(n,o,s),r=w})},{immediate:!0,flush:"post"}),u=()=>{a(),r()};return v(u),u}const X=e=>typeof e=="function"?e:typeof e=="string"?t=>t.key===e:Array.isArray(e)?t=>e.includes(t.key):e?()=>!0:()=>!1;function te(e,t,n={}){const{target:o=_,eventName:s="keydown",passive:r=!1}=n,a=X(e);return b(o,s,i=>{a(i)&&t(i)},r)}function Z(e,t=!1){const n=f(),o=()=>n.value=Boolean(e());return o(),x(o,t),n}function ne(e={}){const{navigator:t=j,read:n=!1,source:o,copiedDuring:s=1500}=e,r=["copy","cut"],a=Z(()=>t&&"clipboard"in t),u=f(""),i=f(!1),l=K(()=>i.value=!1,s);function m(){t.clipboard.readText().then(c=>{u.value=c})}if(a.value&&n)for(const c of r)b(c,m);async function g(c=p(o)){a.value&&c!=null&&(await t.clipboard.writeText(c),u.value=c,i.value=!0,l.start())}return{isSupported:a,text:u,copied:i,copy:g}}const S=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},y="__vueuse_ssr_handlers__";S[y]=S[y]||{};S[y];function k(e,t={}){const{immediate:n=!0,window:o=_}=t,s=f(!1);let r=null;function a(){!s.value||!o||(e(),r=o.requestAnimationFrame(a))}function u(){!s.value&&o&&(s.value=!0,a())}function i(){s.value=!1,r!=null&&o&&(o.cancelAnimationFrame(r),r=null)}return n&&u(),v(i),{isActive:s,pause:i,resume:u}}var z=Object.defineProperty,D=Object.getOwnPropertySymbols,B=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable,$=(e,t,n)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,J=(e,t)=>{for(var n in t||(t={}))B.call(t,n)&&$(e,n,t[n]);if(D)for(var n of D(t))V.call(t,n)&&$(e,n,t[n]);return e};function oe(e={}){const{controls:t=!1,interval:n="requestAnimationFrame"}=e,o=f(new Date),s=()=>o.value=new Date,r=n==="requestAnimationFrame"?k(s,{immediate:!0}):q(s,n,{immediate:!0});return t?J({now:o},r):o}var E;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(E||(E={}));export{ee as a,oe as b,te as o,ne as u};
