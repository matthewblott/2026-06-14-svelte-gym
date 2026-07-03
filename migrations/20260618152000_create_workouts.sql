-- +goose Up

create table workouts (
  id integer not null primary key autoincrement,
  name text not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

-- +goose Down

drop table workouts;
