<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  let { data }: { data: PageData } = $props();
  const routes = createTenantRoutes(data.user.name);
</script>

<PageHeader title="Workouts">
  <div role="group">
    <a href={routes.settings.index()} role="button">Settings</a>
    <button form="new-workout-form">New</button>
  </div>
</PageHeader>

<form method="POST" id="new-workout-form">
  <input type="hidden" name="locale" value={navigator.language}>
</form>

{#if data.workouts.length}
  {#each data.workouts as workout}
    <article>
      <a href={routes.workouts.exercises.index(workout.id)}>{workout.name}</a>
    </article>
  {/each}
{:else}
  <p>No workouts yet.</p>
{/if}
