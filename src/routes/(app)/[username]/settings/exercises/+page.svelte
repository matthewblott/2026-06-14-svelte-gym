<script lang="ts">
  import { createTenantRoutes } from '$lib/routes/tenant';
  import { getContext, type Snippet } from 'svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);
</script>

{#snippet header()}
  <h1>Exercises</h1>
  <div role="group">
    <a href={routes.settings.index()} role="button">Settings</a>
    <a href={routes.settings.exercises.new()} role="button">New</a>
  </div>
{/snippet}

{#if data.exercises.length}
  {#each data.exercises as exercise}
    <article>
      <a href={routes.settings.exercises.edit(exercise.id)}>{exercise.name} ({exercise.exerciseType})</a>
    </article>
  {/each}
{:else}
  <p>No exercises yet.</p>
{/if}
