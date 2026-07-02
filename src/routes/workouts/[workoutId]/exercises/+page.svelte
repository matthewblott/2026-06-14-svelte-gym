<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  import { routes } from '$lib/routes';
</script>

<PageHeader title="Exercises">
  <div role="group">
    <a href={routes.workouts.list()} role="button">Workouts</a>
    <a href={routes.workouts.exercises.new(data.workoutId)} role="button">New</a>
  </div>
</PageHeader>
