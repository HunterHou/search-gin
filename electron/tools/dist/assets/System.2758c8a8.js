var h=Object.defineProperty;var n=(e,t,s)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var i=(e,t,s)=>(n(e,typeof t!="symbol"?t+"":t,s),s);import{ax as l}from"./index.6b10a76a.js";class u{constructor(){i(this,"Id","");i(this,"Tags");i(this,"MovieType","");i(this,"FileType","");i(this,"Jpg","");i(this,"Png","");i(this,"Actress","");i(this,"Code","");i(this,"MTime");i(this,"SizeStr");i(this,"Name","");i(this,"Title","");i(this,"Path","");i(this,"originName","");i(this,"listButton")}fromObject(t){return Object.assign(this,t),this}isEmpty(){return this.Id==null||this.Id==null}}const d=l({id:"system",state:()=>({isFullscreen:!1,shutdownLeftSecond:null,shutdownTimer:null,Logo:{title:"M\u7CFB\u7EDF",logo:"",url:"/mfilelist"},videoOptions:{autoPlay:!0,volume:.6,control:!0,loop:!0,muted:!0,controlBtns:["audioTrack","quality","speedRate","volume","setting","pip","pageFullScreen","fullScreen"]},History:[],Playing:new u,PlayMode:800,drawerRight:!1,Favorite:[],FileSearchParam:{Page:1,PageSize:10,MovieType:"",SortField:"MTime",SortType:"desc",Keyword:"",OnlyRepeat:!1,showStyle:"post",listButton:["\u64AD\u653E","\u7F16\u8F91","\u79FB\u52A8","\u6587\u4EF6\u5939","\u8F6C\u6362","\u5220\u9664","\u526A\u5207","\u8BE6\u60C5"]},SettingInfo:{ControllerHost:"http://127.0.0.1:10081",ImageHost:"http://127.0.0.1:10081",StreamHost:"http://127.0.0.1:10081"},SearchSuggestions:[]}),getters:{getHistory(){return this.History},getFavorite(){return this.Favorite},getSettingInfo(){return this.SettingInfo},getStreamHost(){return this.SettingInfo.StreamHost},getImageHost(){return this.SettingInfo.ImageHost},getControllerHost(){var e;return(e=this.SettingInfo)==null?void 0:e.ControllerHost},getSuggestions(){return(!this.SearchSuggestions||this.SearchSuggestions.length==0)&&(this.SearchSuggestions=JSON.parse(localStorage.getItem("SearchSuggestions")||"[]")),this.SearchSuggestions},getSearchParam(){return this.FileSearchParam}},actions:{syncSearchParam(e){const{Page:t,PageSize:s,MovieType:o,SortField:r,SortType:a,Keyword:S,showStyle:g}=e;this.FileSearchParam.Page=t,this.FileSearchParam.PageSize=s,this.FileSearchParam.MovieType=o,this.FileSearchParam.SortField=r,this.FileSearchParam.SortType=a,this.FileSearchParam.Keyword=S,this.FileSearchParam.showStyle=g,e.Keyword&&this.addSuggestions(e.Keyword)},addFavorite(e){for(let t=0;t<this.Favorite.length;t++){const s=this.Favorite[t];if(s.Page==e.Page&&s.PageSize==e.PageSize&&s.Keyword==e.Keyword&&s.SortField==e.SortField&&s.SortType==e.SortType&&s.MovieType==e.MovieType)break}this.Favorite.length>50&&this.Favorite.splice(0,49)},setSettingInfo(e){this.SettingInfo=e},setImageHost(e){this.SettingInfo.ImageHost=e},setStreamHost(e){this.SettingInfo.StreamHost=e},setControllerHost(e){this.SettingInfo.ControllerHost=e},setPage(e){this.FileSearchParam.Page=e},setPageSize(e){this.FileSearchParam.PageSize=e},setMovieType(e){this.FileSearchParam.MovieType=e},setKeyword(e){this.FileSearchParam.Keyword=e},setSortField(e){this.FileSearchParam.SortField=e},setSortType(e){this.FileSearchParam.SortType=e},setOnlyRepeat(e){this.FileSearchParam.OnlyRepeat=e},addSuggestions(e){if(!e)return;this.SearchSuggestions||(this.SearchSuggestions=[]);const t=this.SearchSuggestions.indexOf(e);t>=0&&this.SearchSuggestions.splice(t,1),this.SearchSuggestions.unshift(e),this.SearchSuggestions.length>100&&this.SearchSuggestions.pop(),localStorage.setItem("SearchSuggestions",JSON.stringify(this.SearchSuggestions))}}});export{u as F,d as u};
