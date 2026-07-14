<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { authClient as auth } from '$lib/auth-client';
  import { goto, invalidateAll } from '$app/navigation';
  import { page } from '$app/state';
  import { createRoutes } from '$lib/routes';

  let otp = $state('');
  let email = $state(page.url.searchParams.get('email') ?? '');

  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

  async function verify() {
    const { data, error } = await auth.signIn.emailOtp({
      email,
      otp,
    });

    if (error) {
      // handle error, e.g. show a message
      return;
    }

    await invalidateAll();

    const username = data?.user?.name;
    const routes = createRoutes(username);
    const route = String(routes.account?.index());

    goto(route);
  }
</script>

<PageHeader title="Verify Email">
  <div role="group">
    <a href={routes.account.index()} role="button">Account</a>
    <button form="verify-otp">
      Verify 
    </button>
  </div>
</PageHeader>

<form
  id="verify-otp"
  onsubmit={(e) => {
    e.preventDefault();
    verify();
  }}
>
  <input type="hidden" name="email" bind:value={email}>
  <input bind:value={otp} required placeholder="123456">

</form>

