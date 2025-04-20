import timers from "timers/promises";
import sqlite3 from "sqlite3";

let db = new sqlite3.Database(":memory:");
const createTableQuery = `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`;
const insertTableQuery = `INSERT INTO books (title) VALUES(?)`;
const selectTableQuery = `SELECT * FROM books`;

const promise = (db) => {
  return new Promise((resolve) => {
    db.run(createTableQuery, function () {
      resolve();
    });
  });
};

const insertFirstBook = (db) =>
  new Promise((resolve) => {
    db.run(
      insertTableQuery,
      "スラスラ読める JavaScriptふりがなプログラミング",
      function () {
        resolve({ props: this, db });
      },
    );
  });

const insertSecondBook = ({ props, db }) =>
  new Promise((resolve) => {
    db.run(insertTableQuery, "初めてのJavaScript", function () {
      console.log(`ID: ${props.lastID}`);
      resolve({ props: this, db });
    });
  });

const displayBooks = ({ props, db }) =>
  new Promise((resolve) => {
    console.log(`ID: ${props.lastID}`);
    db.each(selectTableQuery, (_err, row) => {
      console.log(`ID: ${row.id}, タイトル: ${row.title}`);
    });
    resolve();
  });

const closeDatabase = () =>
  new Promise(() => {
    db.close();
  });

async function asyncNoError() {
  let props;
  await promise(db);

  props = await insertFirstBook(db);
  props = await insertSecondBook(props);
  await displayBooks(props);
  await closeDatabase();
}

asyncNoError();

await timers.setTimeout(100);
