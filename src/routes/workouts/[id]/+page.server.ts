import type { PageServerData, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { Updateable } from 'kysely';
import type { Workout } from '$lib/schema';

export const load = async ({ params }): Promise<PageServerData> => {
  const id = parseInt(params.id);
  const workout = await db.selectFrom('workouts').selectAll().where('id', '=', id).executeTakeFirst();

  if (!workout) {
    error(404, 'Workout not found');
  }

  return { workout };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const id = parseInt(params.id);
    const formData = await request.formData();
    const name = formData.get('name') as string;

    if (!name) {
      return { name, error: true };
    }

    // Updateable<Workout> makes every column optional — including
    // non-Generated ones like `name` — since a PATCH-style update only
    // needs to touch the fields actually being changed
    const workoutUpdate: Updateable<Workout> = { name };

    await db.updateTable('workouts').set(workoutUpdate).where('id', '=', id).execute();
    redirect(303, `/workouts/${id}`);
  },
};
