import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const createTableQuery = `CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )`;

function registerBooks(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject("Error!");
      } else {
        console.log(`ID: ${this.lastID}`);
        resolve(this.lastID);
      }
    });
  });
}

registerBooks(createTableQuery)
  .then(() => {
    return registerBooks(
      "insert into books(title) values(?)",
      "スラスラ読める JavaScriptふりがなプログラミング",
    );
  })
  .then(() => {
    return registerBooks(
      "insert into books(title) values(?)",
      "初めてのJavaScript",
    );
  })
  .then(() => {
    return registerBooks(
      "insert into books(title) values(?)",
      "JavaScript入門",
    );
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    db.each(
      "select * from books",
      (err, row) => {
        console.log(`ID: ${row.id}, タイトル: ${row.title}`);
      },
      function (err) {
        if (err) {
          console.log(err.message);
        } else {
          db.close();
        }
      },
    );
  });



  