<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import { publicRoutes as routes } from "$lib/routes";
  import { getContext, type Snippet } from 'svelte';

  // getContext<{ set: (s: Snippet | null) => void }>('header').set(header);
  const headerCtx = getContext<{ set: (s: Snippet | null) => void }>('header')

  $effect(() => {
    page.url;
    headerCtx.set(header);
  });

</script>

{#snippet header()}
  <h1>Gym App</h1>
  <div role="group">
    <a href={routes.auth.signIn()} role="button">Sign-in</a>
    <button form="guest-sign-in" data-controller="bridge--button">Continue as guest</button>
  </div>
{/snippet}

<form method="post" id="guest-sign-in" use:enhance>
</form>
