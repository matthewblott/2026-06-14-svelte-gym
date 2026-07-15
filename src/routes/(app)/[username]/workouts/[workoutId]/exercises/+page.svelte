<script lang="ts">
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));

  import { getPageHeader } from '$lib/components/page-header.svelte';
  const pageHeader = getPageHeader();
  pageHeader.title = 'Exercises';
  pageHeader.content = header;
</script>

{#snippet header()}
  <div role="group">
    <a href={routes.workouts.index()} role="button">Workouts</a>
    <a href={routes.workouts.exercises.new(data.workoutId)} role="button">New</a>
  </div>
{/snippet}

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