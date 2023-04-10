export class SettingInfo {
  Tags: string[] = []
  ImageTypes: string[] = []
  DocsTypes: string[] = []
  VideoTypes: string[] = []
  DirsLib: string[] = []
  Dirs: string[] = []
  Types: string[] = ['mp4', 'jpg']
  Buttons: string[] = ['刮图', '删除']
  BaseDir: string[] = []
  tagLibData: string[] = []
  TagsLib: string[] = []
  Remark: string
  SystemHtml: string
  BaseUrl: string
  OMUrl: string
  ControllerHost: string
  ImageHost: string
  StreamHost: string
  IsDb = false
}

export const buttonEnum = ['刮图', '删除', '移动', '编辑', '文件夹', '图鉴', '转换', '更多']
