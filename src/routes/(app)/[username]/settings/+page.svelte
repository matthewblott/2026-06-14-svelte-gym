<script lang="ts">
  import { resolve } from '$app/paths';
  import PageHeader from '$lib/components/PageHeader.svelte';

  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';

  let { data }: { data: PageData } = $props();
  const routes = createTenantRoutes(data.user.name);

</script>

<PageHeader title="Settings">
  <div role="group">
    <a href={routes.workouts.index()} role="button">Workouts</a>
    <a href={routes.exercises.index()} role="button">Exercises</a>
  </div>
</PageHeader>
