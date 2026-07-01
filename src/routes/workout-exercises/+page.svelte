<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  
  const workoutId = 0;

</script>

<PageHeader title="Exercises">
  <div role="group">
    <a href="/workouts" role="button">Workouts</a>
    <a href="/workout-exercises/new?workoutId={workoutId}" role="button">New</a>
  </div>
</PageHeader>

