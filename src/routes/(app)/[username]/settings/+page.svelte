<script lang="ts">
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import { getContext, type Snippet } from 'svelte';

  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);
</script>

<svelte:head>
  <title>Settings</title>  	
</svelte:head>

{#snippet header()}
  <h1>Settings</h1>
  <div role="group">
    <a href={routes.home()} role="button">Home</a>
    <!-- <a href={routes.settings.exercises.index()} role="button">Exercises</a> -->
  </div>
{/snippet}

<a href={routes.home()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Home</a>

<p>
  Add more exercises here.

</p>
<a href={routes.settings.exercises.index()} role="button" class="outline">Exercises</a>

<style>

  p {
    text-align: center;
  }

</style>
