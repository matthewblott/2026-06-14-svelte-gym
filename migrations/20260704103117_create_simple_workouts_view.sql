-- +goose Up

create view simple_workouts_view as
select
  w.id as workout_id,
  w.name as workout_name,
  we.id as workout_exercise_id,
  e.id as exercise_id,
  e.name as exercise_name,
  e.exercise_type,
  cs.duration,
  cs.distance,
  ws.reps,
  ws.weight
from
  workouts w
left join
  workout_exercises we on w.id = we.workout_id
left join
  exercises e on we.exercise_id = e.id
left join
  weight_sets ws on we.id = ws.workout_exercise_id
left join
  cardio_sets cs on we.id = cs.workout_exercise_id;

-- +goose Down

drop view simple_workouts_view;
