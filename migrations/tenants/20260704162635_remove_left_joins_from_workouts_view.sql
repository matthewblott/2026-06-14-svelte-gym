-- +goose Up

drop view workouts_view;

create view workouts_view as
select
  w.id as workout_id,
  w.name as workout_name,
  w.created_at as workout_created_at,
  w.updated_at as workout_updated_at,
  we.id as workout_exercise_id,
  we.created_at as workout_exercise_created_at,
  we.updated_at as workout_exercise_updated_at,
  e.id as exercise_id,
  e.name as exercise_name,
  e.exercise_type,
  e.created_at as exercise_created_at,
  e.updated_at as exercise_updated_at,
  cs.duration,
  cs.distance,
  cs.created_at as cardio_set_created_at,
  cs.updated_at as cardio_set_updated_at,
  ws.reps,
  ws.weight,
  ws.created_at as weight_set_created_at,
  ws.updated_at as weight_set_updated_at
from
  workouts w
join
  workout_exercises we on w.id = we.workout_id
join
  exercises e on we.exercise_id = e.id
join
  weight_sets ws on we.id = ws.workout_exercise_id
join
  cardio_sets cs on we.id = cs.workout_exercise_id;

-- +goose Down

drop view workouts_view;

create view workouts_view as
select
  w.id as workout_id,
  w.name as workout_name,
  w.created_at as workout_created_at,
  w.updated_at as workout_updated_at,
  we.id as workout_exercise_id,
  we.created_at as workout_exercise_created_at,
  we.updated_at as workout_exercise_updated_at,
  e.id as exercise_id,
  e.name as exercise_name,
  e.exercise_type,
  e.created_at as exercise_created_at,
  e.updated_at as exercise_updated_at,
  cs.duration,
  cs.distance,
  cs.created_at as cardio_set_created_at,
  cs.updated_at as cardio_set_updated_at,
  ws.reps,
  ws.weight,
  ws.created_at as weight_set_created_at,
  ws.updated_at as weight_set_updated_at
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
