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
      signOut: () => 
        `/${username}/account/sign-out`,
    },

    todos: {
      index: () => 
        `/${username}/todos`,
      new: () => 
        `/${username}/todos/new`,
      edit: (id: Id) => 
        `/${username}/todos/${id}`,
    },
    workouts: {
      list: () =>
        `/${username}/workouts/`,
      
      // routes.workouts.exercises
      exercises: {
        list: (workoutId: Id) =>
          `/${username}/workouts/${workoutId}/exercises`,

        new: (workoutId: Id) =>
          `/${username}/workouts/${workoutId}/exercises/new`,

        sets: {
          list: ({ workoutId, exerciseId }: {
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
