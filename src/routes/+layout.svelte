<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import '$lib/assets/styles/index.css';
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutProps } from './$types';
  import { beforeNavigate } from '$app/navigation';

  let header = $state<Snippet | null>(null);

  setContext('header', {
    set: (s: Snippet | null) => { header = s; }
  });

  beforeNavigate(() => {
    header = null;
  });

  let { data, children }: LayoutProps = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="hotwire-native-hidden">
  {#if header && !data.isHotwireNative}
    {@render header()}
  {:else}
    <h1>Gym App</h1>
  {/if}
</header>

<main>
  {@render children()}
</main>
