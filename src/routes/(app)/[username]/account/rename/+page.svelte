<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';
  import { getContext, type Snippet } from 'svelte';

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

  const session = authClient.useSession();

  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

</script>

{#snippet header()}
  <h1>Rename Account</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
{/snippet}

<form method="post">
  <input name="name" value={$session.data?.user.name}>
  <button>Save</button>
</form>
