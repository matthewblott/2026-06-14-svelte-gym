<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import '$lib/assets/styles/index.css';
  import { createPageHeaderState } from '$lib/components/page-header.svelte.js';
  let { children } = $props();
  const pageHeader = createPageHeaderState();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
  <h1>{pageHeader.title}</h1>
  {#if pageHeader.menu.length}
    <nav>
      <ul>
        {#each pageHeader.menu as item}
          <li>
            <a href={item.href} aria-current={item.current ? 'page' : undefined}>
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
  {#if pageHeader.content}
    {@const content = pageHeader.content}
    {@render content()}
  {/if}
</header>

<main>
  {@render children()}
</main>
