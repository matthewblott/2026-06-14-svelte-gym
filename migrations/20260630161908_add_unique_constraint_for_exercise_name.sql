-- +goose Up

pragma foreign_keys = off;
pragma legacy_alter_table = on;

create unique index idx_unique_exercise_name on exercises(name);

-- +goose Down

drop index idx_unique_exercise_name;

pragma foreign_keys = on;
pragma legacy_alter_table = off;
