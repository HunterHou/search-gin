import { BrowserWindow, Menu, Tray, app } from 'electron';
import { iconMain, init } from '../electron-main';

let mainWindow: BrowserWindow;
const showWindow = () => {
  console.log('showWindow', mainWindow);
  if (mainWindow?.isDestroyed()) {
    init();
  } else {
    mainWindow?.show();
  }
};

export const createTray = (thisWindow: BrowserWindow) => {
  console.log('createTray');
  mainWindow = thisWindow;
  const tray = new Tray(iconMain);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      type: 'normal',
      click: showWindow,
    },
    {
      label: '重启',
      type: 'normal',
      click: () => {
        app?.relaunch();
      },
    },
    {
      label: '退出',
      type: 'normal',
      click: () => {
        app?.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
};
