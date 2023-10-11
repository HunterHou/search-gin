import { Menu, Tray, app } from "electron";
import { iconMain, mainWindow } from "../electron-main";



export const createTray = ()=>{
  const tray = new Tray(iconMain);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      type: 'normal',
      click: () => {
        mainWindow?.show();
      },
    },
    {
      label: '重启',
      type: 'normal',
      click: () => {
        app?.relaunch();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
}
