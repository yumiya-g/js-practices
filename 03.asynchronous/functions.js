import sqlite3 from "sqlite3";
sqlite3.verbose();

export let db = new sqlite3.Database("database");

export const promiseRun = (query, params = [], callback = null) =>
  new Promise((resolve, _reject) => {
    if (callback === null) {
      callback = function () {
        resolve(this);
      };
    }

    db.run(query, params, callback);
  });

export const promiseEach = (query, ...args) =>
  new Promise((resolve, _reject) => {
    let params = [];
    let callback = null;
    let complete = null;

    if (typeof args[0] === "function") {
      params = [];
      callback = args[0];
      complete = args[1];
    } else {
      params = args[0];
      callback = args[1];
      complete = args[2];
    }

    resolve(
      db.each(
        query,
        params,
        (_err, row) => {
          callback(_err, row);
        },
        () => {
          complete();
        },
      ),
    );
  });
