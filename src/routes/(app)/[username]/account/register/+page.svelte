<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
  import type { PageProps } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  let { data, form }: PageProps = $props();
  let email = $derived(form?.email ?? '');
  let error = $derived(form?.error ?? '');
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<svelte:head>
  <title>Register Email</title>  	
</svelte:head>

<Header>
  <h1>Register</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
    <button form="send-otp">Send code</button>
  </div>
</Header>

<a href={routes.account.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Account</a>
<button form="send-otp" data-controller="bridge--button" class="hidden">Send code</button>

<Form id="send-otp">
  <input name="email" bind:value={email} placeholder="sally@example.com">
</Form>

{#if error}
  <p role="alert">{error}</p>
{/if}
