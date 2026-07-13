<script lang="ts">
  import type { LayoutData } from './$types';
  import type { Snippet } from 'svelte';
  import { createTenantRoutes } from '$lib/routes/tenant';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

  const routes = createTenantRoutes(data.user.name);

</script>

<div>
  <a href={routes.account.index()}>{data.user?.name}</a>
</div>

{@render children()}
