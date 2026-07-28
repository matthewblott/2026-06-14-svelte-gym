<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<svelte:head>
  <title>Rename Account</title>  	
</svelte:head>

<Header>
  <h1>Rename Account</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
</Header>

<a href={routes.account.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Account</a>

<Form>
  <input name="name" value={data?.user.name}>
  <button class="outline">Save</button>
</Form>
