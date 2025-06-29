import timers from "timers/promises";
import { db, promiseRun, promiseEach, recreateDB } from "./functions.js";
import {
  createTableQuery,
  insertTableQuery,
  selectTableQuery,
  insertTableWrongQuery,
  selectTableWrongQuery,
  deleteTableQuery,
} from "./queries.js";

promiseRun(createTableQuery)
  .then(function () {
    return promiseRun(
      insertTableQuery,
      "スラスラ読める JavaScriptふりがなプログラミング",
      function () {
        console.log(`ID: ${this.lastID}`);
      },
    );
  })
  .then(function () {
    return promiseRun(insertTableQuery, "初めてのJavaScript", function () {
      console.log(`ID: ${this.lastID}`);
    });
  })
  .then(function () {
    return promiseEach(selectTableQuery, (_err, row) => {
      console.log(`ID: ${row.id}, タイトル: ${row.title}`);
    });
  })
  .finally(() => {
    db.run(deleteTableQuery, () => {
      db.close();
    });
  });

await timers.setTimeout(100);

recreateDB();

promiseRun(createTableQuery)
  .then(function () {
    return promiseRun(
      insertTableWrongQuery,
      "スラスラ読める JavaScriptふりがなプログラミング2",
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`ID: ${this.lastID}`);
        }
      },
    );
  })
  .then(function () {
    return promiseRun(insertTableQuery, "初めてのJavaScript2", function () {
      console.log(`ID: ${this.lastID}`);
    });
  })
  .then(function () {
    return promiseEach(selectTableQuery, (_err, row) => {
      console.log(`ID: ${row.id}, タイトル: ${row.title}`);
    });
  })
  .catch(function () {
    return promiseRun(insertTableQuery, null, function (err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`ID: ${this.lastID}`);
      }
    });
  })
  .catch(function () {
    return promiseEach(selectTableWrongQuery, (err) => {
      console.error(err.message);
    });
  })
  .finally(() => {
    db.run(deleteTableQuery, () => {
      db.close();
    });
  });
