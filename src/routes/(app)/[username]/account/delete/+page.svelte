<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<svelte:head>
  <title>Delete Account</title>  	
</svelte:head>

<Header>
  <h1>Delete Account</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
</Header>

<a href={routes.account.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Account</a>

<p>This process cannot be undone. Are you sure you want to delete your account?</p>

<Form>
  <button class="outline danger">Delete Account</button>
</Form>

<style>
  p {
    text-align: center;
  }
</style>
