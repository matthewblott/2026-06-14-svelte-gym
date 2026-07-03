import type { Selectable } from "kysely";
import type { PageServerData, PageServerLoad } from "./$types";
import type { WorkoutExercisesView } from "$lib/schema";
import { db } from "$lib/server/db";

export type SelectableWorkout = Selectable<WorkoutExercisesView>

export const load : PageServerLoad = async ({ params }): Promise<PageServerData> => {
  const workoutId = Number(params.workoutId);
  const exerciseId = Number(params.exerciseId);

  let query = db
    .selectFrom('workoutExercisesView')
    .where('workoutId', '=', workoutId)
    .where('exerciseId', '=', exerciseId)
    .selectAll();

  const exercise: SelectableWorkout = await query.executeTakeFirstOrThrow();

  // Need to get the sets ... 

  return { exercise, workoutId, exerciseId };

};


