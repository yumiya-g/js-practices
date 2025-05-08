import {
  createTableQuery,
  insertTableQuery,
  selectTableQuery,
  insertTableWrongQuery,
  selectTableWrongQuery,
} from "./queries.js";

export const promise = (db) =>
  new Promise((resolve) => {
    db.run(createTableQuery, () => {
      resolve(db);
    });
  });

export const insertFirstBook = (db) =>
  new Promise((resolve) =>
    db.run(
      insertTableQuery,
      "スラスラ読める JavaScriptふりがなプログラミング",
      function () {
        resolve({ props: this, db });
      },
    ),
  );

export const insertSecondBook = ({ props, db }) =>
  new Promise((resolve) =>
    db.run(insertTableQuery, "初めてのJavaScript", function () {
      console.log(`ID: ${props.lastID}`);
      resolve({ props: this, db });
    }),
  );

export const displayBooks = ({ props, db }) =>
  new Promise((resolve) => {
    console.log(`ID: ${props.lastID}`);
    db.each(
      selectTableQuery,
      (_err, row) => {
        console.log(`ID: ${row.id}, タイトル: ${row.title}`);
      },
      () => resolve(db),
    );
  });

export const insertFirstBookError = (db) =>
  new Promise((_, reject) =>
    db.run(
      insertTableWrongQuery,
      "スラスラ読める JavaScriptふりがなプログラミング",
      function (err) {
        if (err) {
          console.log(err.message);
          reject(db);
        } else {
          _(this);
        }
      },
    ),
  );

export const insertSecondBookError = (db) =>
  new Promise((_, reject) =>
    db.run(insertTableQuery, null, function (err) {
      if (err) {
        console.log(err.message);
        reject(db);
      } else {
        _(this);
      }
    }),
  );

export const displayBooksError = (db) =>
  new Promise((_, reject) =>
    db.each(selectTableWrongQuery, (err, _row) => {
      if (err) {
        console.log(err.message);
        reject(db);
      } else {
        console.log(`ID: ${_row.id}, タイトル: ${_row.title}`);
        _(this);
      }
    }),
  );
