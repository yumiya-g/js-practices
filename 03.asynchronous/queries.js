export const createTableQuery =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
export const insertTableQuery = "INSERT INTO books (title) VALUES (?)";
export const selectTableQuery = "SELECT * FROM books";
export const insertTableWrongQuery = "INSERT INTO bookss (title) VALUES (?)";
export const selectTableWrongQuery = "SELECT hoge FROM bbbooks";
export const deleteTableQuery = "DROP TABLE books";
