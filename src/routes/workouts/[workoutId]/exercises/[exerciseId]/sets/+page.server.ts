import type { Selectable } from "kysely";
import type { PageServerData, PageServerLoad } from "./$types";
import type { WorkoutsView } from "$lib/schema";
import { db } from "$lib/server/db";

export type SelectableWorkout = Selectable<WorkoutsView>

export const load : PageServerLoad = async ({ params }): Promise<PageServerData> => {
  const workoutId = Number(params.workoutId);
  const exerciseId = Number(params.exerciseId);

  // If it's a new exercise then need to navigate to the new set page for that exercise type

  let query = db
    .selectFrom('workoutExercises')
    .innerJoin('exercises', 'exercises.id', 'workoutExercises.exerciseId')
    .leftJoin('cardioSets', 'cardioSets.workoutExerciseId', 'workoutExercises.id') 
    .leftJoin('weightSets', 'weightSets.workoutExerciseId', 'workoutExercises.id') 
    .select([
      'cardioSets.workoutExerciseId',
      'name',
      'exerciseType',
      'duration',
      'distance',
      'weight',
      'reps'
    ])
    .where('workoutId', '=', workoutId)
    .where('exerciseId', '=', exerciseId);

  const exerciseSets = await query.execute();

  return { exerciseSets, workoutId, exerciseId };

};

