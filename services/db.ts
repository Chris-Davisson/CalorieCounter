import { openDatabaseSync } from 'expo-sqlite/';

const db = openDatabaseSync('calories.db');

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS calories (
      id INTEGER PRIMARY KEY NOT NULL,
      date TEXT NOT NULL UNIQUE,
      total INTEGER
    );
  `);
};

export const getCaloriesForDate = (date: string): number | null => {
  const result = db.getFirstSync<{ total: number }>(
    'SELECT total FROM calories WHERE date = ?',
    [date]
  );
  return result?.total ?? null;
};

export const setCaloriesForDate = (date: string, total: number) => {
  db.runSync(
    `INSERT OR REPLACE INTO calories (date, total) VALUES (?, ?)`,
    [date, total]
  );
};

export const getLast7Days = (dates: string[]): number[] => {
  const placeholders = dates.map(() => '?').join(',');
  const results = db.getAllSync<{ date: string; total: number }>(
    `SELECT date, total FROM calories WHERE date IN (${placeholders})`,
    dates
  );

  const map = new Map(results.map(row => [row.date, row.total]));
  return dates.map(date => map.get(date) ?? 0);
};
