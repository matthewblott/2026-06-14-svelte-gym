import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { Insertable } from 'kysely';
import type { Exercise } from '$lib/schema';
import { dbAttempt, failWith } from '$lib/server/db-utils';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const exerciseType = formData.get('exerciseType') as string;
    const newExercise: Insertable<Exercise> = { name, exerciseType };

    const result = await dbAttempt(
      db.insertInto('exercises').values(newExercise).returningAll().executeTakeFirstOrThrow()
    );

    if (!result.success) {
      return failWith({ name, exerciseType }, result);
    }
    redirect(303, `/exercises`);
  },
};
