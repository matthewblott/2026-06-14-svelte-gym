import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import type { Insertable } from 'kysely';
import type { Exercise } from '$lib/schema';
import { dbAttempt, failWith } from '$lib/server/db-utils';
import { createTenantRoutes } from '$lib/routes/tenant';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const exerciseType = formData.get('exerciseType') as "cardio" | "weights";
    const newExercise: Insertable<Exercise> = { name, exerciseType };

    const result = await dbAttempt(
      locals.db!.insertInto('exercises').values(newExercise).returningAll().executeTakeFirstOrThrow()
    );

    if (!result.success) {
      return failWith(newExercise, result);
    }
    
    const username = String(locals.user?.name);
    const routes = createTenantRoutes(username);
    const route = routes.settings.exercises.index();

    redirect(303, route); 
  },
};
