import sqlite3 from "sqlite3";
import { promiseAll, promiseClose } from "./promiseWrappedFunctions.js";
import { selectTableQuery } from "./queries.js";

export class OutputHandler {
  constructor() {
    this.title = null;
    this.text = null;
    this.option = null;
    this.descriptions = null;
  }

  async outputMemos() {
    const db = new sqlite3.Database("memos.db");

    try {
      // データベースを取得
      return await promiseAll(db, selectTableQuery);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await promiseClose(db);
    }
  }

  outputLists(memos) {
    if (memos.length === 0) {
      console.log("登録されたメモはありません");
    } else {
      for (const memo of memos) {
        console.log(memo.title);
      }
    }
  }

  outputNote() {}
}
