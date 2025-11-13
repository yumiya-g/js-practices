import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

export const promiseReadline = () => {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: stdin,
      output: stdout,
    });

    const lines = [];

    rl.on("line", (line) => {
      lines.push(line);
    });

    rl.on("close", () => {
      resolve(lines);
    });
  });
};

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

export const promiseAll = (db, query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

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
