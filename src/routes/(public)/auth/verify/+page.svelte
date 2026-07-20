<script lang="ts">
  import { page } from '$app/state';
  import { getContext, type Snippet } from 'svelte';
  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);
  let otp = $state('');
  let email = $state(page.url.searchParams.get('email') ?? '');
</script>

{#snippet header()}
  <h1>Verify Email</h1>
  <div role="group">
    <button form="verify-otp">
      Verify 
    </button>
  </div>
{/snippet}

<form method="post" id="verify-otp">
  <input type="hidden" name="email" bind:value={email}>
  <input name="otp" bind:value={otp} required placeholder="123456">
</form>
