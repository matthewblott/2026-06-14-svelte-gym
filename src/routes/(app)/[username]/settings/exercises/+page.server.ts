import type { PageServerData, Actions } from './$types';
import type { Selectable } from 'kysely';
import type { Exercise as ExerciseTable } from '$lib/schema';

export type Exercise = Selectable<ExerciseTable>

export const load = async ({ locals }: { locals: App.Locals }): Promise<PageServerData> => {
  let query = locals.db!.selectFrom('exercises').selectAll().orderBy('createdAt', 'desc');

  const exercises: Exercise[] = await query.execute();

  return { exercises };
};

export const actions: Actions = { };
