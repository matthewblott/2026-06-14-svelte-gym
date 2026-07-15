{#snippet header()}
  <div role="group">
    <a href={routes.home()} role="button">Home</a>
    <button form="new-workout-form">New</button>
  </div>
{/snippet}

<script lang="ts">
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));

  import { getPageHeader } from '$lib/components/page-header.svelte';

  const pageHeader = getPageHeader();

  pageHeader.title = 'Workouts';
  pageHeader.content = header;

</script>

<form method="post" id="new-workout-form">
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
