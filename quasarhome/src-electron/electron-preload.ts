/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.ts you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */

const { contextBridge, ipcRenderer,shell } = require('electron')
contextBridge.exposeInMainWorld(
  'electron',
  {
    createWindow: (args: any) => ipcRenderer.send('new-window',args),
    openBySystem: (args: any) => ipcRenderer.send('open-by-system',args),
    maxMainWindow: (args: any) => ipcRenderer.send('main-maximize',args),
    hideMainWindow: (args: any) => ipcRenderer.send('main-hide',args),
    resizeMainWindow: (args: any) => ipcRenderer.send('main-resize',args),
    showInFolder: (args: any) => ipcRenderer.send('show-in-folder',args),
  }
)
