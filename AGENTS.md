# AGENTS.md

## Runtime & scripts
- **Bun only.** All scripts use `bun --bun`: `bun dev`, `bun build`, `bun preview`. Never use `npm`/`pnpm`/`yarn`.
- `bun run check` — typecheck (`svelte-check`).

## Database
- SQLite via `bun:sqlite`, wrapped by Kysely. DB file at `storage/local.sqlite3`.
- **Manual SQL imports** (raw `db.run()` / `db.all()` calls) are the only way to import pre-seeded data. No manual queries against `goose_db_version` — the table is excluded from kysely-codegen.
- **Schema types are auto-generated** by `kysely-codegen` from the live DB (see `package.json` kysely-codegen config). After any migration, run:
  ```
  bun run generate:types
  ```
  This rewrites `src/lib/schema.d.ts`. Do not edit it manually.

## Migrations
- **Goose** (SQL migrations in `migrations/`). Also verify with Kysely types.

## SvelteKit 2.16+ server actions
- Use `$app/server` `query()` / `form()` patterns from `src/routes/workouts/workouts.remote.ts`.
- `query(lambda)` for GET endpoints. `form(schema, lambda)` for POST

## Route structure
- `src/routes/workouts/` — workout CRUD (list, detail `[id]`, new). Handlers in `workouts.remote.ts`.
- `src/routes/exercises/` — exercise CRUD scaffolded. `+page.svelte` is **empty** — exercise listing UI is not yet implemented.

## Styles
- Global styles in `src/lib/styles/site.css`. Imported in `+layout.svelte`.

## Limitations / known gaps
- Auth (Better Auth) configured but not wired up.
- Exercise pages (`+page.svelte`) are empty.
- `src/app.d.ts` — `App.Locals` empty. `App.PageData` / `App.Platform` commented.

## Code conventions
- Files: `.ts` (grids), `.svelte` (components + Svelte 5 runes all components).
- no custom error boundary (`App.Error` commented in app.d.ts).
