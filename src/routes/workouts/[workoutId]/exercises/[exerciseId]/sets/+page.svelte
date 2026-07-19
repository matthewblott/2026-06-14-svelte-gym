<script lang="ts">
  import type { PageData } from './$types';
  import { routes } from '$lib/routes/index';
  import { getContext, type Snippet } from 'svelte';

  let { data }: { data: PageData } = $props();

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);
</script>

{#snippet header()}
  <h1>Sets</h1>
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
{/snippet}

{#if data.sets.length}
  {#each data.sets as set}
    <article class="pill">
      <p>
        <span>
          {#if set.exerciseType === 'weights'}
            {set.distanceOrReps}
          {:else}
            {set.distanceOrReps} metres
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
