import sqlite3 from "sqlite3";
import enquirer from "enquirer";
const { Select } = enquirer;
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

  async outputContents(memos) {
    if (memos.length === 0) {
      console.log("登録されたメモはありません");
      return;
    }

    const selectOptions = [];
    for (const memo of memos) {
      selectOptions.push({
        name: memo.title,
        value: memo,
      });
    }

    try {
      const prompt = new Select({
        name: "Memos",
        message: "Choose a note you want to see:",
        choices: selectOptions,
        result() {
          return this.focused.value;
        },
      });

      const answer = await prompt.run();
      console.log(answer.contents);
      return answer;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
