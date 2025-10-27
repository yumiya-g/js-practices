import { promiseReadline } from "./promiseWrappedFunctions.js";

export class InputHandler {
  async parseStdIn() {
    try {
      // 標準入力を受け付ける
      const memoLines = await promiseReadline();

      // メモのタイトルとテキストを分離
      const title =
        memoLines[0] === undefined || memoLines[0] === ""
          ? "NoTitle"
          : memoLines[0];
      const contents =
        memoLines.slice(1).filter(Boolean).length === 0
          ? "NoTexts"
          : memoLines.slice(1).join("\n");
      return { title, contents };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
