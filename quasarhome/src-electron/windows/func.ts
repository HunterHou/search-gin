import {
  ipcMain,
  shell,
} from 'electron';
import { createSonWindow } from '.';
import { mainWindow } from '../electron-main';


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
