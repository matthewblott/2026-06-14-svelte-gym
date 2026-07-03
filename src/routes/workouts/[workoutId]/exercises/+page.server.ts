import type { Selectable } from "kysely";
import type { PageServerData, PageServerLoad } from "./$types";
import type { Workout } from "$lib/schema";

export type SelectableWorkout = Selectable<Workout>

export const load : PageServerLoad = async ({ params }): Promise<PageServerData> => {
  // let query = db.selectFrom('workouts').selectAll().orderBy('createdAt', 'desc');
  // const workouts: SelectableWorkout[] = await query.execute();
  // return { workouts };

  const workoutId = Number(params.workoutId);
  return { workoutId };

};
