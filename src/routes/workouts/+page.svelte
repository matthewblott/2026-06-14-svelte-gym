<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<h1>Workouts</h1>

<p><a href="/workouts/new">New Workout</a></p>

{#if data.workouts.length}
  <ul>
    {#each data.workouts as workout}
      <li><a href="/workouts/{workout.id}">{workout.name}</a></li>
    {/each}
  </ul>
{:else}
  <p>No workouts yet.</p>
{/if}
