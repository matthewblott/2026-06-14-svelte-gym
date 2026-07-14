<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<PageHeader title="Exercises">
  <div role="group">
    <a href={routes.settings.index()} role="button">Settings</a>
    <a href={routes.settings.exercises.new()} role="button">New</a>
  </div>
</PageHeader>

{#if data.exercises.length}
  {#each data.exercises as exercise}
    <article>
      <a href={routes.settings.exercises.edit(exercise.id)}>{exercise.name} ({exercise.exerciseType})</a>
    </article>
  {/each}
{:else}
  <p>No exercises yet.</p>
{/if}
