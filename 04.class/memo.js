#!/usr/bin/env node

import sqlite3 from "sqlite3";

import { createTableQuery, insertTableQuery } from "./queries.js";
import {
  promiseRun,
  promiseClose,
  promiseReadline,
} from "./promiseWrappedFunctions.js";

class Memo {
  constructor() {
    this.title = null;
    this.text = null;
    this.option = null;
  }

  async inputParse() {
    try {
      // 標準入力を受け付ける
      const memoLines = await promiseReadline();

      // オプションを取る
      this.option = process.argv[2];

      // メモのタイトルとテキストを分離
      this.title =
        memoLines[0] === undefined || memoLines[0] === ""
          ? "NoTitle"
          : memoLines[0];
      this.text =
        memoLines.slice(1).filter(Boolean).length === 0
          ? "NoTexts"
          : memoLines.slice(1).join("\n");
      return { title: this.title, text: this.text, option: this.option };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async save(parsedMemo) {
    const db = new sqlite3.Database("memos.db");
    try {
      // memosテーブルを作成
      await promiseRun(db, createTableQuery);
      // データベース登録を実行
      await promiseRun(db, insertTableQuery, [
        parsedMemo.title,
        parsedMemo.text,
      ]);
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
  const parsedMemo = await memo.inputParse();

  // オプションなしで保存処理を開始
  if (parsedMemo.option === undefined) {
    await memo.save(parsedMemo);
  } else {
    console.log("オプションありの処理");
    // オプション`l`：データベースからタイトル一覧を取得する

    // オプション`r`：データベースからタイトル一覧を取得し、選択して本文を出力する

    // オプション`d`：データベースからタイトル一覧を取得し、データを削除する
  }

  // プロセスを終了する
  process.exit(0);
}

main();
