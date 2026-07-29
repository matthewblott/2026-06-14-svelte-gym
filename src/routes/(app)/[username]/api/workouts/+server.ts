import { json } from '@sveltejs/kit';
import type { Selectable } from 'kysely';
import type { Workout } from '$lib/schema';
export type SelectableWorkout = Selectable<Workout>

const PAGE_SIZE = 5;

export async function GET({ locals, url }: { locals: App.Locals; url: URL }) {
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

	return json({ workouts: items, nextCursor });
}

