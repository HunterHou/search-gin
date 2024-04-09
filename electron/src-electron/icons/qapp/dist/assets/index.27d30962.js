import{I as j,au as W,r as m,av as P,aw as _,ax as B,C as D,u as A,v as X,N as I,Z as K}from"./index.3a29eae7.js";function G(){return j(W)}function Y(e){return _()?(B(e),!0):!1}function S(e){return typeof e=="function"?e():D(e)}const M=typeof window!="undefined"&&typeof document!="undefined",L=Object.prototype.toString,N=e=>L.call(e)==="[object Object]",R=()=>{};function V(e,t,o={}){const{immediate:l=!0}=o,r=m(!1);let u=null;function i(){u&&(clearTimeout(u),u=null)}function p(){r.value=!1,i()}function c(...d){i(),r.value=!0,u=setTimeout(()=>{r.value=!1,u=null,e(...d)},S(t))}return l&&(r.value=!0,M&&c()),Y(p),{isPending:P(r),start:c,stop:p}}function H(e){var t;const o=S(e);return(t=o==null?void 0:o.$el)!=null?t:o}const O=M?window:void 0;M&&window.document;const q=M?window.navigator:void 0;M&&window.location;function b(...e){let t,o,l,r;if(typeof e[0]=="string"||Array.isArray(e[0])?([o,l,r]=e,t=O):[t,o,l,r]=e,!t)return R;Array.isArray(o)||(o=[o]),Array.isArray(l)||(l=[l]);const u=[],i=()=>{u.forEach(s=>s()),u.length=0},p=(s,a,y,h)=>(s.addEventListener(a,y,h),()=>s.removeEventListener(a,y,h)),c=X(()=>[H(t),S(r)],([s,a])=>{if(i(),!s)return;const y=N(a)?{...a}:a;u.push(...o.flatMap(h=>l.map(g=>p(s,h,g,y))))},{immediate:!0,flush:"post"}),d=()=>{c(),i()};return Y(d),d}function Q(e){return typeof e=="function"?e:typeof e=="string"?t=>t.key===e:Array.isArray(e)?t=>e.includes(t.key):()=>!0}function J(...e){let t,o,l={};e.length===3?(t=e[0],o=e[1],l=e[2]):e.length===2?typeof e[1]=="object"?(t=!0,o=e[0],l=e[1]):(t=e[0],o=e[1]):(t=!0,o=e[0]);const{target:r=O,eventName:u="keydown",passive:i=!1,dedupe:p=!1}=l,c=Q(t);return b(r,u,s=>{s.repeat&&S(p)||c(s)&&o(s)},i)}function U(){const e=m(!1);return I()&&K(()=>{e.value=!0}),e}function Z(e){const t=U();return A(()=>(t.value,Boolean(e())))}function F(e={}){const{navigator:t=q,read:o=!1,source:l,copiedDuring:r=1500,legacy:u=!1}=e,i=Z(()=>t&&"clipboard"in t),p=A(()=>i.value||u),c=m(""),d=m(!1),s=V(()=>d.value=!1,r);function a(){i.value?t.clipboard.readText().then(f=>{c.value=f}):c.value=g()}p.value&&o&&b(["copy","cut"],a);async function y(f=S(l)){p.value&&f!=null&&(i.value?await t.clipboard.writeText(f):h(f),c.value=f,d.value=!0,s.start())}function h(f){const v=document.createElement("textarea");v.value=f!=null?f:"",v.style.position="absolute",v.style.opacity="0",document.body.appendChild(v),v.select(),document.execCommand("copy"),v.remove()}function g(){var f,v,x;return(x=(v=(f=document==null?void 0:document.getSelection)==null?void 0:f.call(document))==null?void 0:v.toString())!=null?x:""}return{isSupported:p,text:c,copied:d,copy:y}}const $={page:e=>[e.pageX,e.pageY],client:e=>[e.clientX,e.clientY],screen:e=>[e.screenX,e.screenY],movement:e=>e instanceof Touch?null:[e.movementX,e.movementY]};function k(e={}){const{type:t="page",touch:o=!0,resetOnTouchEnds:l=!1,initialValue:r={x:0,y:0},window:u=O,target:i=u,scroll:p=!0,eventFilter:c}=e;let d=null;const s=m(r.x),a=m(r.y),y=m(null),h=typeof t=="function"?t:$[t],g=n=>{const w=h(n);d=n,w&&([s.value,a.value]=w,y.value="mouse")},f=n=>{if(n.touches.length>0){const w=h(n.touches[0]);w&&([s.value,a.value]=w,y.value="touch")}},v=()=>{if(!d||!u)return;const n=h(d);d instanceof MouseEvent&&n&&(s.value=n[0]+u.scrollX,a.value=n[1]+u.scrollY)},x=()=>{s.value=r.x,a.value=r.y},T=c?n=>c(()=>g(n),{}):n=>g(n),C=c?n=>c(()=>f(n),{}):n=>f(n),E=c?()=>c(()=>v(),{}):()=>v();if(i){const n={passive:!0};b(i,["mousemove","dragover"],T,n),o&&t!=="movement"&&(b(i,["touchstart","touchmove"],C,n),l&&b(i,"touchend",x,n)),p&&t==="page"&&b(u,"scroll",E,{passive:!0})}return{x:s,y:a,sourceType:y}}function ee(e,t={}){const{handleOutside:o=!0,window:l=O}=t,{x:r,y:u,sourceType:i}=k(t),p=m(e!=null?e:l==null?void 0:l.document.body),c=m(0),d=m(0),s=m(0),a=m(0),y=m(0),h=m(0),g=m(!0);let f=()=>{};return l&&(f=X([p,r,u],()=>{const v=H(p);if(!v)return;const{left:x,top:T,width:C,height:E}=v.getBoundingClientRect();s.value=x+l.pageXOffset,a.value=T+l.pageYOffset,y.value=E,h.value=C;const n=r.value-s.value,w=u.value-a.value;g.value=C===0||E===0||n<0||w<0||n>C||w>E,(o||!g.value)&&(c.value=n,d.value=w)},{immediate:!0}),b(document,"mouseleave",()=>{g.value=!0})),{x:r,y:u,sourceType:i,elementX:c,elementY:d,elementPositionX:s,elementPositionY:a,elementHeight:y,elementWidth:h,isOutside:g,stop:f}}export{F as a,ee as b,J as o,G as u};
