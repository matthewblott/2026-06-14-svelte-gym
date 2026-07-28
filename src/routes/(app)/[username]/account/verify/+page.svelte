<script lang="ts">
  import { page } from '$app/state';
  import { getContext, type Snippet } from 'svelte';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData, SubmitFunction } from './$types';
    import { applyAction, enhance } from '$app/forms';
    import { goto } from '$app/navigation';

  let otp = $state('');
  let email = $state(page.url.searchParams.get('email') ?? '');
  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

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
</script>

<svelte:head>
  <title>Verify Email</title>  	
</svelte:head>

{#snippet header()}
  <h1>Verify Email</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
    <button form="verify-otp">
      Verify
    </button>
  </div>
{/snippet}

<a href={routes.account.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Account</a>
<button form="verify-otp" data-controller="bridge--button" class="hidden">Verify</button>

<form method="post" id="verify-otp" use:enhance={submissionHandler}>
  <input type="hidden" name="email" bind:value={email}>
  <input name="otp" bind:value={otp} required placeholder="123456">
</form>
