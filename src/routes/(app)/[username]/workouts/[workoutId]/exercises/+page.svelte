<script lang="ts">
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import barbell from '$lib/assets/images/icons/barbell-2.svg';
  import cardio from '$lib/assets/images/icons/cardio.svg';
  import { getContext, type Snippet } from 'svelte';

  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);
</script>

{#snippet header()}
  <h1>Exercises</h1>
  <div role="group">
    <a href={routes.workouts.index()} role="button">Workouts</a>
    <a href={routes.workouts.exercises.new(data.workoutId)} role="button">New</a>
  </div>
{/snippet}

{#if data.workoutExercises.length}
  {#each data.workoutExercises as exercise}
    <article class="pill">
      <a href="{routes.workouts.exercises.sets.index({ workoutId: exercise.workoutId, exerciseId: exercise.exerciseId})}">
        <h2>
          {exercise.exerciseName}
        </h2>
        {#if exercise.exerciseType === 'weights'}
          <h3>
            {exercise.numberOfSets} sets
          </h3>
          <img src={barbell} width="48" height="48" alt="Barbell">
        {:else} 
          <h3>
            {exercise.totalDistance} km
          </h3>
          <img src={cardio} width="48" height="48" alt="Cardio">
        {/if}
      </a>
    </article>
  {/each}
{:else}
  <p>No exercises yet.</p>
{/if}

<style>
  article {
    :hover {
      background-color: lightyellow;
    }
    a {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      align-items: center;

      h2 {
        /* color: var(--color-primary); */
        color: color-mix(in srgb, var(--color-primary), black 30%);
        font-size: xx-large;
      }
      h3 {
        font-size: xx-large;
        color: grey;
      }
    }
  }
</style>
