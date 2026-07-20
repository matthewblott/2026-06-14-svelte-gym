<script lang="ts">
  import { page } from '$app/state';
  import { getContext, type Snippet } from 'svelte';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';

  let otp = $state('');
  let email = $state(page.url.searchParams.get('email') ?? '');
  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

</script>

{#snippet header()}
  <h1>Verify Email</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
    <button form="verify-otp">
      Verify
    </button>
  </div>
{/snippet}

<form method="post" id="verify-otp">
  <input type="hidden" name="email" bind:value={email}>
  <input name="otp" bind:value={otp} required placeholder="123456">
</form>
