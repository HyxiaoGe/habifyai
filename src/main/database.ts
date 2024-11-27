import { Database as SQLiteDatabase } from "sqlite3";
import { app } from "electron";
import * as path  from 'path';

export class DatabaseClass {
    private static db: SQLiteDatabase;

    static async initialize() {
        const dbPath = path.join(app.getPath('userData'), 'userdata.db')

        return new Promise((resolve, reject) => {
            this.db = new SQLiteDatabase(dbPath, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                this.createTables().then(resolve).catch(reject);
            });
        });
    }

    private static async createTables() {
        const queries = [
            `CREATE TABLE IF NOT EXISTS app_usage (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                app_name TEXT NOT NULL,
                start_time DATETIME NOT NULL,
                end_time DATETIME,
                duration INTEGER,
                window_title TEXT
            )`,
            
            `CREATE TABLE IF NOT EXISTS browser_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT NOT NULL,
                title TEXT,
                visit_time DATETIME NOT NULL,
                duration INTEGER
            )`,
            
            `CREATE TABLE IF NOT EXISTS analysis_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE NOT NULL,
                analysis_type TEXT NOT NULL,
                result_json TEXT NOT NULL
            )`
        ];

        for (const query of queries) {
            await this.run(query);
        }
    }

    static async run(sql: string, params: any[] = []): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

    static async all<T>(sql: string, params: any[] = []): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows as T[]);
                }
            })
        })
    }

}

export const Database = DatabaseClass;