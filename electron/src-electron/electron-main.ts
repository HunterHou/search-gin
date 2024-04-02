import { app, BrowserWindow, nativeImage, shell } from 'electron';
import path from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import os from 'os';
import { createMainWindow } from './windows/index';
import { createTray } from './windows/tray';

const platform = process.platform || os.platform();

export let mainWindow: BrowserWindow;
export const iconMain = nativeImage.createFromPath(
  path.resolve(__dirname, 'icons/icon.png')
);
app.disableHardwareAcceleration();
// 启动第三方工具
const dirpath = process.env.DEBUGGING
  ? path.resolve(process.cwd(), 'tools')
  : path.resolve(__dirname, 'tools');

const srcPath = process.env.DEBUGGING
  ? path.resolve(process.cwd(), 'src-electron\\icons\\tools')
  : path.resolve(__dirname, 'icons\\tools');

if (!existsSync(dirpath)) {
  mkdirSync(dirpath, { recursive: true });
}

const SearchSystems = ['appQuaser.exe', 'ffmpeg.exe', 'setting.json'];
const execPath = path.resolve(dirpath, SearchSystems[0]);
SearchSystems.forEach((item) => {
  const srcFile = path.resolve(srcPath, item);
  const destFile = path.resolve(dirpath, item);
  if (!existsSync(destFile)) {
    copyFileSync(srcFile, destFile);
  }
});

shell.openPath(execPath).then((r) => console.log(r));

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
