import sqlite3 from "sqlite3";
import {
  promiseAll,
  promiseRun,
  promiseClose,
} from "./promiseWrappedFunctions.js";

const createTableQuery =
  "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, contents TEXT)";
const insertTableQuery = "INSERT INTO memos (title, contents) VALUES (?, ?)";
const selectTableQuery = "SELECT * FROM memos";
const deleteTableQuery = "DELETE FROM memos WHERE id = ?";

export class MemoRepositry {
  constructor(dbPath = "memos.db") {
    this.dbPath = dbPath;
  }

  async save(memo) {
    const db = new sqlite3.Database(this.dbPath);

    try {
      // memosテーブルを作成
      await promiseRun(db, createTableQuery);
      // データベース登録を実行
      await promiseRun(db, insertTableQuery, [memo.title, memo.contents]);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await promiseClose(db);
    }
  }

  async find() {
    const db = new sqlite3.Database(this.dbPath);

    try {
      // データベースから全メモを取得
      return await promiseAll(db, selectTableQuery);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await promiseClose(db);
    }
  }

  async delete(memoId) {
    const db = new sqlite3.Database(this.dbPath);

    try {
      await promiseRun(db, deleteTableQuery, memoId);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await promiseClose(db);
    }
  }
}
