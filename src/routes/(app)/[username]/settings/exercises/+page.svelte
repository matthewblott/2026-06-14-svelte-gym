{#snippet header()}
  <div role="group">
    <a href={routes.settings.index()} role="button">Settings</a>
    <a href={routes.settings.exercises.new()} role="button">New</a>
  </div>
{/snippet}

<script lang="ts">
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
  import { getPageHeader } from '$lib/components/page-header.svelte';
  const pageHeader = getPageHeader();
  pageHeader.title = 'Exercises';
  pageHeader.content = header;
</script>

{#if data.exercises.length}
  {#each data.exercises as exercise}
    <article>
      <a href={routes.settings.exercises.edit(exercise.id)}>{exercise.name} ({exercise.exerciseType})</a>
    </article>
  {/each}
{:else}
  <p>No exercises yet.</p>
{/if}
