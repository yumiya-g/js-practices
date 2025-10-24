export const createTableQuery =
  "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, contents TEXT)";
export const insertTableQuery =
  "INSERT INTO memos (title, contents) VALUES (?, ?)";
export const selectTableQuery = "SELECT * FROM memos";
export const deleteTableQuery = "DELETE FROM memos WHERE id = ?";
