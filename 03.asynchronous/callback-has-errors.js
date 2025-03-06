import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

const createTableQuery = `CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )`;

db.run(createTableQuery, function (err) {
  if (err) {
    console.log(err.message);
  } else {
    db.run(
      "INSERT INTO books(title) VALUES(?)",
      "スラスラ読める JavaScriptふりがなプログラミング",
      function (err) {
        if (err) {
          console.log(err.message);
        } else {
          db.run("INSERT INTO books(title) VALUES(?)", null, function (err) {
            if (err) {
              console.log(err.message);
            } else {
              db.each(
                "SELECT * FROM books",
                (err, row) => {
                  console.log(`${row.id}, title:${row.title}`);
                },
                function (err) {
                  if (err) {
                    console.log(err.message);
                  } else {
                    db.close();
                  }
                },
              );
            }
          });
        }
      },
    );
  }
});

await timers.setTimeout(300);

db.run(
  "INSERT INTO books(title) VALUES(?)",
  "初めてのJavaScript",
  function (err) {
    if (err) {
      console.log(err.message);
    } else {
      db.each(
        "SELECT * FROM booksss ",
        (err, row) => {
          console.log(`${row.id}, title:${row.title}`);
        },
        function (err) {
          if (err) {
            console.log(err.message);
          } else {
            db.close();
          }
        },
      );
    }
  },
);
