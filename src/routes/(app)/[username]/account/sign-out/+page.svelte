<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation';
  import { getContext, type Snippet } from 'svelte';
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

  async function signOut() {
    await authClient.signOut();
    goto('/');
  }

  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

</script>

{#snippet header()}
  <h1>Sign Out</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
{/snippet}

<button onclick={signOut}>Sign out</button>
