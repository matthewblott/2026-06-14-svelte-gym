<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { authClient } from '$lib/auth-client';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';

  const session = authClient.useSession();

  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

</script>

<PageHeader title="Rename Account">
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
</PageHeader>

<form method="post">
  <input name="name" value={$session.data?.user.name}> 
  <button>Save</button>
</form>

