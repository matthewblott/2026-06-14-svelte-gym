<script lang="ts">
  import { publicRoutes } from "$lib/routes";
  import Header from "$lib/components/Header.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  
  onMount(() => {
    setTimeout(() => {
     goto(publicRoutes.info());
    }, 1000) 
  })
</script>

<svelte:head>
  <title>Gym App</title>  	
</svelte:head>

<Header>
  <h1>Gym App</h1>
</Header>

<p>This is the splash page.</p>
