<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  import { routes } from '$lib/routes';
</script>

<PageHeader title="Sets">
  <div role="group">
    <a href={routes.workouts.exercises.list(data.workoutId)} role="button">Exercises</a>
    <a href={
        routes.workouts.exercises.sets.new({
          workoutId: data.workoutId, exerciseId: data.exerciseId
        })
      }
    role="button">
      New 
    </a>
  </div>
</PageHeader>

{#if data.exerciseSets.length}
  {#each data.exerciseSets as set}
    <article>
      {#if set.exerciseType === 'weights'}
        {set.reps} x {set.weight} 
      {:else}
        {set.distance} in {set.duration}
      {/if}
    </article>
  {/each}
{:else}
  <p>No sets yet.</p>
{/if}
