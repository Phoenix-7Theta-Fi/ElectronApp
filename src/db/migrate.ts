import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import path from 'path';

export async function runMigrations() {
  const sqlite = new Database('sqlite.db');
  const db = drizzle(sqlite);

  // Run migrations
  await migrate(db, {
    migrationsFolder: path.join(process.cwd(), 'drizzle'),
  });

  sqlite.close();
}