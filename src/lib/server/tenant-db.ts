import { CamelCasePlugin, SqliteDialect } from 'kysely';
import { Kysely } from 'kysely';
import Database from 'better-sqlite3';
import { type DB } from '$lib/schema';

export function getTenantDb(id: number) {
  const path = `storage/tenants/${id}.sqlite3`;
  const bunDb = new Database(path);

  bunDb.pragma('journal_mode = WAL');
  bunDb.pragma('foreign_keys = ON');
  bunDb.pragma('trusted_schema = 1');

  const dialect = new SqliteDialect({
    database: bunDb
  })

  const db = new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
    log(event) {
      if (event.level === 'query') {
        console.log(event.query.sql)
        console.log(event.query.parameters)
      }
    },
  });

  return { db, bunDb }; 
}
