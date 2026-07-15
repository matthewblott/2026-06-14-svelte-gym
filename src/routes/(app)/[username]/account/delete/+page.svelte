<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));

  import { getPageHeader } from '$lib/components/page-header.svelte';
  const pageHeader = getPageHeader();
  pageHeader.title = 'Delete Account';
  pageHeader.content = header;

  async function deleteUser() {
    await authClient.deleteUser();
    goto('/');
  }
</script>

{#snippet header()}
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
{/snippet}

<p>Are you sure you want to delete your account?</p>
<button onclick={deleteUser}>Delete user</button>