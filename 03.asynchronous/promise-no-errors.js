import sqlite3 from "sqlite3";

const valid_db = new sqlite3.Database(":memory:");
const createTableQuery = `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`;
const insertTableQuery = `INSERT INTO books (title) VALUES(?)`;
const selectTableQuery = `SELECT * FROM books`;

const promise = new Promise((resolve) => {
  valid_db.run(createTableQuery, function () {
    resolve(this);
  });
});

promise
  .then(
    () =>
      new Promise((resolve) => {
        valid_db.run(
          insertTableQuery,
          "スラスラ読める JavaScriptふりがなプログラミング",
          function () {
            resolve(this);
          },
        );
      }),
  )
  .then(
    (obj) =>
      new Promise((resolve) => {
        valid_db.run(insertTableQuery, "初めてのJavaScript", function () {
          console.log(`ID: ${obj.lastID}`);
          resolve(this);
        });
      }),
  )
  .then((obj) => {
    console.log(`ID: ${obj.lastID}`);
    return new Promise((resolve) => {
      valid_db.each(selectTableQuery, (_err, row) => {
        console.log(`ID: ${row.id}, タイトル: ${row.title}`);
      });
      resolve();
    });
  })
  .then(
    () =>
      new Promise((resolve) => {
        valid_db.close();
      }),
  );
