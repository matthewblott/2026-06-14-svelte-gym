<script lang="ts">
  import type { PageData, PageServerData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<h1>Exercises</h1>

<p><a href="/exercises/new">New Exercise</a></p>

{#if data.exercises.length}
  <ul>
    {#each data.exercises as exercise}
      <li><a href="/exercises/{exercise.id}">{exercise.name} ({exercise.exerciseType})</a></li>
    {/each}
  </ul>
{:else}
  <p>No exercises yet.</p>
{/if}
