-- ==========================================================================
-- +goose Up
-- ==========================================================================

pragma foreign_keys = off;
pragma legacy_alter_table = on;

-- --------------------------------------------------------------------------
-- cardio_sets 
-- --------------------------------------------------------------------------

-- delete triggers
drop trigger if exists cardio_sets_updated_at;

-- Backup original table
alter table cardio_sets rename to temp_cardio_sets;

-- Recreate table with new schema
create table cardio_sets (
  id integer primary key autoincrement,
  workout_exercise_id integer not null references exercises(id),
  distance integer not null check (distance > 0),
  duration_seconds integer not null check (duration_seconds > 0),
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
) strict;

-- Restore data (explicit column mapping recommended)
insert into cardio_sets (
  id,
  workout_exercise_id,
  duration_seconds,
  created_at,
  updated_at
)
select
  id,
  workout_exercise_id,
  duration_seconds,
  created_at,
  updated_at
from
  temp_cardio_sets;

-- Recreate indexes

-- Recreate triggers here

-- +goose StatementBegin
create trigger cardio_sets_updated_at
after update on cardio_sets
for each row
when new.updated_at = old.updated_at
begin
  update cardio_sets set updated_at = current_timestamp where id = new.id;
end;
-- +goose StatementEnd

-- Update sqlite_sequence to ensure the next id is correct
update sqlite_sequence
set seq = (
  select max(id) from cardio_sets
)
where name = 'cardio_sets';

-- Cleanup
drop table temp_cardio_sets;

-- Optional validation
pragma foreign_key_check;

-- ==========================================================================
-- +goose Down
-- ==========================================================================

pragma foreign_keys = off;
pragma legacy_alter_table = on;

-- --------------------------------------------------------------------------
-- cardio_sets 
-- --------------------------------------------------------------------------

alter table cardio_sets drop column distance;

-- Optional validation
pragma foreign_key_check;
