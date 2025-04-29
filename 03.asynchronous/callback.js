import timers from "timers/promises";
import sqlite3 from "sqlite3";
import * as utils from "./utils.js";

let db = new sqlite3.Database(":memory:");

db.run(utils.createTableQuery, () => {
  db.run(
    utils.insertTableQuery,
    "スラスラ読める JavaScriptふりがなプログラミング",
    function () {
      console.log(`ID: ${this.lastID}`);
      db.run(utils.insertTableQuery, "初めてのJavaScript", function () {
        console.log(`ID: ${this.lastID}`);
        db.each(
          utils.selectTableQuery,
          (_err, row) => console.log(`ID: ${row.id}, タイトル: ${row.title}`),
          () => db.close(),
        );
      });
    },
  );
});

await timers.setTimeout(100);

db = new sqlite3.Database(":memory:");

db.run(utils.createTableQuery, () => {
  db.run(
    utils.insertTableWrongQuery,
    "スラスラ読める JavaScriptふりがなプログラミング",
    (err) => {
      if (err) {
        console.log(err.message);
        db.run(utils.insertTableQuery, null, (err) => {
          if (err) {
            console.log(err.message);
            db.each(utils.selectTableWrongQuery, (err, _row) => {
              if (err) {
                console.log(err.message);
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
