import { BrowserWindow, Menu, Tray, app } from 'electron';
import { iconMain, init } from '../electron-main';


export const createTray = (thisWindow: BrowserWindow) => {
  const tray = new Tray(iconMain);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      type: 'normal',
      click: ()=>{
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
        app?.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
};
