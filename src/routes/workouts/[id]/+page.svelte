<script lang="ts">
  import { getWorkoutById } from "../workouts.remote";
  import { page } from '$app/state'

  const id = parseInt(page.params.id!);
  const workoutPromise = getWorkoutById(id);
</script>

<h1>Workout</h1>

{#await workoutPromise}
  <p>Loading...</p>
{:then workout}
  <form>
    <input value={workout?.name} name="name">
  </form>
{/await}
