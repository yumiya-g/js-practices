#!/usr/bin/env node

import sqlite3 from "sqlite3";

import { createTableQuery, insertTableQuery } from "./queries.js";
import {
  promiseRun,
  promiseClose,
  promiseReadline,
} from "./promiseWrappedFunctions.js";

async function inputMemo() {
  // DBに接続
  const db = new sqlite3.Database("memos.db");

  try {
    // memosテーブルを作成
    await promiseRun(db, createTableQuery);

    // 標準入力を受け付ける
    const memoLines = await promiseReadline();

    // メモのタイトルとテキストを分離
    const memoTitle =
      memoLines[0] === undefined || memoLines[0] === ""
        ? "NoTitle"
        : memoLines[0];
    const memoTexts =
      memoLines.slice(1).filter(Boolean).length === 0
        ? "NoTexts"
        : memoLines.slice(1).join("\n");

    // 入力内容を出力
    console.log(`入力した内容`);
    console.log(`【メモタイトル】\n${memoTitle}\n`);
    console.log(`【メモテキスト】\n${memoTexts}`);

    // データベース登録を実行
    await promiseRun(db, insertTableQuery, [memoTitle, memoTexts]);
  } catch (err) {
    console.error(err);
    throw err; // エラーを伝搬
  } finally {
    promiseClose();
  }
}

async function main() {
  // データの入力処理
  await inputMemo();

  // データベースから一覧を取得する

  // プロセスを終了する
  process.exit(0);
}

main();
