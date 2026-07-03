<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  import { routes } from '$lib/routes';
</script>

<PageHeader title="New Set">
  <div role="group">
    <a href={
        routes.workouts.exercises.sets({
          workoutId: data.workoutId, exerciseId: data.exerciseId
        })
      }
    role="button">
      Sets
    </a>
    <button>Save</button>
  </div>
</PageHeader>

{#if data.exercise.exerciseType === 'weights' }
  <p>Weights</p>
{:else}
  <p>Cardio</p>
{/if}
