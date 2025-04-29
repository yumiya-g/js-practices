import timers from "timers/promises";
import sqlite3 from "sqlite3";
import * as utils from "./utils.js";

let db = new sqlite3.Database(":memory:");

utils
  .promise(db)
  .then((db) => utils.insertFirstBook(db))
  .then((obj) => utils.insertSecondBook(obj))
  .then((obj) => utils.displayBooks(obj))
  .then((db) => db.close());

await timers.setTimeout(100);

db = new sqlite3.Database(":memory:");

utils
  .promise(db)
  .then((db) => utils.insertFirstBookError(db))
  .catch((db) => utils.insertSecondBookError(db))
  .catch((db) => utils.displayBooksError(db))
  .catch((db) => db.close());
