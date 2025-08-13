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

  try {
    await promiseRun(db, createTableQuery);

    let result = await promiseRun(
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
  } finally {
    await promiseClose(db);
  }
}

async function runWithError() {
  const db = new sqlite3.Database(":memory:");

  try {
    await promiseRun(db, createTableQuery);
    try {
      const result = await promiseRun(
        db,
        insertTableWrongQuery,
        "スラスラ読める JavaScriptふりがなプログラミング",
      );
      console.log(`ID: ${result.lastID}`);
    } catch (err) {
      if (err.code === "SQLITE_ERROR") {
        console.error(err.message);
      } else {
        throw err;
      }
    }

    try {
      const result = await promiseRun(db, insertTableQuery, null);
      console.log(`ID: ${result.lastID}`);
    } catch (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        console.error(err.message);
      } else {
        throw err;
      }
    }

    try {
      await promiseEach(db, selectTableWrongQuery, (_err, row) => {
        console.log(`ID: ${row.id}, タイトル: ${row.title}`);
      });
    } catch (err) {
      if (err.code === "SQLITE_ERROR") {
        console.error(err.message);
      } else {
        throw err;
      }
    }

    await promiseRun(db, deleteTableQuery);
  } catch (err) {
    console.error(err.message);
    await promiseRun(db, deleteTableQuery);
  } finally {
    await promiseClose(db);
  }
}

await runWithoutError();

await runWithError();
