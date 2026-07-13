import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { getTenantDb } from '$lib/server/tenant-db';

export const handle: Handle = async ({ event, resolve }) => {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return new Response('Down for maintenance, back in a moment.', { status: 503 })
  }

  const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
  }

  if (session?.user) {
    const userId = Number(session.user.id);
    const { db, bunDb } = getTenantDb(userId);
    event.locals.db = db
    event.locals.bunDb = bunDb; 
  }

  const response = await svelteKitHandler({ event, resolve, auth, building });

  event.locals.bunDb?.close()

  return response;
};
