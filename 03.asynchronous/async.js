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

async function runWithoutError() {
  const db = new sqlite3.Database(":memory:");
  let result = await promiseRun(db, createTableQuery);

  result = await promiseRun(
    db,
    insertTableQuery,
    "スラスラ読める JavaScriptふりがなプログラミング",
  );
  console.log(`ID: ${result.lastID}`);

  result = await promiseRun(db, insertTableQuery, "初めてのJavaScript");
  console.log(`ID: ${result.lastID}`);

  await promiseEach(db, selectTableQuery, (_err, row) => {
    console.log(`ID: ${row.id}, タイトル: ${row.title}`);
  });
  await promiseRun(db, deleteTableQuery);
  await promiseClose(db);
}

// async function runWithError() {
//   const db = new sqlite3.Database(":memory:");
// }

runWithoutError();

await timers.setTimeout(100);

// runWithError();
