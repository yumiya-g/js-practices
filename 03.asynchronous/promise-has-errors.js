import * as hasError from "./promise-registerBooks.js";

hasError
  .registerBooks(hasError.createTableQuery)
  .then(() => {
    return hasError.registerBooks(
      "insert into books(title) values(?)",
      "スラスラ読める JavaScriptふりがなプログラミング!!",
    );
  })
  .then(() => {
    return hasError.registerBooks("insert into books(title) values(?)", null);
  })
  .then(() => {
    return hasError.registerBooks(
      "insert into books(title) values(?)",
      "JavaScript入門",
    );
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    hasError.db.each(
      "select * from booksssss",
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
