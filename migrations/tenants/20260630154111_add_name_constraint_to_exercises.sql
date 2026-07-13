-- ==========================================================================
-- +goose Up
-- ==========================================================================

pragma foreign_keys = off;
pragma legacy_alter_table = on;

-- --------------------------------------------------------------------------
-- exercises 
-- --------------------------------------------------------------------------

-- delete triggers
drop trigger if exists exercises_updated_at;

-- Backup original table
alter table exercises rename to temp_exercises;

-- Recreate table with new schema
create table exercises (
  id integer primary key autoincrement,
  name text not null
    check (length(name) between 1 and 50),
  exercise_type text not null check (exercise_type in ('weights', 'cardio')) default 'weights',
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
) strict;

-- Restore data (explicit column mapping recommended)
insert into exercises (
  id,
  name,
  exercise_type,
  created_at,
  updated_at
)
select
  id,
  name,
  exercise_type,
  created_at,
  updated_at
from
  temp_exercises;

-- Recreate indexes

-- Recreate triggers here

-- +goose StatementBegin
create trigger exercises_updated_at
after update on exercises
for each row
when new.updated_at = old.updated_at
begin
  update exercises set updated_at = current_timestamp where id = new.id;
end;
-- +goose StatementEnd

-- Update sqlite_sequence to ensure the next id is correct
update sqlite_sequence
set seq = (
  select max(id) from exercises
)
where name = 'exercises';

-- Cleanup
drop table temp_exercises;

pragma foreign_keys = on;

-- Optional validation
pragma foreign_key_check;

-- ==========================================================================
-- +goose Down
-- ==========================================================================

pragma foreign_keys = off;
pragma legacy_alter_table = on;

-- --------------------------------------------------------------------------
-- exercises 
-- --------------------------------------------------------------------------

-- delete triggers
drop trigger if exists exercises_updated_at;

-- Backup original table
alter table exercises rename to temp_exercises;

-- Recreate table with old schema
create table exercises (
  id integer primary key autoincrement,
  name text not null,
  exercise_type text not null check (exercise_type in ('weights', 'cardio')) default 'weights',
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
);

-- Restore data (explicit column mapping recommended)
insert into exercises (
  id,
  name,
  exercise_type,
  created_at,
  updated_at
)
select
  id,
  name,
  exercise_type,
  created_at,
  updated_at
from
  temp_exercises;

-- Recreate indexes

-- Recreate triggers here

-- Update sqlite_sequence to ensure the next id is correct
update sqlite_sequence
set seq = (
  select max(id) from exercises
)
where name = 'exercises';

-- Cleanup
drop table temp_exercises;

-- Optional validation
pragma foreign_key_check;
