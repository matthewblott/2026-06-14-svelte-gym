import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { auth, tryCatch } from '$lib/server/auth';
import { createTenantRoutes } from '$lib/routes/tenant';  

export const actions: Actions = {
  default: async ({ request, params }) => {
    const form = await request.formData();
    const email = String(form.get('email')).trim();

    const result = await tryCatch(auth.api.sendVerificationOTP({
      body: {
        email: email,
        type: 'sign-in',
      },
      headers: request.headers
    }));

    if (!result.ok) {
      return fail(400, { error: result.error.message });
    }

    const routes = createTenantRoutes(params.username);
    const route = `${routes.account.verify()}?email=${encodeURIComponent(email)}`;

    // Redirect to verify page with email as query parameter
    redirect(303, route);
  },
};

