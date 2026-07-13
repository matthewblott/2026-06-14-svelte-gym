import type { PageServerData, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { Selectable } from 'kysely';
import type { Insertable } from 'kysely';
import type { Workout } from '$lib/schema';
import { dbAttempt, failWith } from '$lib/server/db-utils';
import { getTenantDb } from '$lib/server/tenant-db';

export type SelectableWorkout = Selectable<Workout>

// export const load: PageServerLoad = async ({ locals }) => {

export const load: PageServerLoad = async ({ locals, url }: { locals: Locals; url: URL }): Promise<PageServerData> => {
  const q = url.searchParams.get('q');
  // const db = locals.db;
  
  const userId = Number(locals.user.id);

  const db = getTenantDb(userId);

  let query = db.selectFrom('workouts').selectAll().orderBy('createdAt', 'desc');

  if (q) {
    query = query.where('name', 'like', `%${q}%`);
  }

  const workouts: SelectableWorkout[] = await query.execute();

  return { workouts };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const locale = form.get('locale') as string;
    const date = new Date();
    const formatter = new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeStyle: 'short' });
    const name = formatter.format(date);
    const newWorkout: Insertable<Workout> = { name };

    const result = await dbAttempt(
      db.insertInto('workouts').values(newWorkout).returningAll().executeTakeFirstOrThrow()
    );

    if (!result.success) {
      return failWith({ name }, result);
    }

    const workoutId = result.data.id;
    const route = `/workouts/${workoutId}/exercises/new`;

    redirect(303, route); 
  },
};
