type Id = number;

export const routes = {
  workouts: {
    list: () =>
      `/workouts/`,
    
    // routes.workouts.exercises
    exercises: {
      list: (workoutId: Id) =>
        `/workouts/${workoutId}/exercises`,

      new: (workoutId: Id) =>
        `/workouts/${workoutId}/exercises/new`,

      sets: {
        list: ({ workoutId, exerciseId }: {
            workoutId: number;
            exerciseId: number;
          }) =>
            `/workouts/${workoutId}/exercises/${exerciseId}/sets`,

        new: ({ workoutId, exerciseId }: {
            workoutId: number;
            exerciseId: number;
          }) =>
            `/workouts/${workoutId}/exercises/${exerciseId}/sets/new`,
      },
    }
  },
  // workoutExercises: {
  //   sets: {
  //     list: (workoutExerciseId: Id) =>
  //       `/workout-exercises/${workoutExerciseId}/sets`,
  //
  //     new: (workoutExerciseId: Id) =>
  //       `/workout-exercises/${workoutExerciseId}/sets/new`,
  //   },
  // },
} as const;

