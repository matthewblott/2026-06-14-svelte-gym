<script>
  import { createWorkout } from "../workouts.remote";
</script>

<form {...createWorkout}>
  <input placeholder="Name" name="name" required>
  {#each createWorkout.fields.name.issues() as issue}
    <p>{issue.message}</p>
  {/each}
  <button type="submit">Create</button>
</form>
