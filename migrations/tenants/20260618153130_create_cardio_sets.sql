-- +goose Up

pragma foreign_keys = off;

create table cardio_sets (
  id integer not null primary key autoincrement,
  workout_exercise_id integer not null references exercises(id),
  duration_seconds integer not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

-- +goose Down

pragma foreign_keys = off;

drop table cardio_sets;
