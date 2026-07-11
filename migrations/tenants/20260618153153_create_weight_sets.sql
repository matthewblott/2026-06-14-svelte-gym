-- +goose Up

pragma foreign_keys = off;

create table weight_sets (
  id integer not null primary key autoincrement,
  workout_exercise_id integer not null references exercises(id),
  reps integer not null,
  weight integer not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

-- +goose Down

pragma foreign_keys = off;

drop table weight_sets;
