const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  MenuItem,
  nativeImage,
} = require("electron");
const { exec } = require("child_process");

const showThis = () => {
  app.relaunch();
};

function startBg() {
  const exePath = "start  appVite.exe";
  exec(exePath);
}
startBg();
// function killBg() {
//   const ports = ["10081"];
//   const showProcess = process.platform == "win32" ? "netstat -ano" : "ps aux";
//   console.log(ports, showProcess);
//   exec(showProcess, (err: any, stdout: any, stderr: any) => {
//     if (err) {
//       return console.log(err);
//     }
//     stdout.split("\n").filter(function (line: any) {
//       var p = line.trim().split(/\s+/);
//       var address = p[1];
//       if (address != undefined) {
//         if (ports.indexOf(address.split(":")[1]) >= 0) {
//           exec(
//             "taskkill /F /pid " + p[4],
//             function (err: any, stdout: any, stderr: any) {
//               if (err) {
//                 return console.log("释放指定端口失败！！");
//               }
//               app.quit();
//               console.log("占用指定端口的程序被成功杀掉！");
//             }
//           );
//         }
//       }
//     });
//   });
// }

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
      app.quit();
    },
  })
);

const bgUrl = "http://localhost:17001";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    // webPreferences: {
    // 	preload: path.join(__dirname, 'preload.js')
    // }
  });
  // 加载vue url视本地环境而定，如http://localhost:5173
  win.loadURL(bgUrl);
  Menu.setApplicationMenu(menu);
};

app.whenReady().then(() => {
  createWindow();

  const icon = nativeImage.createFromPath("assert/s.png");
  const tray = new Tray(icon);
  tray.setToolTip("This is my application");
  tray.setTitle("This is my title");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "打开网页",
      click: () => {
        exec("start " + bgUrl);
      },
    },
    {
      label: "显示窗口",
      click: showThis,
    },
    {
      label: "关闭系统",
      click: () => {
        console.log("关闭系统");
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
