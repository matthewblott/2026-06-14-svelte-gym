<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
  import { page } from '$app/state';
  import { publicRoutes } from '$lib/routes';
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();

  let otp = $state('');
  let email = $state(page.url.searchParams.get('email') ?? '');
</script>

<svelte:head>
  <title>Sign in</title>  	
</svelte:head>

<Header>
  <h1>Verify Email</h1>
  <div role="group">
    <a href={publicRoutes.auth.signIn()} role="button">Resend Code</a>
    <button form="verify-otp">
      Verify 
    </button>
  </div>
</Header>

{#if !data.isAndroid}
  <a href={publicRoutes.auth.signIn()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Resend Code</a>
{/if}

<p>
  We’ve sent you a code. Enter it below to finish signing in.
</p>
<button form="verify-otp" data-controller="bridge--button" class="hidden">Verify</button>

<Form id="verify-otp">
  <input type="hidden" name="email" bind:value={email}>
  <input name="otp" bind:value={otp} required placeholder="123456">
</Form>

<style>
  p {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font-size: 1.2rem;
    text-align: center;
  }
</style>

