<script lang="ts">
  import { publicRoutes } from "$lib/routes";
  import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
  <title>Information</title>  	
</svelte:head>

<Header>
  <h1>Information</h1>
</Header>

<p>
  By continuing, you agree to our
  <a href={publicRoutes.terms()}>Terms and Conditions</a> and
  <a href={publicRoutes.privacy()}>Privacy Policy</a>.
</p>

<style>
  a {
    color: blue;
  }

  p {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
</style>
