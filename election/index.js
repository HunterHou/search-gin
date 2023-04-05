const { startBg, killBg } = require("./src/js/exec");
const { app, BrowserWindow, process, Menu, MenuItem } = require("electron");
function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
  });
  return win;
}

var menu = new Menu();
menu.append(
  new MenuItem({
    label: "打开",
    click: function () {
      console.log("打开");
    },
  })
);
menu.append(new MenuItem({ type: "separator" }));
menu.append(
  new MenuItem({
    label: "设置",
    type: "checkbox",
    checked: true,
    click: () => {
      console.log("设置");
    },
  })
);
menu.append(new MenuItem({ type: "separator" }));
menu.append(
  new MenuItem({
    label: "关闭",
    type: "checkbox",
    checked: true,
    click: () => {
      killBg();
      app.quit();
    },
  })
);

app.whenReady().then(() => {
  win = createWindow();
  Menu.setApplicationMenu(menu);
  win.loadFile("index.html");
  startBg((err, stdout, stderr) => {
    if (err) {
      console.log("startBg", err);
      return;
    }
    win.loadURL("http://127.0.0.1:10081/home");
  });
  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
