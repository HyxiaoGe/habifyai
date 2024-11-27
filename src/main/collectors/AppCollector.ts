import { BrowserWindow } from "electron";
import { Database } from "../database";
import * as activeWin from 'active-win';

export class AppCollector {
    private currentApp: {
        name: string;
        title: string;
        startTime: Date;
    } | null = null;

    private collectionInterval: NodeJS.Timeout | null = null;

    start() {
        this.collectionInterval = setInterval(async () => {
            try {
                const activeWindow = await activeWin();
                if (!activeWindow) return;

                const appName = String(activeWindow.owner)
                const { title } = activeWindow

                if (this.currentApp && (this.currentApp.name !== appName || this.currentApp?.title !== title)) {
                    // 应用切换，保存上一个应用的使用记录
                    await this.saveCurrentAppUsage();
                }

                if (!this.currentApp || this.currentApp.name !== appName || this.currentApp.title !== title) {
                    // 记录新的应用
                    this.currentApp = {
                        name: appName,
                        title: title,
                        startTime: new Date()
                    };
                }
            } catch (error) {
                console.error('Error collecting app usage:', error);
            }
        }, 1000) // 每秒采集一次
    }

    private async saveCurrentAppUsage() {
        if (!this.currentApp) return;

        const endTime = new Date();
        const duration = endTime.getTime() - this.currentApp.startTime.getTime();

        await Database.run(
            `INSERT INTO app_usage (app_name, window_title, start_time, end_time, duration)
             VALUES (?, ?, ?, ?, ?)`,
            [
                this.currentApp.name,
                this.currentApp.title,
                this.currentApp.startTime.toISOString(),
                endTime.toISOString(),
                duration
            ]
        );
    }

    stop() {
        if (this.collectionInterval) {
            clearInterval(this.collectionInterval);
            this.saveCurrentAppUsage(); // 保存最后的使用记录
        }
    }

}