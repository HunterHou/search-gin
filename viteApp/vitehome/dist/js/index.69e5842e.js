import{u as t}from"./userAxios.0453d902.js";const a=t(),o=async e=>await a.post({url:"/api/movieList",data:e}),i=async e=>await a.get({url:`/api/info/${e}`}),c=async e=>await a.get({url:`/api/dir/${e}`}),l=async e=>await a.get({url:`/api/play/${e}`}),u=async e=>await a.get({url:`/api/openFolder/${e}`}),p=async e=>await a.get({url:`/api/delete/${e}`}),y=async e=>await a.get({url:`/api/sync/${e}`}),g=async(e,s)=>await a.get({url:`/api/setMovieType/${e}/${s}`}),w=async()=>await a.get({url:"/api/refreshIndex"}),F=async e=>await a.get({url:`/api/imageList/${e}`}),$=async()=>await a.get({url:"/api/heartBeat"}),d=async(e,s)=>await a.get({url:`/api/file/addTag/${e}/${s}`}),f=async e=>await a.post({url:"/api/file/rename",data:e}),m=async e=>await a.post({url:"/api/OpenFolerByPath",data:e}),h=async e=>await a.post({url:"/api/DeleteFolerByPath",data:e}),B=async(e,s)=>await a.get({url:`/api/file/clearTag//${e}/${s}`});export{d as A,B as C,h as D,f as F,$ as H,m as O,l as P,o as Q,w as R,y as S,i as a,c as b,g as c,u as d,p as e,F as f};
