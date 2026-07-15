{#snippet header()}
  <div role="group">
    <a href={routes.home()} role="button">Home</a>
    <a href={routes.settings.exercises.index()} role="button">Exercises</a>
  </div>
{/snippet}

<script lang="ts">
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
  import { getPageHeader } from '$lib/components/page-header.svelte';
  const pageHeader = getPageHeader();
  pageHeader.title = 'Settings';
  pageHeader.content = header;
</script>
