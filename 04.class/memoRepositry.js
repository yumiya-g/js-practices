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
      await promiseRun(db, createTableQuery);
      await promiseRun(db, insertTableQuery, [memo.title, memo.contents]);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await promiseClose(db);
    }
  }

  async findAll() {
    const db = new sqlite3.Database(this.dbPath);

    try {
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
