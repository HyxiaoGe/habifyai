"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = exports.DatabaseClass = void 0;
var sqlite3_1 = require("sqlite3");
var electron_1 = require("electron");
var path = require("path");
var DatabaseClass = /** @class */ (function () {
    function DatabaseClass() {
    }
    DatabaseClass.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dbPath;
            var _this = this;
            return __generator(this, function (_a) {
                dbPath = path.join(electron_1.app.getPath('userData'), 'userdata.db');
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.db = new sqlite3_1.Database(dbPath, function (err) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            _this.createTables().then(resolve).catch(reject);
                        });
                    })];
            });
        });
    };
    DatabaseClass.createTables = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queries, _i, queries_1, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queries = [
                            "CREATE TABLE IF NOT EXISTS app_usage (\n                id INTEGER PRIMARY KEY AUTOINCREMENT,\n                app_name TEXT NOT NULL,\n                start_time DATETIME NOT NULL,\n                end_time DATETIME,\n                duration INTEGER,\n                window_title TEXT\n            )",
                            "CREATE TABLE IF NOT EXISTS browser_history (\n                id INTEGER PRIMARY KEY AUTOINCREMENT,\n                url TEXT NOT NULL,\n                title TEXT,\n                visit_time DATETIME NOT NULL,\n                duration INTEGER\n            )",
                            "CREATE TABLE IF NOT EXISTS analysis_results (\n                id INTEGER PRIMARY KEY AUTOINCREMENT,\n                date DATE NOT NULL,\n                analysis_type TEXT NOT NULL,\n                result_json TEXT NOT NULL\n            )"
                        ];
                        _i = 0, queries_1 = queries;
                        _a.label = 1;
                    case 1:
                        if (!(_i < queries_1.length)) return [3 /*break*/, 4];
                        query = queries_1[_i];
                        return [4 /*yield*/, this.run(query)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DatabaseClass.run = function (sql_1) {
        return __awaiter(this, arguments, void 0, function (sql, params) {
            var _this = this;
            if (params === void 0) { params = []; }
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.db.run(sql, params, function (err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            });
        });
    };
    DatabaseClass.all = function (sql_1) {
        return __awaiter(this, arguments, void 0, function (sql, params) {
            var _this = this;
            if (params === void 0) { params = []; }
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.db.all(sql, params, function (err, rows) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(rows);
                            }
                        });
                    })];
            });
        });
    };
    return DatabaseClass;
}());
exports.DatabaseClass = DatabaseClass;
exports.Database = DatabaseClass;
