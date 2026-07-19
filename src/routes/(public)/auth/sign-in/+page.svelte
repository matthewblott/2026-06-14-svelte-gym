<script lang="ts">
  import type { PageProps } from './$types';
  import { getContext, type Snippet } from 'svelte';
  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

  let { form }: PageProps = $props();
  let email = $derived(form?.email ?? '');
  let error = $derived(form?.error ?? '');

</script>

{#snippet header()}
  <h1>Sign in</h1>
  <div role="group">
    <button form="send-otp">Send code</button>
  </div>
{/snippet}

<form method="post" id="send-otp">
  <input name="email" bind:value={email} placeholder="sally@example.com">
</form>

{#if error}
  <p role="alert">{error}</p>
{/if}
