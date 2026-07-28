<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<svelte:head>
  <title>Sign Out</title>  	
</svelte:head>

<Header>
  <h1>Sign Out</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
</Header>

<a href={routes.account.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Account</a>

<Form>
  <button class="outline">Sign out</button>
</Form>
