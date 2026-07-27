<script lang="ts">
  import { page } from '$app/state';
  import { getContext } from 'svelte';
  import type { PageProps } from './$types';
  import type { Snippet } from 'svelte';
  import { enhance } from '$app/forms';

  const headerCtx = getContext<{ set: (s: Snippet | null) => void }>('header')

  $effect(() => {
    page.url;
    headerCtx.set(header);
  });

  let { form }: PageProps = $props();
  let email = $derived(form?.email ?? '');
  let error = $derived(form?.error ?? '');
</script>

{#snippet header()}
  <h1>Sign in</h1>
  <div role="group">
    <!-- <button form="send-otp" data-controller="bridge--button">Send code</button> -->
    <button form="send-otp" data-controller="sign-in">Send code</button>
  </div>
{/snippet}

<form method="post" id="send-otp" use:enhance>
  <input name="email" bind:value={email} placeholder="sally@example.com">
</form>

{#if error}
  <p role="alert">{error}</p>
{/if}

