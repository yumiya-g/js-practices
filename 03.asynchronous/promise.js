import timers from "timers/promises";
import sqlite3 from "sqlite3";

let db = new sqlite3.Database(":memory:");
const createTableQuery = `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`;
const insertTableQuery = `INSERT INTO books (title) VALUES(?)`;
const selectTableQuery = `SELECT * FROM books`;
const insertTableWrongQuery = `INSERT INTO bookss (title) VALUES(?)`;
const selectTableWrongQuery = `SELECT hoge FROM bbbooks`;

const promise = (db) =>
  new Promise((resolve) => {
    db.run(createTableQuery, () => {
      resolve(db);
    });
  });

promise(db)
  .then(
    (db) =>
      new Promise((resolve) => {
        db.run(
          insertTableQuery,
          "スラスラ読める JavaScriptふりがなプログラミング",
          function () {
            resolve({ props: this, db });
          },
        );
      }),
  )
  .then(
    ({ props, db }) =>
      new Promise((resolve) => {
        db.run(insertTableQuery, "初めてのJavaScript", function () {
          console.log(`ID: ${props.lastID}`);
          resolve({ props: this, db });
        });
      }),
  )
  .then(({ props, db }) => {
    console.log(`ID: ${props.lastID}`);
    return new Promise((resolve) => {
      db.each(selectTableQuery, (_err, row) => {
        console.log(`ID: ${row.id}, タイトル: ${row.title}`);
      });
      resolve();
    });
  })
  .finally(() => new Promise(() => db.close()));

await timers.setTimeout(100);
db = new sqlite3.Database(":memory:");

promise(db)
  .then(
    (db) =>
      new Promise((_resolve, reject) => {
        db.run(
          insertTableWrongQuery,
          "スラスラ読める JavaScriptふりがなプログラミング",
          function (err) {
            if (err) {
              console.log(err.message);
              reject(db);
            } else {
              _resolve(this);
            }
          },
        );
      }),
  )
  .catch(
    (db) =>
      new Promise((_resolve, reject) => {
        db.run(insertTableQuery, null, function (err) {
          if (err) {
            console.log(err.message);
            reject(db);
          } else {
            _resolve(this);
          }
        });
      }),
  )
  .catch(
    (db) =>
      new Promise((_resolve, reject) => {
        db.each(selectTableWrongQuery, function (err) {
          if (err) {
            console.log(err.message);
            reject();
          } else {
            _resolve(this);
          }
        });
      }),
  )
  .finally(() => new Promise(() => db.close()));
