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

const insertFirstBook = (db) =>
  new Promise((resolve) =>
    db.run(
      insertTableQuery,
      "スラスラ読める JavaScriptふりがなプログラミング",
      function () {
        resolve({ props: this, db });
      },
    ),
  );

const insertFirstBookError = (db) =>
  new Promise((_, reject) =>
    db.run(
      insertTableWrongQuery,
      "スラスラ読める JavaScriptふりがなプログラミング",
      function (err) {
        if (err) {
          console.log(err.message);
          reject(db);
        } else {
          _(this);
        }
      },
    ),
  );

const insertSecondBook = ({ props, db }) =>
  new Promise((resolve) =>
    db.run(insertTableQuery, "初めてのJavaScript", function () {
      console.log(`ID: ${props.lastID}`);
      resolve({ props: this, db });
    }),
  );

const insertSecondBookError = (db) =>
  new Promise((_, reject) =>
    db.run(insertTableQuery, null, function (err) {
      if (err) {
        console.log(err.message);
        reject(db);
      } else {
        _(this);
      }
    }),
  );

const displayBooks = ({ props, db }) =>
  new Promise((resolve) => {
    console.log(`ID: ${props.lastID}`);
    db.each(
      selectTableQuery,
      (_err, row) => {
        console.log(`ID: ${row.id}, タイトル: ${row.title}`);
      },
      () => resolve(),
    );
  });

const displayBooksError = (db) =>
  new Promise((_, reject) =>
    db.each(selectTableWrongQuery, (err, _row) => {
      if (err) {
        console.log(err.message);
        reject();
      } else {
        console.log(`ID: ${_row.id}, タイトル: ${_row.title}`);
        _(this);
      }
    }),
  );

const closeDatabase = () => new Promise(() => db.close());

promise(db)
  .then((db) => insertFirstBook(db))
  .then((obj) => insertSecondBook(obj))
  .then((obj) => displayBooks(obj))
  .finally(() => closeDatabase());

await timers.setTimeout(100);
db = new sqlite3.Database(":memory:");

promise(db)
  .then((db) => insertFirstBookError(db))
  .catch((db) => insertSecondBookError(db))
  .catch((db) => displayBooksError(db))
  .finally(() => closeDatabase());
