export const promiseRun = (db, query, params) =>
  new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });

export const promiseEach = (db, query, complete) =>
  new Promise((resolve, reject) => {
    db.each(query, complete, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

export const promiseClose = (db) =>
  new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
