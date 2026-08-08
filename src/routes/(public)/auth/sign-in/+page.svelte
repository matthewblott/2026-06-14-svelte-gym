<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
  import { publicRoutes } from '$lib/routes';
  import type { PageProps } from './$types';
  let { data, form }: PageProps = $props();
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

{#if !data.isAndroid}
  <a href={publicRoutes.auth.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Home</a>
{/if}

<p>
  Enter your email address and we’ll send you a code to sign in.
</p>

<button form="send-otp" data-controller="bridge--button" class="hidden">Send code</button>

<Form id="send-otp">
  <input name="email" bind:value={email} placeholder="sally@example.com">
</Form>

{#if error}
  <p role="alert">{error}</p>
{/if}

<style>
  p {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font-size: 1.2rem;
    text-align: center;
  }
</style>
