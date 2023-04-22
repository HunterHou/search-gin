import {app,BrowserWindow} from 'electron'
app.on('ready',()=>{
    const win =new BrowserWindow()
    win.loadURL("https://www.baidu.com")
})