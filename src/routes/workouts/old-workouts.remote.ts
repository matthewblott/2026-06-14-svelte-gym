import { form, query } from '$app/server';
import { redirect } from '@sveltejs/kit';
import * as v from 'valibot';
import { type Workout } from '$lib/schema'
import { type Insertable } from 'kysely';
import { db } from '$lib/server/db'

export const getWorkouts = query(async () => {
  return await db.selectFrom('workouts').selectAll().execute();
});

export const getWorkoutById = query(v.number(), async (id) => {
  const workout = await db
    .selectFrom('workouts')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
  return workout;
});

export const createWorkout = form(v.object({
  name: v.string()
}), 
async ({ name }) => {
  const workout: Insertable<Workout> = {
    name 
  };
  const newId = await db
    .insertInto('workouts')
    .values(workout)
    .returningAll()
    .executeTakeFirst()
    .then((newTodo) => newTodo?.id!);

  redirect(303, `/workouts/${newId}`); 
});
