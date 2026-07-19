import { redirect } from '@sveltejs/kit';
import { dbAttempt, failWith } from '$lib/server/db-utils';
import { routes } from '$lib/routes/index';
import type { PageServerData, Actions } from './$types';
import type { Selectable } from 'kysely';
import type { Insertable } from 'kysely';
import type { Workout } from '$lib/schema';
export type SelectableWorkout = Selectable<Workout>

export const load = async ({ locals, url }: { locals: App.Locals; url: URL }): Promise<PageServerData> => {
  const q = url.searchParams.get('q');

  let query = locals.db!.selectFrom('workouts').selectAll().orderBy('createdAt', 'desc');

  if (q) {
    query = query.where('name', 'like', `%${q}%`);
  }

  const workouts: SelectableWorkout[] = await query.execute();

  return { workouts };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    const locale = form.get('locale') as string;
    const date = new Date();
    const formatter = new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeStyle: 'short' });
    const name = formatter.format(date);
    const newWorkout: Insertable<Workout> = { name };

    const result = await dbAttempt(
      locals.db!.insertInto('workouts').values(newWorkout).returningAll().executeTakeFirstOrThrow()
    );

    if (!result.success) {
      return failWith({ name }, result);
    }

    const workoutId = Number(result.data.id);
    const route = routes.workouts.exercises.new(workoutId); 

    redirect(303, route); 
  },
};
