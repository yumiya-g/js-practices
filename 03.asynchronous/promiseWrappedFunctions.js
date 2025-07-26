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

export const promiseEach = (db, query, callback) =>
  new Promise((resolve, reject) => {
    db.each(query, callback, (err) => {
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
