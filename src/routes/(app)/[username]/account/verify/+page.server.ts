import { fail, redirect } from '@sveltejs/kit';
import { createTenantRoutes } from '$lib/routes/tenant';
import { auth, tryCatch } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const email = String(form.get('email')).trim();
    const otp = String(form.get('otp')).trim();

    const result = await tryCatch(auth.api.signInEmailOTP({
      body: { email, otp },
      headers: request.headers
    }));

    if (!result.ok) {
      return fail(400, { error: result.error.message });
    }

    const username = result.value.user.name;
    const routes = createTenantRoutes(username);
    const route = String(routes.home());

    redirect(303, route);
  },
};

