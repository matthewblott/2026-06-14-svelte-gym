-- +goose Up

pragma foreign_keys = off;
pragma legacy_alter_table = on;

create table workouts (
  id integer not null primary key autoincrement,
  name text not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

-- +goose Down

drop table workouts;

pragma foreign_keys = on;
pragma legacy_alter_table = off;
