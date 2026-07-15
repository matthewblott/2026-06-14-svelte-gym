<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';

  const session = authClient.useSession();

  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

  import { getPageHeader } from '$lib/components/page-header.svelte';
  const pageHeader = getPageHeader();
  pageHeader.title = 'Rename Account';
  pageHeader.content = header;
</script>

{#snippet header()}
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
{/snippet}

<form method="post">
  <input name="name" value={$session.data?.user.name}>
  <button>Save</button>
</form>