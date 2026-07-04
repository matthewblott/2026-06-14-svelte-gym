import type { PageServerData, PageServerLoad } from "./$types";
import { db } from "$lib/server/db";

export const load : PageServerLoad = async ({ params }): Promise<PageServerData> => {
  const workoutId = Number(params.workoutId);

  let query = db
    .selectFrom('workoutExercises')
    .innerJoin('exercises', 'exercises.id', 'workoutExercises.exerciseId')
    .select(['workoutId', 'exerciseId', 'name'])
    .where('workoutId', '=', workoutId);

  const workoutExercises = await query.execute();
  
  console.log(workoutExercises);
  return { workoutExercises, workoutId };

};
