import type { PageServerData, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }: { params: Parameters; locals: Locals }): Promise<PageServerData> => {
  const workoutId = Number(params.workoutId);

  let query = locals.db
    .selectFrom('workoutExercises')
    .innerJoin('exercises', 'exercises.id', 'workoutExercises.exerciseId')
    .select(['workoutId', 'exerciseId', 'name'])
    .where('workoutId', '=', workoutId);

  const workoutExercises = await query.execute();
  
  console.log(workoutExercises);
  return { workoutExercises, workoutId };

};
