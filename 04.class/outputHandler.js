import enquirer from "enquirer";
import { MemoRepositry } from "./memoRepositry.js";

const { Select } = enquirer;

export class OutputHandler {
  outputLists(memos) {
    if (memos.length === 0) {
      console.log("登録されたメモはありません");
    } else {
      for (const memo of memos) {
        console.log(memo.title);
      }
    }
  }

  async outputContents(memos) {
    if (memos.memos.length === 0) {
      console.log("登録されたメモはありません");
      return;
    }

    const selectOptions = [];
    for (const memo of memos.memos) {
      selectOptions.push({
        name: memo.title,
        value: memo,
      });
    }

    const optionsDescription = {
      "-r": "Choose a note you want to see:",
      "-d": "Choose a memo you want to delete:",
    };

    try {
      const prompt = new Select({
        name: "Memos",
        message: optionsDescription[memos.option],
        choices: selectOptions,
        result() {
          return this.focused.value;
        },
      });

      const answer = await prompt.run();
      if (memos.option === "-r") {
        console.log(answer.contents);
      } else if (memos.option === "-d") {
        // メモリポジトリインスタンスを作成
        const memoRepositry = new MemoRepositry();
        await memoRepositry.delete(answer.id);
        console.log("選択したメモを削除しました");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
