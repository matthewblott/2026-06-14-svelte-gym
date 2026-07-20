import { createTenantRoutes } from "$lib/routes/tenant";
import { auth, tryCatch } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from './$types'; 

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user

  if (user) {
    const username = user.name;
    const routes = createTenantRoutes(username);
    const route = routes.home();
    redirect(302, route);
  }
};

export const actions: Actions = {
  default: async ({ request }) => {
    const result = await tryCatch(auth.api.signInAnonymous({ headers: request.headers }));

    if (!result.ok) {
      return fail(400, { error: result.error.message });
    }

    const routes = createTenantRoutes(result.value.user?.name);

    redirect(303, routes.home());
  },
};
