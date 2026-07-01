-- +goose Up

create unique index idx_unique_exercise_name on exercises(name);

-- +goose Down

drop index idx_unique_exercise_name;
