<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  import { createTenantRoutes } from '$lib/routes/tenant';
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<PageHeader title="Sets">
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
</PageHeader>

{#if data.sets.length}
  {#each data.sets as set}
    <article>
      {#if set.exerciseType === 'weights'}
        {set.distanceOrReps} x {set.durationOrWeight} 
      {:else}
        {set.distanceOrReps} in {set.durationOrWeight} 
      {/if}
    </article>
  {/each}
{:else}
  <p>No sets yet.</p>
{/if}
