import type { Selectable } from "kysely";
import type { PageServerData, PageServerLoad } from "./$types";
import type { WorkoutsView } from "$lib/schema";
import { db } from "$lib/server/db";

export type SelectableWorkout = Selectable<WorkoutsView>

export const load : PageServerLoad = async ({ params }): Promise<PageServerData> => {
  const workoutId = Number(params.workoutId);

  let query = db
    .selectFrom('workoutsView')
    .where('workoutId', '=', workoutId)
    .selectAll();

  const workoutExercises: SelectableWorkout[] = await query.execute();

  return { workoutExercises, workoutId };

};
