<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { authClient } from '$lib/auth-client';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';

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

<PageHeader title="Account">
  <div role="group">
    <a href={routes.settings.index()} role="button">Settings</a>
    <!-- <a href={routes.settings.exercises.new()} role="button">New</a> -->
  </div>
</PageHeader>

{#if !isAnonymous}
  <a href={routes.account.rename()} role="button">Rename Account</a>
  <a href={routes.account.signOut()} role="button">Sign Out</a>
{:else}
  <a href={routes.account.register()} role="button">Add email address</a>
{/if}

<a href={routes.account.delete()} role="button">Delete Account</a>

