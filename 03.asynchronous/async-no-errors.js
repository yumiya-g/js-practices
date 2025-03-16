import * as noError from "./promise-registerBooks.js";

async function AsyncNoError() {
  await noError.registerBooks(noError.createTableQuery);
  await noError.registerBooks(
    "insert into books(title) values(?)",
    "スラスラ読める JavaScriptふりがなプログラミング",
  );
  await noError.registerBooks(
    "insert into books(title) values(?)",
    "初めてのJavaScript",
  );
  await noError.registerBooks(
    "insert into books(title) values(?)",
    "JavaScript入門",
  );
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
}

AsyncNoError();
