<script lang="ts">
  import { applyAction, enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData, SubmitFunction } from './$types';
  import { getContext, type Snippet } from 'svelte';
  let { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));

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

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);
</script>

<svelte:head>
  <title>Delete Account</title>  	
</svelte:head>

{#snippet header()}
  <h1>Delete Account</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
  </div>
{/snippet}

<a href={routes.account.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Account</a>

<p>This process cannot be undone. Are you sure you want to delete your account?</p>

<form method="post" use:enhance={submissionHandler}>
  <button class="outline danger">Delete Account</button>
</form>

<style>

  p {
    text-align: center;
  }

</style>
