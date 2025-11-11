import { promiseReadline } from "./promiseWrappedFunctions.js";
import { Memo } from "./memo.js";

export class MemoInput {
  constructor() {
    console.log("Input Class New!");
  }

  static async parseStdIn() {
    try {
      const memoLines = await promiseReadline();
      const memo = new Memo(null, memoLines[0], memoLines.slice(1).join("\n"));
      return memo;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
