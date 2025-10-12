#!/usr/bin/env node

import sqlite3 from "sqlite3";

import { createTableQuery, insertTableQuery } from "./queries.js";
import { promiseRun, promiseClose } from "./promiseWrappedFunctions.js";

import { InputHandler } from "./inputHandler.js";
import { OutputHandler } from "./outputHandler.js";

class Memo {
  constructor() {
    this.inputHandler = new InputHandler();
    this.outputHandler = new OutputHandler();
  }

  async readStdIn() {
    const stdinOption = process.argv[2];
    // オプションがなければ標準入力を受け付ける
    if (stdinOption === undefined) {
      return await this.inputHandler.parseStdIn();
    } else {
      // オプションがあれば出力処理を始める
      const memos = await this.outputHandler.outputMemos();
      return { memos, option: stdinOption };
    }
  }

  async save(memo) {
    const db = new sqlite3.Database("memos.db");

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

  showLists(parsedMemo) {
    this.outputHandler.outputLists(parsedMemo.memos);
  }

  showContents() {}

  delete() {}
}

async function main() {
  // メモインスタンスを作成
  const memo = new Memo();

  // 標準入力をパース
  const parsedMemo = await memo.readStdIn();

  // オプションなしで保存処理を開始
  if (parsedMemo.option === undefined) {
    await memo.save(parsedMemo);
  } else if (parsedMemo.option === "-l") {
    await memo.showLists(parsedMemo);
  } else if (parsedMemo.option === "-r") {
    console.log("タイトル一覧を表示して本文を出力する");
  } else if (parsedMemo.option === "-d") {
    console.log("タイトル一覧を表示して、メモを削除する");
  } else {
    console.log("存在しないオプションが入力されました");
  }

  // プロセスを終了する
  process.exit(0);
}

main();
