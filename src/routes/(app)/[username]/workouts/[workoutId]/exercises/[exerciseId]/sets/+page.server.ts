import type { Selectable } from "kysely";
import type { PageServerData, PageServerLoad } from "./$types";
import type { SetsView } from "$lib/schema";
// import { redirect } from "@sveltejs/kit";
// import { createTenantRoutes } from "$lib/routes/tenant";

export type SelectableWorkout = Selectable<SetsView>

export const load : PageServerLoad = async ({ params, locals }): Promise<PageServerData> => {
  const workoutId = Number(params.workoutId);
  const exerciseId = Number(params.exerciseId);

  let query = locals.db!
    .selectFrom('setsView')
    .select([
      'workoutExerciseId',
      'exerciseName',
      'exerciseType',
      'durationOrWeight',
      'distanceOrReps',
    ])
    .where('workoutId', '=', workoutId)
    .where('exerciseId', '=', exerciseId)
    .orderBy('createdAt', 'desc');

  const sets = await query.execute();
  // const username = String(locals.user?.name);
  // const routes = createTenantRoutes(username);

  // Commenting this out because server side aren't read by Hotwire Native
  // and the page rules are ignored (in this case a modal should be displayed).
  // Will fix this but for now it's more graceful to just present the set index page.
  // If it's a new exercise then need to navigate to the new set page for that exercise type
  // if(sets.length === 0) {
  //   const route = routes.workouts.exercises.sets.new({ workoutId, exerciseId });    
  //   redirect(302, route);
  // }

  return { sets, workoutId, exerciseId };

};
