<script lang="ts">
  import { routes } from "$lib/routes/index";
  import { getContext, type Snippet } from 'svelte';

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

</script>

{#snippet header()}
  <h1>Gym App</h1>
  <div role="group">
    <a href={routes.settings.index()} role="button">Settings</a>
  </div>
{/snippet}

<p>
  Proceed to your workouts.
</p>
<a href="{routes.workouts.index()}" role="button" class="outline">Workouts</a>
