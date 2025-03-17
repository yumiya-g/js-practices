import * as hasError from "./registerBooks.js";

async function AsyncHasError() {
  await hasError.registerBooks(hasError.createTableQuery);
  try {
    await hasError.registerBooks("insert into books(title) values(?)", null);
    await hasError.registerBooks(
      "insert into books(title) values(?)",
      "初めてのJavaScript",
    );
    await hasError.registerBooks(
      "insert into books(title) values(?)",
      "JavaScript入門",
    );
  } catch (err) {
    console.log(err.message);
  }
}

AsyncHasError().finally(() => {
  hasError.db.each(
    "select * from bookssss",
    (err, row) => {
      console.log(`ID: ${row.id}, タイトル: ${row.title}`);
    },
    function (err) {
      if (err) {
        console.log(err.message);
      } else {
        hasError.db.close();
      }
    },
  );
});
