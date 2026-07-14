<script lang="ts">
  import type { PageProps } from './$types';
  import PageHeader from '$lib/components/PageHeader.svelte';

  let { form }: PageProps = $props();
  let email = $derived(form?.email ?? '');
  let error = $derived(form?.error ?? '');

</script>

<PageHeader title="Sign in">
  <div role="group">
    <button form="send-otp">Send code</button>
  </div>
</PageHeader>

<form method="POST" id="send-otp">
  <input name="email" bind:value={email} placeholder="sally@example.com">
</form>

{#if error}
  <p role="alert">{error}</p>
{/if}
