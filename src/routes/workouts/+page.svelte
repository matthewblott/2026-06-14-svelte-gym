<script lang="ts">
  import type { PageData } from './$types';
  import type { ActionData } from './$types';
  let { data, form }: { data: PageData, form: ActionData } = $props();
  import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<PageHeader title="Workouts">
  <div role="group">
    <a href="/settings" role="button">Settings</a>
    <button form="new-workout-form">New</button>
  </div>
</PageHeader>

<form method="POST" id="new-workout-form">
  <input type="hidden" name="locale" value={navigator.language}>
</form>

{#if data.workouts.length}
  {#each data.workouts as workout}
    <article>
      <a href="/workout-exercises?workoutId={workout.id}">{workout.name}</a>
    </article>
  {/each}
{:else}
  <p>No workouts yet.</p>
{/if}
