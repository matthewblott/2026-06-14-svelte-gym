<script lang="ts">
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import { getContext, type Snippet } from 'svelte';

  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);
</script>

{#snippet header()}
  <h1>Settings</h1>
  <div role="group">
    <a href={routes.home()} role="button">Home</a>
    <a href={routes.settings.exercises.index()} role="button">Exercises</a>
  </div>
{/snippet}
