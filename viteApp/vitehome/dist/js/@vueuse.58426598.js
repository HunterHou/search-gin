import{j as I,n as B,f as l,i as j,w as C,u as W,l as q,g as G,q as z,s as K}from"./@vue.4a24e03e.js";var $;const O=typeof window<"u",U=e=>typeof e=="string",T=()=>{};O&&(($=window==null?void 0:window.navigator)==null?void 0:$.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function S(e){return typeof e=="function"?e():W(e)}function V(e){return e}function _(e){return z()?(K(e),!0):!1}function X(e,t=!0){q()?G(e):t?e():B(e)}const k=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,Z=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,J=(e,t,n)=>{const a=e.getFullYear(),o=e.getMonth(),s=e.getDate(),u=e.getHours(),r=e.getMinutes(),i=e.getSeconds(),c=e.getMilliseconds(),p=e.getDay(),g={YY:()=>String(a).slice(-2),YYYY:()=>a,M:()=>o+1,MM:()=>`${o+1}`.padStart(2,"0"),D:()=>String(s),DD:()=>`${s}`.padStart(2,"0"),H:()=>String(u),HH:()=>`${u}`.padStart(2,"0"),h:()=>`${u%12||12}`.padStart(1,"0"),hh:()=>`${u%12||12}`.padStart(2,"0"),m:()=>String(r),mm:()=>`${r}`.padStart(2,"0"),s:()=>String(i),ss:()=>`${i}`.padStart(2,"0"),SSS:()=>`${c}`.padStart(3,"0"),d:()=>p,dd:()=>e.toLocaleDateString(n,{weekday:"narrow"}),ddd:()=>e.toLocaleDateString(n,{weekday:"short"}),dddd:()=>e.toLocaleDateString(n,{weekday:"long"})};return t.replace(Z,(d,h)=>h||g[d]())},ee=e=>{if(e===null)return new Date(NaN);if(e===void 0)return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){const t=e.match(k);if(t){const n=t[2]-1||0,a=(t[7]||"0").substring(0,3);return new Date(t[1],n,t[3]||1,t[4]||0,t[5]||0,t[6]||0,a)}}return new Date(e)};function we(e,t="HH:mm:ss",n={}){return I(()=>J(ee(S(e)),S(t),n==null?void 0:n.locales))}function te(e,t=1e3,n={}){const{immediate:a=!0,immediateCallback:o=!1}=n;let s=null;const u=l(!1);function r(){s&&(clearInterval(s),s=null)}function i(){u.value=!1,r()}function c(){W(t)<=0||(u.value=!0,o&&e(),r(),s=setInterval(e,S(t)))}if(a&&O&&c(),j(t)){const p=C(t,()=>{u.value&&O&&c()});_(p)}return _(i),{isActive:u,pause:i,resume:c}}function ne(e,t,n={}){const{immediate:a=!0}=n,o=l(!1);let s=null;function u(){s&&(clearTimeout(s),s=null)}function r(){o.value=!1,u()}function i(...c){u(),o.value=!0,s=setTimeout(()=>{o.value=!1,s=null,e(...c)},S(t))}return a&&(o.value=!0,O&&i()),_(r),{isPending:o,start:i,stop:r}}function Q(e){var t;const n=S(e);return(t=n==null?void 0:n.$el)!=null?t:n}const m=O?window:void 0,oe=O?window.navigator:void 0;function v(...e){let t,n,a,o;if(U(e[0])?([n,a,o]=e,t=m):[t,n,a,o]=e,!t)return T;let s=T;const u=C(()=>Q(t),i=>{s(),i&&(i.addEventListener(n,a,o),s=()=>{i.removeEventListener(n,a,o),s=T})},{immediate:!0,flush:"post"}),r=()=>{u(),s()};return _(r),r}const se=e=>typeof e=="function"?e:typeof e=="string"?t=>t.key===e:Array.isArray(e)?t=>e.includes(t.key):e?()=>!0:()=>!1;function Oe(e,t,n={}){const{target:a=m,eventName:o="keydown",passive:s=!1}=n,u=se(e);return v(a,o,i=>{u(i)&&t(i)},s)}function ae(e,t=!1){const n=l(),a=()=>n.value=Boolean(e());return a(),X(a,t),n}function Se(e={}){const{navigator:t=oe,read:n=!1,source:a,copiedDuring:o=1500}=e,s=["copy","cut"],u=ae(()=>t&&"clipboard"in t),r=l(""),i=l(!1),c=ne(()=>i.value=!1,o);function p(){t.clipboard.readText().then(d=>{r.value=d})}if(u.value&&n)for(const d of s)v(d,p);async function g(d=S(a)){u.value&&d!=null&&(await t.clipboard.writeText(d),r.value=d,i.value=!0,c.start())}return{isSupported:u,text:r,copied:i,copy:g}}const x=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Y="__vueuse_ssr_handlers__";x[Y]=x[Y]||{};x[Y];function re(e,t={}){const{immediate:n=!0,window:a=m}=t,o=l(!1);let s=null;function u(){!o.value||!a||(e(),s=a.requestAnimationFrame(u))}function r(){!o.value&&a&&(o.value=!0,u())}function i(){o.value=!1,s!=null&&a&&(a.cancelAnimationFrame(s),s=null)}return n&&r(),_(i),{isActive:o,pause:i,resume:r}}function ue(e={}){const{type:t="page",touch:n=!0,resetOnTouchEnds:a=!1,initialValue:o={x:0,y:0},window:s=m,eventFilter:u}=e,r=l(o.x),i=l(o.y),c=l(null),p=f=>{t==="page"?(r.value=f.pageX,i.value=f.pageY):t==="client"&&(r.value=f.clientX,i.value=f.clientY),c.value="mouse"},g=()=>{r.value=o.x,i.value=o.y},d=f=>{if(f.touches.length>0){const y=f.touches[0];t==="page"?(r.value=y.pageX,i.value=y.pageY):t==="client"&&(r.value=y.clientX,i.value=y.clientY),c.value="touch"}},h=f=>u===void 0?p(f):u(()=>p(f),{}),w=f=>u===void 0?d(f):u(()=>d(f),{});return s&&(v(s,"mousemove",h,{passive:!0}),v(s,"dragover",h,{passive:!0}),n&&(v(s,"touchstart",w,{passive:!0}),v(s,"touchmove",w,{passive:!0}),a&&v(s,"touchend",g,{passive:!0}))),{x:r,y:i,sourceType:c}}function _e(e,t={}){const{handleOutside:n=!0,window:a=m}=t,{x:o,y:s,sourceType:u}=ue(t),r=l(e!=null?e:a==null?void 0:a.document.body),i=l(0),c=l(0),p=l(0),g=l(0),d=l(0),h=l(0),w=l(!0);let f=()=>{};return a&&(f=C([r,o,s],()=>{const y=Q(r);if(!y)return;const{left:F,top:L,width:P,height:D}=y.getBoundingClientRect();p.value=F+a.pageXOffset,g.value=L+a.pageYOffset,d.value=D,h.value=P;const E=o.value-p.value,b=s.value-g.value;w.value=P===0||D===0||E<0||b<0||E>P||b>D,(n||!w.value)&&(i.value=E,c.value=b)},{immediate:!0})),{x:o,y:s,sourceType:u,elementX:i,elementY:c,elementPositionX:p,elementPositionY:g,elementHeight:d,elementWidth:h,isOutside:w,stop:f}}var ie=Object.defineProperty,H=Object.getOwnPropertySymbols,le=Object.prototype.hasOwnProperty,ce=Object.prototype.propertyIsEnumerable,A=(e,t,n)=>t in e?ie(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,fe=(e,t)=>{for(var n in t||(t={}))le.call(t,n)&&A(e,n,t[n]);if(H)for(var n of H(t))ce.call(t,n)&&A(e,n,t[n]);return e};function Ie(e={}){const{controls:t=!1,interval:n="requestAnimationFrame"}=e,a=l(new Date),o=()=>a.value=new Date,s=n==="requestAnimationFrame"?re(o,{immediate:!0}):te(o,n,{immediate:!0});return t?fe({now:a},s):a}var N;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(N||(N={}));function de(e){var t;const n=(t=e.rangeCount)!=null?t:0,a=new Array(n);for(let o=0;o<n;o++){const s=e.getRangeAt(o);a[o]=s}return a}function Pe(e={}){const{window:t=m}=e,n=l(null),a=I(()=>{var r,i;return(i=(r=n.value)==null?void 0:r.toString())!=null?i:""}),o=I(()=>n.value?de(n.value):[]),s=I(()=>o.value.map(r=>r.getBoundingClientRect()));function u(){n.value=null,t&&(n.value=t.getSelection())}return t&&v(t.document,"selectionchange",u),{text:a,rects:s,ranges:o,selection:n}}var pe=Object.defineProperty,R=Object.getOwnPropertySymbols,ve=Object.prototype.hasOwnProperty,ge=Object.prototype.propertyIsEnumerable,M=(e,t,n)=>t in e?pe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,me=(e,t)=>{for(var n in t||(t={}))ve.call(t,n)&&M(e,n,t[n]);if(R)for(var n of R(t))ge.call(t,n)&&M(e,n,t[n]);return e};const he={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};me({linear:V},he);function De({window:e=m}={}){if(!e)return{x:l(0),y:l(0)};const t=l(e.pageXOffset),n=l(e.pageYOffset);return v("scroll",()=>{t.value=e.pageXOffset,n.value=e.pageYOffset},{capture:!1,passive:!0}),{x:t,y:n}}function Ee(e={}){const{window:t=m,initialWidth:n=1/0,initialHeight:a=1/0,listenOrientation:o=!0}=e,s=l(n),u=l(a),r=()=>{t&&(s.value=t.innerWidth,u.value=t.innerHeight)};return r(),X(r),v("resize",r,{passive:!0}),o&&v("orientationchange",r,{passive:!0}),{width:s,height:u}}export{De as a,_e as b,Se as c,Ee as d,we as e,Ie as f,Oe as o,Pe as u};
