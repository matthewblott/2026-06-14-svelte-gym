{#snippet header()}
  <div role="group">
    <a href={routes.settings.index()} role="button">Settings</a>
    <a href={routes.account.index()} role="button">Account</a>
  </div>
{/snippet}

<script lang="ts">
  import { createTenantRoutes } from "$lib/routes/tenant";
  import { getPageHeader } from '$lib/components/page-header.svelte';
  import type { PageData } from "./$types";
  const pageHeader = getPageHeader();
  pageHeader.title = 'Gym App';
  pageHeader.content = header;
  
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));

</script>

<p>
  Proceed to your workouts.
</p>
<a href="{routes.workouts.index()}" role="button" class="outline">Workouts</a>
