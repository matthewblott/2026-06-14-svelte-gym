import type { PageServerData, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { Selectable } from 'kysely';
import type { Workout as WorkoutTable } from '$lib/schema';

export type Workout = Selectable<WorkoutTable>

export const load = async ({ url }: { url: URL }): Promise<PageServerData> => {
  const q = url.searchParams.get('q');

  let query = db.selectFrom('workouts').selectAll().orderBy('createdAt', 'desc');

  if (q) {
    query = query.where('name', 'like', `%${q}%`);
  }

  const workouts: Workout[] = await query.execute();

  return { workouts };
};

export const actions: Actions = {
  search: async ({ request }) => {
    const formData = await request.formData();
    const q = formData.get('q') as string;
    redirect(303, q ? `/workouts?q=${encodeURIComponent(q)}` : '/workouts');
  },
};
