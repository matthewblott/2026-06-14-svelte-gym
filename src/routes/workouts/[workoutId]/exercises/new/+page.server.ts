import { redirect } from '@sveltejs/kit'; import { db } from '$lib/server/db';
import { dbAttempt, failWith } from '$lib/server/db-utils';
import type { Actions, PageServerData } from './$types';
import type { Insertable, Selectable } from 'kysely';
import type { WorkoutExercise, Exercise } from '$lib/schema';
import type { PageServerLoad } from '../$types';

export type ExerciseList = Selectable<Exercise>;

export const load : PageServerLoad = async ({ params }): Promise<PageServerData> => {
  const exercises: ExerciseList[] = await db
    .selectFrom('exercises')
    .selectAll()
    .execute();

  const workoutId = Number(params.workoutId);

  return { exercises, workoutId };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const formData = await request.formData();
    const exerciseName = formData.get('exerciseName') as string | null;
    const exerciseType = formData.get('exerciseType') as 'cardio' | 'weights' | null;
    const workoutId = Number(formData.get('workoutId'));
    let exerciseId = Number(formData.get('exerciseId'));

    // Create new exercise if no exerciseId was resolved on the client
    if (!exerciseId && exerciseName && exerciseType) {
      const result = await dbAttempt(
        db
          .insertInto('exercises')
          .values({ name: exerciseName, exerciseType })
          .returningAll()
          .executeTakeFirstOrThrow()
      );

      if (!result.success) return failWith({ workoutId }, result);
      exerciseId = result.data.id || 0;
    }

    const newWorkoutExercise: Insertable<WorkoutExercise> = { workoutId, exerciseId };

    const result = await dbAttempt(
      db
        .insertInto('workoutExercises')
        .values(newWorkoutExercise)
        .returningAll()
        .executeTakeFirstOrThrow()
    );

    if (!result.success) {
      return failWith({ workoutId, exerciseId }, result);
    } 

    redirect(303, `/workout-exercises`);
  },
};
