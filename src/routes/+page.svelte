<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { publicRoutes as routes } from "$lib/routes";
  import { getContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { SubmitFunction } from "./$types";

  const headerCtx = getContext<{ set: (s: Snippet | null) => void }>('header')

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

  $effect(() => {
    page.url;
    headerCtx.set(header);
  });

</script>

<svelte:head>
  <title>Gym App</title>  	
</svelte:head>

{#snippet header()}
  <h1>Gym App</h1>
{/snippet}

<a href={routes.auth.signIn()} role="button" class="outline">Sign-in</a>
<button form="guest-sign-in" class="outline">Continue as guest</button>

<form method="post" id="guest-sign-in" use:enhance={submissionHandler}>
</form>
