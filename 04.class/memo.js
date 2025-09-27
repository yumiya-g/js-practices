#!/usr/bin/env node

import { createInterface } from "node:readline/promises";
import { stdin, stdout, exit } from "node:process";

async function inputMemo() {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: stdin,
            output: stdout,
    });

    const lines = [];

    rl.on("line", (line) => {
      lines.push(line);
    });

    rl.on("close", () => {
      resolve(lines.join("\n"));
      console.log(lines); // 標準入力の内容を配列で出力
    });
  });
}

async function main() {
  const memos = await inputMemo();
  
  // 標準入力の内容を出力
  console.log(`入力した内容：\n${memos}`);
  exit(0);
}

main();
