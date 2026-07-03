-- ==========================================================================
-- +goose Up
-- ==========================================================================

pragma foreign_keys = off;
pragma legacy_alter_table = on;

-- --------------------------------------------------------------------------
-- workouts
-- --------------------------------------------------------------------------

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

-- Restore data
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

-- Update sqlite_sequence to ensure the next id is correct
update sqlite_sequence
set seq = (
  select max(id) from workouts
)
where name = 'workouts';

-- Cleanup
drop table temp_workouts;

-- -- --------------------------------------------------------------------------
-- -- workout_exercises
-- -- --------------------------------------------------------------------------
--
-- -- Backup original table
-- alter table workout_exercises rename to temp_workout_exercises;
--
-- -- Recreate table with new schema
-- create table workout_exercises (
--   id integer not null primary key autoincrement,
--   workout_id integer not null references workouts(id),
--   exercise_id integer not null references exercises(id),
--   created_at text not null default current_timestamp,
--   updated_at text not null default current_timestamp
-- ) strict;
--
-- -- Restore data
-- insert into workout_exercises (
--   id,
--   workout_id,
--   exercise_id,
--   created_at,
--   updated_at
-- )
-- select
--   id,
--   workout_id,
--   exercise_id,
--   created_at,
--   updated_at
-- from
--   temp_workout_exercises;
--
-- -- Recreate indexes
--
-- -- Recreate triggers here
--
-- -- +goose StatementBegin
-- create trigger workout_exercises_updated_at
-- after update on workout_exercises
-- for each row
-- when new.updated_at = old.updated_at
-- begin
--   update workout_exercises set updated_at = current_timestamp where id = new.id;
-- end;
-- -- +goose StatementEnd
--
-- -- Update sqlite_sequence to ensure the next id is correct
-- update sqlite_sequence
-- set seq = (
--   select max(id) from workout_exercises
-- )
-- where name = 'workout_exercises';
--
-- -- Cleanup
-- drop table temp_workout_exercises;

pragma foreign_keys = on;

-- Optional validation
pragma foreign_key_check;

-- ==========================================================================
-- +goose Down
-- ==========================================================================

pragma foreign_keys = off;

-- --------------------------------------------------------------------------
-- workouts
-- --------------------------------------------------------------------------

-- Backup original table
alter table workouts rename to temp_workouts;

-- Recreate table with new schema
create table workouts (
  id integer primary key autoincrement,
  name text not null,
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
);

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

-- Update sqlite_sequence to ensure the next id is correct
update sqlite_sequence
set seq = (
  select max(id) from workouts
)
where name = 'workouts';

-- Cleanup
drop table temp_workouts;

-- -- --------------------------------------------------------------------------
-- -- workout_exercises
-- -- --------------------------------------------------------------------------
--
-- -- Backup original table
-- alter table workout_exercises rename to temp_workout_exercises;
--
-- -- Recreate table with new schema
-- create table workout_exercises (
--   id integer not null primary key autoincrement,
--   workout_id integer not null references workouts(id),
--   exercise_id integer not null references exercises(id),
--   created_at timestamp not null default current_timestamp,
--   updated_at timestamp not null default current_timestamp
-- );
--
-- -- Restore data (explicit column mapping recommended)
-- insert into workout_exercises (
--   id,
--   workout_id,
--   exercise_id,
--   created_at,
--   updated_at
-- )
-- select
--   id,
--   workout_id,
--   exercise_id,
--   created_at,
--   updated_at
-- from
--   temp_workout_exercises;
--
-- -- Recreate indexes
--
-- -- Recreate triggers here
--
-- -- Update sqlite_sequence to ensure the next id is correct
-- update sqlite_sequence
-- set seq = (
--   select max(id) from workout_exercises
-- )
-- where name = 'workout_exercises';
--
-- -- Cleanup
-- drop table temp_workout_exercises;

pragma foreign_keys = on;
pragma legacy_alter_table = off;

-- Optional validation
pragma foreign_key_check;
