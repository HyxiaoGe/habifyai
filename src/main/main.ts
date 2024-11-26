import { app, BrowserWindow } from 'electron'
import * as path from 'path'

function createWindow() {
    const mainWindow = new BrowserWindow({
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
        mainWindow.loadURL('http://localhost:5173')
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
    }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) {
        createWindow()
    }
})