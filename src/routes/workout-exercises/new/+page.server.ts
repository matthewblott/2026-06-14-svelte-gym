import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { Insertable } from 'kysely';
import type { Exercise } from '$lib/schema';
import { dbAttempt, failWith } from '$lib/server/db-utils';

// export const load: PageServerLoad = async ({ params }) => {
//   const id = parseInt(params.id);
//   const exercise = await db.selectFrom('exercises').selectAll().where('id', '=', id).executeTakeFirst();
//
//   if (!exercise) {
//     error(404, 'Exercise not found');
//   }
//
//   return { exercise };
//
// };

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const exerciseType = formData.get('exerciseType') as string;
    const newExercise: Insertable<Exercise> = { name, exerciseType };

    const result = await dbAttempt(
      db.insertInto('workout_exercises').values(newExercise).returningAll().executeTakeFirstOrThrow()
    );

    if (!result.success) {
      return failWith({ name }, result);
    }
    redirect(303, `/workout-exercises/${result.data.id}`);
  },
};

