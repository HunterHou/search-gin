import{c as s}from"./axios.920b0171.js";const e=async()=>await s().get("/api/buttoms"),o=async t=>{const a=await s().post("/api/setting",t);return a&&a.data},r=async()=>{const t=await s().get("/api/GetIpAddr");return t&&t.data},c=async()=>await s().get("/api/shutDown");export{c as G,o as P,e as a,r as b};
