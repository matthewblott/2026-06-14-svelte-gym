-- +goose Up

pragma foreign_keys = off;

-- Backup original table
alter table workouts rename to temp_workouts;

-- Recreate table with new schema
create table workouts (
  id integer primary key autoincrement,
  name text not null
    check (length(name) between 1 and 50),
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
) strict;

-- Restore data (explicit column mapping recommended)
insert into workouts (
  id,
  name,
  created_at,
  updated_at
)
select
  id,
  name,
  created_at,
  updated_at
from
  temp_workouts;

-- Recreate indexes

-- Recreate triggers here

-- +goose StatementBegin
create trigger workouts_updated_at
after update on workouts
for each row
when new.updated_at = old.updated_at
begin
  update workouts set updated_at = current_timestamp where id = new.id;
end;
-- +goose StatementEnd

-- Cleanup
drop table temp_workouts;

-- Update sqlite_sequence to ensure the next id is correct
update sqlite_sequence
set seq = (
  select max(id) from workouts
)
where name = 'workouts';

pragma foreign_keys = on;

-- Optional validation
pragma foreign_key_check;

-- +goose Down

pragma foreign_keys = off;

-- Backup original table
alter table workouts rename to temp_workouts;

-- Recreate table with new schema
create table workouts (
  id integer primary key autoincrement,
  name text not null,
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
) strict;

-- Restore data (explicit column mapping recommended)
insert into workouts (
  id,
  name,
  created_at,
  updated_at
)
select
  id,
  name,
  created_at,
  updated_at
from
  temp_workouts;

-- Recreate indexes

-- Recreate triggers here

-- Cleanup
drop table temp_workouts;

-- Update sqlite_sequence to ensure the next id is correct
update sqlite_sequence
set seq = (
  select max(id) from workouts
)
where name = 'workouts';

pragma foreign_keys = on;

-- Optional validation
pragma foreign_key_check;
