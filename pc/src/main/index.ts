import { app, shell, BrowserWindow, Menu, Tray, nativeImage } from 'electron'
import { exec, spawn } from 'child_process'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import appVite from '../../resources/appVite.exe?asset'
const bgUrl = 'http://localhost:10081/home'
const contextMenu = Menu.buildFromTemplate([
  {
    label: '打开网页',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    click: () => {
      openWeb()
    }
  },
  {
    label: '关闭系统',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    click: () => {
      killBg()
    }
  }
])

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  const iconTray = nativeImage.createFromPath(icon)
  const tray = new Tray(iconTray)
  tray.setToolTip('This is my application')
  tray.setTitle('This is my title')
  tray.setContextMenu(contextMenu)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.webContents.openDevTools()
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.loadURL(bgUrl)
  } else {
    mainWindow.loadURL(bgUrl)
    // mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  shell.openPath(appVite)
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

function killBg() {
  const ports = ['10081']
  const showProcess = process.platform == 'win32' ? 'netstat -ano' : 'ps aux'
  console.log(ports, showProcess)
  exec(showProcess, (err, stdout, stderr) => {
    console.log(err, stdout, stderr)
    if (err) {
      return console.log(err)
    }
    stdout.split('\n').filter(function (line) {
      const p = line.trim().split(/\s+/)
      const address = p[1]
      if (address != undefined) {
        if (ports.indexOf(address.split(':')[1]) >= 0) {
          exec('taskkill /F /pid ' + p[4], function (err, stdout, stderr) {
            console.log(err, stdout, stderr)
            if (err) {
              return console.log('释放指定端口失败！！')
            }
            app.quit()
            console.log('占用指定端口的程序被成功杀掉！')
          })
        }
      }
    })
  })
}

const openWeb = () => {
  shell.openExternal(bgUrl)
}
