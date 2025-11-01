#!/usr/bin/env node

import { MemoController } from "./memoController.js";

async function main() {
  const memoController = new MemoController();
  await memoController.run();
  process.exit(0);
}

main();
