import type { Handle } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return new Response('Down for maintenance, back in a moment.', { status: 503 })
  }

  const { db, bunDb } = getDb();

  event.locals.db = db
  event.locals.bunDb = bunDb; 

  const response = await resolve(event);

  event.locals.bunDb?.close()

  return response;
};
