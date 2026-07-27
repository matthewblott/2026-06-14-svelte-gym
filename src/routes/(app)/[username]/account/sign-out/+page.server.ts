import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { publicRoutes } from '$lib/routes';

export const actions: Actions = {
  default: async ({ request }) => {
    await auth.api.signOut({
      headers: request.headers
    });
    
    const route = publicRoutes.auth.afterSignOut();

    redirect(303, route);
  },
};

