import { app, BrowserWindow, nativeImage } from 'electron';
import path from 'path';

import os from 'os';
import { createMainWindow } from './windows/index';
import { createTray } from './windows/tray';
import { initSearchSystem } from './windows/tools';

const platform = process.platform || os.platform();

export let mainWindow: BrowserWindow;
export const iconMain = nativeImage.createFromPath(
  path.resolve(__dirname, 'icons/icon.png')
);
app.disableHardwareAcceleration();
initSearchSystem();

export const init = () => {
  mainWindow = createMainWindow(mainWindow);
};

export const killSearchSystem = () => {
  const processName = 'appQuaser.exe';
  const killCommand = process.platform === 'win32' ? 'taskkill' : 'pkill';
  exec(
    `${killCommand} /F /IM ${processName}.exe /T`,
    (error, stdout, stderr) => {
      if (error) {
        console.error('执行出错:', error);
        return;
      }

      console.log('stdout: ', stdout);
      console.error('stderr:', stderr);
    }
  );
  app.quit();
  // 请注意，pkill是在类Unix系统（如Linux或macOS）上使用的命令，
  // 而在Windows上你可能需要使用taskkill命令。如果你需要同时兼容Windows和类Unix系统，可以使用平台检测来选择正确的命令。
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
import { exec } from 'child_process';
