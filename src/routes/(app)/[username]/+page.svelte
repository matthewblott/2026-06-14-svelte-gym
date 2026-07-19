<script lang="ts">
  import { createTenantRoutes } from "$lib/routes/tenant";
  import type { PageData } from "./$types";
  import { getContext, type Snippet } from 'svelte';

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));

</script>

{#snippet header()}
  <h1>Gym App</h1>
  <div role="group">
    <a href={routes.settings.index()} role="button">Settings</a>
    <a href={routes.account.index()} role="button">Account</a>
  </div>
{/snippet}

<p>
  Proceed to your workouts.
</p>
<a href="{routes.workouts.index()}" role="button" class="outline">Workouts</a>
