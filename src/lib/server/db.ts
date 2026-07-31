import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';

export const db = new Database(env.DATABASE_URL);

// db.prepare('PRAGMA foreign_keys = ON').run();
// db.prepare('PRAGMA trusted_schema = 1').run();
