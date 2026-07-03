-- +goose Up

pragma foreign_keys = off;
pragma legacy_alter_table = on;

create view workout_exercises_view as
select
  w.id as workout_id,
  w.name as workout_name,
  we.id as workout_exercise_id,
  e.id as exercise_id,
  e.name as exercise_name,
  e.exercise_type
from
  workouts w
join
  workout_exercises we on w.id = we.workout_id
join
  exercises e on we.exercise_id = e.id;

-- +goose Down

drop view workout_exercises_view;

pragma foreign_keys = on;
pragma legacy_alter_table = off;
