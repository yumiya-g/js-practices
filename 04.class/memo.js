#!/usr/bin/env node

import { MemoController } from "./memoController.js";

export class Memo {
  constructor(id, title = "No Title", contents = "No Contents") {
    this.id = id;
    this.title = title === undefined || title === "" ? "NoTitle" : title;
    this.contents =
      title === undefined || title === "" ? "NoContents" : contents;
  }
}

async function main() {
  const memoController = new MemoController();
  await memoController.run();
  process.exit(0);
}

main();
