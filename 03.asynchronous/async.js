import timers from "timers/promises";
import sqlite3 from "sqlite3";
import * as utils from "./utils.js";

let db = new sqlite3.Database(":memory:");

const insertFirstBookError = (db) =>
  new Promise((_, reject) =>
    db.run(
      utils.insertTableWrongQuery,
      "スラスラ読める JavaScriptふりがなプログラミング",
      function (err) {
        if (err) {
          reject(err);
        } else {
          _(this);
        }
      },
    ),
  );

const insertSecondBookError = (db) =>
  new Promise((_, reject) =>
    db.run(utils.insertTableQuery, null, function (err) {
      if (err) {
        reject(err);
      } else {
        _(this);
      }
    }),
  );

const displayBooksError = (db) =>
  new Promise((_, reject) =>
    db.each(utils.selectTableWrongQuery, (err, _row) => {
      if (err) {
        reject(err);
      } else {
        console.log(`ID: ${_row.id}, タイトル: ${_row.title}`);
        _(this);
      }
    }),
  );

async function asyncNoError(db) {
  let obj;
  await utils.promise(db);
  obj = await utils.insertFirstBook(db);
  obj = await utils.insertSecondBook(obj);
  await utils.displayBooks(obj);
  db.close();
}

asyncNoError(db);

await timers.setTimeout(100);

db = new sqlite3.Database(":memory:");

async function asyncError(db) {
  await utils.promise(db);
  try {
    await insertFirstBookError(db);
  } catch (err) {
    console.log(err.message);
  }

  try {
    await insertSecondBookError(db);
  } catch (err) {
    console.log(err.message);
  }

  try {
    await displayBooksError(db);
  } catch (err) {
    console.log(err.message);
  }

  db.close();
}

asyncError(db);
