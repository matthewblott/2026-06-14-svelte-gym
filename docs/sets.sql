select
  we.workout_id,
  we.exercise_id,
  e.name as exercise_name,
  e.exercise_type,
  cs.workout_exercise_id,
  cs.distance as distance_or_reps,
  cs.duration as duration_or_weight,
  cs.created_at,
  cs.updated_at
from
  cardio_sets cs
join
  workout_exercises we on cs.workout_exercise_id = we.id
join
  exercises e on we.exercise_id = e.id
union select
  we.workout_id,
  we.exercise_id,
  e.name as exercise_name,
  e.exercise_type,
  ws.workout_exercise_id,
  ws.reps as distance_or_reps,
  ws.weight as duration_or_weight,
  ws.created_at,
  ws.updated_at
from
	weight_sets ws
join
  workout_exercises we on ws.workout_exercise_id = we.id
join
  exercises e on we.exercise_id = e.id
;
