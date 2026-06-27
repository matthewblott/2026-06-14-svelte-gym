import type { PageServerData, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { Updateable } from 'kysely';
import type { Exercise } from '$lib/schema';

export const load = async ({ params }): Promise<PageServerData> => {
  const id = parseInt(params.id);
  const exercise = await db.selectFrom('exercises').selectAll().where('id', '=', id).executeTakeFirst();

  if (!exercise) {
    error(404, 'Exercise not found');
  }

  return { exercise };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const id = parseInt(params.id);
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const exerciseType = formData.get('exerciseType') as string;

    // Updateable<Exercise> makes every column optional — including
    // non-Generated ones like `name` — since a PATCH-style update only
    // needs to touch the fields actually being changed
    const exerciseUpdate: Updateable<Exercise> = { name, exerciseType };

    await db.updateTable('exercises').set(exerciseUpdate).where('id', '=', id).execute();
    redirect(303, `/exercises/${id}`);
  },
};
