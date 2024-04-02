import { BrowserWindow, Menu, Tray } from 'electron';
import { iconMain, init, killSearchSystem } from '../electron-main';

export const createTray = (thisWindow: BrowserWindow) => {
  const tray = new Tray(iconMain);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      type: 'normal',
      click: () => {
        if (thisWindow?.isDestroyed()) {
          init();
        } else {
          thisWindow?.show();
        }
      },
    },
    {
      label: '退出',
      type: 'normal',
      click: () => {
        killSearchSystem();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
};
