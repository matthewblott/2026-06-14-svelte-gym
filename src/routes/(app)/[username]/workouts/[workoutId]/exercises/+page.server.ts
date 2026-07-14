import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const workoutId = Number(params.workoutId);

  let query = locals.db!
    .selectFrom('workoutExercises')
    .innerJoin('exercises', 'exercises.id', 'workoutExercises.exerciseId')
    .select(['workoutId', 'exerciseId', 'name'])
    .where('workoutId', '=', workoutId);

  const workoutExercises = await query.execute();
  
  return { workoutExercises, workoutId };
};
