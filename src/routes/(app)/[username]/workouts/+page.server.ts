import { redirect } from '@sveltejs/kit';
import { dbAttempt, failWith } from '$lib/server/db-utils';
import { createTenantRoutes } from '$lib/routes/tenant';
import type { PageServerData, Actions } from './$types';
import type { Selectable } from 'kysely';
import type { Insertable } from 'kysely';
import type { Workout } from '$lib/schema';
export type SelectableWorkout = Selectable<Workout>

const PAGE_SIZE = 5;

export const load = async ({ locals, url }: { locals: App.Locals; url: URL }): Promise<PageServerData> => {
  // let query = locals.db!.selectFrom('workouts').selectAll().orderBy('createdAt', 'desc');
  // const workouts: SelectableWorkout[] = await query.execute();

	const cursor = url.searchParams.get('cursor'); // last item's id/createdAt

	let query = locals.db!
		.selectFrom('workouts')
		.selectAll()
		.orderBy('createdAt', 'desc')
		.orderBy('id', 'desc') // tiebreaker for stable ordering
		.limit(PAGE_SIZE + 1); // fetch one extra to know if there's more

	if (cursor) {
		const [createdAt, id] = cursor.split('_');
		query = query.where((eb) =>
			eb.or([
				eb('createdAt', '<', createdAt),
				eb.and([eb('createdAt', '=', createdAt), eb('id', '<', Number(id))])
			])
		);
	}

	const rows: SelectableWorkout[] = await query.execute();
	const hasMore = rows.length > PAGE_SIZE;
	const items = hasMore ? rows.slice(0, PAGE_SIZE) : rows;
	const nextCursor = hasMore
		? `${items[items.length - 1].createdAt}_${items[items.length - 1].id}`
		: null;

	return { workouts: items, nextCursor };

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
    const username = String(locals.user?.name);
    const routes = createTenantRoutes(username);
    const route = routes.workouts.exercises.new(workoutId); 

    redirect(303, route); 
  },
};
