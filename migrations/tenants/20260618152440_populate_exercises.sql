-- +goose Up

insert into exercises (name, exercise_type) values
  ('Bench Press', 'weights'),
  ('Squats', 'weights'),
  ('Swimming', 'cardio'),
  ('Running', 'cardio');

-- +goose Down

delete from exercises;

