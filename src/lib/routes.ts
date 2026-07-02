type Id = number;

export const routes = {
  workouts: {
    list: () =>
      `/workouts/`,
    // detail: (workoutId: Id) =>
    //   `/workouts/${workoutId}`,
    
    // routes.workouts.exercises
    exercises: {
      list: (workoutId: Id) =>
        `/workouts/${workoutId}/exercises`,

      // detail({ workoutId: 1, exerciseId: 99 })
      detail: ({ workoutId, exerciseId }: {
        workoutId: number;
        exerciseId: number;
      }) =>
        `/workouts/${workoutId}/exercises/${exerciseId}`,

      // new(...)
      new: (workoutId: Id) =>
        `/workouts/${workoutId}/exercises/new`
    }
  }
} as const;

