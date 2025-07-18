import timers from "timers/promises";
import sqlite3 from "sqlite3";
import {
  promiseRun,
  promiseEach,
  promiseClose,
} from "./promiseWrappedFunctions.js";
import {
  createTableQuery,
  insertTableQuery,
  selectTableQuery,
  insertTableWrongQuery,
  selectTableWrongQuery,
  deleteTableQuery,
} from "./queries.js";

const runWithoutError = (db) => {
  promiseRun(db, createTableQuery)
    .then(() =>
      promiseRun(
        db,
        insertTableQuery,
        "スラスラ読める JavaScriptふりがなプログラミング",
      ),
    )
    .then((row) => {
      console.log(`ID: ${row.lastID}`);
      return promiseRun(db, insertTableQuery, "初めてのJavaScript");
    })
    .then((row) => {
      console.log(`ID: ${row.lastID}`);
      return promiseEach(db, selectTableQuery, (_err, row) => {
        console.log(`ID: ${row.id}, タイトル: ${row.title}`);
      });
    })
    .finally(() => promiseClose(db));
};

const runWithError = (db) => {
  promiseRun(db, createTableQuery)
    .then(() =>
      promiseRun(
        db,
        insertTableWrongQuery,
        "スラスラ読める JavaScriptふりがなプログラミング2",
      ),
    )
    .then((row) => {
      console.log(`ID: ${row.lastID}`);
      return promiseRun(db, insertTableQuery, "初めてのJavaScript2");
    })
    .then((row) => {
      console.log(`ID: ${row.lastID}`);
      return promiseEach(db, selectTableQuery, (_err, row) => {
        console.log(`ID: ${row.id}, タイトル: ${row.title}`);
      });
    })
    .catch((err) => {
      console.error(err.message);
      return promiseRun(db, insertTableQuery, null);
    })
    .catch((err) => {
      console.error(err.message);
      return promiseEach(db, selectTableWrongQuery, (err) => {
        console.error(err.message);
      });
    })
    .catch((err) => console.error(err.message))
    .finally(() => promiseClose(db));
};

let db = new sqlite3.Database("database");
runWithoutError(db);

await timers.setTimeout(100);

db = new sqlite3.Database("database");
runWithError(db);
