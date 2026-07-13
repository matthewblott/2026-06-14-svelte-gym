<script lang="ts">
  import { publicRoutes as routes } from "$lib/routes";
  import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<PageHeader title="App">
  <div role="group">
    <a href={routes.auth.signIn()} role="button">Sign-in</a>
  </div>
</PageHeader>
