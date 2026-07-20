<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import '$lib/assets/styles/index.css';
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutProps } from './$types';

  let header = $state<Snippet | null>(null);

  setContext('header', {
    set: (s: Snippet | null) => { header = s; }
  });

  let { children }: LayoutProps = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
  {#if header}
    {@render header()}
  {:else}
    <h1>Gym App</h1>
  {/if}
</header>

<main>
  {@render children()}
</main>
