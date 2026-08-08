<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import barbell from '$lib/assets/images/icons/dumbbell.svg';
  import cardio from '$lib/assets/images/icons/cardio.svg';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<svelte:head>
  <title>Exercises</title>  	
</svelte:head>

<Header>
  <h1>Exercises</h1>
  <div role="group">
    <a href={routes.workouts.index()} role="button">Workouts</a>
    <a href={routes.workouts.exercises.new(data.workoutId)} role="button">New</a>
  </div>
</Header>

{#if !data.isAndroid}
  <a href={routes.workouts.index()} data-controller="bridge--back" data-bridge-side="left" class="hidden">Workouts</a>
{/if}
<a href={routes.workouts.exercises.new(data.workoutId)} data-controller="bridge--button" class="hidden">New</a>

{#if data.workoutExercises.length}
  {#each data.workoutExercises as exercise}
    <article class="pill">
      <a href="{routes.workouts.exercises.sets.index({ workoutId: exercise.workoutId, exerciseId: exercise.exerciseId})}">
        <div>
          <h2>
            {exercise.exerciseName}
          </h2>
          {#if exercise.exerciseType === 'weights'}
            <h3>
              {exercise.numberOfSets} sets
            </h3>
          {:else} 
            <h3>
              {exercise.totalDistance} km
            </h3>
          {/if}
        </div>
        {#if exercise.exerciseType === 'weights'}
          <img src={barbell} width="48" height="48" alt="Barbell">
        {:else} 
          <img src={cardio} width="48" height="48" alt="Cardio">
        {/if}
      </a>
    </article>
  {/each}
{:else}
  <p>No exercises yet.</p>
{/if}

<style>
  p {
    text-align: center;
  }
  article {
    a {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      align-items: center;

      div {
        display: flex;
        flex-direction: column;
        h2 {
          color: color-mix(in srgb, var(--color-primary), black 30%);
          font-size: xx-large;
        }
        h3 {
          font-size: large;
          color: grey;
        }
      }

      /* h2 { */
      /*   color: color-mix(in srgb, var(--color-primary), black 30%); */
      /*   font-size: xx-large; */
      /* } */
      /* h3 { */
      /*   font-size: xx-large; */
      /*   color: grey; */
      /* } */
    }
  }
</style>
