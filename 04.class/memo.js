#!/usr/bin/env node

import { InputHandler } from "./inputHandler.js";
import { OutputHandler } from "./outputHandler.js";
import { MemoRepositry } from "./memoRepositry.js";

class Memo {
  constructor() {
    this.inputHandler = new InputHandler();
    this.outputHandler = new OutputHandler();
    this.memoRepositry = new MemoRepositry();
  }

  async readStdIn() {
    const stdinOption = process.argv[2];
    // オプションがなければ標準入力を受け付ける
    if (stdinOption === undefined) {
      return await this.inputHandler.parseStdIn();
    } else {
      // オプションがあれば出力処理を始める
      const memos = await this.memoRepositry.find();
      return { memos, option: stdinOption };
    }
  }

  showLists(parsedMemo) {
    this.outputHandler.outputLists(parsedMemo.memos);
  }

  async selectMemos(parsedMemo) {
    await this.outputHandler.outputContents(parsedMemo);
  }
}

async function main() {
  // メモインスタンスを作成
  const memo = new Memo();

  // メモリポジトリインスタンスを作成
  const memoRepositry = new MemoRepositry();

  // 標準入力をパース
  const parsedMemo = await memo.readStdIn();

  // オプションなしで保存処理を開始
  if (parsedMemo.option === undefined) {
    await memoRepositry.save(parsedMemo);
  } else if (parsedMemo.option === "-l") {
    await memo.showLists(parsedMemo);
  } else if (parsedMemo.option === "-r" || parsedMemo.option === "-d") {
    await memo.selectMemos(parsedMemo);
  } else {
    console.log("存在しないオプションが入力されました");
  }

  // プロセスを終了する
  process.exit(0);
}

main();
