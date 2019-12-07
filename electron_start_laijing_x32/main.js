// Modules to control application life and create native browser window
const {
    Menu,
    app,
    BrowserWindow
} = require('electron')
const path = require('path');

const pluginName = 'flash32/pepflashplayer32_32_0_0_270.dll';


let plugins = path.join(__dirname, pluginName)

// 获得系统里面flash插件的位置
// if (app.getPath('pepperFlashSystemPlugin')) {
//     app.commandLine.appendSwitch('ppapi-flash-path', app.getPath('pepperFlashSystemPlugin'))
//     // app.commandLine.appendSwitch('ppapi-flash-version', '31.0.0.122')
// }


// 在项目开始的时候，我把第三方资源放到了根目录的static文件夹里，发现并没有起到加载第三方资源的效果。通用查询，发现electron-packager提供--extra-resource字段。

// 核心方法，用 --extra-resource 字段来存储。用 path 模块来获取绝对路径。

if (__dirname.includes(".asar")) {
    plugins = path.join(process.resourcesPath + '/' + pluginName)
}
app.commandLine.appendSwitch('ppapi-flash-path', plugins)

// app.commandLine.appendSwitch('ppapi-flash-version', '31.0.0.122');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // 去除菜单导航
    Menu.setApplicationMenu(null);
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            plugins: true,
            nodeIntegration: false,
        },
    })

    mainWindow.isMenuBarVisible(false)

    // mainWindow.loadFile('index.html');
    // and load the index.html of the app.
    // 来京
    mainWindow.loadURL('https://s.laijingedu.cn/eduWeb/#/?orgId=E77F53F585F74E6FBE7CD2996281B690');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.