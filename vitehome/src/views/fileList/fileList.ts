import { useSystemProperty } from "@/store/System";
import { reactive } from "vue";

const systemProperty = useSystemProperty();

export const formItemTagsChange = (view) => {
    let { Name, Tags, FileType } = view.formItem;
    let newName = "";
    if (Name.indexOf("《") >= 0) {
      const startC = Name.substr(0, Name.indexOf("《") + 1);
      const endC = Name.substr(Name.indexOf("》"), Name.length);
      newName = startC;
      if (Tags && Tags.length > 0) {
        newName += Tags;
      }
      newName += endC;
    } else {
      newName = Name.replaceAll("." + FileType, "");
      newName = newName + "《" + Tags + "》" + "." + FileType;
    }
    view.formItem.Name = newName;
  };
  

export const formMovieTypeChange = (view: any) => {
  let { MovieType, originName, FileType } = view.currentFile;
  let newName = "";
  if (originName.indexOf("{{") >= 0) {
    const startC = originName.substr(0, originName.indexOf("{{"));
    const endC = originName.substr(
      originName.indexOf("}}") + 2,
      originName.length
    );
    newName = startC;
    if (MovieType && MovieType !== "") {
      newName += "{{" + MovieType + "}}";
    }
    newName += endC;
  } else {
    newName = originName.replaceAll("." + FileType, "");
    newName = newName + "{{" + MovieType + "}}" + "." + FileType;
  }
  view.currentFile.originName = newName;
};

export const javSearch = (actress: string) => {
  const url = systemProperty.getSettingInfo.BaseUrl + "/search/" + actress;
  window.open(url);
};
export const javCode = (code: string) => {
  const url = systemProperty.getSettingInfo.BaseUrl + "/" + code;
  window.open(url);
};

export const fetchSuggestion = (queryString: string, callback) => {

    const sourceSuggestions = systemProperty.getSuggestions;
    if (!sourceSuggestions) {
      return;
    }
    const results = queryString
      ? sourceSuggestions.filter(createFilter(queryString))
      : sourceSuggestions;
    // 调用 callback 返回建议列表的数据
    const finalResults = results.slice(0, 50);
    callback(finalResults);
  };

  export const fetchTagsLib = (queryString, callback) => {
    const suggrestTagsLib = systemProperty.getSettingInfo?.TagsLib;
    const results = queryString
      ? suggrestTagsLib.filter(createFilter(queryString))
      : suggrestTagsLib;
    callback(results);
  };

const createFilter = (queryString) => {
    return (res) => {
      return res.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
    };
  };


export const notContainTag = (tags: string[], tag: string) => {
    if (!tags || !tag) {
      return true;
    }
    if (tags.indexOf(tag) < 0) {
      return true;
    }
    return false;
  };
export const customerTagEmpty = (view:any) => {
    if (view.customerTag) {
      return false;
    }
    return true;
  };
  

 export  const notQiBing = (movieType: string): boolean => {
    if (movieType !== "骑兵") {
      return true;
    }
    return false;
  };
  
  export const notSiBaDa = (movieType: string): boolean => {
    if (movieType !== "斯巴达") {
      return true;
    }
    return false;
  };
  export  const notNative = (movieType: string): boolean => {
    if (movieType !== "国产") {
      return true;
    }
    return false;
  };
  
  export const notBuBing = (movieType: string): boolean => {
    if (movieType !== "步兵") {
      return true;
    }
    return false;
  };

export const optionsPC = reactive({
  width: "1200px", //播放器高度
  height: "700px", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "", //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.8, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
});
