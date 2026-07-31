import { createAuthClient } from 'better-auth/svelte';
import { anonymousClient, emailOTPClient } from 'better-auth/client/plugins';
// import { env } from '$env/dynamic/private';

export const authClient = createAuthClient({
  plugins: [anonymousClient(), emailOTPClient()],
  baseURL: `http://localhost:3000`
});
