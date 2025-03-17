import * as noError from "./registerBooks.js";

noError
  .registerBooks(noError.createTableQuery)
  .then(() => {
    return noError.registerBooks(
      "insert into books(title) values(?)",
      "スラスラ読める JavaScriptふりがなプログラミング",
    );
  })
  .then(() => {
    return noError.registerBooks(
      "insert into books(title) values(?)",
      "初めてのJavaScript",
    );
  })
  .then(() => {
    return noError.registerBooks(
      "insert into books(title) values(?)",
      "JavaScript入門",
    );
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    noError.db.each(
      "select * from books",
      (err, row) => {
        console.log(`ID: ${row.id}, タイトル: ${row.title}`);
      },
      function (err) {
        if (err) {
          console.log(err.message);
        } else {
          noError.db.close();
        }
      },
    );
  });
