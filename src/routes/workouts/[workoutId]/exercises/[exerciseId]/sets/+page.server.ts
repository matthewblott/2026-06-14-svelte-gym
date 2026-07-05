import type { Selectable } from "kysely";
import type { PageServerData, PageServerLoad } from "./$types";
import type { SetsView } from "$lib/schema";
import { db } from "$lib/server/db";
import { routes } from "$lib/routes";
import { redirect } from "@sveltejs/kit";

export type SelectableWorkout = Selectable<SetsView>

export const load : PageServerLoad = async ({ params }): Promise<PageServerData> => {
  const workoutId = Number(params.workoutId);
  const exerciseId = Number(params.exerciseId);

  let query = db
    .selectFrom('setsView')
    .select([
      'workoutExerciseId',
      'exerciseName',
      'exerciseType',
      'durationOrWeight',
      'distanceOrReps',
    ])
    .where('workoutId', '=', workoutId)
    .where('exerciseId', '=', exerciseId);

  const sets = await query.execute();

  // If it's a new exercise then need to navigate to the new set page for that exercise type
  if(sets.length === 0) {
    const route = routes.workouts.exercises.sets.new({ workoutId, exerciseId });    
    redirect(302, route);
  }

  return { sets, workoutId, exerciseId };

};

