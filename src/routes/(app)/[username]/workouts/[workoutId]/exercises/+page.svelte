<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<PageHeader title="Exercises">
  <div role="group">
    <a href={routes.workouts.index()} role="button">Workouts</a>
    <a href={routes.workouts.exercises.new(data.workoutId)} role="button">New</a>
  </div>
</PageHeader>

{#if data.workoutExercises.length}
  {#each data.workoutExercises as exercise}
    <article>
      <a href={
          routes.workouts.exercises.sets.index({
            workoutId: exercise.workoutId, exerciseId: exercise.exerciseId
          })
        }
      >
        {exercise.name}
      </a>
    </article>
  {/each}
{:else}
  <p>No exercises yet.</p>
{/if}
