<script lang="ts">
  import { resolve } from '$app/paths';
  import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<PageHeader title="Settings">
  <div role="group">
    <a href={resolve('/workouts')} role="button">Workouts</a>
    <a href={resolve('/exercises')} role="button">Exercises</a>
  </div>
</PageHeader>
