{#snippet header()}
  <div role="group">
    <a href={routes.home()} role="button">Home</a>
  </div>
{/snippet}

<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';
  import { getPageHeader } from '$lib/components/page-header.svelte';

  const pageHeader = getPageHeader();

  pageHeader.title = 'Account';
  pageHeader.content = header;

	let { data }: { data: PageData } = $props();
  let isAnonymous = $state(true); 

  const session = authClient.useSession();
  const username = $derived(data.user.name);
  const routes = $derived(createTenantRoutes(username));

  $effect(() => {
    const user = $session.data?.user;
    isAnonymous = Boolean(Number(user?.isAnonymous));
  });

</script>

{#if !isAnonymous}
  <a href={routes.account.rename()} role="button" class="outline">Rename Account</a>
  <a href={routes.account.signOut()} role="button" class="outline">Sign Out</a>
{:else}
  <a href={routes.account.register()} role="button" class="outline">Add email address</a>
{/if}

<a href={routes.account.delete()} role="button" class="outline danger">Delete Account</a>

