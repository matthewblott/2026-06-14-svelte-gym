import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { Insertable } from 'kysely';
import type { Workout } from '$lib/schema';
import { dbAttempt, failWith } from '$lib/server/db-utils';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const newWorkout: Insertable<Workout> = { name };

    const result = await dbAttempt(
      db.insertInto('workouts').values(newWorkout).returningAll().executeTakeFirstOrThrow()
    );

    if (!result.success) {
      return failWith({ name }, result);
    }

    redirect(303, `/workouts/${result.data.id}`);
  },
};
