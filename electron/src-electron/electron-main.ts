import { app, BrowserWindow, nativeImage, shell } from 'electron';
import path from 'path';
import { accessSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import os from 'os';
import { createMainWindow } from './windows/index';
import { createTray } from './windows/tray';

const platform = process.platform || os.platform();

export let mainWindow: BrowserWindow;
export const iconMain = nativeImage.createFromPath(
  path.resolve(__dirname, 'icons/icon.png')
);
app.disableHardwareAcceleration()
// 启动第三方工具
if (!process.env.DEBUGGING) {
  if(!existsSync('exec')){
    mkdirSync('exec');
  }
  if(!existsSync('exec/appQuaser.exe')){
    copyFileSync(path.resolve(__dirname, 'exec/appQuaser.exe'), 'exec/appQuaser.exe')
  }
}
const appUri = process.env.DEBUGGING ? path.resolve(__dirname, 'exec/appQuaser.exe') : "./exec/appQuaser.exe";
if(accessSync(appUri)){
  shell.openPath(appUri);
}

export const init = () => {
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

import './windows/func';
