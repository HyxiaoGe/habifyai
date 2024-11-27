import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
    getDailyStats: () => ipcRenderer.invoke('get-daily-stats'),
    getAppUsage: () => ipcRenderer.invoke('get-app-usage'),
    getBrowserHistory: () => ipcRenderer.invoke('get-browser-history')
});