import type { PageServerData, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { Selectable } from 'kysely';
import type { Exercise as ExerciseTable } from '$lib/schema';

export type Exercise = Selectable<ExerciseTable>

export const load = async ({ url }: { url: URL }): Promise<PageServerData> => {
  const q = url.searchParams.get('q');
  const type = url.searchParams.get('type');

  let query = db.selectFrom('exercises').selectAll().orderBy('createdAt', 'desc');

  if (q) {
    query = query.where('name', 'like', `%${q}%`);
  }
  if (type && ['weight', 'cardio'].includes(type)) {
    query = query.where('exerciseType', '=', type);
  }

  const exercises: Exercise[] = await query.execute();

  return { exercises };
};

export const actions: Actions = {
  search: async ({ request }) => {
    const formData = await request.formData();
    const q = formData.get('q') as string;
    const type = formData.get('type') as string;
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (type) params.set('type', type);
    redirect(303, params.toString() ? `/exercises?${params.toString()}` : '/exercises');
  },
};
