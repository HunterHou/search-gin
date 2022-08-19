class MovieModel {
  Id: string;
  Tags: string[];
  MovieType: string;
  FileType: string;
  Jpg: string;
  Png: string;
  Actress: string;
  Code: string;
  MTime: Date;
  SizeStr: Date;
  Name: string;
  originName: string;
}

class MovieQuery extends MovieModel {
  Page = 1;
  PageSize = 14;
  OnlyRepeat = false;
  Keyword: string;
  SortField = "MTime";
  SortType = "desc";
}

export { MovieQuery, MovieModel };

export const formMovieTypeChange = (view:any) => {
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
