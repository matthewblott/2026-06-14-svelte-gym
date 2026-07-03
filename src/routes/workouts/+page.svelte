<script lang="ts">
  import { resolve } from '$app/paths';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  import { routes } from '$lib/routes';
</script>

<PageHeader title="Workouts">
  <div role="group">
    <a href={resolve('/settings')} role="button">Settings</a>
    <button form="new-workout-form">New</button>
  </div>
</PageHeader>

<form method="POST" id="new-workout-form">
  <input type="hidden" name="locale" value={navigator.language}>
</form>

{#if data.workouts.length}
  {#each data.workouts as workout}
    <article>
      <a href={routes.workouts.exercises.list(workout.id)}>{workout.name}</a>
    </article>
  {/each}
{:else}
  <p>No workouts yet.</p>
{/if}
