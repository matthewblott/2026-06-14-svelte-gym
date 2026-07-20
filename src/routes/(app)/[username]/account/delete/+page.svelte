<script lang="ts">
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';
  import { getContext, type Snippet } from 'svelte';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);
</script>

{#snippet header()}
  <h1>Delete Account</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
{/snippet}

<p>This process cannot be undone. Are you sure you want to delete your account?</p>
<form method="post">
  <button class="outline danger">Delete Account</button>
</form>
