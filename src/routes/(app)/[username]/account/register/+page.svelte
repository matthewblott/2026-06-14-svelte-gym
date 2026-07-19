<script lang="ts">
  import type { PageProps } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import { getContext, type Snippet } from 'svelte';

  let { data, form }: PageProps = $props();
  let email = $derived(form?.email ?? '');
  let error = $derived(form?.error ?? '');

  const routes = $derived(createTenantRoutes(data.user.name));

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);
</script>

{#snippet header()}
  <h1>Register</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
    <button form="send-otp">Send code</button>
  </div>
{/snippet}

<form method="post" id="send-otp">
  <input name="email" bind:value={email} placeholder="sally@example.com">
</form>

{#if error}
  <p role="alert">{error}</p>
{/if}
