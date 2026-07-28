<script lang="ts">
  import { getContext, type Snippet } from 'svelte';
  import type { PageData, SubmitFunction } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
    import { applyAction, enhance } from '$app/forms';
    import { goto } from '$app/navigation';

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

  let { data }: { data: PageData } = $props();

	const submissionHandler: SubmitFunction = async ({ action }) => {
    return async ({ result }) => {

      if (result.type !== 'redirect') {
        await applyAction(result);
        return;
      }

      const url = new URL(result.location, window.location.origin);

      if (!window.HotwireNavigator.canNavigate(url)) {
        await goto(result.location);
        return;
      }

      window.HotwireNavigator.formSubmissionStarted(action);
      window.HotwireNavigator.visitProposedToLocation(url);
      window.HotwireNavigator.formSubmissionFinished(action);

    };
  }
  const routes = $derived(createTenantRoutes(data.user.name));

</script>

<svelte:head>
  <title>Sign Out</title>  	
</svelte:head>

{#snippet header()}
  <h1>Sign Out</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
{/snippet}

<a href={routes.account.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Account</a>

<form method="post" use:enhance={submissionHandler}>
  <button class="outline">Sign out</button>
</form>
