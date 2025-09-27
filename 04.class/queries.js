export const createTableQuery =
  "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, memo TEXT)";
export const insertTableQuery = "INSERT INTO memos (title, memo) VALUES (?, ?)";
