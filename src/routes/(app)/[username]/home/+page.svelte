<script lang="ts">
  import { page } from "$app/state";
  import { createTenantRoutes } from "$lib/routes/tenant";
  import type { PageData } from "./$types";
  import { getContext, type Snippet } from 'svelte';

  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));

  const headerCtx = getContext<{ set: (s: Snippet | null) => void }>('header')
  $effect(() => {
    page.url;
    headerCtx.set(header);
  });
</script>

<svelte:head>
  <title>Home</title>  	
</svelte:head>

{#snippet header()}
  <h1>Gym App</h1>
  <div role="group">
    <a href={routes.settings.index()} role="button">Settings</a>
    <a href={routes.account.index()} role="button">Account</a>
  </div>
{/snippet}

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
