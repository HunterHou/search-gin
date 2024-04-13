import{aD as q,aT as y,R as D,b4 as M,aQ as h,b5 as g,aP as $,b6 as w,ai as F,aR as C,al as A}from"./index.c0f9e2db.js";import{g as T,s as P,c as B}from"./index.34f8e9d5.js";import{c as o}from"./axios.fffa5fb6.js";function b(s,t,n){const c=F(s);let e,a=c.left-t.event.x,r=c.top-t.event.y,l=Math.abs(a),u=Math.abs(r);const i=t.direction;i.horizontal===!0&&i.vertical!==!0?e=a<0?"left":"right":i.horizontal!==!0&&i.vertical===!0?e=r<0?"up":"down":i.up===!0&&r<0?(e="up",l>u&&(i.left===!0&&a<0?e="left":i.right===!0&&a>0&&(e="right"))):i.down===!0&&r>0?(e="down",l>u&&(i.left===!0&&a<0?e="left":i.right===!0&&a>0&&(e="right"))):i.left===!0&&a<0?(e="left",l<u&&(i.up===!0&&r<0?e="up":i.down===!0&&r>0&&(e="down"))):i.right===!0&&a>0&&(e="right",l<u&&(i.up===!0&&r<0?e="up":i.down===!0&&r>0&&(e="down")));let m=!1;if(e===void 0&&n===!1){if(t.event.isFirst===!0||t.event.lastDir===void 0)return{};e=t.event.lastDir,m=!0,e==="left"||e==="right"?(c.left-=a,l=0,a=0):(c.top-=r,u=0,r=0)}return{synthetic:m,payload:{evt:s,touch:t.event.mouse!==!0,mouse:t.event.mouse===!0,position:c,direction:e,isFirst:t.event.isFirst,isFinal:n===!0,duration:Date.now()-t.event.time,distance:{x:l,y:u},offset:{x:a,y:r},delta:{x:c.left-t.event.lastX,y:c.top-t.event.lastY}}}}let S=0;var L=q({name:"touch-pan",beforeMount(s,{value:t,modifiers:n}){if(n.mouse!==!0&&y.has.touch!==!0)return;function c(a,r){n.mouse===!0&&r===!0?A(a):(n.stop===!0&&w(a),n.prevent===!0&&$(a))}const e={uid:"qvtp_"+S++,handler:t,modifiers:n,direction:T(n),noop:D,mouseStart(a){P(a,e)&&M(a)&&(h(e,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),e.start(a,!0))},touchStart(a){if(P(a,e)){const r=a.target;h(e,"temp",[[r,"touchmove","move","notPassiveCapture"],[r,"touchcancel","end","passiveCapture"],[r,"touchend","end","passiveCapture"]]),e.start(a)}},start(a,r){if(y.is.firefox===!0&&g(s,!0),e.lastEvt=a,r===!0||n.stop===!0){if(e.direction.all!==!0&&(r!==!0||e.modifiers.mouseAllDir!==!0&&e.modifiers.mousealldir!==!0)){const i=a.type.indexOf("mouse")>-1?new MouseEvent(a.type,a):new TouchEvent(a.type,a);a.defaultPrevented===!0&&$(i),a.cancelBubble===!0&&w(i),Object.assign(i,{qKeyEvent:a.qKeyEvent,qClickOutside:a.qClickOutside,qAnchorHandled:a.qAnchorHandled,qClonedBy:a.qClonedBy===void 0?[e.uid]:a.qClonedBy.concat(e.uid)}),e.initialEvent={target:a.target,event:i}}w(a)}const{left:l,top:u}=F(a);e.event={x:l,y:u,time:Date.now(),mouse:r===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:l,lastY:u}},move(a){if(e.event===void 0)return;const r=F(a),l=r.left-e.event.x,u=r.top-e.event.y;if(l===0&&u===0)return;e.lastEvt=a;const i=e.event.mouse===!0,m=()=>{c(a,i);let d;n.preserveCursor!==!0&&n.preservecursor!==!0&&(d=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),i===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),B(),e.styleCleanup=v=>{if(e.styleCleanup=void 0,d!==void 0&&(document.documentElement.style.cursor=d),document.body.classList.remove("non-selectable"),i===!0){const E=()=>{document.body.classList.remove("no-pointer-events--children")};v!==void 0?setTimeout(()=>{E(),v()},50):E()}else v!==void 0&&v()}};if(e.event.detected===!0){e.event.isFirst!==!0&&c(a,e.event.mouse);const{payload:d,synthetic:v}=b(a,e,!1);d!==void 0&&(e.handler(d)===!1?e.end(a):(e.styleCleanup===void 0&&e.event.isFirst===!0&&m(),e.event.lastX=d.position.left,e.event.lastY=d.position.top,e.event.lastDir=v===!0?void 0:d.direction,e.event.isFirst=!1));return}if(e.direction.all===!0||i===!0&&(e.modifiers.mouseAllDir===!0||e.modifiers.mousealldir===!0)){m(),e.event.detected=!0,e.move(a);return}const p=Math.abs(l),f=Math.abs(u);p!==f&&(e.direction.horizontal===!0&&p>f||e.direction.vertical===!0&&p<f||e.direction.up===!0&&p<f&&u<0||e.direction.down===!0&&p<f&&u>0||e.direction.left===!0&&p>f&&l<0||e.direction.right===!0&&p>f&&l>0?(e.event.detected=!0,e.move(a)):e.end(a,!0))},end(a,r){if(e.event!==void 0){if(C(e,"temp"),y.is.firefox===!0&&g(s,!1),r===!0)e.styleCleanup!==void 0&&e.styleCleanup(),e.event.detected!==!0&&e.initialEvent!==void 0&&e.initialEvent.target.dispatchEvent(e.initialEvent.event);else if(e.event.detected===!0){e.event.isFirst===!0&&e.handler(b(a===void 0?e.lastEvt:a,e).payload);const{payload:l}=b(a===void 0?e.lastEvt:a,e,!0),u=()=>{e.handler(l)};e.styleCleanup!==void 0?e.styleCleanup(u):u()}e.event=void 0,e.initialEvent=void 0,e.lastEvt=void 0}}};if(s.__qtouchpan=e,n.mouse===!0){const a=n.mouseCapture===!0||n.mousecapture===!0?"Capture":"";h(e,"main",[[s,"mousedown","mouseStart",`passive${a}`]])}y.has.touch===!0&&h(e,"main",[[s,"touchstart","touchStart",`passive${n.capture===!0?"Capture":""}`],[s,"touchmove","noop","notPassiveCapture"]])},updated(s,t){const n=s.__qtouchpan;n!==void 0&&(t.oldValue!==t.value&&(typeof value!="function"&&n.end(),n.handler=t.value),n.direction=T(t.modifiers))},beforeUnmount(s){const t=s.__qtouchpan;t!==void 0&&(t.event!==void 0&&t.end(),C(t,"main"),C(t,"temp"),y.is.firefox===!0&&g(s,!1),t.styleCleanup!==void 0&&t.styleCleanup(),delete s.__qtouchpan)}});const X=async s=>{const{data:t}=await o().post("/api/movieList",s);return t},Y=async s=>{const t=await o().get("/api/refreshIndex",s);return t&&t.data},R=async s=>{const t=await o().get(`/api/info/${s}`);return t&&t.data},k=async s=>await o().get(`/api/dir/${s}`),x=async s=>{const t=await o().get(`/api/play/${s}`);return t&&t.data},z=async s=>{const t=await o().get(`/api/openFolder/${s}`);return t&&t.data},Q=async s=>{const t=await o().get(`/api/delete/${s}`);return t&&t.data},H=async s=>{const t=await o().post("/api/sync",s);return t&&t.data},K=async()=>{const s=await o().get("/api/transferTasks");return s&&s.data},j=async s=>{const t=await o().get(`/api/tranferToMp4/${s}`);return t&&t.data},U=async(s,t,n)=>{const c=await o().get(`/api/cutMovie/${s}/${t}/${n}`);return c&&c.data},V=async(s,t)=>{const n=await o().get(`/api/setMovieType/${s}/${t}`);return n&&n.data},G=async s=>{const t=await o().get(`/api/imageList/${s}`);return t&&t.data},J=async(s,t)=>{const n=await o().get(`/api/file/addTag/${s}/${t}`);return n&&n.data},N=async(s,t)=>{const n=await o().get(`/api/file/clearTag/${s}/${t}`);return n&&n.data},W=async s=>{const t=await o().post("/api/file/rename",s);return t&&t.data},Z=async s=>{const t=await o().post("/api/OpenFolerByPath",s);return t&&t.data},ee=async s=>{const t=await o().post("/api/DeleteFolerByPath",s);return t&&t.data};export{J as A,N as C,Q as D,W as F,Z as O,x as P,k as Q,Y as R,X as S,L as T,V as a,H as b,K as c,j as d,U as e,ee as f,G as g,z as h,R as i};
