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

## SvelteKit 2.16+ load + Actions
- Use `+page.server.ts` with `load()` for GET data and `Actions` for POST mutations.
- `load` receives `{ params, parent, url, request }` — return an object that becomes `data` in the `.svelte` page.
- `Actions` — export an `actions` object with named or `default` handlers. Return objects on validation errors (re-render page), or `redirect()` for POST-redirect-GET.
- `.svelte` pages use **Svelte 5 runes**: `let { data } = $props()` — not `export let`.
- Example: `src/routes/workouts/+page.server.ts`, `src/routes/workouts/[id]/+page.server.ts`, `src/routes/workouts/new/+page.server.ts`.

## Route structure
- `src/routes/workouts/` — workout CRUD (list, detail `[id]`, new).
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
