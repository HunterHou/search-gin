import { app, BrowserWindow, nativeImage, shell } from 'electron';
import path from 'path';
import { access } from 'fs';
import os from 'os';
import { createMainWindow } from './windows/index';
import { createTray } from './windows/tray';

const platform = process.platform || os.platform();

export let mainWindow: BrowserWindow;
export const iconMain = nativeImage.createFromPath(
  path.resolve(__dirname, 'icons/icon.png')
);
// 启动第三方工具
const appUri = path.resolve(__dirname, 'icons/exec/appQuaser.exe');
access(appUri, (err) => {
  if (err) {
    console.log(err);
  } else {
    shell.openPath(appUri);
  }
});
export const init = () => {
  console.log('init');
  mainWindow = createMainWindow(mainWindow);
};
// 启动
app.whenReady().then(() => {
  init();
  createTray(mainWindow);
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      init();
    }
  });
});

// 所有窗口都关闭
app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    // app.quit()
    console.log('window-all-closed');
  }
});

// app.on('activate', () => {
//   if (mainWindow === undefined) {
//     createMainWindow(mainWindow);
//   }
//   mainWindow.show()
// });

import './windows/func';
