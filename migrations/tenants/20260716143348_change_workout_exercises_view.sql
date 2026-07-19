-- +goose Up

drop view workout_exercises_view;

create view workout_exercises_view as
select
  we.workout_id,
  we.id as workout_exercise_id,
  we.created_at as workout_exercise_created_at,
  we.updated_at as workout_exercise_updated_at,
  e.id as exercise_id,
  e.name as exercise_name,
  e.exercise_type,
  e.created_at as exercise_created_at,
  e.updated_at as exercise_updated_at,
  count(ws.reps) as number_of_sets,
  ifnull(sum(cs.distance), 0) as total_distance
from
  workout_exercises we
join
  exercises e on we.exercise_id = e.id
left join
  weight_sets ws on we.id = ws.workout_exercise_id
left join
  cardio_sets cs on we.id = cs.workout_exercise_id
group by
  we.workout_id,
  we.id,
  we.created_at,
  we.updated_at,
  e.id,
  e.name,
  e.exercise_type,
  e.created_at,
  e.updated_at;

-- +goose Down

drop view workout_exercises_view;

create view workout_exercises_view as
select
  we.workout_id,
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
  workout_exercises we
join
  exercises e on we.exercise_id = e.id
join
  weight_sets ws on we.id = ws.workout_exercise_id
join
  cardio_sets cs on we.id = cs.workout_exercise_id;
