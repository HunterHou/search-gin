import {
  ipcMain,
  nativeTheme,
  shell,
} from 'electron';
import { createSonWindow } from '.';
import { mainWindow } from '../electron-main';


// 监听 新窗口时间
ipcMain.on('new-window', (event, params) => {
  createSonWindow(params);
});

ipcMain.on('open-by-system', (event, data) => {
  const {Path} =data
  shell.openPath(Path);
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
});

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})
