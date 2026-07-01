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

## Svelte MCP server
You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

### 1. list-sections
Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation
Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer
Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link
Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

## Route structure
- `src/routes/workouts/` — workout CRUD (list, detail `[id]`, new).
- `src/routes/exercises/` — exercise CRUD (list with search, detail `[id]`, new).

## Styles
- Global styles in `src/lib/assets/styles/index.css`. Imported in `+layout.svelte`.

## Limitations / known gaps
- Auth (Better Auth) configured but not wired up.
- `src/app.d.ts` — `App.Locals` is empty. `App.PageData` / `App.Platform` commented out.

## Code conventions
- Files: `.ts` (grids), `.svelte` (components + Svelte 5 runes all components).
- no custom error boundary (`App.Error` commented in app.d.ts).
