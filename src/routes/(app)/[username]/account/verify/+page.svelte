<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
  import { page } from '$app/state';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';
  let otp = $state('');
  let email = $state(page.url.searchParams.get('email') ?? '');
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<svelte:head>
  <title>Verify Email</title>  	
</svelte:head>

<Header>
  <h1>Verify Email</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
    <button form="verify-otp">
      Verify
    </button>
  </div>
</Header>

{#if !data.isAndroid}
  <a href={routes.account.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Account</a>
{/if}
<button form="verify-otp" data-controller="bridge--button" class="hidden">Verify</button>

<Form id="verify-otp">
  <input type="hidden" name="email" bind:value={email}>
  <input name="otp" bind:value={otp} required placeholder="123456">
</Form>
