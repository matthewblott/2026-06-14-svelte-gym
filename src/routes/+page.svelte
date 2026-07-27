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

<svelte:head>
  <title>Gym App</title>  	
</svelte:head>

{#snippet header()}
  <h1>Gym App</h1>
{/snippet}

<a href={routes.auth.signIn()} role="button" class="outline">Sign-in</a>
<button form="guest-sign-in" class="outline">Continue as guest</button>

<form method="post" id="guest-sign-in" use:enhance>
</form>
