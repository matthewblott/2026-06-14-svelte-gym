.PHONY: install dev lint test build clean ci clean
.ONESHELL:
SHELL := $(shell command -v bash)
.SHELLFLAGS := -eu -o pipefail -c

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*## ' Makefile | \
		awk 'BEGIN {FS = ":.*## "}; {printf "%-20s %s\n", $$1, $$2}'

-include .env
export

# ==============================================================================
# Vite
# ==============================================================================

dev: ## Run dev server
	bun --bun vite dev --host

# ==============================================================================
# SvelteKit 
# ==============================================================================

sv-sync: ## Sync SvelteKit
	bun svelte-kit sync

# ==============================================================================
# Databases 
# ==============================================================================

# List without running: make -n db-reset
db-reset: db-clear db-auth-up db-main-up db-test-user-create db-test-user-up

db-clear: ## Delete the storage folder (part of reset)
	rm -rf storage

# -----------------------------------------------------------------------------
# Auth database
# -----------------------------------------------------------------------------

auth_migrations := ./migrations/auth
auth_db := ./storage/auth.sqlite3

db-auth-up: ## Create auth database (part of reset)
	mkdir storage
	GOOSE_MIGRATION_DIR=$(auth_migrations) \
	GOOSE_DBSTRING=$(auth_db) \
	goose up

db-auth-down: ## Clear auth database
	GOOSE_MIGRATION_DIR=$(auth_migrations) \
	GOOSE_DBSTRING=$(auth_db) \
	goose down

# -----------------------------------------------------------------------------
# Tentants database
# -----------------------------------------------------------------------------

tenants_migrations := ./migrations/tenants
tenants_db := ./storage/main.sqlite3

db-main-up: ## Create tenants database (part of reset)
	mkdir -p storage/tenants
	GOOSE_MIGRATION_DIR=$(tenants_migrations) \
	GOOSE_DBSTRING=$(tenants_db) \
	goose up

db-main-down: ## Clear tenants database
	GOOSE_MIGRATION_DIR=$(tenants_migrations) \
	GOOSE_DBSTRING=$(tenants_db) \
	goose down

db-tenants-up: ## Migrate tenants
	for db in storage/tenants/*.sqlite3; do
	  GOOSE_MIGRATION_DIR=$(tenants_migrations) \
		GOOSE_DBSTRING="$$db" \
		goose up
	done

db-tenants-down: ## Rollback tenants
	for db in storage/tenants/*.sqlite3; do
	  GOOSE_MIGRATION_DIR=$(tenants_migrations) \
		GOOSE_DBSTRING="$$db" \
		goose down
	done

make-types: ## Generate types
	bun kysely-codegen

# -----------------------------------------------------------------------------
# Test User database
# -----------------------------------------------------------------------------

test_user_migrations := ./migrations/testuser
test_user_db := ./storage/tenants/1.sqlite3

db-test-user-create: ## Create test user database
	mkdir -p storage/tenants
	cp ./storage/main.sqlite3 $(test_user_db)

db-test-user-up: ## Seed dummy data for the test user 
	GOOSE_MIGRATION_DIR=$(test_user_migrations) \
	GOOSE_DBSTRING="$(test_user_db)" \
	GOOSE_TABLE=goose_seed_version \
	goose up

db-test-user-down: ## Seed dummy data for the test user 
	GOOSE_MIGRATION_DIR=$(test_user_migrations) \
	GOOSE_DBSTRING="$(test_user_db)" \
	GOOSE_TABLE=goose_seed_version \
	goose down 


# ==============================================================================
# Hotwire Native 
# ==============================================================================

# old solution:
# ln -s ../node_modules/@hotwired/turbo/dist/turbo.es2017-umd.js static/turbo.js

hw-build: ## Build Hotwire
	bunx esbuild \
		src/lib/hotwire/index.ts \
			--bundle \
			--format=iife \
			--outfile=static/hotwire-shim.js

hw-build-min: ## Build Hotwire
	bunx esbuild \
		src/lib/hotwire/index.ts \
			--bundle \
			--format=iife \
			--minify \
			--sourcemap \
			--outfile=static/hotwire-shim.js


# ==============================================================================
# Production
# ==============================================================================

project_name := jimlog
user_name := $(DEPLOYMENT_USER) 
server_name := $(DEPLOYMENT_SERVER)

prod-build: ## Build production
	NODE_ENV=production bun --bun vite build
	cp .env build/.env
	cp -r storage build/storage
	cp package.json build/package.json
	mv build ${project_name} 
	tar -czvf ${project_name}.tar.gz ${project_name} 
	scp -Cr ${project_name}.tar.gz ${user_name}@${server_name}:./www/
	rm -rf ${project_name}
	rm -rf ${project_name}.tar.gz
	# Remember to run "bun i --production" on the server

prod-run: ## Run production
	ORIGIN=http://localhost:3000 bun build/index.js
