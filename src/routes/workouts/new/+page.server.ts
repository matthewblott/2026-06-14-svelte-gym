import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { Insertable } from 'kysely';
import type { Workout } from '$lib/schema';

interface SqliteError extends Error {
  code?: string;
}

function describeSqliteError(err: SqliteError): { message: string; field?: string } {
  const msg = err.message ?? '';

  // "NOT NULL constraint failed: exercises.name" -> field = "name"
  const columnMatch = msg.match(/constraint failed:\s*\w+\.(\w+)/i);
  const field = columnMatch?.[1];

  if (err.code === 'SQLITE_CONSTRAINT_NOTNULL') {
    return { message: field ? `${field} is required.` : 'A required field is missing.', field };
  }
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return { message: field ? `That ${field} is already taken.` : 'That value already exists.', field };
  }
  if (err.code === 'SQLITE_CONSTRAINT_CHECK') {
    return { message: 'One of the values provided is not allowed.', field };
  }
  if (err.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
    return { message: 'This refers to something that does not exist.', field };
  }

  return { message: 'Something went wrong saving this exercise.' };
}

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    // const exerciseType = formData.get('exerciseType') as string;

    // id and createdAt are Generated on WorkoutTable, so Insertable<WorkoutTable>
    // makes them optional here — only `name` is required to satisfy the type
    // const newWorkout: Insertable<Workout> = { name, exerciseType };
    const newWorkout: Insertable<Workout> = { name };

    let workout;
    try {
      workout = await db
        .insertInto('exercises')
        .values(newWorkout)
        .returningAll()
        .executeTakeFirstOrThrow();
    } catch (err) {
      console.error(err); // keep the full error server-side for debugging
      const { message, field } = describeSqliteError(err as SqliteError);
      return fail(400, { name, error: true, message, field });
    }

    redirect(303, `/workouts/${workout.id}`);
  },
};
function fail(arg0: number, arg1: { name: string; error: boolean; message: string; field: string | undefined; }): void | Record<string, any> | PromiseLike<void | Record<string, any>> {
    throw new Error('Function not implemented.');
}
