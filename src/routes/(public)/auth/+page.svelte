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
<p>
  Keep your workouts synced <br>and backed up.
</p>
<a href={routes.auth.signIn()} role="button" class="outline">Sign-in</a>
<p>
  Get started right away — <br>no account required.
</p>
<button form="guest-sign-in" class="outline">Continue as guest</button>

<Form id="guest-sign-in" />

<style>

  p {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font-size: 1.2rem;
    text-align: center;
  }
</style>
