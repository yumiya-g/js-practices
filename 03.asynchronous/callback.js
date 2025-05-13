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

let db = new sqlite3.Database(":memory:");

db.run(createTableQuery, () => {
  db.run(
    insertTableQuery,
    "スラスラ読める JavaScriptふりがなプログラミング",
    function () {
      console.log(`ID: ${this.lastID}`);
      db.run(insertTableQuery, "初めてのJavaScript", function () {
        console.log(`ID: ${this.lastID}`);
        db.all(selectTableQuery, (_err, rows) => {
          rows.forEach((row) => {
            console.log(`ID: ${row.id}, タイトル: ${row.title}`);
          });
          db.run(deleteTableQuery, () => {
            db.close();
          });
        });
      });
    },
  );
});

await timers.setTimeout(100);

db = new sqlite3.Database(":memory:");

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
        db.all(selectTableWrongQuery, function (err, rows) {
          if (err) {
            console.error(err.message);
          } else {
            rows.forEach((row) => {
              console.log(`ID: ${row.id}, タイトル: ${row.title}`);
            });
          }
          db.run(deleteTableQuery, () => {
            db.close();
          });
        });
      });
    },
  );
});
