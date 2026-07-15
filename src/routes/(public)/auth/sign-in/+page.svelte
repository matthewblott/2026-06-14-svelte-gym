{#snippet header()}
  <div role="group">
    <button form="send-otp">Send code</button>
  </div>
{/snippet}

<script lang="ts">
  import type { PageProps } from './$types';

  let { form }: PageProps = $props();
  let email = $derived(form?.email ?? '');
  let error = $derived(form?.error ?? '');

  import { getPageHeader } from '$lib/components/page-header.svelte';
  const pageHeader = getPageHeader();
  pageHeader.title = 'Sign in';
  pageHeader.content = header;
</script>

<form method="POST" id="send-otp">
  <input name="email" bind:value={email} placeholder="sally@example.com">
</form>

{#if error}
  <p role="alert">{error}</p>
{/if}
