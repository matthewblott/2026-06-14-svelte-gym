<script lang="ts">
  import { routes } from '$lib/routes/index';
  import { getContext, type Snippet } from 'svelte';

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);
</script>

{#snippet header()}
  <h1>Settings</h1>
  <div role="group">
    <a href={routes.home()} role="button">Home</a>
    <a href={routes.settings.exercises.index()} role="button">Exercises</a>
  </div>
{/snippet}
