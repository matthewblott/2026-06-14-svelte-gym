<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import { createTenantRoutes } from "$lib/routes/tenant";
  import type { PageData } from "./$types";
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<svelte:head>
  <title>Home</title>  	
</svelte:head>

<Header>
  <h1>Gym App</h1>
  <div role="group">
    <a href={routes.settings.index()} role="button">Settings</a>
    <a href={routes.account.index()} role="button">Account</a>
  </div>
</Header>

<a href={routes.settings.index()} data-controller="bridge--button" class="hidden" data-bridge-side="left">Settings</a>
<a href={routes.account.index()} data-controller="bridge--button" class="hidden">Account</a>

<p>
  Proceed to your workouts.
</p>
<a href="{routes.workouts.index()}" role="button" class="outline">Workouts</a>

<style>
  p {
    text-align: center;
  }
</style>
