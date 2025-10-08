#!/usr/bin/env node

import sqlite3 from "sqlite3";

import { createTableQuery, insertTableQuery } from "./queries.js";
import {
  promiseRun,
  promiseClose,
  promiseReadline,
} from "./promiseWrappedFunctions.js";

import { InputHandler } from "./inputHandler.js";

class Memo {
  constructor() {
    this.inputHandler = new InputHandler();

    this.title = null;
    this.text = null;
    this.option = null;
  }

  async readStdIn() {
    // オプションがなければ標準入力を受け付ける
    console.log(`argv:${process.argv[2]}`)
    if (process.argv[2] === undefined) {
      
      return await this.inputParse();
    } else {
      // オプションがあれば出力処理を始める
      console.log("出力処理を開始します");
    }
  }

  async inputParse() {
    const result = await this.inputHandler.parseStdIn();

    this.title = result.title;
    this.text = result.text;
    this.option = result.option;
    return { title: this.title, text: this.text, option: this.option };
  }

  async save() {
    const db = new sqlite3.Database("memos.db");

    try {
      // memosテーブルを作成
      await promiseRun(db, createTableQuery);
      // データベース登録を実行
      await promiseRun(db, insertTableQuery, [this.title, this.text]);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await promiseClose(db);
    }
  }

  show() {}

  delete() {}
}

async function main() {
  // メモインスタンスを作成
  const memo = new Memo();


  // 標準入力をパース
  const parsedMemo = await memo.readStdIn();

  // オプションなしで保存処理を開始
  if (parsedMemo.option === undefined) {
    await memo.save();
  } else if (parsedMemo.option === "-l") {
    console.log("タイトル一覧を表示する");
    // オプション`l`：データベースからタイトル一覧を取得する
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
