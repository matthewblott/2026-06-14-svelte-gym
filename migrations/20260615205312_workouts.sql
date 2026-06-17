-- +goose Up

create table workouts (
  id integer not null primary key autoincrement,
  name text not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table exercises (
  id integer not null primary key autoincrement,
  name text not null,
  exercise_type text not null check (exercise_type in ('weight', 'cardio')) default 'weights',
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table weight_sets (
  id integer not null primary key autoincrement,
  exercise_id integer not null references exercises(id),
  reps integer not null,
  weight integer not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table cardio_sets (
  id integer not null primary key autoincrement,
  exercise_id integer not null references exercises(id),
  duration_seconds integer not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table workout_exercises (
  id integer not null primary key autoincrement,
  workout_id integer not null references workouts(id),
  exercise_id integer not null references exercises(id),
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

-- +goose Down

drop table workouts;
drop table exercises;
drop table weight_sets;
drop table cardio_sets;
drop table workout_exercises;
