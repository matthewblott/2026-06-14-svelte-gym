<script lang="ts">
  import { applyAction, enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { getContext } from 'svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  import type { Snippet } from 'svelte';
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

{#snippet header()}
  <h1>Verify Email</h1>
  <div role="group">
    <button form="verify-otp">
      Verify 
    </button>
  </div>
{/snippet}

<button form="verify-otp" data-controller="bridge--button" class="hidden">Verify</button>

<form method="post" id="verify-otp" use:enhance={submissionHandler}>
  <input type="hidden" name="email" bind:value={email}>
  <input name="otp" bind:value={otp} required placeholder="123456">
</form>
