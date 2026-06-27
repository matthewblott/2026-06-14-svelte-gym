import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { Insertable } from 'kysely';
import type { Workout } from '$lib/schema';

export const actions: Actions = {

  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;

    if (!name) {
      return { error: true, name };
    }

    // id and createdAt are Generated on WorkoutTable, so Insertable<WorkoutTable>
    // makes them optional here — only `name` is required to satisfy the type
    const newWorkout: Insertable<Workout> = { name };

    await db.insertInto('workouts').values(newWorkout).executeTakeFirst();

    redirect(303, '/workouts');
  },

};
