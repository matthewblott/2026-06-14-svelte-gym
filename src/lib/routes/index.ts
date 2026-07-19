type Id = number;

export const routes = {
    home: () =>
      `/`,
    settings: {
      index: () =>
      `/settings`,
      exercises: {
        index: () =>
          `/settings/exercises/`,
        new: () =>
          `/settings/exercises/new`,
        edit: (id: Id) =>
          `/settings/exercises/${id}`,
      }
    },
    workouts: {
      index: () =>
        `/workouts/`,
      exercises: {
        index: (workoutId: Id) =>
          `/workouts/${workoutId}/exercises`,

        new: (workoutId: Id) =>
          `/workouts/${workoutId}/exercises/new`,

        sets: {
          index: ({ workoutId, exerciseId }: {
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
  } as const;
