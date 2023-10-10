import {
  app,
  BrowserWindow,
  Notification,
  clipboard,
  ipcMain,
  dialog,
  Tray,
  nativeImage,
  Menu,
  shell,
} from 'electron';
import path from 'path';
import { access } from 'fs';
import os from 'os';

const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;
// 创建主窗口
function createMainWindow() {
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1400,
    height: 1000,
    transparent: true,
    // titleBarStyle: 'hidden',
    backgroundColor: 'rgba(250,250,250,1)',
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      webSecurity: false,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
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
  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

function onContextMenu(e, params) {
  const {
    mediaType,
    srcURL,
    selectionText,
    editFlags: { canPaste },
  } = params;
  console.log('======================================');
  console.log(params);
  if (canPaste) {
    clipboard.readText();
  } else if (mediaType === 'image') {
    clipboard.writeText(srcURL);
    new Notification({
      title: '已复制',
      body: srcURL
    }).show();
  } else {
    clipboard.writeText(selectionText);
    new Notification({
      title: '已复制',
      body: selectionText
    }).show();
  }
}

// 创建子窗口
function createSonWindow(params: object | undefined) {
  const indow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1600,
    height: 900,
    transparent: true,
    titleBarStyle: 'hidden',
    // titleBarOverlay: true,
    backgroundColor: 'rgba(250,250,250,1)',
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      webSecurity: false,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
    ...params,
  });

  if (params?.router.indexOf('http') >= 0) {
    indow.loadURL(params?.router);
  } else {
    const url = `${process.env.APP_URL}#${params?.router || ''}`;
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
  indow.on('show', indow.focus);
  indow.on('closed', () => {
    mainWindow?.focus();
  });
  indow.webContents.on('context-menu', onContextMenu);
  return indow;
}
const appUri = path.resolve(__dirname, 'icons/exec/appQuaser.exe');
access(appUri, (err) => {
  if (err) {
    console.log(err);
  } else {
    shell.openPath(appUri);
  }
});

let tray;
// 启动
app.whenReady().then(() => {
  createMainWindow();

  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, 'icons/icon.png')
  );
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      type: 'normal',
      click: () => {
        mainWindow?.show();
      },
    },
    {
      label: '重启',
      type: 'normal',
      click: () => {
        app?.relaunch();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
});

// 所有窗口都关闭
app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createMainWindow();
  }
});

// 监听 新窗口时间
ipcMain.on('new-window', (event, params) => {
  createSonWindow(params);
});

// 监听 z最大化
ipcMain.on('main-maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow?.restore();
  } else {
    mainWindow?.maximize();
  }
});
// 监听 z最大化
ipcMain.on('main-hide', () => {
  mainWindow?.minimize();
});

ipcMain.on('main-resize', () => {
  mainWindow?.restore();
});

ipcMain.on('show-in-folder', (e, args: string) => {
  shell.showItemInFolder(args);
  shell.openPath(args);
});
