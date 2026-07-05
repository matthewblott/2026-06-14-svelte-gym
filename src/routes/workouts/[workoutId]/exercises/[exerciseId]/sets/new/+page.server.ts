import type { PageServerData, PageServerLoad } from "./$types";
import type { CardioSet, WeightSet } from "$lib/schema";
import { db } from "$lib/server/db";
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import type { Insertable } from 'kysely';
import { dbAttempt, failWith } from '$lib/server/db-utils';
import { routes } from "$lib/routes";

export const load : PageServerLoad = async ({ params }): Promise<PageServerData> => {
  const workoutId = Number(params.workoutId);
  const exerciseId = Number(params.exerciseId);

  let query = db
    .selectFrom('workoutExercises')
    .innerJoin('exercises', 'exercises.id', 'workoutExercises.exerciseId')
    .select([
      'workoutExercises.id',
      'workoutId',
      'exerciseId',
      'name',
      'exerciseType',
    ])
    .where('workoutId', '=', workoutId)
    .where('exerciseId', '=', exerciseId);

  const workoutView = await query.executeTakeFirstOrThrow();

  const numberOfSets = await db
    .selectFrom('setsView')
    .select(eb => eb.fn.countAll().as('count'))
    .where('workoutId', '=', workoutId)
    .where('exerciseId', '=', exerciseId)
    .executeTakeFirstOrThrow();

  const isFirstSet = Number(numberOfSets.count) === 0;

  // Need to check if this request is the first set, if so then the Sets link needs to change to an Exercises link
  // otherwise there will be a redirect back to this page when it is clicked.

  return { workoutView, isFirstSet };

};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const exerciseType = formData.get('exerciseType') as "cardio" | "weights";
    const workoutId = Number(formData.get('workoutId') as string);
    const exerciseId = Number(formData.get('exerciseId') as string);
    const workoutExerciseId = Number(formData.get('workoutExerciseId') as string);
    const isWeights = exerciseType === "weights";

    if(isWeights) {
      const weight = Number(formData.get('weight') as string);
      const reps = Number(formData.get('reps') as string);
      const newWeightSet: Insertable<WeightSet> = { workoutExerciseId, weight, reps };

      const result = await dbAttempt(
        db.insertInto('weightSets').values(newWeightSet).returningAll().executeTakeFirstOrThrow()
      );

      if (!result.success) {
        return failWith(newWeightSet, result);
      }

      const route = routes.workouts.exercises.sets.list({ workoutId, exerciseId });

      redirect(303, route);
    }
    else {
      const distance = Number(formData.get('distance') as string);
      // const duration = Number(formData.get('duration') as string);
      const duration = formData.get('duration') as string;
      const newCardioSet: Insertable<CardioSet> = { workoutExerciseId, distance, duration };

      const result = await dbAttempt(
        db.insertInto('cardioSets').values(newCardioSet).returningAll().executeTakeFirstOrThrow()
      );

      if (!result.success) {
        return failWith(newCardioSet, result);
      }

      const route = routes.workouts.exercises.sets.list({ workoutId, exerciseId });

      redirect(303, route);

    }

  },
};
