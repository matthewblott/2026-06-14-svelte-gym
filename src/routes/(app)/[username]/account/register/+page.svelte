<script lang="ts">
  import type { PageProps } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';

  let { data, form }: PageProps = $props();
  let email = $derived(form?.email ?? '');
  let error = $derived(form?.error ?? '');

  const routes = $derived(createTenantRoutes(data.user.name));

  import { getPageHeader } from '$lib/components/page-header.svelte';
  const pageHeader = getPageHeader();
  pageHeader.title = 'Register';
  pageHeader.content = header;
</script>

{#snippet header()}
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
    <button form="send-otp">Send code</button>
  </div>
{/snippet}

<form method="POST" id="send-otp">
  <input name="email" bind:value={email} placeholder="sally@example.com">
</form>

{#if error}
  <p role="alert">{error}</p>
{/if}