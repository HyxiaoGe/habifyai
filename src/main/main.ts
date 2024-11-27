import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { Database } from './database';
import { AppCollector } from './collectors/AppCollector';
import { ipcMain } from 'electron';

ipcMain.handle('get-daily-stats', async () => {
    // 实现获取每日统计的逻辑
    const today = new Date().toISOString().split('T')[0]
    return await Database.all(
        `SELECT app_name, SUM(duration) as total_duration FROM app_usage WHERE date(start_time) = ? GROUP BY app_name`, [today]
    )
})

ipcMain.handle('get-app-usage', async () => {
    // 获取应用使用情况
    return await Database.all(
        `SELECT * FROM app_usage ORDER BY start_time DESC LIMIT 100`
    )
})

const appCollector = new AppCollector()

async function createWindow() {

    await Database.initialize()

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

    appCollector.start()

    // 加载应用
    if (process.env.NODE_ENV !== 'production') {
        setTimeout(() => {
            mainWindow.loadURL('http://localhost:5173');
            mainWindow.webContents.openDevTools();
        }, 1000);
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    appCollector.stop()
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) {
        createWindow()
    }
})