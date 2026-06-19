-- +goose Up

create table workout_exercises (
  id integer not null primary key autoincrement,
  workout_id integer not null references workouts(id),
  exercise_id integer not null references exercises(id),
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

-- +goose Down

drop table workout_exercises;

