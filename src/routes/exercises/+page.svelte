<script lang="ts">
  import { resolve } from '$app/paths';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<PageHeader title="Exercises">
  <div role="group">
    <a href={resolve('/settings')} role="button">Settings</a>
    <a href={resolve('/exercises/new')} role="button">New</a>
  </div>
</PageHeader>

{#if data.exercises.length}
  {#each data.exercises as exercise}
    <article>
      <a href={resolve('/exercises', { id: String(exercise.id) })}>{exercise.name} ({exercise.exerciseType})</a>
    </article>
  {/each}
{:else}
  <p>No exercises yet.</p>
{/if}
