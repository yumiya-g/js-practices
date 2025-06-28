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

async function exportBookLists() {
  await promiseRun(createTableQuery);
  await promiseRun(
    insertTableQuery,
    "スラスラ読める JavaScriptふりがなプログラミング",
    function () {
      console.log(`ID: ${this.lastID}`);
    },
  );
  await promiseRun(insertTableQuery, "初めてのJavaScript", function () {
    console.log(`ID: ${this.lastID}`);
  });
  await promiseEach(selectTableQuery, (_err, row) => {
    console.log(`ID: ${row.id}, タイトル: ${row.title}`);
  });

  db.run(deleteTableQuery, () => {
    db.close();
  });
}

exportBookLists();

await timers.setTimeout(100);

recreateDB();

async function errBookLists() {
  await promiseRun(createTableQuery);

  try {
    await promiseRun(
      insertTableWrongQuery,
      "スラスラ読める JavaScriptふりがなプログラミング2",
      function (err) {
        if (!err) {
          console.log(`ID: ${this.lastID}`);
        }
      },
    );
  } catch (err) {
    console.error(err.message);
  }

  try {
    await promiseRun(insertTableQuery, null, function (err) {
      if (!err) {
        console.log(`ID: ${this.lastID}`);
      }
    });
  } catch (err) {
    console.error(err.message);
  }

  try {
    await promiseEach(selectTableWrongQuery, (_err, row) => {
      console.log(`ID: ${row.id}, タイトル: ${row.title}`);
    });
  } catch (err) {
    console.error(err.message);
  }

  db.run(deleteTableQuery, () => {
    db.close();
  });
}

errBookLists();
