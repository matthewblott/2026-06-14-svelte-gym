<script lang="ts">
  import { publicRoutes as routes } from "$lib/routes";
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
  <title>Gym App</title>  	
</svelte:head>

<Header>
  <h1>Gym App</h1>
</Header>

<a href={routes.auth.signIn()} role="button" class="outline">Sign-in</a>
<button form="guest-sign-in" class="outline">Continue as guest</button>

<Form id="guest-sign-in" />
