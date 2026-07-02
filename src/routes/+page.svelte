<script lang="ts">
  import { resolve } from '$app/paths';
  import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<PageHeader title="Gym App">
  <div role="group">
    <a href={resolve('/workouts')} role="button">Workouts</a>
  </div>
</PageHeader>
