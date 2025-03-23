import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const createTableQuery = `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`;
const insertTableQuery = `INSERT INTO books (title) VALUES(?)`;
const selectTableQuery = `SELECT * FROM books`;

db.run(createTableQuery, function (err) {
  if (err) {
    console.log(err.message);
  } else {
    db.run(
      insertTableQuery,
      "スラスラ読める JavaScriptふりがなプログラミング",
      function (err) {
        if (err) {
          console.log(err.message);
        } else {
          console.log(`ID: ${this.lastID}`);
          db.run(insertTableQuery, "初めてのJavaScript", function (err) {
            if (err) {
              console.log(err.message);
            } else {
              console.log(`ID: ${this.lastID}`);
              db.each(
                selectTableQuery,
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
            }
          });
        }
      },
    );
  }
});
