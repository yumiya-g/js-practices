import timers from "timers/promises";
import { db, recreateDB } from "./functions.js";
import {
  createTableQuery,
  insertTableQuery,
  selectTableQuery,
  insertTableWrongQuery,
  selectTableWrongQuery,
  deleteTableQuery,
} from "./queries.js";

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

await timers.setTimeout(100);

recreateDB();

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
