import{a as t}from"./index.7bfe88b0.js";const a=t(),i=async e=>await a.post({url:"/api/movieList",data:e}),c=async e=>await a.get({url:`/api/info/${e}`}),u=async e=>await a.get({url:`/api/dir/${e}`}),l=async e=>await a.get({url:`/api/play/${e}`}),p=async e=>await a.get({url:`/api/openFolder/${e}`}),y=async e=>await a.get({url:`/api/delete/${e}`}),g=async e=>await a.get({url:`/api/sync/${e}`}),w=async e=>await a.get({url:"/api/transferTasks"}),$=async e=>await a.get({url:`/api/tranferToMp4/${e}`}),F=async(e,s,r)=>await a.get({url:`/api/cutMovie/${e}/${s}/${r}`}),f=async(e,s)=>await a.get({url:`/api/setMovieType/${e}/${s}`}),d=async()=>await a.get({url:"/api/refreshIndex"}),T=async e=>await a.get({url:`/api/imageList/${e}`}),h=async()=>await a.get({url:"/api/heartBeat"}),m=async(e,s)=>await a.get({url:`/api/file/addTag/${e}/${s}`}),B=async e=>await a.post({url:"/api/file/rename",data:e}),I=async e=>await a.post({url:"/api/OpenFolerByPath",data:e}),D=async e=>await a.post({url:"/api/DeleteFolerByPath",data:e}),P=async(e,s)=>await a.get({url:`/api/file/clearTag//${e}/${s}`});export{m as A,P as C,D,B as F,h as H,I as O,l as P,i as Q,d as R,g as S,w as T,c as a,u as b,$ as c,F as d,f as e,p as f,y as g,T as h};
