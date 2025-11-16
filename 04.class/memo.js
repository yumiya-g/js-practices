#!/usr/bin/env node

import { MemoController } from "./memoController.js";

export class Memo {
  constructor(id, title, contents) {
    this.id = id;
    this.title = title === undefined || title === "" ? "NoTitle" : title;
    this.contents =
      contents === undefined || contents === "" ? "NoContents" : contents;
  }
}

async function main() {
  const memoController = new MemoController();
  await memoController.run();
  process.exit(0);
}

main();
