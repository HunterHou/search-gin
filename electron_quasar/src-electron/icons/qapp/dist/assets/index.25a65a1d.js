import{aL as j,r as m,aM as H,aN as L,aO as N,D as W,c as X,y as Y,L as B,P as D}from"./index.940a83ae.js";const M={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},_=Object.keys(M);M.all=!0;function F(e){const t={};for(const n of _)e[n]===!0&&(t[n]=!0);return Object.keys(t).length===0?M:(t.horizontal===!0?t.left=t.right=!0:t.left===!0&&t.right===!0&&(t.horizontal=!0),t.vertical===!0?t.up=t.down=!0:t.up===!0&&t.down===!0&&(t.vertical=!0),t.horizontal===!0&&t.vertical===!0&&(t.all=!0),t)}const z=["INPUT","TEXTAREA"];function ee(e,t){return t.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof t.handler=="function"&&z.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(t.uid)===-1)}function te(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),j.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function P(e){return L()?(N(e),!0):!1}function x(e){return typeof e=="function"?e():W(e)}const C=typeof window!="undefined"&&typeof document!="undefined",I=Object.prototype.toString,U=e=>I.call(e)==="[object Object]",k=()=>{};function q(e,t,n={}){const{immediate:i=!0}=n,l=m(!1);let u=null;function c(){u&&(clearTimeout(u),u=null)}function p(){l.value=!1,c()}function s(...d){c(),l.value=!0,u=setTimeout(()=>{l.value=!1,u=null,e(...d)},x(t))}return i&&(l.value=!0,C&&s()),P(p),{isPending:H(l),start:s,stop:p}}function R(e){var t;const n=x(e);return(t=n==null?void 0:n.$el)!=null?t:n}const E=C?window:void 0;C&&window.document;const K=C?window.navigator:void 0;C&&window.location;function b(...e){let t,n,i,l;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,i,l]=e,t=E):[t,n,i,l]=e,!t)return k;Array.isArray(n)||(n=[n]),Array.isArray(i)||(i=[i]);const u=[],c=()=>{u.forEach(r=>r()),u.length=0},p=(r,a,y,g)=>(r.addEventListener(a,y,g),()=>r.removeEventListener(a,y,g)),s=Y(()=>[R(t),x(l)],([r,a])=>{if(c(),!r)return;const y=U(a)?{...a}:a;u.push(...n.flatMap(g=>i.map(h=>p(r,g,h,y))))},{immediate:!0,flush:"post"}),d=()=>{s(),c()};return P(d),d}function V(e){return typeof e=="function"?e:typeof e=="string"?t=>t.key===e:Array.isArray(e)?t=>e.includes(t.key):()=>!0}function ne(...e){let t,n,i={};e.length===3?(t=e[0],n=e[1],i=e[2]):e.length===2?typeof e[1]=="object"?(t=!0,n=e[0],i=e[1]):(t=e[0],n=e[1]):(t=!0,n=e[0]);const{target:l=E,eventName:u="keydown",passive:c=!1,dedupe:p=!1}=i,s=V(t);return b(l,u,r=>{r.repeat&&x(p)||s(r)&&n(r)},c)}function $(){const e=m(!1);return B()&&D(()=>{e.value=!0}),e}function G(e){const t=$();return X(()=>(t.value,Boolean(e())))}function oe(e={}){const{navigator:t=K,read:n=!1,source:i,copiedDuring:l=1500,legacy:u=!1}=e,c=G(()=>t&&"clipboard"in t),p=X(()=>c.value||u),s=m(""),d=m(!1),r=q(()=>d.value=!1,l);function a(){c.value?t.clipboard.readText().then(f=>{s.value=f}):s.value=h()}p.value&&n&&b(["copy","cut"],a);async function y(f=x(i)){p.value&&f!=null&&(c.value?await t.clipboard.writeText(f):g(f),s.value=f,d.value=!0,r.start())}function g(f){const v=document.createElement("textarea");v.value=f!=null?f:"",v.style.position="absolute",v.style.opacity="0",document.body.appendChild(v),v.select(),document.execCommand("copy"),v.remove()}function h(){var f,v,S;return(S=(v=(f=document==null?void 0:document.getSelection)==null?void 0:f.call(document))==null?void 0:v.toString())!=null?S:""}return{isSupported:p,text:s,copied:d,copy:y}}const J={page:e=>[e.pageX,e.pageY],client:e=>[e.clientX,e.clientY],screen:e=>[e.screenX,e.screenY],movement:e=>e instanceof Touch?null:[e.movementX,e.movementY]};function Q(e={}){const{type:t="page",touch:n=!0,resetOnTouchEnds:i=!1,initialValue:l={x:0,y:0},window:u=E,target:c=u,scroll:p=!0,eventFilter:s}=e;let d=null;const r=m(l.x),a=m(l.y),y=m(null),g=typeof t=="function"?t:J[t],h=o=>{const w=g(o);d=o,w&&([r.value,a.value]=w,y.value="mouse")},f=o=>{if(o.touches.length>0){const w=g(o.touches[0]);w&&([r.value,a.value]=w,y.value="touch")}},v=()=>{if(!d||!u)return;const o=g(d);d instanceof MouseEvent&&o&&(r.value=o[0]+u.scrollX,a.value=o[1]+u.scrollY)},S=()=>{r.value=l.x,a.value=l.y},T=s?o=>s(()=>h(o),{}):o=>h(o),A=s?o=>s(()=>f(o),{}):o=>f(o),O=s?()=>s(()=>v(),{}):()=>v();if(c){const o={passive:!0};b(c,["mousemove","dragover"],T,o),n&&t!=="movement"&&(b(c,["touchstart","touchmove"],A,o),i&&b(c,"touchend",S,o)),p&&t==="page"&&b(u,"scroll",O,{passive:!0})}return{x:r,y:a,sourceType:y}}function ue(e,t={}){const{handleOutside:n=!0,window:i=E}=t,{x:l,y:u,sourceType:c}=Q(t),p=m(e!=null?e:i==null?void 0:i.document.body),s=m(0),d=m(0),r=m(0),a=m(0),y=m(0),g=m(0),h=m(!0);let f=()=>{};return i&&(f=Y([p,l,u],()=>{const v=R(p);if(!v)return;const{left:S,top:T,width:A,height:O}=v.getBoundingClientRect();r.value=S+i.pageXOffset,a.value=T+i.pageYOffset,y.value=O,g.value=A;const o=l.value-r.value,w=u.value-a.value;h.value=A===0||O===0||o<0||w<0||o>A||w>O,(n||!h.value)&&(s.value=o,d.value=w)},{immediate:!0}),b(document,"mouseleave",()=>{h.value=!0})),{x:l,y:u,sourceType:c,elementX:s,elementY:d,elementPositionX:r,elementPositionY:a,elementHeight:y,elementWidth:g,isOutside:h,stop:f}}export{ue as a,te as c,F as g,ne as o,ee as s,oe as u};
