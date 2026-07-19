import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const workoutId = Number(params.workoutId);

  let query = locals.db!
    .selectFrom('workoutExercisesView')
    .select(['workoutId', 'exerciseId', 'exerciseName', 'exerciseType', 'numberOfSets', 'totalDistance'])
    .where('workoutId', '=', workoutId);

  const workoutExercises = await query.execute();
  
  return { workoutExercises, workoutId };
};
