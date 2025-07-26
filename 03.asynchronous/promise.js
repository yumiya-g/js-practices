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

const runWithoutError = () => {
  const db = new sqlite3.Database(":memory:");
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
    .then(() => promiseRun(db, deleteTableQuery))
    .finally(() => promiseClose(db));
};

const runWithError = () => {
  const db = new sqlite3.Database(":memory:");
  promiseRun(db, createTableQuery)
    .then(() =>
      promiseRun(
        db,
        insertTableWrongQuery,
        "スラスラ読める JavaScriptふりがなプログラミング",
      ),
    )
    .then((row) => {
      console.log(`ID: ${row.lastID}`);
    })
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => promiseRun(db, insertTableQuery, null))
    .then((row) => {
      console.log(`ID: ${row.lastID}`);
    })
    .catch((err) => {
      console.error(err.message);
    })
    .then(() =>
      promiseEach(db, selectTableWrongQuery, (_err, row) => {
        console.log(`ID: ${row.id}, タイトル: ${row.title}`);
      }),
    )
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => promiseRun(db, deleteTableQuery))
    .finally(() => promiseClose(db));
};

runWithoutError();

await timers.setTimeout(100);

runWithError();
