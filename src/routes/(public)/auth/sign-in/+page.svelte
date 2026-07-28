<script lang="ts">
  import { page } from '$app/state';
  import { getContext } from 'svelte';
  import type { PageProps, SubmitFunction } from './$types';
  import type { Snippet } from 'svelte';
  import { applyAction, enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { publicRoutes } from '$lib/routes';

  const headerCtx = getContext<{ set: (s: Snippet | null) => void }>('header')

  $effect(() => {
    page.url;
    headerCtx.set(header);
  });

  let { form }: PageProps = $props();
  let email = $derived(form?.email ?? '');
  let error = $derived(form?.error ?? '');

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
  <h1>Sign in</h1>
  <div role="group">
    <a href={publicRoutes.home()} role="button">Home</a>
    <button form="send-otp">Send code</button>
  </div>
{/snippet}

<a href={publicRoutes.home()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Home</a>
<button form="send-otp" data-controller="bridge--button" class="hidden">Send code</button>

<form method="post" id="send-otp" use:enhance={submissionHandler}>
  <input name="email" bind:value={email} placeholder="sally@example.com">
</form>

{#if error}
  <p role="alert">{error}</p>
{/if}

