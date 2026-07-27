import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { publicRoutes } from '$lib/routes';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    await auth.api.signOut({
      headers: request.headers
    });
    const route = publicRoutes.home();
    redirect(303, route);
  },
};

