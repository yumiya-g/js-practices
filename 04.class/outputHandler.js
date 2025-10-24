import sqlite3 from "sqlite3";
import enquirer from "enquirer";
const { Select } = enquirer;
import {
  promiseAll,
  promiseClose,
  promiseRun,
} from "./promiseWrappedFunctions.js";
import { selectTableQuery, deleteTableQuery } from "./queries.js";

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

  async outputContents(memos) {
    const db = new sqlite3.Database("memos.db");

    if (memos.memos.length === 0) {
      console.log("登録されたメモはありません");
      return;
    }

    const selectOptions = [];
    for (const memo of memos.memos) {
      selectOptions.push({
        name: memo.title,
        value: memo,
      });
    }

    const optionsDescription = {
      "-r": "Choose a note you want to see:",
      "-d": "Choose a memo you want to delete:",
    };

    try {
      const prompt = new Select({
        name: "Memos",
        message: optionsDescription[memos.option],
        choices: selectOptions,
        result() {
          return this.focused.value;
        },
      });

      const answer = await prompt.run();
      if (memos.option === "-r") {
        console.log(answer.contents);
      } else if (memos.option === "-d") {
        await promiseRun(db, deleteTableQuery, answer.id);
        console.log("選択したメモを削除しました");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
