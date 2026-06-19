import { SqliteDialect } from 'kysely';
import { type SqliteDatabase } from 'kysely';
import { type SqliteStatement } from 'kysely';
import { Kysely } from 'kysely';
import { Database as BunDatabase } from 'bun:sqlite';
import { type DB } from '$lib/schema';
import { env } from '$env/dynamic/private';

const database = new BunDatabase(env.DATABASE_URL, { create: true, safeIntegers: true });

import type { SQLQueryBindings } from 'bun:sqlite';

database.prepare('PRAGMA journal_mode = WAL').run();
database.prepare('PRAGMA foreign_keys = ON').run();

const adapter: SqliteDatabase = {
  close() {
    database.close();
  },
  prepare(sql: string): SqliteStatement {
    const stmt = database.prepare(sql);
    return {
      get reader() {
        return stmt.columnNames.length > 0;
      },
      all(parameters: ReadonlyArray<unknown>) {
        return stmt.all(...parameters as SQLQueryBindings[]) as unknown[];
      },
      run(parameters: ReadonlyArray<unknown>) {
        const result = stmt.run(...parameters as SQLQueryBindings[]);
        return { changes: result.changes, lastInsertRowid: result.lastInsertRowid };
      },
      iterate(parameters: ReadonlyArray<unknown>): IterableIterator<unknown> {
        return stmt.iterate(...parameters as SQLQueryBindings[]) as IterableIterator<unknown>;
      },
    };
  },
};

export const db = new Kysely<DB>({
  dialect: new SqliteDialect({ database: adapter }),
});

