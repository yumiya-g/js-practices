import timers from "timers/promises";
import { db, promiseRun, promiseEach, recreateDB } from "./functions.js";
import {
  firstBook,
  secondBook,
  firstBookWrong,
  secondBookWrong,
} from "./args.js";

import {
  createTableQuery,
  selectTableQuery,
  selectTableWrongQuery,
  deleteTableQuery,
} from "./queries.js";

async function exportBookLists() {
  const args = [firstBook, secondBook];
  await promiseRun(createTableQuery);

  for (const arg of args) {
    try {
      await promiseRun(arg.query, arg.params, arg.callback);
    } catch (err) {
      console.error(err.message);
    }
  }

  await promiseEach(selectTableQuery, (_err, row) => {
    console.log(`ID: ${row.id}, タイトル: ${row.title}`);
  });
}

exportBookLists().finally(() => {
  db.run(deleteTableQuery, () => {
    db.close();
  });
});

await timers.setTimeout(100);

recreateDB();

async function exportErrBookLists() {
  const args = [firstBookWrong, secondBookWrong];
  await promiseRun(createTableQuery);

  for (const arg of args) {
    try {
      await promiseRun(arg.query, arg.params, arg.callback);
    } catch (err) {
      console.error(err.message);
    }
  }

  try {
    await promiseEach(selectTableWrongQuery, (_err, row) => {
      console.log(`ID: ${row.id}, タイトル: ${row.title}`);
    });
  } catch (err) {
    console.error(err.message);
  }
}

exportErrBookLists().finally(() => {
  db.run(deleteTableQuery, () => {
    db.close();
  });
});
