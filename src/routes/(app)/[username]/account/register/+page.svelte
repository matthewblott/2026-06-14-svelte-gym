<script lang="ts">
  import type { PageProps, SubmitFunction } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import { getContext, type Snippet } from 'svelte';
    import { applyAction, enhance } from '$app/forms';
    import { goto } from '$app/navigation';

  let { data, form }: PageProps = $props();
  let email = $derived(form?.email ?? '');
  let error = $derived(form?.error ?? '');

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
  <title>Register Email</title>  	
</svelte:head>

{#snippet header()}
  <h1>Register</h1>
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
    <button form="send-otp">Send code</button>
  </div>
{/snippet}

<a href={routes.account.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Account</a>
<button form="send-otp" data-controller="bridge--button" class="hidden">Send code</button>

<form method="post" id="send-otp" use:enhance={submissionHandler}>
  <input name="email" bind:value={email} placeholder="sally@example.com">
</form>

{#if error}
  <p role="alert">{error}</p>
{/if}
