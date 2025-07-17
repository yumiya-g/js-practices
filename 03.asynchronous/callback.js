import timers from "timers/promises";
import sqlite3 from "sqlite3";
import {
  createTableQuery,
  insertTableQuery,
  selectTableQuery,
  insertTableWrongQuery,
  selectTableWrongQuery,
  deleteTableQuery,
} from "./queries.js";

const runWithoutError = (db) => {
  db.run(createTableQuery, () => {
    db.run(
      insertTableQuery,
      "スラスラ読める JavaScriptふりがなプログラミング",
      function () {
        console.log(`ID: ${this.lastID}`);
        db.run(insertTableQuery, "初めてのJavaScript", function () {
          console.log(`ID: ${this.lastID}`);
          db.each(
            selectTableQuery,
            (_err, row) => {
              console.log(`ID: ${row.id}, タイトル: ${row.title}`);
            },
            () => {
              db.run(deleteTableQuery, () => {
                db.close();
              });
            },
          );
        });
      },
    );
  });
};

const runWithError = (db) => {
  db.run(createTableQuery, () => {
    db.run(
      insertTableWrongQuery,
      "スラスラ読める JavaScriptふりがなプログラミング",
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`ID: ${this.lastID}`);
        }
        db.run(insertTableQuery, null, function (err) {
          if (err) {
            console.error(err.message);
          } else {
            console.log(`ID: ${this.lastID}`);
          }
          db.each(
            selectTableWrongQuery,
            (_err, row) => {
              console.log(`ID: ${row.id}, タイトル: ${row.title}`);
            },
            (err) => {
              if (err) {
                console.error(err.message);
              }
              db.run(deleteTableQuery, () => {
                db.close();
              });
            },
          );
        });
      },
    );
  });
};

let db = new sqlite3.Database("database");
runWithoutError(db);

await timers.setTimeout(100);

db = new sqlite3.Database("database");
runWithError(db);
