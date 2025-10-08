import {
  promiseRun,
  promiseClose,
  promiseReadline,
} from "./promiseWrappedFunctions.js";

export class InputHandler {
  constructor() {
    this.title = null;
    this.text = null;
    this.option = null;
  }

  async parseStdIn() {
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

  async inputParse() {
    const result = await this.parseStdIn();

    this.title = result.title;
    this.text = result.text;
    this.option = result.option;
    return { title: this.title, text: this.text, option: this.option };
  }
}
