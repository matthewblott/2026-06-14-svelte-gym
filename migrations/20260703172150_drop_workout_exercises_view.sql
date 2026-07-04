-- +goose Up

drop view workout_exercises_view;

-- +goose Down

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
