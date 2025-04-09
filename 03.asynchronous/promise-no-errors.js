import timers from "timers/promises";
import sqlite3 from "sqlite3";

const valid_db = new sqlite3.Database(":memory:");
const invalid_db = new sqlite3.Database(":memory:");
const createTableQuery = `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`;
const insertTableQuery = `INSERT INTO books (title) VALUES(?)`;
const selectTableQuery = `SELECT * FROM books`;
const insertTableWrongQuery = `INSERT INTO bookss (title) VALUES(?)`;
const selectTableWrongQuery = `SELECT hoge FROM bbbooks`;

const promise = new Promise((resolve) => {
  valid_db.run(createTableQuery, () => {
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
  .finally(
    () =>
      new Promise(() => {
        valid_db.close();
      }),
  );

await timers.setTimeout(100);

const invalid_promise = new Promise((resolve) => {
  invalid_db.run(createTableQuery, () => {
    resolve(this);
  });
});

invalid_promise
  .then(
    () =>
      new Promise((_resolve, reject) => {
        invalid_db.run(
          insertTableWrongQuery,
          "スラスラ読める JavaScriptふりがなプログラミング",
          function (err) {
            if (err) {
              console.log(err.message);
              reject();
            } else {
              _resolve(this);
            }
          },
        );
      }),
  )
  .catch(
    () =>
      new Promise((_resolve, reject) => {
        invalid_db.run(insertTableQuery, null, function (err) {
          if (err) {
            console.log(err.message);
            reject();
          } else {
            _resolve(this);
          }
        });
      }),
  )
  .catch(
    () =>
      new Promise((_resolve, reject) => {
        invalid_db.each(selectTableWrongQuery, function (err) {
          if (err) {
            console.log(err.message);
            reject();
          } else {
            _resolve(this);
          }
        });
      }),
  )
  .finally(
    () =>
      new Promise(() => {
        invalid_db.close();
      }),
  );
