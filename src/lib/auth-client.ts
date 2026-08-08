import { createAuthClient } from 'better-auth/svelte';
import { anonymousClient, emailOTPClient } from 'better-auth/client/plugins';
import { PUBLIC_BASE_URL} from '$env/static/public';

export const authClient = createAuthClient({
  plugins: [anonymousClient(), emailOTPClient()],
  // Only pin an absolute URL for server-side calls (no window there).
  // In the browser, leave it unset so requests go to whatever origin
  // actually served the page (10.0.2.2, localhost, LAN IP, etc.)
  baseURL: typeof window === "undefined" ? PUBLIC_BASE_URL : undefined,
});
