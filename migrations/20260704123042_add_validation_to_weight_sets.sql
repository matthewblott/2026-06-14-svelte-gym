-- ==========================================================================
-- +goose Up
-- ==========================================================================

pragma foreign_keys = off;
pragma legacy_alter_table = on;

-- --------------------------------------------------------------------------
-- weight_sets 
-- --------------------------------------------------------------------------

-- delete triggers
drop trigger if exists weight_sets_updated_at;

-- Backup original table
alter table weight_sets rename to temp_weight_sets;

-- Recreate table with new schema
create table weight_sets (
  id integer primary key autoincrement,
  workout_exercise_id integer not null references exercises(id),
  reps integer not null check (reps > 0),
  weight integer not null check (weight > 0),
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
) strict;

-- Restore data (explicit column mapping recommended)
insert into weight_sets (
  id,
  workout_exercise_id,
  reps,
  weight,
  created_at,
  updated_at
)
select
  id,
  workout_exercise_id,
  reps,
  weight,
  created_at,
  updated_at
from
  temp_weight_sets;

-- Recreate indexes

-- Recreate triggers here

-- +goose StatementBegin
create trigger weight_sets_updated_at
after update on weight_sets
for each row
when new.updated_at = old.updated_at
begin
  update weight_sets set updated_at = current_timestamp where id = new.id;
end;
-- +goose StatementEnd

-- Update sqlite_sequence to ensure the next id is correct
update sqlite_sequence
set seq = (
  select max(id) from weight_sets
)
where name = 'weight_sets';

-- Cleanup
drop table temp_weight_sets;

-- Optional validation
pragma foreign_key_check;

-- ==========================================================================
-- +goose Down
-- ==========================================================================

pragma foreign_keys = off;
pragma legacy_alter_table = on;

-- --------------------------------------------------------------------------
-- weight_sets 
-- --------------------------------------------------------------------------

-- delete triggers
drop trigger if exists weight_sets_updated_at;

-- Backup original table
alter table weight_sets rename to temp_weight_sets;

-- Recreate table with old schema
create table weight_sets (
  id integer not null primary key autoincrement,
  workout_exercise_id integer not null references exercises(id),
  reps integer not null,
  weight integer not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

-- Restore data (explicit column mapping recommended)
insert into weight_sets (
  id,
  workout_exercise_id,
  reps,
  weight,
  created_at,
  updated_at
)
select
  id,
  workout_exercise_id,
  reps,
  weight,
  created_at,
  updated_at
from
  temp_weight_sets;

-- Recreate indexes

-- Recreate triggers here

-- Update sqlite_sequence to ensure the next id is correct
update sqlite_sequence
set seq = (
  select max(id) from weight_sets
)
where name = 'weight_sets';

-- Cleanup
drop table temp_weight_sets;

-- Optional validation
pragma foreign_key_check;
