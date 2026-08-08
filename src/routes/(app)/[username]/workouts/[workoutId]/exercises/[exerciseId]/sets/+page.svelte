<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<svelte:head>
  <title>Exercise Sets</title>  	
</svelte:head>

<Header>
  <h1>Exercise Sets</h1>
  <div role="group">
    <a href={routes.workouts.exercises.index(data.workoutId)} role="button">Exercises</a>
    <a href={
        routes.workouts.exercises.sets.new({
          workoutId: data.workoutId, exerciseId: data.exerciseId
        })
      }
    role="button">
      New
    </a>
  </div>
</Header>

{#if !data.isAndroid}
  <a href={routes.workouts.exercises.index(data.workoutId)} data-controller="bridge--back" class="hidden" data-bridge-side="left">Exercises</a>
{/if}
<a href={
    routes.workouts.exercises.sets.new({
      workoutId: data.workoutId, exerciseId: data.exerciseId
    })
  }
  data-controller="bridge--button" class="hidden">
  New
</a>

{#if data.sets.length}
  {#each data.sets as set}
    <article class="pill">
      <p>
        <span>
          {#if set.exerciseType === 'weights'}
            {set.distanceOrReps}
          {:else}
            {set.distanceOrReps} meters
          {/if}
        </span>
        <span>
          {#if set.exerciseType === 'weights'}
            x
          {:else}
            in 
          {/if}
        </span>
        <span>
          {#if set.exerciseType === 'weights'}
            {set.durationOrWeight} kg
          {:else}
            {set.durationOrWeight}
          {/if}
        </span>
      </p>
    </article>
  {/each}
{:else}
  <p>No sets yet.</p>
{/if}

<style>

  p {
    text-align: center;
  }
  article {
    padding: 0.5rem 2rem;
    p {
      width: 100%;
      text-align: center;
    }

    span {
      text-align: center;
      &:first-of-type {
        color: color-mix(in srgb, var(--color-primary), black 30%);
        font-weight: bold;
        font-size: xx-large;
        margin-right: 0.3rem;
      }
      &:nth-of-type(2) {
        font-size: x-large;
        color: gray;
      }
      &:last-of-type {
        margin-left: 0.2rem; 
        color: grey;
        font-weight: bold;
        font-size: xx-large;
      }
    }
  }
</style>
