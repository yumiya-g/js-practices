import enquirer from "enquirer";
const { Select } = enquirer;

export class MemoOutput {
  constructor() {
    console.log("Output Class New!");
  }

  outputLists(memos) {
    if (memos.length === 0) {
      console.log("登録されたメモはありません");
      return;
    }
    for (const memo of memos) {
      console.log(memo.title);
    }
  }

  async selectMemo(memos, message) {
    if (memos.length === 0) {
      console.log("登録されたメモはありません");
      return;
    }

    const selectOptions = [];
    for (const memo of memos) {
      selectOptions.push({
        name: memo.title,
        value: memo,
      });
    }

    const prompt = new Select({
      name: "Memos",
      message: message,
      choices: selectOptions,
      result() {
        return this.focused.value;
      },
    });
    return await prompt.run();
  }
}
