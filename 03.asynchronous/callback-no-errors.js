import timers from "timers/promises";
import sqlite3 from "sqlite3";

const valid_db = new sqlite3.Database(":memory:");
const invalid_db = new sqlite3.Database(":memory:");

const createTableQuery = `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`;
const insertTableQuery = `INSERT INTO books (title) VALUES(?)`;
const selectTableQuery = `SELECT * FROM books`;
const insertTableWrongQuery = `INSERT INTO bookss (title) VALUES(?)`;
const selectTableWrongQuery = `SELECT hoge FROM bbbooks`;

valid_db.run(createTableQuery, function () {
  valid_db.run(
    insertTableQuery,
    "スラスラ読める JavaScriptふりがなプログラミング",
    function () {
      console.log(`ID: ${this.lastID}`);
      valid_db;
      valid_db.run(insertTableQuery, "初めてのJavaScript", function () {
        console.log(`ID: ${this.lastID}`);
        valid_db.each(selectTableQuery, (_err, row) => {
          console.log(`ID: ${row.id}, タイトル: ${row.title}`);
        });
      });
    },
  );
});

valid_db.close();

await timers.setTimeout(100);

invalid_db.run(createTableQuery, () => {
  invalid_db.run(
    insertTableWrongQuery,
    "スラスラ読める JavaScriptふりがなプログラミング",
    (err) => {
      if (err) {
        console.log(err.message);
        invalid_db.run(insertTableQuery, null, (err) => {
          if (err) {
            console.log(err.message);
            invalid_db.each(selectTableWrongQuery, (err, _row) => {
              if (err) {
                console.log(err.message);
              } else {
                console.log(_row);
              }
            });
          } else {
            console.log("エラーなし");
          }
        });
      } else {
        console.log("エラーなし");
      }
    },
  );
});

invalid_db.close();
