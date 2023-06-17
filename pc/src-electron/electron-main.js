import { app, BrowserWindow, nativeTheme, Notification } from "electron";
import { ChildProcess } from "child_process";
import path from "path";
import  ChildProcess  from "child_process";
import os from "os";
const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER);

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === "win32" && nativeTheme.shouldUseDarkColors === true) {
    require("fs").unlinkSync(
      path.join(app.getPath("userData"), "DevTools Extensions")
    );
  }
} catch (_) {}

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
app.whenReady().then(() => {
  startBg();
  createWindow();
});

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function startBg(mainWindow) {
  const exePath = "start " + publicFolder + "\\viteApp\\appVite.exe";
  const sb = new Notification({ title: exePath });
  sb.show();
  ChildProcess.exec(exePath,'', (err, stdout, stderr) => {
    console.log("startBg", err, stdout, stderr);
    if (err) {
      console.log("startBg", err);
      return;
    }
  });
}