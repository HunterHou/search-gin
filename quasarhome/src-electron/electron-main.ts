import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import os from 'os';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;

function createMainWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1400,
    height: 1000,
    // transparent: true,
    titleBarStyle: 'hidden',
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

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(() => {
  createMainWindow();
});

function createSonWindow(params: any | undefined) {
  /**
   * Initial window options
   */
  const indow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1600,
    height: 900,
    transparent: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
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
  const url = `${process.env.APP_URL}#${params?.router || ''}`;
  // console.log(url);
  indow.loadURL(url);
  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    indow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    indow.webContents.on('devtools-opened', () => {
      indow?.webContents.closeDevTools();
    });
  }
  indow.setMenu(null);
  indow.on('show', indow.focus);
  indow.on('closed', () => {
    mainWindow?.focus();
  });
  return indow;
}

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

ipcMain.on('new-window', (event, params) => {
  console.log(params);
  // 打开网址（加载页面）
  createSonWindow(params);
});
