import timers from "timers/promises";
import { db, promiseRun, promiseEach } from "./functions.js";

import {
  createTableQuery,
  insertTableQuery,
  selectTableQuery,
  deleteTableQuery,
} from "./queries.js";

promiseRun(createTableQuery)
  .then(function () {
    return promiseRun(
      insertTableQuery,
      "スラスラ読める JavaScriptふりがなプログラミング",
    );
  })
  .then(function (obj) {
    console.log(`ID: ${obj.lastID}`);
    return promiseRun(insertTableQuery, "初めてのJavaScript");
  })
  .then(function (obj) {
    console.log(`ID: ${obj.lastID}`);
    return promiseEach(
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

await timers.setTimeout(100);
