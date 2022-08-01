import{g as dt}from"./axios.40c08a08.js";const Ot={},wt=Object.freeze(Object.defineProperty({__proto__:null,default:Ot},Symbol.toStringTag,{value:"Module"})),$t=dt(wt);var U=typeof Map=="function"&&Map.prototype,D=Object.getOwnPropertyDescriptor&&U?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,W=U&&D&&typeof D.get=="function"?D.get:null,Et=U&&Map.prototype.forEach,K=typeof Set=="function"&&Set.prototype,B=Object.getOwnPropertyDescriptor&&K?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,I=K&&B&&typeof B.get=="function"?B.get:null,_t=K&&Set.prototype.forEach,Mt=typeof WeakMap=="function"&&WeakMap.prototype,w=Mt?WeakMap.prototype.has:null,Wt=typeof WeakSet=="function"&&WeakSet.prototype,$=Wt?WeakSet.prototype.has:null,It=typeof WeakRef=="function"&&WeakRef.prototype,et=It?WeakRef.prototype.deref:null,Lt=Boolean.prototype.valueOf,At=Object.prototype.toString,Rt=Function.prototype.toString,kt=String.prototype.match,Q=String.prototype.slice,s=String.prototype.replace,qt=String.prototype.toUpperCase,rt=String.prototype.toLowerCase,pt=RegExp.prototype.test,nt=Array.prototype.concat,u=Array.prototype.join,Tt=Array.prototype.slice,at=Math.floor,z=typeof BigInt=="function"?BigInt.prototype.valueOf:null,C=Object.getOwnPropertySymbols,F=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Symbol.prototype.toString:null,h=typeof Symbol=="function"&&typeof Symbol.iterator=="object",o=typeof Symbol=="function"&&Symbol.toStringTag&&(typeof Symbol.toStringTag===h?"object":"symbol")?Symbol.toStringTag:null,yt=Object.prototype.propertyIsEnumerable,it=(typeof Reflect=="function"?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(t){return t.__proto__}:null);function ot(t,e){if(t===1/0||t===-1/0||t!==t||t&&t>-1e3&&t<1e3||pt.call(/e/,e))return e;var n=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if(typeof t=="number"){var a=t<0?-at(-t):at(t);if(a!==t){var i=String(a),r=Q.call(e,i.length+1);return s.call(i,n,"$&_")+"."+s.call(s.call(r,/([0-9]{3})/g,"$&_"),/_$/,"")}}return s.call(e,n,"$&_")}var H=$t,lt=H.custom,ft=gt(lt)?lt:null,jt=function t(e,n,a,i){var r=n||{};if(y(r,"quoteStyle")&&r.quoteStyle!=="single"&&r.quoteStyle!=="double")throw new TypeError('option "quoteStyle" must be "single" or "double"');if(y(r,"maxStringLength")&&(typeof r.maxStringLength=="number"?r.maxStringLength<0&&r.maxStringLength!==1/0:r.maxStringLength!==null))throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var c=y(r,"customInspect")?r.customInspect:!0;if(typeof c!="boolean"&&c!=="symbol")throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if(y(r,"indent")&&r.indent!==null&&r.indent!=="	"&&!(parseInt(r.indent,10)===r.indent&&r.indent>0))throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if(y(r,"numericSeparator")&&typeof r.numericSeparator!="boolean")throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');var v=r.numericSeparator;if(typeof e>"u")return"undefined";if(e===null)return"null";if(typeof e=="boolean")return e?"true":"false";if(typeof e=="string")return St(e,r);if(typeof e=="number"){if(e===0)return 1/0/e>0?"0":"-0";var l=String(e);return v?ot(e,l):l}if(typeof e=="bigint"){var p=String(e)+"n";return v?ot(e,p):p}var L=typeof r.depth>"u"?5:r.depth;if(typeof a>"u"&&(a=0),a>=L&&L>0&&typeof e=="object")return V(e)?"[Array]":"[Object]";var S=xt(r,a);if(typeof i>"u")i=[];else if(vt(i,e)>=0)return"[Circular]";function f(m,_,ht){if(_&&(i=Tt.call(i),i.push(_)),ht){var tt={depth:r.depth};return y(r,"quoteStyle")&&(tt.quoteStyle=r.quoteStyle),t(m,tt,a+1,i)}return t(m,r,a+1,i)}if(typeof e=="function"&&!ut(e)){var G=Vt(e),X=M(e,f);return"[Function"+(G?": "+G:" (anonymous)")+"]"+(X.length>0?" { "+u.call(X,", ")+" }":"")}if(gt(e)){var Y=h?s.call(String(e),/^(Symbol\(.*\))_[^)]*$/,"$1"):F.call(e);return typeof e=="object"&&!h?O(Y):Y}if(Xt(e)){for(var d="<"+rt.call(String(e.nodeName)),A=e.attributes||[],E=0;E<A.length;E++)d+=" "+A[E].name+"="+st(Nt(A[E].value),"double",r);return d+=">",e.childNodes&&e.childNodes.length&&(d+="..."),d+="</"+rt.call(String(e.nodeName))+">",d}if(V(e)){if(e.length===0)return"[]";var R=M(e,f);return S&&!Zt(R)?"["+J(R,S)+"]":"[ "+u.call(R,", ")+" ]"}if(Bt(e)){var k=M(e,f);return!("cause"in Error.prototype)&&"cause"in e&&!yt.call(e,"cause")?"{ ["+String(e)+"] "+u.call(nt.call("[cause]: "+f(e.cause),k),", ")+" }":k.length===0?"["+String(e)+"]":"{ ["+String(e)+"] "+u.call(k,", ")+" }"}if(typeof e=="object"&&c){if(ft&&typeof e[ft]=="function"&&H)return H(e,{depth:L-a});if(c!=="symbol"&&typeof e.inspect=="function")return e.inspect()}if(Jt(e)){var Z=[];return Et.call(e,function(m,_){Z.push(f(_,e,!0)+" => "+f(m,e))}),ct("Map",W.call(e),Z,S)}if(Qt(e)){var x=[];return _t.call(e,function(m){x.push(f(m,e))}),ct("Set",I.call(e),x,S)}if(Ut(e))return P("WeakMap");if(Gt(e))return P("WeakSet");if(Kt(e))return P("WeakRef");if(Pt(e))return O(f(Number(e)));if(Ft(e))return O(f(z.call(e)));if(zt(e))return O(Lt.call(e));if(Ct(e))return O(f(String(e)));if(!Dt(e)&&!ut(e)){var q=M(e,f),b=it?it(e)===Object.prototype:e instanceof Object||e.constructor===Object,T=e instanceof Object?"":"null prototype",j=!b&&o&&Object(e)===e&&o in e?Q.call(g(e),8,-1):T?"Object":"",mt=b||typeof e.constructor!="function"?"":e.constructor.name?e.constructor.name+" ":"",N=mt+(j||T?"["+u.call(nt.call([],j||[],T||[]),": ")+"] ":"");return q.length===0?N+"{}":S?N+"{"+J(q,S)+"}":N+"{ "+u.call(q,", ")+" }"}return String(e)};function st(t,e,n){var a=(n.quoteStyle||e)==="double"?'"':"'";return a+t+a}function Nt(t){return s.call(String(t),/"/g,"&quot;")}function V(t){return g(t)==="[object Array]"&&(!o||!(typeof t=="object"&&o in t))}function Dt(t){return g(t)==="[object Date]"&&(!o||!(typeof t=="object"&&o in t))}function ut(t){return g(t)==="[object RegExp]"&&(!o||!(typeof t=="object"&&o in t))}function Bt(t){return g(t)==="[object Error]"&&(!o||!(typeof t=="object"&&o in t))}function Ct(t){return g(t)==="[object String]"&&(!o||!(typeof t=="object"&&o in t))}function Pt(t){return g(t)==="[object Number]"&&(!o||!(typeof t=="object"&&o in t))}function zt(t){return g(t)==="[object Boolean]"&&(!o||!(typeof t=="object"&&o in t))}function gt(t){if(h)return t&&typeof t=="object"&&t instanceof Symbol;if(typeof t=="symbol")return!0;if(!t||typeof t!="object"||!F)return!1;try{return F.call(t),!0}catch{}return!1}function Ft(t){if(!t||typeof t!="object"||!z)return!1;try{return z.call(t),!0}catch{}return!1}var Ht=Object.prototype.hasOwnProperty||function(t){return t in this};function y(t,e){return Ht.call(t,e)}function g(t){return At.call(t)}function Vt(t){if(t.name)return t.name;var e=kt.call(Rt.call(t),/^function\s*([\w$]+)/);return e?e[1]:null}function vt(t,e){if(t.indexOf)return t.indexOf(e);for(var n=0,a=t.length;n<a;n++)if(t[n]===e)return n;return-1}function Jt(t){if(!W||!t||typeof t!="object")return!1;try{W.call(t);try{I.call(t)}catch{return!0}return t instanceof Map}catch{}return!1}function Ut(t){if(!w||!t||typeof t!="object")return!1;try{w.call(t,w);try{$.call(t,$)}catch{return!0}return t instanceof WeakMap}catch{}return!1}function Kt(t){if(!et||!t||typeof t!="object")return!1;try{return et.call(t),!0}catch{}return!1}function Qt(t){if(!I||!t||typeof t!="object")return!1;try{I.call(t);try{W.call(t)}catch{return!0}return t instanceof Set}catch{}return!1}function Gt(t){if(!$||!t||typeof t!="object")return!1;try{$.call(t,$);try{w.call(t,w)}catch{return!0}return t instanceof WeakSet}catch{}return!1}function Xt(t){return!t||typeof t!="object"?!1:typeof HTMLElement<"u"&&t instanceof HTMLElement?!0:typeof t.nodeName=="string"&&typeof t.getAttribute=="function"}function St(t,e){if(t.length>e.maxStringLength){var n=t.length-e.maxStringLength,a="... "+n+" more character"+(n>1?"s":"");return St(Q.call(t,0,e.maxStringLength),e)+a}var i=s.call(s.call(t,/(['\\])/g,"\\$1"),/[\x00-\x1f]/g,Yt);return st(i,"single",e)}function Yt(t){var e=t.charCodeAt(0),n={8:"b",9:"t",10:"n",12:"f",13:"r"}[e];return n?"\\"+n:"\\x"+(e<16?"0":"")+qt.call(e.toString(16))}function O(t){return"Object("+t+")"}function P(t){return t+" { ? }"}function ct(t,e,n,a){var i=a?J(n,a):u.call(n,", ");return t+" ("+e+") {"+i+"}"}function Zt(t){for(var e=0;e<t.length;e++)if(vt(t[e],`
`)>=0)return!1;return!0}function xt(t,e){var n;if(t.indent==="	")n="	";else if(typeof t.indent=="number"&&t.indent>0)n=u.call(Array(t.indent+1)," ");else return null;return{base:n,prev:u.call(Array(e+1),n)}}function J(t,e){if(t.length===0)return"";var n=`
`+e.prev+e.base;return n+u.call(t,","+n)+`
`+e.prev}function M(t,e){var n=V(t),a=[];if(n){a.length=t.length;for(var i=0;i<t.length;i++)a[i]=y(t,i)?e(t[i],t):""}var r=typeof C=="function"?C(t):[],c;if(h){c={};for(var v=0;v<r.length;v++)c["$"+r[v]]=r[v]}for(var l in t)!y(t,l)||n&&String(Number(l))===l&&l<t.length||h&&c["$"+l]instanceof Symbol||(pt.call(/[^\w$]/,l)?a.push(e(l,t)+": "+e(t[l],t)):a.push(l+": "+e(t[l],t)));if(typeof C=="function")for(var p=0;p<r.length;p++)yt.call(t,r[p])&&a.push("["+e(r[p])+"]: "+e(t[r[p]],t));return a}export{jt as o};
