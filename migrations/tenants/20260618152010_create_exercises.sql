-- +goose Up

create table exercises (
  id integer not null primary key autoincrement,
  name text not null,
  exercise_type text not null check (exercise_type in ('weights', 'cardio')) default 'weights',
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

-- +goose Down

drop table exercises;
