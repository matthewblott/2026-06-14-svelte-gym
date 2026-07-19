<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';
  import { getContext, type Snippet } from 'svelte';

  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

  async function deleteUser() {
    await authClient.deleteUser();
    goto('/');
  }
</script>

{#snippet header()}
  <h1>Delete Account</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
{/snippet}

<p>Are you sure you want to delete your account?</p>
<button onclick={deleteUser}>Delete user</button>
