import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");

export const createTableQuery = `CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )`;

export function registerBooks(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        console.log(`ID: ${this.lastID}`);
        resolve(this.lastID);
      }
    });
  });
}
