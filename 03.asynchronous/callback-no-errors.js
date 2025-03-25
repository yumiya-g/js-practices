import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const createTableQuery = `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`;
const insertTableQuery = `INSERT INTO books (title) VALUES(?)`;
const selectTableQuery = `SELECT * FROM books`;

db.run(createTableQuery, function () {
  db.run(
    insertTableQuery,
    "スラスラ読める JavaScriptふりがなプログラミング",
    function () {
      console.log(`ID: ${this.lastID}`);
      db.run(insertTableQuery, "初めてのJavaScript", function () {
        console.log(`ID: ${this.lastID}`);
        db.each(
          selectTableQuery,
          (_err, row) => {
            console.log(`ID: ${row.id}, タイトル: ${row.title}`);
          },
          () => {
            db.close();
          },
        );
      });
    },
  );
});
