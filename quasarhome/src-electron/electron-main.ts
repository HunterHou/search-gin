import {
  app,
  BrowserWindow,
  nativeImage,
  shell,
} from 'electron';
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
// 启动
app.whenReady().then(() => {
  createMainWindow(mainWindow);
  createTray();
});

// 所有窗口都关闭
app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createMainWindow(mainWindow);
  }
});

import './windows/func';
