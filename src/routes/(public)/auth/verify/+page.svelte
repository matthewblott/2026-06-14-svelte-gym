<script lang="ts">
  import { applyAction, enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { getContext } from 'svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  import type { Snippet } from 'svelte';
  import { publicRoutes } from '$lib/routes';
  const headerCtx = getContext<{ set: (s: Snippet | null) => void }>('header')
  $effect(() => {
    headerCtx.set(header);
  });
  let otp = $state('');
  let email = $state(page.url.searchParams.get('email') ?? '');

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
  <title>Sign in</title>  	
</svelte:head>

{#snippet header()}
  <h1>Verify Email</h1>
  <div role="group">
    <a href={publicRoutes.auth.signIn()} role="button">Resend Code</a>
    <button form="verify-otp">
      Verify 
    </button>
  </div>
{/snippet}

<a href={publicRoutes.auth.signIn()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Resend Code</a>
<button form="verify-otp" data-controller="bridge--button" class="hidden">Verify</button>

<form method="post" id="verify-otp" use:enhance={submissionHandler}>
  <input type="hidden" name="email" bind:value={email}>
  <input name="otp" bind:value={otp} required placeholder="123456">
</form>
