<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));

  async function deleteUser() {
    await authClient.deleteUser(); 
    goto('/');
  }

</script>

<PageHeader title="Delete Account">
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
</PageHeader>

<p>Are you sure you want to delete your account?</p>
<button onclick={deleteUser}>Delete user</button>
