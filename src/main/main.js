"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
function createWindow() {
    var mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            devTools: process.env.NODE_ENV === 'development', // 只在开发环境启用开发者工具
            enableBlinkFeatures: '',
            nodeIntegration: true,
            contextIsolation: true, // 建议设为 true 以提高安全性
            preload: path.join(__dirname, 'preload.js') // 添加预加载脚本
        }
    });
    // 加载应用
    if (process.env.NODE_ENV !== 'production') {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows.length === 0) {
        createWindow();
    }
});
