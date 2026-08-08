import type { Session, User } from 'better-auth';
import type { Kysely } from 'kysely';
import type { Database } from 'bun:sqlite';
import { type DB } from '$lib/schema';

declare global {
	namespace App {
		interface Locals {
      session: Session | null;
      user: User | null;
      db: Kysely<DB> | null
      bunDb: Database | null
      isHotwireNative: boolean
      isAndroid: boolean
    }
	}
}

export {};
