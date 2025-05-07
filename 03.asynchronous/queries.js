const createTableQuery =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
const insertTableQuery = "INSERT INTO books (title) VALUES (?)";
const selectTableQuery = "SELECT * FROM books";
const insertTableWrongQuery = "INSERT INTO bookss (title) VALUES (?)";
const selectTableWrongQuery = "SELECT hoge FROM bbbooks";
const deleteTableQuery = "DROP TABLE IF EXISTS books";

export {
  createTableQuery,
  insertTableQuery,
  selectTableQuery,
  insertTableWrongQuery,
  selectTableWrongQuery,
  deleteTableQuery,
};
