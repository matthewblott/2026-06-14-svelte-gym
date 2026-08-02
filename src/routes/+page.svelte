<script lang="ts">
  import { publicRoutes } from "$lib/routes";
  import Header from "$lib/components/Header.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import logo from '$lib/assets/images/icons/logo.png';
  const alt = "Jimlog logo";

  onMount(() => {
    setTimeout(() => {
     goto(publicRoutes.info());
    }, 1000) 
  })
</script>

<svelte:head>
  <title>Jimlog</title>  	
</svelte:head>

<Header>
  <h1>Jimlog</h1>
</Header>

<img src={logo} alt={alt} class="splash-1">
<img src={logo} alt={alt} class="splash-2">
<img src={logo} alt={alt}>
<img src={logo} alt={alt} class="splash-2">
<img src={logo} alt={alt} class="splash-1">

<style>
  .splash-1 {
    opacity: 0.03;
    padding-bottom: 10px;
  }

  .splash-2 {
    opacity: 0.04;
    padding-bottom: 10px;
  }
  h1 {
    display: none;
  }
</style>
