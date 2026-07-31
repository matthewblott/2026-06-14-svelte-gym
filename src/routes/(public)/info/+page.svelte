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
  Unless you decide to create an account your records are stored securely for this device only.
</p>
<p>
  If you delete the app or clear your data, your records cannot be recovered.
</p>

<p>
  By continuing, you agree to our
  <a href={publicRoutes.terms()}>Terms and Conditions</a> and
  <a href={publicRoutes.privacy()}>Privacy Policy</a>.
</p>

<a href="{publicRoutes.auth.index()}" role="button" class="outline">Continue</a>

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
