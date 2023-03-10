const {app, BrowserWindow,process,remote} = require('electron')
// const MenuItem = remote.MenuItem;
// const Menu = remote.Menu;
let syetem = require('child_process')
function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900
    })
    return win
}


// var menu = new Menu();
// menu.append(new MenuItem({ label: 'MenuItem1', click: function() { console.log('item 1 clicked'); } }));
// menu.append(new MenuItem({ type: 'separator' }));
// menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));



app.whenReady().then(() => {
    syetem.exec("cd src && cd app && start appVue.exe && cd .. && cd ..")
    win = createWindow()
    // win.addEventListener('contextmenu', function (e) {
    //     e.preventDefault();
    //     menu.popup(remote.getCurrentWindow());
    //   }, false);
    // syetem.exec("C:\\Windows\\System32\\cmd.exe start ./app/appVue.exe")
    win.loadURL("http://127.0.0.1:10801/home")
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
    })
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
