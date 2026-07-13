.PHONY: install dev lint test build clean ci clean

auth_migrations := ./migrations/auth
auth_db := ./storage/auth.sqlite3

db-reset: db-clear db-auth-up db-main-up

db-clear:
	rm -rf storage

db-auth-up:
	mkdir storage
	GOOSE_MIGRATION_DIR=$(auth_migrations) GOOSE_DBSTRING=$(auth_db) goose up

db-auth-down:
	GOOSE_MIGRATION_DIR=$(auth_migrations) GOOSE_DBSTRING=$(auth_db) goose down

tenants_migrations := ./migrations/tenants
tenants_db := ./storage/main.sqlite3

db-main-up:
	mkdir -p storage/tenants
	GOOSE_MIGRATION_DIR=$(tenants_migrations) GOOSE_DBSTRING=$(tenants_db) goose up

db-main-down:
	GOOSE_MIGRATION_DIR=$(tenants_migrations) GOOSE_DBSTRING=$(tenants_db) goose down

make-types:
	bun kysely-codegen

# sqlite3 storage/local.sqlite3
