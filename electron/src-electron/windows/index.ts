import {
  BrowserWindow,
  Notification,
  clipboard,
  BrowserWindowConstructorOptions,
  ContextMenuParams,
} from 'electron';
import path from 'path';

let xw = 20;
let yw = 20;

const moveWindow = () => {
  xw += 50;
  yw += 40;
  if (yw >200) {
    yw = 20;
    xw += 50;
  }
};

interface SonWindowParam extends BrowserWindowConstructorOptions {
  router: string;
}

// 创建子窗口
export function createSonWindow(params: SonWindowParam) {
  const indow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1280,
    height: 900,
    x: xw,
    y: yw,
    backgroundColor: 'rgba(250,250,250,1)',
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      webSecurity: false,
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
    ...params,
  });

  if (params?.router.indexOf('http') >= 0) {
    indow.loadURL(params?.router);
  } else {
    const url = `${process.env.APP_URL}${params?.router || ''}`;
    indow.loadURL(url);
  }

  if (process.env.DEBUGGING) {
    indow.webContents.openDevTools();
  } else {
    indow.webContents.on('devtools-opened', () => {
      indow?.webContents.closeDevTools();
    });
  }
  indow.setMenu(null);
  indow.webContents.on('context-menu', onContextMenu);
  moveWindow()
  return indow;
}
// 创建主窗口
export function createMainWindow(mainWindow: BrowserWindow) {
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1280,
    height: 1080,
    // transparent: true, //禁止resize
    darkTheme: true,
    maximizable: true,
    minimizable: true,
    resizable: true,
    simpleFullscreen: true,
    skipTaskbar: true,
    titleBarOverlay: false,
    zoomToPageWidth: true,
    titleBarStyle: 'customButtonsOnHover',
    backgroundMaterial: 'mica',
    vibrancy: 'sidebar',
    x: xw,
    y: yw,
    title: '搜索',
    backgroundColor: 'rgba(250,250,250,1)',
    useContentSize: true,
    webPreferences: {
      scrollBounce: true,
      experimentalFeatures: true,
      backgroundThrottling: true,
      contextIsolation: true,
      webSecurity: false,
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });
  const url = `${process.env.APP_URL}`;
  mainWindow.loadURL(url);
  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }
  mainWindow.setMenu(null);
  mainWindow.webContents.on('context-menu', onContextMenu);
  moveWindow()
  return mainWindow
}

const onContextMenu = (_e: Event, params: ContextMenuParams) => {
  const {
    mediaType,
    srcURL,
    selectionText,
    editFlags: { canPaste },
  } = params;
  if (canPaste) {
    clipboard.readText();
  } else if (mediaType === 'image') {
    clipboard.writeText(srcURL);
    new Notification({
      title: '已复制',
      body: srcURL,
    }).show();
  } else {
    clipboard.writeText(selectionText);
    new Notification({
      title: '已复制',
      body: selectionText,
    }).show();
  }
};

