type Id = number;

export function createTenantRoutes(username: string) {
  return {
    account: {
      index: () =>
        `/${username}/account`,
      delete: () => 
        `/${username}/account/delete`,
      rename: () => 
        `/${username}/account/rename`,
      register: () => 
        `/${username}/account/register`,
      verify: () => 
        `/${username}/account/verify`,
      signOut: () => 
        `/${username}/account/sign-out`,
    },
    settings: {
      index: () =>
      `/${username}/settings`,
      exercises: {
        index: () =>
          `/${username}/settings/exercises`,
        new: () =>
          `/${username}/settings/exercises/new`,
        edit: (id: Id) =>
          `/${username}/settings/exercises/${id}`,
      }
    },
    workouts: {
      index: () =>
        `/${username}/workouts/`,
      exercises: {
        index: (workoutId: Id) =>
          `/${username}/workouts/${workoutId}/exercises`,

        new: (workoutId: Id) =>
          `/${username}/workouts/${workoutId}/exercises/new`,

        sets: {
          index: ({ workoutId, exerciseId }: {
              workoutId: number;
              exerciseId: number;
            }) =>
              `/${username}/workouts/${workoutId}/exercises/${exerciseId}/sets`,

          new: ({ workoutId, exerciseId }: {
              workoutId: number;
              exerciseId: number;
            }) =>
              `/${username}/workouts/${workoutId}/exercises/${exerciseId}/sets/new`,
        },
      }
    },

  } as const;
}
