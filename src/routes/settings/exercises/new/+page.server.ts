import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import type { Insertable } from 'kysely';
import type { Exercise } from '$lib/schema';
import { dbAttempt, failWith } from '$lib/server/db-utils';
import { routes } from '$lib/routes/index';

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
    
    const route = routes.settings.exercises.index();

    redirect(303, route); 
  },
};
