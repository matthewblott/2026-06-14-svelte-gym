import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { getTenantDb } from '$lib/server/tenant-db';

export const handle: Handle = async ({ event, resolve }) => {
  console.log(event.url.pathname);

  if (process.env.MAINTENANCE_MODE === 'true') {
    return new Response('Down for maintenance, back in a moment.', { status: 503 })
  }

  const userAgent = event.request.headers.get('user-agent') ?? '';
  const isHotwireNative =
    userAgent.includes('Turbo Native') ||
    userAgent.includes('Hotwire Native');

  event.locals.isHotwireNative = isHotwireNative; 

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

  const resolveWithHotwireClass: typeof resolve = (event, opts) =>
    resolve(event, {
      ...opts,
      transformPageChunk: ({ html, done }) => {
        const transformed = isHotwireNative
          ? html.replace('<body', '<body class="hotwire-native"')
          : html;
        return opts?.transformPageChunk
          ? opts.transformPageChunk({ html: transformed, done })
          : transformed;
      }
    });

  // console.log('DEBUG building=', building, 'pathname=', event.url.pathname);

  // const response = await svelteKitHandler({ event, resolve: resolveWithHotwireClass, auth, building });
  // let response;
  // try {
  //   response = await svelteKitHandler({ event, resolve: resolveWithHotwireClass, auth, building });
  // } catch (err) {
  //   console.error('AUTH HANDLER ERROR:', err);
  //   throw err;
  // }
  const response = await svelteKitHandler({ event, resolve: resolveWithHotwireClass, auth, building: false });

  event.locals.bunDb?.close()

  return response;
};
