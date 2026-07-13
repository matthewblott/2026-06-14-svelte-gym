<script lang="ts">
  import { publicRoutes as routes } from "$lib/routes";
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { createTenantRoutes } from "$lib/routes/tenant";
  import { authClient } from '$lib/auth-client';
  import { goto } from "$app/navigation";

  async function signIn() {
    const { data, error } = await authClient.signIn.anonymous();

    if(!error) {
      const routes = createTenantRoutes(data.user.name);
      const route = routes.workouts.index();
      goto(route);
    }
  }
</script>

<PageHeader title="App">
  <div role="group">
    <a href={routes.auth.signIn()} role="button">Sign-in</a>
    <button onclick={signIn}>Continue as guest</button>
  </div>
</PageHeader>
