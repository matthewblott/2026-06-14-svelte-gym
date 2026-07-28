<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<svelte:head>
  <title>Settings</title>  	
</svelte:head>

<Header>
  <h1>Settings</h1>
  <div role="group">
    <a href={routes.home()} role="button">Home</a>
  </div>
</Header>
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
