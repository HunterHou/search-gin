(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{573:function(t,e,n){"use strict";e.a={mounted:function(){var path=this.$route.path;this.$store.commit("setStorePath",path)}}},578:function(t,e,n){var content=n(611);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(55).default)("1f01b22e",content,!0,{sourceMap:!1})},610:function(t,e,n){"use strict";n(578)},611:function(t,e,n){var o=n(54)(!1);o.push([t.i,".container-body[data-v-4bf590a4]{min-width:600px;min-height:600px;height:100%;padding:1px;margin-bottom:20px}.floatButton[data-v-4bf590a4]{float:right;position:fixed;width:90px;top:320px;overflow:auto;z-index:999}.image-tool[data-v-4bf590a4]{margin-top:3px;margin-bottom:1px}.redbackground[data-v-4bf590a4]{background-color:#cd8a32}.icon-style[data-v-4bf590a4]{font-size:18px;color:red;margin-left:2px}.context-text[data-v-4bf590a4]{font-size:14px;font-size-adjust:inherit;margin-right:4px;margin-left:4px;position:relative;height:40px;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;-webkit-box-orient:vertical}.popperClass[data-v-4bf590a4]{height:auto;width:400px}.ecard[data-v-4bf590a4]{margin-left:6px;padding:0;background:#e4e6d1}.list-item[data-v-4bf590a4]{width:238px;height:358px;float:left;list-style:none}.image-tag[data-v-4bf590a4]{position:fixed}.img-list-item[data-v-4bf590a4]{width:auto;height:270px}.list-item-cover[data-v-4bf590a4]{width:420px;height:358px;float:left;list-style:none}.img-list-item-cover[data-v-4bf590a4]{width:auto;height:270px}.pageTool[data-v-4bf590a4]{position:fixed;bottom:4px;overflow:auto;z-index:999;margin-bottom:8px}.up[data-v-4bf590a4]{height:100%;width:100%;background-color:#f2f5f6;box-shadow:0 0 6px rgba(0,0,0,.12);text-align:center;line-height:40px;color:#1989fa}.tag-area[data-v-4bf590a4]{position:absolute;z-index:999;opacity:1}.tag-buttom[data-v-4bf590a4]{margin-left:144px}.tag-buttom[data-v-4bf590a4],.tag-buttom-cover[data-v-4bf590a4]{filter:alpha(opacity=100);opacity:1;position:absolute;z-index:999;margin-top:2px;float:right;text-align:justify;-moz-text-align-last:justify;text-align-last:justify}.tag-buttom-cover[data-v-4bf590a4]{margin-left:344px}.tag-area span[data-v-4bf590a4]{filter:alpha(opacity=90);opacity:.9;background:#94df71;margin-bottom:8px;z-index:99;height:23px;color:#000;line-height:20px}v-deep .el-tooltip__popper[data-v-4bf590a4]{width:300px;height:40px}.icon-button[data-v-4bf590a4]{margin:0;padding:0;width:24px;height:24px;font-size:18px;text-align:center}.mainButtomFloat[data-v-4bf590a4]{top:0;opacity:1;position:fixed;z-index:9999;width:100%;background:#b8aeae}.mainButtomRowFloat[data-v-4bf590a4]{margin:8px auto}.right-font[data-v-4bf590a4]{font-size:16px}",""]),t.exports=o},619:function(t,e,n){"use strict";n.r(e);n(67),n(56),n(93),n(57),n(94);var o=n(44),l=(n(584),n(26),n(60),n(590),n(592),n(593),n(594),n(595),n(596),n(598),n(599),n(600),n(601),n(602),n(603),n(604),n(61),n(46),n(434),n(112),n(430),n(117),n(605),n(116),n(607),n(66),n(78),n(77),n(70),n(95)),r=n.n(l);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={mixins:[n(573).a],data:function(){var t=this.$route.query,e=t.keywords,n=t.no;return{running:!0,settingInfo:{},settingInfoShow:!1,settingCheckAll:!1,isIndeterminateDir:!1,showIconNum:5,customerTag:"",sourceList:[],showStyle:"post",file:"",onlyRepeat:!1,dialogVisible:!1,dialogFormItemVisible:!1,sortField:"MTime",sortType:"desc",movieType:t.movieType||"",dataList:"",dataCnt:0,errorMsg:"",fit:"fit",keywords:e||"",searchPage:new Map,pagerCount:10,pageNo:n?parseInt(n):1,PageSize:12,PageSizes:[2,4,6,10,12,14,30,60,90,200],TotalCnt:0,TotalPage:0,loading:!1,TotalSize:0,CurCnt:0,ResultCnt:0,ResultSize:0,CurSize:0,theme:"dark",suggestions:[],formItem:{},IndexProgress:!1,rightClick:{clickId:"",clickCode:""},pressCtrl:!1,refreshIndexFlag:!1}},created:function(){var t=this;this.$nextTick((function(){t.$nuxt.$loading.start(),t.fetchButtom(),t.$nuxt.$loading.finish();var e=localStorage.getItem("searchSuggestions");e&&(t.suggestions=e.split(","));var n=localStorage.getItem("PageSizeStore");n&&(t.PageSize=parseInt(n))}))},mounted:function(){var t=this;document.onkeydown=function(e){var n=e.keyCode||e.keyCode||e.keyCode,o=e.ctrlKey||e.metaKey;37===n&&o?t.pageLoading(-1):39===n&&o?t.pageLoading(1):45==n?document.getElementById("searchInput").focus():13==n?document.getElementById("searchInput").click():192==n&&t.refreshIndex()},this.listenScroll(),setInterval(this.heartBeat,2e4),setTimeout((function(){t.queryList()}),1e3)},watch:{keywords:function(a){}},methods:{removeFormTag:function(t){var e=this.formItem.Tags.indexOf(t);this.formItem.Tags.splice(e,1),this.formItem.Name=this.formItem.Name.replaceAll(t,"")},formMovieTypeChange:function(){var t=this.formItem,e=t.MovieType,n=t.Name,o=t.FileType,l="";n.indexOf("{{")>=0?(l=n.substr(0,n.indexOf("{{")),e&&""!==e&&(l+="{{"+e+"}}"),l+=n.substr(n.indexOf("}}")+2,n.length)):l=(l=n.replaceAll("."+o,""))+"{{"+e+"}}."+o;this.formItem.Name=l},getDirsCnt:function(){return this.settingInfo.DirsCnt&&this.settingInfo.DirsCnt>0?"("+this.settingInfo.DirsCnt+")":"請指定"},handleCheckAllChange:function(t){this.settingInfo.Dirs=t?this.settingInfo.DirsLib:[],this.isIndeterminateDir=!1},handleCheckedCitiesChange:function(t){var e=t.length;this.settingCheckAll=e===this.settingInfo.Dirs.length,this.isIndeterminateDir=e>0&&e<this.settingInfo.Dirs.length},settingSubmit:function(){var t=this,e=d({},this.settingInfo);r.a.post("api/setting",e).then((function(e){200===e.status&&(t.settingInfoShow=!1,t.$message({message:e.data.Message,type:"success"}),t.refreshIndex(),t.fetchButtom())}))},listenScroll:function(){document.addEventListener("scroll",(function(){var t=document.documentElement.scrollTop,main=document.getElementById("mainButtom"),e=document.getElementById("mainButtomRow");t>60?(main.classList.add("mainButtomFloat"),e.classList.add("mainButtomRowFloat")):(main.classList.remove("mainButtomFloat"),e.classList.add("mainButtomRowFloat"))}),!0)},gotoSearch:function(t){this.keywords=t,this.queryList()},handleClick:function(t,e){var title=t.$slots.default[0].data.attrs.action,n=this.rightClick,o=n.clickId,l=n.clickCode;"sync"==title?this.syncThis(o):"play"==title?this.playThis(o):"fold"==title?this.openThisFolder(o):"downImage"==title?this.getImageList(o,2):"delete"==title?this.deleteThis(o,2):"info"==title?this.gotoContext(o):"sourceLink"==title?window.open("".concat(this.settingInfo.BaseUrl,"/").concat(l),"_blank"):this.settingInfo.Tags.indexOf(title)>=0&&this.addTag(o,title)},notContainTag:function(t,e){return!t||!e||t.indexOf(e)<0},customerTagEmpty:function(){return!this.customerTag},addCustomerTag:function(t){this.addTag(t,this.customerTag),this.customerTag=""},addTag:function(t,title){var e=this,n="api/file/addTag/"+t+"/"+title;r.a.get(n).then((function(n){if(200===n.status)if(200==n.data.Code){e.alertSuccess(n.data.Message);for(var i=0;i<e.dataList.length;i++)if(e.dataList[i].Id==t)return void e.dataList[i].Tags.push(title)}else e.alertFail(n.data.Message)}))},closeTag:function(t,title){var e=this,n="api/file/clearTag/"+t+"/"+title;r.a.get(n).then((function(n){if(200===n.status)if(200==n.data.Code){e.alertSuccess(n.data.Message);for(var i=0;i<e.dataList.length;i++){if(e.dataList[i].Id==t){var o=e.dataList[i].Tags.indexOf(title);e.dataList[i].Tags.splice(o,1)}return}e.refreshIndex()}else e.alertFail(n.data.Message)}))},handleContextmenu:function(t){this.rightClick={clickId:t.key,clickCode:t.data.attrs.code}},getPng:function(t){return"http://127.0.0.1:8082/api/png/"+t},getJpg:function(t){return"http://127.0.0.1:8082/api/jpg/"+t},editItem:function(t){this.formItem=t,this.dialogFormItemVisible=!0},editItemSubmit:function(){var t=this,e=this.formItem,n=e.Id,o=e.Name,l=e.Code,c=e.Actress,code=l.trim().replaceAll(".","_"),d="";0!=c.length&&(d+="["+c.trim().replaceAll("."," ").trim()+"]"),0!=code.length&&(d+=" ["+code.trim()+"]");for(var f=o.trim().split("."),h=f.length,m=0;m<h;m++){var v=f[m];if(m==h-1)d+="."+v;else if(0==m){d+=v.replace(v.charAt(0),v.charAt(0).toUpperCase())}else{d+=" "+v.replace(v.charAt(0),v.charAt(0).toUpperCase())}}var param={Id:n,Name:d,Code:code,Actress:c};r.a.post("api/file/rename",param).then((function(e){200===e.status&&(200==e.data.Code?(t.alertSuccess(e.data.Message),t.refreshIndex(),t.formItem={},t.dialogFormItemVisible=!1):t.alertFail(e.data.Message))}))},clearWords:function(){this.pageNo=this.searchPage.get(""),this.queryList()},isShowCover:function(){return"cover"==this.showStyle?(this.showIconNum=10,!0):(this.showIconNum=6,!1)},copy:function(data){var t=document.createElement("input");t.value=data,t.id="copyInput",document.body.appendChild(t),t.select();try{document.execCommand("Copy");this.alertSuccess("复制成功")}catch(t){this.alertFail("复制失败")}document.body.removeChild(t)},fetchButtom:function(){var t=this;r.a.get("api/buttoms").then((function(e){200==e.status&&(t.settingInfo=e.data,t.settingInfo.DirsCnt=t.settingInfo.Dirs.length)}))},notQiBing:function(t){return"骑兵"!=t},notSiBaDa:function(t){return"斯巴达"!=t},notNative:function(t){return"国产"!=t},notBuBing:function(t){return"步兵"!=t},onlyRepeatQuery:function(){this.onlyRepeat=!0,this.queryList()},pageLoading:function(i){this.pageNo=parseInt(this.pageNo)+parseInt(i),this.pageNo<1&&(this.pageNo=1),this.pageNo>this.TotalPage&&(this.pageNo=this.TotalPage),this.queryList(!0)},playThis:function(t){var e=this;r.a.get("api/play/"+t).then((function(t){200===t.status?e.alertSuccess(t.data.Message):e.alertFail(t.data.Message)}))},openThisFolder:function(t){var e=this;r.a.get("api/openFolder/"+t).then((function(t){200===t.status&&e.alertSuccess(t.data.Message)}))},heartBeat:function(){var t=this;this.running&&r.a.get("api/heartBeat").then((function(e){200===e.status?t.running=!0:(t.running=!1,t.alertFail("系统意外关闭，请重启"))})).catch((function(){t.running=!1,t.alertFail("系统意外关闭，请重启")}))},deleteThis:function(t){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){r.a.get("api/delete/"+t).then((function(t){200===t.status&&e.alertSuccess(t.data.Message)}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},thisActress:function(t){this.pageNo=1,this.keywords=t,this.queryList()},syncThis:function(t){var e=this;r.a.get("api/sync/"+t).then((function(t){200===t.status&&e.$notify({title:"成功",message:t.data.Message,type:"success",position:"bottom-right"})}))},setMovieType:function(t,e){var n=this;e=4==e?"国产":"3"==e?"斯巴达":"1"==e?"步兵":"骑兵",r.a.get("api/setMovieType/"+t+"/"+e).then((function(t){200===t.status&&n.$notify({title:"成功",message:t.data.Message,type:"success",position:"bottom-right"})}))},infoThis:function(t){var e=this;r.a.get("api/info/"+t).then((function(t){200===t.status&&e.alertSuccess(t.data.Message)}))},getImageList:function(t){var e=this;r.a.get("api/imageList/"+t).then((function(t){200===t.status&&e.alertSuccess(t.data.Message)}))},refreshIndex:function(){var t=this;this.refreshIndexFlag=!0,r.a.get("api/refreshIndex").then((function(e){200===e.status&&(t.queryList(),t.refreshIndexFlag=!1)}))},handleSelect:function(t){this.keywords=t},handleSelectTag:function(t){this.customerTag=t},fetchTagsLib:function(t,e){var n=this.settingInfo.TagsLib;console.log(n),e(t?n.filter(this.createFilter(t)):n)},fetchSuggestion:function(t,e){var n=this.suggestions;e((t?n.filter(this.createFilter(t)):n).slice(0,50))},createFilter:function(t){return function(e){return e.toLowerCase().indexOf(t.toLowerCase())>=0}},queryList:function(t){var e=this;this.dataList=[];var n=this.keywords?this.keywords:"";this.searchPage.set(n,this.pageNo);var data={Page:this.pageNo,PageSize:this.PageSize,Keyword:n,SortType:this.sortType,SortField:this.sortField},title=n;if(""!==n){var o=this.suggestions.indexOf(n);o>=0&&this.suggestions.splice(o,1),this.suggestions.unshift(n),this.suggestions.length>100&&this.suggestions.pop(),localStorage.setItem("searchSuggestions",this.suggestions)}else title="文件";this.loading=!0,this.IndexProgress=!1,r.a.post("api/movieList",data).then((function(o){if(200===o.status){var l=o.data.Data;e.ResultCnt=o.data.ResultCnt,e.TotalCnt=o.data.TotalCnt,e.CurCnt=o.data.CurCnt,e.TotalPage=o.data.TotalPage,e.TotalSize=o.data.TotalSize,e.ResultSize=o.data.ResultSize,e.CurSize=o.data.CurSize,e.IndexProgress=o.data.IndexProgress,l&&l.length>0&&(l.map((function(t){t.Code==t.Actress&&(t.Code="",t.Actress=""),t.Code.lastIndexOf("-")==t.Code.length-1&&(t.Code=t.Code.substring(0,t.Code.length-1)),t.name=t.Name.trim(),t.Name=t.Name.replace("["+t.Code+"]",""),t.Name=t.Name.replace("["+t.Actress+"]","")})),t?l.map((function(t){e.dataList.push(t)})):e.dataList=l);var r=e.getRouterParam(),path=r.path;e.$router.push({path:path,query:d(d({},r),{},{keywords:n,no:e.pageNo,path:void 0})}),e.onlyRepeat=!1,e.loading=!1,e.TotalPage,document.title=title,e.$forceUpdate()}}))},getRouterParam:function(){var t=this.$route,e=t.query,path=t.path;return d(d({},e),{},{path:path,PageSize:this.PageSize,sortField:this.sortField,sortType:this.sortType,movieType:this.movieType})},gotoContext:function(t){this.$router.push({path:"/context/".concat(t),query:d({},this.getRouterParam())})},openLick:function(code){var t=this.settingInfo.BaseUrl+code;window.open(t,"_blank")},openSearch:function(t){var e=this.settingInfo.BaseUrl+"search/"+t;window.open(e,"_blank")},openWin:function(t){var e=this;r.a.get("api/info/"+t).then((function(t){e.sourceList=[],200===t.status&&(e.file=t.data,e.dialogVisible=!0,e.loadDirInfo(e.file.Id,!0))}))},loadDirInfo:function(t,e){var n=this;r.a.get("/api/dir/"+t).then((function(t){if(200===t.status&&t.data&&t.data.length>0){n.imageList=[];for(var i=0;i<t.data.length;i++)"jpg"==t.data[i].FileType&&n.imageList.push(t.data[i].ImageBase);e&&(n.sourceList=n.imageList)}}))},handleSizeChange:function(t){this.PageSize=t,localStorage.setItem("PageSizeStore",t),this.queryList()},handleCurrentChange:function(t){this.pageNo=t,this.queryList()},alertSuccess:function(t){this.$message({message:t,type:"success"})},alertFail:function(t){this.$message({message:t,type:"fail"})}}},h=(n(610),n(58)),component=Object(h.a)(f,(function(){var t=this,e=this,n=e.$createElement,o=e._self._c||n;return o("div",{staticClass:"container-body"},[o("el-backtop",{staticStyle:{width:"50px",height:"50px"},attrs:{bottom:100}},[o("div",{staticClass:"up"},[e._v("UP")])]),e._v(" "),!e.loading&&e.TotalPage>1?o("el-button",{staticStyle:{position:"fixed",top:"640px",overflow:"auto","z-index":"999",left:"5px"},attrs:{size:"small",type:"danger",round:""},on:{click:function(t){return e.pageLoading(-1)}}},[o("i",{staticClass:"el-icon-back"}),e._v("上一頁\n  ")]):e._e(),e._v(" "),!e.loading&&e.TotalPage>1?o("el-button",{staticStyle:{position:"fixed",top:"640px",overflow:"auto","z-index":"999",right:"5px"},attrs:{size:"small",type:"danger",round:""},on:{click:function(t){return e.pageLoading(1)}}},[e._v("下一頁"),o("i",{staticClass:"el-icon-right"})]):e._e(),e._v(" "),o("div",{attrs:{id:"mainButtom"}},[o("el-row",{attrs:{id:"mainButtomRow"}},[o("el-col",{attrs:{span:2}},[o("el-button",{attrs:{type:"success",size:"mini",icon:"el-icon-location",loading:e.refreshIndexFlag},on:{click:function(t){return e.refreshIndex()}}},[e._v("扫描\n        ")]),e._v(" "),o("el-popover",{attrs:{placement:"left-top",width:"200px",trigger:"click"},model:{value:e.settingInfoShow,callback:function(t){e.settingInfoShow=t},expression:"settingInfoShow"}},[o("h1",{attrs:{align:"center"}},[e._v("索引配置")]),e._v(" "),o("div",{staticStyle:{margin:"30px 20px"}},[o("el-row",[o("el-col",{attrs:{span:20}},[o("el-row",[o("el-col",{attrs:{span:4}},[o("span",[e._v("视频类型：")])]),e._v(" "),o("el-col",{attrs:{span:20}},[o("el-select",{staticStyle:{width:"90%"},attrs:{multiple:"",placeholder:"请选择"},model:{value:e.settingInfo.VideoTypes,callback:function(t){e.$set(e.settingInfo,"VideoTypes",t)},expression:"settingInfo.VideoTypes"}},e._l(e.settingInfo.Types,(function(t){return o("el-option",{key:t,attrs:{label:t,value:t}})})),1)],1)],1),e._v(" "),o("el-row",[o("el-col",{attrs:{span:4}},[o("span",[e._v("扫描路径：")])]),e._v(" "),o("el-col",{attrs:{span:20}},[o("el-checkbox",{attrs:{size:"mini",indeterminate:e.isIndeterminateDir},on:{change:e.handleCheckAllChange},model:{value:e.settingCheckAll,callback:function(t){e.settingCheckAll=t},expression:"settingCheckAll"}},[e._v("全选")]),e._v(" "),o("el-checkbox-group",{on:{change:e.handleCheckedCitiesChange},model:{value:e.settingInfo.Dirs,callback:function(t){e.$set(e.settingInfo,"Dirs",t)},expression:"settingInfo.Dirs"}},e._l(e.settingInfo.DirsLib,(function(t){return o("el-checkbox",{key:t,attrs:{label:t}},[e._v(e._s(t))])})),1)],1)],1)],1),e._v(" "),o("el-col",{attrs:{span:4}},[o("el-button",{staticStyle:{height:"50px",width:"120px"},attrs:{type:"primary"},on:{click:e.settingSubmit}},[e._v("提 交")])],1)],1)],1),e._v(" "),o("el-link",{attrs:{slot:"reference"},slot:"reference"},[e._v(" "+e._s(e.getDirsCnt()))])],1)],1),e._v(" "),o("el-col",{attrs:{span:1}},[o("el-link",{staticStyle:{color:"green"}},[o("i",{staticClass:"el-icon-zoom-out",attrs:{underline:!0,title:"重复"},on:{click:function(t){return e.onlyRepeatQuery()}}},[e._v("重")])])],1),e._v(" "),o("el-col",{attrs:{span:3}},[o("el-radio-group",{attrs:{size:"mini"},on:{change:function(t){return e.queryList()}},model:{value:e.sortField,callback:function(t){e.sortField=t},expression:"sortField"}},[o("el-radio-button",{attrs:{label:"Code"}},[e._v("名")]),e._v(" "),o("el-radio-button",{attrs:{label:"MTime"}},[e._v("时")]),e._v(" "),o("el-radio-button",{attrs:{label:"Size"}},[e._v("容")])],1)],1),e._v(" "),o("el-col",{attrs:{span:2}},[o("el-radio-group",{attrs:{size:"mini"},on:{change:function(t){return e.queryList()}},model:{value:e.sortType,callback:function(t){e.sortType=t},expression:"sortType"}},[o("el-radio-button",{attrs:{label:"desc"}},[e._v("倒")]),e._v(" "),o("el-radio-button",{attrs:{label:"asc"}},[e._v("正")])],1)],1),e._v(" "),o("el-col",{attrs:{span:5}},[o("el-radio-group",{attrs:{size:"mini"},on:{change:function(t){return e.queryList()}},model:{value:e.movieType,callback:function(t){e.movieType=t},expression:"movieType"}},[o("el-radio-button",{attrs:{label:""}},[e._v("~")]),e._v(" "),o("el-radio-button",{attrs:{label:"骑兵"}},[e._v("骑")]),e._v(" "),o("el-radio-button",{attrs:{label:"步兵"}},[e._v("步")]),e._v(" "),o("el-radio-button",{attrs:{label:"国产"}},[e._v("国")]),e._v(" "),o("el-radio-button",{attrs:{label:"斯巴达"}},[e._v("欧")])],1)],1),e._v(" "),o("el-col",{attrs:{span:10}},[o("el-autocomplete",{staticStyle:{"min-width":"80px",width:"auto"},attrs:{id:"searchInput",placeholder:"请输入关键词",clearable:"","fetch-suggestions":e.fetchSuggestion,size:"mini"},on:{select:e.handleSelect,clear:e.clearWords},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.queryList()}},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.item;return[n?o("div",{staticClass:"name"},[e._v(e._s(n))]):e._e()]}}]),model:{value:e.keywords,callback:function(t){e.keywords=t},expression:"keywords"}},[o("el-button",{attrs:{slot:"append",type:"primary",size:"mini",icon:"el-icon-search"},on:{click:function(n){t.pageNo=1,e.queryList()}},slot:"append"},[e._v("Enter\n          ")])],1)],1)],1)],1),e._v(" "),o("el-row",{staticStyle:{"margin-top":"4px"}},[o("el-col",{attrs:{span:3,offset:1}},[o("el-radio-group",{attrs:{size:"mini"},model:{value:e.showStyle,callback:function(t){e.showStyle=t},expression:"showStyle"}},[o("el-radio-button",{attrs:{label:"cover"}},[e._v("封面")]),e._v(" "),o("el-radio-button",{attrs:{label:"post"}},[e._v("海报")])],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[e.running?e._e():o("span",{staticStyle:{color:"red"}},[e._v("运行异常")]),e._v(" "),e.running?e._e():o("el-divider",{attrs:{direction:"vertical"}}),e._v(" "),o("el-link",{attrs:{underline:!1},on:{click:function(n){t.pageNo=1,t.keywords="",e.queryList()}}},[o("span",[e._v(" 总："+e._s(e.TotalSize)+"("+e._s(e.TotalCnt)+") ")])]),e._v(" "),o("el-divider",{attrs:{direction:"vertical"}}),e._v(" "),o("span",[e._v(" 搜："+e._s(e.ResultSize)+"("+e._s(e.ResultCnt)+") ")]),e._v(" "),o("el-divider",{attrs:{direction:"vertical"}}),e._v(" "),o("span",[e._v(" 页："+e._s(e.CurSize)+"("+e._s(e.CurCnt)+")")]),e._v(" "),o("el-divider",{attrs:{direction:"vertical"}})],1)],1),e._v(" "),o("v-contextmenu",{ref:"contextmenu",attrs:{theme:e.theme},on:{contextmenu:e.handleContextmenu}},[o("v-contextmenu-item",{on:{click:e.handleClick}},[o("i",{staticClass:"el-icon-refresh right-font",staticStyle:{margin:"0 8px",color:"green"},attrs:{underline:!1,title:"同步",action:"sync"}},[o("b",[e._v("同步")])])]),e._v(" "),o("v-contextmenu-item",{on:{click:e.handleClick}},[o("i",{staticClass:"el-icon-share right-font",staticStyle:{margin:"0 16px",color:"green"},attrs:{underline:!1,title:"链接",action:"sourceLink"}},[e._v("链接")])]),e._v(" "),o("v-contextmenu-item",{on:{click:e.handleClick}},[o("i",{staticClass:"el-icon-folder-opened right-font",staticStyle:{margin:"0 24px"},attrs:{underline:!1,title:"文件夹",action:"fold"}},[e._v("文夹")])]),e._v(" "),o("v-contextmenu-item",{on:{click:e.handleClick}},[o("i",{staticClass:"el-icon-video-play",staticStyle:{margin:"0 16px",color:"green right-font"},attrs:{underline:!1,title:"播放",action:"play"}},[o("b",[e._v("播放")])])]),e._v(" "),o("v-contextmenu-item",{on:{click:e.handleClick}},[o("i",{staticClass:"el-icon-question right-font",staticStyle:{margin:"0 14px"},attrs:{title:"详情",action:"info"}},[e._v("详情")])]),e._v(" "),o("v-contextmenu-item",{on:{click:e.handleClick}},[o("i",{staticClass:"el-icon-download right-font",staticStyle:{margin:"0 8px"},attrs:{underline:!1,title:"刮图",action:"downImage"}},[e._v("刮图")])]),e._v(" "),o("v-contextmenu-item",{on:{click:e.handleClick}},[o("i",{staticClass:"el-icon-delete right-font",staticStyle:{margin:"2 8px"},attrs:{underline:!1,title:"删除",action:"delete"}},[e._v("删除")])])],1),e._v(" "),o("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{"margin-top":"8px","min-height":"600px"},attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},e._l(e.dataList,(function(t){return o("li",{key:t.Id,class:e.isShowCover()?"list-item-cover":"list-item"},[o("div",{staticClass:"tag-area"},e._l(t.Tags,(function(n){return o("li",{key:n},[o("el-tag",{attrs:{closable:"",effect:"dark",type:"",size:e.isShowCover()?"small":"mini"},on:{close:function(o){return e.closeTag(t.Id,n)}}},[o("el-link",{attrs:{underline:!1,plain:""},on:{click:function(t){return e.gotoSearch(n)}}},[o("span",[e._v(" "+e._s(n))])])],1)],1)})),0),e._v(" "),o("el-popover",{attrs:{placement:"bottom-start",width:"auto",trigger:"click"}},[""!=t.MovieType?o("div",{staticStyle:{"max-width":"300px"}},[e._l(e.settingInfo.Tags,(function(n){return o("el-button",{key:n,staticStyle:{margin:"1px 2px"},attrs:{size:"mini",type:"warning",plain:"",disabled:!e.notContainTag(t.Tags,n)},on:{click:function(o){return e.addTag(t.Id,n)}}},[o("span",{staticStyle:{"font-size":"12px"}},[e._v(e._s(n))])])})),e._v(" "),o("br"),o("br"),e._v(" "),o("el-autocomplete",{staticStyle:{width:"240px"},attrs:{placeholder:"新标签","fetch-suggestions":e.fetchTagsLib,size:"mini"},on:{select:e.handleSelectTag},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.item;return[n?o("div",{staticClass:"name",staticStyle:{"font-size":"14px"}},[e._v("\n            "+e._s(n)+"\n          ")]):e._e()]}}],null,!0),model:{value:e.customerTag,callback:function(t){e.customerTag=t},expression:"customerTag"}},[o("el-button",{staticStyle:{"font-size":"14px"},attrs:{slot:"append",size:"mini",type:"primary",disabled:e.customerTagEmpty(),icon:"el-icon-circle-plus"},on:{click:function(n){return e.addCustomerTag(t.Id)}},slot:"append"},[e._v("加")])],1)],2):e._e(),e._v(" "),""==t.MovieType?o("div",{staticStyle:{float:"right"}},[o("el-button",{attrs:{plain:"",size:"mini"},on:{click:function(n){return e.setMovieType(t.Id,2)}}},[o("i",{staticClass:"el-icon-bicycle icon-style",attrs:{title:"骑兵"}},[e._v("骑兵")])]),e._v(" "),o("el-button",{attrs:{plain:"",size:"mini"},on:{click:function(n){return e.setMovieType(t.Id,1)}}},[o("i",{staticClass:"el-icon-sunny icon-style",attrs:{title:"步兵"}},[e._v("步兵")])]),e._v(" "),o("el-button",{attrs:{plain:"",size:"mini"},on:{click:function(n){return e.setMovieType(t.Id,4)}}},[o("i",{staticClass:"el-icon-location icon-style",attrs:{title:"国产"}},[e._v("国产")])]),e._v(" "),o("el-button",{attrs:{plain:"",size:"mini"},on:{click:function(n){return e.setMovieType(t.Id,3)}}},[o("i",{staticClass:"el-icon-ship icon-style",attrs:{title:"欧美"}},[e._v("斯巴达")])])],1):e._e(),e._v(" "),o("el-button",{class:e.isShowCover()?"tag-buttom-cover":"tag-buttom",attrs:{slot:"reference",size:e.isShowCover()?"small":"mini",type:"warning",icon:"el-icon-circle-plus",round:""},slot:"reference"},[o("b",[e._v("\n        "+e._s(t.MovieType?t.MovieType:"无")+"\n      ")])])],1),e._v(" "),o("el-card",{staticClass:"ecard",attrs:{shadow:"always","body-style":{padding:"0px",margin:"4px 2px",background:t.MovieType?"":"rgb(205, 138, 50)"}}},[o("div",{directives:[{name:"contextmenu",rawName:"v-contextmenu:contextmenu",arg:"contextmenu"}],key:t.Id,class:[e.theme],attrs:{code:t.Code}},[t?o("div",{class:e.isShowCover()?"img-list-item-cover":"img-list-item"},[o("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.isShowCover()?e.getJpg(t.Id):e.getPng(t.Id),fit:"contain",lazy:""},on:{click:function(n){return e.openWin(t.Id)}}})],1):e._e()]),e._v(" "),o("div",{staticClass:"image-tool"},[o("el-button",{staticClass:"icon-button el-icon-video-play",attrs:{type:"primary",plain:"",title:"播放"},on:{click:function(n){return e.playThis(t.Id)}}}),e._v(" "),o("el-button",{staticClass:"icon-button el-icon-user-solid",attrs:{type:"warning",plain:"",title:"优优"},on:{click:function(n){return e.thisActress(t.Actress)}}}),e._v(" "),o("el-button",{staticClass:"icon-button el-icon-folder-opened",attrs:{type:"success",plain:"",title:"文件夹"},on:{click:function(n){return e.openThisFolder(t.Id,2)}}}),e._v(" "),o("el-button",{staticClass:"icon-button el-icon-edit",attrs:{plain:"",type:"success",title:"编辑"},on:{click:function(n){return e.editItem(t)}}}),e._v(" "),o("el-button",{staticClass:"icon-button",attrs:{type:"danger",plain:"",title:"删除"},on:{click:function(n){return e.deleteThis(t.Id,2)}}},[o("i",{staticClass:"el-icon-delete"})]),e._v(" "),o("el-button",{staticClass:"icon-button",attrs:{type:"danger",plain:"",title:"刮图"},on:{click:function(n){return e.getImageList(t.Id,2)}}},[o("i",{staticClass:"el-icon-download"})]),e._v(" "),o("el-button",{staticClass:"icon-button",attrs:{type:"danger",plain:"",title:"同步"},on:{click:function(n){return e.syncThis(t.Id)}}},[o("i",{staticClass:"el-icon-refresh"})]),e._v(" "),7<e.showIconNum&&e.notQiBing(t.MovieType)?o("el-button",{staticClass:"icon-button el-icon-bicycle",attrs:{type:"info",plain:"",title:"骑兵"},on:{click:function(n){return e.setMovieType(t.Id,2)}}}):e._e(),e._v(" "),e.notBuBing(t.MovieType)&&7<e.showIconNum?o("el-button",{staticClass:"icon-button el-icon-sunny",attrs:{plain:"",type:"info",title:"步兵"},on:{click:function(n){return e.setMovieType(t.Id,1)}}}):e._e(),e._v(" "),e.notNative(t.MovieType)&&7<e.showIconNum?o("el-button",{staticClass:"icon-button",attrs:{plain:"",type:"info",title:"国产"},on:{click:function(n){return e.setMovieType(t.Id,4)}}},[o("i",{staticClass:"el-icon-location"})]):e._e(),e._v(" "),e.notSiBaDa(t.MovieType)&&7<e.showIconNum?o("el-button",{staticClass:"icon-button",attrs:{plain:"",type:"info",title:"欧美"},on:{click:function(n){return e.setMovieType(t.Id,3)}}},[o("i",{staticClass:"el-icon-ship"})]):e._e(),e._v(" "),o("el-link",[7>e.showIconNum?o("el-dropdown",{attrs:{placement:"top-start"}},[o("i",{staticClass:"el-icon-more icon-style"}),e._v(" "),o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e.notQiBing(t.MovieType)?o("el-dropdown-item",[o("el-link",[o("i",{staticClass:"el-icon-bicycle icon-style",attrs:{title:"骑兵"},on:{click:function(n){return e.setMovieType(t.Id,2)}}},[e._v("骑兵")])])],1):e._e(),e._v(" "),e.notBuBing(t.MovieType)?o("el-dropdown-item",[o("i",{staticClass:"el-icon-sunny icon-style",attrs:{title:"步兵"},on:{click:function(n){return e.setMovieType(t.Id,1)}}},[e._v("步兵")])]):e._e(),e._v(" "),e.notNative(t.MovieType)?o("el-dropdown-item",[o("el-link",[o("i",{staticClass:"el-icon-location icon-style",attrs:{underline:!1,title:"国产"},on:{click:function(n){return e.setMovieType(t.Id,4)}}},[e._v("国产")])])],1):e._e(),e._v(" "),e.notSiBaDa(t.MovieType)?o("el-dropdown-item",[o("el-link",[o("i",{staticClass:"el-icon-ship icon-style",attrs:{underline:!1,title:"欧美"},on:{click:function(n){return e.setMovieType(t.Id,3)}}},[e._v("欧美")])])],1):e._e(),e._v(" "),7>e.showIconNum?o("el-dropdown-item",[o("i",{staticClass:"el-icon-refresh-right icon-style",attrs:{title:"信息"},on:{click:function(n){return e.infoThis(t.Id,2)}}},[e._v("信")])]):e._e()],1)],1):e._e()],1),e._v(" "),o("div",{staticClass:"context-text",staticStyle:{"font-size":"13px"}},[t.Actress?o("el-link",{staticStyle:{color:"green"},on:{click:function(n){return e.copy(t.Actress)}}},[e._v(e._s(t.Actress))]):e._e(),e._v(" "),t.Code?o("el-link",{staticStyle:{color:"orange"},on:{click:function(n){return e.copy(t.Code)}}},[e._v(e._s(t.Code))]):e._e(),e._v(" "),o("el-popover",{attrs:{placement:"top",width:"460",trigger:"hover","close-delay":1}},[t.Actress?o("el-link",{staticStyle:{color:"green"},on:{click:function(n){return e.copy(t.Actress)}}},[e._v(e._s(t.Actress))]):e._e(),e._v(" "),t.Actress?o("el-divider",{attrs:{direction:"vertical"}}):e._e(),e._v(" "),t.Code?o("el-link",{staticStyle:{color:"orange"},on:{click:function(n){return e.copy(t.Code)}}},[e._v(e._s(t.Code))]):e._e(),e._v(" "),t.Code?o("el-divider",{attrs:{direction:"vertical"}}):e._e(),e._v("\n          【"+e._s(t.SizeStr)+"】\n          "+e._s(e.moment(t.MTime).format("yyyy-MM-DD HH:MM"))+"\n          "),o("hr"),e._v(" "),o("span",{staticStyle:{"margin-buttom":"30px","margin-top":"30px","margin-left":"30px","margin-right":"30px"}},[e._v("\n            "+e._s(t.Name))]),e._v(" "),o("span",{staticStyle:{color:"red"},attrs:{slot:"reference"},slot:"reference"},[e._v("\n            【"+e._s(t.SizeStr)+"】\n          ")])],1),e._v("\n        "+e._s(t.Name)+"\n      ")],1)],1)])],1)})),0),e._v(" "),o("el-pagination",{staticClass:"pageTool",staticStyle:{align:"center"},attrs:{background:"","page-sizes":e.PageSizes,"page-size":e.PageSize,layout:"prev, pager, next, sizes, jumper","current-page":e.pageNo,total:e.ResultCnt},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),o("el-dialog",{attrs:{width:"66%",modal:!0,"lock-scroll":!0,title:e.file.Title,visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[e.file?o("div",[o("div",{attrs:{border:"1"}},[o("el-image",{staticStyle:{margin:"1px auto",width:"80%",height:"auto"},attrs:{src:e.getJpg(e.file.Id)},on:{click:function(t){return e.gotoContext(e.file.Id)}}}),e._v(" "),o("el-row",{attrs:{gutter:24}},[o("el-col",{attrs:{span:4,tyle:"text-align:right"}},[e._v("\n          YY：\n          "),o("a",{attrs:{href:"javascript:void(0);"},on:{click:function(t){return e.openSearch(e.file.Actress)}}},[o("span",[e._v(e._s(e.file.Actress))])])]),e._v(" "),o("el-col",{attrs:{span:8}},[e._v("\n          Code：\n          "),o("a",{attrs:{href:"javascript:void(0);"},on:{click:function(t){return e.openLick(e.file.Code)}}},[o("span",[e._v(e._s(e.file.Code))])])]),e._v(" "),o("el-col",{attrs:{span:12}},[o("span",{on:{click:function(t){return e.gotoContext(e.file.Id)}}},[e._v("大小：【"+e._s(e.file.SizeStr)+"】")]),e._v(" "),o("span",[e._v("时间："+e._s(e.moment(e.file.MTime).format("yyyy-MM-DD")))])])],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:20}},[o("span",[e._v("源：")]),e._v(" "),o("span",[e._v(e._s(e.file.Path))])])],1),e._v(" "),o("el-divider")],1)]):e._e(),e._v(" "),e._l(e.sourceList,(function(t,n){return o("div",{key:n,staticStyle:{display:"flex",margin:"10px auto"}},[o("el-image",{staticStyle:{"min-width":"800px",margin:"0 auto"},attrs:{src:t,"preview-src-list":e.sourceList,lazy:""}})],1)})),e._v(" "),o("el-divider")],2),e._v(" "),o("el-dialog",{attrs:{title:"文件信息",visible:e.dialogFormItemVisible,"close-on-press-escape":!1,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormItemVisible=t}}},[o("el-form",{attrs:{"label-position":"right",model:e.formItem,size:"small","label-width":"18%"}},[o("el-form-item",{attrs:{label:"类型"}},[o("el-radio-group",{attrs:{size:"mini"},on:{change:e.formMovieTypeChange},model:{value:e.formItem.MovieType,callback:function(t){e.$set(e.formItem,"MovieType",t)},expression:"formItem.MovieType"}},[o("el-radio-button",{attrs:{label:""}},[e._v("无")]),e._v(" "),o("el-radio-button",{attrs:{label:"骑兵"}},[e._v("骑")]),e._v(" "),o("el-radio-button",{attrs:{label:"步兵"}},[e._v("步")]),e._v(" "),o("el-radio-button",{attrs:{label:"国产"}},[e._v("国")]),e._v(" "),o("el-radio-button",{attrs:{label:"斯巴达"}},[e._v("欧")])],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"脸谱"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.formItem.Actress,callback:function(t){e.$set(e.formItem,"Actress",t)},expression:"formItem.Actress"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"编码"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.formItem.Code,callback:function(t){e.$set(e.formItem,"Code",t)},expression:"formItem.Code"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"文件名称"}},[o("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.formItem.Name,callback:function(t){e.$set(e.formItem,"Name",t)},expression:"formItem.Name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"标签"}},e._l(e.formItem.Tags,(function(t){return o("el-tag",{key:t,staticStyle:{"margin-right":"8px"},attrs:{effect:"dark",closable:"",type:"",size:"small"},on:{close:function(n){return e.removeFormTag(t)}}},[e._v("\n        "+e._s(t)+"\n      ")])})),1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogFormItemVisible=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.editItemSubmit}},[e._v("确 定")])],1)],1)],1)}),[],!1,null,"4bf590a4",null);e.default=component.exports}}]);