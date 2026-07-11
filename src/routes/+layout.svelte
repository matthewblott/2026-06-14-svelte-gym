<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import '$lib/assets/styles/index.css';
  let { children } = $props();
  import { browser } from '$app/environment';
  if (browser) {
    import('@hotwired/turbo');
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main data-sveltekit-reload>
  {@render children()}
</main>
