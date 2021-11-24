const {app, BrowserWindow,process} = require('electron')
let syetem = require('child_process')
function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900
    })
    return win
}

app.whenReady().then(() => {
    win = createWindow()
    // syetem.exec("C:\\Windows\\System32\\cmd.exe start ./app/appVue.exe")
    syetem.exec("start src/app/appVue.exe")
    win.loadURL("http:\\127.0.0.1")
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
    })
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

