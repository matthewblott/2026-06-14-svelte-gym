-- ==========================================================================
-- +goose Up
-- ==========================================================================

pragma foreign_keys = off;
pragma legacy_alter_table = on;

-- --------------------------------------------------------------------------
-- table_name 
-- --------------------------------------------------------------------------

-- Backup original table
alter table table_name rename to temp_table_name;

-- Recreate table with new schema
create table table_name (
  id integer primary key autoincrement,
  ...
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
) strict;

-- Restore data (explicit column mapping recommended)
insert into table_name (
  id,
  ...
  created_at,
  updated_at
)
select
  id,
  ...
  created_at,
  updated_at
from
  temp_table_name;

-- Recreate indexes

-- Recreate triggers here

-- +goose StatementBegin
create trigger table_name_updated_at
after update on table_name
for each row
when new.updated_at = old.updated_at
begin
  update table_name set updated_at = current_timestamp where id = new.id;
end;
-- +goose StatementEnd

-- Update sqlite_sequence to ensure the next id is correct
update sqlite_sequence
set seq = (
  select max(id) from table_name
)
where name = 'table_name';

-- Cleanup
drop table temp_table_name;

-- Optional validation
pragma foreign_key_check;

-- ==========================================================================
-- +goose Down
-- ==========================================================================

pragma foreign_keys = off;
pragma legacy_alter_table = on;

-- --------------------------------------------------------------------------
-- table_name 
-- --------------------------------------------------------------------------

-- Backup original table
alter table table_name rename to temp_table_name;

-- Recreate table with old schema
create table table_name (
  id integer primary key autoincrement,
  ...
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
);

-- Restore data (explicit column mapping recommended)
insert into table_name (
  id,
  ...
  created_at,
  updated_at
)
select
  id,
  ...
  created_at,
  updated_at
from
  temp_table_name;

-- Recreate indexes

-- Recreate triggers here

-- Update sqlite_sequence to ensure the next id is correct
update sqlite_sequence
set seq = (
  select max(id) from table_name
)
where name = 'table_name';

-- Cleanup
drop table temp_table_name;

-- Optional validation
pragma foreign_key_check;
