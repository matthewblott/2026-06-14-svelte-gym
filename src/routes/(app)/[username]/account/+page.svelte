<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { LayoutData } from '/$types';

  const session = authClient.useSession();

	let { data }: { data: LayoutData } = $props();

  const username = data.user.name;
  const routes = $derived(createTenantRoutes(username));

  let isAnonymous = $state(true); 

  $effect(() => {
    const user = $session.data?.user;
    isAnonymous = Boolean(Number(user?.isAnonymous));
  });

</script>

<h1>Account</h1>

{#if !isAnonymous}
  <a href={routes.account.rename()}>Rename Account</a>
  <br>
  <a href={routes.account.signOut()}>Sign Out</a>
  <br>
{:else}
  <a href={routes.account.register()}>Add email address</a>
{/if}

<a href={routes.account.delete()}>Delete Account</a>

