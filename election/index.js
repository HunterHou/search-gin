const sys = require("child_process");
const process = require("process");
const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  MenuItem,
  nativeImage,
} = require("electron");

const bgUrl = "http://127.0.0.1:10081/home";
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
    click: (e) => {
      console.log("设置", e);
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
      app.quit();
    },
  })
);

app.whenReady().then(() => {
  const mainWindow = createWindow();
  Menu.setApplicationMenu(menu);
  mainWindow.loadFile("index.html");
  setTimeout(() => {
    mainWindow.loadURL(bgUrl);
  }, 3000);
  startBg(mainWindow);
  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "打开网页",
      click: () => {
        sys.exec("start " + bgUrl);
      },
    },
    {
      label: "显示窗口",
      click: showThis,
    },
    {
      label: "关闭系统",
      click: () => {
        killBg();
      },
    },
  ]);
  const icon = nativeImage.createFromPath("assert/s.png");
  const tray = new Tray(icon);
  tray.setToolTip("This is my application");
  tray.setTitle("This is my title");
  tray.setContextMenu(contextMenu);
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
const showThis = () => {
  const { app } = require("electron");
  app.relaunch();
};

function startBg(mainWindow) {
  sys.exec(
    "cd viteApp && start appVite.exe && cd .. ",
    (err, stdout, stderr) => {
      console.log("startBg", err, stdout, stderr);
      if (err) {
        console.log("startBg", err);
        return;
      }
      mainWindow.loadURL(bgUrl);
    }
  );
}

function killBg() {
  const ports = ["10081"];
  const showProcess = process.platform == "win32" ? "netstat -ano" : "ps aux";
  console.log(ports, showProcess);
  sys.exec(showProcess, (err, stdout, stderr) => {
    console.log(err, stdout, stderr);
    if (err) {
      return console.log(err);
    }
    stdout.split("\n").filter(function (line) {
      var p = line.trim().split(/\s+/);
      var address = p[1];
      if (address != undefined) {
        if (ports.indexOf(address.split(":")[1]) >= 0) {
          sys.exec("taskkill /F /pid " + p[4], function (err, stdout, stderr) {
            if (err) {
              return console.log("释放指定端口失败！！");
            }
            app.quit();
            console.log("占用指定端口的程序被成功杀掉！");
          });
        }
      }
    });
  });
}
