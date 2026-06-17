<script lang="ts">
import { getWorkouts } from './old-workouts.remote';
</script>

<h1>Workouts</h1>

{#await getWorkouts() then data}
  {#each data as workout}
    <p>{workout.name}</p>
  {/each}
{/await}
