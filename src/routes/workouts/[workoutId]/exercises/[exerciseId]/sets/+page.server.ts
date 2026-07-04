import type { Selectable } from "kysely";
import type { PageServerData, PageServerLoad } from "./$types";
import type { WorkoutsView } from "$lib/schema";
import { db } from "$lib/server/db";

export type SelectableWorkout = Selectable<WorkoutsView>

export const load : PageServerLoad = async ({ params }): Promise<PageServerData> => {
  // let query = db.selectFrom('workoutExercisesView').selectAll();

  // const workoutExercises: SelectableWorkout[] = await query.execute();
  const workoutId = Number(params.workoutId);
  const exerciseId = Number(params.exerciseId);

  return { workoutId, exerciseId };

};

