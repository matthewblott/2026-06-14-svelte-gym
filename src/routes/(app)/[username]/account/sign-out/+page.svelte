<script lang="ts">
  import { getContext, type Snippet } from 'svelte';
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

</script>

{#snippet header()}
  <h1>Sign Out</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
{/snippet}

<form method="post">
  <button>Sign out</button>
</form>
