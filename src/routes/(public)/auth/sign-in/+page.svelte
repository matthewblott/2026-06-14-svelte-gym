<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
  import { publicRoutes } from '$lib/routes';
  import type { PageProps } from './$types';

  let { form }: PageProps = $props();
  let email = $derived(form?.email ?? '');
  let error = $derived(form?.error ?? '');
</script>

<svelte:head>
  <title>Sign in</title>  	
</svelte:head>

<Header>
  <h1>Sign in</h1>
  <div role="group">
    <a href={publicRoutes.auth.index()} role="button">Home</a>
    <button form="send-otp">Send code</button>
  </div>
</Header>

<a href={publicRoutes.auth.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Home</a>
<button form="send-otp" data-controller="bridge--button" class="hidden">Send code</button>

<Form id="send-otp">
  <input name="email" bind:value={email} placeholder="sally@example.com">
</Form>

{#if error}
  <p role="alert">{error}</p>
{/if}

