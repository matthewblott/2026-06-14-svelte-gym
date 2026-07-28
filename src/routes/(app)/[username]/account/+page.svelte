<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import { getContext } from 'svelte';
  import type { PageData } from './$types';
  import type { Snippet } from 'svelte';

	let { data }: { data: PageData } = $props();
  let isAnonymous = $state(true); 

  const session = authClient.useSession();
  const username = $derived(data.user.name);
  const routes = $derived(createTenantRoutes(username));

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

  $effect(() => {
    const user = $session.data?.user;
    isAnonymous = Boolean(Number(user?.isAnonymous));
  });

</script>

<svelte:head>
  <title>Account</title>  	
</svelte:head>

{#snippet header()}
  <h1>Account</h1>
  <div role="group">
    <a href={routes.home()} role="button">Home</a>
  </div>
{/snippet}

<a href={routes.home()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Home</a>

{#if !isAnonymous}
<p>
Change the name of your account here.
</p>
  <a href={routes.account.rename()} role="button" class="outline">Rename Account</a>
<p>

Sign out from your account here.
</p>
  <a href={routes.account.signOut()} role="button" class="outline">Sign Out</a>
{:else}
<p>
  Add an email address and you can sign in on other devices. 
</p>
  <a href={routes.account.register()} role="button" class="outline">Add email address</a>
{/if}
<p>
Delete your account here.
</p>
<a href={routes.account.delete()} role="button" class="outline danger">Delete Account</a>

<style>

  p {
    text-align: center;
  }

</style>
