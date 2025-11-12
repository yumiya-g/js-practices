import sqlite3 from "sqlite3";
import {
  promiseAll,
  promiseRun,
  promiseClose,
} from "./promiseWrappedFunctions.js";
import { Memo } from "./memo.js";

const createTableQuery =
  "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, contents TEXT)";
const insertTableQuery = "INSERT INTO memos (title, contents) VALUES (?, ?)";
const selectTableQuery = "SELECT * FROM memos";
const deleteTableQuery = "DELETE FROM memos WHERE id = ?";

export class MemoRepositry {
  constructor() {
    this.dbPath = "memos.db";
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
      await promiseRun(db, createTableQuery);
      const memos = await promiseAll(db, selectTableQuery);

      const memoInstances = [];
      for (const memo of memos) {
        const memoInstance = new Memo(memo.id, memo.title, memo.contents);
        memoInstances.push(memoInstance);
      }
      return memoInstances;
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
      await promiseRun(db, createTableQuery);
      await promiseRun(db, deleteTableQuery, memoId);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await promiseClose(db);
    }
  }
}
