<script lang="ts">
  import { publicRoutes as routes } from "$lib/routes";
  import { createTenantRoutes } from "$lib/routes/tenant";
  import { authClient } from '$lib/auth-client';
  import { goto } from "$app/navigation";
  import { getContext, type Snippet } from 'svelte';
  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

  async function signIn() {
    const { data, error } = await authClient.signIn.anonymous();
    if(!error) {
      const routes = createTenantRoutes(data.user.name);
      const route = routes.home();
      goto(route);
    }
  }

</script>

{#snippet header()}
  <h1>Gym App</h1>
  <div role="group">
    <a href={routes.auth.signIn()} role="button">Sign-in</a>
    <button onclick={signIn}>Continue as guest</button>
  </div>
{/snippet}

