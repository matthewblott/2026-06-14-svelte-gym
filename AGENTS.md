# AGENTS.md

## Runtime & scripts
- **Bun only.** All scripts use `bun --bun`: `bun dev`, `bun build`. Never use `npm`/`pnpm`/`yarn`.
- No `check` script in package.json. Use `svelte-check` directly if needed.
- Use `make-types` from Makefile to regenerate schema types.

## Database
- SQLite via `bun:sqlite`, wrapped by Kysely. Main DB file at `storage/main.sqlite3`.
- Multi-tenant per user: `storage/tenants/{userId}.sqlite3`.
- Auth DB separate: `storage/auth.sqlite3`.
- **Manual SQL imports** (raw `db.run()` / `db.all()` calls) are the only way to import pre-seeded data. No manual queries against `goose_db_version` — the table is excluded from kysely-codegen.
- **Schema types auto-generated** by `kysely-codegen` (see `package.json` kysely-codegen config). After any migration, run:
  ```
  bun kysely-codegen
  ```
  This rewrites `src/lib/schema.ts`. Do not edit manually.

## Migrations
- **Goose** with separate auth/tenant migrations in `migrations/{auth,tenants}/`.
- Makefile commands: `make db-reset`, `make db-auth-up`, `make db-main-up`.
- Verify migrations with Kysely types.

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
- Routes under `(app)/[username]/` require authentication.
- `src/routes/(app)/[username]/workouts/` — workout CRUD.
- `src/routes/(app)/[username]/settings/exercises/` — exercise CRUD.
- Routes under `(public)/` are publicly accessible.

## Styles
- Global styles in `src/lib/assets/styles/index.css`. Imported in `+layout.svelte`.
- CSS layers: core, components.

## Svelte conventions
- **Svelte 5 with runes forced** (`vite.config.ts` line 11).
- `.ts` files for server logic, `.svelte` for components.
- Components use Svelte 5 runes (all components).
- `experimental: { async: true }` enabled (`vite.config.ts` line 12).
- No custom error boundary (`App.Error` commented in app.d.ts).

## Auth & Database
- BetterAuth configured and wired in `hooks.server.ts`.
- Multi-tenant DB: user-specific SQLite files in `storage/tenants/`.
- Database connections closed in hook response (`event.locals.bunDb?.close()`).
