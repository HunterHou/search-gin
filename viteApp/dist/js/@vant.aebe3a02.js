import{u as h,i as x,d as b,e as L,r as v,f as y,g as T,n as R,h as P,j as _,k as M,w as N,l as O,p as S,m as V}from"./@vue.aac442b6.js";var d=typeof window<"u";function k(e){return d?requestAnimationFrame(e):-1}function q(e){d&&cancelAnimationFrame(e)}function J(e){k(()=>k(e))}var D=e=>e===window,C=(e,n)=>({top:0,left:0,right:e,bottom:n,width:e,height:n}),K=e=>{const n=h(e);if(D(n)){const t=n.innerWidth,i=n.innerHeight;return C(t,i)}return n!=null&&n.getBoundingClientRect?n.getBoundingClientRect():C(0,0)};function G(e){const n=x(e,null);if(n){const t=O(),{link:i,unlink:s,internalChildren:r}=n;i(t),b(()=>s(t));const a=L(()=>r.indexOf(t));return{parent:n,index:a}}return{parent:null,index:v(-1)}}function I(e){const n=[],t=i=>{Array.isArray(i)&&i.forEach(s=>{var r;V(s)&&(n.push(s),(r=s.component)!=null&&r.subTree&&(n.push(s.component.subTree),t(s.component.subTree.children)),s.children&&t(s.children))})};return t(e),n}var E=(e,n)=>{const t=e.indexOf(n);return t===-1?e.findIndex(i=>n.key!==void 0&&n.key!==null&&i.type===n.type&&i.key===n.key):t};function W(e,n,t){const i=I(e.subTree.children);t.sort((r,a)=>E(i,r.vnode)-E(i,a.vnode));const s=t.map(r=>r.proxy);n.sort((r,a)=>{const c=s.indexOf(r),o=s.indexOf(a);return c-o})}function Q(e){const n=y([]),t=y([]),i=O();return{children:n,linkChildren:r=>{S(e,Object.assign({link:o=>{o.proxy&&(t.push(o),n.push(o.proxy),W(i,n,t))},unlink:o=>{const u=t.indexOf(o);n.splice(u,1),t.splice(u,1)},children:n,internalChildren:t},r))}}}function B(e){let n;T(()=>{e(),R(()=>{n=!0})}),P(()=>{n&&e()})}function Y(e,n,t={}){if(!d)return;const{target:i=window,passive:s=!1,capture:r=!1}=t;let a=!1,c;const o=f=>{if(a)return;const l=h(f);l&&!c&&(l.addEventListener(e,n,{capture:r,passive:s}),c=!0)},u=f=>{if(a)return;const l=h(f);l&&c&&(l.removeEventListener(e,n,r),c=!1)};b(()=>u(i)),_(()=>u(i)),B(()=>o(i));let m;return M(i)&&(m=N(i,(f,l)=>{u(l),o(f)})),()=>{m==null||m(),u(i),a=!0}}function X(e,n,t={}){if(!d)return;const{eventName:i="click"}=t;Y(i,r=>{(Array.isArray(e)?e:[e]).every(o=>{const u=h(o);return u&&!u.contains(r.target)})&&n(r)},{target:document})}var p,g;function Z(){if(!p&&(p=v(0),g=v(0),d)){const e=()=>{p.value=window.innerWidth,g.value=window.innerHeight};e(),window.addEventListener("resize",e,{passive:!0}),window.addEventListener("orientationchange",e,{passive:!0})}return{width:p,height:g}}var j=/scroll|auto|overlay/i,A=d?window:void 0;function F(e){return e.tagName!=="HTML"&&e.tagName!=="BODY"&&e.nodeType===1}function H(e,n=A){let t=e;for(;t&&t!==n&&F(t);){const{overflowY:i}=window.getComputedStyle(t);if(j.test(i))return t;t=t.parentNode}return n}function $(e,n=A){const t=v();return T(()=>{e.value&&(t.value=H(e.value,n))}),t}var w;function ee(){if(!w&&(w=v("visible"),d)){const e=()=>{w.value=document.hidden?"hidden":"visible"};e(),window.addEventListener("visibilitychange",e)}return w}var z=Symbol("van-field");function ne(e){const n=x(z,null);n&&!n.customValue.value&&(n.customValue.value=e,N(e,()=>{n.resetValidation(),n.validateWithTrigger("onChange")}))}export{z as C,K as a,Q as b,G as c,Y as d,q as e,$ as f,H as g,ee as h,J as i,ne as j,X as k,B as o,k as r,Z as u};
