import timers from "timers/promises";
import sqlite3 from "sqlite3";
import {
  createTableQuery,
  insertTableQuery,
  selectTableQuery,
  insertTableWrongQuery,
  selectTableWrongQuery,
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
        db.each(
          selectTableQuery,
          (_err, row) => {
            console.log(`ID: ${row.id}, タイトル: ${row.title}`);
          },
          () => db.close(),
        );
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
    (err) => {
      if (err) {
        console.error(err.message);
        db.run(insertTableQuery, null, (err) => {
          if (err) {
            console.error(err.message);
            db.each(selectTableWrongQuery, (err, _row) => {
              if (err) {
                console.error(err.message);
              } else {
                console.log(_row);
              }
              () => db.close();
            });
          } else {
            console.log("エラーなし");
          }
        });
      } else {
        console.log("エラーなし");
      }
    },
  );
});
