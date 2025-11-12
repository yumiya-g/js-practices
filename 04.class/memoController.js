import { MemoInput } from "./memoInput.js";
import { MemoOutput } from "./memoOutput.js";
import { MemoRepositry } from "./memoRepositry.js";

export class MemoController {
  constructor() {
    this.memoRepositry = new MemoRepositry();
  }

  async run() {
    const stdinOption = process.argv[2];

    if (!stdinOption) {
      await this.saveMemo();
    } else if (stdinOption === "-l") {
      await this.listMemo();
    } else if (stdinOption === "-r") {
      await this.readMemo();
    } else if (stdinOption === "-d") {
      await this.deleteMemo();
    } else {
      console.log("存在しないオプションが使用されました");
    }
  }

  async saveMemo() {
    try {
      console.log("メモを入力してください（ctrl + D で保存します）");
      const inputMemo = await MemoInput.parseStdIn();
      await this.memoRepositry.save(inputMemo);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async listMemo() {
    try {
      const memos = await this.memoRepositry.findAll();
      MemoOutput.outputLists(memos);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async readMemo() {
    try {
      const memos = await this.memoRepositry.findAll();
      const selectedMemo = await MemoOutput.selectMemo(
        memos,
        "Choose a note you want to see:",
      );
      if (selectedMemo) {
        console.log(selectedMemo.contents);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deleteMemo() {
    try {
      const memos = await this.memoRepositry.findAll();
      const selectedMemo = await MemoOutput.selectMemo(
        memos,
        "Choose a note you want to delete:",
      );
      if (selectedMemo) {
        await this.memoRepositry.delete(selectedMemo.id);
        console.log(`"${selectedMemo.title}"を削除しました`);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
